"use client";

import Link from "next/link";
import { ExternalLink, LogOut, PenBox, Settings, User } from "lucide-react";
import style from "./header.module.scss"
import Logo from "@/components/logo";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { UsersType } from "@/lib/db/userHelper";
import { Button } from "../ui/button";

export default function Header({ asMenu = true }: { asMenu?: boolean }) {
    const { status } = useSession();

    return (
        <header className={style.container}>
            <Logo />
            {asMenu && (
                status === "unauthenticated" ? (
                    <Button size="sm" asChild>
                        <Link href="/sign-in">Se connecter</Link>
                    </Button>
                ) : (
                    <MyProfile />
                )
            )}
        </header >
    )
}

function MyProfile() {
    const { data } = useSession();

    const user = data && (data.user as UsersType[0]);

    if (!user) return null;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="sm"><User className="w-4 h-4 mr-2" />Mon profil</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>{user.firstname + " " + user.lastname}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <Link href="/account">
                        <DropdownMenuItem className="cursor-pointer">
                            <PenBox className="mr-2 h-4 w-4" />
                            <span>Personnaliser</span>
                        </DropdownMenuItem>
                    </Link>
                    <Link href={"/" + user.username} target="_blank">
                        <DropdownMenuItem className="cursor-pointer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            <span>Voir ma page</span>
                        </DropdownMenuItem>
                    </Link>
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