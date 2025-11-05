import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableCell, TableHead, TableHeader, TableRow, TableBody } from "@/components/ui/table";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import FuncionarioForm from "@/components/funcionario/FuncionarioForm";
import { useRouter } from "next/router";

export interface Funcionario {
  id: string;
  nome: string;
  email: string;
  cargo: string;
  departamento: string;
  status?: string;
  dataContratacao?: string;
}

export default function FuncionariosPage() {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("https://projectrh-server.onrender.com/funcionarios")
      .then(res => res.json())
      .then(setFuncionarios);
  }, []);

  const handleSubmit = async (data:any) => {
    const response = await fetch("https://projectrh-server.onrender.com/funcionarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      setOpen(false);
      // Atualiza a lista
      const novaLista = await fetch("https://projectrh-server.onrender.com/funcionarios").then(res => res.json());
      setFuncionarios(novaLista);
    } else {
      alert("Erro ao cadastrar funcionário");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Funcionários</h1>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="mb-4">Novo Funcionário</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cadastro de Funcionário</DialogTitle>
          </DialogHeader>
          <FuncionarioForm
            onSubmit={handleSubmit}
            onCancel={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Cargo</TableHead>
            <TableHead>Departamento</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {funcionarios.map(f => (
            <TableRow key={f.id}>
              <TableCell>{f.nome}</TableCell>
              <TableCell>{f.email}</TableCell>
              <TableCell>{f.cargo}</TableCell>
              <TableCell>{f.departamento}</TableCell>
              <TableCell>{f.status ?? "Ativo"}</TableCell>
              <TableCell>
                <Button onClick={() => router.push(`/funcionarios/${f.id}`)}>Visualizar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
