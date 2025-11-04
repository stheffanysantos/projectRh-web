import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import MetasTable from "./MetasTable";

interface AvaliacaoFormProps {
  form: any;
  setForm: (form: any) => void;
  metas: any[];
  progresso: number;
  onSalvar?: () => void;
  onVerAnteriores?: () => void;
  onEnviarFeedback?: () => void;
}

export default function AvaliacaoForm(props: AvaliacaoFormProps) {
  return (
    <form className="max-w-4xl mx-auto space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          placeholder="Funcionário"
          value={props.form.funcionario}
          onChange={e => props.setForm({ ...props.form, funcionario: e.target.value })}
        />
        <Input
          placeholder="Período de Avaliação"
          value={props.form.periodo}
          onChange={e => props.setForm({ ...props.form, periodo: e.target.value })}
        />
        <Input
          placeholder="Avaliador"
          value={props.form.avaliador}
          onChange={e => props.setForm({ ...props.form, avaliador: e.target.value })}
        />
        {/* Expanda conforme necessário */}
      </div>
      <Textarea
        placeholder="Comentários"
        value={props.form.comentarios}
        onChange={e => props.setForm({ ...props.form, comentarios: e.target.value })}
      />
      <div>
        <div className="font-bold mb-2">Metas e Resultados</div>
        <MetasTable metas={props.metas} />
      </div>
      <div className="my-4">
        <div className="font-semibold mb-1">Pontuação Geral de Desempenho</div>
        <div className="relative h-3 bg-gray-200 rounded mb-1">
          <div className="absolute left-0 top-0 h-3 bg-primary rounded" style={{ width: `${props.progresso}%` }} />
        </div>
        <div className="text-right text-sm font-medium">{props.progresso}%</div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button type="button" onClick={props.onSalvar}>Salvar Avaliação</Button>
        <Button type="button" variant="outline" onClick={props.onVerAnteriores}>Ver Avaliações Anteriores</Button>
        <Button type="button" variant="outline" onClick={props.onEnviarFeedback}>Enviar Feedback</Button>
      </div>
    </form>
  );
}
