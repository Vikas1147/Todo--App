import { createContext, ReactNode, useContext, useState } from "react";

export type TodosProviderProps = {
    children: ReactNode
}

export type Todo = {
    id: string;
    task: string;
    completed: boolean;
    createdAt: Date;
}

export type TodosContext = {
    todos: Todo[];
    handleAddToDo:(task: string) => void; 
    toggleTodoAsCompleted: (id: string) => void;
    handledeleteTodo: (id: string) => void;
}

export const todosContext = createContext<TodosContext | null>(null);

export const TodosProvider = ({children}: TodosProviderProps) => {
    const [todos, setTodos] = useState<Todo[]>(() => {
        try {
            const newTodos = localStorage.getItem('td') || "[]";
            return JSON.parse(newTodos) as Todo[];
        } catch (error) {
            return [];
        }
    });

    const handleAddToDo = (task: string) => {
        setTodos((prev) => {
            const newTodos:Todo[] = [
                {
                    id:Math.random().toString(),
                    task: task,
                    completed: false,
                    createdAt: new Date()
                },
                ...prev
            ] 
            // console.log("my prev" + prev);
            // console.log(newTodos);
            localStorage.setItem("td", JSON.stringify(newTodos));
            return newTodos;
        })
    }

    const toggleTodoAsCompleted = (id: string) => {
        setTodos((prev) => {
            let newTodos = prev.map((todo) => {
                if(todo.id === id){
                    return {...todo, completed: !todo.completed}
                }
                return todo;
            })
            localStorage.setItem("td", JSON.stringify(newTodos));
            return newTodos;
        })
    }

    const handledeleteTodo = (id: string) => {
        setTodos((prev) => {
            let newTodos = prev.filter((filterTodo) => filterTodo.id !== id);
            localStorage.setItem("td", JSON.stringify(newTodos));
            return newTodos;
        })
    }

    return <todosContext.Provider value={{todos, handleAddToDo, toggleTodoAsCompleted, handledeleteTodo}}>
        {children}
    </todosContext.Provider>
}

export const useTodos = () => {
    const todosConsumer = useContext(todosContext);
    if(!todosConsumer){
        throw new Error("useTodos used outside of provider")
    }
    return todosConsumer;
}