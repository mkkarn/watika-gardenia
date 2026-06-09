export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  isVeg: boolean;
  isSpecial?: boolean;
}

export const menuItems: MenuItem[] = [
  // Starters
  {
    id: 'starter-1',
    name: 'Mezze Platter',
    description: 'Assorted Mediterranean dips with fresh pita bread',
    price: 450,
    category: 'Starters',
    image: '🧆',
    rating: 4.5,
    isVeg: true,
  },
  {
    id: 'starter-2',
    name: 'Crispy Calamari',
    description: 'Golden fried squid rings with tangy aioli',
    price: 520,
    category: 'Starters',
    image: '🦑',
    rating: 4.7,
    isVeg: false,
  },
  {
    id: 'starter-3',
    name: 'Paneer Tikka',
    description: 'Chargrilled cottage cheese with aromatic spices',
    price: 380,
    category: 'Starters',
    image: '🧀',
    rating: 4.6,
    isVeg: true,
  },
  {
    id: 'starter-4',
    name: 'Chicken Wings',
    description: 'Spicy glazed wings with honey BBQ sauce',
    price: 420,
    category: 'Starters',
    image: '🍗',
    rating: 4.8,
    isVeg: false,
  },
  {
    id: 'starter-5',
    name: 'Tomato Basil Soup',
    description: 'Creamy tomato soup with fresh basil',
    price: 280,
    category: 'Starters',
    image: '🍲',
    rating: 4.3,
    isVeg: true,
  },

  // Main Course
  {
    id: 'main-1',
    name: 'Butter Chicken',
    description: 'Tender chicken in rich tomato-butter gravy',
    price: 580,
    category: 'Main Course',
    image: '🍛',
    rating: 4.9,
    isVeg: false,
  },
  {
    id: 'main-2',
    name: 'Grilled Sea Bass',
    description: 'Fresh sea bass with lemon herb butter',
    price: 850,
    category: 'Main Course',
    image: '🐟',
    rating: 4.7,
    isVeg: false,
  },
  {
    id: 'main-3',
    name: 'Lamb Rogan Josh',
    description: 'Slow-cooked lamb in aromatic Kashmiri spices',
    price: 720,
    category: 'Main Course',
    image: '🍖',
    rating: 4.8,
    isVeg: false,
  },
  {
    id: 'main-4',
    name: 'Veg Thali',
    description: 'Complete Indian meal with 5 curries, rice & breads',
    price: 550,
    category: 'Main Course',
    image: '🍽️',
    rating: 4.6,
    isVeg: true,
  },

  // Breads
  {
    id: 'bread-1',
    name: 'Garlic Naan',
    description: 'Soft flatbread topped with garlic and butter',
    price: 80,
    category: 'Breads',
    image: '🫓',
    rating: 4.7,
    isVeg: true,
  },
  {
    id: 'bread-2',
    name: 'Stuffed Paratha',
    description: 'Whole wheat bread stuffed with spiced potatoes',
    price: 100,
    category: 'Breads',
    image: '🥙',
    rating: 4.5,
    isVeg: true,
  },

  // Rice & Biryani
  {
    id: 'rice-1',
    name: 'Hyderabadi Dum Biryani',
    description: 'Fragrant basmati rice with tender meat and spices',
    price: 650,
    category: 'Rice & Biryani',
    image: '🍚',
    rating: 4.9,
    isVeg: false,
  },
  {
    id: 'rice-2',
    name: 'Veg Pulao',
    description: 'Aromatic rice with seasonal vegetables',
    price: 320,
    category: 'Rice & Biryani',
    image: '🍛',
    rating: 4.4,
    isVeg: true,
  },

  // Desserts
  {
    id: 'dessert-1',
    name: 'Gulab Jamun',
    description: 'Soft milk dumplings in rose-flavored syrup',
    price: 180,
    category: 'Desserts',
    image: '🍡',
    rating: 4.8,
    isVeg: true,
  },
  {
    id: 'dessert-2',
    name: 'Chocolate Fondant',
    description: 'Warm chocolate cake with molten center',
    price: 280,
    category: 'Desserts',
    image: '🍰',
    rating: 4.9,
    isVeg: true,
  },
  {
    id: 'dessert-3',
    name: 'Phirni',
    description: 'Creamy rice pudding with cardamom and nuts',
    price: 150,
    category: 'Desserts',
    image: '🍮',
    rating: 4.6,
    isVeg: true,
  },

  // Beverages
  {
    id: 'beverage-1',
    name: 'Mango Lassi',
    description: 'Refreshing yogurt drink with fresh mango',
    price: 120,
    category: 'Beverages',
    image: '🥤',
    rating: 4.7,
    isVeg: true,
  },
  {
    id: 'beverage-2',
    name: 'Gardenia Mocktail',
    description: 'Signature blend of tropical fruits',
    price: 180,
    category: 'Beverages',
    image: '🍹',
    rating: 4.8,
    isVeg: true,
  },
  {
    id: 'beverage-3',
    name: 'Filter Coffee',
    description: 'Traditional South Indian coffee',
    price: 80,
    category: 'Beverages',
    image: '☕',
    rating: 4.6,
    isVeg: true,
  },

  // Chef Specials
  {
    id: 'special-1',
    name: 'Watika Signature Platter',
    description: 'Chef\'s selection of our finest dishes',
    price: 1200,
    category: 'Chef Specials',
    image: '⭐',
    rating: 5.0,
    isVeg: false,
    isSpecial: true,
  },
  {
    id: 'special-2',
    name: 'Truffle Risotto',
    description: 'Creamy arborio rice with black truffle',
    price: 950,
    category: 'Chef Specials',
    image: '🍄',
    rating: 4.9,
    isVeg: true,
    isSpecial: true,
  },
];

export const categories = [
  'All',
  'Starters',
  'Main Course',
  'Breads',
  'Rice & Biryani',
  'Desserts',
  'Beverages',
  'Chef Specials',
];
