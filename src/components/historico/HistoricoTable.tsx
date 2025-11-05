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
    <table className="w-full border-collapse border text-sm">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2">Data/Hora</th>
          <th className="border p-2">Funcionário</th>
          <th className="border p-2">Campo Alterado</th>
          <th className="border p-2">Valor Antigo</th>
          <th className="border p-2">Valor Novo</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, idx) => (
          <tr key={idx}>
            <td className="border p-2">{item.dataHora}</td>
            <td className="border p-2">{item.funcionario}</td>
            <td className="border p-2">{item.campoAlterado}</td>
            <td className="border p-2">{item.valorAntigo}</td>
            <td className="border p-2">{item.valorNovo}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
