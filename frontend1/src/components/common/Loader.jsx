import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Loader = ({ fullScreen = true, size = 50 }) => {
  if (fullScreen) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(to bottom right, #f9fafb, #ffffff, #f9fafb)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress size={size} sx={{ color: "#3b82f6" }} />
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "400px",
      }}
    >
      <CircularProgress size={size} sx={{ color: "#3b82f6" }} />
    </Box>
  );
};

export default Loader;
