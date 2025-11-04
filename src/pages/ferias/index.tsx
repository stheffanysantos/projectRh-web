import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import FeriasTable from "@/components/ferias/FeriasTable";
import { Input } from "@/components/ui/input";
import FeriasForm from "@/components/ferias/FeriasForm";

type Ferias = {
  funcionario: string;
  dataInicio: string;
  dataFim: string;
  status: string;
};

export default function FeriasPage() {
  const [search, setSearch] = useState("");
  const [ferias, setFerias] = useState<Ferias[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/ferias")
      .then((res) => res.json())
      .then(setFerias);
  }, []);

  const filtradas = ferias.filter(
    (f) =>
      !search ||
      f.funcionario.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestão de férias</h1>
        <Button variant="outline" onClick={() => setShowForm(true)}>
          Adicionar féria..
        </Button>
      </div>
      <Input
        className="mb-4"
        placeholder="Search by employee or status"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <FeriasTable
        ferias={filtradas}
        onEdit={idx => alert("Editar férias")}
        onDelete={idx => alert("Deletar férias")}
      />
      {showForm && (
        <FeriasForm
          onClose={() => setShowForm(false)}
          onSuccess={(novaFeria) => {
            setFerias(arr => [...arr, novaFeria]);
            setShowForm(false);
          }}
        />
      )}
    </div>
  );
}
