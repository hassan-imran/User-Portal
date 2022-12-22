import React from "react";
import { Button, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import { removeEmployee } from "../store/employeeList";
import { updateAuth } from "../store/auth";

function Dashboard() {

    const auth = useSelector((state) => state.auth.value);
    const employeeList = useSelector((state) => state.employees.value);
    const dispatch = useDispatch();

    // const deleteHandler = (user) = {}

    return (
        <>
            <Container>
                <Row>
                    <h1 className='display-2 mt-5'>Welcome {auth.firstName} {auth.lastName}!</h1>
                    <hr />
                    <h4 className='display-6 mt-5'>Your Username is "{auth.userName}"*</h4>
                    <p>*Without the quotes</p>
                </Row>

                <Card className='p-4 shadow bg-body rounded'>
                    <h5 className='display-5 mb-3'>User Database</h5>
                    <Table striped bordered hover>
                        <thead>
                            <tr className="text-center">
                                <th>UserName</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                // A map function to return the rows of the table
                                employeeList.map((user, key) => (
                                    <tr key={key}>
                                        <td>
                                            {user.userName}
                                        </td>
                                        <td>
                                            {user.firstName}
                                        </td>
                                        <td>
                                            {user.lastName}
                                        </td>
                                        <td>
                                            <Button variant="danger" id={key} onClick={(key) => {
                                                dispatch(removeEmployee(user.userName));
                                                // if (user.userName == auth.userName) {
                                                //     dispatch(updateAuth(false));
                                                // }
                                            }}>
                                                Delete User
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </Card>

            </Container>
        </>
    )
}

export default Dashboard;