import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { SwaggerHelper } from './common/helpers/swagger.helper';
import { AppConfig } from './configs/config.type';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Control work OKTEN')
    .setDescription(
      'Stage 1\n' +
        'Потрібно розробити REST API. REST API має підтримувати такі запити:\n' +
        "1. Авторизація користувача. Для авторизації 2 обов'язкові\n" +
        '   поля - email, password.\n' +
        '2. початок сесій користувача /Закінчення сесій користувача.\n' +
        '3. Перегляд списку користувачів (лише авторизованих користувачів).\n' +
        '4. Пошук користувача за ідентифікатором або поштою (лише для авторизованих користувачів).\n' +
        '5. Фільтрація користувачів по існуючих полях.\n' +
        '5. Реєстрація користувача.\n' +
        '6. Видалення користувача (тільки від свого імені).\n' +
        '7. Оновлення користувача (тільки від свого імені).\n' +
        '\n' +
        'Stage 2\n' +
        '   Додати API для керування постами.\n' +
        '1. Перегляд постів користувача (можна неавторизованим).\n' +
        '2. Створення посту для користувача (користувач може створити лише пост від свого імені).\n' +
        '3. Видалення посту для користувача (користувач може видалити лише свої пости).\n' +
        '4. Редагування поста користувача (користувач може редагувати лише свої пости). \n' +
        'Кожен пост повинен мати не порожню стрінгову властивість тексту, дату останнього оновлення/створення та ід.\n' +
        '\n' +
        "Обов'язкові поля - унікальні з відповідною валідацією.\n",
    )
    .setVersion('1.0')
    .addBearerAuth({
      in: 'header',
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: false,
      forbidNonWhitelisted: true,
    }),
  );

  const document = SwaggerModule.createDocument(app, config);
  SwaggerHelper.setDefaultResponses(document);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      docExpansion: 'none',
      defaultModelsExpandDepth: 7,
      persistAuthorization: true,
    },
  });

  const configService = app.get(ConfigService);
  const appConfig = configService.get<AppConfig>('app');

  await app.listen(appConfig.port, () => {
    console.log(
      `Server is running on http://${appConfig.host}:${appConfig.port}`,
    );
    console.log(
      `Swagger is running on http://${appConfig.host}:${appConfig.port}/docs`,
    );
  });
  console.log();
}
void bootstrap();
