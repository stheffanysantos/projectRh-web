import { DepartmentSalaryBar } from "@/components/dashboard/DepartmentSalaryBar";
import { Filters } from "@/components/dashboard/Filters";
import { Indicators } from "@/components/dashboard/Indicators";
import { SalaryChart } from "@/components/dashboard/SalaryChart";
import { useEffect, useState } from "react";

type Departamento = { nome: string; media: number };

type DashboardData = {
  mediaGeral: number;
  totalFuncionarios: number;
  variacaoPercentual: number;
  maiorSalario: number;
  menorSalario: number;
  departamentos: Departamento[];
};

export default function home() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/dashboard/salarios")
      .then((res) => res.json())
      .then(setDashboard);
  }, []);

  if (!dashboard) return <div>Carregando...</div>;

  return (
    <div className="max-w-5xl mx-auto my-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Salário Médio dos Funcionários</h1>
      <div className="flex gap-6 mb-8">
        <SalaryChart valor={dashboard.mediaGeral} />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">Distribuição por Departamento</h2>
        <DepartmentSalaryBar departamentos={dashboard.departamentos} />
      </div>
      <Indicators
        totalFuncionarios={dashboard.totalFuncionarios}
        variacaoPercentual={dashboard.variacaoPercentual}
        maiorSalario={dashboard.maiorSalario}
        menorSalario={dashboard.menorSalario}
      />
      <Filters />
    </div>
  );
}
