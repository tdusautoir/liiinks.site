"use client"
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import Link from "next/link";
import { User } from "lucide-react";

export default function HomeMenu() {
    const session = useSession();
    return (
        session.status === "authenticated" ? (
            <li>
                <Button size="sm" asChild><Link href="/sign-in"><User className="w-4 h-4 mr-2" />Mon compte</Link></Button>
            </li>
        ) : (
            <li>
                <Button size="sm" asChild><Link href="/sign-in">Se connecter</Link></Button>
            </li>
        )
    )
}