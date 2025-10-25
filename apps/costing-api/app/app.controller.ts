import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { INGREDIENTS, RECIPES } from './mock-data';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData(): { message: string } {
    return this.appService.getData();
  }

  @Get('ingredients')
  getIngredients() {
    return INGREDIENTS;
  }

  @Get('recipes')
  getRecipes() {
    return RECIPES;
  }
}
