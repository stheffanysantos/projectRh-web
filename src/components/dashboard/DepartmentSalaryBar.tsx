import { Card } from "@/components/ui/card";

type Departamento = { nome: string; media: number };

export function DepartmentSalaryBar({ departamentos }: { departamentos: Departamento[] }) {
  const max = Math.max(...departamentos.map((d) => d.media));
  return (
    <Card className="p-6">
      <div className="font-semibold mb-4">Salário Médio por Departamento</div>
      {departamentos.map((dep) => (
        <div key={dep.nome} className="mb-2 flex items-center gap-2">
          <span className="w-24 text-muted-foreground">{dep.nome}</span>
          <div className="relative w-full h-3 bg-gray-100 rounded">
            <div
              className="absolute top-0 left-0 h-3 bg-primary rounded"
              style={{ width: `${(dep.media / max) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </Card>
  );
}
