import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import axios from 'axios';

export const UserList = () => {
  const [data, setData] = useState([]);
  const [followedUsers, setFollowedUsers] = useState([]);

  useEffect(() => {
    axios
      .get('http://staging.iakta.net:8000/api/listUsers', {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  useEffect(() => {
    axios
      .get('http://staging.iakta.net:8000/api/followedUsers', {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
      })
      .then((response) => {
        setFollowedUsers(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const isFollowed = (userId) => {
    return followedUsers.some((user) => user.id === userId);
  };

  const followUser = (id) => {
    axios
      .post('http://staging.iakta.net:8000/api/followUser',
        { id },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
        }
      )
      .then((response) => {
        console.log(response.data);
        setFollowedUsers([...followedUsers, response.data]);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const unfollowUser = (id) => {
    axios
      .delete('http://staging.iakta.net:8000/api/unFollowUser',
        { id },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
        }
      )
      .then((response) => {
        console.log(response.data);
        setFollowedUsers(followedUsers.filter((user) => user.id !== id));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

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
          {data.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td className="text-center">
                {isFollowed(user.id) ? (
                  <Button variant="outline-danger" className="btn-sm mx-1" onClick={() => unfollowUser(user.id)}>
                    Unfollow
                  </Button>
                  ) : (
                  <Button variant="outline-success" className="btn-sm mx-1" onClick={() => followUser(user.id)}>
                    Follow
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};