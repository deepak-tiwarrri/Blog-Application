import { useCallback } from "react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { useStyles } from "@/lib/utils.js";
import { blogApi } from "@/api";
import { useScrollToTop } from "@/hooks/useScrollToTop.js";
import { ChevronLeft } from "lucide-react";

const BlogDetail = () => {
  useScrollToTop();
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/myblogs")}
          className="inline-flex items-center gap-2 mb-8 text-gray-600 hover:text-gray-900 transition-colors duration-200 group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
          <span
            style={{ fontFamily: "Poppins, sans-serif" }}
            className="text-sm font-medium"
          >
            Back to My Blogs
          </span>
        </button>

        {/* Header Section */}
        <div className="mb-8 md:mb-10">
          <h1
            style={{ fontFamily: "Playfair Display, serif" }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2"
          >
            Edit Blog
          </h1>
          <p
            style={{ fontFamily: "Poppins, sans-serif" }}
            className="text-gray-600 text-sm sm:text-base"
          >
            Update your blog content and publish your changes
          </p>
        </div>

        {/* Form Container */}
        {input && (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 overflow-hidden"
          >
            {/* Decorative Top Border */}
            <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

            <div className="p-6 sm:p-8 md:p-10">
              {/* Title Field */}
              <div className="mb-7 md:mb-8">
                <label
                  htmlFor="title"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                  className="block text-sm md:text-base font-semibold text-gray-800 mb-3"
                >
                  Blog Title
                </label>
                <input
                  id="title"
                  type="text"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                  className="w-full px-4 md:px-5 py-3 md:py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 bg-white hover:border-gray-300 transition-all duration-200 text-gray-900 placeholder-gray-400 text-sm md:text-base"
                  placeholder="Enter an engaging blog title"
                  value={input.title}
                  name="title"
                  onChange={handleChange}
                />
              </div>

              {/* Description Field */}
              <div className="mb-8 md:mb-10">
                <label
                  htmlFor="description"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                  className="block text-sm md:text-base font-semibold text-gray-800 mb-3"
                >
                  Blog Description
                </label>
                <textarea
                  id="description"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                  className="w-full px-4 md:px-5 py-3 md:py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 bg-white hover:border-gray-300 transition-all duration-200 text-gray-900 placeholder-gray-400 text-sm md:text-base min-h-[180px] md:min-h-[220px] resize-none"
                  placeholder="Write your blog description here..."
                  value={input.description}
                  name="description"
                  onChange={handleChange}
                />
                <p
                  style={{ fontFamily: "Poppins, sans-serif" }}
                  className="text-xs md:text-sm text-gray-500 mt-2"
                >
                  {input.description.length} characters
                </p>
              </div>
              <div className="mb-8 md:mb-10">
                <label htmlFor="image"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                  className="block text-sm md:text-base font-semibold text-gray-800 mb-3">Image Link</label>
                <input type="text"
                  id="image-url"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                  className="w-full px-4 md:px-5 py-3 md:py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 bg-white hover:border-gray-300 transition-all duration-200 text-gray-900 placeholder-gray-400 text-sm md:text-base"
                  placeholder="Enter an engaging blog title"
                  value={input.title}
                  name="title"
                  onChange={handleChange}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <button
                  type="button"
                  onClick={() => navigate("/myblogs")}
                  style={{ fontFamily: "Poppins, sans-serif" }}
                  className="flex-1 px-6 py-3 md:py-3.5 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 text-sm md:text-base"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                  className="flex-1 hover: cursor-pointer px-6 py-3 md:py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg text-sm md:text-base"
                >
                  Publish Changes
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default BlogDetail;
