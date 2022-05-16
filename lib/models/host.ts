import { EnumDataType } from "sequelize/types"

interface user {
    email: string
}

export interface HostInfoBase {
    hostId: number
    organization: string
    website?: string
    phoneNumber: string
    streetAddress: string
    addressExtras?: string
    city: string
    state: string
    zip: string
    country: string
    status: string
    updatedAt?: Date
}

export interface HostCreationForm {
    userId: string
    email: string
    organization: string
    website?: string
    phoneNumber: string
    streetAddress: string
    addressExtras?: string
    city: string
    state: string
    zip: string
    country: string
    iceSheets: string[]
}

export interface CurrentHostInfo {
    organization: string
    website?: string
    phoneNumber: string
    streetAddress: string
    addressExtras?: string
    city: string
    state: string
    zip: string
    country: string
    iceSheets?: string[]
}

export interface HostInfo extends HostInfoBase {
    iceSheets?: string[]
    admins?: user[]
    email?: string
}

