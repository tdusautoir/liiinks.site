"use client"
import { signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Copy, Eye, LogOut, User } from "lucide-react";
import { UsersType } from "@/lib/db/userHelper";
import { useToast } from "../ui/use-toast";
import { toastSuccessProperties } from "../ui/toast";

export default function AccountMenu() {
    const { toast } = useToast();
    const session = useSession();
    const user = session.data?.user as UsersType[0];
    if (!user) return;

    const copy = () => {
        navigator.clipboard.writeText(window.location.origin + "/" + user.username);
        toast({
            description: "Lien copié dans le presse-papier.",
            ...toastSuccessProperties
        })
    }

    return (
        <>
            <li>
                <Button size="sm" asChild><Link href={"/" + user.username}><Eye className="w-4 h-4 mr-2" />Voir ma page</Link></Button>
            </li>
            <li>
                <Button size="sm" onClick={copy}><Copy className="w-4 h-4 mr-2" />Partager</Button>
            </li>
            <li>
                <Button size="sm" onClick={() => signOut({ callbackUrl: "/" })}><LogOut className="w-4 h-4 mr-2" />Déconnexion</Button>
            </li>
        </>
    )
}