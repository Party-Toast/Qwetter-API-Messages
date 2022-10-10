"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserController_1 = __importDefault(require("../src/controllers/UserController")); // this will be your custom import
const chai_1 = require("chai");
describe('User Model', () => {
    it('', () => {
    });
});
describe('User Controller', () => {
    it('Path matches', () => {
        const userController = new UserController_1.default();
        (0, chai_1.expect)(userController.path).to.equal('/users');
    });
});
describe('User Service', () => {
    it('', () => {
    });
});
