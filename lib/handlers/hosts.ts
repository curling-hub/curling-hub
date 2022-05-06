import * as DbModels from '../db_model'
import { HostInfo } from '../models'
import { sequelize } from '../db'
import type { HostCreationForm } from '../models/host'


export async function hosts() {
    return 0
}

export async function getAllHosts(): Promise<HostInfo[]> {
    const hostInfoList = await DbModels.HostInfoModel.findAll({
        attributes: {
            exclude: ['updatedAt'],
        },
    })
    return hostInfoList.map((hostInfo) => hostInfo.toJSON())
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
        attributes: {
            exclude: ['updatedAt'],
        },
        nest: true,
    })
    return Object.assign({}, hostInfo?.toJSON(), {
        iceSheets: hostInfo?.iceSheets.map((iceSheet) => iceSheet.name)
    }) as HostInfo
}

export async function getHostEmailById(hostId: string): Promise<string | null> {
    return (await DbModels.UserModel.findOne({
        attributes: ["email"],
        where: {
            id: hostId,
        },
    }))?.email || null
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
