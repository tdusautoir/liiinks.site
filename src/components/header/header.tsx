"use client";

import Link from "next/link";
import { ExternalLink, LogOut, Settings, User } from "lucide-react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import style from "./header.module.scss"
import Logo from "@/components/logo";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { UsersType } from "@/lib/db/userHelper";
import { getInitials } from "@/lib/utils";

export default function Header({ asMenu = true }: { asMenu?: boolean }) {
    const { status } = useSession();

    return (
        <header className={style.container}>
            <Logo />
            {asMenu && (
                <NavigationMenu>
                    <NavigationMenuList>
                        {status === "unauthenticated" ? (
                            <NavigationMenuItem>
                                <Link href="/sign-in" legacyBehavior passHref>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        <User className="mr-2 w-4 h-4" />Se connecter
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        ) : (
                            <NavigationMenuItem>
                                <MyProfile />
                            </NavigationMenuItem>
                        )}
                    </NavigationMenuList>
                </NavigationMenu>
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
                <Avatar className="cursor-pointer mr-2">
                    <AvatarFallback>{getInitials(user.firstname, user.lastname)}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>{user.firstname + " " + user.lastname}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <Link href={"/" + user.username} target="_blank">
                        <DropdownMenuItem className="cursor-pointer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            <span>Ma page liiinks</span>
                        </DropdownMenuItem>
                    </Link>
                    <Link href="/account">
                        <DropdownMenuItem className="cursor-pointer">
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Paramètres</span>
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