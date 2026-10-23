import { useState } from 'react';
import './App.css';

// Child component that receives data using props
function Student(props) {
return ( <div className="student-card"> <h2>Student Profile</h2> <p>Name: {props.name}</p> <p>Course: {props.course}</p> <p>College: {props.college}</p> </div>
);
}

// Main functional component
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <h1>React Application</h1>

      {/* Passing data using props */}
      <Student
        name="Sarthak Solanke"
        course="Computer Engineering"
        college="Sanjivani College of Engineering"
      />

      {/* Managing state using useState */}
      <div className="counter-section">
        <h2>Counter: {count}</h2>

        <div className="button-group">
          <button onClick={() => setCount(count + 1)}>
            Increase Counter
          </button>

          <button onClick={() => setCount(0)}>
            Reset Counter
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
