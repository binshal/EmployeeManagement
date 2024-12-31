import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

function Create() {
    const [formData,setFormData] = useState({})

    const handleInput = (e)=>{
        const {name,value} = e.target;
        setFormData({
            ...formData,
            [name]:value,
        })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()

        try{
            const response = await axios.post('http://127.0.0.1:8000/api/employees/',formData,
                {methodc: 'POST',
                    headers:{
                        'Content-Type' : 'application/json',
                    }
                }
            )
            if(response.status == 201){
                toast.success("Emplyee Added Succesfully",{
                position : toast.POSITION.TOP_CENTER,
                theme:'colored'
            }
                )}


        }catch(error){
            console.log("Error occured")
        }
    }
  return (
    <>

    <div className="container shadow" onSubmit={handleSubmit} style={{width: '30%',marginBottom:50}}>
        <form action="">
        <h4 className='p-3'>Create Employee!</h4>
        <div className="form-group p-3">
            <label htmlFor="">Employee Name</label>
            <input type="text" name='name' className='form-control' onChange={handleInput}/>
        </div>
        <div className="form-group p-3">
            <label htmlFor="">Employee Email</label>
            <input type="mail" name='email' className='form-control'  onChange={handleInput}/>
        </div>
        <div className="form-group p-3">
            <label htmlFor="">Employee Department</label>
            <input type="text" name='department' className='form-control'  onChange={handleInput} />
        </div>
        <button type='submit' className='btn btn-primary' style={{marginBottom:20}}>Add Employee</button>
        </form>
    </div>
      
    </>
  )
}

export default Create
