import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectItem } from "@/components/ui/select";

interface FuncionarioFiltersProps {
  search: string;
  onSearch: (v: string) => void;
  posicao: string;
  onPosicao: (v: string) => void;
  departamento: string;
  onDepartamento: (v: string) => void;
}

export default function FuncionarioFilters({
  search, onSearch, posicao, onPosicao, departamento, onDepartamento
}: FuncionarioFiltersProps) {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <Input
        className="max-w-xs"
        placeholder="Pesquisar funcionário"
        value={search}
        onChange={e => onSearch(e.target.value)}
      />
      <Select value={posicao} onValueChange={onPosicao}>
        <SelectItem value="">Posição</SelectItem>
        <SelectItem value="Software Engineer">Software Engineer</SelectItem>
        <SelectItem value="Product Manager">Product Manager</SelectItem>
        <SelectItem value="UX Designer">UX Designer</SelectItem>
        {/* ...adicionar outros cargos */}
      </Select>
      <Select value={departamento} onValueChange={onDepartamento}>
        <SelectItem value="">Departamento</SelectItem>
        <SelectItem value="Engineering">Engineering</SelectItem>
        <SelectItem value="Product">Product</SelectItem>
        <SelectItem value="Design">Design</SelectItem>
        {/* ...adicionar outros departamentos */}
      </Select>
    </div>
  );
}
