import React, { useEffect, useState } from 'react'
import './Tasks.css'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../Firebase/Confiq'

function Tasks() {
    const [showTask,setShowTask] = useState([])
    useEffect(()=>{
        getDocs(collection(db,"Saved Tasks")).then((snapShot)=>{
            const allTasks = snapShot.docs.map((item)=>{
                return{
                    ...item.data(),
                    id:item.id
                }
            })
            console.log(allTasks)
            setShowTask(allTasks)
        })
    },[])
  return (
    <div className={showTask ? 'taskdiv' : null}>
        {showTask.map((obj)=>
            <div className="taskbox">
                <h1>{obj.title}</h1>
                <p>{obj.description}</p>
                <div className="btns">
                    <button>Edit</button>
                    <button>Delete</button>
                    <button>View</button>
                </div>
            </div>
        )}     
    </div>
  )
}

export default Tasks