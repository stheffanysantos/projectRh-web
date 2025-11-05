import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
    <div className="max-w-3xl mx-auto mt-10">
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-bold">Perfil do funcionário</h1>
          <p className="text-muted-foreground text-base">
            Visualizar e gerenciar informações dos funcionários
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6 mb-8">
            <img
              src={funcionario.avatarUrl || "https://avatars.githubusercontent.com/u/131394528?v=4"}
              alt={funcionario.nome}
              className="rounded-full w-20 h-20 object-cover"
            />
            <div>
              <div className="text-lg font-semibold">{funcionario.nome}</div>
              <div className="text-gray-500">{funcionario.cargo}</div>
              <div className="text-gray-500 text-sm">
                Iniciou: {funcionario.inicio} | Status: {funcionario.status}
              </div>
            </div>
            <Button variant="outline" className="ml-auto" onClick={onEditar}>
              Editar perfil
            </Button>
          </div>
          <div className="mb-6">
            <div className="font-semibold mb-1">Informações de contato</div>
            <div className="flex gap-8">
              <div>
                <div className="text-muted-foreground">Email</div>
                <div>{funcionario.email}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Telefone</div>
                <div>{funcionario.telefone}</div>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <div className="font-semibold mb-1">Departamento</div>
            <div>{funcionario.departamento}</div>
          </div>
          <div>
            <div className="font-semibold mb-2">Ações</div>
            <Button variant="outline" className="mr-2" onClick={onControleFerias}>
              Controle de férias
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
