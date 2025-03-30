"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaComments,
  FaFileUpload,
  FaRegClock,
  FaFacebook,
} from "react-icons/fa";
import { MdLocationOn, MdEmail, MdPhone } from "react-icons/md";
import Chatbot from "@/components/Chatbot"; // Adjust import path based on your structure

const ContactUs = () => {
  const [fileName, setFileName] = useState("");
  const [formStatus, setFormStatus] = useState<{
    message: string;
    type: "success" | "error" | null;
  }>({ message: "", type: null });

  // --- CAPTCHA State ---
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [captchaInput, setCaptchaInput] = useState("");
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  // --- End CAPTCHA State ---

  // Ref for the form element
  const formRef = useRef<HTMLFormElement>(null);

  // --- CAPTCHA Logic ---
  const generateCaptcha = () => {
    const newNum1 = Math.floor(Math.random() * 10) + 1;
    const newNum2 = Math.floor(Math.random() * 10) + 1;
    setNum1(newNum1);
    setNum2(newNum2);
    setCaptchaInput("");
    setIsCaptchaVerified(false);
  };

  useEffect(() => {
    generateCaptcha(); // Initial CAPTCHA on mount
  }, []);

  useEffect(() => {
    // Verify CAPTCHA input
    if (captchaInput && parseInt(captchaInput, 10) === num1 + num2) {
      setIsCaptchaVerified(true);
    } else {
      setIsCaptchaVerified(false);
    }
  }, [captchaInput, num1, num2]);
  // --- End CAPTCHA Logic ---

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName("");
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus({ message: "", type: null }); // Clear previous status

    if (!isCaptchaVerified) {
      setFormStatus({
        message: "Please complete the human verification step.",
        type: "error",
      });
      // Instead of alert, maybe focus the captcha input
      const captchaInputElement = document.getElementById("captcha");
      captchaInputElement?.focus();
      return;
    }

    // TODO: Implement actual form submission (e.g., send data to an API)
    // Example: Collect form data
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("Form submitted data (implement actual sending logic):", data);

    // Show success message inline
    setFormStatus({
      message:
        "Thank you! Your message has been sent successfully. We'll aim to respond within 1-2 business days.",
      type: "success",
    });

    // Reset form using ref and state
    formRef.current?.reset(); // Use ref to reset form elements
    setFileName("");
    generateCaptcha();
  };

  // --- Contact Details ---
  const address = "20 Acton Crescent, Goodwood TAS 7010";
  const encodedAddress = encodeURIComponent(address);
  // Correct Google Maps
  const googleMapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  // Correct Google Maps Embed URL structure (REPLACE with actual embed code from Google Maps)
  // Go to Google Maps, find the location,
  const googleMapsEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3148.984901173356!2d147.2878983158149!3d-42.83057797915791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xaa6e75e6b11f5f6b%3A0x75c6a8e2b5f0f861!2s20%20Acton%20Cres%2C%20Goodwood%20TAS%207010%2C%20Australia!5e0!3m2!1sen!2sus!4v1678886655000!5m2!1sen!2sus`; // <-- Replace this entire URL

  return (
    // Use a slightly off-white background for the page
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "var(--color-bg-page)",
        padding: "1px 0",
      }}
    >
      <div className="contact-container">
        {/* Left Section: Contact Form Card */}
        <div className="form-container card">
          <h1 className="page-title">Contact Us</h1>
          <p className="description">
            We'd love to hear from you! Fill out the form below or reach out
            directly using the details provided.
          </p>

          <form
            ref={formRef}
            className="contact-form"
            onSubmit={handleFormSubmit}
            noValidate
          >
            {" "}
            {/* Added noValidate to rely on custom/state handling for errors */}
            <div className="input-group">
              <FaUser className="input-icon" aria-hidden="true" />
              <label htmlFor="userName" className="sr-only">
                Full Name
              </label>{" "}
              {/* Added sr-only label for accessibility */}
              <input
                type="text"
                id="userName"
                placeholder="Full Name (e.g., Jane Doe)"
                required
                name="userName"
                aria-required="true"
              />
            </div>
            <div className="input-group">
              <FaPhone className="input-icon" aria-hidden="true" />
              <label htmlFor="userPhone" className="sr-only">
                Phone Number
              </label>
              <input
                type="tel"
                id="userPhone"
                placeholder="Phone Number (Optional, e.g., 0400 123 456)"
                name="userPhone"
                pattern="[0-9\s\-()+.ext]+" // Slightly more permissive pattern
              />
            </div>
            <div className="input-group">
              <FaEnvelope className="input-icon" aria-hidden="true" />
              <label htmlFor="userEmail" className="sr-only">
                Email Address
              </label>
              <input
                type="email"
                id="userEmail"
                placeholder="Email Address (e.g., jane.doe@example.com)"
                required
                name="userEmail"
                aria-required="true"
              />
              {/* Basic HTML5 email validation will trigger, more advanced requires JS */}
            </div>
            <div className="input-group">
              <FaComments
                className="input-icon textarea-icon"
                aria-hidden="true"
              />
              <label htmlFor="userMessage" className="sr-only">
                Your Message
              </label>
              <textarea
                id="userMessage"
                placeholder="How can we help you?"
                rows={5}
                required
                name="userMessage"
                aria-required="true"
              ></textarea>
            </div>
            <div className="file-upload">
              <input
                type="file"
                id="file-upload"
                onChange={handleFileChange}
                style={{ display: "none" }}
                name="attachment"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                aria-describedby="file-info" // Link description
              />
              <label htmlFor="file-upload" className="file-label">
                <FaFileUpload className="upload-icon" aria-hidden="true" />
                <span>{fileName || "Upload File (Optional)"}</span>
              </label>
              <p className="file-info" id="file-info">
                Supported: PDF, DOC(X), JPG, PNG, TXT (Max 5MB)
              </p>{" "}
              {/* Added Max size */}
            </div>
            <div className="checkbox-group">
              <input type="checkbox" id="nda" name="ndaRequested" />
              {/* Updated NDA text */}
              <label htmlFor="nda">
                Request a Non-Disclosure Agreement (NDA)
              </label>
            </div>
            {/* --- Simple CAPTCHA Section --- */}
            <div className="captcha-section">
              <label htmlFor="captcha" className="captcha-label">
                Human Verification: What is {num1} + {num2}?
              </label>
              <input
                type="number"
                id="captcha"
                name="captcha"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                required
                aria-required="true"
                aria-label={`Solve the captcha: What is ${num1} plus ${num2}?`}
                className="captcha-input"
              />
              {/* Optional: Refresh Button Could Be Added Here */}
            </div>
            {/* --- End Simple CAPTCHA Section --- */}
            {/* --- Form Status Message --- */}
            {formStatus.message && (
              <div
                className={`form-status ${
                  formStatus.type === "success"
                    ? "status-success"
                    : "status-error"
                }`}
                role="alert"
              >
                {formStatus.message}
              </div>
            )}
            {/* --- Submit Button --- */}
            <button
              type="submit"
              className="submit-btn"
              disabled={!isCaptchaVerified}
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Right Section: Contact Info Card & Map */}
        <div className="info-container">
          <div className="contact-details card">
            {" "}
            {/* Added card class */}
            <h3>Get in Touch Directly</h3>
            <div className="contact-item">
              <MdLocationOn className="contact-icon" aria-hidden="true" />
              <p>
                {/* Corrected Google Maps Search Link */}
                <a
                  href={googleMapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View on Google Maps"
                >
                  {address}
                </a>
              </p>
            </div>
            <div className="contact-item">
              <MdEmail className="contact-icon" aria-hidden="true" />
              <p>
                <a href="mailto:manager@goodwoodcommunitycentre.org.au">
                  manager@goodwoodcommunitycentre.org.au
                </a>
              </p>
            </div>
            <div className="contact-item">
              <MdPhone className="contact-icon" aria-hidden="true" />
              <p>
                <a href="tel:0362722560">03 6272 2560</a>
              </p>
            </div>
            <div className="contact-item">
              <FaFacebook className="contact-icon" aria-hidden="true" />
              <p>
                <a
                  href="https://www.facebook.com/GoodwoodCommunityCentreTas/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Find us on Facebook"
                >
                  Goodwood Community Centre, Tasmania
                </a>
              </p>
            </div>
            <div className="contact-item">
              <FaRegClock className="contact-icon" aria-hidden="true" />
              <p>Open: Monday - Friday, 9:00 AM - 4:00 PM</p>
            </div>
          </div>

          {/* --- Map Embed --- */}
          {/* IMPORTANT: Replace the src below with the actual embed code from Google Maps for the address */}
          <div className="map-embed card">
            {" "}
            {/* Added card class */}
            <iframe
              src={googleMapsEmbedUrl} // Use the correct embed URL variable
              width="100%"
              height="350" // Increased height
              style={{ border: 0 }}
              allowFullScreen={true} // Keep false unless needed
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Goodwood Community Centre Location Map"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Render the Chatbot Component */}
      <Chatbot />

      {/* --- Styles --- */}
      <style jsx>{`
        /* --- CSS Variables for Theme --- */
        :global(:root) {
          --color-primary: #007bff; /* Example: Bootstrap Primary Blue */
          --color-primary-dark: #0056b3;
          --color-text-dark: #212529;
          --color-text-medium: #495057;
          --color-text-light: #6c757d;
          --color-border: #dee2e6;
          --color-bg-page: #f8f9fa;
          --color-bg-card: #ffffff;
          --color-success: #28a745;
          --color-error: #dc3545;
          --font-family-base: system-ui, -apple-system, "Segoe UI", Roboto,
            "Helvetica Neue", Arial, "Noto Sans", sans-serif,
            "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
            "Noto Color Emoji";
        }

        /* Apply box-sizing and base font */
        .contact-container *,
        .contact-container *::before,
        .contact-container *::after {
          box-sizing: border-box;
        }
        .contact-container {
          font-family: var(--font-family-base);
          color: var(--color-text-medium);
          line-height: 1.6;
        }

        /* Screen-reader only utility */
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }

        /* --- Main Layout --- */
        .contact-container {
          display: flex;
          flex-wrap: wrap;
          gap: 40px; /* Consistent gap */
          max-width: 1200px;
          margin: 50px auto; /* Increased vertical margin */
          padding: 20px; /* Base padding */
        }

        .form-container {
          flex: 2 1 550px; /* Allow form to grow more, larger base */
          min-width: 320px;
        }

        .info-container {
          flex: 1 1 350px; /* Base size */
          min-width: 300px;
          display: flex; /* Use flexbox for vertical arrangement */
          flex-direction: column;
          gap: 30px; /* Space between contact details and map */
        }

        /* --- Card Style --- */
        .card {
          background-color: var(--color-bg-card);
          border-radius: 10px;
          border: 1px solid var(--color-border);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          padding: 30px; /* Standard padding for cards */
        }

        /* --- Typography --- */
        .page-title {
          font-size: clamp(
            2rem,
            5vw,
            2.5rem
          ); /* Slightly adjusted responsive size */
          margin-bottom: 15px;
          color: var(--color-text-dark);
          font-weight: 600; /* Slightly less bold */
          line-height: 1.3;
        }

        .description {
          font-size: 1rem;
          margin-bottom: 35px;
          color: var(--color-text-light);
          max-width: 65ch;
        }

        /* --- Form Styles --- */
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 20px; /* Consistent gap between form elements */
        }

        .input-group {
          position: relative;
        }

        .input-icon {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 15px;
          color: var(--color-text-light);
          font-size: 16px; /* Slightly smaller icons */
          z-index: 1;
          pointer-events: none; /* Allow clicking through icon */
        }

        .textarea-icon {
          top: 18px; /* Adjusted for textarea */
          transform: none;
        }

        .input-group input,
        .input-group textarea {
          width: 100%;
          padding: 12px 15px 12px 45px; /* Adjusted padding (top/bottom, right, left) */
          border: 1px solid var(--color-border);
          border-radius: 6px; /* Slightly less rounded */
          font-size: 1rem;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          color: var(--color-text-medium);
          background-color: #fff; /* Ensure background */
        }
        .input-group textarea {
          padding-top: 15px; /* Specific padding for textarea */
          padding-bottom: 15px;
          min-height: 120px; /* Give textarea a decent minimum height */
          resize: vertical; /* Allow vertical resize */
        }

        .input-group input::placeholder,
        .input-group textarea::placeholder {
          color: var(--color-text-light);
          opacity: 0.8;
          font-size: 0.95rem;
        }

        .input-group input:focus,
        .input-group textarea:focus {
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px
            rgba(var(--color-primary-rgb, 0, 123, 255), 0.25); /* Use RGB variable if defined, else fallback */
          outline: none;
        }
        /* Define --color-primary-rgb if needed, e.g., in :global(:root) */
        :global(:root) {
          --color-primary-rgb: 0, 123, 255;
        }

        /* --- File Upload --- */
        .file-upload {
          margin: 5px 0; /* Reduced margin */
        }
        .file-label {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 15px; /* Consistent padding */
          border: 2px dashed var(--color-border);
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
          background-color: var(--color-bg-page); /* Use page background */
          color: var(--color-text-medium);
        }
        .file-label:hover {
          border-color: var(--color-primary);
          background-color: #e9ecef; /* Lighter hover background */
          color: var(--color-primary-dark);
        }
        .file-label span {
          font-size: 0.95rem;
          overflow: hidden; /* Prevent long filenames overflowing */
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .upload-icon {
          font-size: 18px;
          color: var(--color-primary);
          flex-shrink: 0;
        }
        .file-info {
          margin-top: 8px;
          font-size: 0.85rem;
          color: var(--color-text-light);
        }

        /* --- Checkbox --- */
        .checkbox-group {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 5px 0;
        }
        .checkbox-group input[type="checkbox"] {
          width: 17px; /* Slightly smaller */
          height: 17px;
          accent-color: var(--color-primary);
          cursor: pointer;
          margin-top: 2px; /* Align better with text */
          flex-shrink: 0;
        }
        .checkbox-group label {
          font-size: 0.95rem;
          color: var(--color-text-medium);
          cursor: pointer;
          line-height: 1.5;
        }

        /* --- CAPTCHA Styles --- */
        .captcha-section {
          margin-top: 15px;
          padding: 15px;
          border: 1px solid var(--color-border);
          border-radius: 6px;
          background-color: var(--color-bg-page);
          display: flex; /* Use flex for better alignment */
          flex-wrap: wrap; /* Allow wrapping on small screens */
          align-items: center;
          gap: 10px;
        }
        .captcha-label {
          font-weight: 500;
          color: var(--color-text-medium);
          font-size: 0.95rem;
          margin-right: 5px; /* Space between label and input */
        }
        .captcha-input {
          padding: 8px 12px;
          border: 1px solid var(--color-border);
          border-radius: 6px;
          width: 80px; /* Fixed width */
          font-size: 1rem;
        }
        .captcha-input:focus {
          border-color: var(--color-primary);
          box-shadow: 0 0 0 2px rgba(var(--color-primary-rgb, 0, 123, 255), 0.2);
          outline: none;
        }

        /* --- Form Status Messages --- */
        .form-status {
          padding: 12px 15px;
          margin-top: 15px;
          border-radius: 6px;
          font-size: 0.95rem;
          text-align: center;
        }
        .status-success {
          background-color: #d4edda; /* Light green */
          color: #155724; /* Dark green */
          border: 1px solid #c3e6cb;
        }
        .status-error {
          background-color: #f8d7da; /* Light red */
          color: #721c24; /* Dark red */
          border: 1px solid #f5c6cb;
        }

        /* --- Submit Button --- */
        .submit-btn {
          padding: 12px 25px; /* Slightly adjusted padding */
          background: var(--color-primary);
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s ease, transform 0.1s ease,
            box-shadow 0.2s ease;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-top: 10px; /* Add some space above */
          align-self: flex-start; /* Align button to the left */
        }
        .submit-btn:hover:not(:disabled) {
          background-color: var(--color-primary-dark);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .submit-btn:active:not(:disabled) {
          transform: translateY(1px);
        }
        .submit-btn:disabled {
          background-color: #adb5bd; /* Neutral grey */
          cursor: not-allowed;
          opacity: 0.7;
        }

        /* --- Info Container Styles --- */
        .contact-details h3 {
          font-size: 1.3rem; /* Adjusted size */
          margin-bottom: 20px;
          color: var(--color-text-dark);
          border-bottom: 1px solid var(--color-border);
          padding-bottom: 10px;
          font-weight: 600;
        }

        .contact-item {
          display: flex;
          align-items: flex-start; /* Align icon with first line of text */
          gap: 15px; /* Consistent gap */
          margin-bottom: 15px;
          color: var(--color-text-medium);
          font-size: 1rem;
        }
        .contact-item:last-child {
          margin-bottom: 0;
        }
        .contact-item p {
          margin: 0;
          line-height: 1.5;
        } /* Ensure p has no extra margin */

        .contact-icon {
          font-size: 20px; /* Consistent icon size */
          color: var(--color-primary);
          flex-shrink: 0;
          width: 22px; /* Ensure consistent width */
          text-align: center;
          margin-top: 2px; /* Align icon slightly lower */
        }

        .contact-item a {
          color: var(--color-primary);
          text-decoration: none;
          transition: color 0.2s ease, text-decoration 0.2s ease;
          word-break: break-word;
        }
        .contact-item a:hover {
          color: var(--color-primary-dark);
          text-decoration: underline;
        }

        /* --- Map Embed Styles --- */
        .map-embed {
          overflow: hidden; /* Clips iframe corners to match card radius */
          /* Card styles (padding, border, shadow) are applied via .card class */
          height: 350px; /* Match iframe height */
          display: flex; /* Make iframe fill container */
        }
        .map-embed iframe {
          width: 100%;
          height: 100%;
          border: none; /* Remove default iframe border */
        }

        /* --- Responsive Adjustments --- */
        @media (max-width: 992px) {
          .contact-container {
            gap: 30px;
          }
          .form-container {
            flex-basis: 500px;
          }
          .info-container {
            flex-basis: 320px;
          }
        }

        @media (max-width: 768px) {
          .contact-container {
            flex-direction: column;
            margin: 30px auto;
            padding: 15px;
          }
          .form-container,
          .info-container {
            flex-basis: auto; /* Reset basis */
          }
          .card {
            padding: 20px;
          } /* Reduce padding on smaller cards */
          .page-title {
            font-size: 1.8rem;
          }
          .description {
            font-size: 0.95rem;
            margin-bottom: 25px;
          }
          .submit-btn {
            width: 100%;
            text-align: center;
          } /* Full width button */
          .captcha-section {
            flex-direction: column;
            align-items: flex-start;
          } /* Stack captcha elements */
        }
      `}</style>
      <footer className="bg-gray-900 text-white text-center p-4 mt-10">
        <p>© 2025 Goodwood Community Services. All rights reserved.</p>
        {/* dont put contact here,  we have contact page. It defites the purpose of contact page. */}
        {/*<p>Contact us at <a href="mailto:support@goodwoodcommunity.org" className="underline">support@goodwoodcommunity.org</a></p> */}
      </footer>
    </div>
  );
};

export default ContactUs;
