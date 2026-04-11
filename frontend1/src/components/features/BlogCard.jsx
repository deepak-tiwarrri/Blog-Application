import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import DOMPurify from 'dompurify';


const BlogCard = ({ blog }) => {
  const cleanDescription = DOMPurify.sanitize(blog.description, { ALLOWED_TAGS: [] });
  const readingTime = blog.readingTime || Math.ceil(
    (cleanDescription?.split(/\s+/).length || 0) / 200
  );

  return (
    <div className="group flex flex-col h-full overflow-hidden bg-white/5 backdrop-blur-xl rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-blue-900/20 border border-white/10 hover:border-white/30 transition-all duration-300 hover:-translate-y-1">
      {/* Fixed image dimensions: 16:9 aspect ratio */}
      <div className="relative w-full pt-[56.25%] bg-white/10 overflow-hidden">
        <img
          src={blog.image}
          onError={(e) => {
            e.target.src = "/assets/dish.jpg";
          }}
          alt={blog.title}
          className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent opacity-60"></div>
      </div>

      <div
        className="p-4 flex-1 flex flex-col justify-between"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        <div>
          <h3
            className="text-lg md:text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors duration-300"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {blog.title}
          </h3>
          <p
            className="text-gray-300 mb-4 line-clamp-2"
            style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.95rem" }}
            dangerouslySetInnerHTML={{ __html: cleanDescription }}
          />
        </div>

        <div className="space-y-4 mt-auto border-t border-white/10 pt-4">
          <div
            className="flex items-center justify-between text-xs text-gray-400"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-300">{blog.user?.name || "Unknown"}</span>
              {blog.createdAt && (
                <>
                  <span className="text-gray-600">•</span>
                  <span>
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      month: "short", day: "numeric", year: "numeric",
                    })}
                  </span>
                </>
              )}
            </div>
            {readingTime && (
              <span className="bg-white/10 px-2 py-1 rounded-md text-gray-300">
                {readingTime} min
              </span>
            )}
          </div>

          <Link
            to={`/blogs/${blog._id}`}
            className="inline-flex w-full justify-center items-center gap-2 py-2 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-medium transition-all duration-300 hover:text-blue-400 hover:border-blue-400/50"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Read Full Article →
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
