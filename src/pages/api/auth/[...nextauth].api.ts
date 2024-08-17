import NextAuth, { NextAuthOptions } from 'next-auth'
import PrismaAdapter from '@/lib/auth/prisma-adapter'
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'
import { NextApiRequest, NextApiResponse, NextPageContext } from 'next'

const scopes = {
  email: 'https://www.googleapis.com/auth/userinfo.email',
  profile: 'https://www.googleapis.com/auth/userinfo.profile',
  calendar: 'https://www.googleapis.com/auth/calendar',
}

export function buildNextAuthOptions(
  req: NextApiRequest | NextPageContext['req'],
  res: NextApiResponse | NextPageContext['res'],
): NextAuthOptions {
  return {
    pages: {
      signIn: '/',
    },

    adapter: PrismaAdapter(req, res),

    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID ?? '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        authorization: {
          params: {
            scope: Object.values(scopes).join(' '),
          },
        },
        profile(profile: GoogleProfile) {
          return {
            id: profile.sub,
            name: profile.name,
            email: profile.email,
            avatar_url: profile.picture,
            username: '', // Need to be returned, but wont be used...
          }
        },
      }),
    ],

    callbacks: {
      async signIn({ account }) {
        if (!account?.scope?.includes(scopes.calendar)) {
          return '/register/connect-calendar?error=permissions'
        }

        return true
      },

      async session({ session, user }) {
        return {
          ...session,
          user,
        }
      },
    },
  }
}

export default async function Auth(req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, buildNextAuthOptions(req, res))
}
