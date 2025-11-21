"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";
import { toast } from "sonner";

export default function HistoricoPonto() {
  const [funcionarios, setFuncionarios] = useState<any[]>([]);
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState<any>(null);
  const [pontos, setPontos] = useState<any[]>([]);
  const [contagens, setContagens] = useState<Record<string, number>>({});
  const [dialogAberto, setDialogAberto] = useState(false);

  useEffect(() => {
    setFuncionarios([
      { id: "1", nome: "João Silva" },
      { id: "2", nome: "Maria Souza" },
      { id: "3", nome: "Stheffany Santos" },
    ]);

    setTimeout(() => {
      funcionarios.forEach((func) => carregarContagem(func.id));
    }, 100);
  }, []);

  // 🔹 Função para buscar quantidade de pontos
  const carregarContagem = async (id: string) => {
    try {
      const response = await fetch(`https://stheffany-backend.df8lqa.easypanel.host/pontos/funcionario/${id}/contagem`);
      if (!response.ok) throw new Error("Erro ao carregar contagem");
      const data = await response.json();
      setContagens((prev) => ({ ...prev, [id]: data }));
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 Abrir modal e buscar pontos do funcionário
  const abrirHistorico = async (func: any) => {
    setFuncionarioSelecionado(func);
    setDialogAberto(true);

    try {
      const response = await fetch(`https://stheffany-backend.df8lqa.easypanel.host/pontos/funcionario/${func.id}`);
      if (!response.ok) throw new Error("Erro ao carregar histórico");
      const data = await response.json();
      // Converter string de data para objeto Date
      setPontos(data.map((p: any) => ({ ...p, dataHora: new Date(p.dataHora) })));
    } catch (error) {
      toast.error("Erro ao carregar histórico do ponto");
    }
  };

  const getStatus = (data: Date, index: number, registros: any[]) => {
    const primeira = registros[0];
    const ultima = registros[registros.length - 1];

    if (data === primeira.dataHora && data.getHours() > 8) return "Atrasado";
    if (data === ultima.dataHora && data.getHours() > 18) return "Hora Extra";
    return "Normal";
  };

  return (
    <div className="w-full min-h-screen p-10 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Histórico de Ponto</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {funcionarios.map((func) => (
          <motion.div
            key={func.id}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 100 }}
            onClick={() => abrirHistorico(func)}
            className="cursor-pointer"
          >
            <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 rounded-xl">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">{func.nome}</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <p className="text-gray-600 text-sm">{contagens[func.id] || 0} registros</p>
                <CalendarDays className="h-5 w-5 text-gray-500" />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {funcionarioSelecionado && (
        <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-gray-700" />
                Histórico de {funcionarioSelecionado.nome}
              </DialogTitle>
            </DialogHeader>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Hora</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pontos.map((p, index) => (
                  <TableRow key={p.id || index}>
                    <TableCell>{format(p.dataHora, "dd/MM/yyyy")}</TableCell>
                    <TableCell>{format(p.dataHora, "HH:mm:ss")}</TableCell>
                    <TableCell>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          getStatus(p.dataHora, index, pontos) === "Atrasado"
                            ? "bg-red-100 text-red-600"
                            : getStatus(p.dataHora, index, pontos) === "Hora Extra"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {getStatus(p.dataHora, index, pontos)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
