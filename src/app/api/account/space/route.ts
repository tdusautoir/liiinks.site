import { updateLink } from "@/lib/db/linksHelper";
import { isEmpty } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

type FormData = {
    id: string,
    font: string | undefined,
    theme: string | undefined,
}

export async function PUT(req: NextRequest, res: NextResponse) {
    try {
        const body = await req.json();

        const { id, font, theme } = body as FormData;

        const link = await updateLink(id, {
            font: font ? (isEmpty(font) ? undefined : font) : undefined,
            backgroundPreset: theme ? (isEmpty(theme) ? undefined : theme) : undefined,
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