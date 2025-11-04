import { Input } from "@/components/ui/input";

interface HistoricoFiltersProps {
  value: string;
  onChange: (value: string) => void;
}

export function HistoricoFilters({ value, onChange }: HistoricoFiltersProps) {
  return (
    <Input
      className="mb-4"
      placeholder="Pesquisar funcionário, campo..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
