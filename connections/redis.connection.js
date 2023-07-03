import Redis from 'ioredis';
import appConfig from '../config/application.js';
import chalk from 'chalk';

const redis = new Redis(appConfig.redis);
const operationalRedis = new Redis(appConfig.redis_operational);//redis_operational

redis.on('connect', (message) => {
  console.log('✔  [success] redis connected successfully :', JSON.stringify(appConfig.redis));
})
operationalRedis.on('connect', (message) => {
  console.log('✔  [success] operationalRedis connected successfully :', JSON.stringify(appConfig.redis_operational));
})

// Log Redis errors
redis.on('error', (error) => {
  console.log(chalk.red(`Redis Client error ${error}`));
});
operationalRedis.on('error', (error) => {
  console.log(chalk.red(`operationalRedis Client error ${error}`));
});

export default { redis, operationalRedis }