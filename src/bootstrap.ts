import * as express from 'express';

// import { logger } from './middleware/logger.middleware';
// import { TransformInterceptor } from './interceptor/transform.interceptor';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { AllExceptionsFilter } from './filters/any-exception.filter';

export default async function bootstrap(app) {
  // app.use(express.json()); // For parsing application/json
  // app.use(express.urlencoded({ extended: false })); // For parsing application/x-www-form-urlencoded

  // 监听所有的请求路由，并打印日志
  // app.use(logger);
  // 使用拦截器打印出参
  // app.useGlobalInterceptors(new TransformInterceptor());
  // app.setGlobalPrefix('api');
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalFilters(new HttpExceptionFilter());
}
