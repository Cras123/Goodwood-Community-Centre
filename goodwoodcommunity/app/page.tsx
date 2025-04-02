import Hero from "@/sections/Hero";
import Cards from "@/sections/Cards";
import Image from "next/image";
import UpcomingEvents from "@/sections/UpcommingEvents";
import Services from "@/sections/Services";
import HallHireSection from "@/sections/HallHire";
import GoogleMapComponent from "@/components/GoogleMap";

export default function Home() {
  return (
    <>
      <Hero />
      <Cards />
      <UpcomingEvents />
      <Services />
      <HallHireSection />
      <GoogleMapComponent />
      <p className="p-2.5">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero
        inventore dolore animi error architecto, odio voluptates soluta
        quibusdam neque facilis quos aliquam earum nam obcaecati odit
        voluptatem! Quia, inventore delectus!
      </p>
    </>
  );
}
