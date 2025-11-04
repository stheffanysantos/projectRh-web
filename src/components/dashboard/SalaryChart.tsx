import { Card, CardContent } from "@/components/ui/card";

export function SalaryChart({ valor }: { valor: number }) {
  return (
    <Card className="flex">
      {/* Substitua por seu gráfico real */}
      <img src="/chart-placeholder.png" alt="Gráfico de salário" className="w-2/3 rounded-l" />
      <CardContent className="flex flex-col justify-center items-center w-1/3">
        <div className="text-2xl font-bold">R$ {valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</div>
        <div className="text-muted-foreground">Salário Médio Total</div>
      </CardContent>
    </Card>
  );
}
