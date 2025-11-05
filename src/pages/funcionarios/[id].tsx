import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import FuncionarioProfile from "@/components/funcionario/FuncionarioProfile";
import FuncionarioForm from "@/components/funcionario/FuncionarioForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

export default function PerfilFuncionarioPage() {
  const router = useRouter();
  const { id } = router.query;
  const [funcionario, setFuncionario] = useState<any | null>(null);
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    if (id) {
      fetch(`https://projectrh-server.onrender.com/funcionarios/${id}`)
        .then(res => res.json())
        .then(setFuncionario);
    }
  }, [id]);

  if (!funcionario) return <div>Carregando...</div>;

  return (
    <>
      <FuncionarioProfile
        funcionario={{
          ...funcionario,
          inicio: funcionario.dataContratacao,
        }}
        onEditar={() => setEditando(true)}
        onControleFerias={() => router.push("/ferias")}
        onHistoricoSalarial={() => alert("Mostrar histórico salarial")}
      />

      <Dialog open={editando} onOpenChange={setEditando}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Funcionário</DialogTitle>
          </DialogHeader>
          <FuncionarioForm
            initialData={funcionario}
            onSubmit={async (dados) => {
              await fetch(`https://projectrh-server.onrender.com/funcionarios/${funcionario.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dados),
              });
              setEditando(false);
              fetch(`https://projectrh-server.onrender.com/funcionarios/${funcionario.id}`)
                .then(res => res.json())
                .then(setFuncionario);
            }}
            onCancel={() => setEditando(false)}
          />
          <DialogClose asChild>
            <button type="button" className="hidden" aria-label="Fechar" />
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
}
