import UserController from '../src/controllers/UserController'; 
import { expect } from 'chai';


describe('User controller', () => { 
    it('Path matches', () => {
        const userController = new UserController(); 
        expect(userController.path).to.equal('/users'); 
    })
})