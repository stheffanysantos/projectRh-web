import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

type Alteracao = {
  dataHora: string;
  funcionario: string;
  campoAlterado: string;
  valorAntigo: string;
  valorNovo: string;
};

interface HistoricoTableProps {
  data: Alteracao[];
}

export default function HistoricoTable({ data }: HistoricoTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Data/Hora</TableHead>
          <TableHead>Funcionário</TableHead>
          <TableHead>Campo Alterado</TableHead>
          <TableHead>Valor Antigo</TableHead>
          <TableHead>Valor Novo</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, idx) => (
          <TableRow key={idx}>
            <TableCell>{item.dataHora}</TableCell>
            <TableCell>{item.funcionario}</TableCell>
            <TableCell>{item.campoAlterado}</TableCell>
            <TableCell>{item.valorAntigo}</TableCell>
            <TableCell>{item.valorNovo}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
