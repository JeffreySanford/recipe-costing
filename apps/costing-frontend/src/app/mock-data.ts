// Mock data for recipes and ingredients
export const INGREDIENTS = [
  { id:'kernels-yellow', name:'Popcorn Kernels (Yellow)' },
  { id:'oil-canola', name:'Canola Oil' },
  { id:'salt-fine', name:'Fine Salt' },
  { id:'sugar-white', name:'White Sugar' },
  { id:'butter', name:'Butter (unsalted)' },
  { id:'caramel-syrup', name:'Caramel Syrup' },
  { id:'white-choc-coating', name:'White Chocolate Coating' },
  { id:'candy-cane-crush', name:'Candy Cane (crushed)' },
  { id:'bbq-seasoning', name:'Texas BBQ Seasoning' },
  { id:'brown-sugar', name:'Brown Sugar' },
  { id:'smoked-paprika', name:'Smoked Paprika' },
  { id:'dill-seasoning', name:'Dill Pickle Seasoning' },
  { id:'citric-acid', name:'Citric Acid' },
  { id:'cheddar-powder', name:'Cheddar Cheese Powder' },
  { id:'vanilla-extract', name:'Vanilla Extract' }
];

export const RECIPES = [
  {
    id: 'bcp-base-40cup',
    name: 'BCP Base Popcorn (40 cups)',
    lines: [
      { id:'kern', ingredientId:'kernels-yellow', quantity:1.5, unit:'cup' },
      { id:'oil',  ingredientId:'oil-canola',      quantity:6,   unit:'tbsp' },
      { id:'salt', ingredientId:'salt-fine',       quantity:2,   unit:'tsp' }
    ],
    includes: [],
    packaging: { enabled: true, bagCupSizes: [3,4,6,18,40] }
  },
  {
    id: 'caramel-classic-40',
    name: 'Caramel Classic (40 cups)',
    lines: [
      { id:'sugar',   ingredientId:'sugar-white',     quantity:1.5, unit:'cup' },
      { id:'butter',  ingredientId:'butter',          quantity:0.5, unit:'cup' },
      { id:'caramel', ingredientId:'caramel-syrup',   quantity:0.75,unit:'cup' }
    ],
    includes: [{ recipeId:'bcp-base-40cup', multiplier:1 }],
    packaging: { enabled: true, bagCupSizes: [3,4,6,18,40] }
  },
  {
    id: 'peppermint-bark-40',
    name: 'Peppermint Bark (40 cups)',
    lines: [
      { id:'white', ingredientId:'white-choc-coating', quantity:1,   unit:'cup' },
      { id:'mint',  ingredientId:'candy-cane-crush',   quantity:0.75,unit:'cup' },
      { id:'van',   ingredientId:'vanilla-extract',    quantity:1,   unit:'tbsp' }
    ],
    includes: [{ recipeId:'bcp-base-40cup', multiplier:1 }],
    packaging: { enabled: true, bagCupSizes: [3,4,6,18,40] }
  },
  {
    id: 'texas-bbq-40',
    name: 'Texas BBQ (40 cups)',
    lines: [
      { id:'bbq',  ingredientId:'bbq-seasoning',  quantity:0.5, unit:'cup' },
      { id:'brwn', ingredientId:'brown-sugar',    quantity:0.25,unit:'cup' },
      { id:'smok', ingredientId:'smoked-paprika', quantity:1,   unit:'tbsp' }
    ],
    includes: [{ recipeId:'bcp-base-40cup', multiplier:1 }],
    packaging: { enabled: true, bagCupSizes: [3,4,6,18,40] }
  },
  {
    id: 'dill-pickle-40',
    name: 'Dill Pickle (40 cups)',
    lines: [
      { id:'dill', ingredientId:'dill-seasoning', quantity:0.5, unit:'cup' },
      { id:'acid', ingredientId:'citric-acid',    quantity:1,   unit:'tsp' }
    ],
    includes: [{ recipeId:'bcp-base-40cup', multiplier:1 }],
    packaging: { enabled: true, bagCupSizes: [3,4,6,18,40] }
  },
  {
    id: 'mr-cheddar-40',
    name: 'Mr. Cheddar (40 cups)',
    lines: [
      { id:'ched', ingredientId:'cheddar-powder', quantity:0.75, unit:'cup' }
    ],
    includes: [{ recipeId:'bcp-base-40cup', multiplier:1 }],
    packaging: { enabled: true, bagCupSizes: [3,4,6,18,40] }
  }
];
