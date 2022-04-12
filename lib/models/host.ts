export interface HostInfo {
    hostId: string
    name: string
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
    updatedAt?: Date
}

export interface HostInfo extends HostInfoBase {
    iceSheets?: string[]
}

