import { useCallback } from "react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { useStyles } from "./utils";
import { blogApi } from "@/api";

const BlogDetail = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { id } = useParams();
  //eslint-disable-next-line
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
    updateRequest()
      .then(() => {
        toast.success("Blog updated successfully");
        navigate("/myblogs");
      })
      .catch((err) => {
        console.error(err);
        toast.error(err?.response?.data?.message || "Failed to update blog");
      });
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
      .catch((err) => {
        console.log(err);
        throw err;
      });

    const data = await res.data;
    console.log("update data blog", data);
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
          className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8"
        >
          <div className="mx-auto max-w-sm mt-5 flex flex-col gap-3">
            <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">
              Edit Blog
            </h2>
            <div className="">
              <label
                htmlFor=""
                className={`${classes.font} block text-sm font-medium text-gray-700 mb-1 `}
              >
                Title
              </label>
              <input
                type="text"
                className={`${classes.font} w-full px-4 py-1 border border-gray-300 rounded-lg focus:outlined-none  mb-4`}
                placeholder="Enter blog title"
                value={input.title}
                name="title"
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor=""
                className={`${classes.font} block text-sm font-medium text-gray-700 mb-1 `}
              >
                Description
              </label>
              <textarea
                type="text"
                className={`${classes.font} w-full px-4 py-1 border border-gray-300 rounded-lg focus:outlined-none  mb-4 h-100`}
                value={input.description}
                placeholder="Enter blog application"
                name="description"
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className={`${classes.font} bg-blue-600 hover:bg-blue-700 py-2 px-4 text-white rounded-lg transition duration-200 w-full border-none cursor-pointer`}
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
