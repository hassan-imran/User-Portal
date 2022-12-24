import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, Table, Card, Container, Row } from 'react-bootstrap';
import { removeEmployee } from "../store/employeeList";
import { updateAuth } from "../store/auth";
import { SignUpForm } from "./SignUp";


function Dashboard() {
    const auth = useSelector((state) => state.auth.value);
    const employeeList = useSelector((state) => state.employees.value);
    const dispatch = useDispatch();
    const [modalShow, setModalShow] = useState(false);

    const deleteHandler = (user) => {
        // console.log(user.userName);
        if (auth.userName !== user) {
            dispatch(removeEmployee(user));
            return;
        }
        dispatch(removeEmployee(user));
        dispatch(updateAuth(false));
    }

    function ModalFunction(props) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Modal heading
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <SignUpForm isModal={true} />

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

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

                    {/* Modal start */}

                    <Button variant="primary" className="mt-3 mb-3" onClick={() => setModalShow(true)}>
                        Add New User
                    </Button>

                    <ModalFunction
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />

                    {/* Modal end */}

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
                                            <Button variant="danger" id={key} onClick={
                                                () => deleteHandler(user.userName)
                                            }>
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