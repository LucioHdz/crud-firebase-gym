import React from 'react'

const Formulario = ({ agregar, nombre, setNombre, piso, setPiso, capacidad, setCapacidad,editar,setEditar, actualizar}) => {
  // Area de hooks





  const cargarDatos = (e) => {
    e.preventDefault();
    if(editar){
      actualizar()
      setEditar(false)
    }else{
      agregar()
    }
    setNombre('')
    setPiso('')
    setCapacidad('')
  }



  return (
    <form className='d-flex flex-column Formulario p-4 col-3 align-center' onSubmit={cargarDatos}>



      <label className='mt-2' >Nombre del area: </label>
      <input value={nombre} className='text-body' required type='text' placeholder='Nombre del area' onChange={(e) => setNombre(e.target.value)} />


      <label className='mt-2'>Numero de piso: </label>
      <input value={piso} className='text-body' required type='number' placeholder='No. de piso' onChange={(e) => setPiso(e.target.value)} />


      <label className='mt-2'>Capacidad de personas en el area: </label>
      <input value={capacidad} className='text-body' required type='number' placeholder='Capacidad de personas' onChange={(e) => setCapacidad(e.target.value)} />


      <button type="submit" className="btn btn-outline-light mt-2">{editar?'Editar':'Agregar'}</button>
      <small className='text-info'>Puede tardar un poco en subir los cambios</small>
    </form>
  )
}

export default Formulario