import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

interface Meta {
  descricao: string;
  status: string;
  nota: string;
  observacao?: string;
}

interface MetasTableProps {
  metas: Meta[];
}

export default function MetasTable({ metas }: MetasTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Descrição da Meta</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Notas</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {metas.map((meta, idx) => (
          <TableRow key={idx}>
            <TableCell>
              {meta.descricao}
              {meta.observacao && (
                <div className="text-muted-foreground text-xs">{meta.observacao}</div>
              )}
            </TableCell>
            <TableCell>{meta.status}</TableCell>
            <TableCell>{meta.nota}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
