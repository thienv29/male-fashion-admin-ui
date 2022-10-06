import { useRoutes } from 'react-router-dom';
import AuthenticationRoutes from './AuthenticationRoutes';
import Error from './Error';
import { useSelector } from 'react-redux';
import { ROLE } from '../core/constant/role';
import AdminRoutes from './AdminRoutes';
import StaffRoutes from './StaffRoutes';


export default function RoutesStaff() {
        return useRoutes([StaffRoutes, AuthenticationRoutes, Error]);
}
