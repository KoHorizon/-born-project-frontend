import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getUserMe } from '../api/auth';
import { User } from '../types/user';

const defaultUser = {
    id: 1,
    name: 'borne',
    pincode : 0,
    role: 'user',
};
export const UserContext = createContext<User | any>(defaultUser);

export const ReduxUserProvider = (props: any) => {
    const [user, setUser] = useState()
    const [role, setRole] = useState()

    useEffect(() => {
        getUserMe().then((res) => {
            setUser(res.data.user.name);
            setRole(res.data.user.role);        
        }).catch((err) => localStorage.removeItem("token"))
        
    },[])
    

    return (
        <UserContext.Provider value={{ user , role}}>
            {props.children}
        </UserContext.Provider>
    )
}
