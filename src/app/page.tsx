"use client";
import "aos/dist/aos.css";
// import Hero from "@/components/Home/Hero";
import Features from "@/components/Home/Features";
import dynamic from "next/dynamic";
import Products from "@/components/Home/Products";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
const Category = dynamic(() => import("@/components/Home/Category"), {
  ssr: false, // Disable SSR for this component
});
const Hero = dynamic(() => import("@/components/Home/Hero"), {
  ssr: false, // Disable SSR for this component
});

export default function Home() {
  const {data} = useGetAllUsersQuery(undefined);
  console.log(data);
  return (
    <main>
      <section>
        {data?.data?.name}
        <Hero />
      </section>
      <section>
        <Features />
      </section>
      <section>
        <Category />
      </section>
      <section>
        <Products />
      </section>
    </main>
  );
}
