import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import ShareIcon from "@mui/icons-material/Share";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";

const cards = Array.from({ length: 3 }, (_, index) => ({
  id: "_dheehsls",
  title: `Travel Blog ${index + 1}`,
  description:
    "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
  image: "https://source.unsplash.com/800x600/?travel",
  subheader: "Sep 16 2024",
}));
const Home = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <div>
      <section className="hero bg-gray-100  py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold mb-4">
            Create a blog worth sharing
          </h2>
          <p className="text-xl mb-4">
            Explore travel adventures,uncover global cuisines<br></br> and share
            your flavourful journey.
          </p>
          <button className="bg-blue-500 text-white px-6 py-3 text-center rounded-full ">
            <Link to="/signup"> Get Started</Link>
          </button>
        </div>
      </section>

      <section className="flex justify-center items-center gap-8 mb-8 mt-4">
        {cards.map((card) => (
          <Card sx={{ maxWidth: 345 }} className="shadow-md">
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  R
                </Avatar>
              }
              title={
                <Typography className="text-xl text-gray-900 font-bold">
                  {card.title}
                </Typography>
              }
              subheader={
                <Typography className="text-sm text-gray-500">
                  {card.subheader}
                </Typography>
              }
            />
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
              <img src={card.image} alt={card.title} className=" p-4 rounded-md w-full  object-cover h-full"/>
            </div>
            <CardContent>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {card.description}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share" className="bg-gray-900">
                <ShareIcon />
              </IconButton>
            </CardActions>
          </Card>
        ))}
      </section>

      {/* <section className="blogs py-10">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-6">Latest Blogs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="blog-card bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-2">Blog Title</h3>
              <p className="text-gray-700">Blog description goes here...</p>
              <button className="mt-4 text-blue-500">Read More</button>
            </div>
          </div>
        </div>
      </section> */}
      <section className="login-prompt py-10 bg-gray-200">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Start Your Own Blog</h2>
          <p className="text-lg mb-6">
            Login to create and share your own stories.
          </p>
          <Link to="/login">
            <button className="bg-green-500 text-white px-6 py-3 rounded-full">
              Login
            </button>
          </Link>
        </div>
      </section>
    </div>
    //-
  );
};

export default Home;
