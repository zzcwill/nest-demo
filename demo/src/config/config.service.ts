import * as _ from 'lodash';
import defaultJSON from './cfg.default';
import developmentJSON from './cfg.development';
import testJSON from './cfg.test';
import productionJSON from './cfg.production';
import DBConfig from './type/DBConfig';

import { ServerConfig } from './type/ServerConfig';
import StaticConfig from './type/StaticConfig';
import RedisConfig from './type/RedisConfig';

export class ConfigService {
    readonly DEVELOPMENT = 'development';
    readonly TEST = 'test';
    readonly PRODUCTION = 'production';

    readonly env: string;
    readonly db: DBConfig;
    readonly redis: RedisConfig;
    readonly server: ServerConfig;
    readonly static: StaticConfig;

    constructor() {
        const envConfigMap = {
            development: developmentJSON,
            test: testJSON,
            production: productionJSON,
        };
        if (envConfigMap[process.env.NODE_ENV]) {
            _.merge(defaultJSON, envConfigMap[process.env.NODE_ENV]);
            this.env = process.env.NODE_ENV;
        } else {
            this.env = this.DEVELOPMENT;
        }
        this.db = new DBConfig(defaultJSON.db);
        if (this.env !== this.DEVELOPMENT && this.db.synchronize) {
            process.exit(-1);
        }
        this.redis = new RedisConfig(defaultJSON.redis);
        this.server = new ServerConfig(defaultJSON.server);
        this.static = new StaticConfig(defaultJSON.static);
    }
}
