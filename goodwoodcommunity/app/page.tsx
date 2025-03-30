import Hero from "@/sections/Hero";
import Cards from "@/sections/Cards";
import Image from "next/image";
import UpcomingEvents from "@/sections/UpcommingEvents";
import Services from "@/sections/Services";
import HallHireSection from "@/sections/HallHire";

export default function Home() {
  return (
    <>
      <Hero />
      <Cards />
      <UpcomingEvents />
      <Services />
      <HallHireSection />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Long Content for Scrolling</h2>
        <p className="text-gray-700 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          facilisi. Fusce a risus sed magna efficitur elementum. Sed dapibus
          justo ac elit convallis, non lacinia massa posuere. Phasellus
          venenatis, sapien eu tincidunt efficitur, mauris risus vehicula nunc,
          ac pharetra mi orci in justo. Vivamus ac libero sit amet ligula
          ullamcorper commodo. Cras accumsan nibh non risus vulputate, id
          accumsan nunc consectetur. Vestibulum vulputate leo eget neque
          consequat, ut facilisis nunc varius. Suspendisse potenti. Donec
          bibendum justo ut lacus fermentum, a convallis magna auctor. Duis
          imperdiet, felis ut pretium maximus, lectus felis fringilla odio, sed
          tincidunt erat velit id leo. Etiam at augue at sapien tincidunt
          facilisis. Duis efficitur justo id felis sodales pharetra. In
          fermentum lacus in ipsum auctor, eget scelerisque eros laoreet.
        </p>
        <p className="text-gray-700 leading-relaxed mt-4">
          Morbi tincidunt nisi nec vehicula aliquet. Nulla et nisi nec turpis
          mattis laoreet non eu quam. Phasellus hendrerit, orci at laoreet
          aliquet, eros lorem consequat nulla, eu vestibulum eros dolor nec
          turpis. Proin malesuada dui in mauris finibus, at tempus neque
          interdum. Cras fermentum ex eget dui egestas dapibus. Integer at augue
          ut justo accumsan pharetra. Curabitur id ligula ut mi consectetur
          ullamcorper eget nec lacus. Fusce sit amet mauris venenatis, interdum
          nunc non, vestibulum quam. Integer eu nulla euismod, laoreet nulla
          sed, efficitur libero.
        </p>
        <p className="text-gray-700 leading-relaxed mt-4">
          Pellentesque habitant morbi tristique senectus et netus et malesuada
          fames ac turpis egestas. Donec non ex eget orci consequat sodales.
          Mauris luctus magna vel mauris feugiat, nec consequat mi consectetur.
          Praesent ac lorem nisl. Ut non tincidunt ex, at iaculis ex. In hac
          habitasse platea dictumst. Mauris id facilisis libero. Suspendisse
          potenti. Curabitur ultricies, odio ac ullamcorper suscipit, nulla sem
          bibendum dolor, non vestibulum odio sem eu urna. Cras tristique
          faucibus ante, a feugiat lectus congue eu.
          <p className="text-gray-700 leading-relaxed mt-4">
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Donec non ex eget orci consequat sodales.
            Mauris luctus magna vel mauris feugiat, nec consequat mi
            consectetur. Praesent ac lorem nisl. Ut non tincidunt ex, at iaculis
            ex. In hac habitasse platea dictumst. Mauris id facilisis libero.
            Suspendisse potenti. Curabitur ultricies, odio ac ullamcorper
            suscipit, nulla sem bibendum dolor, non vestibulum odio sem eu urna.
            Cras tristique faucibus ante, a feugiat lectus congue eu.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Donec non ex eget orci consequat sodales.
            Mauris luctus magna vel mauris feugiat, nec consequat mi
            consectetur. Praesent ac lorem nisl. Ut non tincidunt ex, at iaculis
            ex. In hac habitasse platea dictumst. Mauris id facilisis libero.
            Suspendisse potenti. Curabitur ultricies, odio ac ullamcorper
            suscipit, nulla sem bibendum dolor, non vestibulum odio sem eu urna.
            Cras tristique faucibus ante, a feugiat lectus congue eu.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Donec non ex eget orci consequat sodales.
            Mauris luctus magna vel mauris feugiat, nec consequat mi
            consectetur. Praesent ac lorem nisl. Ut non tincidunt ex, at iaculis
            ex. In hac habitasse platea dictumst. Mauris id facilisis libero.
            Suspendisse potenti. Curabitur ultricies, odio ac ullamcorper
            suscipit, nulla sem bibendum dolor, non vestibulum odio sem eu urna.
            Cras tristique faucibus ante, a feugiat lectus congue eu.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Donec non ex eget orci consequat sodales.
            Mauris luctus magna vel mauris feugiat, nec consequat mi
            consectetur. Praesent ac lorem nisl. Ut non tincidunt ex, at iaculis
            ex. In hac habitasse platea dictumst. Mauris id facilisis libero.
            Suspendisse potenti. Curabitur ultricies, odio ac ullamcorper
            suscipit, nulla sem bibendum dolor, non vestibulum odio sem eu urna.
            Cras tristique faucibus ante, a feugiat lectus congue eu.
          </p>{" "}
          <p className="text-gray-700 leading-relaxed mt-4">
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Donec non ex eget orci consequat sodales.
            Mauris luctus magna vel mauris feugiat, nec consequat mi
            consectetur. Praesent ac lorem nisl. Ut non tincidunt ex, at iaculis
            ex. In hac habitasse platea dictumst. Mauris id facilisis libero.
            Suspendisse potenti. Curabitur ultricies, odio ac ullamcorper
            suscipit, nulla sem bibendum dolor, non vestibulum odio sem eu urna.
            Cras tristique faucibus ante, a feugiat lectus congue eu.
          </p>{" "}
          <p className="text-gray-700 leading-relaxed mt-4">
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Donec non ex eget orci consequat sodales.
            Mauris luctus magna vel mauris feugiat, nec consequat mi
            consectetur. Praesent ac lorem nisl. Ut non tincidunt ex, at iaculis
            ex. In hac habitasse platea dictumst. Mauris id facilisis libero.
            Suspendisse potenti. Curabitur ultricies, odio ac ullamcorper
            suscipit, nulla sem bibendum dolor, non vestibulum odio sem eu urna.
            Cras tristique faucibus ante, a feugiat lectus congue eu.
          </p>{" "}
          <p className="text-gray-700 leading-relaxed mt-4">
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Donec non ex eget orci consequat sodales.
            Mauris luctus magna vel mauris feugiat, nec consequat mi
            consectetur. Praesent ac lorem nisl. Ut non tincidunt ex, at iaculis
            ex. In hac habitasse platea dictumst. Mauris id facilisis libero.
            Suspendisse potenti. Curabitur ultricies, odio ac ullamcorper
            suscipit, nulla sem bibendum dolor, non vestibulum odio sem eu urna.
            Cras tristique faucibus ante, a feugiat lectus congue eu.
          </p>{" "}
          <p className="text-gray-700 leading-relaxed mt-4">
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Donec non ex eget orci consequat sodales.
            Mauris luctus magna vel mauris feugiat, nec consequat mi
            consectetur. Praesent ac lorem nisl. Ut non tincidunt ex, at iaculis
            ex. In hac habitasse platea dictumst. Mauris id facilisis libero.
            Suspendisse potenti. Curabitur ultricies, odio ac ullamcorper
            suscipit, nulla sem bibendum dolor, non vestibulum odio sem eu urna.
            Cras tristique faucibus ante, a feugiat lectus congue eu.
          </p>{" "}
          <p className="text-gray-700 leading-relaxed mt-4">
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Donec non ex eget orci consequat sodales.
            Mauris luctus magna vel mauris feugiat, nec consequat mi
            consectetur. Praesent ac lorem nisl. Ut non tincidunt ex, at iaculis
            ex. In hac habitasse platea dictumst. Mauris id facilisis libero.
            Suspendisse potenti. Curabitur ultricies, odio ac ullamcorper
            suscipit, nulla sem bibendum dolor, non vestibulum odio sem eu urna.
            Cras tristique faucibus ante, a feugiat lectus congue eu.
          </p>{" "}
          <p className="text-gray-700 leading-relaxed mt-4">
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Donec non ex eget orci consequat sodales.
            Mauris luctus magna vel mauris feugiat, nec consequat mi
            consectetur. Praesent ac lorem nisl. Ut non tincidunt ex, at iaculis
            ex. In hac habitasse platea dictumst. Mauris id facilisis libero.
            Suspendisse potenti. Curabitur ultricies, odio ac ullamcorper
            suscipit, nulla sem bibendum dolor, non vestibulum odio sem eu urna.
            Cras tristique faucibus ante, a feugiat lectus congue eu.
          </p>{" "}
          <p className="text-gray-700 leading-relaxed mt-4">
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Donec non ex eget orci consequat sodales.
            Mauris luctus magna vel mauris feugiat, nec consequat mi
            consectetur. Praesent ac lorem nisl. Ut non tincidunt ex, at iaculis
            ex. In hac habitasse platea dictumst. Mauris id facilisis libero.
            Suspendisse potenti. Curabitur ultricies, odio ac ullamcorper
            suscipit, nulla sem bibendum dolor, non vestibulum odio sem eu urna.
            Cras tristique faucibus ante, a feugiat lectus congue eu.
          </p>{" "}
          <p className="text-gray-700 leading-relaxed mt-4">
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Donec non ex eget orci consequat sodales.
            Mauris luctus magna vel mauris feugiat, nec consequat mi
            consectetur. Praesent ac lorem nisl. Ut non tincidunt ex, at iaculis
            ex. In hac habitasse platea dictumst. Mauris id facilisis libero.
            Suspendisse potenti. Curabitur ultricies, odio ac ullamcorper
            suscipit, nulla sem bibendum dolor, non vestibulum odio sem eu urna.
            Cras tristique faucibus ante, a feugiat lectus congue eu.
          </p>{" "}
          <p className="text-gray-700 leading-relaxed mt-4">
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Donec non ex eget orci consequat sodales.
            Mauris luctus magna vel mauris feugiat, nec consequat mi
            consectetur. Praesent ac lorem nisl. Ut non tincidunt ex, at iaculis
            ex. In hac habitasse platea dictumst. Mauris id facilisis libero.
            Suspendisse potenti. Curabitur ultricies, odio ac ullamcorper
            suscipit, nulla sem bibendum dolor, non vestibulum odio sem eu urna.
            Cras tristique faucibus ante, a feugiat lectus congue eu.
          </p>{" "}
          <p className="text-gray-700 leading-relaxed mt-4">
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Donec non ex eget orci consequat sodales.
            Mauris luctus magna vel mauris feugiat, nec consequat mi
            consectetur. Praesent ac lorem nisl. Ut non tincidunt ex, at iaculis
            ex. In hac habitasse platea dictumst. Mauris id facilisis libero.
            Suspendisse potenti. Curabitur ultricies, odio ac ullamcorper
            suscipit, nulla sem bibendum dolor, non vestibulum odio sem eu urna.
            Cras tristique faucibus ante, a feugiat lectus congue eu.
          </p>{" "}
          <p className="text-gray-700 leading-relaxed mt-4">
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Donec non ex eget orci consequat sodales.
            Mauris luctus magna vel mauris feugiat, nec consequat mi
            consectetur. Praesent ac lorem nisl. Ut non tincidunt ex, at iaculis
            ex. In hac habitasse platea dictumst. Mauris id facilisis libero.
            Suspendisse potenti. Curabitur ultricies, odio ac ullamcorper
            suscipit, nulla sem bibendum dolor, non vestibulum odio sem eu urna.
            Cras tristique faucibus ante, a feugiat lectus congue eu.
          </p>{" "}
          <p className="text-gray-700 leading-relaxed mt-4">
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Donec non ex eget orci consequat sodales.
            Mauris luctus magna vel mauris feugiat, nec consequat mi
            consectetur. Praesent ac lorem nisl. Ut non tincidunt ex, at iaculis
            ex. In hac habitasse platea dictumst. Mauris id facilisis libero.
            Suspendisse potenti. Curabitur ultricies, odio ac ullamcorper
            suscipit, nulla sem bibendum dolor, non vestibulum odio sem eu urna.
            Cras tristique faucibus ante, a feugiat lectus congue eu.
          </p>{" "}
          <p className="text-gray-700 leading-relaxed mt-4">
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Donec non ex eget orci consequat sodales.
            Mauris luctus magna vel mauris feugiat, nec consequat mi
            consectetur. Praesent ac lorem nisl. Ut non tincidunt ex, at iaculis
            ex. In hac habitasse platea dictumst. Mauris id facilisis libero.
            Suspendisse potenti. Curabitur ultricies, odio ac ullamcorper
            suscipit, nulla sem bibendum dolor, non vestibulum odio sem eu urna.
            Cras tristique faucibus ante, a feugiat lectus congue eu.
          </p>{" "}
          <p className="text-gray-700 leading-relaxed mt-4">
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Donec non ex eget orci consequat sodales.
            Mauris luctus magna vel mauris feugiat, nec consequat mi
            consectetur. Praesent ac lorem nisl. Ut non tincidunt ex, at iaculis
            ex. In hac habitasse platea dictumst. Mauris id facilisis libero.
            Suspendisse potenti. Curabitur ultricies, odio ac ullamcorper
            suscipit, nulla sem bibendum dolor, non vestibulum odio sem eu urna.
            Cras tristique faucibus ante, a feugiat lectus congue eu.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Donec non ex eget orci consequat sodales.
            Mauris luctus magna vel mauris feugiat, nec consequat mi
            consectetur. Praesent ac lorem nisl. Ut non tincidunt ex, at iaculis
            ex. In hac habitasse platea dictumst. Mauris id facilisis libero.
            Suspendisse potenti. Curabitur ultricies, odio ac ullamcorper
            suscipit, nulla sem bibendum dolor, non vestibulum odio sem eu urna.
            Cras tristique faucibus ante, a feugiat lectus congue eu.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Donec non ex eget orci consequat sodales.
            Mauris luctus magna vel mauris feugiat, nec consequat mi
            consectetur. Praesent ac lorem nisl. Ut non tincidunt ex, at iaculis
            ex. In hac habitasse platea dictumst. Mauris id facilisis libero.
            Suspendisse potenti. Curabitur ultricies, odio ac ullamcorper
            suscipit, nulla sem bibendum dolor, non vestibulum odio sem eu urna.
            Cras tristique faucibus ante, a feugiat lectus congue eu.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Donec non ex eget orci consequat sodales.
            Mauris luctus magna vel mauris feugiat, nec consequat mi
            consectetur. Praesent ac lorem nisl. Ut non tincidunt ex, at iaculis
            ex. In hac habitasse platea dictumst. Mauris id facilisis libero.
            Suspendisse potenti. Curabitur ultricies, odio ac ullamcorper
            suscipit, nulla sem bibendum dolor, non vestibulum odio sem eu urna.
            Cras tristique faucibus ante, a feugiat lectus congue eu.
          </p>
        </p>
      </div>
    </>
  );
}
