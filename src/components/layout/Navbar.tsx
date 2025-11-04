import Link from "next/link";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 border-b">
      <div className="font-bold flex items-center gap-2"> {/* Pode adicionar ícone aqui */}
        <span>RH</span>
      </div>
      <div className="flex gap-6">
        <Link href="/">Dashboard</Link>
        <Link href="/funcionarios">Funcionários</Link>
        <Link href="/relatorios">Relatórios</Link>
        <Link href="/historico">Histórico</Link>
        <Link href="/ferias">Férias</Link>
      </div>
      <Avatar>
        <AvatarImage src="/avatar.jpg" /> {/* Pode trocar pela info do usuário logado */}
      </Avatar>
    </nav>
  );
}
