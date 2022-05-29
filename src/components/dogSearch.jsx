import React, {  useContext, useState } from 'react';
import UserContext from '../contexts/user';
import { PageHeader, Input, message } from 'antd';
import { status, json } from '/utilities/requestHandlers';
import {Table, Alert, Select,Col} from 'antd';
import { Tag, Space } from 'antd';

const { Column} = Table;
const  { Search } = Input;

function SearchDog(props) {
 
 const [press, setPress] = useState("");
 const [articlesData, setArticles] = useState([]);
 const[isSearchOK,setSearch]=useState(false);
 const authbasic =props.authbasic;

const onSearch= value => {
  console.log("value ",value)
  console.log("press ",`${press}`)
 let urlPath="https://Rest-API-andDB.alexcheng852.repl.co/api/v1/articles";
 if (press==="title"||press==="summary") 
   urlPath+=`/search/?fields=${press}&q=${value}`
 else
  if(press==="title&fields=summary"&&value==="")
     urlPath+=`/search/?fields=${press}`
 
  console.log("urlPath ",urlPath)
  return(fetch(`${urlPath}`,{
        method: "GET",
        headers:{"Authorization": "Basic " +`${authbasic}`}
  })
  .then(status)
  .then(json)
  .then(data => { 
   console.log("dog return  ",JSON.stringify(data) );
   console.log("dog data  ",data );
   setArticles(data);
   setSearch(true); 
    value="";
  })
  .catch(err => console.log("Error fetching users", err)) 
  ) 
}

const { Option } = Select;

function handleChange(value) {
  message.info("Pls. enter at least three characters to search by email or username otherwise leave the input empty")
  
  setPress(value);
  console.log(`selected ${value}`);
}
   	

  return (
   <>
     <Col span={16}>   
        <PageHeader
            title="Dog search "
            subTitle="Manage Dog Info"/>       
       <Search placeholder="Search Users"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}/>
       <Select defaultValue="all" style={{ width: 120 }} onChange={handleChange}>
        <Option value="title">title</Option>
        <Option value="summary">summary</Option>
        <Option value="title&fields=summary">Get all-filter by username & email</Option>
        <Option value="all">Get all-without filter</Option>
        </Select>	      
  {isSearchOK&&<Table dataSource={articlesData}>
    <Column title="id" dataIndex="id" key="id" />
   <Column title="title" dataIndex="title" key="title" />
   <Column title="summary" dataIndex="summary" key="summary" />

   </Table>}
   </Col>  

    </>  
  );
  }

export default SearchDog;