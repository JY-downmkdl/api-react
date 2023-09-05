import React, {  useEffect } from 'react';
import { getUsers, useUserState, useUserDispatch } from '../UsersContext';


// async function getUsers(){
//     const response = await axios.get('https://jsonplaceholder.typicode.com/users');
//     return response.data;
// }


// function reducer(state, action){-----0821 주석처리
//     switch(action.type){
//         case 'LOADING':
//             return{
//                 loading: true,
//                 users: null,
//                 error: null
//             }
//         case 'SUCCESS':
//             return {
//                 loading: false,
//                 users: action.data,
//                 error: null
//             };
//         case 'ERROR':
//             return {
//                 loading: false,
//                 users: null,
//                 error: action.error
//             };
//         default:
//             return state;
//     }
// } -----0821 주석처리
function Users (props) {
    // const [users, setUsers] = useState(null);-----0821 주석처리
    // const [loading, setLoding] = useState(false);
    // const [error, setError] = useState(null);
    //
    // const [state, dispatch] = useReducer(reducer, {
    //     loading: false,
    //     users: null,
    //     error: null
    // })-----0821 주석처리
    
    //함수 호출
    // const fetchUsers = async ()=>{ -----0821 주석처리
    //     try {
    //         //요청시작
    //         // loading 상태를 true로
    //         // users, error는 null로
    //         // setLoding(true);
    //         // setUsers(null);
    //         // setError(null);
    //         dispatch({type: 'LOADING'});
                
    //         const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    //         //response.date안에 데이터 있음
    //         //요청 성공 후 받아온 데이터를 users에 담는다
    //         //setUsers(response.data);
    //         dispatch({type: 'SUCCESS', data: response.data});
    //     } catch (error) {
    //         dispatch({type: 'ERROR', error: error});
    //     }
    // }
    // useEffect(() => {
    //     //axios 요청하기
    //     fetchUsers();
    // },[]); -----0821 주석처리
    //리턴과 동시에 함수 종료
    
    const state = useUserState();

    //dispatchㄹ를 리턴한다. useContext(UserDispatchContexxt)
    const dispatch = useUserDispatch();

    // 초기상태 : { loading: faluse, error:null, data: null}
    const {loading, error, data} = state;
    console.log(state);
    const refetch = () =>{
        getUsers(dispatch);
    
    }
    useEffect(()=>{
        getUsers(dispatch);
    }, []);

    if(loading) return <div>로딩중...</div>
    if(error) return <div>에러 발생</div>
    if(!data) return <div>데이터가 없습니다</div>
    // users 가 다 있어야 return 실행
    return (
        <div>
        <ul>
            {data.map(user => (
                    <li key={user.id}>
                        {user.username} ({user.name})
                    </li>
            ))}
            <h2> 스프링부트 불러오기</h2>
            {data.map(user => (
                <div>
                   
                    <li key={user.id}>
                        {user.brand} ({user.model})
                    </li>
                </div>
            ))}
        </ul>
        <button onClick={refetch}>다시 불러오기</button>
    </div>
    );
};


export default Users;