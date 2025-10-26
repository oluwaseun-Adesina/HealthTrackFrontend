import StatCard from '../StatCard';
import { Heart } from 'lucide-react';

export default function StatCardExample() {
  return (
    <div className="p-4 max-w-sm">
      <StatCard
        title="Heart Rate"
        value="75"
        icon={Heart}
        description="Last updated today"
      />
    </div>
  );
}
