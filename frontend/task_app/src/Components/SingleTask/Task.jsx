import React, { useEffect } from "react";
import {useParams,useNavigate} from "react-router-dom"
import Header from "../header/Header";
import axios from "axios";
import {useForm} from "react-hook-form"
import { format, parseISO } from 'date-fns';
import "./task.css"
export default function Task(){
    const navi=useNavigate()
    const {id}=useParams()
    const [edit,set_edit]=React.useState(false)
    const [ch,set_ch]=React.useState(0)
    const [task_data,setdata]=React.useState({'task_id':"",'task_name':"",'task_desc':"GHJK",'task_due_date':"",'task_priority':""})
    function rec_data(){
        axios.get('http://localhost:5000/get_task_info/'+id).then((res)=>{
            setdata(res.data)
            setValue('task_name',res.data.task_name)
            setValue('task_desc',res.data.task_desc)
            setValue('task_due_date',(format(parseISO((res.data.task_due_date).toString()),'dd/MM/yyyy')))
        })
    }
    useEffect(()=>{
       rec_data()
    },[edit,ch])
    const {register,handleSubmit,formState:{errors},setValue}=useForm()
return <div>
    <Header/>
    {edit ? 
        <form onSubmit={handleSubmit((data)=>{
            console.log(data)
            axios.patch('http://localhost:5000/update_task/'+id,data)
            set_ch(ch+1)
            set_edit(false)
            navi('/')
        })}>
            <label>Task Name:</label>
            <input type="Text"  {...register('task_name',{required:true})}></input>
            {errors.task_name && errors.task_name.type=="required" && <p className="alert"><strong>Task cannot be without task title</strong></p>}
        
            <label>Task Description:</label>
        <textarea {...register('task_desc',{required:true})}></textarea>
        {errors.task_desc && errors.task_desc.type==="required" && <p className="alert"><strong>Task cannot be without description</strong></p>}
        <br/>
        
        <p>Previous Date : {format(parseISO((task_data.task_due_date).toString()),'dd/MM/yyyy')}</p>
        <label>New Due Date : </label>
        <input type="date" {...register('task_due_date',{validate:(data)=>{
            const d=new Date()
            const d1=new Date(data)
        console.log(d1>d)
            return d1>d 
        }})}></input><br/>
        {errors.task_due_date && errors.task_due_date.type === "validate" && <p className="alert"><strong>Due date for the task must be in Future</strong></p>}
        <br/><br/><input type="submit"></input>
   </form>
    : <div className="task_box">
    <p><strong>Task Title : </strong>{task_data.task_name}</p>
    <p><strong>Task Description :</strong> {task_data.task_desc}</p>
    <p><strong>Task Due Date :</strong> {task_data.task_due_date}</p>
    <p><strong>Task Priority : </strong>{task_data.task_priority}</p>
    <center><button onClick={(e)=>{
        e.preventDefault()
        set_edit(true)
    }}>Edit Task</button></center>
    </div> }
    
</div>
}