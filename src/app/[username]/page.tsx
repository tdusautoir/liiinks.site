import Link from "next/link";
import style from "./profile.module.scss";
import { Avatar, AvatarFallback, AvatarImage, } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function Profile({ params: { username } }: { params: { username: string } }) {
    const fallback = username[0].toUpperCase() + username[1].toUpperCase();
    const links = [
        {
            href: `/username/page`,
            label: "Twitter"
        },
        {
            href: `/username/page`,
            label: "Instagram"
        },
        {
            href: `/username/page`,
            label: "Facebook"
        },
    ] as { href: string, label: string }[];
    return (
        <div className={style.container}>
            <Avatar>
                <AvatarFallback>{fallback}</AvatarFallback>
            </Avatar>
            <h1>{username}</h1>
            <ul className="flex flex-col gap-2 w-full items-center">
                {links.map(({ href, label }) => (
                    <li key={href} className="w-full">
                        <Button asChild className="w-full">
                            <Link href={href}>{label}</Link>
                        </Button>
                    </li>
                ))}
                <li>
                    <Button className="w-fit" variant="link" asChild>
                        <Link href="/">@liiinks</Link>
                    </Button>
                </li>
            </ul>
        </div>
    )
}