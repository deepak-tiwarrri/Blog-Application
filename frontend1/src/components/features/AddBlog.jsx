import { useState } from "react";
import { blogApi } from "@/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useScrollToTop } from "@/hooks/useScrollToTop.js";
import { useStyles } from "@/lib/utils.js";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const AddBlog = () => {
  useScrollToTop();
  const classes = useStyles();
  const navigate = useNavigate();
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
    console.log(input);
    sendRequest()
      .then((data) => {
        console.log(data);
        toast.success("Blog posted successfully");
      })
      .then(() => navigate("/blogs"))
      .catch((err) => {
        // sendRequest already logs, but ensure user sees error
        toast.error(err?.response?.data?.message || "Failed to post blog");
      });
  };

  async function sendRequest() {
    const res = await blogApi
      .add({
        title: input.title,
        description: input.description,
        image: input.image,
        user: localStorage.getItem("userId"),
      })
      .catch((err) => {
        console.error(err);
        // rethrow so caller can show toast / handle navigation
        throw err;
      });
    const data = await res.data;
    console.log(data);
    return data;
  }
  return (
    <form action="" onSubmit={handleSubmit} className="mt-12 mb-16">
      <div className="m-auto shadow-md hover:shadow-gray-900 hover:shadow-lg transition-all ease-in-out rounded-md p-8 flex flex-col mb-6 mt-6 w-full max-w-xl ">
        <h3
          className={`font-bold p-6 ${classes.font}  text-gray-700 text-center text-2xl`}
        >
          Post Your Blog
        </h3>

        {/* title */}
        <Label
          htmlFor="title"
          className={`${classes.font} mb-2 text-start mt-2`}
        >
          Title
        </Label>
        <Input
          type="text"
          name="title"
          value={input.title}
          onChange={handleChange}
          placeholder="Title"
          variant="outlined"
        />

        {/* description */}
        <Label
          htmlFor="description"
          className={`${classes.font} mb-2 text-start mt-4`}
        >
          Description
        </Label>
        <Textarea
          type="text"
          name="description"
          value={input.description}
          onChange={handleChange}
          variant="outlined"
          placeholder="Description"
        />

        {/* image url */}
        <Label
          htmlFor="image"
          className={`${classes.font} mb-2 text-start mt-4`}
        >
          ImageURL
        </Label>
        <Input
          type="text"
          name="image"
          value={input.image}
          onChange={handleChange}
          placeholder="ImageURL"
          variant="outlined"
        />

        {/* Button */}
        <Button
          type="submit"
          variant="contained"
          className="bg-gray-800 hover:bg-gray-700 hover:text-white text-white mt-4"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default AddBlog;
