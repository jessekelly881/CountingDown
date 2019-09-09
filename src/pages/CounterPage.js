import React, {useState} from "react";
import { Spin } from 'antd';
import { Link } from "react-router-dom";

function calcDiff(timeA, timeB){

      const diff = timeA - timeB;

      if(diff > 0){
          return diff;
      }

      else{
          return 0;
      }
}

function Counter(props){
    const [dt, setTimeDiff] = useState(calcDiff(props.time, new Date().getTime()))

    const timer = setInterval( () => {
      const currentTime = new Date().getTime();
      setTimeDiff(calcDiff(props.time, currentTime))

    }, 1000)

    return (
      <div id="timer">

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

      </div>
    )
}

const CounterFooter = () => (
    <p className="counter-footer">Created using Counting Down. Create your own timer <Link to="/">here</Link></p>
)

const CounterPage = (props) => {
    const { id } = props.match.params;
    const db = props.db;

    const [data, setData] = useState({loading: true});

    db.collection('counters').doc(id).get().then( (doc) => {
        const d = doc.data()
        setData(d);
    })

    if(! data.loading){
        return (
                <>
                  <div className="timer-header">
                    <h2 className="timer-name">{data.name}</h2>
                    <p className="timer-description">{data.description}</p>
                  </div>

                  <Counter time={data.timestamp.toDate().getTime()}/>
                  <CounterFooter />
                </>
        )
    }

    else{
        return (
          <>
           <Spin tip="Fetching Timer..."/>
           <CounterFooter />
          </>
        )
    }
}

export {CounterPage};
