import { FileUser, LayoutDashboard, LogOut } from "lucide-react";
import { SidebarLink } from "@/components/ui/sidebar";
import { signOutAction } from "@/lib/supabase/actions";

const links = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: (
      <LayoutDashboard className="text-neutral-700 dark:text-neutral-200 h-6 w-6 flex-shrink-0" />
    ),
  },
  {
    label: "Mi Membresía",
    href: "/dashboard/membership",
    icon: (
      <FileUser className="text-neutral-700 dark:text-neutral-200 h-6 w-6 flex-shrink-0" />
    ),
  },
  {
    label: "Cerrar sesión",
    href: "#",
    icon: (
      <LogOut className="text-neutral-700 dark:text-neutral-200 h-6 w-6 flex-shrink-0" />
    ),
    onClick: signOutAction,
  },
];

export default function NavLinks() {
  return (
    <div className="md:mt-8 flex md:flex-col gap-6 md:gap-2 flex-row">
      {links.map((link, idx) => (
        <SidebarLink key={idx} link={{ ...link }} />
      ))}
    </div>
  );
}
