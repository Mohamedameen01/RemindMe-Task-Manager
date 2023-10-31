import './App.css';
import Navbar from './Components/Navbar/Navbar'
import TaskForm from './Components/TaskForm/TaskForm';
import TaskList from './Components/TaskList/TaskList';

function App() {
  return (
    <div className="App">
      <Navbar />
      <TaskForm />
      <TaskList />
    </div>
  );
}

export default App;
