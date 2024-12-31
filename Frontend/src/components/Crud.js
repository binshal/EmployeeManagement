import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Crud() {
    const [data,setData] = useState([])
    const [update,setUpdate] = useState([])

    useEffect(()=>{
        axios
        .get('http://127.0.0.1:8000/api/employees/')
        .then((response)=>{
            setData(response.data)
        })
        .catch((error)=>{
            console.log("Error happened")
        })
    },[data])


    // Update
    const updateDetail = (id)=>{
        console.log("Employee id",id)
        fetch(`http://127.0.0.1:8000/api/employees/${id}/`)
        .then(response=>response.json())
        .then(res=>setUpdate(res))
    }
    const HandleInputChange = (event,fieldName)=>{

        const value = event.target.value;
        setUpdate((prevUpdate)=>({
            ...prevUpdate,
            [fieldName] : value,
        }))

    }

    const handleSUbmit = async(e,id)=>{
        e.preventDefault();
        const requestData = {
            id : update.id,
            name : update.name,
            email : update.email,
            department : update.department,
        };
        const response = await axios.put(`http://127.0.0.1:8000/api/employees/${id}/`,requestData,{
            headers : {
                'Content-Type':'application/json'
            },
        });

        toast.success("Employee Updated Successfully",{
            position : toast.POSITION.TOP_CENTER,
            theme : 'colored'
        })


    }
    const handleDelete = (id)=>{
        fetch(`http://127.0.0.1:8000/api/employees/${id}/`,
            {method: 'DELETE'})
            .then(()=>{
                console.log("Employee Deleted")
            });

            toast.error("Employee Deleted Successfully",{
                position : toast.POSITION.TOP_CENTER,
                theme : 'colored'
            })   
    }


    const[currentPage,setCurrentPage] = useState(1)
    const [searchItem,setSearchItem] = useState('')

    const filterData = data.filter((item)=>
        item.name.toLowerCase().includes(searchItem.toLowerCase())
    )

    const recordPerPage = 3
    const LastIndex = currentPage * recordPerPage;
    const firstIndex = LastIndex - recordPerPage;

    // if you want full list in the page change filter data to data

    const records = filterData.slice(firstIndex,LastIndex);
    const npage = Math.ceil(data.length / recordPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1)

    function prevPage(){
        if(currentPage !== firstIndex){
            setCurrentPage(currentPage -1)
        }
    }
    function nextPage(){
        if(currentPage !== LastIndex){
            setCurrentPage(currentPage +1)
        }
    }
    function changePage(id){
        setCurrentPage(id)
    }

  return (
    <>
      <div className="container-lg p-5 shadow mb-5">
        <div className="row">
            <input type="text" className='form-control' placeholder='Search Here' style={{width:200}} value={searchItem}
                onChange={(e)=>{
                    setSearchItem(e.target.value)
                    setCurrentPage(1)
                }}
            />
        </div>
        <table class="table">
            <thead>
                <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Department</th>
                <th scope="col">Operations</th>
                </tr>
            </thead>
            <tbody>
                {
                    records.map((item)=>(

                    <tr key={item.id}>
                        <th scope="row">{item.id}</th>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.department}</td>
                        <td>
                            <button className='btn btn-success' onClick={()=>{updateDetail(item.id)}} data-bs-toggle="modal" data-bs-target="#exampleModal">Update</button> &nbsp;
                            <button className='btn btn-danger' onClick={()=>{updateDetail(item.id)}} data-bs-toggle="modal" data-bs-target="#exampleModals">Delete</button>
                        </td>
                    </tr>

                    ))
                }
                
               
            </tbody>
        </table>
        <nav aria-label="...">
  <ul className="pagination">
    <li className="page-item ">
      <button onClick={prevPage} className="page-link">Previous</button>
    </li>

    {
        numbers.map((n,i)=>(
            <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}><a className="page-link" href="#" onClick={()=>changePage(n)}>{n}</a></li>
        ))
    }
    
    
    <li class="page-item">
      <button onClick={nextPage} className="page-link" href="#">Next</button>
    </li>
  </ul>
</nav>

        </div>

       



            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Update Modal</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    {update.id} {update.name}

                <div className="container p-3">
                    <form action="" onSubmit={(e)=>handleSUbmit(e,update.id)}>
                        <div className="form-group">
                            <label htmlFor="">Name :</label>
                            <input type="text" className='form-control' value={update.name} onChange={(event)=>HandleInputChange(event,'name')} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Email :</label>
                            <input type="mail" className='form-control' value={update.email} onChange={(event)=>HandleInputChange(event,'email')} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Department :</label>
                            <input type="text" className='form-control' value={update.department} onChange={(event)=>HandleInputChange(event,'department')} />
                        </div>
                        <button type="submit" class="btn btn-primary m-3" data-bs-dismiss="modal">Update</button>
                    </form>
                </div>

                </div>


                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    
                </div>
                </div>
            </div>
            </div>

            <div class="modal fade" id="exampleModals" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Confirmation</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Do you want to delete <b>{update.name}</b>?
                </div>
                <div class="modal-footer">
                    <button type="button" onClick={()=>{handleDelete(update.id)}} class="btn btn-danger" data-bs-dismiss="modal">Delete</button>
                </div>
                </div>
            </div>
            </div>

    </>
  )
}

export default Crud
