import React, { useCallback } from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, InputLabel, TextField } from "@mui/material";
const labelStyles = { mt: 2, mb: 1, fontSize: "24px", fontWeight: "bold" };
import { useStyles } from "./utils";
import { blogApi } from "@/api";
import { Button } from "@/components/ui/button";

const BlogDetail = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [input, setInput] = useState({
    title: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //after submitting we will call
    // send request function so that
    updateRequest().then(() => navigate("/myblogs"));
  };
  //send a put request to update the details of blog detail page
  // so the update happen in backend
  async function updateRequest() {
    //update in the blog array
    const res = await blogApi
      .update(id, {
        title: input.title,
        description: input.description,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  }

  const fetchBlogById = useCallback(async () => {
    const res = await blogApi.getById(id).catch((err) => console.log(err));
    const data = res && res.data;
    if (data) {
      setBlog(data.blog);
      setInput({
        title: data.blog.title,
        description: data.blog.description,
        image: data.blog.image,
      });
    }
  }, [id]);

  useEffect(() => {
    fetchBlogById();
  }, [fetchBlogById]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {input && (
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6"
        >
          <div className="mx-auto max-w-sm mt-10">
            <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">
              Edit Blog
            </h2>
            <label
              htmlFor=""
              className={`${classes.font} block text-sm font-medium text-gray-700 mb-1 `}
            >
              Title
            </label>
            <input
              type="text"
              className={`${classes.font} w-full px-4 py-2 border border-gray-300 rounded-lg focus:outlined-none  mb-4`}
              placeholder="Enter blog title"
              value={input.title}
              name="title"
              onChange={handleChange}
            />
            <label
              htmlFor=""
              className={`${classes.font} block text-sm font-medium text-gray-700 mb-1 mt-2`}
            >
              Description
            </label>
            <textarea
              type="text"
              className={`${classes.font} w-full px-4 py-2 border border-gray-300 rounded-lg focus:outlined-none  mb-4`}
              value={input.description}
              placeholder="Enter blog application"
              name="description"
              onChange={handleChange}
            />
            <button
              type="submit"
              className={`${classes.font} bg-gray-800 text-white`}
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default BlogDetail;
