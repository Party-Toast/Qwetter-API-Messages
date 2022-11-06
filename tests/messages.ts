import MessageController from '../src/controllers/MessageController'; 
import { expect } from 'chai';


describe('Message controller', () => { 
    it('Path matches', () => {
        const messageController = new MessageController(); 
        expect(messageController.path).to.equal('/messages'); 
    })
})