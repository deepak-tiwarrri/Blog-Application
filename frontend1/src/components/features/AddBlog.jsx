import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useScrollToTop } from "@/hooks/useScrollToTop.js";
import { useStyles } from "@/lib/utils.jsx";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useFormState } from "@/hooks/useCommonLogic";
import { useBlogMutations } from "@/hooks/useBlogAPI";

const INITIAL_BLOG_STATE = {
  title: "",
  description: "",
  image: "",
};

const AddBlog = () => {
  useScrollToTop();
  const classes = useStyles();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const { formData, handleChange, resetForm } = useFormState(INITIAL_BLOG_STATE);
  const { createBlog, isLoading } = useBlogMutations();

  // Protect route - redirect if not authenticated
  useEffect(() => {
    if (!userId) {
      toast.error("Please login to create a blog");
      navigate("/login", { replace: true });
    }
  }, [userId, navigate]);

  const validateForm = () => {
    if (!formData.title.trim()) {
      toast.error("Title is required");
      return false;
    }
    if (!formData.description.trim()) {
      toast.error("Description is required");
      return false;
    }
    if (!formData.image.trim()) {
      toast.error("Image URL is required");
      return false;
    }
    if (formData.title.length < 3) {
      toast.error("Title must be at least 3 characters");
      return false;
    }
    if (formData.description.length < 10) {
      toast.error("Description must be at least 10 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const blogData = {
      title: formData.title,
      description: formData.description,
      image: formData.image,
      user: userId,
    };

    const result = await createBlog(blogData);
    if (result) {
      resetForm();
      navigate("/blogs");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="mt-12 mb-16">
      <div className="m-auto shadow-md hover:shadow-gray-900 hover:shadow-lg transition-all ease-in-out rounded-md p-8 flex flex-col mb-6 mt-6 w-full max-w-xl ">
        <h3
          className={`font-bold p-6 ${classes.font}  text-gray-700 text-center text-2xl`}
        >
          Post Your Blog
        </h3>
        <Label
          htmlFor="title"
          className={`${classes.font} mb-2 text-start mt-2`}
        >
          Title
        </Label>
        <Input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          variant="outlined"
        />
        <Label
          htmlFor="description"
          className={`${classes.font} mb-2 text-start mt-4`}
        >
          Description
        </Label>
        <Textarea
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          variant="outlined"
          placeholder="Description"
        />
        <Label
          htmlFor="image"
          className={`${classes.font} mb-2 text-start mt-4`}
        >
          ImageURL
        </Label>
        <Input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="ImageURL"
          variant="outlined"
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2 transition-colors"
        >
          {isLoading ? "Posting..." : "Post Blog"}
        </Button>
      </div>
    </form>
  );
};

export default AddBlog;
