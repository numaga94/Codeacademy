"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const compression_1 = __importDefault(require("compression"));
const errorhandler_1 = __importDefault(require("errorhandler"));
require("dotenv/config");
// import api router
const api_1 = __importDefault(require("./api/api"));
const app = express_1.default();
// custom rate limit settings
const limiter = express_rate_limit_1.default({
    windowMs: 1 * 60 * 1000,
    max: 60 // 5 requests,
});
// use middleware
app.use(cors_1.default());
app.use(limiter);
app.use(helmet_1.default());
app.use(morgan_1.default('dev'));
app.use(compression_1.default());
app.use(express_1.default.json());
app.use(errorhandler_1.default());
// mount apiRoute
app.use('/', api_1.default);
// port of server
const PORT = Number(process.env.PORT);
// start server
app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});
