
type contactType = {
    status : number,
    _id : string
}

export type userType = {
    _id : string,
    username : string,
    email : string,
    avatar : string,
    statud : string,
    password : string,
    phone : number,
    __v ?: number,
    contact : [contactType]
}