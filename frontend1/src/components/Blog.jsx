import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  CardMedia,
  CardContent,
  CardHeader,
  Card,
  Avatar,
  IconButton,
  Box,
} from "@mui/material";
import axios from "axios";

const Blog = ({ title, description, imageUrl, userName, isUser, id,onDelete }) => {
  // console.log(title,isUser);
  let navigate = useNavigate();

  const handleEdit = (e) => {
    navigate(`/myblogs/${id}`);
  };  
  const handleDelete = () => {
    deleteRequest()
    navigate("/");
    navigate("/blogs");
  };

  const deleteRequest = async () => {
    const res = await axios
      .delete(`http://localhost:5000/api/blog/${id}`)
      .catch((err) => console.log(err));
   const data = await res.data;
   return data;
  };


  return (
    <Card
      sx={{
        width: "40%",
        margin: "auto",
        mt: 2,
        padding: 2,
        boxShadow: "5px 5px 10px #ccc,",
        ":hover": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}
    >
       {isUser && (
        <Box display="flex">
          <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
            <EditIcon sx={{color:"#1976d2 "}} />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteIcon sx={{color:"#f44336"}}/>
          </IconButton>
        </Box>
      )}
      
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe" >
            {userName?userName.charAt(0).toUpperCase():''}
          </Avatar>
        }
        title={title}
      />
      <CardMedia component="img" height="194" alt="Blog image" image={imageUrl} />
      <CardContent>
      <hr />
      <br />
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {userName}: {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Blog;
