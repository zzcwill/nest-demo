import BaseConfig from './BaseConfig';

export class ServerConfig extends BaseConfig {
    readonly domain: string;
    readonly port: number;

    constructor(cfg) {
        super(cfg);
    }
}