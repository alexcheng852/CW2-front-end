import React from 'react';
import '../App.css';
import { Container, Row, Form, FormGroup, FormControl, FormLabel, Button, Alert, Table,Card } from "react-bootstrap";
import { UploadOutlined } from '@ant-design/icons';
import UserContext from '../contexts/user';
import { status, json } from '/utilities/requestHandlers';
import ArtilerContext from '../contexts/article';
import PostIcon from './posticon';
const { Meta } = Card;
import { Link} from 'react-router-dom'; 

const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } },
};

class ArticleDelete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    }
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
   
  static contextType = ArtilerContext;  
  
  onFinish = (values) => { 
  console.log('Received values of form: ', values);
  const {confirm,...data } = values;  // ignore the 'confirm' value
    console.log("Json  ",JSON.stringify(data))
    fetch('https://Rest-API-andDB.alexcheng852.repl.co/api/v1/articles', {
        method: "GET",
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

  editArticle = (id) => {
		fetch("https://Rest-API-andDB.alexcheng852.repl.co/api/v1/articles/" + id, {
			method: "GET",
		})
			.then((response) => response.json())
			.then((result) => {
				console.log(result);
				this.setState({
					id: id,
					update: true,
					title: result.response[0].title,
					summary: result.response[0].summary,
				});
			})
			.catch((error) => console.log("error", error));
	};

	deleteArticle = (id) => {
		fetch("https://Rest-API-andDB.alexcheng852.repl.co/api/v1/articles/" + id, {
			method: "DELETE",
		})
			.then((response) => response.json())
			.then((result) => {
				this.setState({
					showAlert: true,
					alertMsg: result.response,
					alertType: "danger",
				});
				this.fetchAllRecords();
			})
			.catch((error) => console.log("error", error));
	};
  

render() {

    return (
   <div>     
<Row>
						<Table striped bordered hover size="sm">
							<thead>
								<tr>
									<th>id</th>
									<th>Title</th>
									<th>Summary</th>
									<th colSpan="2">Actions</th>
								</tr>
							</thead>
							<tbody>
								{this.state.posts.map((post) => {
									return (
										<tr>
											<td>{post.id}</td>
											<td>{post.title}</td>
											<td>{post.summary}</td>
											<td>
												<Button variant="info" onClick={() => this.editArticle(post.id)}>
													Edit
												</Button>
											</td>
											<td>
												<Button variant="danger" onClick={() => this.deleteArticle(post.id)}>
													Delete
												</Button>
											</td>
										</tr>
									);
								})}
							</tbody>
						</Table>
					</Row>
     
        </div>
      
        );
  };
};

export default ArticleDelete;