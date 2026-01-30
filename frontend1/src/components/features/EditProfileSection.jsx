import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
   MapPin,
   Phone,
   Globe,
   Save,
   X,
   Twitter,
   Linkedin,
   Github,
   Instagram,
} from "lucide-react";

const SOCIAL_PLATFORMS = [
   { name: "twitter", label: "Twitter", icon: Twitter, placeholder: "@yourhandle" },
   { name: "linkedin", label: "LinkedIn", icon: Linkedin, placeholder: "your-profile-url" },
   { name: "instagram", label: "Instagram", icon: Instagram, placeholder: "@yourhandle" },
   { name: "github", label: "GitHub", icon: Github, placeholder: "your-username" },
];

const EditProfileSection = ({
   profileData,
   saving,
   onInputChange,
   onSocialMediaChange,
   onSave,
   onCancel,
}) => {
   return (
      <div className="space-y-5">
         {/* Name */}
         <div>
            <Label htmlFor="name" className="text-xs font-semibold text-gray-200 mb-2 block">
               Full Name
            </Label>
            <Input
               id="name"
               name="name"
               type="text"
               value={profileData.name}
               onChange={onInputChange}
               className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 rounded-lg focus:border-blue-400/50 focus:outline-none transition-all text-sm py-2 px-3"
               placeholder="Enter your full name"
            />
         </div>

         {/* Email (Read-only) */}
         <div>
            <Label htmlFor="email" className="text-xs font-semibold text-gray-200 mb-2 block">
               Email Address
            </Label>
            <Input
               id="email"
               name="email"
               type="email"
               value={profileData.email}
               disabled
               className="w-full bg-white/5 backdrop-blur-md border border-white/10 text-gray-400 rounded-lg cursor-not-allowed text-sm py-2 px-3"
            />
            <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
         </div>

         {/* Bio */}
         <div>
            <Label htmlFor="bio" className="text-xs font-semibold text-gray-200 mb-2 block">
               Bio
            </Label>
            <Textarea
               id="bio"
               name="bio"
               value={profileData.bio}
               onChange={onInputChange}
               placeholder="Tell us about yourself (max 500 characters)"
               className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 rounded-lg focus:border-blue-400/50 focus:outline-none transition-all text-sm py-2 px-3"
               maxLength={500}
               rows={3}
            />
            <p className="text-xs text-gray-400 mt-1">
               {profileData.bio?.length || 0}/500
            </p>
         </div>

         {/* Location */}
         <div>
            <Label
               htmlFor="location"
               className="text-xs font-semibold text-gray-200 mb-2 flex items-center gap-1.5"
            >
               <MapPin size={14} />
               Location
            </Label>
            <Input
               id="location"
               name="location"
               type="text"
               value={profileData.location}
               onChange={onInputChange}
               placeholder="City, Country"
               className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 rounded-lg focus:border-blue-400/50 focus:outline-none transition-all text-sm py-2 px-3"
            />
         </div>

         {/* Phone */}
         <div>
            <Label
               htmlFor="phone"
               className="text-xs font-semibold text-gray-200 mb-2 flex items-center gap-1.5"
            >
               <Phone size={14} />
               Phone Number
            </Label>
            <Input
               id="phone"
               name="phone"
               type="tel"
               value={profileData.phone}
               onChange={onInputChange}
               placeholder="Your phone number"
               className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 rounded-lg focus:border-blue-400/50 focus:outline-none transition-all text-sm py-2 px-3"
            />
         </div>

         {/* Website */}
         <div>
            <Label
               htmlFor="website"
               className="text-xs font-semibold text-gray-200 mb-2 flex items-center gap-1.5"
            >
               <Globe size={14} />
               Website
            </Label>
            <Input
               id="website"
               name="website"
               type="url"
               value={profileData.website}
               onChange={onInputChange}
               placeholder="https://yourwebsite.com"
               className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 rounded-lg focus:border-blue-400/50 focus:outline-none transition-all text-sm py-2 px-3"
            />
         </div>

         {/* Social Media Section */}
         <div className="border-t border-white/10 pt-4 mt-4">
            <h3 className="text-sm font-semibold text-white mb-3">Social Media Handles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
               {SOCIAL_PLATFORMS.map(({ name, label, placeholder }) => (
                  <div key={name}>
                     <Label
                        htmlFor={name}
                        className="text-xs font-semibold text-gray-200 mb-1.5 block"
                     >
                        {label}
                     </Label>
                     <Input
                        id={name}
                        name={name}
                        type="text"
                        value={profileData.socialMedia?.[name] || ""}
                        onChange={onSocialMediaChange}
                        placeholder={placeholder}
                        className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 rounded-lg focus:border-blue-400/50 focus:outline-none transition-all text-sm py-2 px-3"
                     />
                  </div>
               ))}
            </div>
         </div>

         {/* Save and Cancel Buttons */}
         <div className="flex gap-2 pt-4 border-t border-white/10">
            <Button
               onClick={onSave}
               disabled={saving}
               className="flex-1 bg-blue-500/40 hover:bg-blue-500/60 text-white flex items-center justify-center gap-1.5 rounded-lg backdrop-blur-md border border-blue-400/30 hover:border-blue-400/50 transition-all hover:cursor-pointer text-sm py-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
               <Save size={16} />
               {saving ? "Saving..." : "Save"}
            </Button>
            <Button
               onClick={onCancel}
               disabled={saving}
               className="flex-1 bg-gray-400/20 hover:bg-gray-400/30 text-white flex items-center justify-center gap-1.5 rounded-lg backdrop-blur-md border border-gray-300/20 hover:border-gray-300/40 transition-all hover:cursor-pointer text-sm py-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
               <X size={16} />
               Cancel
            </Button>
         </div>
      </div>
   );
};

export default EditProfileSection;
