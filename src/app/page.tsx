"use client";
import "aos/dist/aos.css";
// import Hero from "@/components/Home/Hero";
import Features from "@/components/Home/Features";
import dynamic from "next/dynamic";
import Products from "@/components/Home/Products";
import CustomerReviews from "@/components/shop/CustomerReviews";
import Coupon from "@/components/Home/Coupon"
import BuyingProcess from "@/components/Home/BuyingProcess"
const Category = dynamic(() => import("@/components/Home/Category"), {
  ssr: false, // Disable SSR for this component
});
const Hero = dynamic(() => import("@/components/Home/Hero"), {
  ssr: false, // Disable SSR for this component
});

export default function Home() {
 
  return (
    <main>
      <section>
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
      <section>
        <Coupon />
      </section>
      <section>
        <BuyingProcess />
      </section>
      <section>
        <CustomerReviews />
      </section>
    </main>
  );
}
