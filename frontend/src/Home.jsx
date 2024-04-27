import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Home() {
  const [data, setData] = useState([])
  useEffect(() => {
    axios.get('http://localhost:8081/')
      .then(res => setData(res.data))
      .catch(err => console.log(err))
  }, [])

  const handelDelete = (id) => {
    axios.delete('http://localhost:8081/delete/' + id)
      .then(res => { window.location.reload() })
      .catch(err => console.log(err))
  }
  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className='w-50 bg-white rounded p-3'>
        <div className='d-flex justify-content-end'>
          <Link to="/create" className="btn btn-success">Create +</Link>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((student, index) => {
                return <tr key={index}>
                  <td>{student.id}</td>
                  <td>{student.Name}</td>
                  <td>{student.Email}</td>
                  <td>{student.Mobile}</td>
                  <td>
                    <Link to={`/read/${student.id}`} type="button" class="btn btn-primary">Read</Link>
                    <Link to={`/edit/${student.id}`} type="button" class="btn btn-success">Edit</Link>
                    <button onClick={() => handelDelete(student.id)} type="button" class="btn btn-danger">Delete</button>
                  </td>
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home