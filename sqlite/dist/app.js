"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const app = express_1.default();
app.use(morgan_1.default('dev'));
app.get('/', (req, res, next) => {
    res.status(200).json({ person: { name: 'Hello', age: 20, sex: 'male' } });
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    `Server is listening on port ${PORT}`;
});
