import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <article
      key={blog._id}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all overflow-hidden flex flex-col"
    >
      <img
        src={blog.image}
        onError={(e) => {
          e.target.src = "/assets/dish.jpg";
        }}
        alt={blog.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex-1 flex flex-col justify-between" style={{ fontFamily: "'Poppins', sans-serif" }}>
        <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2" style={{ fontFamily: "'Playfair Display', serif", fontWeight: "700", letterSpacing: "0.5px" }}>
          {blog.title}
        </h3>
        <p className="text-gray-700 mb-3 line-clamp-3" style={{ fontFamily: "'Poppins', sans-serif", lineHeight: "1.6", fontSize: "0.95rem" }}>{blog.description}</p>
        <div className="flex items-center justify-between mt-auto" style={{ fontFamily: "'Poppins', sans-serif" }}>
          <span className="text-sm text-gray-500" style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.875rem", letterSpacing: "0.5px" }}>By {blog.user?.name}</span>
          <Link
            to={`/myblogs/${blog._id}`}
            className="text-blue-500 hover:underline font-medium transition-colors"
            style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "500" }}
          >
            Read More
          </Link>
        </div>
      </div>
    </article>
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
