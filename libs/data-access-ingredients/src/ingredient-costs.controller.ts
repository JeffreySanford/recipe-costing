import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { IngredientCostsService } from './ingredient-costs.service';

@Controller('ingredient-costs')
export class IngredientCostsController {
  constructor(private readonly service: IngredientCostsService) {}

  @Get()
  getAll() {
    return this.service.getAll();
  }

  @Post()
  add(@Body() body: { id: string; price: number }) {
    return this.service.add(body.id, body.price);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: { price: number }) {
    return this.service.update(id, body.price);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
