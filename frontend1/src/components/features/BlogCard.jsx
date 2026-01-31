import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import GlassCard from "../common/GlassCard";

const BlogCard = ({ blog }) => {
  // Use reading time from backend, or calculate as fallback
  const readingTime = blog.readingTime || Math.ceil(
    (blog.description?.split(/\s+/).length || 0) / 200
  );

  return (
    <GlassCard
      className="flex flex-col h-full overflow-hidden hover:cursor-pointer"
      onClick={() => { }} // Pass onClick if needed or keep link wrapping. Wait, BlogCard uses Link inside. but the top level article had onClick? No, it has key and class.
    >
      {/* Fixed image dimensions: 16:9 aspect ratio */}
      <div className="relative w-full pt-[56.25%] bg-gray-200 overflow-hidden">
        <img
          src={blog.image}
          onError={(e) => {
            e.target.src = "/assets/dish.jpg";
          }}
          alt={blog.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div
        className="p-4 flex-1 flex flex-col justify-between"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        <div>
          <h3
            className="text-lg md:text-xl font-semibold text-gray-900 mb-2 line-clamp-2"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: "700",
              letterSpacing: "0.5px",
            }}
          >
            {blog.title}
          </h3>
          <p
            className="text-gray-700 mb-3 line-clamp-2"
            style={{
              fontFamily: "'Poppins', sans-serif",
              lineHeight: "1.6",
              fontSize: "0.95rem",
            }}
          >
            {blog.description}
          </p>
        </div>

        <div className="space-y-3">
          {/* Author, Date, and Reading Time */}
          <div
            className="flex items-center justify-between text-xs text-gray-500"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            <div className="flex items-center gap-2">
              <span>{blog.user?.name || "Unknown"}</span>
              {blog.createdAt && (
                <>
                  <span>•</span>
                  <span>
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </>
              )}
            </div>
            {readingTime && (
              <span className="text-gray-500">
                {readingTime} min read
              </span>
            )}
          </div>

          <Link
            to={`/blogs/${blog._id}`}
            className="text-blue-500 hover:underline font-medium transition-colors inline-block hover:cursor-pointer"
            style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "500" }}
          >
            Read More →
          </Link>
        </div>
      </div>
    </GlassCard>
  );
};

export default BlogCard;

BlogCard.propTypes = {
  blog: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    user: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
};
