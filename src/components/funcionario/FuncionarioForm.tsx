import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

type FuncionarioFormProps = {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
};

export default function FuncionarioForm({
  initialData,
  onSubmit,
  onCancel,
}: FuncionarioFormProps) {
  const [form, setForm] = useState({
    nome: initialData?.nome || "",
    cargo: initialData?.cargo || "",
    departamento: initialData?.departamento || "",
    dataContratacao: initialData?.dataContratacao || "",
    status: initialData?.status || "Ativo",
    email: initialData?.email || "",
    telefone: initialData?.telefone || "",
    avatarUrl: initialData?.avatarUrl || "",
    salario: initialData?.salario ?? "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.nome.trim()) newErrors.nome = "O nome é obrigatório.";
    if (!form.cargo.trim()) newErrors.cargo = "O cargo é obrigatório.";
    if (!form.departamento.trim())
      newErrors.departamento = "O departamento é obrigatório.";

    // Validação de email
    if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Digite um email válido.";

    // Validação de telefone (apenas números)
    if (form.telefone && !/^\d{9,11}$/.test(form.telefone))
      newErrors.telefone = "O telefone deve conter apenas números (9 a 11 dígitos).";

    // Validação de salário
    if (form.salario && Number(form.salario) < 0)
      newErrors.salario = "O salário deve ser um valor positivo.";

    // Validação de data (não pode ser no futuro)
    if (form.dataContratacao) {
      const hoje = new Date();
      const data = new Date(form.dataContratacao);
      if (data > hoje)
        newErrors.dataContratacao = "A data de contratação não pode ser no futuro.";
    } else {
      newErrors.dataContratacao = "A data de contratação é obrigatória.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Nome */}
      <div>
        <label className="block text-sm font-medium mb-1">Nome completo</label>
        <Input
          name="nome"
          placeholder="Nome completo"
          value={form.nome}
          onChange={(e) => setForm({ ...form, nome: e.target.value })}
        />
        {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome}</p>}
      </div>

      {/* Cargo */}
      <div>
        <label className="block text-sm font-medium mb-1">Cargo</label>
        <Input
          name="cargo"
          placeholder="Cargo"
          value={form.cargo}
          onChange={(e) => setForm({ ...form, cargo: e.target.value })}
        />
        {errors.cargo && <p className="text-red-500 text-sm mt-1">{errors.cargo}</p>}
      </div>

      {/* Departamento */}
      <div>
        <label className="block text-sm font-medium mb-1">Departamento</label>
        <Input
          name="departamento"
          placeholder="Departamento"
          value={form.departamento}
          onChange={(e) => setForm({ ...form, departamento: e.target.value })}
        />
        {errors.departamento && (
          <p className="text-red-500 text-sm mt-1">{errors.departamento}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <Input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      {/* Telefone */}
      <div>
        <label className="block text-sm font-medium mb-1">Telefone</label>
        <Input
          name="telefone"
          placeholder="Somente números"
          value={form.telefone}
          onChange={(e) =>
            setForm({ ...form, telefone: e.target.value.replace(/\D/g, "") })
          }
        />
        {errors.telefone && (
          <p className="text-red-500 text-sm mt-1">{errors.telefone}</p>
        )}
      </div>

      {/* Avatar */}
      <div>
        <label className="block text-sm font-medium mb-1">Avatar URL</label>
        <Input
          name="avatarUrl"
          type="url"
          placeholder="https://github.com/stheffanysantos.png"
          value={form.avatarUrl}
          onChange={(e) => setForm({ ...form, avatarUrl: e.target.value })}
        />
      </div>

      {/* Salário */}
      <div>
        <label className="block text-sm font-medium mb-1">Salário</label>
        <Input
          name="salario"
          type="number"
          placeholder="Salário"
          value={form.salario}
          onChange={(e) => setForm({ ...form, salario: e.target.value })}
        />
        {errors.salario && (
          <p className="text-red-500 text-sm mt-1">{errors.salario}</p>
        )}
      </div>

      {/* Data */}
      <div>
        <label className="block text-sm font-medium mb-1">Data de contratação</label>
        <Input
          name="dataContratacao"
          type="date"
          value={form.dataContratacao}
          onChange={(e) => setForm({ ...form, dataContratacao: e.target.value })}
        />
        {errors.dataContratacao && (
          <p className="text-red-500 text-sm mt-1">{errors.dataContratacao}</p>
        )}
      </div>

      {/* Status */}
      <div>
        <label className="block text-sm font-medium mb-1">Status</label>
        <div className="flex gap-2">
          <Button
            type="button"
            variant={form.status === "Ativo" ? "default" : "outline"}
            onClick={() => setForm((f) => ({ ...f, status: "Ativo" }))}
          >
            Ativar
          </Button>
          <Button
            type="button"
            variant={form.status === "Inativo" ? "default" : "outline"}
            onClick={() => setForm((f) => ({ ...f, status: "Inativo" }))}
          >
            Desativar
          </Button>
        </div>
      </div>

      {/* Botões */}
      <div className="flex justify-end gap-2 mt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Salvar</Button>
      </div>
    </form>
  );
}
