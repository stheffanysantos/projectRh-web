"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, Clock, Umbrella, Fingerprint, ListChecks } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { label: "Funcionários", href: "/funcionarios", icon: <Users size={18} /> },
    { label: "Histórico", href: "/historico", icon: <Clock size={18} /> },
    { label: "Férias", href: "/ferias", icon: <Umbrella size={18} /> },
    { label: "Ponto", href: "/ponto", icon: <Fingerprint size={18} /> },
    { label: "Historico de ponto", href: "/historico-ponto", icon: < ListChecks size={18} /> },
  ];

  return (
    <aside className="w-64 h-screen border-r flex flex-col p-6 bg-white shadow-sm">
      {/* Avatar e informações */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img
            src="https://avatars.githubusercontent.com/u/131394528?v=4"
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="font-semibold text-gray-800">Stheffany Santos</p>
          <p className="text-sm text-gray-500">RH - Admin</p>
        </div>
      </div>

      <div className="h-[1px] bg-gray-200 mb-6"></div>

      {/* Menu */}
      <nav className="flex flex-col gap-2 text-gray-700">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 p-2 rounded-lg transition
                ${
                  isActive
                    ? "bg-gray-100 text-gray-600 font-semibold"
                    : "hover:bg-gray-100"
                }
              `}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
