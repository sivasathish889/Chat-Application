
export type friendType = {
    status : number,
    _id : string,
    inviter_user : string
}

export type userType = {
    _id : string,
    username : string,
    email : string,
    avatar : string,
    status? : string,
    password? : string,
    phone? : number,
    __v ?: number,
    friend : [friendType]
}