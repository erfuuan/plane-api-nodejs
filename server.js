#!/usr/bin/env node
import http from "http";
import chalk from 'chalk';
import { app } from './app.js';
const port = (process.env.PORT || '3003');
app.set('port', port);
async function bootstrap() {
    const server = http.createServer(app);
    return server.listen(port, () => {
        // console.clear()
        console.log(chalk.white.green.bold('✔ [success] server listen to', port, '💥'), '\n \n \n')
    });
}
bootstrap()

// process.on('SIGINT', () => {
    // mongoose.connection.close(() => {
    //     console.log('Force to close the MongoDB conection');
    //     process.exit(0);
    // });
// });
// process.on('unhandledRejection', (err) => {
//     console.log('UNHANDLED REJECTION! 💥');
//     // console.error({ message: err.message, stack: err.stack });
// });
// Handle uncaughtException errors globally
// process.on('uncaughtException', (err) => {
//     console.log('Uncaught Exception!  Sutting down...');
//     console.error({ message: err.message, stack: err.stack });
//     // Shutdown application
//     process.exit(1);
// });
