import axiosClient from './index';

const UserService = {
    getAll: () => {
        return axiosClient.get('/user/get-als');
    },
    getAll2: () => {
        return axiosClient.get('/user/get-all-2');
    },

    getById: (id) => {
        return axiosClient.get(`/user/get/${id}`);
    },

};
export default UserService;
