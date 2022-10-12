import React, { useState, useEffect } from "react";
import './App.css'

const getLocalItems = () => {
  let tasks = localStorage.getItem('Tasks List')
  if (tasks) {
    return JSON.parse(tasks)
  }
  else {
    return [];
  }
}

function App() {
  const [text, setText] = useState('');
  const [task, setTask] = useState(getLocalItems());

  const changeTextHandler = (e) => {
    setText(e.target.value)
  }

  const formSubmitted = (e) => {
    e.preventDefault();
    text ? setTask([...task, text]) : alert('Please Add Your Todo')
    setText('')
  }

  const removeTask = (a) => {
    const finalData = task.filter((curEle, index) => {
      return index !== a;
    })
    setTask(finalData)
  }

  useEffect(() => {
    localStorage.setItem('Tasks List', JSON.stringify(task))
  }, [task])

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center main-row">
        <div className="col shadow main-col bg-white">
          <div className="row bg-dark text-white">
            <div className="col p-2">
              <h4 className='text-center'>Todo App Using React JS</h4>
            </div>
          </div>

          <form onSubmit={formSubmitted}>
            <div className="row justify-content-between text-white p-2">
              <div className="form-group flex-fill mb-2 col-9">

                <input id="todo-input" placeholder="Please enter what you want to-do" type="text" className="form-control"
                  value={text} onChange={changeTextHandler} />

              </div>
              <button type="submit" className="btn btn-dark mb-2 ml-2 col-3">Add todo</button>
            </div>
          </form>

          <div className="container">
            <div className="row">
              {
                task.map((val, ind) => {
                  return (
                    <>
                      <div className="col-6 my-2 my-auto" key={ind}>{val}</div>
                      <div className="col-6 my-2 text-end">
                        <button type="button" onClick={() => removeTask(ind)} className="btn btn-danger">
                          Delete
                        </button>
                      </div>
                      <hr />
                    </>
                  )
                })
              }
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
