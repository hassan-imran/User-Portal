import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addEmployee } from "./store/employeeList";

function App() {

  const [userName, setUserName] = useState('');
  const employeeList = useSelector((state) => state.employees.value);
  const dispatch = useDispatch();

  useEffect(()=>{
    console.log(employeeList);
  },[employeeList])

  return (
    <div className="App">
      <input type='text' value={userName} onChange={(e) => setUserName(e.target.value)} />
      <button onClick={() => dispatch(addEmployee({ userName }))}>Add employee</button>
    </div>
  );
}

export default App;
