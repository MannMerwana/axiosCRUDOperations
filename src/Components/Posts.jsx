import React from 'react';
import { useEffect } from 'react';
import { deletePost,getAllPosts } from '../Api/PostApi';
import '../../src/styles/index.css'
import '../App.css';
import {useState} from 'react'

import { Form } from './Form';
export  const Posts=()=>{
    const[data,setPostsData] = useState([]);// initially we have an array of objects.
    const [updatePostDataApi,setPostDataApi] = useState({});// initially we have json object 

    //READ OPERATION FUNCTION.
    const getAllPostsData= async ()=>{
      const response = await getAllPosts();
      console.log(response.data);
      setPostsData(response.data);
     }
    
    
      useEffect(()=>{
          getAllPostsData();
      },[])

      //DELETE FUNCTION USING ID TO REMOVE THE POST.
      const handleDeletePost= async (id)=>{
       try{
        const response = await deletePost(id);
        if(response.status === 200 ){
            const newUpdatedPosts = data.filter((currentPost) => {
            return currentPost.id !== id;
            })
            setPostsData(newUpdatedPosts);
        }
        alert('Post Deleted Successfully.');
       }catch(error){
       console.error(`Error while deleting Post.${error}`);
       }
      }
//UPDATE FUNCTION
      const handleUpdatePost=(currentElement)=>setPostDataApi(currentElement);

    return (
      <>
        <h1 className="heading">CRUD OPERATIONS USING AXIOS</h1>
        <section className='sectionForm'>
            <Form
            data={data}
            setPostData={setPostsData}
            updatePostDataApi={updatePostDataApi}
            setUpdatePostDataApi={setPostDataApi}
            />
        </section>
        <section className="postsSection">
          <ol>
            {
             data.map((currentElement) => {
              const { id, body, title } = currentElement;
              return (
                <li key={id}>
                  <p className="title">
                    <span className='label'>Title:</span> {title}{" "}
                  </p>
                  <p className="description">
                    <span className="label">Body:</span> {body}
                  </p>
                  <button
                    type="button"
                    className="editBtn"
                    onClick={() => handleUpdatePost(currentElement)}
                  >
                    Edit
                  </button>
                  <button
                    className="deleteBtn"
                    type="button"
                    onClick={() => handleDeletePost(id)}
                  >
                    Delete
                  </button>
                </li>
              );
            })}
          </ol>
        </section>
      </>
    );
}