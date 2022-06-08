import Formulario from "./components/Formulario";
import { initializeApp } from "firebase/app";
import { collection, deleteDoc, getDocs, getFirestore, updateDoc } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import uuid from "react-uuid";
import React from "react";
import Fila from "./components/Fila";




const firebaseConfig = {
  apiKey: "AIzaSyDe8WKDu5gV0Jn7e_ujIxlVEFP8mAi8sk0",
  authDomain: "omar-90e4f.firebaseapp.com",
  projectId: "omar-90e4f",
  storageBucket: "omar-90e4f.appspot.com",
  messagingSenderId: "1062183002149",
  appId: "1:1062183002149:web:03a58b97c0f919c8bf9fcc",
  measurementId: "G-S7NCWHMSLY"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);









function App() {
  const [areas, setAreas] = React.useState()

  const [nombre, setNombre] = React.useState();
  const [id, setid] = React.useState();
  const [piso, setPiso] = React.useState();
  const [capacidad, setCapacidad] = React.useState();
  const [editar, setEditar] = React.useState(false);

  const leer = async () => {
    setAreas([])
    const querySnapshot = await getDocs(collection(db, "Areas"));
    var datos = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      datos = [...datos, doc.data()]
      // console.log(doc.id, " => ", doc.data());
      setAreas(datos)
    })
  }

  const agregarDatosAFirestore = () => {
    // Add a new document in collection "cities"
    const id = uuid();
    setDoc(doc(db, "Areas", id), {
      id: id,
      nombre: nombre,
      piso: piso,
      capacidad: capacidad
    }).then((d) => {
      alert('Area agregada correctamente')
      leer()
    })
      .catch((e) => {
        alert('No se pudo agregar el Area')
      })
  }

  const eliminarDato = (id) => {
    deleteDoc(doc(db, "Areas", id)).then((e) => {
      alert('Eliminado')
      leer()
    })

  }

  const actualizarDato = () => {
    updateDoc(doc(db, "Areas", id), {
      id: id,
      nombre: nombre,
      piso: piso,
      capacidad: capacidad
    }).then((e)=>{
      leer()
    })
  }
  const actualizar = (datos) => {
    setNombre(datos.nombre)
    setPiso(datos.piso)
    setCapacidad(datos.capacidad)
    setid(datos.id)
    setEditar(true)

  }
  return (
    <div className="App bg-dark  p-4">



      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-2">
        <span className="navbar-brand" href="#">Gimnasio CRUD</span>
      </nav>


      <section className=' d-flex flex-wrap'>

        <Formulario agregar={agregarDatosAFirestore}
          nombre={nombre} setNombre={setNombre}
          piso={piso} setPiso={setPiso}
          capacidad={capacidad} setCapacidad={setCapacidad}
          editar={editar} setEditar={setEditar}
          actualizar={actualizarDato}
        />


        <div className="col-2"></div>


        <div className='d-flex flex-column ml-3 p-2 col-6 Lista'>

          <button type="button" className="btn btn-info  mb-3" onClick={leer}>Actualizar</button>

          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Capacidad</th>
                <th scope="col">piso</th>
                <th scope="col">Editar</th>
                <th scope="col">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {!areas ? null : areas.map((datos) => {
                return (<Fila key={datos.id} datos={datos} eliminar={eliminarDato} actualizar={actualizar}/>)
              })}





            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default App;
