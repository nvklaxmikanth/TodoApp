import React, { useState ,useEffect} from 'react';
import {
    addTask,
    getTasks,
    updateTask,
    deleteTask,
} from "./services/api";
import './App.css';

function App() {
  const [tasks,setTasks] = useState({tasks: []});
  const [currentTask,setCurrentTask] = useState("");

  const getData = async () => {
    const {data} = await getTasks();
    setTasks({tasks: data}); 
  };

  useEffect(() => {
    getData();
  },[]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await addTask({ task: currentTask});
    const newTasks = tasks.tasks;
    newTasks.push(data);
    setTasks({tasks: newTasks});
    setCurrentTask("");
  };

  const handleUpdate = async (currentTask) => {
    const originalTasks = tasks.tasks;
    const newTasks = [...originalTasks];
    const index = newTasks.findIndex((task) => task._id === currentTask);
    newTasks[index] = { ...newTasks[index]};
    newTasks[index].completed = ! newTasks[index].completed;
    setTasks({tasks: newTasks});
    await updateTask(currentTask,{completed: newTasks[index].completed});
  };

  const handleDelete = async (currentTask) => {
    const originalTasks = tasks.tasks;
    const newTasks = originalTasks.filter(
      (task) => task._id !== currentTask
    );
    setTasks({tasks: newTasks});
    await deleteTask(currentTask);
  };

  return (
    <>
      <div className='App'>
        <div className='container'>
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
              <input 
                type="text" 
                className="bg-light form-control" 
                placeholder="Add Task"
                value = {currentTask}
                onChange = {(e) => setCurrentTask(e.target.value)}
               />
              <button className="btn btn-dark input-group-text" type="submit"><i className="ri-add-line"></i></button>
            </div>
          </form>
          <div className="list-group">
            {tasks.tasks.map(task => (
              <div key = {task._id} className="task rounded">
                <div className="task bg-light text-dark list-group-item list-group-item-action list-group-item-dark icons">
                  <div className="content">
                    { 
                      !task.completed 
                      ? <div onClick = {() => handleUpdate(task._id)} className='pe-auto text'><p><a href="#" className="pe-auto">{task.task}</a></p></div> 
                      : <div onClick = {() => handleUpdate(task._id)} className='pe-auto text text-decoration-line-through'><p><a href="#" className="pe-auto">{task.task}</a></p></div>
                    }
                    <div className="icons">
                      {
                        !task.completed 
                        ? <button onClick = {() => handleUpdate(task._id)} className='btn btn-light'><i className="ri-checkbox-circle-line"></i></button>
                        : <button onClick = {() => handleUpdate(task._id)} className='btn btn-light'><i className="ri-checkbox-circle-fill"></i></button>
                      }
                      <button onClick = {() => handleDelete(task._id)} className='btn btn-light'><i className="ri-delete-bin-7-fill"></i></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
