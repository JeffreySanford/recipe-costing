import { Injectable } from '@nestjs/common';

@Injectable()
export class IngredientCostsService {
  private costs: { [id: string]: number } = {
    'kernels-yellow': 2.00,
    'oil-canola': 0.50,
    'salt-fine': 0.10,
    'sugar-white': 1.00,
    'butter': 1.50,
    'caramel-syrup': 2.00,
    'white-choc-coating': 2.50,
    'candy-cane-crush': 1.25,
    'bbq-seasoning': 0.75,
    'brown-sugar': 0.80,
    'smoked-paprika': 0.60,
    'dill-seasoning': 0.90,
    'citric-acid': 0.30,
    'cheddar-powder': 2.20,
    'vanilla-extract': 1.10
  };

  getAll() {
    return this.costs;
  }

  add(id: string, price: number) {
    this.costs[id] = price;
    return { id, price };
  }

  update(id: string, price: number) {
    if (this.costs[id] !== undefined) {
      this.costs[id] = price;
      return { id, price };
    }
    return null;
  }

  remove(id: string) {
    if (this.costs[id] !== undefined) {
      delete this.costs[id];
      return { id };
    }
    return null;
  }
}
