import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userApi } from "@/api";
import { authActions } from "@/store";
import { toast } from "sonner";
import { useScrollToTop } from "@/hooks/useScrollToTop.js";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  MapPin,
  Phone,
  Globe,
  LogOut,
  Edit2,
  Save,
  X,
  Lock,
  Twitter,
  Linkedin,
  Github,
  Instagram,
  Calendar,
} from "lucide-react";

export const INITIAL_PROFILE_STATE = {
  name: "",
  email: "",
  bio: "",
  location: "",
  phone: "",
  website: "",
  profilePicture: "",
  socialMedia: {
    twitter: "",
    linkedin: "",
    instagram: "",
    github: "",
  },
};

const Profile = () => {
  // Hooks
  useScrollToTop();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const user = useSelector((state) => state.auth?.user);

  // State Management
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profileData, setProfileData] = useState(INITIAL_PROFILE_STATE);

  // Fetch profile data on component mount
  useEffect(() => {
    if (!userId) {
      toast.error("Please login to view profile");
      navigate("/login", { replace: true });
      return;
    }
    fetchProfile();
  }, [userId, navigate]);

  // ==================== API Calls ====================
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await userApi.getProfile(userId);
      const userData = response?.data?.user;
      console.log("Fetched user data:", userData);
      if (userData) {
        setProfileData({
          name: userData.name || "",
          email: userData.email || "",
          bio: userData.bio || "",
          location: userData.location || "",
          phone: userData.phone || "",
          website: userData.website || "",
          profilePicture: userData.profilePicture || "",
          socialMedia: userData.socialMedia || {
            twitter: "",
            linkedin: "",
            instagram: "",
            github: "",
          },
          createdAt: userData.createdAt || "",
        });
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      if (!profileData.name.trim()) {
        toast.error("Name is required");
        return;
      }

      setSaving(true);
      const response = await userApi.updateProfile(userId, profileData);

      if (response?.data?.user) {
        dispatch(authActions.updateUser(response.data.user));
        toast.success("Profile updated successfully!");
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error(error?.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  // ==================== Event Handlers ====================
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

  const handleSignOut = () => {
    dispatch(authActions.logout());
    toast.success("Signed out successfully");
    navigate("/login");
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    fetchProfile();
  };

  // ==================== Utility Functions ====================
  const getSocialMediaIcon = (platform) => {
    const iconProps = { size: 20, className: "text-white" };
    const iconMap = {
      twitter: <Twitter {...iconProps} />,
      linkedin: <Linkedin {...iconProps} />,
      instagram: <Instagram {...iconProps} />,
      github: <Github {...iconProps} />,
    };
    return iconMap[platform] || null;
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
        {/* Profile Card - Glass Morphism */}
        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 md:p-10 border border-white/20 hover:border-white/30 transition-all duration-300">
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
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500/40 hover:bg-blue-500/60 text-white rounded-xl transition-all duration-300 hover:cursor-pointer font-medium backdrop-blur-md border border-blue-400/30 hover:border-blue-400/50"
                >
                  <Edit2 size={18} />
                  Edit Profile
                </button>
                {user?.authMethod === "email" && (
                <button
                  onClick={() => navigate("/change-password")}
                  className="flex items-center gap-2 px-4 py-2 bg-yellow-500/40 hover:bg-yellow-500/60 text-white rounded-xl transition-all duration-300 hover:cursor-pointer font-medium backdrop-blur-md border border-yellow-400/30 hover:border-yellow-400/50"
                >
                  <Lock size={18} />
                  Change Password
                </button>
                )}
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500/40 hover:bg-red-500/60 text-white rounded-xl transition-all duration-300 hover:cursor-pointer font-medium backdrop-blur-md border border-red-400/30 hover:border-red-400/50"
                >
                  <LogOut size={18} />
                  Sign Out
                </button>
              </div>
            )}
          </div>

          {/* Main Content - Left Image, Right Details */}
          {!isEditing && (
            <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
              {/* Profile Picture Section - Left Side */}
              <div className="flex-shrink-0">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
                  <div className="relative w-40 h-40 rounded-3xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white text-7xl font-bold shadow-2xl ring-4 ring-white/20 hover:ring-white/40 transition-all duration-300">
                    {profileData.name
                      ? profileData.name.charAt(0).toUpperCase()
                      : "U"}
                  </div>
                </div>
              </div>

              {/* Profile Details - Right Side */}
              <div className="flex-1 min-w-0">
                {/* Name and Email */}
                <div className="mb-4">
                  <h2 className="text-3xl font-bold text-white">
                    {profileData.name}
                  </h2>
                  <p className="text-sm text-gray-300 mt-1">
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
              // Edit Mode
              <>
                {/* Name */}
                <div>
                  <Label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-200 mb-2"
                  >
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={profileData.name}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 rounded-xl focus:border-blue-400/50 focus:outline-none transition-all"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email (Read-only) */}
                <div>
                  <Label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-200 mb-2"
                  >
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profileData.email}
                    disabled
                    className="w-full bg-white/5 backdrop-blur-md border border-white/10 text-gray-400 rounded-xl cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Email cannot be changed
                  </p>
                </div>

                {/* Bio */}
                <div>
                  <Label
                    htmlFor="bio"
                    className="block text-sm font-semibold text-gray-200 mb-2"
                  >
                    Bio
                  </Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={profileData.bio}
                    onChange={handleInputChange}
                    placeholder="Tell us about yourself (max 500 characters)"
                    className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 rounded-xl focus:border-blue-400/50 focus:outline-none transition-all"
                    maxLength={500}
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    {profileData.bio.length}/500
                  </p>
                </div>

                {/* Location */}
                <div>
                  <Label
                    htmlFor="location"
                    className="text-sm font-semibold text-gray-200 mb-2 flex items-center gap-2"
                  >
                    <MapPin size={16} />
                    Location
                  </Label>
                  <Input
                    id="location"
                    name="location"
                    type="text"
                    value={profileData.location}
                    onChange={handleInputChange}
                    placeholder="City, Country"
                    className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 rounded-xl focus:border-blue-400/50 focus:outline-none transition-all"
                  />
                </div>

                {/* Phone */}
                <div>
                  <Label
                    htmlFor="phone"
                    className="text-sm font-semibold text-gray-200 mb-2 flex items-center gap-2"
                  >
                    <Phone size={16} />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    placeholder="Your phone number"
                    className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 rounded-xl focus:border-blue-400/50 focus:outline-none transition-all"
                  />
                </div>

                {/* Website */}
                <div>
                  <Label
                    htmlFor="website"
                    className="text-sm font-semibold text-gray-200 mb-2 flex items-center gap-2"
                  >
                    <Globe size={16} />
                    Website
                  </Label>
                  <Input
                    id="website"
                    name="website"
                    type="url"
                    value={profileData.website}
                    onChange={handleInputChange}
                    placeholder="https://yourwebsite.com"
                    className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 rounded-xl focus:border-blue-400/50 focus:outline-none transition-all"
                  />
                </div>

                {/* Social Media Section */}
                <div className="border-t border-white/10 pt-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Social Media Handles
                  </h3>

                  {/* Twitter */}
                  <div className="mb-4">
                    <Label
                      htmlFor="twitter"
                      className="text-sm font-semibold text-gray-200 mb-2"
                    >
                      Twitter
                    </Label>
                    <Input
                      id="twitter"
                      name="twitter"
                      type="text"
                      value={profileData.socialMedia?.twitter || ""}
                      onChange={handleSocialMediaChange}
                      placeholder="@yourhandle"
                      className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 rounded-xl focus:border-blue-400/50 focus:outline-none transition-all"
                    />
                  </div>

                  {/* LinkedIn */}
                  <div className="mb-4">
                    <Label
                      htmlFor="linkedin"
                      className="text-sm font-semibold text-gray-200 mb-2"
                    >
                      LinkedIn
                    </Label>
                    <Input
                      id="linkedin"
                      name="linkedin"
                      type="text"
                      value={profileData.socialMedia?.linkedin || ""}
                      onChange={handleSocialMediaChange}
                      placeholder="your-profile-url"
                      className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 rounded-xl focus:border-blue-400/50 focus:outline-none transition-all"
                    />
                  </div>

                  {/* Instagram */}
                  <div className="mb-4">
                    <Label
                      htmlFor="instagram"
                      className="text-sm font-semibold text-gray-200 mb-2"
                    >
                      Instagram
                    </Label>
                    <Input
                      id="instagram"
                      name="instagram"
                      type="text"
                      value={profileData.socialMedia?.instagram || ""}
                      onChange={handleSocialMediaChange}
                      placeholder="@yourhandle"
                      className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 rounded-xl focus:border-blue-400/50 focus:outline-none transition-all"
                    />
                  </div>

                  {/* GitHub */}
                  <div>
                    <Label
                      htmlFor="github"
                      className="text-sm font-semibold text-gray-200 mb-2"
                    >
                      GitHub
                    </Label>
                    <Input
                      id="github"
                      name="github"
                      type="text"
                      value={profileData.socialMedia?.github || ""}
                      onChange={handleSocialMediaChange}
                      placeholder="your-username"
                      className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 rounded-xl focus:border-blue-400/50 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Save and Cancel Buttons */}
                <div className="flex gap-3 pt-6 border-t border-white/10">
                  <Button
                    onClick={handleSaveProfile}
                    disabled={saving}
                    className="flex-1 bg-blue-500/40 hover:bg-blue-500/60 text-white flex items-center justify-center gap-2 rounded-xl backdrop-blur-md border border-blue-400/30 hover:border-blue-400/50 transition-all"
                  >
                    <Save size={18} />
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                  <Button
                    onClick={handleCancelEdit}
                    disabled={saving}
                    className="flex-1 bg-gray-400/20 hover:bg-gray-400/30 text-white flex items-center justify-center gap-2 rounded-xl backdrop-blur-md border border-gray-300/20 hover:border-gray-300/40 transition-all"
                  >
                    <X size={18} />
                    Cancel
                  </Button>
                </div>
              </>
            ) : (
              // View Mode
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
