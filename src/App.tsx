import AddTodo from "./components/AddTodo"
import './App.css';
import Todos from "./components/Todos";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div>
      <main>
        <h1>TODO REACT + TYPESCRIPT</h1>
        <Navbar />
        <AddTodo />
        <Todos />
      </main>
    </div>
  )
}

export default App
