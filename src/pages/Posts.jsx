import React,{ useEffect, useState } from 'react'
import { Button, Container, Table, Modal } from 'react-bootstrap'
import axios from 'axios';
import { CreatePost } from '../components/CreatePost';

export const Posts = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    axios.get('http://staging.iakta.net:8000/api/posts', {
      headers: { "Authorization" : `Bearer ${localStorage.getItem('authToken')}` }
    })
    .then(response => {
      console.log(response.data)
      setData(response.data);
    })
    .catch(error => {
      console.log(error.message);
    });
  }, []);

  const getDetails = (postId) => {
    axios.get(`http://staging.iakta.net:8000/api/postDetail/${postId}`, {
      headers: { "Authorization" : `Bearer ${localStorage.getItem('authToken')}` }
    })
    .then(response => {
      console.log(response.data)
      setSelectedPost(response.data);
      setShowModal(true);
    })
    .catch(error => {
      console.log(error.message);
    });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <Container>
      <h2 className="my-3 text-center display-3">Posts</h2>
      <CreatePost />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Message</th>  
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {data.map(post => (
            <tr key={post.id}>
              <td>
                {new Date(post.date).toLocaleDateString("en-GB")}, {new Date(post.date).toLocaleTimeString("en-GB")} 
              </td>
              <td>{post.message}</td>
              <td>
                <Button variant="outline-info" className="btn-sm mx-1" onClick={() => getDetails(post.id)}>
                  Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {selectedPost && (
        <Modal show={showModal} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Post Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Date: {new Date(selectedPost[0].date).toLocaleString("en-GB")}</p>
            <p>{selectedPost[0].message}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  )
};
