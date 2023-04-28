import React from 'react'
import axios from 'axios';
import * as Yup from "yup";
import { Formik, Form, Field } from 'formik';
import { Container, Alert } from 'react-bootstrap'

const regexPassword = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/;

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Username must be atleast 2 characters long!")
    .max(20, "Username can't be longer than 20 characters!")
    .required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().matches(
    regexPassword,
    "Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
  ).required("Password is required"),
});

export const Register = () => {
    const saveUser = (obj) => {
    axios.post('http://staging.iakta.net:8000/api/register', obj).then(response => {
        console.log(response.statusText);
        // navigate("/posts");
    });
  }
  
  return (
    <>
      <Container style={{ width: "600px" }}>
        <h2 className="my-3 text-center display-3">Register</h2>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            saveUser(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Field
                name="username"
                className="form-control mb-3"
                placeholder="Username..."
              />
              {errors.username && touched.username ? (
                <Alert variant={"danger"}> {errors.username} </Alert>
              ) : null}
              <Field
                name="email"
                type="email"
                className="form-control mb-3"
                placeholder="Email..."
              />
              {errors.email && touched.email ? (
                <Alert variant={"danger"}> {errors.email} </Alert>
              ) : null}
              <Field
                name="password"
                type="password"
                className="form-control mb-3"
                placeholder="Password..."
              />
              {errors.password && touched.password ? (
                <Alert variant={"danger"}> {errors.password} </Alert>
              ) : null}

              <button type="submit" className="form-control mb-3 btn btn-dark">
                Register
              </button>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  )
}
