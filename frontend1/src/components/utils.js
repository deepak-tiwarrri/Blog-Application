import { makeStyles } from "@mui/styles";
import { createContext } from "react";
const FRONTEND_PORT = 8000;
export const BLOG_URL = `http://localhost:${FRONTEND_PORT}/api/blog`;
export const USER_URL = `http://localhost:${FRONTEND_PORT}/api/user`;
export const useStyles = makeStyles({
  font: {
    fontFamily: "Geist,sans-serif !important",
  },
});

export const AuthContext = createContext();
