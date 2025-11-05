import Link from "next/link";
export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 border-b">
      <div className="font-bold flex items-center gap-2"> {/* Pode adicionar ícone aqui */}
        <span>RH</span>
      </div>
      <div className="flex gap-6">
        <Link href="/funcionarios">Funcionários</Link>
        <Link href="/historico">Histórico</Link>
        <Link href="/ferias">Férias</Link>
      </div>
    </nav>
  );
}
