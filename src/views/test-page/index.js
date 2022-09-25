// material-ui
import { Button, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import UserService from '../../services/user.service';

// ==============================|| SAMPLE PAGE ||============================== //

const TestPage = () => {
    const getAllUser = async () => {
        const res = await UserService.getAll();
        console.log(res);
    };
    const getAllUser2 = async () => {
        const res = await UserService.getAll2();
        console.log(res);
    };
    const userRole = () => {
    };
    return (
        <MainCard title='Sample Card'>
            <Typography variant='body2'>
                <Button onClick={getAllUser}>get all user</Button>
                <Button onClick={getAllUser2}>get all user 2</Button>
                <Button>test api admin role</Button>
                <Button>test api user role</Button>
            </Typography>
        </MainCard>
    );
};

export default TestPage;
