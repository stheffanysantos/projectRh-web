import React, { useState, useMemo, useEffect } from "react";
import { Button } from "../../components/ui/button";
import HistoricoTable from "../../components/historico/HistoricoTable";
import { HistoricoFilters } from "../../components/historico/HistoricoFilters";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

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
          funcionario: item.funcionarioNome,
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

  // 📄 Exportar PDF
  function exportPDF() {
    const doc = new jsPDF();
    doc.text("Histórico de Alterações", 14, 15);

    autoTable(doc, {
      startY: 25,
      head: [["Data/Hora", "Funcionário", "Campo Alterado", "Valor Antigo", "Valor Novo"]],
      body: dataFiltrada.map((item) => [
        item.dataHora,
        item.funcionario,
        item.campoAlterado,
        item.valorAntigo,
        item.valorNovo,
      ]),
      styles: { fontSize: 9 },
    });

    doc.save("historico.pdf");
  }

  // 📊 Exportar Excel
  function exportXLSX() {
    const worksheet = XLSX.utils.json_to_sheet(dataFiltrada);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Histórico");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "historico.xlsx");
  }

  return (
    <div className="w-full p-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-3">
        <h1 className="text-2xl font-semibold">Histórico de Alterações</h1>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" onClick={exportPDF}>
            Exportar PDF
          </Button>
          <Button variant="outline" onClick={exportXLSX}>
            Exportar XLSX
          </Button>
        </div>
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
