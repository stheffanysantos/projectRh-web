import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

type Ferias = {
  funcionario: string;
  dataInicio: string;
  dataFim: string;
  status: string;
};

interface FeriasFormProps {
  onClose: () => void;
  onSuccess: (ferias: Ferias) => void;
}

export default function FeriasForm({ onClose, onSuccess }: FeriasFormProps) {
  const [form, setForm] = useState<Ferias>({
    funcionario: "",
    dataInicio: "",
    dataFim: "",
    status: "Pendente",
  });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const resp = await fetch("http://localhost:8080/ferias", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setLoading(false);
    if (resp.ok) {
      onSuccess(form);
    } else {
      alert("Erro ao salvar férias");
    }
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/30 z-50">
      <Card className="w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <Input
              placeholder="Funcionário"
              value={form.funcionario}
              onChange={e => setForm(f => ({ ...f, funcionario: e.target.value }))}
              required
            />
            <Input
              placeholder="Data início"
              type="date"
              value={form.dataInicio}
              onChange={e => setForm(f => ({ ...f, dataInicio: e.target.value }))}
              required
            />
            <Input
              placeholder="Data fim"
              type="date"
              value={form.dataFim}
              onChange={e => setForm(f => ({ ...f, dataFim: e.target.value }))}
              required
            />
            <select
              className="w-full border rounded p-2"
              value={form.status}
              onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
            >
              <option value="Pendente">Pendente</option>
              <option value="Em andamento">Em andamento</option>
              <option value="Concluída">Concluída</option>
            </select>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
            <Button type="submit" disabled={loading}>{loading ? "Salvando..." : "Salvar"}</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
