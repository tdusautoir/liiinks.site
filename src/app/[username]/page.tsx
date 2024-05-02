import Link from "next/link";
import style from "./profile.module.scss";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getUserWithLinkByUsername } from "@/lib/db/userHelper";
import { getInitials } from "@/lib/utils";
import { notFound } from "next/navigation";
import CustomLink from "./link";

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

    return (
        <div className={style.container}>
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
                <li>
                    <Button className="w-fit" variant="link" asChild>
                        <Link href="/">@liiinks</Link>
                    </Button>
                </li>
            </ul>
        </div>
    )
}