import { EnumDataType } from "sequelize/types"

interface user {
    email: string
}

export interface HostInfoBase {
    hostId: string
    organization: string
    website?: string
    phoneNumber: string
    streetAddress: string
    addressExtras?: string
    city: string
    state: string
    zip: string
    country: string
    status: EnumDataType<string>
    updatedAt?: Date
}

export interface HostInfo extends HostInfoBase {
    iceSheets?: string[]
    user?: user
    email?: string
}


