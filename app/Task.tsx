import React from  'react';
import { observer } from 'mobx-react-lite';
import Store from './Store/advance';
import styles from "./page.module.css"
import store from './Store/advance';

const Task = observer(() => {

  const { taskList } = Store;

  const HandleTaskCompleted = (task: any) => {
    task.ToggleComplete();
  };

  const handleTaskDelete = (TaskId: any) => {
    taskList.RemoveTaks(TaskId);
  };

  const handleAddTask = () => {
    store.GetFiveData()
  };

  const handleAddTask1 = () => {
    const newTask = {
      Id: Math.random().toString(),
      Title: "New Task",
      Completed: false,
    };
    taskList.AddTask(newTask);
  };

  const handleTitleCng = (task: any) => {
    task.SetTitle('joy');
  } 

  const handleReset = () => {
    store.ResetDataUsingApplySnapshot()
  } 

  return (
    <>
      <main className={styles.main}>
        <div>
          <ul>
            {(taskList.tasks) && taskList.tasks.map((task) => (
              <li key={task.Id}>
                <input
                  type="checkbox"
                  checked={task.Completed}
                  onChange={() => HandleTaskCompleted(task)}
                />
                <span> {task.Title} </span>
                <button onClick={() => handleTaskDelete(task.Id)} style={{borderRadius: 8,marginLeft:'2rem', marginTop:'2rem',width:'100px',height: '30px',border: '1.5px solid blue'}}>
                  Delete
                </button>
                <button onClick={() => handleTitleCng(task)} style={{borderRadius: 8,marginLeft:'2rem', marginTop:'2rem',width:'100px',height: '30px',border: '1.5px solid blue'}}>
                  Cng Title
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <button onClick={handleAddTask} style={{borderRadius: 5,marginLeft:'2rem', marginTop:'2rem',width:'100px',height: '30px',border: '1.5px solid red' }}>Add 5 Task</button>
          <button onClick={handleAddTask1} style={{borderRadius: 5,marginLeft:'2rem', marginTop:'2rem',width:'100px',height: '30px',border: '1.5px solid red' }}>Add 1 Task</button>
          <button onClick={handleReset} style={{borderRadius: 5,marginLeft:'2rem', marginTop:'2rem',width:'100px',height: '30px',border: '1.5px solid red' }}> Reset </button>
        </div>
      </main>
    </>
  );
});

export default Task;
