import type { AuthOptions, Session } from "next-auth"
import EmailProvider from "next-auth/providers/email"
import MyAdapter from "./adapter"
import { resend } from "./resend"

export type UserSessionType = Session & {
    email: string
}

export const authOptions: AuthOptions = {
    adapter: MyAdapter(),
    providers: [
        EmailProvider({
            sendVerificationRequest({
                identifier: email,
                url
            }) {
                resend.emails.send({
                    from: 'onboarding@resend.dev',
                    to: email,
                    subject: 'Magic Link',
                    html: `<p>Click on the link below to sign in:</p><a href="${url}">Sign In</a>`
                });
            }
        }),
    ],
    callbacks: {
        session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    ...token
                },
            };
        },
        jwt: ({ token, user }) => {
            if (user) {
                return {
                    ...token,
                    ...user,
                };
            }
            return token;
        },
    },
    pages: {
        signIn: "/sign-in"
    },
    debug: process.env.NODE_ENV !== "production",
    session: { strategy: "jwt" }
}
