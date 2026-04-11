import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useScrollToTop } from "@/hooks/useScrollToTop.js";
import { useStyles } from "@/lib/utils.jsx";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useFormState } from "@/hooks/useCommonLogic";
import { useBlogMutations } from "@/hooks/useBlogAPI";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ImagePlus, X } from "lucide-react";

const INITIAL_BLOG_STATE = {
  title: "",
  description: "",
  image: "",
  tags: "",
};

const AddBlog = () => {
  useScrollToTop();
  const classes = useStyles();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const { formData, handleChange, resetForm } = useFormState(INITIAL_BLOG_STATE);
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
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
    if (!description || description.replace(/<[^>]*>?/gm, '').trim() === "") {
      toast.error("Description is required");
      return false;
    }
    if (!imageFile && !formData.image.trim()) {
      toast.error("An image file or URL is required");
      return false;
    }
    if (formData.title.length < 3) {
      toast.error("Title must be at least 3 characters");
      return false;
    }
    
    // Strip HTML to get true text length for validation
    const cleanDescription = description.replace(/<[^>]*>?/gm, '').trim();
    if (cleanDescription.length < 10) {
      toast.error("Description must be at least 10 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const submitData = new FormData();
    submitData.append("title", formData.title);
    submitData.append("description", description);
    submitData.append("tags", formData.tags);
    
    if (imageFile) {
      submitData.append("image", imageFile);
    } else {
      submitData.append("image", formData.image);
    }

    const result = await createBlog(submitData);
    if (result) {
      resetForm();
      navigate("/blogs");
    }
  };
  return (
    <div className="min-h-screen py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-gray-950 relative overflow-hidden">
      {/* Subtle ambient blobs for the glass effect to blur against */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #6366f1, transparent)" }}
        />
        <div
          className="absolute top-1/3 -right-32 w-80 h-80 rounded-full opacity-15 blur-3xl"
          style={{ background: "radial-gradient(circle, #8b5cf6, transparent)" }}
        />
        <div
          className="absolute bottom-20 left-1/3 w-72 h-72 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #3b82f6, transparent)" }}
        />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-4 font-['Playfair_Display']">
            Post Your Blog
          </h1>
          <p className="text-gray-400 font-['Poppins']">Share your inspiring stories, tips, and insights with the world</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl transition-shadow duration-300 border border-white/10 overflow-hidden"
        >
          {/* Decorative Top Border */}
          <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

          <div className="p-6 sm:p-8 md:p-10">
            {/* Title Field */}
            <div className="mb-7 md:mb-8">
              <Label
                htmlFor="title"
                className="block text-sm md:text-base font-semibold text-gray-200 mb-3 font-['Poppins']"
              >
                Blog Title
              </Label>
              <Input
                id="title"
                type="text"
                className="w-full px-4 md:px-5 py-3 md:py-3.5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 bg-white/5 hover:border-white/20 transition-all duration-200 text-white placeholder-gray-500 text-sm md:text-base"
                placeholder="Enter an engaging blog title"
                value={formData.title}
                name="title"
                onChange={handleChange}
              />
            </div>

            {/* Description Field */}
            <div className="mb-8 md:mb-10 text-white">
              <Label
                htmlFor="description"
                className="block text-sm md:text-base font-semibold text-gray-200 mb-3 font-['Poppins']"
              >
                Blog Description
              </Label>
              <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all duration-200">
                <ReactQuill
                  theme="snow"
                  value={description}
                  onChange={setDescription}
                  className="text-white placeholder-gray-500"
                  style={{ minHeight: "220px" }}
                />
              </div>
            </div>

            {/* Tags Field */}
            <div className="mb-7 md:mb-8">
              <Label
                htmlFor="tags"
                className="block text-sm md:text-base font-semibold text-gray-200 mb-3 font-['Poppins']"
              >
                Tags (Comma Separated)
              </Label>
              <Input
                id="tags"
                type="text"
                className="w-full px-4 md:px-5 py-3 md:py-3.5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 bg-white/5 hover:border-white/20 transition-all duration-200 text-white placeholder-gray-500 text-sm md:text-base"
                placeholder="e.g. technology, travel, lifestyle"
                value={formData.tags}
                name="tags"
                onChange={handleChange}
              />
            </div>

            {/* Image Field */}
            <div className="mb-8 md:mb-10">
              <Label className="block text-sm md:text-base font-semibold text-gray-200 mb-3 font-['Poppins']">
                Cover Image
              </Label>
              
              <div className="flex flex-col gap-4">
                {/* Upload Zone */}
                <div className="relative group">
                  <input
                    type="file"
                    id="imageFile"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    onChange={(e) => {
                      setImageFile(e.target.files[0]);
                      // Clear manual URL if they upload a file
                      if (e.target.files[0] && formData.image) {
                        handleChange({ target: { name: 'image', value: '' } });
                      }
                    }}
                  />
                  <div className={`w-full p-8 rounded-xl border-2 border-dashed flex flex-col items-center justify-center transition-all duration-200 ease-in-out
                    ${imageFile ? 'border-green-500/50 bg-green-500/5' : 'border-blue-500/30 bg-blue-500/5 group-hover:bg-blue-500/10 group-hover:border-blue-500/50'}
                  `}>
                    {imageFile ? (
                      <div className="flex items-center gap-3 text-green-400">
                        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                          <ImagePlus className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col text-left">
                          <span className="font-semibold text-sm truncate max-w-[200px] sm:max-w-[300px]">
                            {imageFile.name}
                          </span>
                          <span className="text-xs opacity-70">
                            {(imageFile.size / 1024 / 1024).toFixed(2)} MB • Ready to upload
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center text-blue-300">
                        <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                          <ImagePlus className="w-6 h-6" />
                        </div>
                        <span className="font-semibold text-sm sm:text-base mb-1">Click to browse or drag and drop</span>
                        <span className="text-xs text-blue-300/60 font-['Poppins']">SVG, PNG, JPG or GIF (max. 5MB)</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex-1 border-t border-white/10"></div>
                  <span className="text-gray-400 text-xs sm:text-sm font-['Poppins']">OR Provide URL</span>
                  <div className="flex-1 border-t border-white/10"></div>
                </div>

                {/* URL Input */}
                <div className="relative">
                  <Input
                    type="text"
                    id="imageLink"
                    className="w-full px-4 md:px-5 py-3 md:py-3.5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 bg-white/5 hover:border-white/20 transition-all duration-200 text-white placeholder-gray-500 text-sm md:text-base pr-10"
                    placeholder="https://example.com/image.jpg"
                    value={formData.image}
                    name="image"
                    onChange={handleChange}
                    disabled={!!imageFile}
                  />
                  {formData.image && !imageFile && (
                    <button
                      type="button"
                      onClick={() => handleChange({ target: { name: 'image', value: '' } })}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Button
                type="button"
                onClick={() => navigate("/blogs")}
                className="flex-1 px-6 py-3 md:py-3.5 border border-white/20 text-gray-300 bg-transparent font-semibold rounded-xl hover:bg-white/5 transition-all duration-200 text-sm md:text-base hover:cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                onClick={(e) => handleSubmit(e)}
                disabled={isLoading}
                className="flex-1 px-6 py-3 md:py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-xl active:scale-95 transition-all duration-200 shadow-md shadow-blue-900/20 md:text-base disabled:opacity-50 hover:cursor-pointer"
              >
                {isLoading ? "Publishing..." : "Post Blog"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
