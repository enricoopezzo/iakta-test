import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';



export const CreatePost = () => {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post('http://staging.iakta.net:8000/api/postMessage',
        { message: value },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
    setValue("");
  }

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup className='mb-3'>
        <Form.Control placeholder="Create new post" onChange={(e)=> setValue(e.target.value)} value={value} required/>
        <Button variant="outline-secondary" id="button-addon2" type="submit">
          Post
        </Button>
      </InputGroup>
    </Form>
  )
}
