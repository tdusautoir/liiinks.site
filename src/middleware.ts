import { type NextRequest } from 'next/server';
import { withAuth } from "next-auth/middleware"
import type { JWT } from "next-auth/jwt"

export default withAuth(
    function middleware(req) {
    },
    {
        callbacks: {
            authorized: ({ req, token }: { req: NextRequest, token: JWT | null }) => {
                if (!token) {
                    return false;
                }

                return true;
            }
        }
    }
)

export const config = {
    matcher: ['/account'],
}