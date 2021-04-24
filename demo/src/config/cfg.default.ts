import * as path from 'path';

const domain = 'dev.golang123.com';
const port = 9905;
const url = `http://${domain}`;
const mDomain = 'm-dev.golang123.com';
const mURL = `http://${mDomain}`;

const staticURL = `http://${domain}`;

export default {
    db: {
        type: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        charset: 'utf8',
        username: 'root',
        password: 'root',
        database: 'shop',
        synchronize: false,
        entities: [path.join(__dirname, '../entity/**/*.entity{.ts,.js}')],
        logging: 'all', // query, error, schema, warn, info, log, all
        logger: 'simple-console',
        maxQueryExecutionTime: 500, // 单位毫秒
    },
    redis: {
        host: '127.0.0.1',
        port: 6379,
        // keyPrefix: 'mili:',
        family: 4, // 4 (IPv4) or 6 (IPv6)
        password: 'root',
        db: 0,
    },
    static: {
        staticURL,
        cssPath: `${staticURL}/styles`,
        jsPath: `${staticURL}/js`,
        imgPath: `${staticURL}/images`,
        fontPath: `${staticURL}/fonts`,
        uploadImgURL: '',
        imgFormat: ['jpg', 'jpeg', 'png'],
        imgMaxSize: 3 * 1024 * 1024,
        imgMaxSizeError: '图片大小不能超过%sM',
        userLevelChapterURL: 'https://www.golang123.com/books/90/chapters/1515', // 用户等级在《如何使用米粒社区》中的章节url
    },
    statsD: {
        host: 'localhost',
        port: 8125,
        prefix: 'mili_',
        protocol: 'udp',
    },
    server: {
        siteName: '米粒',
        companyName: '北京xxxxxxx有限公司',
        icp: '京ICP备12345678号',
        url,
        mURL,
        domain,
        mDomain,
        allowOrigins: [],
        port,
        apiPrefix: '/api/v1',
        passSalt: 'u5o2law8xi',
        tokenName: 'token',
        tokenSecret: 'ema21ioirJikXIkLCJugmeiv',
        tokenMaxAge: 7 * 24 * 60 * 60 * 1000, // token多久过期，单位毫秒
        cookieSecret: 'aiwyskgun7cwimjq',
        rateLimitWindowMs: 15 * 60 * 1000, // 时间窗口，单位毫秒
        rateLimitMax: 1000, // limit each IP to rateLimitMax requests per windowMs
        swaggerPrefix: 'api/v1',
        xiaoceEmail: 'xiaoce@abc.com',
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
    },
    geetestCaptcha: {
        geetest_id: '',
        geetest_key: '',
    },
    github: {
        clientID: '',
        clientSecret: '',
        authorizeURL: 'https://github.com/login/oauth/authorize?scope=user&client_id=%s',
        accessTokenURL: 'https://github.com/login/oauth/access_token',
        userInfoURL: 'https://api.github.com/user?access_token=%s',
    },
    weibo: {
        appKey: '',
        appSecret: '',
        state: '', // 这个参数可用于防止跨站请求伪造（CSRF）攻击
        serverURL: url,
        redirectURL: '',
        // tslint:disable-next-line:max-line-length
        authorizeURL: 'https://api.weibo.com/oauth2/authorize?state=%s&scope=email&client_id=%s&response_type=code&redirect_uri=%s',
        // tslint:disable-next-line:max-line-length
        accessTokenURL: 'https://api.weibo.com/oauth2/access_token?client_id=%s&client_secret=%s&grant_type=authorization_code&redirect_uri=%s&code=%s',
        userInfoURL: 'https://api.weibo.com/2/users/show.json?access_token=%s&uid=%s',
    },
};
