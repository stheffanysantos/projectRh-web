import { Button } from "@/components/ui/button";
import { Edit3, Umbrella, DollarSign } from "lucide-react";

interface FuncionarioProfileProps {
  funcionario: {
    nome: string;
    cargo: string;
    status: string;
    inicio: string;
    email: string;
    telefone: string;
    departamento: string;
    avatarUrl?: string;
  };
  onEditar?: () => void;
  onControleFerias?: () => void;
  onHistoricoSalarial?: () => void;
}

export default function FuncionarioProfile({
  funcionario,
  onEditar,
  onControleFerias,
  onHistoricoSalarial,
}: FuncionarioProfileProps) {
  return (
    <div className="w-full px-8 py-6 space-y-8">
      {/* Título */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Perfil do Funcionário</h1>
        <p className="text-muted-foreground text-base">
          Visualize e gerencie informações do colaborador
        </p>
      </div>

      {/* Informações principais */}
      <div className="flex flex-col md:flex-row items-center gap-6 pb-6 border-b">
        <img
          src={funcionario.avatarUrl || "https://avatars.githubusercontent.com/u/131394528?v=4"}
          alt={funcionario.nome}
          className="rounded-full w-28 h-28 object-cover shadow-sm"
        />

        <div className="flex-1">
          <h2 className="text-xl font-semibold">{funcionario.nome}</h2>
          <p className="text-gray-500">{funcionario.cargo}</p>
          <p className="text-sm text-gray-400">
            Início: <span className="text-gray-600">{funcionario.inicio}</span> • Status:{" "}
            <span
              className={`font-medium ${
                funcionario.status === "Ativo" ? "text-green-600" : "text-red-600"
              }`}
            >
              {funcionario.status}
            </span>
          </p>
        </div>

        <Button variant="outline" onClick={onEditar} className="flex items-center gap-2">
          <Edit3 size={16} />
          Editar
        </Button>
      </div>

      {/* Informações adicionais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-6 border-b">
        <div>
          <p className="text-muted-foreground text-sm">📧 Email</p>
          <p className="font-medium">{funcionario.email}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-sm">📞 Telefone</p>
          <p className="font-medium">{funcionario.telefone}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-sm">🏢 Departamento</p>
          <p className="font-medium">{funcionario.departamento}</p>
        </div>
      </div>

      {/* Ações */}
      <div>
        <h3 className="font-semibold text-gray-800 mb-3">Ações</h3>
        <div className="flex gap-3 flex-wrap">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={onControleFerias}
          >
            <Umbrella size={16} />
            Controle de férias
          </Button>

          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={onHistoricoSalarial}
          >
            <DollarSign size={16} />
            Histórico Salarial
          </Button>
        </div>
      </div>
    </div>
  );
}
