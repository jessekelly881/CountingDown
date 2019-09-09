import React, {useState} from "react";
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import * as firebase from 'firebase';
import { DatePicker, TimePicker, Button, Input, Form} from 'antd';
const { TextArea } = Input;
import 'antd/dist/antd.css';
import "./App.scss"

import { CounterPage } from "./pages/CounterPage.js"

var firebaseConfig = {
    apiKey: "AIzaSyCLDVjnklu6TJ8fUJCA5CzEgIB_TtX79Gg",
    authDomain: "countingdown-36a9b.firebaseapp.com",
    databaseURL: "https://countingdown-36a9b.firebaseio.com",
    projectId: "countingdown-36a9b",
    storageBucket: "countingdown-36a9b.appspot.com",
    messagingSenderId: "166860362051",
    appId: "1:166860362051:web:30d8c28628f465b918dff6"
  };

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function postCounterToFirebase(data){

    db.collection('counters').add(data).then( (ref) => {
      alert(ref.id)
    })

}

function CreateCounterForm(props) {

    function handleCreateCounterForm(e) {
        e.preventDefault();

        props.form.validateFields((err, values) => {
            if (!err) {
                postCounterToFirebase({name: "Posted"});
            }
        });
    }

    const { getFieldDecorator } = props.form;

    return (
      <Form onSubmit={handleCreateCounterForm} className="create-counter-form">

        <Form.Item>
        {
            getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please enter a name for your counter' }],
            })

            ( <Input placeholder="Countdown Name" /> )
        }

        </Form.Item>

        <Form.Item>
        {
            getFieldDecorator('description', {
            rules: [{ required: true, message: 'Please enter a description for your counter' }],
            })

            (<TextArea rows={4} placeholder="Description" />)
        }

        </Form.Item>

        <Form.Item>
        {
            getFieldDecorator('date_time', {
            rules: [{ required: true, message: 'Please enter a date and time' }],
            })

            (<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" placeholder="Select date and time" />)
        }
        </Form.Item>

        <Form.Item>
        <Button block htmlType="submit">Create Timer</Button> <br />
        </Form.Item>

      </Form>
    )
}


function IndexPage() {
    const WrappedCreateCounterForm = Form.create({ name: 'create_counter' })(CreateCounterForm);

    return (
      <>
        <div className="create-counter">
          <WrappedCreateCounterForm />
        </div>
      </>
    )
}


export default () => (
  <Router>
    <Route path="/" exact component={IndexPage} />
    <Route path="/:id" render={props => ( <CounterPage {...props} db={db} />)} />
  </Router>
);
