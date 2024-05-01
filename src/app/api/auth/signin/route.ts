import { isValidEmail, isEmpty } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server"
import { getUserByEmail } from "@/lib/db/userHelper";

interface FormData {
    email: string;
}

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const body = await req.json();

        let errors = {};

        console.log(body);

        const { email } = body as FormData;

        // check if all fields are filled
        for (const [key, value] of Object.entries(body)) {
            if (typeof value === "string") {
                if (isEmpty(value.toString())) {
                    errors = { ...errors, [key]: `Le champ ${key} est requis` };
                }
            }
        }

        if (Object.keys(errors).length > 0) {
            return new NextResponse(JSON.stringify({ ...errors }), { status: 400 });
        }

        if (!isValidEmail(email)) {
            return new NextResponse(JSON.stringify(
                { error: true, message: "Email invalide." }
            ), { status: 400 });
        }

        const user = await getUserByEmail(email);

        if (!user) {
            return new NextResponse(JSON.stringify(
                { error: true, message: "Aucun compte n'existe pour cette adresse email." }
            ), { status: 400 });
        }

        return new NextResponse(JSON.stringify({
            email
        }), { status: 201 });

    } catch (error) {
        console.log('[SIGNUP_POST]', error)
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}