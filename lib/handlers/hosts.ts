import * as DbModels from '../db_model'
import { HostInfo } from '../models'
import { sequelize } from '../db'
import type { HostCreationForm } from '../models/host'


export async function hosts() {
    return 0
}

export async function getAllHosts(): Promise<HostInfo[]> {
    const hostInfoList = await DbModels.HostInfoModel.findAll({
        nest: true,
    })
    if (!hostInfoList) {
        return []
    }
    return hostInfoList.map((hostInfo) => hostInfo.get())
}

export async function getIceSheetsByHostId(hostId: string) {
    return await DbModels.IceSheetModel.findAll({
        where: {
            hostId: hostId,
        },
        raw: true,
    })
}

export async function getHostInfoById(hostId: string): Promise<HostInfo | null> {
    const hostInfo = await DbModels.HostInfoModel.findOne({
        where: {
            hostId: hostId,
        },
        include: [{
            model: DbModels.IceSheetModel,
            as: 'iceSheets',
            required: false,
        }],
        nest: true,
    })
    return Object.assign({}, hostInfo?.get(), {
        iceSheets: hostInfo?.iceSheets.map((iceSheet) => iceSheet.name)
    }) as HostInfo
}

export async function getPendingHosts(): Promise<HostInfo[] | null> {
    const hosts = await DbModels.HostInfoModel.findAll({
        where: {
            status: 'pending'
        },
        include: [{
            model: DbModels.UserModel,
            as: 'user',
            required: false,
            attributes: ['email']
        }],
        nest: true
    })
    
    var prtlHosts = hosts?.map((host) => host.get() as HostInfo) 
    var finalHosts = prtlHosts.map((host) => {
        return ({
            email: host.user?.email,
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
    })})
    return finalHosts
}

export async function createHost(form: HostCreationForm): Promise<HostInfo> {
    const hostInfo = await sequelize.transaction(async (t) => {
        // 1. Update `account_type`
        await DbModels.UserModel.update({
            account_type: 'host',
        }, {
            where: { id: form.hostId },
            transaction: t,
        })

        // 2. Create host entry
        const hostInfo = await DbModels.HostInfoModel.create({
            hostId: form.hostId,
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
        return hostInfo.toJSON()
    })
    return hostInfo
}

export async function getAcceptedHosts(): Promise<HostInfo[] | null> {
    const hosts = await DbModels.HostInfoModel.findAll({
        where: {
            status: 'accepted'
        },
        include: [{
            model: DbModels.UserModel,
            as: 'user',
            required: false,
            attributes: ['email']
        }],
    })
    var prtlHosts = hosts?.map((host) => host.get() as HostInfo) 
    var finalHosts = prtlHosts.map((host) => {
        return ({
            email: host.user?.email,
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
    })})
    return finalHosts
}

export async function getRejectedHosts(): Promise<HostInfo[] | null> {
    const hosts = await DbModels.HostInfoModel.findAll({
        where: {
            status: 'rejected'
        },
        include: [{
            model: DbModels.UserModel,
            as: 'user',
            required: false,
            attributes: ['email']
        }],
    })
    var prtlHosts = hosts?.map((host) => host.get() as HostInfo) 
    var finalHosts = prtlHosts.map((host) => {
        return ({
            email: host.user?.email,
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
    })})
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
