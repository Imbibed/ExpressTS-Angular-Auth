"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const usersRoutes_1 = __importDefault(require("./routes/usersRoutes"));
const http_1 = __importDefault(require("http"));
const debug_1 = __importDefault(require("debug"));
const authenticationRoutes_1 = __importDefault(require("./routes/authenticationRoutes"));
const db_1 = require("./db");
const debug = (0, debug_1.default)("backtonodejs:server");
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, '../public/browser')));
app.use('/api/users', usersRoutes_1.default);
app.use('/api/auth', authenticationRoutes_1.default);
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../public/browser/index.html'));
});
const port = normalizePort((_a = process.env.PORT) !== null && _a !== void 0 ? _a : '3000');
app.set('port', port);
const server = http_1.default.createServer(app);
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    (0, db_1.createUsersIndexes)().then().catch(console.error);
});
server.on('error', onError);
server.on('listening', onListening);
/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}
/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + (addr === null || addr === void 0 ? void 0 : addr.port);
    debug('Listening on ' + bind);
}
//# sourceMappingURL=app.js.map