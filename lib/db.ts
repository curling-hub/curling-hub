import mysql from 'mysql2'
import { Sequelize } from 'sequelize'
import getConfig from 'next/config'

const { serverRuntimeConfig } = getConfig()
const {
    mysql_host,
    mysql_port,
    mysql_user,
    mysql_password,
    mysql_database,
} = serverRuntimeConfig

export function getSequelize() {
    if (process.env.NODE_ENV === 'test') {
        const db = new Sequelize('sqlite::memory:')
        return db
    }
    return new Sequelize(mysql_database, mysql_user, mysql_password, {
        host: mysql_host,
        port: mysql_port,
        dialect: 'mysql',
        logging: process.env.NODE_ENV === 'development' && console.log,
    })
}

// Use sequelize to avoid formatting between db rows and js objects
export const sequelize = getSequelize()

// Deprecated in favor of sequelize
export const pool = mysql.createPool({
    host: mysql_host,
    port: mysql_port,
    user: mysql_user,
    password: mysql_password,
    database: mysql_database
})
