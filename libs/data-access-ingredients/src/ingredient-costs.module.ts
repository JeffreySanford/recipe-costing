import { Module } from '@nestjs/common';
import { IngredientCostsController } from './ingredient-costs.controller';
import { IngredientCostsService } from './ingredient-costs.service';

@Module({
  controllers: [IngredientCostsController],
  providers: [IngredientCostsService],
  exports: [IngredientCostsService]
})
export class IngredientCostsModule {}
