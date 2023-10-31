import './App.css';
import Navbar from './Components/Navbar/Navbar'
import TaskForm from './Components/TaskForm/TaskForm';
import TaskList from './Components/TaskList/TaskList';
import Tasks from './Components/Tasks/Tasks';

function App() {
  return (
    <div className="App">
      <Navbar />
      <TaskForm />
      <TaskList />
      <Tasks />
    </div>
  );
}

export default App;
