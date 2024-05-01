import { getServerSession } from "next-auth";
import Dashboard from "./_dashboard";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { UsersType } from "@/lib/db/userHelper";
import { getLinkByUsername } from "@/lib/db/links";

export default async function Account() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        redirect('/sign-in');
    }

    const user = session.user as UsersType[0];
    const link = await getLinkByUsername(user.username);

    console.log(link);

    if (!link) {
        redirect('/sign-in');
    }

    return <Dashboard user={{
        ...user,
        link
    }} />
}
