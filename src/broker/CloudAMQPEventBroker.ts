import client from 'amqplib';

export default class CloudAMQPEventBroker {
    private connection: any;
    private channel: any = null;
    private queueName;
    private exchangeName;

    constructor(queueName: string, exchangeName: string) {
        this.queueName = queueName;
        this.exchangeName = exchangeName;
    }

    public connect = async () => {
        this.connection = await client.connect(process.env.CLOUDAMQP_URL as string);
        this.channel = await this.connection.createChannel();
        // await this.channel.assertQueue(this.queueName);
        await this.channel.assertExchange(this.exchangeName, 'fanout', { durable: false });
    }

    public send = async (messagePromise: any) => {
        if(!this.channel) {
            await this.connect();
        }

        const message = await messagePromise;

        if(message !== undefined) {
            const serializedMessage = JSON.stringify(message);
    
            console.log(`Sending message: ${serializedMessage}`);
            // this.channel.sendToQueue(this.queueName, Buffer.from(serializedMessage));
            this.channel.publish(this.exchangeName, '', Buffer.from(serializedMessage));
        }
    }   
}