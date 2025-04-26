import Hero from "@/sections/Hero";
import Cards from "@/sections/Cards";
import Image from "next/image";
import UpcomingEvents from "@/sections/UpcommingEvents";
import Services from "@/sections/Services";
import HallHireSection from "@/sections/HallHire";
import GoogleMapComponent from "@/components/GoogleMap";

export default function Home() {
  return (
    <main className="px-4 md:px-8 max-w-7xl mx-auto">
      <Hero />
      <Cards />
      <UpcomingEvents />
      <Services />
      <HallHireSection />
      <GoogleMapComponent />
    </main>
  );
}
