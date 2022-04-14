import NextAuth, { DefaultSession, DefaultUser, Session } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import SequelizeAdaptor, { models, } from "@next-auth/sequelize-adapter"
import { DataTypes, Sequelize } from "sequelize"
import getConfig from 'next/config'

import * as DbModels from '../../../lib/db_model'
import { sequelize } from '../../../lib/db'

const { serverRuntimeConfig } = getConfig()
const {
    mysql_host,
    mysql_port,
    mysql_user,
    mysql_password,
    mysql_database,
    google_client_id,
    google_client_secret,
} = serverRuntimeConfig

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    // https://next-auth.js.org/getting-started/typescript
    interface Session {
        user: {
            account_type?: string
        } & DefaultSession["user"] & DefaultUser
    }
}


export default NextAuth({
    pages: {
        // **Uncomment these after the corresponding pages are ready to go
        // signIn: '/signin',
        // signOut: '/signout',
        // verifyRequest: '/verify-request',
        newUser: '/',
    },
    providers: [
        GoogleProvider({
            // refer to Google Cloud oauth credentials page
            clientId: google_client_id,
            clientSecret: google_client_secret,
        }),
    ],
    callbacks: {
        //async redirect({ url, baseUrl }) {
        //    return baseUrl
        //},
        async session({ session, user, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    ...user,
                },
            }
        },
    },
    adapter: SequelizeAdaptor(sequelize, {
        models: {
            User: DbModels.UserModel,
            Account: DbModels.AccountModel,
        },
    }),
})
