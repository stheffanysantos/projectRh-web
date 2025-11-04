import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

type Funcionario = {
  nome: string;
  posicao: string;
  departamento: string;
  contratacao: string;
  status: string;
};

interface FuncionarioTableProps {
  funcionarios: Funcionario[];
  onView: (idx: number) => void;
  onEdit: (idx: number) => void;
  onDeactivate: (idx: number) => void;
}

export default function FuncionarioTable({ funcionarios, onView, onEdit, onDeactivate }: FuncionarioTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Posição</TableHead>
          <TableHead>Departamento</TableHead>
          <TableHead>Contratação</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {funcionarios.map((f, idx) => (
          <TableRow key={idx}>
            <TableCell>{f.nome}</TableCell>
            <TableCell>{f.posicao}</TableCell>
            <TableCell>{f.departamento}</TableCell>
            <TableCell>{f.contratacao}</TableCell>
            <TableCell>
              <span className={`rounded px-2 py-1 text-xs ${f.status==="Ativo" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}>
                {f.status}
              </span>
            </TableCell>
            <TableCell>
              <Button size="sm" variant="ghost" onClick={()=>onView(idx)}>View Details</Button>
              <Button size="sm" variant="ghost" onClick={()=>onEdit(idx)}>Edit</Button>
              <Button size="sm" variant="ghost" onClick={()=>onDeactivate(idx)}>Deactivate</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
