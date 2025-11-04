import { useEffect, useState } from "react";
import AvaliacaoForm from "@/components/avaliacao/AvaliacaoForm";

// ID do funcionário pode vir de URL ou props
const funcionarioId = "ID_DO_FUNCIONARIO"; // Troque por variável do router ou contexto

export default function AvaliacaoFuncionarioPage() {
  const [form, setForm] = useState({
    funcionario: "",
    periodo: "",
    avaliador: "",
    comentarios: "",
  });
  const [metas, setMetas] = useState<any[]>([]);
  const [progresso, setProgresso] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:8080/avaliacoes/funcionario/${funcionarioId}`)
      .then((res) => res.json())
      .then((avaliacoes) => {
        if (avaliacoes.length > 0) {
          const ultima = avaliacoes[avaliacoes.length - 1];
          setForm({
            funcionario: ultima.funcionarioNome || "",
            periodo: ultima.periodo || "",
            avaliador: ultima.avaliador || "",
            comentarios: ultima.comentarios || "",
          });
          setMetas(ultima.metas || []);
          setProgresso(ultima.progresso || 0);
        }
      });
  }, [funcionarioId]);

  // Para salvar avaliação nova:
  async function handleSalvar() {
    await fetch("http://localhost:8080/avaliacoes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        metas,
        progresso,
        funcionarioId,
        funcionarioNome: form.funcionario,
      }),
    }).then(r => r.ok && alert("Salvo!"));
  }

  // Para buscar avaliações anteriores:
  function handleVerAnteriores() {
    alert("Ver avaliações anteriores (implemente: modal/list)");
  }

  // Para enviar feedback:
  function handleEnviarFeedback() {
    alert("Feedback enviado!");
  }

  return (
    <div className="max-w-5xl mx-auto my-10">
      <h1 className="text-3xl font-bold mb-6">Avaliação de Desempenho do Funcionário</h1>
      <p className="mb-8 text-muted-foreground">
        Gerencie e avalie o desempenho dos funcionários de forma eficiente.
      </p>
      <AvaliacaoForm
        form={form}
        setForm={setForm}
        metas={metas}
        progresso={progresso}
        onSalvar={handleSalvar}
        onVerAnteriores={handleVerAnteriores}
        onEnviarFeedback={handleEnviarFeedback}
      />
    </div>
  );
}
