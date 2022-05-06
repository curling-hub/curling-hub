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
    status: string
    updatedAt?: Date
}

export interface HostCreationForm {
    hostId: string
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
}

