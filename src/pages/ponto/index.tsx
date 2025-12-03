"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Clock8 } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

export default function BaterPonto() {
  const [funcionario, setFuncionario] = useState<string | null>(null);
  const [funcionarios, setFuncionarios] = useState<any[]>([]);
  const [pontoRegistrado, setPontoRegistrado] = useState<{ status: string; time: Date } | null>(null);
  const [horarioAtual, setHorarioAtual] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const API_URL = "https://stheffany-backend.df8lqa.easypanel.host";

  // 🔹 Atualiza o relógio em tempo real
  useEffect(() => {
    const timer = setInterval(() => setHorarioAtual(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // 🔹 Carregar funcionários da API
  useEffect(() => {
    async function carregarFuncionarios() {
      try {
        const res = await fetch(`${API_URL}/funcionarios`);
        if (!res.ok) throw new Error("Erro ao carregar funcionários");

        let data = await res.json();

        // ✔️ Tratamento caso venha só número
        data = data.map((f: any) => ({
          id: f.id || f._id,
          nome: f.nome || f.nomeCompleto || f.nomeFuncionario || `Funcionário ${f.id}`,
        }));

        setFuncionarios(data);
      } catch (error) {
        console.error(error);
        toast.error("Falha ao carregar funcionários");
      }
    }

    carregarFuncionarios();
  }, []);

  // 🔹 Registrar ponto
  const registrarPonto = async () => {
    if (!funcionario) {
      toast.warning("Selecione um funcionário antes de registrar!");
      return;
    }

    const hora = horarioAtual.getHours();
    let status = "Normal";
    if (hora > 18) status = "Hora Extra";
    else if (hora > 8) status = "Atrasado";

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/pontos/registrar/${funcionario}`, { method: "POST" });
      if (!response.ok) throw new Error("Erro ao registrar ponto");

      const data = await response.json();
      setPontoRegistrado({ status, time: new Date(data.dataHora) });

      toast.success(`Ponto registrado para ${funcionarios.find(f => f.id === funcionario)?.nome}!`);
    } catch (error) {
      console.error(error);
      toast.error("Falha ao registrar ponto!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white/70 backdrop-blur-md shadow-lg rounded-2xl p-10 w-[420px] flex flex-col items-center gap-6 border border-gray-200">
        
        <div className="flex items-center gap-2 text-gray-800">
          <Clock8 />
          <span className="font-semibold text-lg">{format(horarioAtual, "HH:mm:ss")}</span>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Registro de Ponto</h1>

        {/* 🔹 Select de Funcionário */}
        <div className="w-full">
          <Select onValueChange={setFuncionario} disabled={loading}>
            <SelectTrigger className="h-12 text-gray-700">
              <SelectValue placeholder="Selecione o funcionário" />
            </SelectTrigger>
            <SelectContent>
              {funcionarios.map(f => (
                <SelectItem key={f.id} value={f.id}>
                  {f.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 🔹 Botão deslizante */}
        {!pontoRegistrado ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative w-full h-16 bg-gray-200 rounded-full flex items-center overflow-hidden shadow-inner"
          >
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 260 }}
              whileHover={funcionario && !loading ? { scale: 1.05 } : {}}
              whileTap={funcionario && !loading ? { scale: 0.95 } : {}}
              dragMomentum={false}
              onDragEnd={() => funcionario && !loading && registrarPonto()}
              className={`w-16 h-16 ${
                funcionario && !loading ? "bg-blue-500 hover:bg-blue-600 cursor-pointer" : "bg-gray-400 cursor-not-allowed"
              } rounded-full flex items-center justify-center text-white transition`}
            >
              {loading ? "..." : ""}
            </motion.div>

            <span className="absolute right-4 text-gray-600 text-sm font-medium">
              {loading
                ? "Registrando..."
                : funcionario
                ? "Arraste para registrar"
                : "Selecione o funcionário"}
            </span>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center"
          >
            <CheckCircle
              size={48}
              className={
                pontoRegistrado.status === "Atrasado"
                  ? "text-red-500"
                  : pontoRegistrado.status === "Hora Extra"
                  ? "text-yellow-500"
                  : "text-green-500"
              }
            />
            <p className="font-semibold mt-2">
              {pontoRegistrado.status === "Normal" ? "Ponto registrado!" : pontoRegistrado.status}
            </p>
            <p className="text-sm text-gray-700">
              {format(pontoRegistrado.time, "dd/MM/yyyy 'às' HH:mm:ss")}
            </p>
            <p className="mt-2 text-xs text-gray-400">
              Funcionário: {funcionarios.find(f => f.id === funcionario)?.nome}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
