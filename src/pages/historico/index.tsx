import React, { useState, useMemo, useEffect } from "react";
import { Button } from "../../components/ui/button";
import HistoricoTable from "../../components/ historico/HistoricoTable";
import { HistoricoFilters } from "../../components/ historico/HistoricoFilters";

// Type
type Alteracao = {
  dataHora: string;
  funcionario: string;
  campoAlterado: string;
  valorAntigo: string;
  valorNovo: string;
};

export default function HistoricoPage() {
  const [search, setSearch] = useState("");
  const [historico, setHistorico] = useState<Alteracao[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/historico")
      .then((res) => res.json())
      .then((data) => setHistorico(data))
      .finally(() => setLoading(false));
  }, []);

  // Filtro local
  const data = useMemo(
    () =>
      historico.filter(
        (item) =>
          item.funcionario.toLowerCase().includes(search.toLowerCase()) ||
          item.campoAlterado.toLowerCase().includes(search.toLowerCase()) ||
          item.valorAntigo.toLowerCase().includes(search.toLowerCase()) ||
          item.valorNovo.toLowerCase().includes(search.toLowerCase())
      ),
    [search, historico]
  );

  function exportPDF() {
    alert("Exportar PDF ainda não implementado!");
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Histórico de Alterações</h1>
        <Button variant="outline" onClick={exportPDF}>Exportar PDF</Button>
      </div>
      <HistoricoFilters value={search} onChange={setSearch} />
      {loading ? (
        <div>Carregando...</div>
      ) : (
        <HistoricoTable data={data} />
      )}
    </div>
  );
}
