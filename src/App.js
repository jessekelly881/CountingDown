import React, {useState} from "react";
import { BrowserRouter as Router, Route, Link, Radio, Checkbox } from "react-router-dom";
import 'antd/dist/antd.css';
import "./App.scss"

import {DatePicker, TimePicker, Button, Form} from 'antd';

function CreateCounterForm() {

    return (
        <Form className="create-counter-form">
          <h2>Create Counter</h2>

          <Form.Item label="Day">
            <DatePicker />
          </Form.Item>

          <Form.Item label="Time">
            <TimePicker />
          </Form.Item>

          <Form.Item>
            <Button type="primary">
              Create Timer
            </Button>
          </Form.Item>
        </Form>
    )
}

function IndexPage() {
    return (
      <>
        <CreateCounterForm />
      </>
    )
}

function Counter(props){
    const [dt, setTimeDiff] = useState(props.startTime - new Date().getTime())

    const timer = setInterval( () => {
      setTimeDiff(props.startTime - new Date().getTime())
    }, 1000)

    return (
      <p id="timer">

        <div className="timer-part" id="timer-days">
          <div className="timer-val">{Math.floor(dt / (1000 * 60 * 60 * 24))}</div>
          <small className="timer-label">Days</small>
        </div>

        <div className="timer-part" id="timer-hours">
          <div className="timer-val">{Math.floor((dt % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))}</div>
          <small className="timer-label">Hours</small>
        </div>

        <div className="timer-part" id="timer-mins">
          <div className="timer-val">{Math.floor((dt % (1000 * 60 * 60)) / (1000 * 60))}</div>
          <small className="timer-label">Minutes</small>
        </div>

        <div className="timer-part" id="timer-secs">
          <div className="timer-val">{Math.floor((dt % (1000 * 60)) / 1000)}</div>
          <small className="timer-label">Seconds</small>
        </div>

      </p>
    )
}

function CounterPage() {
    return (
        <Counter startTime={new Date("Sep 9, 2019 12:00:00").getTime()}/>
  )
}

export default () => (
  <Router>
    <Route path="/" exact component={IndexPage} />
    <Route path="/:userId" component={CounterPage} />
  </Router>
);
