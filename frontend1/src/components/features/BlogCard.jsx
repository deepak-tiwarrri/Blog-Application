import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// removed glass effect for simpler card


const BlogCard = ({ blog }) => {
  // Use reading time from backend, or calculate as fallback
  const readingTime = blog.readingTime || Math.ceil(
    (blog.description?.split(/\s+/).length || 0) / 200
  );

  return (
    <div className="flex flex-col h-full overflow-hidden hover:cursor-pointer bg-primary/10 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
      {/* Fixed image dimensions: 16:9 aspect ratio */}
      <div className="relative w-full pt-[56.25%] bg-primary/20 overflow-hidden">
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
            className="text-lg md:text-xl font-semibold text-primary-foreground mb-2 line-clamp-2"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: "700",
              letterSpacing: "0.5px",
            }}
          >
            {blog.title}
          </h3>
          <p
            className="text-primary-foreground/80 mb-3 line-clamp-2"
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
            className="flex items-center justify-between text-xs text-primary-foreground/70"
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
              <span className="text-primary-foreground/70">
                {readingTime} min read
              </span>
            )}
          </div>

          <Link
            to={`/blogs/${blog._id}`}
            className="text-primary-foreground hover:underline font-medium transition-colors inline-block hover:cursor-pointer"
            style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "500" }}
          >
            Read More →
          </Link>
        </div>
      </div>
    </div>
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
