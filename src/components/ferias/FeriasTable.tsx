import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

type Ferias = {
  funcionario: string;
  dataInicio: string;
  dataFim: string;
  status: string;
};

interface FeriasTableProps {
  ferias: Ferias[];
  onEdit: (idx: number) => void;
  onDelete: (idx: number) => void;
}

export default function FeriasTable({ ferias, onEdit, onDelete }: FeriasTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Funcionário</TableHead>
          <TableHead>Data Início</TableHead>
          <TableHead>Data Fim</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ferias.map((f, idx) => (
          <TableRow key={idx}>
            <TableCell>{f.funcionario}</TableCell>
            <TableCell>{f.dataInicio}</TableCell>
            <TableCell>{f.dataFim}</TableCell>
            <TableCell>
              <span className={`rounded px-2 py-1 text-xs
                ${f.status === "Pendente" ? "bg-yellow-100 text-yellow-800" : ""}
                ${f.status === "Em andamento" ? "bg-blue-100 text-blue-800" : ""}
                ${f.status === "Concluída" ? "bg-green-100 text-green-800" : ""}
              `}>
                {f.status}
              </span>
            </TableCell>
            <TableCell>
              <Button size="sm" variant="ghost" onClick={() => onEdit(idx)}>Edit</Button>
              <Button size="sm" variant="ghost" onClick={() => onDelete(idx)}>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
