import React, { useState } from 'react'
import './TaskForm.css'
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../../Firebase/Confiq';

function TaskForm() {
    const [taskDetails,setTaskDetails] = useState({
        title:"",
        description:""
    })
    
    const handleChange = (e)=>{
        const {name,value} = e.target
        setTaskDetails({...taskDetails,[name]:value})
    }
    
    const handleSubmit = (e)=>{
        e.preventDefault()
        try{
            const docRef = addDoc(collection(db,"Saved Tasks"),{
                time:new Date(),
                title:taskDetails.title.toUpperCase(),
                description:taskDetails.description
            })
        // console.log("Document written with ID: ", docRef.data())
        }
        catch (e){
            console.error("Error adding document: ", e);
        }
    }
  return (
    <div className='taskform'>
        <div className="task-box">
            <h1>What to Do?</h1>
            <form onSubmit={handleSubmit} id='task-form'>
                <input 
                    type="text" 
                    id='task-title'
                    placeholder='Title' 
                    name='title'
                    onChange={handleChange}
                />
                <textarea 
                    name="description" 
                    id="task-discrip" 
                    onChange={handleChange}
                    placeholder='Description'
                    maxLength={100}
                />
                <button>
                    Save
                </button>
            </form>
        </div>
    </div>
  )
}

export default TaskForm