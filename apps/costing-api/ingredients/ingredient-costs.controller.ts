import { Controller, Get } from '@nestjs/common';

@Controller('ingredient-costs')
export class IngredientCostsController {
  @Get()
  getAll() {
    // TODO: Replace with real logic
    return [{ id: 1, name: 'Popcorn', cost: 2.5 }];
  }
}
