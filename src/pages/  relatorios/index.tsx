import React, { useEffect, useState } from "react";
import RelatorioFilters from "@/components/relatorios/RelatorioFilters";
import RelatorioTable from "@/components/relatorios/RelatorioTable";
import { Button } from "@/components/ui/button";

// Tipos:
type Relatorio = {
  nome: string;
  cargo: string;
  dataAdmissao: string;
  salario: string;
  status: string;
};

export default function RelatoriosPage() {
  const [status, setStatus] = useState("Todos");
  const [formato, setFormato] = useState("");
  const [data, setData] = useState<Relatorio[]>([]);
  const [loading, setLoading] = useState(true);

  // Busca dados dinâmicos, filtrando por status se diferente de "Todos"
  useEffect(() => {
    setLoading(true);
    let url = "http://localhost:8080/relatorios";
    if (status !== "Todos") {
      url += `?status=${encodeURIComponent(status)}`;
    }
    fetch(url)
      .then((res) => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, [status]);

  function exportPDF() {
    alert("Exportar PDF ainda não implementado!");
  }

  return (
    <div className="max-w-4xl mx-auto my-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Relatórios de Funcionários</h1>
        <Button variant="outline" onClick={exportPDF}>
          Exportar PDF
        </Button>
      </div>

      <RelatorioFilters
        status={status}
        setStatus={setStatus}
        formato={formato}
        setFormato={setFormato}
        onGerar={() => {}}
        onVisualizar={() => {}}
      />
      {loading ? <div>Carregando...</div> : <RelatorioTable data={data} />}
    </div>
  );
}
