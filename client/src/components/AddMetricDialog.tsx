import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";

interface AddMetricDialogProps {
  onAdd?: (metric: any) => void;
}

export default function AddMetricDialog({ onAdd }: AddMetricDialogProps) {
  const [open, setOpen] = useState(false);
  const [metricType, setMetricType] = useState<string>("");
  const [formData, setFormData] = useState({
    value: "",
    systolic: "",
    diastolic: "",
    unit: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const metric = metricType === "blood-pressure"
      ? {
          type: metricType,
          systolic: parseInt(formData.systolic),
          diastolic: parseInt(formData.diastolic),
          unit: "mmHg",
        }
      : {
          type: metricType,
          value: parseInt(formData.value),
          unit: formData.unit,
        };
    
    if (onAdd) {
      onAdd(metric);
      console.log('Metric added:', metric);
    }
    setFormData({ value: "", systolic: "", diastolic: "", unit: "" });
    setMetricType("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button data-testid="button-add-metric">
          <Plus className="h-5 w-5 mr-2" />
          Add Metric
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md" aria-describedby="metric-dialog-description">
        <DialogHeader>
          <DialogTitle>Add Health Metric</DialogTitle>
          <p id="metric-dialog-description" className="sr-only">
            Fill out the form to record a new health metric measurement
          </p>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="type">Metric Type</Label>
            <Select value={metricType} onValueChange={setMetricType} required>
              <SelectTrigger data-testid="select-metric-type">
                <SelectValue placeholder="Select metric type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="blood-pressure">Blood Pressure</SelectItem>
                <SelectItem value="heart-rate">Heart Rate</SelectItem>
                <SelectItem value="weight">Weight</SelectItem>
                <SelectItem value="temperature">Temperature</SelectItem>
                <SelectItem value="glucose">Blood Glucose</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {metricType === "blood-pressure" ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="systolic">Systolic</Label>
                  <Input
                    id="systolic"
                    type="number"
                    placeholder="120"
                    value={formData.systolic}
                    onChange={(e) => setFormData({ ...formData, systolic: e.target.value })}
                    required
                    data-testid="input-systolic"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="diastolic">Diastolic</Label>
                  <Input
                    id="diastolic"
                    type="number"
                    placeholder="80"
                    value={formData.diastolic}
                    onChange={(e) => setFormData({ ...formData, diastolic: e.target.value })}
                    required
                    data-testid="input-diastolic"
                  />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Unit: mmHg</p>
            </>
          ) : metricType ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="value">Value</Label>
                <Input
                  id="value"
                  type="number"
                  placeholder="Enter value"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  required
                  data-testid="input-metric-value"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unit">Unit</Label>
                <Input
                  id="unit"
                  placeholder={metricType === "heart-rate" ? "bpm" : metricType === "weight" ? "kg" : "unit"}
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  required
                  data-testid="input-metric-unit"
                />
              </div>
            </>
          ) : null}

          <div className="flex gap-3 justify-end">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!metricType} data-testid="button-submit-metric">
              Add Metric
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
