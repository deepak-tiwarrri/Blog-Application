import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useScrollToTop } from "@/hooks/useScrollToTop.js";
import PageHeader from "@/components/common/PageHeader";
import { useFormState } from "@/hooks/useCommonLogic";
import { useFetchBlogById, useBlogMutations } from "@/hooks/useBlogAPI";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const INITIAL_EDIT_STATE = {
  title: "",
  description: "",
  image: "",
};

const BlogDetail = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const { id } = useParams();
  const { blog, fetchBlogById } = useFetchBlogById(id);
  const { formData, handleChange, updateForm } = useFormState(INITIAL_EDIT_STATE);
  const { updateBlog, isLoading } = useBlogMutations();

  useEffect(() => {
    fetchBlogById();
  }, [id]);

  // Populate form when blog data is fetched
  useEffect(() => {
    if (blog) {
      updateForm({
        title: blog.title || "",
        description: blog.description || "",
        image: blog.image || "",
      });
    }
  }, [blog, updateForm]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await updateBlog(id, {
      title: formData.title,
      description: formData.description,
    });

    if (result) {
      navigate("/myblogs");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <PageHeader
          title="Edit Blog"
          subtitle="Update your blog content and publish your changes"
          backTo="/myblogs"
        />

        {/* Form Container */}
        {formData && (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 overflow-hidden"
          >
            {/* Decorative Top Border */}
            <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

            <div className="p-6 sm:p-8 md:p-10">
              {/* Title Field */}
              <div className="mb-7 md:mb-8">
                <Label
                  htmlFor="title"
                  className="block text-sm md:text-base font-semibold text-gray-800 mb-3"
                >
                  Blog Title
                </Label>
                <Input
                  id="title"
                  type="text"
                  className="w-full px-4 md:px-5 py-3 md:py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 bg-white hover:border-gray-300 transition-all duration-200 text-gray-900 placeholder-gray-400 text-sm md:text-base"
                  placeholder="Enter an engaging blog title"
                  value={formData.title}
                  name="title"
                  onChange={handleChange}
                />
              </div>

              {/* Description Field */}
              <div className="mb-8 md:mb-10">
                <Label
                  htmlFor="description"
                  className="block text-sm md:text-base font-semibold text-gray-800 mb-3"
                >
                  Blog Description
                </Label>
                <Textarea
                  id="description"
                  className="w-full px-4 md:px-5 py-3 md:py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 bg-white hover:border-gray-300 transition-all duration-200 text-gray-900 placeholder-gray-400 text-sm md:text-base min-h-[180px] md:min-h-[220px] resize-none"
                  placeholder="Write your blog description here..."
                  value={formData.description}
                  name="description"
                  onChange={handleChange}
                />
                <p className="text-xs md:text-sm text-gray-500 mt-2">
                  {formData.description.length} characters
                </p>
              </div>

              {/* Image Field */}
              <div className="mb-8 md:mb-10">
                <Label htmlFor="image" className="block text-sm md:text-base font-semibold text-gray-800 mb-3">
                  Image Link
                </Label>
                <Input
                  type="text"
                  id="image"
                  className="w-full px-4 md:px-5 py-3 md:py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 bg-white hover:border-gray-300 transition-all duration-200 text-gray-900 placeholder-gray-400 text-sm md:text-base"
                  placeholder="Enter image URL"
                  value={formData.image}
                  name="image"
                  onChange={handleChange}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Button
                  type="button"
                  onClick={() => navigate("/myblogs")}
                  className="flex-1 px-6 py-3 md:py-3.5 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 text-sm md:text-base"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 px-6 py-3 md:py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg text-sm md:text-base disabled:opacity-50"
                >
                  {isLoading ? "Publishing..." : "Publish Changes"}
                </Button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default BlogDetail;
