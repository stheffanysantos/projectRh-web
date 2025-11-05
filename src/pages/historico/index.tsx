import React, { useState, useMemo, useEffect } from "react";
import { Button } from "../../components/ui/button";
import HistoricoTable from "../../components/historico/HistoricoTable";
import { HistoricoFilters } from "../../components/historico/HistoricoFilters";

type Alteracao = {
  dataHora: string;
  funcionario: string;
  campoAlterado: string;
  valorAntigo: string;
  valorNovo: string;
};

export default function HistoricoPage() {
  const [funcionario, setFuncionario] = useState("");
  const [campo, setCampo] = useState("");
  const [historico, setHistorico] = useState<Alteracao[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://stheffany-backend.df8lqa.easypanel.host/historico")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((item: any) => ({
          dataHora: item.dataHora,
          funcionario: item.funcionarioNome, // mapeia o campo do backend
          campoAlterado: item.campoAlterado,
          valorAntigo: item.valorAntigo,
          valorNovo: item.valorNovo,
        }));
        setHistorico(formatted);
      })
      .catch((err) => console.error("Erro ao carregar histórico:", err))
      .finally(() => setLoading(false));
  }, []);

  const dataFiltrada = useMemo(() => {
    return historico.filter(
      (item) =>
        (funcionario === "" || item.funcionario === funcionario) &&
        (campo === "" ||
          item.campoAlterado.toLowerCase().includes(campo.toLowerCase()))
    );
  }, [historico, funcionario, campo]);

  function exportPDF() {
    alert("Exportar PDF ainda não implementado!");
  }

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Histórico de Alterações</h1>
        <Button variant="outline" onClick={exportPDF}>
          Exportar PDF
        </Button>
      </div>

      <HistoricoFilters
        funcionario={funcionario}
        onFuncionarioChange={setFuncionario}
        campo={campo}
        onCampoChange={setCampo}
      />

      {loading ? (
        <div>Carregando...</div>
      ) : (
        <HistoricoTable data={dataFiltrada} />
      )}
    </div>
  );
}
