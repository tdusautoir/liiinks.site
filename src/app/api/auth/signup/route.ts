import { isValidEmail, isEmpty } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server"
import { createUser } from "@/lib/db/userHelper";
import { createLink } from "@/lib/db/linksHelper";

interface FormData {
    username: string;
    email: string;
    lastname: string;
    firstname: string;
}

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const body = await req.json();

        let errors = {};

        const { username, firstname, lastname, email } = body as FormData;

        // check if all fields are filled
        for (const [key, value] of Object.entries(body)) {
            if (typeof value === "string") {
                if (isEmpty(value.toString())) {
                    errors = { ...errors, [key]: `Le champ ${key} est requis.` };
                }
            }
        }

        if (Object.keys(errors).length > 0) {
            return new NextResponse(JSON.stringify({ error: true, ...errors }), { status: 400 });
        }

        if (!isValidEmail(email)) {
            errors = { ...errors, email: "Email invalide." };
        }

        const user = await createUser({
            username,
            email,
            firstname,
            lastname
        });

        if (!user) {
            return new NextResponse(JSON.stringify(
                { error: true, message: "Une erreur s'est produite lors de la création de votre compte." }
            ), { status: 400 });
        }

        await createLink(username);

        return new NextResponse(JSON.stringify(user), { status: 201 });
    } catch (error) {
        if (error === 'emailAlreadyExist') {
            return new NextResponse(JSON.stringify(
                { error: true, message: "Un compte existe déjà avec cette adresse email." }
            ), { status: 400 });
        }

        if (error === 'usernameAlreadyExist') {
            return new NextResponse(JSON.stringify(
                { error: true, message: "Ce nom d'utilisateur est déjà pris." }
            ), { status: 400 });
        }

        console.log('[SIGNUP_POST]', error)
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}