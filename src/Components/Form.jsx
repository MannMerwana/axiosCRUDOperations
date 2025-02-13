import React, { useEffect, useState } from "react";
import '../App.css'
import { editData, postData } from "../Api/PostApi";
export  const Form = ({ data, setPostData, updatePostDataApi ,setUpdatePostDataApi}) => 
  {
                const [addPostData, setAddData] = useState({
                  title: "",
                  body: "",
                }); // initially its an empty object

              

                let isEmpty = Object.keys(updatePostDataApi).length === 0;

              //get the updated Data and add that data into the input field
              useEffect(()=>{
                updatePostDataApi &&
                    setAddData({
                      title:updatePostDataApi.title || '',
                      body:updatePostDataApi.body || '',});
              },[updatePostDataApi])



              const handleInputChange = (e) => {
                const name = e.target.name;
                const value = e.target.value;

                setAddData((prev) => {
                  return {
                    ...prev,
                    [name]: value, //dynamic name
                  };
                });
              };

              //add Post
              const addData = async () => {
                const response = await postData(addPostData);
                console.log(`Response:${response}`);
                if (response.status === 201) {
                  setPostData([...data, response.data]);
                  setAddData({ title: "", body: "" }); // Ensuring reset on reload
                };
               
                
                
            }
           //update post
             const updatePost=async()=>{
               try {
                 const response = await editData(updatePostDataApi.id,addPostData);
                 console.log(`Responses are :${response}`);

                if(response.status === 200)
                {
                   setPostData((prev) => {
                     return prev.map((currentElement) => {
                       //only update the post,whose updatedId  (response.data.id)matches with the current element of response.data
                       return currentElement.id === response.data.id
                         ? response.data
                         : currentElement;
                     });
                   });
                   setAddData({title:'',body:''});
                    setUpdatePostDataApi({});
                }
                alert('Post Edited Successfully!');
               } catch (error) {
                console.error(`Error in updating the post ':(' ${error} `);
               }
             }


              //form submission

              const handleFormSubmit = (e) => {
                e.preventDefault(); //prevent default form submission
                addData();
               

                //e.nativeEvent.submitter.value is used when we want to access value of a button/input submitted on form submit
                const action = e.nativeEvent.submitter.value;
              action === 'Add' ? addData() : updatePost()
              alert('Form Submitted Successfully !');

              if(action === 'Add' ){
                alert("New Post Added Successfully. Please Scroll Down to see newly added Posts!!");
                
              }
              
             
              };
              return (
                <form onSubmit={handleFormSubmit}>
                  <div>
                    <label htmlFor="title"></label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="formInput"
                      placeholder="Add Title... "
                      value={addPostData.title}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="body"></label>
                    <input
                      type="text"
                     
                      id="body"
                      name="body"
                      className="formInput"
                      placeholder="Add Description... "
                      value={addPostData.body}
                      onChange={handleInputChange}
                    />
                  </div> 
                  <button type="submit" value={isEmpty ? "Add"  : "Edit"}>
                    {isEmpty ? "Add" : "Edit"}
                  </button>
                </form>
              );
  };

