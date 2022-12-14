import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Login from "./routes/Login";
import { updateAuth } from "./store/auth";
import { addEmployee } from "./store/employeeList";


import ErrorPage from "./routes/ErrorPage";
import SignUp from './routes/SignUp';
import Dashboard from './routes/Dashboard';
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function App() {

  const [userName, setUserName] = useState('');
  const [pass, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const employeeList = useSelector((state) => state.employees.value);
  const auth = useSelector((state) => state.auth.value);
  const dispatch = useDispatch();

  return (
    <div className="App">

      {auth ? (<>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">User Portal</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
              <Nav>
                <NavDropdown title={`Signed in as: ${auth.userName}`} id="collasible-nav-dropdown">
                  <NavDropdown.Item onClick={() => dispatch(updateAuth(false))}>Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <br />

        <Routes>
          <Route path="/dashboard" element={
            <Dashboard />
          } />
          <Route
            path="/"
            element={<Navigate to="/dashboard" replace />}
          />
          <Route
            path="/login"
            element={<Navigate to="/dashboard" replace />}
          />
          <Route
            path="/signup"
            element={<Navigate to="/dashboard" replace />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </>) : (<>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">User Portal</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/signup">Sign up</Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        <br />

        <Routes>
          <Route path="/" element={
            <Login />
          } />
          <Route path="/login" element={
            <Login />
          } />
          <Route path="/signup" element={
            <SignUp />
          } />
          <Route
            path="/dashboard"
            element={<Navigate to="/login" replace />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </>)}

    </div>
  );
}

export default App;
