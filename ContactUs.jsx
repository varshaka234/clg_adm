import React from "react";

const ContactUs = () => {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-blue-900">Contact Us</h1>
      <p className="mt-4 text-gray-700">
        Get in touch with Oxfordia University for any inquiries.
      </p>

      {/* Contact Details */}
      <div className="mt-6 bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-blue-800">University Address</h2>
        <p className="mt-2 text-gray-700">Oxfordia University of Science and Technology</p>
        <p className="text-gray-700">123 University Road, Oxfordia City, 567890</p>

        <h2 className="text-2xl font-semibold text-blue-800 mt-6">Contact Information</h2>
        <p className="mt-2 text-gray-700">📞 Phone: +1 234 567 890</p>
        <p className="text-gray-700">📞 Phone: +1 987 654 321</p>
        <p className="mt-2 text-gray-700">📧 Email: info@oxfordiauniversity.com</p>

        {/* Google Map */}
        <h2 className="text-2xl font-semibold text-blue-800 mt-6">Location on Map</h2>
        <iframe
          title="Google Map"
          className="mt-4 w-full h-64 rounded-lg shadow-lg"
          src="https://www.google.com/maps/embed/v1/place?q=Oxford+University&key=YOUR_GOOGLE_MAPS_API_KEY"
          allowFullScreen
        ></iframe>
      </div>

      {/* Contact Form */}
      <div className="mt-10 bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-blue-800">Send Us a Message</h2>
        <form className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Name</label>
            <input
              type="text"
              className="w-full mt-2 p-2 border border-gray-300 rounded text-gray-900"
              placeholder="Your Name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              className="w-full mt-2 p-2 border border-gray-300 rounded text-gray-900"
              placeholder="Your Email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Message</label>
            <textarea
              className="w-full mt-2 p-2 border border-gray-300 rounded text-gray-900"
              placeholder="Your Message"
              rows="4"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-800"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
