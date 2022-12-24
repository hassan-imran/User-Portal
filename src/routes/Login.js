import { Card, Container, FloatingLabel, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import ErrorFlag from '.././ErrorFlag';
import { updateError } from '../store/error';
import auth, { updateAuth } from '../store/auth';
import { useNavigate, redirect, Link } from 'react-router-dom';


function Login() {

    //to maintain the state of the form fields
    const [userName, setUserName] = useState('');
    const [pass, setPassword] = useState('');

    const employeeList = useSelector((state) => state.employees.value);
    const auth = useSelector((state) => state.auth.value);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        //Prevent the browser from implementing the default behavior of the event
        e.preventDefault();

        //Do not submit if either of the input fields are empty
        if (!userName || !pass) {
            dispatch(updateError({
                msg: 'One (or more) of the required fields (marked by *) are empty',
                color: 'danger',
            }));
            return;
        };

        let counter = 0;

        employeeList.forEach((x) => {
            if (x.userName.toLowerCase() === userName.toLowerCase()) {
                if (x.pass === pass) {
                    dispatch(updateAuth({
                        userName,
                        firstName: employeeList[counter].firstName,
                        lastName: employeeList[counter].lastName,
                    }));
                    navigate("/dashboard");
                    console.log('logged in');
                    return;
                }
                dispatch(updateError({
                    msg: 'Password is incorrect.',
                    color: 'danger',
                }));
                return;
            }
            counter++;
        })

        if (counter === employeeList.length) {
            dispatch(updateError({
                msg: 'Username not found.',
                color: 'danger',
            }));
        }

        //Reset the input fields
        setUserName('');
        setPassword('');
    }

    return (
        <>
            <Container>
                <Row>
                    <h1 className='display-2 mt-5'>Welcome to User Portal!</h1>
                    <h3 className='display-6 mt-3'>Log in to your account to access all the features.</h3>
                </Row>
            </Container>

            <Form>

                <Container className='mt-5 mb-5'>
                    <Row xs={2}>
                        <Card className='p-4 shadow bg-body rounded'>
                            <Form className='d-grid'>

                                <FloatingLabel controlId="floatingInput" label="Username *" className="mb-3">
                                    <Form.Control type="text" placeholder="my_username" value={userName} onChange={e => setUserName(e.target.value)} />
                                </FloatingLabel>

                                <FloatingLabel controlId="floatingPassword" label="Password *" className="mb-3"  >
                                    <Form.Control type="password" placeholder="Password" value={pass} onChange={e => setPassword(e.target.value)} />
                                </FloatingLabel>

                                <ErrorFlag />

                                <Button variant="primary" onClick={handleSubmit}>
                                    Log in
                                </Button>

                                <hr />

                                <p className='text-center'>Not a User Portal member yet?</p>

                                <Link to={"/signup"} className="d-grid">
                                    <Button variant="secondary">
                                        Sign up
                                    </Button>
                                </Link>
                            </Form>
                        </Card>
                    </Row>
                </Container>

            </Form>
        </>
    )
}

export default Login;