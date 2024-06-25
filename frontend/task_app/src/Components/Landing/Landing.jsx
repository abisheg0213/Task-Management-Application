import React, { useEffect } from "react";
import {useForm} from "react-hook-form";
import Axios from "axios";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Header from "../header/Header";
import Fotter from "../Footer/Fotter";
import { format, parseISO } from 'date-fns';
export default function Landing(){
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
        <input type="Text" {...register('name',{required:true})}></input><br/><br/>
        {errors.name && errors.name.type==="required" && <p>Title cannot be empty</p>}
        <label>Task Description:</label><textarea {...register('desc',{required:true})}></textarea><br/><br/>
        {errors.desc && errors.desc.type==="required" && <p>Task cannot be without description</p>}
        <label>Due Date</label><input type="date" {...register('date',{validate:(data)=>{
            const d=new Date()
            const d1=new Date(data)
        console.log(d1>d)
            return d1>d || d==d1
        }})}></input><br/><br/>
        {errors.date && errors.date.type==="validate" && <p>Due date for the task must be in Future</p>}
        <label>Priority</label><select {...register('priority')}><option>Priority 1</option><option>Priority 2</option><option>Priority 3</option></select>
        <br/><br/><input type="submit"></input>
        </form>
        <center>
        {priority_1.map((data)=>{
            return <li>{data.task_name} - {data.task_desc} - {format(parseISO((data.task_due_date).toString()),'dd/MM/yyyy')} -{data.task_priority} </li>
        })}
        <hr/>
        {priority_2.map((data)=>{
            return <li>{data.task_name} - {data.task_desc} - {format(parseISO((data.task_due_date).toString()),'dd/MM/yyyy')} -{data.task_priority} </li>
        })}
        <hr/>
        {priority_3.map((data)=>{
            return  <li>{data.task_name} - {data.task_desc} - {format(parseISO((data.task_due_date).toString()),'dd/MM/yyyy')} -{data.task_priority} </li>
        })}
        </center>

    </div>
}