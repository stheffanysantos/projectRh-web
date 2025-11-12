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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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

  function validate() {
    const newErrors: { [key: string]: string } = {};

    if (!form.funcionarioId) newErrors.funcionarioId = "Selecione um funcionário.";
    if (!form.dataInicio) newErrors.dataInicio = "Informe a data de início.";
    if (!form.dataFim) newErrors.dataFim = "Informe a data de fim.";

    if (form.dataInicio && form.dataFim) {
      const inicio = new Date(form.dataInicio);
      const fim = new Date(form.dataFim);

      if (fim < inicio) {
        newErrors.dataFim = "A data de fim não pode ser anterior à data de início.";
      }

      // (Opcional) Bloquear datas no passado
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);

      if (inicio < hoje) {
        newErrors.dataInicio = "A data de início não pode ser no passado.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

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
    } catch {
      toast.error("Falha ao salvar férias");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Funcionário */}
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
          className={`w-full rounded-md border p-2 ${
            errors.funcionarioId ? "border-red-500" : ""
          }`}
        >
          <option value="">Selecione</option>
          {funcionarios.map(f => (
            <option key={f.id} value={`${f.id}|${f.nome}`}>
              {f.nome}
            </option>
          ))}
        </select>
        {errors.funcionarioId && (
          <p className="text-red-500 text-sm mt-1">{errors.funcionarioId}</p>
        )}
      </div>

      {/* Datas */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Data de início</label>
          <Input
            type="date"
            value={form.dataInicio}
            onChange={e => setForm(f => ({ ...f, dataInicio: e.target.value }))}
            className={errors.dataInicio ? "border-red-500" : ""}
            required
          />
          {errors.dataInicio && (
            <p className="text-red-500 text-sm mt-1">{errors.dataInicio}</p>
          )}
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Data de fim</label>
          <Input
            type="date"
            value={form.dataFim}
            onChange={e => setForm(f => ({ ...f, dataFim: e.target.value }))}
            className={errors.dataFim ? "border-red-500" : ""}
            required
          />
          {errors.dataFim && (
            <p className="text-red-500 text-sm mt-1">{errors.dataFim}</p>
          )}
        </div>
      </div>

      {/* Status */}
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

      {/* Botões */}
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
