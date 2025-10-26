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
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";

interface AddMedicationDialogProps {
  onAdd?: (medication: {
    name: string;
    dosage: string;
    frequency: string;
    instructions: string;
  }) => void;
}

export default function AddMedicationDialog({ onAdd }: AddMedicationDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    dosage: "",
    frequency: "",
    instructions: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onAdd) {
      onAdd(formData);
      console.log('Medication added:', formData);
    }
    setFormData({ name: "", dosage: "", frequency: "", instructions: "" });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button data-testid="button-add-medication">
          <Plus className="h-5 w-5 mr-2" />
          Add Medication
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md" aria-describedby="medication-dialog-description">
        <DialogHeader>
          <DialogTitle>Add New Medication</DialogTitle>
          <p id="medication-dialog-description" className="sr-only">
            Fill out the form to add a new medication to your health tracker
          </p>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Medication Name</Label>
            <Input
              id="name"
              placeholder="e.g., Ibuprofen"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              data-testid="input-medication-name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dosage">Dosage</Label>
            <Input
              id="dosage"
              placeholder="e.g., 200mg"
              value={formData.dosage}
              onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
              required
              data-testid="input-medication-dosage"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="frequency">Frequency</Label>
            <Input
              id="frequency"
              placeholder="e.g., Twice a day"
              value={formData.frequency}
              onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
              required
              data-testid="input-medication-frequency"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="instructions">Instructions (Optional)</Label>
            <Textarea
              id="instructions"
              placeholder="e.g., Take with food"
              value={formData.instructions}
              onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
              data-testid="input-medication-instructions"
            />
          </div>
          <div className="flex gap-3 justify-end">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" data-testid="button-submit-medication">
              Add Medication
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
