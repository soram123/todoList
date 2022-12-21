import {useEffect, useState} from 'react'

const TodoList = ()=>{
    const [tasks, setTasks] = useState([])
    const [currentTask , setCurrentTask] = useState('')
    const [stats, setStats ] = useState({totalTasks: 0, completedTasks:0, incompleteTasks:0})
    useEffect(()=>{
        let completedTasks = 0
        tasks.forEach(task=>{
            if(task.completed == true ){
                completedTasks++
            }
        })
        setStats({ totalTasks: tasks.length, completedTasks: completedTasks, incompleteTasks: tasks.length - completedTasks})
    },[tasks])

    function deleteTask(index){
        setTasks(tasks.filter((task,i)=> i !== index))
    }
    return (
        <>
        <h2> Learn React</h2> 
        {tasks.length == 0 && <p>task is empty add tasks!</p>}
        {tasks.length > 0 && (
         <>
         <p>Total tasks: {stats.totalTasks} </p>
         <p>Completed Tasks: {stats.completedTasks}</p>
         <p>Incomplete Tasks: {stats.incompleteTasks}</p>
         </>)}
         <input type="text" value={currentTask} 
               onChange={(e)=>setCurrentTask(e.currentTarget.value)} />
        <input type="button" value="Add"
               onClick={()=>{
                   if(currentTask.length>0){
                        let newTasks = [...tasks]
                        newTasks.push({taskName: currentTask, completed:false})
                        setTasks(newTasks)
                   }
               }}  />
        <h2>Tasks list</h2>
        <ol>
            {
                tasks.map((task,i)=>{
                   return  <li><input type="checkbox" value={task.taskName}
                                       disabled={task.completed}
                                      onChange={()=>{
                                        let newTasks = tasks.map((task, currentIndex)=>{
                                            if(currentIndex !==i){
                                                return task
                                            }
                                            else {
                                                return {...task,completed:true}
                                            }
                                        })
                                        setTasks(newTasks)
                                      }}
                               />
                   {task.completed && <s>{task.taskName}</s>}
                   {!task.completed && <span>{task.taskName}</span>}
                   {!task.completed && <button onClick={()=>deleteTask(i)}>Delete</button>}
                   </li>
            })
            }
        </ol>
        </>
    )
}
export default TodoList

