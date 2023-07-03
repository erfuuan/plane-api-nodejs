import util from 'util';
import redisObject from '../connections/redis.connection.js';
import appConfig from '../config/application.js';
import cryptography from "../utils/libraries/cryptography.js";
import chalk from 'chalk';

class Redis {
  static async put(key, value, timeout = null) {
    try {
      redisObject.redis.set(key, JSON.stringify(value));

      if (timeout) {
        await this.setExpire(key,timeout)
      }
    } catch (e) {
      console.error(`ERROR_009 => ${e}`);
    }
  }

  static async get(key) {
    try {
      const data = await redisObject.redis.get(key);
      return JSON.parse(data);
    } catch (e) {
      console.error(`ERROR_010 => ${e}`);
    }
  }


 static async getByPattern(pattern) {
    try {
      const data = await redisObject.redis.keys(pattern);
      return JSON.parse(cryptography.base64.decode(await this.get(data[0])))
      // return JSON.parse(data);
    } catch (e) {
      console.error(`ERROR_010 => ${e}`);
    }
  }



  static async getPendingRequestsByKey(key) {
    try {
      const data = await this.get(key);
      const stream = redisObject.redis.scanStream({
        match: `${data.username + appConfig.request.pendingPrefix}*`,
      });
      stream.on('data', (keys) => {
        if (keys.length) {
          console.info(keys);
          // const pipeline = redis.pipeline();
          keys.forEach(async (key) => {
            const req = JSON.parse(await this.get(key));
            console.info(req.cache);
          });
          // pipeline.exec();
        }
      });

      return data.username;
    } catch (e) {
      console.error(`ERROR_011 => ${e}`);
    }
  }

  static async insertPendingRequests(key, value) {
    try {
      const data = await this.get(key);
      data.pendingRequest += 1;
      this.put(key, data);
      this.put(data.username + appConfig.request.pendingPrefix + data.pendingRequest, JSON.stringify(util.inspect(value)));
    } catch (e) {
      console.error(`ERROR_012 => ${e}`);
    }
  }

  static async setExpire(key, value) {
    try {
      await redisObject.redis.expire(key,value);
    } catch (e) {
      console.error(`ERROR_013 => ${e}`);
    }
  }
}

export default {Redis};
