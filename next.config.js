/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    mysql_host: 'curlo-1.cla5ezfb400l.us-west-2.rds.amazonaws.com',
    mysql_port: parseInt(process.env.MYSQL_PORT) || 3306,
    mysql_user: 'curloadmin',
    mysql_password: 'XRlshstEG1grBbimRNPP',
    mysql_database: process.env.MYSQL_DATABASE || 'curlo-1',
    google_client_id: process.env.GOOGLE_CLIENT_ID,
    google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
  },
  future: {
    webpacks: true,
  },
}

module.exports = nextConfig
