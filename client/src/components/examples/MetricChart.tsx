import MetricChart from '../MetricChart';

export default function MetricChartExample() {
  const mockData = [
    { date: 'Oct 22', value: 72 },
    { date: 'Oct 23', value: 75 },
    { date: 'Oct 24', value: 70 },
    { date: 'Oct 25', value: 73 },
    { date: 'Oct 26', value: 75 },
  ];

  return (
    <div className="p-4 max-w-3xl">
      <MetricChart
        title="Heart Rate History"
        data={mockData}
        dataKey="value"
      />
    </div>
  );
}
