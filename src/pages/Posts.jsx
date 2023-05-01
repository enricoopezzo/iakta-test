import React,{ useEffect, useState } from 'react'
import { Button, Container, Table } from 'react-bootstrap'
import axios from 'axios';

export const Posts = () => {
    const [data, setData] = useState([]);

  useEffect(() => {

    axios.get('http://staging.iakta.net:8000/api/posts',{
    headers: {"Authorization" : `Bearer ${localStorage.getItem('authToken')}`}})
      .then(response => {
        console.log(response.data)
        setData(response.data);
        
      })
      .catch(error => {
        console.log(error.message);
      });
  }, []);
  
  return (
    <Container>
        <h2 className="my-3 text-center display-3">Posts</h2>
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>#</th>
                <th>Message</th>
                <th>Date</th>
                <th>user</th>
                </tr>
            </thead>
        <tbody>
        {data.map(post => (
            <tr key={post.id}>
            <td>{post.message}</td>
            <td>{post.date}</td>
            <td>{post.UserId}</td>

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
