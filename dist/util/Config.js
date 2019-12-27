"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Config {
    static get(key, envDetermined = true) {
        const node_env = envDetermined ? process.env.NODE_ENV === "development" ? "_BETA" : "_PROD" : "";
        const env = process.env[`${key.toUpperCase()}${node_env}`];
        return env;
    }
}
exports.Config = Config;
