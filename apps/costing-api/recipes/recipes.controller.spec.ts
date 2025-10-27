import { Test } from '@nestjs/testing';
import { RecipesController } from './recipes.controller';
import { RECIPES } from '../app/mock-data';

describe('RecipesController', () => {
  let controller: RecipesController;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [RecipesController],
      providers: [require('./recipes.service').RecipesService],
    }).compile();
    controller = module.get<RecipesController>(RecipesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all recipes', () => {
    expect(controller.getAll()).toEqual(RECIPES);
  });
});