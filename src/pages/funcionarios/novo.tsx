import React from "react";
import { useRouter } from "next/router";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import FuncionarioForm from "@/components/funcionario/FuncionarioForm";
import { Button } from "@/components/ui/button";

export default function NovoFuncionario() {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    const response = await fetch("http://localhost:8080/funcionarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (response.ok) router.push("/funcionarios");
    else alert("Erro ao cadastrar funcionário");
  };

  return (
    <div className="max-w-2xl mx-auto mt-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Cadastro</h1>
        <Button variant="outline" onClick={() => router.push("/funcionarios")}>
          Ir para a lista
        </Button>
      </div>
      <Card>
        <CardContent className="p-8">
          <FuncionarioForm
            onSubmit={handleSubmit}
            onCancel={() => router.push("/funcionarios")}
          />
        </CardContent>
      </Card>
    </div>
  );
}
