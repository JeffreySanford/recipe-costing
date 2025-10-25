// ...existing imports
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  // Swagger/OpenAPI setup
  const config = new DocumentBuilder()
    .setTitle('Recipe Costing API')
    .setDescription('API for managing recipes, ingredients, and costing')
    .setVersion('1.0')
    .addTag('recipes')
    .addTag('ingredients')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Enable CORS for frontend dev
  app.enableCors({
    origin: ['http://localhost:4200'],
    credentials: true,
  });

  await app.listen(3000);
  console.log(`Backend running on: http://localhost:3000/api`);
  console.log(`Swagger docs available at: http://localhost:3000/api/docs`);
}
bootstrap();