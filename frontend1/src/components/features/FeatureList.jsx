import { ArrowRight } from "lucide-react";
import React from "react";

const FeatureList = () => {
  return (
    <div className="space-y-4">
      {[
        {
          title: "Write & Publish",
          desc: "Create beautiful blog posts in minutes",
        },
        {
          title: "Connect",
          desc: "Build your audience and engage with readers",
        },
        {
          title: "Share",
          desc: "Inspire others with your unique perspective",
        },
      ].map((feature, idx) => (
        <div key={idx} className="flex items-start gap-4 group">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mt-1">
            <ArrowRight size={20} className="text-white" />
          </div>
          <div>
            <h3
              className="font-semibold text-gray-900"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {feature.title}
            </h3>
            <p
              className="text-sm text-gray-600"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {feature.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureList;
