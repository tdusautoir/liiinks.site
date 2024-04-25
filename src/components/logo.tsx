import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Logo() {
    return (
        <Button variant="link" asChild className="font-semibold">
            <Link href="/">@liiinks</Link>
        </Button>
    )
}