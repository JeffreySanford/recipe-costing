import { IngredientsService } from './ingredients.service';
import { INGREDIENTS } from '../app/mock-data';

describe('IngredientsService', () => {
	let service: IngredientsService;

	beforeAll(() => {
		service = new IngredientsService();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should return all ingredients', () => {
		expect(service.getAll()).toEqual(INGREDIENTS);
	});
});