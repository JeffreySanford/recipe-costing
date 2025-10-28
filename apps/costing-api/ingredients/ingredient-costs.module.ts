import { Module } from '@nestjs/common';
import { IngredientCostsController } from './ingredient-costs.controller';

@Module({
  controllers: [IngredientCostsController],
})
export class IngredientCostsModule {}
