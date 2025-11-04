import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

type Relatorio = {
  nome: string;
  cargo: string;
  dataAdmissao: string;
  salario: string;
  status: string;
};

interface RelatorioTableProps {
  data: Relatorio[];
}

export default function RelatorioTable({ data }: RelatorioTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Cargo</TableHead>
          <TableHead>Data de Admissão</TableHead>
          <TableHead>Salário</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((rel, idx) => (
          <TableRow key={idx}>
            <TableCell>{rel.nome}</TableCell>
            <TableCell>{rel.cargo}</TableCell>
            <TableCell>{rel.dataAdmissao}</TableCell>
            <TableCell>{rel.salario}</TableCell>
            <TableCell>{rel.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
