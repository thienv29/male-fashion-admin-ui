import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    _id: '',
    fullName: '',
    firstName: '',
    lastName: '',
    token: '',
    tokenRefresh: '',
    avatar: '',
    role: '',
};

export const UserSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state = { ...action.payload };
        },

        setUserLogin: (state, action) => {
            if (action.payload.result && action.payload.result.user) {
                const { user, accessToken, refreshToken } = action.payload.result;
                state.id = user._id;
                state.fullName = user.firstName + ' ' + user.lastName;
                state.firstName = user.firstName;
                state.lastName = user.lastName;
                state.token = accessToken;
                state.tokenRefresh = refreshToken;
                state.avatar = user.avatar;
                state.role = user.role;
            }
        },

        setToken: (state, action) => {
            state.tokenRefresh = action.payload.newRefreshToken;
            state.token = action.payload.newAccessToken;
        },

        resetUserState: (state) => {
            state = {...initialState};
        },

    },
});

// Action creators are generated for each case reducer function
export const { setUser, setUserLogin, setToken, resetUserState } = UserSlice.actions;

export default UserSlice.reducer;
