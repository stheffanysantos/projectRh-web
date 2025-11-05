import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import FeriasForm from "@/components/ferias/FeriasForm";
import FeriasTable from "@/components/ferias/FeriasTable";
import { toast } from "sonner";
import { Ferias } from "@/types/Ferias";

export default function FeriasPage() {
  const [ferias, setFerias] = useState<Ferias[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Ferias | null>(null);

  async function carregar() {
    try {
      const res = await fetch("https://projectrh-server.onrender.com/ferias");
      if (!res.ok) throw new Error("Erro ao buscar férias");
      const data = await res.json();
      setFerias(data);
    } catch (error) {
      console.error(error);
      toast.error("Falha ao carregar férias");
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Deseja realmente excluir esta férias?")) return;

    try {
      const res = await fetch(`https://projectrh-server.onrender.com/ferias/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erro ao excluir férias");
      toast.success("Férias excluída com sucesso!");
      carregar();
    } catch (error) {
      console.error(error);
      toast.error("Falha ao excluir férias");
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Gestão de Férias</h1>
        <Button
          onClick={() => {
            setEditing(null);
            setModalOpen(true);
          }}
        >
          + Nova Férias
        </Button>
      </div>

      <FeriasTable
        ferias={ferias}
        onEdit={(f) => {
          setEditing(f);
          setModalOpen(true);
        }}
        onDelete={handleDelete}
      />

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? "Editar Férias" : "Nova Férias"}</DialogTitle>
          </DialogHeader>

          <FeriasForm
            initialData={editing ?? undefined}
            onClose={() => setModalOpen(false)}
            onSuccess={() => {
              setModalOpen(false);
              carregar();
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
