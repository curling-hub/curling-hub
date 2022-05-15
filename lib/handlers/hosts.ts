import * as DbModels from '../db_model'
import { HostInfo } from '../models'
import { sequelize } from '../db'
import type { HostCreationForm } from '../models/host'
import { AccountType } from '../models/accountType'


export async function hosts() {
    return 0
}

export async function getAllHosts(): Promise<HostInfo[]> {
    const hostInfoList = await DbModels.HostInfoModel.findAll({
        attributes: {
            // `getServerSideProps` Cannot serialize date
            exclude: ['updatedAt'],
        },
    })
    return hostInfoList.map((hostInfo) => hostInfo.toJSON())
}

export async function getIceSheetsByHostId(hostId: string) {
    await DbModels.IceSheetModel.findAll({
        where: {
            hostId: hostId,
        },
        raw: true,
    })
}

export async function getHostInfoById(hostId: number): Promise<HostInfo | null> {
    const hostInfo = await DbModels.HostInfoModel.findOne({
        where: {
            hostId: hostId,
        },
        attributes: {
            // `getServerSideProps` Cannot serialize date
            exclude: [ 'updatedAt' ],
        },
        include: [{
            model: DbModels.IceSheetModel,
            as: 'iceSheets',
            required: false,
        }],
        nest: true,
    })
    return Object.assign({}, hostInfo?.toJSON(), {
        iceSheets: hostInfo?.iceSheets.map((iceSheet) => iceSheet.name),
    }) as HostInfo
}


export async function getHostInfoByUserId(userId: string): Promise<HostInfo[]> {
    const hostInfoList = await DbModels.HostInfoModel.findAll({
        include: [{
            model: DbModels.UserModel,
            required: true,
            as: 'admins',
            where: { id: userId },
            attributes: [],
        }],
        attributes: {
            exclude: ['admins']
        },
    })
    return hostInfoList.map((h) => h.toJSON())
}


export async function isHostAdmin(userId: string, hostId: number): Promise<boolean> {
    const result = await DbModels.HostAdminModel.findOne({
        where: {
            userId,
            hostId,
        },
    })
    return !!result
}


export async function getHostEmailById(hostId: number): Promise<string | null> {
    return (await DbModels.UserModel.findOne({
        attributes: ["email"],
        include: [{
            model: DbModels.HostInfoModel,
            required: true,
            as: 'hosts',
            where: { hostId: hostId },
            attributes: [],
        }],
    }))?.email || null
}



export async function createHost(form: HostCreationForm): Promise<HostInfo> {
    const hostInfo = await sequelize.transaction(async (t) => {
        // 1. Update `account_type`
        await DbModels.UserModel.update({
            account_type: AccountType.HOST,
        }, {
            where: { id: form.userId },
            transaction: t,
        })

        // 2. Create host entry
        const hostInfo = await DbModels.HostInfoModel.create({
            organization: form.organization,
            website: form.website || undefined,
            phoneNumber: form.phoneNumber,
            streetAddress: form.streetAddress,
            addressExtras: form.addressExtras || undefined,
            city: form.city,
            state: form.state,
            zip: form.zip,
            country: form.country,
            status: 'pending',
        }, { transaction: t })

        // 3. Create association `host_profile` -> `host_admin
        await DbModels.HostAdminModel.create({
            userId: form.userId,
            hostId: hostInfo.hostId,
        }, { transaction: t })

        // 4. Create ice sheets
        await DbModels.IceSheetModel.bulkCreate(form.iceSheets.map((iceSheet: string) => ({
            hostId: hostInfo.hostId,
            name: iceSheet,
        })), { transaction: t })
        return hostInfo.toJSON()
    })
    return hostInfo
}

export async function getPendingHosts(): Promise<HostInfo[]> {
    const hosts = await DbModels.HostInfoModel.findAll({
        where: {
            status: 'pending'
        },
        include: [{
            model: DbModels.UserModel,
            as: 'admins',
            required: false,
            attributes: ['email']
        }],
        nest: true
    })
    
    const finalHosts: HostInfo[] = hosts.map((host) => ({
            email: host.admins?.at(0)?.email || '',
            hostId: host.hostId,
            organization: host.organization,
            website: host.website,
            phoneNumber: host.phoneNumber,
            streetAddress: host.streetAddress,
            city: host.city,
            state: host.state,
            zip: host.zip,
            country: host.country,
            status: host.status,
    }))
    return finalHosts
}

export async function getAcceptedHosts(): Promise<HostInfo[]> {
    const hosts = await DbModels.HostInfoModel.findAll({
        where: {
            status: 'accepted'
        },
        include: [{
            model: DbModels.UserModel,
            as: 'admins',
            required: false,
            attributes: ['email']
        }],
    })
    const finalHosts: HostInfo[] = hosts.map((host) => ({
            email: host.admins?.at(0)?.email || '',
            hostId: host.hostId,
            organization: host.organization,
            website: host.website,
            phoneNumber: host.phoneNumber,
            streetAddress: host.streetAddress,
            city: host.city,
            state: host.state,
            zip: host.zip,
            country: host.country,
            status: host.status,
    }))
    return finalHosts
}

export async function getRejectedHosts(): Promise<HostInfo[]> {
    const hosts = await DbModels.HostInfoModel.findAll({
        where: {
            status: 'rejected'
        },
        include: [{
            model: DbModels.UserModel,
            as: 'admins',
            required: false,
            attributes: ['email']
        }],
    })
    const finalHosts: HostInfo[] = hosts.map((host) => ({
            email: host.admins?.at(0)?.email || '',
            hostId: host.hostId,
            organization: host.organization,
            website: host.website,
            phoneNumber: host.phoneNumber,
            streetAddress: host.streetAddress,
            city: host.city,
            state: host.state,
            zip: host.zip,
            country: host.country,
            status: host.status,
    }))
    return finalHosts
}

export async function updateHost(hostId: string, newStatus: string): Promise<number[]> {
    const rows = await DbModels.HostInfoModel.update({status: sequelize.literal(`'${newStatus}'`)}, {
        where: {
            hostId: hostId
        }    
    })
    return rows
}
