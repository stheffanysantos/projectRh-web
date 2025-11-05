import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Ferias } from "@/types/Ferias";

type FeriasFormProps = {
  initialData?: Ferias;
  onClose: () => void;
  onSuccess: (ferias: Ferias) => void;
};

export default function FeriasForm({ initialData, onClose, onSuccess }: FeriasFormProps) {
  const [loading, setLoading] = useState(false);
  const [funcionarios, setFuncionarios] = useState<{ id: string; nome: string }[]>([]);
  const [form, setForm] = useState<Ferias>({
    id: initialData?.id,
    funcionarioId: initialData?.funcionarioId || "",
    funcionarioNome: initialData?.funcionarioNome || "",
    dataInicio: initialData?.dataInicio || "",
    dataFim: initialData?.dataFim || "",
    status: initialData?.status || "Solicitado",
  });

  useEffect(() => {
    fetch("https://stheffany-backend.df8lqa.easypanel.host/funcionarios")
      .then(res => res.json())
      .then(data => setFuncionarios(data))
      .catch(() => toast.error("Erro ao carregar funcionários"));
  }, []);

  function handleFuncionarioChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const [id, nome] = e.target.value.split("|");
    setForm(f => ({ ...f, funcionarioId: id, funcionarioNome: nome }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const method = form.id ? "PUT" : "POST";
      const url = form.id
        ? `https://stheffany-backend.df8lqa.easypanel.host/ferias/${form.id}`
        : "https://stheffany-backend.df8lqa.easypanel.host/ferias";

      const resp = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!resp.ok) throw new Error("Erro ao salvar férias");

      const data = await resp.json();
      toast.success("Férias salvas com sucesso!");
      onSuccess(data);
    } catch (err) {
      toast.error("Falha ao salvar férias");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 text-sm font-medium">Funcionário</label>
        <select
          value={
            form.funcionarioId && form.funcionarioNome
              ? `${form.funcionarioId}|${form.funcionarioNome}`
              : ""
          }
          onChange={handleFuncionarioChange}
          required
          className="w-full rounded-md border p-2"
        >
          <option value="">Selecione</option>
          {funcionarios.map(f => (
            <option key={f.id} value={`${f.id}|${f.nome}`}>
              {f.nome}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Data de início</label>
          <Input
            type="date"
            value={form.dataInicio}
            onChange={e => setForm(f => ({ ...f, dataInicio: e.target.value }))}
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Data de fim</label>
          <Input
            type="date"
            value={form.dataFim}
            onChange={e => setForm(f => ({ ...f, dataFim: e.target.value }))}
            required
          />
        </div>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Status</label>
        <select
          value={form.status}
          onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
          className="w-full rounded-md border p-2"
        >
          <option value="Solicitado">Solicitado</option>
          <option value="Aprovado">Aprovado</option>
          <option value="Recusado">Recusado</option>
          <option value="Concluído">Concluído</option>
        </select>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Salvando...
            </>
          ) : (
            "Salvar"
          )}
        </Button>
      </div>
    </form>
  );
}
