import { ConfigService } from './config/config.service';

import { GlobalExceptionFilter } from './filters/global-exceptoin.filter';

import {
  renderFile
} from 'ejs'
import * as path from 'path';

function initView(app) {
  const configService: ConfigService = app.get(ConfigService);

	// app.useStaticAssets(path.join(__dirname, '../public'),{
  //   prefix: '/static'
  // })
	app.useStaticAssets(path.join(__dirname, '../public'))

  const viewPath = path.join(__dirname, '../views');
	app.setBaseViewsDir(viewPath); // 放视图的文件
	app.setViewEngine('ejs');
}

export default async function bootstrap(app, listening: boolean = true) {
  const configService: ConfigService = app.get(ConfigService);

  app.useGlobalFilters(new GlobalExceptionFilter());

  initView(app);

	if (listening) {
		await app.listen(configService.server.port);
	}	
}