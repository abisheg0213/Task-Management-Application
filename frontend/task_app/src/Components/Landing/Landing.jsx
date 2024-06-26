import React, { useEffect } from "react";
import {useForm} from "react-hook-form";
import Axios from "axios";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Header from "../header/Header";
import Fotter from "../Footer/Fotter";
import { format, parseISO } from 'date-fns';
import {useNavigate} from "react-router-dom"
import "./landing.css"
export default function Landing(){
    const navi=useNavigate()
    const [priority_1,set_priority_1_items]=React.useState([])
    const [submit_count,set_submit_count]=React.useState(0)
    const [priority_2,set_priority_2_items]=React.useState([])
    const [priority_3,set_priority_3_items]=React.useState([])
    const {register,handleSubmit,formState:{errors}}=useForm()
    const recv_data=()=>{
        console.log("called")
        Axios.get('http://localhost:5000/retrive_all_tasks').then((res)=>{
            set_priority_1_items(res.data.filter((data)=>{
                return data.task_priority=="Priority 1"
            }))
            set_priority_2_items(res.data.filter((data)=>{
                return data.task_priority=="Priority 2"
            }))
            set_priority_3_items(res.data.filter((data)=>{
                return data.task_priority=="Priority 3"
            }))
        })
    }

    useEffect(()=>{
       recv_data()
    },[submit_count])
    
    return <div>
        <Header/>
        <form onSubmit={handleSubmit((data)=>{
            console.log(data)
            Axios.post('http://localhost:5000/add_new_task',data)
            set_submit_count(submit_count+1)
        })}>
        <label>Task Name:</label>
        <input type="Text" {...register('name',{required:true})}></input>
        {errors.name && errors.name.type==="required" && <p className="alert"><strong>Task cannot be without task title</strong></p>}
        <label>Task Description:</label><textarea {...register('desc',{required:true})}></textarea>
        {errors.desc && errors.desc.type==="required" && <p className="alert"><strong>Task cannot be without description</strong></p>}
        <label>Due Date</label><input type="date" {...register('date',{validate:(data)=>{
            const d=new Date()
            const d1=new Date(data)
        console.log(d1>d)
            return d1>d 
        }})}></input>
        {errors.date && errors.date.type==="validate" && <p className="alert"><strong>Due date for the task must be in Future</strong></p>}<br/>
        <label>Priority : </label>{"  "}<select {...register('priority')}><option>Priority 1</option><option>Priority 2</option><option>Priority 3</option></select>
        <br/><br/><input type="submit"></input>
        </form>
        <center>
        {priority_1.map((data)=>{
            return <div className="task1">
            <h1>Task - {data.task_name}</h1><hr/>
            <p><strong>Due - {format(parseISO((data.task_due_date).toString()),'dd/MM/yyyy')}</strong></p>
            <button onClick={(e)=>
                {
                    e.preventDefault()
                    navi('/task/'+data.task_id)
                }
            }>View</button> 
            <button  onClick={(e)=>{
                    e.preventDefault()
                    Axios.patch('http://localhost:5000/complete_task/'+data.task_id)
                    set_submit_count(submit_count+1)
                }}>Complete</button> 
            <button onClick={(e)=>{
                    e.preventDefault()
                    Axios.delete('http://localhost:5000/delete_task/'+data.task_id)
                    set_submit_count(submit_count+1)
                }}>Delete</button>         </div>
        })}

        {priority_2.map((data)=>{
            return <div className="task2">
            <h1>Task - {data.task_name}</h1><hr/>
            <p><strong>Due - {format(parseISO((data.task_due_date).toString()),'dd/MM/yyyy')}</strong></p>
            <button onClick={(e)=>
                {
                    e.preventDefault()
                    navi('/task/'+data.task_id)
                }
            }>View</button> 
            <button  onClick={(e)=>{
                    e.preventDefault()
                    Axios.patch('http://localhost:5000/complete_task/'+data.task_id)
                    set_submit_count(submit_count+1)
                }}>Complete</button> 
            <button onClick={(e)=>{
                    e.preventDefault()
                    Axios.delete('http://localhost:5000/delete_task/'+data.task_id)
                    set_submit_count(submit_count+1)
                }}>Delete</button>         </div>
        })}

        {priority_3.map((data)=>{
            return  <div className="task">
                <h1>Task - {data.task_name}</h1><hr/>
                <p><strong>Due - {(data.task_due_date).toString().slice(0,10)}</strong></p>
                <button onClick={(e)=>
                {
                    e.preventDefault()
                    navi('/task/'+data.task_id)
                }
            }>View</button> 
                <button onClick={(e)=>{
                    e.preventDefault()
                    Axios.patch('http://localhost:5000/complete_task/'+data.task_id)
                    set_submit_count(submit_count+1)
                }}>Complete</button> 
                <button  onClick={(e)=>{
                    e.preventDefault()
                    Axios.delete('http://localhost:5000/delete_task/'+data.task_id)
                    set_submit_count(submit_count+1)
                }}>Delete</button>         </div>
        })}
        </center>

    </div>
}