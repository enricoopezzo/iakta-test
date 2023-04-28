import React from 'react'
import { Button, Container, Table } from 'react-bootstrap'
import axios from 'axios';



export const UserList = () => {

  
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
        {/* {userlist.map(user => (
            <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.username}</td>

            <td className="text-center">
                {user.id === userLog.user.id ? (
                    <>
                    <Button variant="outline-secondary" className='btn-sm mx-1' onClick={() => navigate('/users/'+ele.id+'/posts')}><ListCheck /></Button>
                    </>
         ) : ''}
            </td>
            </tr>
        ))} */}
            
        </tbody>
        </Table>
    </Container>

  )
}
