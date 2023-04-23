import React from "react";
import { AiOutlineCloseCircle } from 'react-icons/ai';


function MiActividad({ id, titulo, completada, completarActividad, eliminarActividad }) {
  
  return(
    <div className= { completada ? 'Actividad-completada' : 'Actividad-contenedor'}>
      <div className='Actividad-titulo' onClick={ () => completarActividad(id) }>
        {titulo}
      </div>
     
      <div className='Actividad-contenedor-icono' onClick={ () => eliminarActividad(id)}>
        <AiOutlineCloseCircle className='Actividad-icono'/>
      </div>
    </div>  
  )
}
export default MiActividad;