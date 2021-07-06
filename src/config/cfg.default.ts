import * as path from 'path';

export default {
    db: {
        type: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        charset: 'utf8',
        username: 'root',
        password: 'root',
        database: 'nest_shop',
        synchronize: false,
        entities: [path.join(__dirname, '../entity/**/*.entity{.ts,.js}')],
        logging: 'all', // query, error, schema, warn, info, log, all
        logger: 'simple-console',
        maxQueryExecutionTime: 500, // 单位毫秒
    },
    redis: {
        host: '127.0.0.1',
        port: 6379,
        keyPrefix: 'nest:',
        family: 4, // 4 (IPv4) or 6 (IPv6)
        password: 'root',
        db: 0,
    },
    server: {
        domain: '127.0.0.1',
        port: 3000
    },
    aliyunOSS: {
        accessKeyID: '',
        accessKeySecret: '',
        bucket: '',
        region: '',
        uploadActionURL: '',
        uploadPrefix: 'local', // 上传路径加个前缀
        uploadFieldName: 'file',
        expiration: 6, // 上传凭证过期时间, 单位小时
        imgMaxSize: 3 * 1024 * 1024, // 设置上传图片的大小限制, 单位M
        imgMaxSizeError: '图片大小要小于%sM', // 图片大小超过限制时的提示
        callbackSecretToken: '123456789', // 用来验证是否是阿里云发过来的回调
    },
    aliyunSMS: {
        accessKeyID: '',
        accessKeySecret: '',
        signName: '',
        templateCode: '',
    }
};
