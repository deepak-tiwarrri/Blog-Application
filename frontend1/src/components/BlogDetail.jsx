import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, InputLabel, TextField, Typography } from "@mui/material";
const labelStyles = { mt: 2, mb: 1, fontSize: "24px", fontWeight: "bold" };
import { useStyles } from "./utils";
import { blogApi } from "@/api";
import {Button} from "@/components/ui/button";

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
    const res = await blogApi.update(id, {
        title: input.title,
        description: input.description,
      }).catch((err) => console.log(err));

    const data = await res.data;
    return data;
  }

  async function fetchBlogById() {
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
  }
  useEffect(() => {
    fetchBlogById();
  }, [id]);

  return (
    <div>
      {input && (
        <form onSubmit={handleSubmit}>
          <Box
            border={3}
            borderColor={"green"}
            borderRadius={10}
            boxShadow="10px 10px 20px #ccc"
            margin={"auto"}
            marginTop={3}
            padding={3}
            display={"flex"}
            flexDirection="column"
            width="80%"
          >
            <Typography
              fontWeight={"bold"}
              variant="h2"
              padding={3}
              color="grey"
              textAlign={"center"}
              className={classes.font}
            >
              Edit Blog
            </Typography>

            <InputLabel sx={labelStyles} className={classes.font}>Title</InputLabel>
            <TextField
              value={input.title}
              name="title"
              onChange={handleChange}
              margin="normal"
              variant="outlined"
            />

            <InputLabel sx={labelStyles} className={classes.font}>Description</InputLabel>
            <TextField
              value={input.description}
              name="description"
              onChange={handleChange}
              margin="normal"
              variant="outlined"
            />
            {/* <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "rgba(59,9,121,1)",
                mt: 2,
                borderRadius: 4,
              }}
              className={classes.font}
            >
              Submit
            </Button> */}
            <Button type="submit" className={`${classes.font} bg-gray-800 text-white`}>
              Submit
            </Button>

          </Box>
        </form>
      )}
    </div>
  );
};

export default BlogDetail;
