import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export function Filters() {
  return (
    <Card className="p-6 mt-4 max-w-lg">
      <div className="font-semibold mb-2">Filtros</div>
      <div className="mb-3">
        <Input placeholder="Departamento" defaultValue="Todos" />
      </div>
      <div>
        <Input placeholder="Status" defaultValue="Ativo/Inativo" />
      </div>
    </Card>
  );
}
