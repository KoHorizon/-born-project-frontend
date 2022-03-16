import { useContext, useEffect, useState } from 'react';
import { Outlet , Navigate} from 'react-router-dom'
import { UserContext } from '../providers/providerUser';

export const ProtectedRouteUser = () => {
    const auth = localStorage.getItem('token');
    return auth ? <Outlet /> : <Navigate to="/login"/> ;
}
