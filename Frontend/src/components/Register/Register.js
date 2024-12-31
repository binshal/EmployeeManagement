import React, { useState } from 'react'

function Register() {
    const [data,setData] = useState({
        contact :'+91',
        email : '@gmail.com',
    })

    const Handleinput = (e)=>{
        const {name, value} = e.target;
        setData({
            ...data,
            [name] : value,
        })
    }

    const Submiting = (e)=>{
        e.preventDefault()
        console.log("Submited Data :", data)
    }
    
  return (
    <>
    <h2>Register Form</h2>

    <form onSubmit={Submiting} action="">
        <label htmlFor="">Enter Your Name </label>
        <input type="text" name='username' value={data.username} onChange={Handleinput} />
        <br />
        <label htmlFor="">Enter Your Age </label>
        <input type="number" name='age' value={data.age} onChange={Handleinput} />
        <br />
        <label htmlFor="">Enter Your Email </label>
        <input type="mail" name='email' value={data.email} onChange={Handleinput} />
        <br />
        <label htmlFor="">Enter Your Contact No. </label>
        <input type="text" name='contact' value={data.contact} onChange={Handleinput} />
        <br />
        <label htmlFor="">Select Your Language </label>
        <select onChange={Handleinput} name="Language" value={data.language} id="">
            <option value={"Malayalam"}>Malayalam</option>
            <option value={"English"}>English</option>
            <option value={"Hindi"}>Hindi</option>
            </select>
        <br />
        <button type='submit'>Submit</button>
    </form>
   
      
    </>
  )
}

export default Register
