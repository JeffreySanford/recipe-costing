import { Test } from '@nestjs/testing';
import { IngredientsController } from './ingredients.controller';
import { INGREDIENTS } from '../app/mock-data';

describe('IngredientsController', () => {
  let controller: IngredientsController;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [IngredientsController],
      providers: [require('./ingredients.service').IngredientsService],
    }).compile();
    controller = module.get<IngredientsController>(IngredientsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all ingredients', () => {
    expect(controller.getAll()).toEqual(INGREDIENTS);
  });
});