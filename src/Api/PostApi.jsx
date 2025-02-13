import React from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});


//post method(CREATE OPERATION)
export const postData=(post)=>{
    return api.post('/posts',post);// route and payload passed.
}
//get method (READ OPERATION)
export const getAllPosts=()=>{
    return api.get('/posts');
}


//put method (UPDATE OPERATION)
export const editData = (id,post) =>{
    return api.put(`/posts/${id}`,post);
}

//delete method (DELETE OPERATION)
export const deletePost = (id) =>{
    return api.delete(`/posts/${id}`)
}