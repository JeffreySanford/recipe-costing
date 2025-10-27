import { Test } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { INGREDIENTS, RECIPES } from './mock-data';

describe('AppController', () => {
  let appController: AppController;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
    appController = app.get<AppController>(AppController);
  });

  it('should return "Hello API" for root', () => {
    expect(appController.getData()).toEqual({ message: 'Hello API' });
  });

  it('should return all ingredients', () => {
    expect(appController.getIngredients()).toEqual(INGREDIENTS);
  });

  it('should return all recipes', () => {
    expect(appController.getRecipes()).toEqual(RECIPES);
  });
});
