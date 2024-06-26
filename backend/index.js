const express=require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const cors=require('cors')
mongoose.connect('mongodb://localhost:27017/Task_Managment')
app=express()
app.use(bodyParser.json())
app.use(cors())
app.listen(5000)
app.get('/',function(req,res){
    task_model.find({}).then((data)=>{
        res.send(data)
    })
})
task_schema=mongoose.Schema({
    task_id:{
        type:Number,
        required:true,
        unique:true
    },
    task_name:{
        type:String,
        required:true
    },
    task_desc:{
        type:String,
        required:true
    },
    task_due_date:{
        type:Date,
        required:true
    },
    task_priority:{
        type:String,
        required:true
    },
    task_status:{
        type:Boolean,
        required:true
    }
})
task_model=mongoose.model('task',task_schema)
app.get('/retrive_all_tasks',function(req,res){
    task_model.find({task_status:false}).then((data)=>{
        console.log(data)
        res.send(data)
    })
})
app.patch('/update_task/:id',function(req,res){
console.log(req.params.id)
task_model.updateOne({task_id:req.params.id},req.body).then((data)=>{
    console.log(data)
})
})
app.post('/add_new_task',function(req,res){
    ts=Date.now()
    let id_val=ts.toString().slice(-5,-1)
    data=new task_model({
        task_id:Number(id_val),
        task_name:req.body.name,
        task_desc:req.body.desc,
        task_due_date:req.body.date,
        task_priority:req.body.priority,
        task_status:false
    })
    data.save()
})
app.delete('/delete_task/:id',function(req,res){
    console.log("delete ***")
    console.log(req.params.id)
    task_model.deleteOne({task_id:Number(req.params.id)}).then((data)=>{
        console.log(data)
    })
})
app.patch('/complete_task/:id',function(req,res){
    console.log(req.params.id)
    task_model.updateOne({task_id:Number(req.params.id)},{task_status:true}).then((data)=>{
        console.log(data)
    })})
app.get('/get_task_info/:id',function(req,res){
    task_model.findOne({task_id:Number(req.params.id)}).then((data)=>{
        res.send(data)
    })
})