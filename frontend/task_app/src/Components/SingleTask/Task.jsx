import React from "react";
import {useParams} from "react-router-dom"
import Header from "../header/Header";
import "./task.css"
export default function Task(){
    const {id}=useParams()
return <div>
    <Header/>
    <div className="task_box">

    </div>
</div>
}