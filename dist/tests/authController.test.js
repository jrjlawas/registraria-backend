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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../src/server")); // Adjust the path if necessary
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoURI = process.env.MONGO_URI;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(mongoURI, {});
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
}));
describe('Authentication', () => {
    //   beforeEach(async () => {
    //     // Clear the users collection before each test
    //     await User.deleteMany({});
    //   });
    it('should login a user with valid credentials', () => __awaiter(void 0, void 0, void 0, function* () {
        //Create a test user
        // const newUser = new User({
        //   username: 'testuser',
        //   password: await bcrypt.hash('testpassword', 10),
        //   firstName: 'SampleJay';
        //   middleName: ;
        //   lastName: string;
        //   usertype: string;
        //   enabledStatus : string
        // });
        //await newUser.save();
        const res = yield (0, supertest_1.default)(server_1.default)
            .post('/api/auth/login')
            .send({
            username: 'admin',
            password: 'admin',
        });
        console.log(res.body.message);
        expect(res.status).toBe(200);
        expect(res.body.username).toBeDefined();
    }));
    it('should return 400 for invalid credentials', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default)
            .post('/api/auth/login')
            .send({
            username: 'nonexistentuser',
            password: 'wrongpassword',
        });
        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Invalid credentials');
    }));
});
