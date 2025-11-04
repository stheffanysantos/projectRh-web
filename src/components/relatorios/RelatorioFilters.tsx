import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface RelatorioFiltersProps {
  status: string;
  setStatus: (s: string) => void;
  formato: string;
  setFormato: (f: string) => void;
  onGerar: () => void;
  onVisualizar: () => void;
}

export default function RelatorioFilters({
  status, setStatus, formato, setFormato, onGerar, onVisualizar,
}: RelatorioFiltersProps) {
  return (
    <div className="mb-6">
      <div className="flex space-x-4 mb-3">
        <Button variant={status==="Todos" ? "default":"outline"} onClick={()=>setStatus("Todos")}>Todos</Button>
        <Button variant={status==="Ativos" ? "default":"outline"} onClick={()=>setStatus("Ativos")}>Ativos</Button>
        <Button variant={status==="Inativos" ? "default":"outline"} onClick={()=>setStatus("Inativos")}>Inativos</Button>
      </div>
      <Input
        placeholder="Formato"
        value={formato}
        onChange={e => setFormato(e.target.value)}
        className="mb-3 max-w-xs"
      />
      <div className="flex gap-2">
        <Button type="button" onClick={onGerar}>Gerar Relatório</Button>
        <Button type="button" variant="outline" onClick={onVisualizar}>Visualizar</Button>
      </div>
    </div>
  );
}
