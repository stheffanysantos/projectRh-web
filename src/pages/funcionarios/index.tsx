import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableCell, TableHead, TableHeader, TableRow, TableBody } from "@/components/ui/table";
import { useRouter } from 'next/router';

export interface Funcionario {
  id: string;
  nome: string;
  email: string;
  cargo: string;
  departamento: string;
  // adicione campos conforme model/backend
  status?: string;
  dataContratacao?: string;
}

export default function FuncionariosPage() {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch('http://localhost:8080/funcionarios')
      .then(res => res.json())
      .then(setFuncionarios);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Funcionários</h1>
      <Button className="mb-4" onClick={() => router.push('/funcionarios/novo')}>
        Novo Funcionário
      </Button>
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
  )
}
