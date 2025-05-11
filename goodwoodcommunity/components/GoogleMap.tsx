"use client";

const GoogleMapComponent = () => {
  const googleMapsEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3148.984901173356!2d147.2878983158149!3d-42.83057797915791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xaa6e75e6b11f5f6b%3A0x75c6a8e2b5f0f861!2s20%20Acton%20Cres%2C%20Goodwood%20TAS%207010%2C%20Australia!5e0!3m2!1sen!2sus!4v1678886655000!5m2!1sen!2sus";

  return (
    <div className="w-full h-80 overflow-hidden rounded-lg border border-gray-300 px-4 shadow-md">
      <iframe
        src={googleMapsEmbedUrl}
        width="100%"
        height="100%"
        allowFullScreen
        loading="lazy"
        className="w-full h-full"
        style={{ border: 0 }}
        referrerPolicy="no-referrer-when-downgrade"
        title="Goodwood Community Centre Location Map"
      ></iframe>
    </div>
  );
};

export default GoogleMapComponent;
