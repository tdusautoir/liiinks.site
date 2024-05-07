"use client"

import { Button } from "@/components/ui/button";
import { UsersType } from "@/lib/db/userHelper";
import { PenBox } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export function CustomizeButton({ username }: { username: string }) {
    const session = useSession();
    const user = session.data?.user as UsersType[0];
    if (!user || user.username != username) return <span className="mt-auto" />;
    return <Button className="mt-auto mb-4 mx-auto w-fit" asChild><Link href="/account"><PenBox className="w-4 h-4 mr-2" />Personnaliser ma page</Link></Button>
} 