import { BookOpen, Sparkles, Users } from 'lucide-react';
import React from 'react'

const FeaturedSection = () => {
  return (
      <section className="features py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Why Choose Our Platform
            </h2>
            <p className="text-lg text-gray-600" style={{ fontFamily: "Poppins, sans-serif" }}>
              Everything you need to share your story with the world
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: BookOpen, title: "Easy Publishing", desc: "Create and publish blogs in minutes with our intuitive editor" },
              { icon: Users, title: "Build Community", desc: "Connect with readers who share your passion and interests" },
              { icon: Sparkles, title: "Beautiful Design", desc: "Professional layouts that showcase your content beautifully" }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group p-8 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-blue-50 hover:to-purple-50 transition-all duration-300 border border-gray-200 hover:border-blue-300 hover:shadow-lg"
              >
                <div className="mb-4 inline-block p-4 bg-white rounded-lg group-hover:bg-gradient-to-br group-hover:from-blue-100 group-hover:to-purple-100 transition-all">
                  <feature.icon size={28} className="text-blue-600" />
                </div>
                <h3
                  className="text-xl font-bold text-gray-900 mb-2"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {feature.title}
                </h3>
                <p className="text-gray-600" style={{ fontFamily: "Poppins, sans-serif" }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default FeaturedSection;