import { Element, Link as LinkScroll } from "react-scroll";
import Button from "../components/Button.jsx";
const Hero = () => {
  return (
    <section className="relative pt-40 pb-40 max-lg:pt-52 max-lg:pb-36 max-md:pt-36 max-md:pb-32 overflow-hidden">
      <Element name="hero">
        <div className="container relative z-10">
          <div className="relative z-2 max-w-512 max-lg:max-w-388">
            <div className="caption small-2 uppercase text-p3">
              Portfolio Website
            </div>
            <h1 className="mb-6 h1 text-p4 uppercase max-lg:mb-7 max-lg:h2 max-md:mb-4 max-md:text-5xl max-md:leading-12">
              Shivkumar Devane
            </h1>
            <p className="max-w-440 mb-10 body-1 max-md:mb-10 max-md:text-base">
              Software Development Engineer (SDE) passionate about building scalable applications and solving complex problems. Experienced in Python, Java, React, and building efficient systems with a focus on DSA and Object-Oriented Programming (OOP).
            </p>
            <LinkScroll to="About Me" offset={-100} spy smooth>
              <Button icon="images/zap.svg">Know More</Button>
            </LinkScroll>
          </div>
        </div>
      </Element>
    </section>
  );
};

export default Hero;
