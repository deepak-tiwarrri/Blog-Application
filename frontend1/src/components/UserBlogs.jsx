import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Blog from "./Blog";
import { BLOG_URL, USER_URL } from "./utils";

//fetch the user blog by id
const UserBlogs = ({}) => {
  const [user, setUsers] = useState();
  let id = localStorage.getItem("userId");
  async function fetchBlogs() {
    const res = await axios
      .get(`${USER_URL}/${id}`)
      .catch((err) => console.log(err));
    let data = await res.data;
    // console.log(data.user);
    return data;
  }

  useEffect(() => {
    fetchBlogs().then((data) => setUsers(data.user));
  }, [id]);

  const handleDelete = async (id) => {
    try {
      const res = await res.get(`${BLOG_URL}/${id}`);
      fetchBlogs();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {user &&
        user.blogs.map((blog, index) => (
          <Blog
            id={blog._id}
            key={index}
            title={blog.title}
            description={blog.description}
            imageUrl={blog.image}
            userName={blog.user.name}
            onDelete={()=>handleDelete(blog._id)}
          />
        ))}
    </div>
  );
};

export default UserBlogs;
