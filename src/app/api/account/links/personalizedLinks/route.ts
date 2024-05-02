import { updatePersonalizedLink } from "@/lib/db/linksHelper";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, res: NextResponse) {
    try {
        const body = await req.json();

        const { url, label, personalizedLinkKey, linkId } = body as { url: string, label: string, personalizedLinkKey: string, linkId: string };

        const link = await updatePersonalizedLink(linkId, personalizedLinkKey, label, url);

        return new NextResponse(JSON.stringify(
            { error: false, message: "Votre lien personnalisé a été modifié avec succès.", link }
        ), { status: 200 });
    } catch (error) {
        return new NextResponse(JSON.stringify(
            { error: true, message: "Une erreur s'est produite lors de la modification de votre liiink." }
        ), { status: 400 });
    }
}