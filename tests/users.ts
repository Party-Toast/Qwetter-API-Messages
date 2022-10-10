import UserController from '../src/controllers/UserController'; 
import { expect } from 'chai';

describe('User Controller', () => { 
    it('Path matches', () => {
        const userController = new UserController(); 
        expect(userController.path).to.equal('/users'); 
    });
})