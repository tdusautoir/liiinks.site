import { updateLink } from "@/lib/db/linksHelper";
import { isEmpty } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

type FormData = {
    id: string,
    twitter: string | undefined,
    facebook: string | undefined,
    linkedin: string | undefined,
    behance: string | undefined,
    instagram: string | undefined,
}

export async function PUT(req: NextRequest, res: NextResponse) {
    try {
        const body = await req.json();

        const { id, facebook, linkedin, behance, twitter, instagram } = body as FormData;

        const link = await updateLink(id, {
            facebook: facebook ? (isEmpty(facebook) ? undefined : facebook) : undefined,
            linkedin: linkedin ? (isEmpty(linkedin) ? undefined : linkedin) : undefined,
            behance: behance ? (isEmpty(behance) ? undefined : behance) : undefined,
            twitter: twitter ? (isEmpty(twitter) ? undefined : twitter) : undefined,
            instagram: instagram ? (isEmpty(instagram) ? undefined : instagram) : undefined,
        });

        return new NextResponse(JSON.stringify(
            { error: false, message: "Votre liiink a été modifié avec succès.", link }
        ), { status: 200 });
    } catch (error) {
        return new NextResponse(JSON.stringify(
            { error: true, message: "Une erreur s'est produite lors de la modification de votre liiink." }
        ), { status: 400 });
    }
}