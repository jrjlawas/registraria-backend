"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../models/User"));
const jwtHelper_1 = require("../helpers/jwtHelper");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, firstName, middleName, lastName, } = req.body;
    var usertype = 'USER';
    var enabledStatus = 'ENABLED';
    try {
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = yield User_1.default.create({ username, password: hashedPassword, firstName, middleName, lastName, usertype, enabledStatus });
        const token = (0, jwtHelper_1.generateToken)(user._id.toString());
        console.log('User registered');
        res.status(201).json({
            _id: user._id,
            username: user.username,
            token
        });
    }
    catch (error) {
        console.log('User registration failed');
        res.status(400).json({ message: 'User registration failed', error });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield User_1.default.findOne({ username });
        if (user && (yield bcryptjs_1.default.compare(password, user.password))) {
            const token = (0, jwtHelper_1.generateToken)(user._id.toString());
            res.status(200).json({
                _id: user._id,
                username: user.username,
                token: token
            });
        }
        else {
            res.status(401).json({ message: 'Invalid credentials' });
            console.log('invalid credentials');
        }
    }
    catch (error) {
        console.log('login error');
        res.status(400).json({ message: 'Login failed', error });
    }
});
exports.login = login;
