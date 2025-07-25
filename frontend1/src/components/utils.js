import { makeStyles } from "@mui/styles";
import { createContext } from "react";
export const BLOG_URL = "http://localhost:5000/api/blog";
export const USER_URL = "http://localhost:5000/api/user";
export const useStyles = makeStyles({
  font: {
    fontFamily: "Geist,sans-serif !important",
  },
});

export const AuthContext = createContext();
