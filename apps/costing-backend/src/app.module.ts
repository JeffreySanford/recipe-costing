import { Module } from '@nestjs/common';
import { IngredientCostsModule } from '../../../libs/data-access-ingredients/src/ingredient-costs.module';

@Module({
  imports: [IngredientCostsModule],
})
export class AppModule {}
