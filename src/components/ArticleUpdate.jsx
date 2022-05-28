import React from "react";
import { Container, Row,  FormGroup, FormControl, FormLabel, Alert, Table,Card } from "react-bootstrap";
import { Form, Input, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import UserContext from '../contexts/user';
import { status, json } from '/utilities/requestHandlers';
import ArtilerContext from '../contexts/article';
import PostIcon from './posticon';
const { Meta } = Card;
import { Link} from 'react-router-dom'; 

const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
};
const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } },
};

class ArticleUpdate extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      title: "",
			summary: "",
      imageurl: "",
			showAlert: false,
			alertMsg: "",
			alertType: "success",
			id: "",
			update: false,
      posts: [],
		};
	}
    
  componentDidMount() {
  fetch('https://Rest-API-andDB.alexcheng852.repl.co/api/v1/articles')
  .then(status)
  .then(json)
  .then(data => {
    this.setState({ posts: data })
 //   console.log("post ", data)
  })
  .catch(err => console.log("Error fetching articles", err));


}

	handleChange = (evt) => {
		this.setState({
			[evt.target.name]: evt.target.value,
		});
	};

	componentWillMount() {
		this.fetchAllArticles();
	}

  	fetchAllArticles = () => {
		var headers = new Headers();
		headers.append("Content-Type", "application/json");
		fetch("https://Rest-API-andDB.alexcheng852.repl.co/api/v1/articles/", {
			method: "GET",
			headers: headers,
		})
			.then((response) => response.json())
			.then((result) => {
				console.log("result", result);
				this.setState({
					articles: result.response,
				});
			})
			.catch((error) => console.log("error", error));
	};


	// update record
	updateArticle = () => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		fetch("https://Rest-API-andDB.alexcheng852.repl.co/api/v1/articles/"+ id, {
			method: "PUT",
			headers: myHeaders,
			body: body,
		})
			.then((response) => response.json())
			.then((result) => {
				this.setState({
					showAlert: true,
					alertMsg: result.response,
					alertType: "success",
					update: false,
					id: "",
					name: "",
					location: "",
				});
				this.fetchAllArticles();
			})
			.catch((error) => console.log("error", error));
	};
  onFinish = (values) => { 
  console.log('Received values of form: ', values);
  const {confirm,...data } = values;  // ignore the 'confirm' value
    console.log("Json  ",JSON.stringify(data))
    fetch('https://Rest-API-andDB.alexcheng852.repl.co/api/v1/articles', {
        method: "PUT",
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
			<div>
				<Container>
					{this.state.showAlert === true ? (
						<Alert
							variant={this.state.alertType}
							onClose={() => {
								this.setState({
									showAlert: false,
								});
							}}
							dismissible
						>
							<Alert.Heading>{this.state.alertMsg}</Alert.Heading>
						</Alert>
					) : null}

					{/* All Records */}
					<Row>
						<Table striped bordered hover size="sm">
							<thead>
								<tr>
									<th>id</th>
									<th>title</th>
                  <th>summary</th>
									<th>alltext</th>
									<th>imageurl</th>
                  
								</tr>
							</thead>
							<tbody>
								{this.state.posts.map((post) => {
									return (
										<tr>
											<td>{post.id}</td>
											<td>{post.title}</td>
											<td>{post.summary }</td>
                      <td>{post.alltext }</td>
                      <td>{post.imageurl }</td>
                      

										</tr>
									);
								})}
							</tbody>
						</Table>
					</Row>

					{/* Insert Form */}
					<Row>
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
					</Row>
				</Container>
			</div>
		);
	}
}


export default ArticleUpdate;
