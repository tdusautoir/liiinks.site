import SignInForm from "./_form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
    const session = await getServerSession(authOptions);

    if (session && session.user) {
        redirect("/account");
    }

    return <SignInForm />
}