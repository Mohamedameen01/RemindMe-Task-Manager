import React, { useEffect, useState } from 'react'
import './TaskList.css'
import { getDocs,collection} from 'firebase/firestore'
import { db } from '../../Firebase/Confiq'

function TaskList() {
    const [savedTask,setSavedTask] = useState([])
    useEffect(()=>{
        getDocs(collection(db, "Saved Tasks")).then((snapShot)=>{
            const tasks = snapShot.docs.map((task)=>{
                return{
                    ...task.data(),
                    id:task.id
                }
            })
            setSavedTask(tasks)
        })
    },[])
    
  return (
    <div className='parentdiv'>
        <div className="childdiv">
            {savedTask &&
                <ul>
                    {savedTask.map((task)=>
                        <li>{task.title}</li>
                    )}
                </ul>
            }
        </div>
    </div>
  )
}

export default TaskList