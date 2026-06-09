import { menuItems } from '../data/menuData';
import MenuItemCard from './MenuItemCard';

interface RecommendationsProps {
  title?: string;
  count?: number;
  excludeIds?: string[];
}

export default function Recommendations({ 
  title = 'Recommended For You', 
  count = 4,
  excludeIds = []
}: RecommendationsProps) {
  // Get top-rated items, excluding specified IDs
  const recommendations = menuItems
    .filter(item => !excludeIds.includes(item.id))
    .sort((a, b) => b.rating - a.rating)
    .slice(0, count);

  if (recommendations.length === 0) return null;

  return (
    <div className="bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-yellow-500 mb-8 text-center">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendations.map(item => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
