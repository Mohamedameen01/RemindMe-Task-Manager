import React, { useEffect, useRef, useState } from 'react'
import './Tasks.css'
import { collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '../../Firebase/Confiq'
import CloseIcon from '@mui/icons-material/Close';

function Tasks() {
    const [showTask,setShowTask] = useState([])
    const [isEditOn,setIsEdit] = useState(false)
    const [currentTask,setCurrentTask] = useState([])
    const myInputRef = useRef(null);   

    useEffect(()=>{
        getDocs(collection(db,"Saved Tasks")).then((snapShot)=>{
            const allTasks = snapShot.docs.map((item)=>{
                return{
                    ...item.data(),
                    id:item.id
                }
            })
            // console.log(allTasks) 
            setShowTask(allTasks)
        })
        
    })

    const handleDelete = (id)=>{
        // console.log("Clicked" + id)
        deleteDoc(doc(db, "Saved Tasks" ,id ))
    }

    const handleClick = ()=>{
        console.log("Clicked")
        if (myInputRef.current) {
            myInputRef.current.focus();
        }
        setIsEdit(true)    
    }

    const handleChange = (e)=>{
        const {name,value} = e.target
        setCurrentTask({...currentTask,[name]:value})
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const taskDocRef=doc(db, 'Saved Tasks', currentTask.id)
        try{
            await updateDoc(taskDocRef,{
                time:new Date(),
                title:currentTask.title.toUpperCase(),
                description:currentTask.description
            })
        }catch(error){
            alert(error)
        }    
        setIsEdit(false)
    }
    useEffect(()=>{
        console.log(currentTask)
    },[currentTask])

  return (
    <>
        <div className={showTask ? 'taskdiv' : null}>
            {showTask.map((obj)=>
                <div className="taskbox">
                    <h1>{obj.title}</h1>
                    <p>{obj.description}</p>
                    <div id="task-btns">
                        <button
                            className='btn1'
                            onClick={()=>{
                                handleClick()
                                setCurrentTask(obj)
                            }}>
                            Edit
                        </button>
                        <button
                            className='btn2'
                            onClick={()=>handleDelete(obj.id)}
                        >
                            Delete
                        </button>
                        <button className='btn3'>View</button>
                    </div>
                </div>
            )}     
        </div>
        {isEditOn &&
            <div className='editdiv' >
                <div className="edit-box">
                    <div id='edit-content'>
                        <h1>Edit</h1>
                        <CloseIcon 
                            color="black" 
                            fontSize="large" 
                            className='close-icon'
                            onClick={()=> setIsEdit(false)} 
                        />
                    </div>
                    <form  id='edit-form' onSubmit={handleSubmit}>
                        <input 
                            type="text" 
                            id='edit-title'
                            placeholder='Title' 
                            name='title'
                            ref={myInputRef}
                            value={currentTask.title}
                            onChange={handleChange}                    
                        />
                        <textarea 
                            name="description" 
                            id="edit-discrip" 
                            value={currentTask.description}
                            placeholder='Description'
                            maxLength={100}
                            onChange={handleChange}
                        />
                        <button>Edit</button>
                    </form>
                </div>
            </div>
        }
    </>

  )
}

export default Tasks