import { createPersonalizedLinks, deletePersonalizedLinks, updatePersonalizedLink } from "@/lib/db/linksHelper";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const body = await req.json();

        const { url, label, linkId } = body as { url: string, label: string, linkId: string };

        const link = await createPersonalizedLinks(linkId, label, url);

        return new NextResponse(JSON.stringify(
            { error: false, message: "Votre lien personnalisé a été créé avec succès.", link }
        ), { status: 200 });
    } catch (error) {
        if (error === 'tooManyLinks') {
            return new NextResponse(JSON.stringify(
                { error: true, message: "Vous avez atteint le nombre maximum de liens personnalisés." }
            ), { status: 400 });
        }

        return new NextResponse(JSON.stringify(
            { error: true, message: "Une erreur s'est produite lors de la création de votre liiink." }
        ), { status: 400 });
    }
}


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

export async function DELETE(req: NextRequest, res: NextResponse) {
    try {
        const body = await req.json();

        const { linkId, personalizedLinkKey } = body as { linkId: string, personalizedLinkKey: string };

        const success = await deletePersonalizedLinks(linkId, personalizedLinkKey);

        if (success) {
            return new NextResponse(JSON.stringify(
                { error: false, message: "Votre lien personnalisé a été créé avec succès." }
            ), { status: 200 });
        } else {
            return new NextResponse(JSON.stringify(
                { error: true, message: "Une erreur s'est produite lors de la suppression de votre lien personnalisé." }
            ), { status: 400 });
        }
    } catch (error) {
        if (error === 'tooManyLinks') {
            return new NextResponse(JSON.stringify(
                { error: true, message: "Vous avez atteint le nombre maximum de liens personnalisés." }
            ), { status: 400 });
        }

        return new NextResponse(JSON.stringify(
            { error: true, message: "Une erreur s'est produite lors de la suppression de votre lien personnalisé." }
        ), { status: 400 });
    }
}