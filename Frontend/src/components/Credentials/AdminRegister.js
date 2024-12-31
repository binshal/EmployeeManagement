import React from 'react'

function AdminRegister() {
  return (
    <>
      <h2>Admin Registration</h2>

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

export default AdminRegister
