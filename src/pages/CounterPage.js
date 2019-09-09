import React, {useState} from "react";

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

const CounterPage = (props) => {
    const { id } = props.match.params;
    const db = props.db;

    const [data, setData] = useState({loading: false});

    db.collection('counters').doc(id).get().then( (doc) => {
        const d = doc.data()
        setData({
            name: d.name,
            timestamp: d.timestamp.toDate()
        })
    })

    if(data.timestamp){
        return (
                <>
                {name}
                <Counter time={data.timestamp.getTime()}/>
                </>
        )
    }

    else{
        return <> </>
    }
}

export {CounterPage};
