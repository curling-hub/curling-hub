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
    return hosts?.map((host) => host.get() as HostInfo) 
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
    return hosts?.map((host) => host.get() as HostInfo) 
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
    return hosts?.map((host) => host.get() as HostInfo)
}
