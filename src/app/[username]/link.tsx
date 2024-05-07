"use client";

import { Button } from "@/components/ui/button"
import { track } from '@vercel/analytics';
import Link from "next/link";

export default function CustomLink({ username, url, label }: { username: string, url: string, label: string }) {
    return (
        <Button asChild className="w-full" onClick={() => {
            track('profile_social_link_click', {
                username,
                social: label
            })
        }}>
            <Link href={url} target="_blank">{label}</Link>
        </Button>
    )
}