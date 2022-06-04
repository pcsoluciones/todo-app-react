import Swal from 'sweetalert2'
import { v4 as uuidv4 } from 'uuid'
import { useFormulario } from "../hooks/useFormulario"


const Fomulario = ({agregarTodo}) => {          // usando un destructury de props, sacamos la función enviada ( props.agregarTodo )

    const initialState = {      // función para inicilar los datos
        nombre: '',
        descripcion: '',
        estado: 'pendiente',
        prioridad: false
    }

    //const [todo, setTodo] = useState(initialState)

    const [inputs, handleChange, reset] = useFormulario(initialState)

    const {nombre, descripcion, estado, prioridad} = inputs



    const handleSubmit = (e) => {
        e.preventDefault()

        if (!nombre.trim()){
            e.target[0].focus()
            Swal.fire({
                title: 'Error!',
                text: 'El campo Nombre está vacio',
                icon: 'error',
              })
            return
        }
        if (!descripcion.trim()){
            e.target[1].focus()
            Swal.fire({
                title: 'Error!',
                text: 'El campo descripción está vacio',
                icon: 'error',
              })
            return
        }

        Swal.fire({
            title: 'Exito!',
            text: 'Tarea agregada',
            icon: 'success',
          })
        
        agregarTodo({                   // ejecutamos el metodo que viene de TodoList y le pasamos un objeto de datos
            nombre: nombre,
            descripcion: descripcion,
            estado: estado === 'pendiente' ?false :true,
            prioridad:prioridad,
            id: uuidv4()            //id: Date.now()
        })

        reset()

        // console.log(todo)

    }

  return (
    <>
        <h3>Agregar TAREAS</h3>
        <form onSubmit={handleSubmit}>
            <input 
                name="nombre"
                type="text" 
                className="form-control mb-2"
                placeholder="Ingrese nombre tarea"
                value={nombre}
                onChange= {handleChange}
            />

            <textarea 
                name="descripcion" 
                placeholder="Descripción de la tarea" 
                className="form-control mb-2"
                value={descripcion}
                onChange= {handleChange}
            />

            <select 
                name="estado" 
                className="form-control mb-2"
                value={estado}
                onChange= {handleChange}
            >
                <option value="pendiente">pendiente</option>
                <option value="completado">completado</option>
            </select>

            <div className="form-check">
                <input 
                    name="prioridad"
                    className="form-check-input" 
                    type="checkbox" 
                    checked={prioridad}
                    id="flexCheckDefault"
                    onChange= {handleChange} 
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                    Prioritario
                </label>
            </div>
            
            <button className="btn btn-primary" type="submit">Agregar</button>
        </form>
    </>
  )
}

export default Fomulario