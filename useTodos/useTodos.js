import { useEffect, useReducer } from "react";
import { todoReducer } from "./todoReducer";

const initialState = [{
    id: '',
    description: '',
    done: false,
}
]

const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || []; 
}

export const useTodos = () => {
    const [todos, dispatch] = useReducer( todoReducer, initialState, init);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify( todos ));
    }, [todos])
    
    const handleAddTodo = (todo) => {
        const action = ({
            type: '[TODO] Add todo',
            payload: todo,
        });

        dispatch( action );
    }
    
    const handleDeleteTodo = ( id ) => {
        dispatch({
            type: '[TODO] Remove todo',
            payload: id,
        })
    }

    const handleToggleTodo = ( id ) => {
        dispatch({
            type: '[TODO] Toggle todo',
            payload: id,
        })
    }    

    return {
        handleAddTodo,
        handleDeleteTodo,
        handleToggleTodo,
        pendingTodosCount: todos.filter( todo => !todo.done ).length,
        todos,
        todosCount: todos.length,
    }
}