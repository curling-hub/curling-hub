/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    mysql_host: process.env.MYSQL_HOST,
    mysql_port: parseInt(process.env.MYSQL_PORT) || 3306,
    mysql_user: process.env.MYSQL_USER,
    mysql_password: process.env.MYSQL_PASSWORD,
    mysql_database: process.env.MYSQL_DATABASE || '',
    google_client_id: process.env.GOOGLE_CLIENT_ID,
    google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
  },
  future: {
    webpacks: true,
  },
}

module.exports = nextConfig
