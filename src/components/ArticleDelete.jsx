import React from 'react';
import '../App.css';
import { Upload, Button, message, Alert, Form, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import UserContext from '../contexts/user';
import { status, json } from '/utilities/requestHandlers';
import ArtilerContext from '../contexts/article';

class ArticleUploadForm extends React.Component {
 constructor(props) {
    super(props);
    this.state = {
      selected: props.selected   
    };
   this.onFinish = this.onFinish.bind(this);
    
   }
   
  static contextType = ArtilerContext;  
  
  onFinish = (values) => { 
  console.log('Received values of form: ', values);
  const {confirm,...data } = values;  // ignore the 'confirm' value
    console.log("Json  ",JSON.stringify(data))
    fetch('https://Rest-API-andDB.alexcheng852.repl.co/api/v1/articles', {
        method: "DELETE",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }        
    })
    .then(status)
    .then(json)
    .then(data => {
        // For you TODO: display success message and/or redirect
        console.log(data);  
          this.context.regComplete(); 
   //     alert(`Registration Completed! Pls. press login or green button to continue `)      
			  
    })
    .catch(errorResponse => {
        // For you TODO: show nicely formatted error message and clear form
	 console.error(errorResponse);
        alert(`Error: ${errorResponse}`);
    });  
  }
