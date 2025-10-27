import { Injectable } from '@nestjs/common';
import { INGREDIENTS } from '../app/mock-data';

@Injectable()
export class IngredientsService {
	getAll() {
		return INGREDIENTS;
	}
}