import React, {useState} from "react";
import { BrowserRouter as Router, Route, Link} from "react-router-dom";

import DatePicker from 'antd/es/date-picker';
import 'antd/es/date-picker/style/css';

import Button from 'antd/es/button';
import 'antd/es/button/style/css';

import Input from 'antd/es/input';
import 'antd/es/input/style/css';

import Form from 'antd/es/form';
import 'antd/es/form/style/css';

const { TextArea } = Input;

import "./App.scss";
import siteData from './data.yaml';

// Firebase
import * as firebase from 'firebase/app';
import 'firebase/firestore';

import description from "./description.md"

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

function postCounterToFirebase(data, setCounterLink){

    db.collection('counters').add(data).then( (ref) => {
        setCounterLink("/" + ref.id);
    })

}

const LinkBox = ({to}) => {
    if(to === ""){
        return(
            <> </>
        )
    }

    else{
        return (
           <Link to={to}>{siteData.url + to}</Link>
        )
    }
}

function CreateCounterForm(props) {
    const { getFieldDecorator, getFieldValue } = props.form;
    const [counterLink, setCounterLink] = useState("");
    const [formData, setFormData] = useState({});

    function handleCreateCounterForm(e) {
        e.preventDefault();

        props.form.validateFields((err, values) => {
            if (!err) {
                const timestamp = new Date (getFieldValue("timestamp"))
                const data = {
                    name: getFieldValue("name"),
                    description: getFieldValue("description"),
                    timestamp: firebase.firestore.Timestamp.fromDate(timestamp)
                }

                postCounterToFirebase(data, setCounterLink);
            }
        });
    }


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
            getFieldDecorator('timestamp', {
            rules: [{ required: true, message: 'Please enter a date and time' }],
            })

            (<DatePicker showTime={{ use12Hours: true }} format="YYYY-MM-DD h:mm:ss A" placeholder="Select date and time" />)
        }
        </Form.Item>

        <Form.Item>
        <Button block htmlType="submit">Create Timer</Button> <br />
        </Form.Item>

        <LinkBox to={counterLink} />

      </Form>
    )
}

function MarkdownComponent({md}) {
  const hash = () => { return {__html: md}; }
  return <div dangerouslySetInnerHTML={hash()} />
}

function IndexHeader(){
    return(
        <>
          <h1>{siteData.title}</h1>
          <h2>{siteData.subtitle}</h2>
        </>
    )
}

function IndexPage() {
    const WrappedCreateCounterForm = Form.create({ name: 'create_counter' })(CreateCounterForm);

    return (
      <>
        <div className="create-counter">
          <IndexHeader />
          <WrappedCreateCounterForm />
          <MarkdownComponent md={description} />
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
