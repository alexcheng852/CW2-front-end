import React from 'react';
import '../App.css';
import { Upload, Button, message, Alert, Form, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import UserContext from '../contexts/user';
import { status, json } from '/utilities/requestHandlers';
import ArtilerContext from '../contexts/article';


const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
};
const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } },
};

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
        method: "POST",
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

  
render() {

    return (
            <Form {...formItemLayout} name="upload" scrollToFirstError onFinish={this.onFinish}>
        
        <Form.Item name="title" label="title" >
            <Input />
        </Form.Item>

        <Form.Item name="summary" label="summary" >
            <Input />
        </Form.Item>
        <Form.Item name="imageurl" label="imageurl" >
            <Input />
        </Form.Item>
        <Form.Item name="alltext" label="text" >
            <Input />
        </Form.Item>
        <Form.Item name="authorid" label="authorid" >
            <Input />
        </Form.Item>
              
              

        <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
                Upload
            </Button>
        </Form.Item>
      </Form>
    );
  };
};

export default ArticleUploadForm;
