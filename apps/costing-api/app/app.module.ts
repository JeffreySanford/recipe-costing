
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IngredientCostsModule } from '../ingredients/ingredient-costs.module';
import { RecipesModule } from '../recipes/recipes.module';

@Module({
  imports: [IngredientCostsModule, RecipesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
