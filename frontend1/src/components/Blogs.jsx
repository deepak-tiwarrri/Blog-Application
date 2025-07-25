import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Blog from "./Blog";


const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const fetchBlogs = async () => {
    const response = await axios
      .get("http://localhost:5000/api/blog")
      .catch((err) => console.log(err));
    // console.log(response.data);
    const data = await response?.data?.blogs;//if data is not null then check for blogs
    if(data) setBlogs(data);
    // return data;
  };

  useEffect(() => {
    fetchBlogs();
  }, []);


  return (
    <div>
      {blogs &&
        blogs.map((blog, index) => (
          <Blog
            isUser = {localStorage.getItem("userId")===blog.user._id} 
            id = {blog._id} 
            key={index}
            title={blog.title}
            description={blog.description}
            imageUrl={blog.image}
            userName={blog.user.name}
            onDelete={fetchBlogs}//passed fetchblogs to refresh after deletion of any blog
            //so to fetch again
          />
        ))}
    </div>
  );
};

export default Blogs;
