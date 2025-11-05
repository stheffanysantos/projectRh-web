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

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
      className="space-y-4"
    >
      <div>
        <label className="block text-sm font-medium mb-1">Nome completo</label>
        <Input
          name="nome"
          placeholder="Nome completo"
          value={form.nome}
          onChange={(e) => setForm({ ...form, nome: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Cargo</label>
        <Input
          name="cargo"
          placeholder="Cargo"
          value={form.cargo}
          onChange={(e) => setForm({ ...form, cargo: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Departamento</label>
        <Input
          name="departamento"
          placeholder="Departamento"
          value={form.departamento}
          onChange={(e) => setForm({ ...form, departamento: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <Input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Telefone</label>
        <Input
          name="telefone"
          placeholder="Telefone"
          value={form.telefone}
          onChange={(e) => setForm({ ...form, telefone: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Avatar URL</label>
        <Input
          name="avatarUrl"
          type="url"
          placeholder="Ex: https://github.com/stheffanysantos.png"
          value={form.avatarUrl}
          onChange={(e) => setForm({ ...form, avatarUrl: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Salário</label>
        <Input
          name="salario"
          type="number"
          placeholder="Salário"
          value={form.salario}
          onChange={(e) => setForm({ ...form, salario: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Data de contratação</label>
        <Input
          name="dataContratacao"
          type="date"
          value={form.dataContratacao}
          onChange={(e) => setForm({ ...form, dataContratacao: e.target.value })}
          required
        />
      </div>
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
      <div className="flex justify-end gap-2 mt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Salvar</Button>
      </div>
    </form>
  );
}
