import {createSlice} from "@reduxjs/toolkit";
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';


const slice=createSlice({
        name: 'login',
        initialState:{
            token:Cookies.get('token'),
            exp:Cookies.get('exp'),
            role:Cookies.get('token')!==undefined?jwtDecode(Cookies.get('token')).roles:undefined,
            id:Cookies.get('token')!==undefined?jwtDecode(Cookies.get('token')).id:undefined,
        },
        reducers:{
            setToken(state, action){
                let exp=jwtDecode(action.payload.token).exp
                let role=jwtDecode(action.payload.token).role
                Cookies.set('token',action.payload.token)
                Cookies.set('exp', exp)

                state.token=action.payload.token
                state.exp=exp
                state.role=role
                return state;
            },
            deleteToken(state, action){
                Cookies.remove('token')
                Cookies.remove('exp')

                state.token=undefined
                state.exp=undefined
                state.role=undefined

                return state;
            }
        }
    }
)

export const dispatches = slice.actions;

export default slice.reducer;