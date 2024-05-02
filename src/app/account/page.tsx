import { getServerSession } from "next-auth";
import Dashboard from "./_dashboard";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { UsersType, getUserWithLinkByUsername } from "@/lib/db/userHelper";

export default async function Account() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        redirect('/sign-in');
    }

    const user = session.user as UsersType[0];
    const userWithLink = await getUserWithLinkByUsername(user.username);

    if (!userWithLink) {
        redirect('/sign-in');
    }

    return <Dashboard user={userWithLink} />
}
