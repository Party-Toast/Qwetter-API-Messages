import client from 'amqplib';
import { FollowRequest } from '../models/Follow';
import { Message } from '../models/Message';
import { MultipleMessagesforTimelineRequest } from '../models/Timeline';

export default class CloudAMQPEventBroker {
    private connection: any;
    private channels: any = {};
    private databaseConnection: any;

    constructor(databaseConnection: any) {
        this.databaseConnection = databaseConnection;
    }

    private getChannel = async (exchangeName: string) => {
        if(!this.channels[exchangeName]) {
            this.channels[exchangeName] = await this.connection.createChannel();
            this.channels[exchangeName].assertExchange(exchangeName, 'topic', {durable: false});
        }
        return this.channels[exchangeName];
    }


    public connect = async () => {
        this.connection = await client.connect(process.env.CLOUDAMQP_URL as string);

        this.listenToUsersExchange();
    }

    public listenToUsersExchange = async () => {
        const exchange = 'users';
        const channel = await this.getChannel(exchange);

        await channel.assertQueue('messages_user-followed');
        await channel.bindQueue('messages_user-followed', exchange, 'user.followed');
        await channel.consume('messages_user-followed', async (msg: any) => {
            if(msg.content) {
                const followRequest: FollowRequest = JSON.parse(msg.content);
                this.followedUserEvent(followRequest);
            }
        }, {noAck: true});
    }

    private followedUserEvent = async (followRequest: FollowRequest) => {
        const exchange = 'messages';
        const channel = await this.getChannel(exchange);

        const messages = await this.databaseConnection.getMessagesByUserId(followRequest.followee_uuid);

        if(messages !== undefined) {
            const userUuidAndMessages: MultipleMessagesforTimelineRequest = {
                user_uuid: followRequest.follower_uuid,
                messages: messages
            }
            const serializedUserUuidAndMessages = JSON.stringify(userUuidAndMessages);
            channel.publish(exchange, 'user.followed', Buffer.from(serializedUserUuidAndMessages));
        }
    }


    public createdMessageEvent = async (createdMessagePromise: Promise<Message | undefined>) => {
        const exchange = 'messages';
        const channel = await this.getChannel(exchange);

        const message = await createdMessagePromise;

        if(message !== undefined) {
            const serializedMessage = JSON.stringify(message);
            channel.publish(exchange, 'message.created', Buffer.from(serializedMessage));
        }
    }

    // public deletedMessageEvent = async (deletedMessagePromise: Promise<Message | undefined>) => {
    //     const exchange = 'messages';
    //     const channel = await this.getChannel(exchange);

    //     const message = await deletedMessagePromise;

    //     if(message !== undefined) {
    //         const serializedMessage = JSON.stringify(message);
    //         channel.publish(exchange, 'message-deleted', Buffer.from(serializedMessage));
    //     }
    // }
}