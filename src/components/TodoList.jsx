import { useEffect, useState } from "react"
import Fomulario from "./Fomulario"
import Todo from "./Todo"

const TodoList = () => {

    const [todos, setTodos] = useState([])

    useEffect( () => {
        if (localStorage.getItem('todos')){
            setTodos(JSON.parse(localStorage.getItem('todos')))
        }
    }, [])      // se ejecuta solo una vez

    useEffect( () => {
        localStorage.setItem("todos", JSON.stringify(todos))
    }, [todos])     // se graba cada vez que haya un cambio

    const agregarTodo = (todo) => {
        console.log(todo)
        setTodos((old) => [...old, todo])
        console.log(todos)
    }

    const eliminarTodo = (id) => {
        setTodos( (old) => old.filter(item => item.id!==id) )
    }

    const editarTodo = id => {
        const editarTodos = todos.map(item => (
            item.id === id ?{...item, estado: !item.estado} :item
        ))
        setTodos(editarTodos)
    }

  return (
    <>
        <Fomulario agregarTodo={agregarTodo} />   
        <ul className="list-group list-group-numbered mt-2">
            {todos.map(item => (
                <Todo 
                    key={item.id} 
                    todo={item} 
                    eliminarTodo={eliminarTodo}     // envio estas funciones en el props
                    editarTodo = {editarTodo}
                />
            ))} 
        </ul>
    </>
  )
}

export default TodoList