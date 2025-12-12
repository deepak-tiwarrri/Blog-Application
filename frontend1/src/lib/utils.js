import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import { makeStyles } from "@mui/styles";



export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const useStyles = makeStyles({
  font: {
    fontFamily: "Geist,sans-serif !important",
  },
});

