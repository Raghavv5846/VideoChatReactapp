
import { createContext, useContext, useMemo } from 'react';
import { io } from 'socket.io-client'
export const socketContext=createContext(null);
export const useSocket=()=>{
    const socket=useContext(socketContext);
   
    return socket;
}
// export default function useSocket(props) {
//     const socket=useMemo(()=> io('localhost:8000'),[]);
//     // console.log(socket);
//     return socket;
// }

export default function SocketProvider(props){
    const socket=useMemo(()=> io('localhost:8000'),[]);
    
  return (
    <socketContext.Provider value={socket}>
        {props.children}
    </socketContext.Provider>
  )
}