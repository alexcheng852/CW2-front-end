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
      title: "",
			summary: "",
      imageurl: "",
			records: [],
			showAlert: false,
			alertMsg: "",
			alertType: "success",
			id: "",
			update: false,
      posts: [],
    }
  }
  	handleChange = (evt) => {
		this.setState({
			[evt.target.name]: evt.target.value,
		});
  };

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
   
	componentWillMount() {
		this.fetchAllArticle();
	}



  	fetchAllArticle = () => {
		var headers = new Headers();
		headers.append("Content-Type", "application/json");
		fetch("https://Rest-API-andDB.alexcheng852.repl.co/api/v1/articles", {
			method: "GET",
			headers: headers,
		})
			.then((response) => response.json())
			.then((result) => {
				console.log("result", result);
				this.setState({
					records: result.response,
				});
			})
			.catch((error) => console.log("error", error));
	};

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
					name: result.response[0].name,
					location: result.response[0].location,

				});
			})
			.catch((error) => console.log("error", error));
	};



 onFinish = () => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var body = JSON.stringify({ id: this.state.id, title: this.state.title, summary: this.state.summary,imageurl: this.state.imageurl });
		fetch("https://Rest-API-andDB.alexcheng852.repl.co/api/v1/articles", {
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
					title: "",
					summary: "",
				});
				this.fetchAllArticle();
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
				this.fetchAllArticle();
			})
			.catch((error) => console.log("error", error));
	};
  

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
    <Row>
						<Table striped bordered hover size="sm">
							<thead>
								<tr>
									<th>id</th>
									<th>Title</th>
									<th>Summary</th>
                  <th>imageurl</th>
                  
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
                      <td>{post.imageurl}</td>
											
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

     </Container>
     
        </div>
      
        );
  };
};

export default ArticleDelete;