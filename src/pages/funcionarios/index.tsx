import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableCell, TableHead, TableHeader, TableRow, TableBody } from "@/components/ui/table";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import FuncionarioForm from "@/components/funcionario/FuncionarioForm";
import { useRouter } from "next/router";
import { toast } from "sonner";

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
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  async function carregar() {
    try {
      const res = await fetch("https://stheffany-backend.df8lqa.easypanel.host/funcionarios");
      if (!res.ok) throw new Error("Erro ao buscar funcionários");
      const data = await res.json();
      setFuncionarios(data);
    } catch (error) {
      console.error(error);
      toast.error("Falha ao carregar funcionários");
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  const handleSubmit = async (data: any) => {
    try {
      const response = await fetch("https://stheffany-backend.df8lqa.easypanel.host/funcionarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Erro ao cadastrar funcionário");

      toast.success("Funcionário cadastrado com sucesso!");
      setModalOpen(false);
      carregar();
    } catch (error) {
      console.error(error);
      toast.error("Falha ao cadastrar funcionário");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-background">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Gestão de Funcionários</h1>
        <Button onClick={() => setModalOpen(true)}>+ Novo Funcionário</Button>
      </div>

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
          {funcionarios.map((f) => (
            <TableRow key={f.id}>
              <TableCell>{f.nome}</TableCell>
              <TableCell>{f.email}</TableCell>
              <TableCell>{f.cargo}</TableCell>
              <TableCell>{f.departamento}</TableCell>
              <TableCell>{f.status ?? "Ativo"}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  onClick={() => router.push(`/funcionarios/${f.id}`)}
                >
                  Visualizar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="w-[95%] sm:max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl">
          <DialogHeader className="text-center sm:text-left">
            <DialogTitle className="text-lg sm:text-xl font-semibold">
              Novo Funcionário
            </DialogTitle>
          </DialogHeader>

          <FuncionarioForm
            onSubmit={handleSubmit}
            onCancel={() => setModalOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
