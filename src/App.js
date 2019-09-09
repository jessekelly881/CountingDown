import React, {useState} from "react";
import { BrowserRouter as Router, Route, Link} from "react-router-dom";

import { DatePicker, TimePicker, Button, Input} from 'antd';
const { TextArea } = Input;

import 'antd/dist/antd.css';

import "./App.scss"

function CreateCounterForm() {

    return (
        <>
        <Input placeholder="Countdown Name" />
        <TextArea rows={4} placeholder="Description" />
        <DatePicker /> <TimePicker /> <br />

        <Button block>Create Timer</Button> <br />
        </>
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
      const currentTime = new Date().getTime();
      const diff = props.startTime - currentTime;

      if(diff > 0){
        setTimeDiff(diff)
      }

      else{
        setTimeDiff(0)
      }

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
