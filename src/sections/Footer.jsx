import { socials } from "../constants/index.jsx";

import { Element } from "react-scroll";

const Footer = () => {
  return (
    <footer className="relative">
      <Element name="Contact">
        <div className="container py-10">
          <div className="flex flex-col items-center text-center mb-6">
            <p className="opacity-70">
              “Perfection is not attainable, but if we chase perfection we can catch excellence.”
            </p>
            <p>— Vince Lombardi</p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-6 mb-4 md:mb-0">
              <p className="legal-after relative text-p5 transition-all duration-500 hover:text-p1">
                Privacy Policy
              </p>
              <p className="text-p5 transition-all duration-500 hover:text-p1">
                Terms of Use
              </p>
            </div>

            <ul className="flex gap-3">
              {socials.map(({ id, url, icon, title }) => (
                <li key={id}>
                  <a href={url} className="social-icon">
                    <img
                      src={icon}
                      alt={title}
                      className="size-1/3 object-contain"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </Element>
    </footer>
  );
};
export default Footer;
