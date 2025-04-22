"use client";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import NavLinks from "./navlinks";
import Link from "next/link";
import Image from "next/image";

// Componentes optimizados
const MemoizedNavLinks = React.memo(NavLinks);

export default function Sidenav() {
  const [open, setOpen] = useState(false);
  const userLabel = "Usuario";

  const Logo = () => (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center justify-center text-sm text-black py-1 relative z-20"
    >
      <Image src="/logo.webp" alt="Clubs Manager" width={40} height={40} />
      <Image
        src={"/logo-letras.png"}
        alt="Clubs Manager letters"
        width={170}
        height={50}
      />
    </Link>
  );

  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody>
        <div className="flex md:flex-col flex-1 overflow-y-auto overflow-x-hidden gap-4 md:gap-8">
          {open ? <Logo /> : <LogoIcon />}
          <MemoizedNavLinks />
        </div>
        <div>
          <SidebarLink
            link={{
              label: open ? userLabel : "", // Muestra el nombre solo si está abierto
              href: "/dashboard/profile",
              icon: (
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="Avatar"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              ),
            }}
          />
        </div>
      </SidebarBody>
    </Sidebar>
  );
}

const LogoIcon = () => (
  <Link
    href="/"
    className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
  >
    <Image src="/logo.webp" alt="Clubs Manager mobile" width={45} height={45} />
  </Link>
);
