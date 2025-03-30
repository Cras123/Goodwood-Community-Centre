import React from "react";

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <section
        className="bg-cover bg-center h-64 flex items-center justify-center text-white text-4xl font-bold"
        style={{ backgroundImage: "url('/about-banner.jpg')" }}
      >
        About Us
      </section>

      {/* About Us Content */}
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to Goodwood Community Centre
        </h2>
        <p className="text-gray-600 leading-relaxed">
          At the heart of every thriving community is a place where people come
          together to share, support, and grow. Goodwood Community Services is
          that place—a haven where neighbors become friends, challenges find
          solutions, and everyone is welcome.
        </p>
        <p className="text-gray-600 leading-relaxed mt-4">
          From offering a helping hand in times of need to celebrating life’s
          joyful moments, we are here to make a difference. Whether you’re
          seeking support, looking to learn, or just hoping to connect with
          others, Goodwood Community Services is your partner in building a
          stronger, more compassionate community.
        </p>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center p-4 mt-10">
        <p>© 2025 Goodwood Community Services. All rights reserved.</p>
        <p>
          Contact us at{" "}
          <a href="mailto:support@goodwoodcommunity.org" className="underline">
            support@goodwoodcommunity.org
          </a>
        </p>
      </footer>
    </div>
  );
};

export default AboutUs;
