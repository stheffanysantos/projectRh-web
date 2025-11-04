import { Card } from "@/components/ui/card";

type IndicatorsProps = {
  totalFuncionarios: number;
  variacaoPercentual: number;
  maiorSalario: number;
  menorSalario: number;
};

export function Indicators({
  totalFuncionarios,
  variacaoPercentual,
  maiorSalario,
  menorSalario,
}: IndicatorsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
      <Card className="p-4 text-center">
        <div className="text-4xl font-bold">{totalFuncionarios}</div>
        <div>Total de Funcionários</div>
      </Card>
      <Card className="p-4 text-center">
        <div className="text-2xl font-bold">{variacaoPercentual > 0 ? "+" : ""}{variacaoPercentual}%</div>
        <div>Variação Percentual</div>
      </Card>
      <Card className="p-4 text-center">
        <div className="text-2xl font-bold">
          R$ {maiorSalario.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        </div>
        <div>Maior Salário</div>
      </Card>
      <Card className="p-4 text-center">
        <div className="text-2xl font-bold">
          R$ {menorSalario.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        </div>
        <div>Menor Salário</div>
      </Card>
    </div>
  );
}
