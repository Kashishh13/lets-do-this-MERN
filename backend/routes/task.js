const router = require('express').Router();
const Task=require("../models/task.js")
const User=require("../models/user.js");
const { authToken } = require('./auth.js');
router.post("/create-task",authToken, async(req,res)=>{
    try{
        const {title,desc}=req.body;
        const{id}=req.headers;
        const newTask=new Task({title:title,desc:desc})
        const saveTask=await newTask.save();
        const taskId=saveTask._id;
        await User.findByIdAndUpdate(id,{$push:{tasks:taskId._id}})
        res.status(200).json({message:"Task Created"})


    }catch(error){
        console.error("Error:", error.message); // Print detailed error message
        res.status(500).json({ message: "Internal Server Error" });
    }
})

router.get("/get-all-tasks",authToken,async(req,res)=>{
    try{
        const{id}=req.headers;
       const userData= await User.findById(id).populate({path:"tasks",options:{sort:{createdAt:-1}}});
       res.status(200).json({data:userData})

    }
    catch(error){
        console.error("Error:", error.message); // Print detailed error message
        res.status(500).json({ message: "Internal Server Error" });
    }
})



router.delete("/delete-task/:id", authToken, async (req, res) => {
    try {
      const { id } = req.params;
      console.log("Deleting task with ID:", id);
  
      await Task.findByIdAndDelete(id);
      const userId = req.headers.id;
      console.log("Removing task from user:", userId);
  
      await User.findByIdAndUpdate(userId, { $pull: { tasks: id } });
  
      res.status(200).json({ message: "Task deleted" });
    } catch (error) {
      console.error("Error in delete route:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  

  
router.put("/update-important-task/:id",authToken,async(req,res)=>{
    try{
        const{id}=req.params;
        const TaskData=await Task.findById(id);
        const ImpTask=TaskData.important;
        await Task.findByIdAndUpdate(id,{important:!ImpTask})
       res.status(200).json({message:"task updated"})


    }
    catch(error){
        console.error("Error:", error.message); // Print detailed error message
        res.status(500).json({ message: "Internal Server Error" });
    }
})

router.put("/update-complete-task/:id",authToken,async(req,res)=>{
    try{
        const{id}=req.params;
        const TaskData=await Task.findById(id);
        const completeTask=TaskData.complete;
        await Task.findByIdAndUpdate(id,{complete:!completeTask})
       res.status(200).json({message:"task updated"})


    }
    catch(error){
        console.error("Error:", error.message); // Print detailed error message
        res.status(500).json({ message: "Internal Server Error" });
    }
})

router.get("/get-important-tasks",authToken,async(req,res)=>{
    try{
        const{id}=req.headers;
       const Data= await User.findById(id).populate({path:"tasks",match:{important:true},options:{sort:{createdAt:-1}}});
       const ImportantTaskData=Data.tasks;
       res.status(200).json({data:ImportantTaskData})

    }
    catch(error){
        console.error("Error:", error.message); // Print detailed error message
        res.status(500).json({ message: "Internal Server Error" });
    }
})

router.get("/get-complete-tasks",authToken,async(req,res)=>{
    try{
        const{id}=req.headers;
       const Data= await User.findById(id).populate({path:"tasks",match:{complete:true},options:{sort:{createdAt:-1}}});
       const CompleteTaskData=Data.tasks;
       res.status(200).json({data:CompleteTaskData})

    }
    catch(error){
        console.error("Error:", error.message); // Print detailed error message
        res.status(500).json({ message: "Internal Server Error" });
    }
})

router.get("/get-incomplete-tasks",authToken,async(req,res)=>{
    try{
        const{id}=req.headers;
       const Data= await User.findById(id).populate({path:"tasks",match:{complete:false},options:{sort:{createdAt:-1}}});
       const inCompleteTaskData=Data.tasks;
       res.status(200).json({data:inCompleteTaskData})

    }
    catch(error){
        console.error("Error:", error.message); // Print detailed error message
        res.status(500).json({ message: "Internal Server Error" });
    }
})

module.exports=router;
