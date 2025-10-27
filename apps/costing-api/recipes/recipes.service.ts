import { Injectable } from '@nestjs/common';
import { RECIPES } from '../app/mock-data';

@Injectable()
export class RecipesService {
	getAll() {
		return RECIPES;
	}
}