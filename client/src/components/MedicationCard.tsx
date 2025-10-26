import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pill, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MedicationCardProps {
  name: string;
  dosage: string;
  frequency: string;
  instructions?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function MedicationCard({
  name,
  dosage,
  frequency,
  instructions,
  onEdit,
  onDelete,
}: MedicationCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-start gap-4">
        <div className="rounded-lg bg-primary/10 p-3">
          <Pill className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1 space-y-1">
          <h3 className="text-lg font-semibold" data-testid="text-medication-name">
            {name}
          </h3>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">{dosage}</span> • {frequency}
          </p>
          {instructions && (
            <p className="text-sm text-muted-foreground mt-2">{instructions}</p>
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" data-testid="button-medication-menu">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onEdit} data-testid="button-edit-medication">
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={onDelete} 
              className="text-destructive"
              data-testid="button-delete-medication"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );
}
