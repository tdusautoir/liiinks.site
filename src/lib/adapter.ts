import { Adapter, AdapterUser, VerificationToken } from "next-auth/adapters"
import { getUserByEmail, verifiedUser } from "./db/userHelper";
import { createVerificationToken, getVerificationTokenByEmail, deleteVerificationToken } from "./db/verificationTokenHelper";

export default function MyAdapter(): Adapter {
    return {
        async updateUser({ id, ...user }) {
            if (!user.emailVerified) {
                throw new Error("emailVerified is required");
            }

            const adapterUser = await verifiedUser({
                id,
                emailVerified: user.emailVerified.toISOString()
            })

            return adapterUser as AdapterUser;
        },
        async getUserByEmail(email: string): Promise<AdapterUser | null> {
            const user = await getUserByEmail(email);

            if (!user) {
                return null;
            }

            return {
                id: user.id,
                email: user.email,
                emailVerified: new Date(),
            }
        },
        async createVerificationToken({ identifier, expires, token }) {
            const verificationToken = await createVerificationToken({
                identifier,
                token,
                expires
            });

            if (!verificationToken) {
                return null;
            }


            return verificationToken;
        },

        async useVerificationToken({ identifier, token }) {
            try {
                const verificationToken = await deleteVerificationToken(token);

                return verificationToken;
            } catch (error) {
                return null
            }
        },
    }
}