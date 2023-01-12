import client, { Channel, ConsumeMessage } from 'amqplib';
import dotenv from 'dotenv';

dotenv.config();

const consumer = (channel: Channel) => (msg: ConsumeMessage | null) => { 
    if (msg) {
        console.log(msg.content.toString());
        channel.ack(msg);
    }
}

const receive = async () => {
    const connection = await client.connect(process.env.CLOUDAMQP_URL as string);
        
    const channel = await connection.createChannel();

    await channel.consume(process.env.QUEUE_NAME as string , consumer(channel));

    connection.close();
}

receive().then(() => console.log('All messages received!'));