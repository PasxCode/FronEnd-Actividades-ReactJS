import React, { useState } from 'react';
import '../hojas-de-estilo/actividad-formulario.css';


function ActividadFormulario(props){

  const[input,setInput] = useState('');

  const manejarCambio = e => {
    setInput(e.target.value);
  }

  const manejarEnvio = e => {
    e.preventDefault();
   
    const ActividadNueva = {
      titulo: input,
      completada: false
    }
    props.onSubmit(ActividadNueva);
  }

  return(
    <form className='Actividad-formulario' onSubmit={manejarEnvio}>
      <input 
        className='Actividad-input'
        type='text'
        placeholder='Escribe una Actividad.'
        name='titulo'
        onChange={manejarCambio}
      />      
      <button className='Actividad-boton'>Agragar Actividad</button>
    </form>
  );
}

export default ActividadFormulario;