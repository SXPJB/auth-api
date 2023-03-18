export interface ICatalog {
    id: number
    catalog: string
    code: string
    description: string
}

export interface IPerson {
    id: number
    firstName: string
    lastName: string
    email: string
    gender: ICatalog
    active: boolean
    createdAt: Date
    updatedAt: Date
}

export interface IUser {
    id: number
    person: IPerson
    username: string
    password: string
    token: string
    isConfirmed: boolean
    confirmationCode: string
    confirmationCodeExpires: Date
    active: boolean
    createdAt: Date
    updatedAt: Date
}
