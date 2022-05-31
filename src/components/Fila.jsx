import React from 'react'

const Fila = ({datos,eliminar,actualizar}) => {
    return (
        <tr >
            <td>{datos.nombre}</td>
            <td>{datos.capacidad}</td>
            <td>{datos.piso}</td>
            <td><button type="button" className="btn btn-warning" onClick={()=>actualizar(datos)}>Editar</button></td>
            <td><button type="button" className="btn btn-danger" onClick={()=>eliminar(datos.id)}>Eliminar</button></td>
        </tr>
    )
}

export default Fila