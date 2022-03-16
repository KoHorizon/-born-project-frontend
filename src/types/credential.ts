export type Credential = {
    name: string,
    pincode: number
}

export type ResponseAuth = {
    status: number,
    access_token: string
}


export type UserMe = {
    status: number,
    user: {
        id: number,
        name:string,
        pincode: string,
        role: string
    }
}

// "status": 200,
//     "user": {
//         "id": 1,
//         "name": "borne2",
//         "pincode": "5f28f24f5520230fd1e66ea6ac649e9f9637515f516b2ef74fc90622b60f165eafca8f34db8471b85b9b4a2cdf72f75099ae0eb8860c4f339252261778d406eb",
//         "role": "user"
//     }