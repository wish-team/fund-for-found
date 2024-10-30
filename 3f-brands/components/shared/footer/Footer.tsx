
import React from "react";
import Links from "../Links";
import { FaTwitter } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { BsDiscord } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import TranslateBtn from "./TranslateBtn";


const Footer: React.FC = () => {
  return (
    <footer className="bg-light4 w-full rounded-t-3xl">
      <div className="max-w-6xl mx-auto py-16 px-4 ps-16">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-base text-gray2 font-semibold">ABOUT</h4>
            <ul className="mt-2 flex flex-col items-start gap-1">
              <Links href="/about" text="About Us" textColor="text-gray2" />
              <Links href="/about" text="Contact Us" textColor="text-gray2" />
            </ul>
          </div>
          <div>
            <h4 className="text-base text-gray2 font-semibold">RESOURCES</h4>
            <ul className="mt-2 flex flex-col items-start gap-1">
              <Links href="/about" text="Blog" textColor="text-gray2" />
              <Links
                href="/about"
                text="How 3F works?"
                textColor="text-gray2"
              />
              <Links
                href="/about"
                text="Help & support"
                textColor="text-gray2"
              />
            </ul>
          </div>
          <div>
            <h4 className="text-base text-gray2 font-semibold">CONTRIBUTING</h4>
            <ul className="mt-2 flex flex-col items-start gap-1">
              <Links
                href="/about"
                text="Brand & Organizations"
                textColor="text-gray2"
              />
              <Links href="/about" text="Pricing" textColor="text-gray2" />
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t flex flex-wrap items-baseline justify-center space-x-6 gap-4 border-gray-200 mt-8 py-4">
        <div >
            <TranslateBtn />
        </div>
        <div className="hidden md:block">
          <ul className="mt-2 flex items-start space-x-8 gap-1">
            <Links href="/about" text="Trust & safety" textColor="text-gray2" />
            <Links href="/about" text="Terms of use" textColor="text-gray2" />
            <Links href="/about" text="Privacy Policy" textColor="text-gray2" />
          </ul>
        </div>
        <div>
          <ul className="mt-2 flex items-start space-x-3 gap-1 text-gray3 hover:text-gray1">
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaGithub /></a>
            <a href="#"><BsDiscord /></a>
            <a href="#"><FaLinkedin /></a>
            <a href="#"><MdEmail /></a>
          </ul>
        </div>
        <div className="block md:hidden">
          <ul className="mt-2 flex items-start space-x-8 gap-1">
            <Links href="/about" text="Trust & safety" textColor="text-gray2" />
            <Links href="/about" text="Terms of use" textColor="text-gray2" />
            <Links href="/about" text="Privacy Policy" textColor="text-gray2" />
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
