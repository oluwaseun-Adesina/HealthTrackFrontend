import AddMedicationDialog from '../AddMedicationDialog';

export default function AddMedicationDialogExample() {
  return (
    <div className="p-4">
      <AddMedicationDialog onAdd={(med) => console.log('Added:', med)} />
    </div>
  );
}
