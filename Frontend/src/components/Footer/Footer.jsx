import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { RiLinkedinFill } from "react-icons/ri";
import { AiFillYoutube, AiFillGithub, AiFillFacebook } from "react-icons/ai";

const socialLinks = [
  {
    path: "https://www.linkedin.com/in/ahmed-soliman-2564a01ba/",
    icon: <AiFillYoutube className="group-hover:text-white w-4 h-5" />,
  },
  {
    path: "https://www.facebook.com/sOoLManN",
    icon: <AiFillFacebook className="group-hover:text-white w-4 h-5" />,
  },

  {
    path: "https://github.com/solman500",
    icon: <AiFillGithub className="group-hover:text-white w-4 h-5" />,
  },
  {
    path: "https://www.linkedin.com/in/ahmed-soliman-2564a01ba/",
    icon: <RiLinkedinFill className="group-hover:text-white w-4 h-5" />,
  },
];

const quikLink01 = [
  {
    path: "/",
    name: "About Us",
  },
  {
    path: "/services",
    name: "Services",
  },

  {
    path: "/home",
    name: "home",
  },
  {
    path: "/",
    name: "Blog",
  },
];

const quikLink02 = [
  {
    path: "/find-a-doctor",
    name: "Find a doctor",
  },
  {
    path: "/",
    name: "Terms & Conditions",
  },
  {
    path: "/",
    name: "FAQs",
  },
  {
    path: "/",
    name: "Support",
  },
  {
    path: "/",
    name: "Sitemap",
  },
];

const quickLinks03 = [
  {
    path: "/",
    name: "Privacy Policy",
  },
  {
    path: "/",
    name: "Contact Us",
  },
  {
    path: "/",
    name: "Careers",
  },
  {
    path: "/",
    name: "Legal",
  },
  {
    path: "/",
    name: "Donate",
  },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="pb-16 pt-10">
      <div className="container">
        <div className="flex  justify-between flex-col  md:flex-row flex-wrap gap-[30px] ">
          <div>
            <img src={logo} alt="logo" />

            <p className="text-[16px] leading-7 mt-4 text-textColor font-[400]">
              Copyrighty {year} developed by solman all right reserved.
            </p>

            <div className="flex items-center gap-3 mt-4">
              {socialLinks.map((link, index) => (
                <Link
                  to={link.path}
                  key={index}
                  className="w-9 h-9 border border-solid border-[#181A1E] rounded-full flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>

                
          <div>
            <h2 className="text-[20px] leading-[30px] font-[700] text-headingColor ">
              Quick Links
            </h2>
            <ul className="mt-5">
              {quikLink01.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="text-[16px] leading-7 text-textColor font-[400]"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[20px] leading-[30px] font-[700] text-headingColor">
              Support
            </h2>
            <ul className="mt-5">
              {quickLinks03.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="text-[16px] leading-7 text-textColor font-[400]"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>


          <div>
            <h2 className="text-[20px] leading-[30px] font-[700] text-headingColor">
              I want to
            </h2>
            <ul className="mt-5">
              {quikLink02.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="text-[16px] leading-7 text-textColor font-[400]"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          </div>

        </div>

    </footer>
  );
};

export default Footer;

