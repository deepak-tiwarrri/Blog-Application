import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import { makeStyles } from "@mui/styles";
import { Github, Instagram, Linkedin, Twitter } from "lucide-react";


export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const useStyles = makeStyles({
  font: {
    fontFamily: "Geist,sans-serif !important",
  },
});

// ==================== Utility Functions ====================
export const getSocialMediaIcon = (platform) => {
  const iconProps = { size: 20, className: "text-white" };
  const iconMap = {
    twitter: Twitter,
    linkedin: Linkedin,
    instagram: Instagram,
    github: Github,
  };
  const Icon = iconMap[platform];
  return Icon ? <Icon {...iconProps} /> : null;
};

