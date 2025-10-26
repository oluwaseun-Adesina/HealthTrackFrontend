import MedicationCard from '../MedicationCard';

export default function MedicationCardExample() {
  return (
    <div className="p-4 max-w-2xl">
      <MedicationCard
        name="Ibuprofen"
        dosage="200mg"
        frequency="Twice a day"
        instructions="Take with food"
        onEdit={() => console.log('Edit clicked')}
        onDelete={() => console.log('Delete clicked')}
      />
    </div>
  );
}
