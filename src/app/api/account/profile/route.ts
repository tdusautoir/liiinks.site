import { checkIfUsernameExist, getUserByEmail, updateUser } from "@/lib/db/userHelper";
import { isEmpty, isValidEmail } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

type FormData = {
    username: string;
    email: string;
    lastname: string;
    firstname: string;
    bio: string | undefined;
}

export async function PUT(req: NextRequest, res: NextResponse) {
    try {
        const body = await req.json();

        let errors = {};

        const { username, firstname, lastname, email, bio } = body as FormData;
        const requiredFields = { username, firstname, lastname, email };

        // check if all fields are filled
        for (const [key, value] of Object.entries(requiredFields)) {
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
            return new NextResponse(JSON.stringify(
                { error: true, message: "Email invalide." }
            ), { status: 400 });
        }

        const user = await updateUser({
            email,
            username,
            firstname,
            lastname,
            bio: bio ? (isEmpty(bio) ? undefined : bio) : undefined
        });

        return new NextResponse(JSON.stringify(
            { error: false, message: "Votre compte a été modifié avec succès.", user }
        ), { status: 200 });
    } catch (error) {
        if (error === 'emailNotExist') {
            return new NextResponse(JSON.stringify(
                { error: true, message: "Aucun compte n'existe avec cette adresse email." }
            ), { status: 400 });
        }

        if (error === 'usernameAlreadyExist') {
            return new NextResponse(JSON.stringify(
                { error: true, message: "Ce nom d'utilisateur est déjà pris." }
            ), { status: 400 });
        }

        return new NextResponse(JSON.stringify(
            { error: true, message: "Une erreur s'est produite lors de la modification de votre compte." }
        ), { status: 400 });
    }
}