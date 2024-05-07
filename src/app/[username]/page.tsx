import Link from "next/link";
import style from "./profile.module.scss";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getUserWithLinkByUsername } from "@/lib/db/userHelper";
import { cn, getInitials } from "@/lib/utils";
import { notFound } from "next/navigation";
import CustomLink from "./link";
import { Metadata } from "next";
import { inter, pacifico, roboto } from "../layout";

export const generateMetadata = async (
    props: { params: ParamsType }
): Promise<Metadata> => {
    const { params } = props
    const user = await getUserWithLinkByUsername(params.username);
    return {
        title: user ? `${user.firstname} ${user.lastname} - liiinks` : "Page introuvable - liiinks",
        description: user ? user.bio : "La page que vous cherchez n'existe pas.",
    };
};

type ParamsType = { username: string }

const fonts: Record<string, string> = {
    inter: inter.className,
    roboto: roboto.className,
    pacifico: pacifico.className
};

export default async function Profile({ params: { username } }: { params: { username: string } }) {
    const user = await getUserWithLinkByUsername(username);

    if (!user) notFound();

    const socialLinks: Record<string, {
        url: string | undefined,
        label: string
    }> = {
        'facebook': {
            'url': user.link.facebook,
            'label': 'Facebook'
        },
        'twitter': {
            'url': user.link.twitter,
            'label': 'Twitter'
        },
        'instagram': {
            'url': user.link.instagram,
            'label': 'Instagram'
        },
        'linkedin': {
            'url': user.link.linkedin,
            'label': 'LinkedIn'
        },
        'behance': {
            'url': user.link.behance,
            'label': 'Behance'
        },
    }

    const font = user.link.fontFamily ? fonts[user.link.fontFamily] : undefined;

    return (
        <div className={cn(style.container, font)}>
            <Avatar>
                <AvatarFallback>{getInitials(user.firstname, user.lastname)}</AvatarFallback>
            </Avatar>
            <div>
                <h1>{user.firstname} {user.lastname}</h1>
                {user.bio && <p className="text-sm text-muted-foreground">{user.bio}</p>}
            </div>
            <ul className="flex flex-col gap-2 w-full items-center">
                {Object.keys(socialLinks).map((key) => {
                    const url = socialLinks[key].url;
                    const label = socialLinks[key].label;

                    if (url === undefined) return null;

                    return (
                        <li key={key} className="w-full">
                            <CustomLink username={username} url={url} label={label} />
                        </li>
                    )
                })}
                {user.link.personalizedLinks.map((link, index) => {
                    return (
                        <li key={index} className="w-full">
                            <CustomLink username={username} url={link.url} label={link.label} />
                        </li>
                    )
                })}
                <li>
                    <Button className="w-fit" variant="link" asChild>
                        <Link href="/">@liiinks</Link>
                    </Button>
                </li>
            </ul>
        </div>
    )
}