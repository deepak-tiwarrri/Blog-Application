import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "@/store";
import { toast } from "sonner";
import { getSocialMediaIcon } from "@/lib/utils.jsx"
import { useScrollToTop } from "@/hooks/useScrollToTop.js";
import { INITIAL_PROFILE_STATE } from "@/constants/profile.js";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Button } from "@/components/ui/button";
import EditProfileSection from "@/components/features/EditProfileSection";
import {
  MapPin,
  Phone,
  Globe,
  LogOut,
  Edit2,
  Lock,
  Calendar,
} from "lucide-react";
import { useUserProfile } from "@/hooks/useBlogAPI";

const Profile = () => {
  // Hooks
  useScrollToTop();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const user = useSelector((state) => state.auth?.user);

  // State Management
  const [isEditing, setIsEditing] = React.useState(false);
  const { profile, loading, saving, fetchProfile, updateProfile } = useUserProfile(userId);
  const [profileData, setProfileData] = React.useState(INITIAL_PROFILE_STATE);

  // Fetch profile data on component mount
  useEffect(() => {
    if (!userId) {
      toast.error("Please login to view profile");
      navigate("/login", { replace: true });
      return;
    }
    fetchProfile();
  }, [userId, navigate]);



  // Update local state when profile is fetched
  useEffect(() => {
    if (profile) {
      setProfileData({
        name: profile.name || "",
        email: profile.email || "",
        bio: profile.bio || "",
        location: profile.location || "",
        phone: profile.phone || "",
        website: profile.website || "",
        profilePicture: profile.profilePicture || "",
        socialMedia: profile.socialMedia || {
          twitter: "",
          linkedin: "",
          instagram: "",
          github: "",
        },
        createdAt: profile.createdAt || "",
      });
    }
  }, [profile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSocialMediaChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [name]: value,
      },
    }));
  };

  const handleSaveProfile = async () => {
    try {
      if (!profileData.name.trim()) {
        toast.error("Name is required");
        return;
      }

      const updatedUser = await updateProfile(profileData);
      if (updatedUser) {
        dispatch(authActions.updateUser(updatedUser));
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const handleSignOut = () => {
    dispatch(authActions.logout());
    toast.success("Signed out successfully");
    navigate("/login");
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    fetchProfile();
  };



  const getSocialMediaUrl = (platform, handle) => {
    if (!handle) return "";
    const cleanHandle = handle.replace("@", "");
    const urls = {
      twitter: `https://twitter.com/${cleanHandle}`,
      linkedin: handle.startsWith("http")
        ? handle
        : `https://linkedin.com/in/${cleanHandle}`,
      instagram: `https://instagram.com/${cleanHandle}`,
      github: `https://github.com/${cleanHandle}`,
    };
    return urls[platform] || "";
  };

  const getSocialMediaColor = (platform) => {
    const colors = {
      twitter: "bg-blue-400 hover:bg-blue-500",
      linkedin: "bg-blue-700 hover:bg-blue-800",
      instagram: "bg-pink-500 hover:bg-pink-600",
      github: "bg-gray-800 hover:bg-gray-900",
    };
    return colors[platform] || "bg-gray-600 hover:bg-gray-700";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 md:p-10 border 
        border-white/20 hover:border-white/30 transition-all duration-300">
          {/* Header with Title and Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h1
              className="text-3xl font-bold text-white"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Profile
            </h1>
            {!isEditing && (
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500/40 hover:bg-blue-500/60 text-white rounded-xl transition-all duration-300 hover:cursor-pointer font-medium backdrop-blur-md border border-blue-400/30 hover:border-blue-400/50"
                >
                  <Tooltip title="Edit Profile">
                    <IconButton>
                      <Edit2 size={18} />
                    </IconButton>
                  </Tooltip>
                </Button>
                {user?.authMethod === "email" && (
                  <Button
                    onClick={() => navigate("/change-password")}
                    className="flex items-center gap-2 px-4 py-2 bg-yellow-500/40 hover:bg-yellow-500/60 text-white rounded-xl transition-all duration-300 hover:cursor-pointer font-medium backdrop-blur-md border border-yellow-400/30 hover:border-yellow-400/50"
                  >
                    <Tooltip title="Change Password">
                      <IconButton>
                        <Lock size={18} />
                      </IconButton>
                    </Tooltip>
                  </Button>
                )}
                <Button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500/40 hover:bg-red-500/60 text-white rounded-xl transition-all duration-300 hover:cursor-pointer font-medium backdrop-blur-md border border-red-400/30 hover:border-red-400/50"
                >
                  <Tooltip title="Sign Out">
                    <IconButton>
                      <LogOut size={18} />
                    </IconButton>
                  </Tooltip>
                </Button>
              </div>
            )}
          </div>

          {/* Main Content - Left Image, Right Details */}
          {!isEditing && (
            <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
              {/* Profile Picture Section - Left Side */}
              <div className="flex-shrink-0">
                <div className="relative group cursor-pointer hover:scale-105 transition-transform duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-300"></div>
                  {profileData.profilePicture ? (
                    <img 
                      src={profileData.profilePicture} 
                      alt="Profile" 
                      className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover shadow-2xl ring-4 ring-white/20 group-hover:ring-white/40 transition-all duration-300"
                    />
                  ) : (
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 flex items-center justify-center text-white text-4xl sm:text-5xl font-bold shadow-2xl ring-4 ring-white/20 group-hover:ring-white/40 transition-all duration-300">
                      {profileData.name
                        ? profileData.name.charAt(0).toUpperCase()
                        : "U"}
                    </div>
                  )}
                </div>
              </div>

              {/* Profile Details - Right Side */}
              <div className="flex-1 min-w-0">
                {/* Name and Email */}
                <div className="mb-6">
                  <h2 
                    className="text-3xl sm:text-4xl font-bold text-white mb-1 tracking-tight"
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    {profileData.name}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-400 font-['Poppins']">
                    {profileData.email}
                  </p>
                </div>

                {/* Bio */}
                {profileData.bio && (
                  <div className="mb-4">
                    <p className="text-gray-200 leading-relaxed text-sm line-clamp-2">
                      {profileData.bio}
                    </p>
                  </div>
                )}

                {/* Info Grid - Compact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  {/* Location */}
                  {profileData.location && (
                    <div className="flex items-start gap-2 bg-white/5 backdrop-blur-md rounded-xl p-3 border border-white/10 hover:border-white/20 transition-all">
                      <MapPin
                        size={16}
                        className="text-blue-300 mt-0.5 flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-gray-400">
                          Location
                        </p>
                        <p className="text-gray-200 text-sm truncate">
                          {profileData.location}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Phone */}
                  {profileData.phone && (
                    <div className="flex items-start gap-2 bg-white/5 backdrop-blur-md rounded-xl p-3 border border-white/10 hover:border-white/20 transition-all">
                      <Phone
                        size={16}
                        className="text-green-300 mt-0.5 flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-gray-400">
                          Phone
                        </p>
                        <p className="text-gray-200 text-sm truncate">
                          {profileData.phone}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Website */}
                  {profileData.website && (
                    <div className="flex items-start gap-2 bg-white/5 backdrop-blur-md rounded-xl p-3 border border-white/10 hover:border-white/20 transition-all sm:col-span-2">
                      <Globe
                        size={16}
                        className="text-purple-300 mt-0.5 flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-gray-400">
                          Website
                        </p>
                        <a
                          href={profileData.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-300 hover:text-blue-200 underline text-sm truncate"
                        >
                          {profileData.website}
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* Member Since */}
                <div className="flex items-center gap-2 pt-3 border-t border-white/10 text-xs text-gray-400">
                  <Calendar size={14} />
                  <span>
                    Member since{" "}
                    {profileData.createdAt
                      ? new Date(profileData.createdAt).toLocaleDateString(
                        "en-GB",
                        { day: "numeric", month: "long", year: "numeric" }
                      )
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Profile Content - Edit/View Mode */}
          <div className="space-y-6">
            {isEditing ? (
              <EditProfileSection
                profileData={profileData}
                saving={saving}
                onInputChange={handleInputChange}
                onSocialMediaChange={handleSocialMediaChange}
                onSave={handleSaveProfile}
                onCancel={handleCancelEdit}
              />
            ) : (
              <>
                {/* Social Media Icons Section */}
                {profileData.socialMedia &&
                  Object.values(profileData.socialMedia).some(
                    (val) => val && val.length > 0
                  ) && (
                    <div className="mt-8 pt-6 border-t border-white/10">
                      <h3 className="text-sm font-semibold text-gray-300 mb-4">
                        Connect
                      </h3>
                      <div className="flex gap-4 flex-wrap">
                        {profileData.socialMedia?.twitter && (
                          <a
                            href={getSocialMediaUrl(
                              "twitter",
                              profileData.socialMedia.twitter
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`w-14 h-14 rounded-full flex items-center justify-center text-white transform transition-all hover:scale-110 hover:shadow-lg ${getSocialMediaColor(
                              "twitter"
                            )} backdrop-blur-md border border-white/20 hover:border-white/40`}
                            title="Twitter"
                          >
                            {getSocialMediaIcon("twitter")}
                          </a>
                        )}
                        {profileData.socialMedia?.linkedin && (
                          <a
                            href={getSocialMediaUrl(
                              "linkedin",
                              profileData.socialMedia.linkedin
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`w-14 h-14 rounded-full flex items-center justify-center text-white transform transition-all hover:scale-110 hover:shadow-lg ${getSocialMediaColor(
                              "linkedin"
                            )} backdrop-blur-md border border-white/20 hover:border-white/40`}
                            title="LinkedIn"
                          >
                            {getSocialMediaIcon("linkedin")}
                          </a>
                        )}
                        {profileData.socialMedia?.instagram && (
                          <a
                            href={getSocialMediaUrl(
                              "instagram",
                              profileData.socialMedia.instagram
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`w-14 h-14 rounded-full flex items-center justify-center text-white transform transition-all hover:scale-110 hover:shadow-lg ${getSocialMediaColor(
                              "instagram"
                            )} backdrop-blur-md border border-white/20 hover:border-white/40`}
                            title="Instagram"
                          >
                            {getSocialMediaIcon("instagram")}
                          </a>
                        )}
                        {profileData.socialMedia?.github && (
                          <a
                            href={getSocialMediaUrl(
                              "github",
                              profileData.socialMedia.github
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`w-14 h-14 rounded-full flex items-center justify-center text-white transform transition-all hover:scale-110 hover:shadow-lg ${getSocialMediaColor(
                              "github"
                            )} backdrop-blur-md border border-white/20 hover:border-white/40`}
                            title="GitHub"
                          >
                            {getSocialMediaIcon("github")}
                          </a>
                        )}
                      </div>
                    </div>
                  )}
              </>
            )}
          </div>
        </div>

        {/* Quick Links */}
        {!isEditing && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => navigate("/myblogs")}
              className="group bg-white/10 backdrop-blur-2xl rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 hover:bg-white/15 hover:shadow-xl hover:cursor-pointer"
            >
              <h3 className="text-white font-semibold text-lg group-hover:text-purple-300 transition-colors">
                My Blogs
              </h3>
              <p className="text-gray-300 text-sm mt-2">
                View and manage your published blogs
              </p>
            </button>
            {/* navigate to blogs for exploring more blogs */}
            <button
              onClick={() => navigate("/blogs")}
              className="group bg-white/10 backdrop-blur-2xl rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 hover:bg-white/15 hover:shadow-xl hover:cursor-pointer"
            >
              <h3 className="text-white font-semibold text-lg group-hover:text-purple-300 transition-colors">
                Explore Blogs
              </h3>
              <p className="text-gray-300 text-sm mt-2">
                Discover stories from the community
              </p>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
