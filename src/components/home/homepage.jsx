import React, { useEffect, useState } from "react";
import Hero from "../Hero";
import data from "../../data/data.json";
import Heading from "../Heading";
import Footer from "../Footer";
import About from "../About";
import Whatsapp from "../Whatsapp";
import Contact from "../Contact";
import Product from "../Product";
import Team from "../Team";
import ChooseUs from "../ChooseUs";
import Preloading from "../Preloading";
import { useAuth0 } from "@auth0/auth0-react";

function HomePage() {
  const { isAuthenticated } = useAuth0();
  const [isloading, setIsLoading] = useState(true);
  useEffect(() => {
    let isRender = true;
    if (isRender) {
      isAuthenticated && setIsLoading(false);
    }
    return () => {
      isRender = false;
    };
  }, [isAuthenticated]);
  return (
    <>
      <Hero />
      <Heading text="WebFork Team" />
      <Team />
      <Heading text="WebFork Features" />
      <ChooseUs />
      <Heading text="WebFork Categories" />
      <Product />
      <Heading text="About Us" />
      <About />
      <Heading text="Contact Us" />
      <Contact />
      <Whatsapp />
      {/* added footer data */}
      <Footer footer={data.footer} />
    </>)
  
}

export default HomePage;
