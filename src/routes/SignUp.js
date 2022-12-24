import { Card, Container, InputGroup, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import ErrorFlag from '.././ErrorFlag';
import { useDispatch, useSelector } from 'react-redux';
import { updateColor, updateError } from '../store/error';
import { addEmployee } from '../store/employeeList';
import { useNavigate, Link } from 'react-router-dom';

function SignUp() {
    const [userName, setUserName] = useState('');
    const [pass, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const employeeList = useSelector((state) => state.employees.value);
    const dispatch = useDispatch();

    const navigate = useNavigate();


    const handleSubmit = (e) => {
        //Prevent the browser from implementing the default behavior of the event
        e.preventDefault();

        //Do not submit if either of the input fields are empty
        if (!userName || !pass || !firstName || !lastName) {
            dispatch(updateError({
                msg:'One (or more) of the required fields (marked by *) are empty',
                color:'danger',
            }));
            return;
        };

        let checkUnique = true;

        //a loop to check if the entered email is a duplicate

        employeeList.forEach((x) => {
            if (x.userName.toLowerCase() === userName.toLowerCase()) {
                checkUnique = false;
                return;
            }
        })

        // if checkUnique is true, publish changes to the state i.e. add the user

        if (checkUnique) {
            dispatch(addEmployee({ userName, pass, firstName, lastName }));
            navigate("/login");
            dispatch(updateError({
                msg: 'Successfully added user, please login.',
                color: 'success',
            }));
            return;
        }
        dispatch(updateError({
            msg: 'Username already exists',
            color: 'danger',
        }));

        //Reset the input fields
        setUserName('');
        setPassword('');
        setFirstName('');
        setLastName('');
        return;
    }

    return (
        <>

            <Container>
                <Row>
                    <h2 className='display-3 mt-5'>Become a Member of the User Portal community in no time!</h2>
                </Row>
            </Container>

            <Form>

                <Container className='mt-5 mb-5'>
                    <Row xs={2}>
                        <Card className='p-4 shadow bg-body rounded'>
                            <Form className='d-grid'>

                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="inputGroup-sizing-default">First Name *</InputGroup.Text>
                                    <Form.Control aria-label="Default" aria-describedby="inputGroup-sizing-default" onChange={e => setFirstName(e.target.value)} />
                                </InputGroup>

                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="inputGroup-sizing-default">Last Name *</InputGroup.Text>
                                    <Form.Control aria-label="Default" aria-describedby="inputGroup-sizing-default" onChange={e => setLastName(e.target.value)} />
                                </InputGroup>

                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="inputGroup-sizing-default">UserName *</InputGroup.Text>
                                    <Form.Control aria-label="Default" aria-describedby="inputGroup-sizing-default" onChange={e => setUserName(e.target.value)} />
                                </InputGroup>

                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="inputGroup-sizing-default">Password *</InputGroup.Text>
                                    <Form.Control aria-label="Default" aria-describedby="inputGroup-sizing-default" type='password' onChange={e => setPassword(e.target.value)} />
                                </InputGroup>

                                <ErrorFlag />

                                <Button variant="primary" href="/signup" onClick={handleSubmit} >
                                    Let's Go!
                                </Button>

                                <hr />

                                <p className='text-center'>Already an existing User Portal member?</p>

                                <Link to={"/login"} className="d-grid">
                                    <Button variant="secondary">
                                    Log in to your account
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

export default SignUp;