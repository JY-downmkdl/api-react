import { createContext, useContext, useReducer } from "react";
import axios from "axios";

const initialState = {
    loading: false,
    data: null,
    error: null
}

//리듀서 작성하기
function reducer(state, action){
    switch(action.type){
        case "LOADING":
            return{
                loading: true,
                data: null,
                error: null
            };
        case "SUCCESS":
            return{
                loading: false,
                data: action.data,
                error: null
            };
        case "ERROR":
            return{
                loading: false,
                data: null,
                error: action.error
            };
        default:
            return;
    }
}

export async function getUsers(dispatch){
    dispatch({type: "LOADING"});
    try {
        //const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        const response = await axios.get('http://localhost:8010/cars');
        console.log(response);
    
        dispatch({type: "SUCCESS", data: response.data});
    } catch (error) {
        dispatch({type: "ERROR", error: error});
    }
}

// State context, Dispatch context 생성하기
const UsersStateContext = createContext(null);
const UsersDispatchContext = createContext(null);

//위에서 선언한 context 들의 provider로 감싸는 컴포넌트
export function UsersProvider({children}){
    const [state, dispatch] = useReducer(reducer, initialState);
    return(
        <UsersStateContext.Provider value={state}>
            <UsersDispatchContext.Provider value={dispatch}>
                {children}
            </UsersDispatchContext.Provider>
        </UsersStateContext.Provider>
    )
}

//State 조회하기
export function useUserState(){
    const state = useContext(UsersStateContext);
    if (!state){
        return;
    }
    return state;
}

//Dispatch를 쉽개 사용할 수 있도록 내보낵
export function useUserDispatch() {
    const dispatch = useContext(UsersDispatchContext);
    if(!dispatch){
        return;
    }
    return dispatch;
}