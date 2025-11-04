import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import FuncionarioProfile from "@/components/funcionario/FuncionarioProfile";

export default function PerfilFuncionarioPage() {
  const router = useRouter();
  const { id } = router.query;
  const [funcionario, setFuncionario] = useState<any | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8080/funcionarios/${id}`)
        .then(res => res.json())
        .then(setFuncionario);
    }
  }, [id]);

  if (!funcionario) return <div>Carregando...</div>;

  return (
    <FuncionarioProfile
      funcionario={{
        ...funcionario,
        inicio: funcionario.dataContratacao,
        // outras adaptações se precisar…
      }}
      onEditar={() => alert("Abrir edição")}
      onControleFerias={() => router.push("/ferias")}
      onHistoricoSalarial={() => alert("Mostrar histórico salarial")}
    />
  );
}
