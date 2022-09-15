import { createContext, useState } from "react";
// inicializo un contecto global
const MostrarContext = createContext();
// creo la funcion para inicializarlo
const MostrarProvider = ({children}) => {
// creo la variable
    const [mostrar, setMostrar] = useState(false)
// creo una funcion para cambiar el estado de la variable
    const cambiar = () => {
        if(mostrar){
            setMostrar(false)
        }else{
            setMostrar(true)
        }
    }
// creo una variable para incluir todo lo que pueda usar en el useContext
    const data = {mostrar,cambiar}
    return(
        <MostrarContext.Provider value={data}>{children}</MostrarContext.Provider>
    )
}
export {MostrarProvider}
export default MostrarContext;