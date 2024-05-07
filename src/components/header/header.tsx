"use client";

import Link from "next/link";
import { Copy, Eye, LogOut, PenBox, User } from "lucide-react";
import style from "./header.module.scss"
import Logo from "@/components/logo";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { UsersType } from "@/lib/db/userHelper";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { toastSuccessProperties } from "../ui/toast";
import React from "react";

export default function Header({ menu }: { menu?: React.ReactNode }) {
    return (
        <header className={style.container}>
            <Logo />
            {menu &&
                <ul className="inline-flex space-x-2">
                    {menu}
                </ul>
            }
        </header>
    )
}

function MyProfile() {
    const { data } = useSession();
    const { toast } = useToast();

    const user = data && (data.user as UsersType[0]);

    if (!user) return null;

    const copy = () => {
        navigator.clipboard.writeText(window.location.origin + "/" + user.username);
        toast({
            description: "Lien copié dans le presse-papier.",
            ...toastSuccessProperties
        })
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="sm"><User className="w-4 h-4 mr-2" />{user.firstname}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>Ma page liiinks</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <Link href="/account">
                        <DropdownMenuItem className="cursor-pointer">
                            <PenBox className="mr-2 h-4 w-4" />
                            <span>Personnaliser</span>
                        </DropdownMenuItem>
                    </Link>
                    <Link href={"/" + user.username}>
                        <DropdownMenuItem className="cursor-pointer">
                            <Eye className="mr-2 h-4 w-4" />
                            <span>Afficher</span>
                        </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem className="cursor-pointer" onClick={copy}>
                        <Copy className="mr-2 h-4 w-4" />
                        <span>Partager</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Déconnexion</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}