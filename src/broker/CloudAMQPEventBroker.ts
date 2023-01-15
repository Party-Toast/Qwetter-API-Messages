import client from 'amqplib';
import { Message } from '../models/Message';

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