"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const corsOptions = {
    origin: 'https://production.dgf531cc17jnd.amplifyapp.com', // Replace with your actual front-end domain
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Add other methods as needed
    allowedHeaders: ['Content-Type', 'Authorization'], // Include necessary headers
    credentials: true,
};
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)(corsOptions));
app.options('*', (0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use('/api/auth', authRoutes_1.default);
exports.default = app;
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
