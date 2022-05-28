import UserContext from '../contexts/user';
import React, {  useContext } from 'react';
import {status,json} from '/utilities/requestHandlers';
import SearchUser from './userSearch';
import ImageUpload from './ImageUpload';
import SearchDog from './dogSearch';
import ArticleUpload from './ArticleUpload';
import ArticleUpdate from './ArticleUpdate';
import { Row, Col, Space, Form, Input, Button  } from 'antd';
import { Link } from "react-router-dom";
import { Avatar, Image } from 'antd';
import { UserOutlined } from '@ant-design/icons';



function Profile(props) {
		
  const user = useContext(UserContext);
				
   return (  
   <UserContext.Consumer>
       
      {({logout, user}) => (   
    <>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
      <Row>  <Col span={12}>   
       <div className="Profile">
      <table   rules="all" style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}>
        <tr>
          <th align="left" style={{background:"#d3f261"}} >userID:  </th>
          <td style={{background:"#d3f261"}}>{user.id}</td> 
        </tr>
        <tr>
          <th align="left" style={{background:"#f4ffb8"}}>Username:   </th>
          <td style={{background:"#f4ffb8"}}>{user.username}</td>
        </tr>  
        <tr> 
          <th align="left" style={{background:"#d3f261"}}>Email:  </th> 
          <td style={{background:"#d3f261"}}>{user.email}</td>
        </tr> 
         <tr> 
         <th align="left" style={{background:"#f4ffb8"}}>About me:  </th>
         <td style={{background:"#f4ffb8"}}>{user.about}</td>
         </tr>  
        <tr> 
          <th align="left" style={{background:"#d3f261"}} >Avatar:  </th>
          <td style={{background:"#d3f261"}}><Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
  {user.avatarurl}</td>
        </tr>    
         <tr> 
          <th align="left" style={{background:"#f4ffb8"}} >Role: </th>
         <td style={{background:"#f4ffb8"}}>{user.role}</td>
        </tr>                                                                          </table>
    </div></Col>
      <Col span={12}>
      { user.role=="admin"&& <SearchUser authbasic={ btoa(`${user.username}:${user.password}`)}/>}
       </Col></Row>
        
      <Col span={12}>       
      { user.role=="admin"&&  <ImageUpload />}</Col>
     </Space><br />
      <Col span={12}>       
      <SearchDog /></Col>
     <br />
      
      <Col span={12}>  
        { user.role=="admin" && <h2>Upload /Delete /Update Article</h2>}
      { user.role=="admin" && <button><Link to="/ArticleUpload">Upload</Link></button>} { user.role=="admin" && <button><Link to="/ArticleDelete">Delete</Link></button>}{ user.role=="admin" && <button><Link to="/ArticleUpdate">Update</Link></button>}</Col>
		 </>
      )}
</UserContext.Consumer> 
  )
     


}
export default Profile;







/**
 * Renders a <Home /> component to be the home page of the application.
 * @params props
 */
