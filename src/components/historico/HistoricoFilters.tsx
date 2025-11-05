import { useEffect, useState } from "react";

interface HistoricoFiltersProps {
  funcionario: string;
  onFuncionarioChange: (value: string) => void;
  campo: string;
  onCampoChange: (value: string) => void;
}

export function HistoricoFilters({
  funcionario,
  onFuncionarioChange,
  campo,
  onCampoChange,
}: HistoricoFiltersProps) {
  const [funcionarios, setFuncionarios] = useState<{ id: string; nome: string }[]>([]);

  useEffect(() => {
    fetch("https://projectrh-server.onrender.com/funcionarios")
      .then((res) => res.json())
      .then((data) => setFuncionarios(data))
      .catch((err) => console.error("Erro ao buscar funcionários:", err));
  }, []);

  return (
    <div className="flex gap-4 mb-4">
      <select
        value={funcionario}
        onChange={(e) => onFuncionarioChange(e.target.value)}
        className="border rounded p-2"
      >
        <option value="">Todos os funcionários</option>
        {funcionarios.map((f) => (
          <option key={f.id} value={f.nome}>
            {f.nome}
          </option>
        ))}
      </select>

      <input
        placeholder="Campo Alterado"
        value={campo}
        onChange={(e) => onCampoChange(e.target.value)}
        className="border rounded p-2"
      />
    </div>
  );
}
