"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaComments,
  FaRegClock,
  FaFacebook,
} from "react-icons/fa";
import { MdLocationOn, MdEmail, MdPhone } from "react-icons/md";
import Chatbot from "@/components/Chatbot"; // Adjust the import path as needed

const ContactUs: React.FC = () => {
  const [formStatus, setFormStatus] = useState<{
    message: string;
    type: "success" | "error" | null;
  }>({ message: "", type: null });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // --- CAPTCHA State ---
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [captchaInput, setCaptchaInput] = useState("");
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  const generateCaptcha = () => {
    const newNum1 = Math.floor(Math.random() * 10) + 1;
    const newNum2 = Math.floor(Math.random() * 10) + 1;
    setNum1(newNum1);
    setNum2(newNum2);
    setCaptchaInput("");
    setIsCaptchaVerified(false);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  useEffect(() => {
    if (captchaInput && parseInt(captchaInput, 10) === num1 + num2) {
      setIsCaptchaVerified(true);
    } else {
      setIsCaptchaVerified(false);
    }
  }, [captchaInput, num1, num2]);
  // --- End CAPTCHA State ---
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formRef.current) return newErrors;

    const formData = new FormData(formRef.current);
    const name = (formData.get("userName") as string)?.trim();
    const email = (formData.get("userEmail") as string)?.trim();
    const message = (formData.get("userMessage") as string)?.trim();

    if (!name) newErrors.userName = "Name is required";
    if (!email) {
      newErrors.userEmail = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.userEmail = "Email format is invalid";
    }
    if (!message || message.length < 10)
      newErrors.userMessage = "Message must be at least 10 characters";

    setErrors(newErrors);
    return newErrors;
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) return;

    if (!isCaptchaVerified) {
      setFormStatus({ message: "Please complete the CAPTCHA", type: "error" });
      return;
    }

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to submit");

      setFormStatus({ message: "Submitted successfully", type: "success" });
      formRef.current?.reset();
      generateCaptcha();
    } catch (err) {
      setFormStatus({ message: "Submission failed", type: "error" });
    }
  };

  // --- Contact Details ---
  const address = "20 Acton Crescent, Goodwood TAS 7010";
  const encodedAddress = encodeURIComponent(address);
  const googleMapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  const googleMapsEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3148.984901173356!2d147.2878983158149!3d-42.83057797915791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xaa6e75e6b11f5f6b%3A0x75c6a8e2b5f0f861!2s20%20Acton%20Cres%2C%20Goodwood%20TAS%207010%2C%20Australia!5e0!3m2!1sen!2sus!4v1678886655000!5m2!1sen!2sus`;
  // --- End Contact Details ---

  return (
    <div className="relative min-h-screen bg-gray-100 p-2">
      <div className="max-w-5xl mx-auto p-4 flex flex-col md:flex-row gap-10">
        {/* Left Section: Contact Form Card */}
        <div className="flex-1 bg-white rounded-lg border border-gray-200 shadow p-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
            Contact Us
          </h1>
          <p className="mb-6 text-gray-600">
            We'd love to hear from you! Fill out the form below or reach out
            directly using the details provided.
          </p>
          <form
            ref={formRef}
            onSubmit={handleFormSubmit}
            noValidate
            className="flex flex-col gap-5"
          >
            {/* Full Name Input */}
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                id="userName"
                name="userName"
                required
                placeholder="Full Name (e.g., Jane Doe)"
                className={`w-full pl-10 p-3 border rounded focus:outline-none focus:ring-2 ${
                  errors.userName
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {errors.userName && (
                <p className="text-sm text-red-600 mt-1">{errors.userName}</p>
              )}
            </div>

            {/* Phone Number Input */}
            <div className="relative">
              <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="tel"
                id="userPhone"
                name="userPhone"
                placeholder="Phone Number (Optional, e.g., 0400 123 456)"
                pattern="[0-9\\s\\-()+.ext]+"
                className="w-full pl-10 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Email Address Input */}
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="email"
                id="userEmail"
                name="userEmail"
                required
                placeholder="Email Address (e.g., jane.doe@example.com)"
                className={`w-full pl-10 p-3 border rounded focus:outline-none focus:ring-2 ${
                  errors.userEmail
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {errors.userEmail && (
                <p className="text-sm text-red-600 mt-1">{errors.userEmail}</p>
              )}
            </div>

            {/* Message Textarea */}
            <div className="relative">
              <FaComments className="absolute left-3 top-3 text-gray-500" />
              <textarea
                id="userMessage"
                name="userMessage"
                required
                rows={5}
                placeholder="How can we help you?"
                className={`w-full pl-10 p-3 border rounded focus:outline-none focus:ring-2 resize-y ${
                  errors.userMessage
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              ></textarea>
              {errors.userMessage && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.userMessage}
                </p>
              )}
            </div>

            {/* NDA Checkbox */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="nda"
                name="ndaRequested"
                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="nda" className="text-sm text-gray-700">
                Request a Non-Disclosure Agreement (NDA)
              </label>
            </div>
            {/* CAPTCHA */}
            <div className="flex flex-wrap items-center gap-3 border border-gray-300 p-3 rounded">
              <label htmlFor="captcha" className="text-sm text-gray-700">
                Human Verification: What is {num1} + {num2}?
              </label>
              <input
                type="number"
                id="captcha"
                name="captcha"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                required
                className="w-20 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label={`Solve the captcha: What is ${num1} plus ${num2}?`}
              />
            </div>
            {/* Form Status Message */}
            {formStatus.message && (
              <div
                className={`p-3 rounded text-center text-sm ${
                  formStatus.type === "success"
                    ? "bg-green-100 text-green-800 border border-green-200"
                    : "bg-red-100 text-red-800 border border-red-200"
                }`}
                role="alert"
              >
                {formStatus.message}
              </div>
            )}
            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isCaptchaVerified}
              className="px-6 py-3 bg-blue-600 text-white rounded uppercase tracking-wide hover:bg-blue-700 disabled:opacity-50"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Right Section: Contact Info & Map */}
        <div className="flex flex-col gap-8 w-full md:w-1/3">
          {/* Contact Details Card */}
          <div className="bg-white rounded-lg border border-gray-200 shadow p-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Get in Touch Directly
            </h3>
            <div className="flex items-start gap-4 mb-3">
              <MdLocationOn className="text-blue-600 w-6" />
              <p>
                <a
                  href={googleMapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {address}
                </a>
              </p>
            </div>
            <div className="flex items-start gap-4 mb-3">
              <MdEmail className="text-blue-600 w-6" />
              <p>
                <a
                  href="mailto:manager@gwcc.org.au"
                  className="text-blue-600 hover:underline"
                >
                  manager@gwcc.org.au
                </a>
              </p>
            </div>
            <div className="flex items-start gap-4 mb-3">
              <MdPhone className="text-blue-600 w-6" />
              <p>
                <a
                  href="tel:0362722560"
                  className="text-blue-600 hover:underline"
                >
                  03 6272 2560
                </a>
              </p>
            </div>
            <div className="flex items-start gap-4 mb-3">
              <FaFacebook className="text-blue-600 w-6" />
              <p>
                <a
                  href="https://www.facebook.com/GoodwoodCommunityCentreTas/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Goodwood Community Centre, Tasmania
                </a>
              </p>
            </div>
            <div className="flex items-start gap-4">
              <FaRegClock className="text-blue-600 w-6" />
              <p>Open: Monday - Friday, 9:00 AM - 4:00 PM</p>
            </div>
          </div>
          {/* Map Embed Card */}
          <div className="bg-white rounded-lg border border-gray-200 shadow overflow-hidden h-80">
            <iframe
              src={googleMapsEmbedUrl}
              width="100%"
              height="100%"
              className="w-full h-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Goodwood Community Centre Location Map"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Chatbot Component */}
      <Chatbot />
    </div>
  );
};

export default ContactUs;
