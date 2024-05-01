import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import SignUpForm from "./_form";

export default async function Page() {
    const session = await getServerSession(authOptions);

    if (session && session.user) {
        redirect("/");
    }

    return <SignUpForm />
}