import React,{ useState, useEffect } from "react";
import ActividadFormulario from "./actividad-formulario";
import '../hojas-de-estilo/lista-de-actividades.css';
import MiActividad from "./actividad";

const API = 'http://localhost:3001';

function ListaDeActividades(){
    const [Actividades,setActividades] = useState([]); 
    const [cargando,setCargando] = useState('Cargando...');

    useEffect(() => {
        async function fetchData() {
          try {
            const response = await fetch(`${API}/actividades`);            
            if (response.ok) {
              const datos = await response.json();
              let ActividadBD =[];
              for (let i = 0; i < datos.length; i++) {
                let t = {};
                t.titulo = datos[i].titulo;
                t.id = datos[i].id;
                t.completada = datos[i].completada;
                ActividadBD.push(t);
              }
              setCargando('');
              setActividades(ActividadBD);           
            } else {
              alert("Hubo un error al obtener Actividades");
            }
          } catch (e) {
            alert("No pudimos hacer la solicitud a la base de datos. conexión fallida.");
          }
        }
        fetchData();
    }, []); 
  
    const agregarActividad = async Actividad => {
      if (Actividad.titulo.trim()) {
        Actividad.titulo = Actividad.titulo.trim();
        try {
          const dato = {titulo:Actividad.titulo, descripcion:Actividad.titulo};
          const response = await fetch(`${API}/actividades`,{
                            method: 'POST',
                            body: JSON.stringify(dato),
                            headers: {'Content-Type': 'application/json'}
                            
          });         

          if (response.ok) {
            const res = await response.json();
            Actividad.id = res[0].insertId;
            const ActividadesActualizadas = [Actividad,...Actividades];
            setActividades(ActividadesActualizadas);

          } else {
            alert("Hubo un error al obtener Actividades");
          }

        }catch (e) {
          alert("No pudimos hacer la solicitud a la base de datos. conexión fallida.");
          console.log(e);
        }

      }
    }

    const eliminarActividad = async id => {
      try {
        const response = await fetch(`${API}/actividades/${id}`,{
                          method: 'DELETE',                         
        });
        if (response.ok){
          const ActividadesActualizadas = Actividades.filter(Actividad => Actividad.id !== id);
          setActividades(ActividadesActualizadas);
        }else{
          alert('Se produjo un error al eliminar la Actividad.');
        }    

        } catch(e){
          alert("No pudimos hacer la solicitud a la base de datos. conexión fallida.");
          console.log(e);
      }
    }

    const completarActividad = id => {
      const borrar = async (Actividad) =>{        
        try{
              
         const response = await fetch(`${API}/actividades/${id}`,{
                          method: 'PUT',
                          body: JSON.stringify(Actividad),
                          headers: {'Content-Type': 'application/json'}          
          }); 
          if (!response.ok) {
           alert('No se pudo modificar la Actividad.') 
          }
        }catch(e){
          alert("No pudimos hacer la solicitud a la base de datos. conexión fallida.");
        }
      }
      const ActividadesActualizadas = Actividades.map(  Actividad => {
        if (Actividad.id === id){
          Actividad.completada = !Actividad.completada;
          borrar(Actividad);
        }
        return  Actividad;
      });
      setActividades(ActividadesActualizadas);
    }

      return (
        <> {/*Esta estructura vacia "<> </>" se llama "fragmento" en react*/}
            <ActividadFormulario onSubmit={agregarActividad} />
            <h1>{cargando}</h1>
            <div className="Actividades-lista-contenedor">
              {
                Actividades.map((Actividad)=>
                  <MiActividad
                    key={Actividad.id}
                    id={Actividad.id}
                    titulo={Actividad.titulo}
                    completada = {Actividad.completada}
                    eliminarActividad={eliminarActividad}
                    completarActividad={completarActividad}
                  /> 
                )
              } 
            </div>
        </>
      );  


}


export default ListaDeActividades;