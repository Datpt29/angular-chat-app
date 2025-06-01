export interface Partner {
    id: number,
    name: string,
    phone: string,
    avatar: string,
    province: string,
    district: string,
    ward: string,
    detail: string,
    field: string,
    servicePackage: string,
    date: string,
    email: string,
    type: string,
    status: string,
}

export interface Province {
    code: number,
    name: string
}

export interface District {
    code: number,
    name: string
}

export interface Ward {
    code: number,
    name: string
}