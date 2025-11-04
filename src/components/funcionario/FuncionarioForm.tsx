import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
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
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
      className="space-y-4"
    >
      <Input
        name="nome"
        placeholder="Nome completo"
        value={form.nome}
        onChange={(e) => setForm({ ...form, nome: e.target.value })}
        required
      />
      <Input
        name="cargo"
        placeholder="Cargo"
        value={form.cargo}
        onChange={(e) => setForm({ ...form, cargo: e.target.value })}
        required
      />
      <Input
        name="departamento"
        placeholder="Departamento"
        value={form.departamento}
        onChange={(e) => setForm({ ...form, departamento: e.target.value })}
        required
      />
      <Input
        name="dataContratacao"
        placeholder="Data de contratação"
        type="date"
        value={form.dataContratacao}
        onChange={(e) => setForm({ ...form, dataContratacao: e.target.value })}
        required
      />

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

      <div className="flex justify-end gap-2 mt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Salvar</Button>
      </div>
    </form>
  );
}
