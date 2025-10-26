import AddMetricDialog from '../AddMetricDialog';

export default function AddMetricDialogExample() {
  return (
    <div className="p-4">
      <AddMetricDialog onAdd={(metric) => console.log('Added:', metric)} />
    </div>
  );
}
