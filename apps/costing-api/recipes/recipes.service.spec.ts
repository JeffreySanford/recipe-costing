import { RecipesService } from './recipes.service';
import { RECIPES } from '../app/mock-data';

describe('RecipesService', () => {
	let service: RecipesService;

	beforeAll(() => {
		service = new RecipesService();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should return all recipes', () => {
		expect(service.getAll()).toEqual(RECIPES);
	});
});