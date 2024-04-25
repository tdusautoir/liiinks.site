import { isValidEmail, isValidPassword, isEmpty } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server"
import { createUser } from "@/lib/db/userHelper";
import { createMagicLinks } from "@/lib/db/magicLinksHelper";

interface FormData {
    email: string;
    lastname: string;
    firstname: string;
}

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const body = await req.json();

        let errors = {};

        const { firstname, lastname, email } = body as FormData;

        // check if all fields are filled
        for (const [key, value] of Object.entries(body)) {
            if (typeof value === "string") {
                if (isEmpty(value.toString())) {
                    errors = { ...errors, [key]: "required" };
                }
            }
        }

        if (Object.keys(errors).length > 0) {
            return new NextResponse(JSON.stringify({ error: true, ...errors }), { status: 400 });
        }

        if (!isValidEmail(email)) {
            errors = { ...errors, email: "invalid" };
        }

        const user = await createUser({
            email,
            firstname,
            lastname
        });

        await createMagicLinks({ email })
        return new NextResponse(JSON.stringify(user), { status: 201 });
    } catch (error) {
        if (error === 'alreadySignIn') {
            return new NextResponse(JSON.stringify(
                { error: true, message: "Un compte existe déjà avec cette adresse email." }
            ), { status: 400 });
        }

        console.log('[SIGNUP_POST]', error)
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}