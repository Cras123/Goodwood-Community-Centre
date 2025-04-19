"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { MembershipFormData } from "@/app/types/membershipTypes";

const MembershipPage: React.FC = () => {
  const initialFormData: MembershipFormData = {
    name: "",
    email: "",
    gender: "",
    phone: "",
    address: "",
    postcode: "",
    photoConsent: null,
    membershipType: "",
    agreeToConduct: false,
  };

  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<MembershipFormData>(initialFormData);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [showCodeOfConduct, setShowCodeOfConduct] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2;

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === "checkbox";
    const inputValue = isCheckbox
      ? (e.target as HTMLInputElement).checked
      : value;
    setFormData((prev) => ({ ...prev, [name]: inputValue }));
  };

  // Handle radio button changes
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value === "true",
    }));
  };

  // Move to next step
  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  // Move to previous step
  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  // Form submission handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);

    // Validation
    if (!formData.agreeToConduct) {
      setFormError(
        "You must agree to the Code of Conduct to submit the application."
      );
      return;
    }
    if (!formData.name || !formData.email || !formData.membershipType) {
      setFormError("Please fill in all required fields (*).");
      return;
    }
    if (formData.photoConsent === null) {
      setFormError("Please select an option for Photo Consent.");
      return;
    }

    console.log("Membership Form Data Submitted:", formData);
    setSubmitted(true);

    // Scroll to top of page to see confirmation message
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen">
      {/* Hero section with background image - LIGHTER VERSION */}
      <section className="relative h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/img/events.jpg"
            alt="Membership at Goodwood Community Centre"
            fill
            quality={100}
            className="object-cover brightness-75" // Changed from brightness-50 to brightness-75
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20 z-10"></div>{" "}
        {/* Reduced opacity */}
        <div className="container mx-auto px-4 md:px-8 relative z-20 text-white">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              Build Your Community Connection
            </h1>
            <div className="w-20 h-1 bg-green-500 mb-6"></div>
            <p className="text-lg md:text-xl mb-8 font-light">
              Join Goodwood Community Centre and become part of a 40-year legacy
              of bringing people together, fostering wellbeing, and creating
              meaningful connections.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits section */}
      <section className="bg-gradient-to-r from-green-50 to-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Membership Benefits
            </h2>
            <p className="text-lg text-gray-700">
              The Goodwood Community Centre is run by the Community for the
              Community. Show your support and enjoy these exclusive benefits:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Venue Discounts */}
            <div className="bg-white bg-[url('/subtle-patterns/green-pattern.png')] bg-opacity-10 rounded-lg shadow-lg p-8 transform transition-transform duration-300 hover:scale-105">
              <div className="h-2 bg-green-500"></div>
              <div className="bg-white p-8">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Venue Discounts
                </h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• 10% off your next venue hire</li>
                  <li>• 30% off R&F regular Catering with Friends Luncheon</li>
                </ul>
              </div>
            </div>

            {/* Community Access */}
            <div className="bg-white bg-[url('/subtle-patterns/blue-pattern.png')] bg-opacity-10 rounded-lg shadow-lg p-8 transform transition-transform duration-300 hover:scale-105">
              <div className="h-2 bg-blue-500"></div>
              <div className="bg-white p-8">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Community Access
                </h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Access to food relief/assistance</li>
                  <li>• 1 FREE Entry to Glenorchy Seniors Club</li>
                </ul>
              </div>
            </div>

            {/* Free Activities */}
            <div className="bg-white bg-[url('/subtle-patterns/yellow-pattern.png')] bg-opacity-10 rounded-lg shadow-lg p-8 transform transition-transform duration-300 hover:scale-105">
              <div className="h-2 bg-amber-500"></div>
              <div className="bg-white p-8">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Free Activities
                </h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• 1 FREE Scrabble session</li>
                  <li>• 1 FREE Craft session</li>
                  <li>• 1 FREE Playgroup session</li>
                  <li>• 1 FREE Card game session</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application form section with modern gradient */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Membership Application
              </h2>
              <div className="w-20 h-1 bg-green-500 mx-auto mb-4"></div>
              <p className="text-lg text-gray-700">
                Join our community today and enjoy exclusive member benefits
              </p>
            </div>

            {submitted ? (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-8 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-green-500 mr-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Application Received
                  </h3>
                </div>
                <p className="text-lg text-gray-700 mb-6">
                  Thank you for submitting your membership application! We've
                  received your details and will be in touch shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData(initialFormData);
                    setCurrentStep(1);
                  }}
                  className="text-green-600 font-medium hover:underline focus:outline-none"
                >
                  Submit another application
                </button>
              </div>
            ) : (
              <div className="bg-white bg-[url('/subtle-patterns/purple-pattern.png')] bg-opacity-10 rounded-lg shadow-lg p-8">
                {/* Form steps progress indicator with updated styling */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-4">
                  <div className="flex items-center justify-between">
                    <div className="w-full flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          currentStep >= 1
                            ? "bg-green-600 text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        1
                      </div>
                      <div
                        className={`h-1 flex-1 mx-2 ${
                          currentStep >= 2 ? "bg-green-600" : "bg-gray-200"
                        }`}
                      ></div>
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          currentStep >= 2
                            ? "bg-green-600 text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        2
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form error message - keep as is */}
                {formError && (
                  <div className="bg-red-50 text-red-700 p-4 border-l-4 border-red-500">
                    <div className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {formError}
                    </div>
                  </div>
                )}

                {/* Rest of the form stays the same */}
                <form ref={formRef} onSubmit={handleSubmit} className="p-8">
                  {/* Step 1: Personal Information */}
                  {currentStep === 1 && (
                    <div className="space-y-6 transition-all duration-300">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        Personal Information
                      </h3>

                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                          placeholder="your.email@example.com"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label
                            htmlFor="gender"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Gender
                          </label>
                          <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 bg-white transition-colors duration-200"
                          >
                            <option value="">Select...</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                            placeholder="e.g., 0400 123 456"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="address"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Address
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                          placeholder="Enter your street address"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="postcode"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Postcode
                        </label>
                        <input
                          type="text"
                          id="postcode"
                          name="postcode"
                          value={formData.postcode}
                          onChange={handleInputChange}
                          className="w-full md:w-1/3 px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                          placeholder="e.g., 7010"
                        />
                      </div>

                      <div className="pt-6 flex justify-end">
                        <button
                          type="button"
                          onClick={nextStep}
                          className="px-6 py-3 bg-green-600 text-white font-medium rounded-md shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
                        >
                          Continue
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Membership Details & Code of Conduct */}
                  {currentStep === 2 && (
                    <div className="space-y-6 transition-all duration-300">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        Membership Details
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <span className="block text-sm font-medium text-gray-700 mb-1">
                            Photo Consent{" "}
                            <span className="text-red-500">*</span>
                          </span>
                          <p className="text-xs text-gray-500 mb-2">
                            Do you consent to the Centre using photos that may
                            include you for promotional purposes?
                          </p>
                          <div className="flex items-center space-x-6 mt-1">
                            <label
                              htmlFor="photoConsentYes"
                              className="flex items-center cursor-pointer"
                            >
                              <input
                                type="radio"
                                id="photoConsentYes"
                                name="photoConsent"
                                value="true"
                                checked={formData.photoConsent === true}
                                onChange={handleRadioChange}
                                required
                                className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300"
                              />
                              <span className="ml-2 text-sm text-gray-700">
                                Yes
                              </span>
                            </label>
                            <label
                              htmlFor="photoConsentNo"
                              className="flex items-center cursor-pointer"
                            >
                              <input
                                type="radio"
                                id="photoConsentNo"
                                name="photoConsent"
                                value="false"
                                checked={formData.photoConsent === false}
                                onChange={handleRadioChange}
                                required
                                className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300"
                              />
                              <span className="ml-2 text-sm text-gray-700">
                                No
                              </span>
                            </label>
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="membershipType"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Membership Type{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <select
                            id="membershipType"
                            name="membershipType"
                            value={formData.membershipType}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 bg-white transition-colors duration-200"
                          >
                            <option value="">Select...</option>
                            <option value="New Member">New Member</option>
                            <option value="Renewal">Renewal</option>
                          </select>
                        </div>
                      </div>

                      <div className="pt-2">
                        <p className="text-sm text-gray-600 italic">
                          Applications for membership require support of 2
                          Centre members. If unsure please contact Centre staff
                          to identify members. (This step is typically handled
                          offline).
                        </p>
                      </div>

                      <div className="mb-4">
                        <button
                          type="button"
                          onClick={() =>
                            setShowCodeOfConduct(!showCodeOfConduct)
                          }
                          className="text-green-600 flex items-center hover:underline focus:outline-none"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-5 w-5 mr-1 transition-transform ${
                              showCodeOfConduct ? "rotate-90" : ""
                            }`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {showCodeOfConduct
                            ? "Hide GWCC Code of Conduct"
                            : "Show GWCC Code of Conduct"}
                        </button>

                        {showCodeOfConduct && (
                          <div className="mt-4 p-6 bg-gray-50 rounded-lg border border-gray-200 transition-all duration-300 ease-in-out">
                            <h4 className="text-xl font-semibold text-gray-900 mb-4">
                              Goodwood Community Centre Code of Conduct
                            </h4>

                            <div className="space-y-4">
                              <div>
                                <p className="font-medium text-gray-900">
                                  Our Vision:
                                </p>
                                <p className="text-gray-700">
                                  Our community is a place where everyone
                                  belongs.
                                </p>
                              </div>

                              <div>
                                <p className="font-medium text-gray-900">
                                  Our Mission:
                                </p>
                                <p className="text-gray-700">
                                  We provide an opportunity to connect, learn,
                                  share, grow and have fun.
                                </p>
                              </div>

                              <div>
                                <p className="font-medium text-gray-900">
                                  Our Values:
                                </p>
                                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                                  <li>
                                    Curiosity: we are open and interested in
                                    people and ideas.
                                  </li>
                                  <li>
                                    Responsibility: we take responsibility for
                                    our decisions and actions.
                                  </li>
                                  <li>
                                    Generosity: we give what we can with all
                                    parts contributing to our work.
                                  </li>
                                </ul>
                              </div>

                              <div>
                                <p className="text-gray-700">
                                  We aim to provide a safe, friendly and
                                  welcoming environment that everyone can
                                  attend; by agreeing to:
                                </p>
                                <ul className="list-disc list-inside text-gray-700 space-y-1">
                                  <li>Be polite to others</li>
                                  <li>Act as a positive role model</li>
                                  <li>
                                    Recognise and respect personal differences
                                  </li>
                                  <li>Use appropriate language at all times</li>
                                  <li>
                                    Seek help from the Manager or staff to
                                    address your concerns
                                  </li>
                                  <li>
                                    Recognise that every visitor is important to
                                    us
                                  </li>
                                  <li>
                                    Contribute to a positive community culture
                                  </li>
                                </ul>
                                <p className="text-sm text-gray-600 italic">
                                  Failure to meet these requirements could
                                  result in suspension or cancellation of your
                                  membership as determined by management.
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="pt-4">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="agreeToConduct"
                              name="agreeToConduct"
                              type="checkbox"
                              checked={formData.agreeToConduct}
                              onChange={handleInputChange}
                              required
                              className="focus:ring-green-500 h-5 w-5 text-green-600 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3">
                            <label
                              htmlFor="agreeToConduct"
                              className="font-medium text-gray-700 cursor-pointer"
                            >
                              I have read and agree to the Goodwood Community
                              Centre Code of Conduct
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="pt-6 flex justify-between">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-md shadow hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-3 bg-green-600 text-white font-medium rounded-md shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out flex items-center"
                        >
                          <span>Submit Application</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 ml-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                            <path
                              fillRule="evenodd"
                              d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default MembershipPage;
