import React,{ useEffect, useState } from 'react'
import { Button, Container, Table } from 'react-bootstrap'
import axios from 'axios';



export const UserList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {

    axios.get('http://staging.iakta.net:8000/api/listUsers',{
    headers: {"Authorization" : `Bearer ${localStorage.getItem('authToken')}`}})
      .then(response => {
        setData(response.data);
        
      })
      .catch(error => {
        console.log(error.message);
      });
  }, []);
  
  return (
    <Container>
        <h2 className="my-3 text-center display-3">UserList</h2>
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>#</th>
                <th>User Name</th>
                <th>email</th>
                <th>follow</th>
                </tr>
            </thead>
        <tbody>
        {data.map(user => (
            <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>

            <td className="text-center">
                    <>
                    <Button variant="outline-secondary" className='btn-sm mx-1'>Follow</Button>
                    </>

            </td>
            </tr>
        ))} 
            
        </tbody>
        </Table>
    </Container>

  )
}
