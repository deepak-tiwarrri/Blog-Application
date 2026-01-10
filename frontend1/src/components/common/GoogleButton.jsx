import GoogleIcon from "../../assets/google-icon.svg?url"
const handleClick = () => {
  // Trigger the actual GoogleLogin component
  const googleLoginButton = document.querySelector('[role="button"]');
  if (googleLoginButton) googleLoginButton.click();
};


export const GoogleButton = ({ children }) => (
  <button
    type="button"
    onClick={() => handleClick()}
    className="w-full py-3 px-6 border-2 border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-gray-700 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-3 shadow-sm hover:shadow-md hover:cursor-pointer"
    style={{ fontFamily: "Poppins, sans-serif" }}
  >
    {/* Google Icon */}
    <img src={GoogleIcon} alt="Google" width={20} height={20} />
    {children}
  </button>
);
