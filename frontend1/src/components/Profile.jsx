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
import { Mail, MapPin, Phone, Globe, LogOut, Edit2, Save, X } from "lucide-react";

const Profile = () => {
  useScrollToTop();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const user = useSelector((state) => state.auth?.user);

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    bio: "",
    location: "",
    phone: "",
    website: "",
    profilePicture: "",
  });

  // Fetch profile data on component mount
  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }
    fetchProfile();
  }, [userId]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await userApi.getProfile(userId);
      const userData = response?.data?.user;
      if (userData) {
        setProfileData({
          name: userData.name || "",
          email: userData.email || "",
          bio: userData.bio || "",
          location: userData.location || "",
          phone: userData.phone || "",
          website: userData.website || "",
          profilePicture: userData.profilePicture || "",
        });
      }
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      toast.error("Failed to load profile");
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      setSaving(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error(error?.response?.data?.message || "Failed to update profile");
      setSaving(false);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-gray-100">
          {/* Header with Title and Actions */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "Playfair Display, serif" }}>
              My Profile
            </h1>
            {!isEditing && (
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Edit2 size={18} />
                  Edit
                </button>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <LogOut size={18} />
                  Sign Out
                </button>
              </div>
            )}
          </div>

          {/* Profile Picture Section */}
          {!isEditing && (
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                {profileData.name ? profileData.name.charAt(0).toUpperCase() : "U"}
              </div>
            </div>
          )}

          {/* Profile Content */}
          <div className="space-y-6">
            {isEditing ? (
              // Edit Mode
              <>
                {/* Name */}
                <div>
                  <Label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={profileData.name}
                    onChange={handleInputChange}
                    className="w-full"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email (Read-only) */}
                <div>
                  <Label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profileData.email}
                    disabled
                    className="w-full bg-gray-100 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>

                {/* Bio */}
                <div>
                  <Label htmlFor="bio" className="block text-sm font-semibold text-gray-700 mb-2">
                    Bio
                  </Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={profileData.bio}
                    onChange={handleInputChange}
                    placeholder="Tell us about yourself (max 500 characters)"
                    className="w-full"
                    maxLength={500}
                  />
                  <p className="text-xs text-gray-500 mt-1">{profileData.bio.length}/500</p>
                </div>

                {/* Location */}
                <div>
                  <Label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
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
                    className="w-full"
                  />
                </div>

                {/* Phone */}
                <div>
                  <Label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
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
                    className="w-full"
                  />
                </div>

                {/* Website */}
                <div>
                  <Label htmlFor="website" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
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
                    className="w-full"
                  />
                </div>

                {/* Save and Cancel Buttons */}
                <div className="flex gap-3 pt-6 border-t">
                  <Button
                    onClick={handleSaveProfile}
                    disabled={saving}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
                  >
                    <Save size={18} />
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                  <Button
                    onClick={handleCancelEdit}
                    disabled={saving}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 flex items-center justify-center gap-2"
                  >
                    <X size={18} />
                    Cancel
                  </Button>
                </div>
              </>
            ) : (
              // View Mode
              <>
                {/* Name */}
                <div className="pb-4 border-b">
                  <h2 className="text-2xl font-bold text-gray-900">{profileData.name}</h2>
                  <p className="text-sm text-gray-500 mt-1">{profileData.email}</p>
                </div>

                {/* Bio */}
                {profileData.bio && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">About</h3>
                    <p className="text-gray-600 leading-relaxed">{profileData.bio}</p>
                  </div>
                )}

                {/* Location */}
                {profileData.location && (
                  <div className="flex items-start gap-3">
                    <MapPin size={20} className="text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-gray-700">Location</p>
                      <p className="text-gray-600">{profileData.location}</p>
                    </div>
                  </div>
                )}

                {/* Phone */}
                {profileData.phone && (
                  <div className="flex items-start gap-3">
                    <Phone size={20} className="text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-gray-700">Phone</p>
                      <p className="text-gray-600">{profileData.phone}</p>
                    </div>
                  </div>
                )}

                {/* Website */}
                {profileData.website && (
                  <div className="flex items-start gap-3">
                    <Globe size={20} className="text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-gray-700">Website</p>
                      <a
                        href={profileData.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        {profileData.website}
                      </a>
                    </div>
                  </div>
                )}

                {/* Member Since */}
                <div className="pt-4 border-t text-xs text-gray-500">
                  Member since {new Date().toLocaleDateString()}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Quick Links */}
        {!isEditing && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => navigate("/myblogs")}
              className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-100 text-left"
            >
              <h3 className="font-semibold text-gray-900">My Blogs</h3>
              <p className="text-sm text-gray-600">View and manage your published blogs</p>
            </button>
            <button
              onClick={() => navigate("/blogs")}
              className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-100 text-left"
            >
              <h3 className="font-semibold text-gray-900">Explore Blogs</h3>
              <p className="text-sm text-gray-600">Discover stories from the community</p>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
