import EmptyState from '../EmptyState';
import { Pill } from 'lucide-react';

export default function EmptyStateExample() {
  return (
    <div className="p-4">
      <EmptyState
        title="No medications yet"
        description="Start tracking your medications by adding your first one"
        icon={Pill}
        actionLabel="Add Medication"
        onAction={() => console.log('Add medication clicked')}
      />
    </div>
  );
}
