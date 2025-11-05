import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Ferias } from "@/types/Ferias";


interface FeriasTableProps {
  ferias: Ferias[];
  onEdit: (f: Ferias) => void;
  onDelete: (id: string) => void;
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
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {ferias.map((f, idx) => (
          <TableRow key={idx} className="hover:bg-gray-50 transition-colors">
            <TableCell>{f.funcionarioNome}</TableCell>
            <TableCell>{new Date(f.dataInicio).toLocaleDateString("pt-BR")}</TableCell>
            <TableCell>{new Date(f.dataFim).toLocaleDateString("pt-BR")}</TableCell>
            <TableCell>
              <span
                className={`rounded px-2 py-1 text-xs border
                  ${
                    f.status === "Aprovado"
                      ? "bg-green-50 text-green-700 border-green-100"
                      : f.status === "Solicitado"
                      ? "bg-yellow-50 text-yellow-700 border-yellow-100"
                      : f.status === "Recusado"
                      ? "bg-red-50 text-red-700 border-red-100"
                      : "bg-gray-50 text-gray-700 border-gray-100"
                  }`}
              >
                {f.status}
              </span>
            </TableCell>
            <TableCell className="space-x-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onEdit(f)}
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                Editar
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => f.id && onDelete(f.id)}
                className="text-gray-600 hover:text-red-600 hover:bg-red-50"
              >
                Excluir
              </Button>
            </TableCell>
          </TableRow>
        ))}

        {ferias.length === 0 && (
          <TableRow>
            <TableCell colSpan={5} className="text-center text-gray-500 py-6">
              Nenhum registro de férias encontrado.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
