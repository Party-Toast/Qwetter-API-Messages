import client from 'amqplib';
import dotenv from 'dotenv';

dotenv.config();

const send = async () => {
    const connection = await client.connect(process.env.CLOUDAMQP_URL as string);
        
    const channel = await connection.createChannel();

    await channel.assertQueue(process.env.QUEUE_NAME as string);

    channel.sendToQueue(process.env.QUEUE_NAME as string, Buffer.from(new Date().toISOString()));
}



// send().then(() => console.log('Message sent!'));