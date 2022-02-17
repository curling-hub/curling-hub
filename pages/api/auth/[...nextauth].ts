import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import SequelizeAdaptor, { models } from "@next-auth/sequelize-adapter"
import { DataTypes, Sequelize } from "sequelize"
import getConfig from 'next/config'

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

const sequelize = new Sequelize(mysql_database, mysql_user, mysql_password, {
    host: mysql_host,
    port: mysql_port,
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development',
})

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
        async redirect({ url, baseUrl }) {
            return baseUrl
        },
        async session({ session, user, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    // need `user.id` to get custom user specific info in `getServerSideProps`
                    id: user.id,
                },
            }
        },
    },
    adapter: SequelizeAdaptor(sequelize, {
        models: {
            Account: sequelize.define("account", {
                ...models.Account,
                // overwrite default `id_token` data type because VARCHAR(255) is too short
                id_token: DataTypes.STRING(8192),
            }),
        },
    }),
})
