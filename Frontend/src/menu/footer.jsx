 import {MapPin, Mail, Phone } from "lucide-react";
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-yellow-400 via-lime-400 to-lime-500 bg-clip-text text-transparent border-t backdrop-blur-xl border border-white/10 transform">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex gap-3 h-[60px]">
    <img src="/PhishEye.png" alt="" className='h-[50px] h-[50px] bg-green-500 rounded-4xl shadow-xl '/>
    <h className='pt-1 text-3xl font-serif'>PhishEye</h>
  </div>
          <p className="text-gray-600 text-sm mb-4">
            Quick setup, easy to use, and completely free to start securing your digital presence.
          </p>
          <div className="flex gap-3">

  <a href="#" className="pl-3 pt-2 h-[40px] w-[40px] bg-green-600 rounded-full hover:bg-green-400">
    <i className="bi bi-facebook text-white text-lg "></i>
  </a>
  <a href="#" className="pl-3 pt-2 h-[40px] w-[40px] bg-green-600 rounded-full hover:bg-green-400">
    <i className="bi bi-twitter text-white text-lg"></i>
  </a>
  <a href="https://www.linkedin.com/in/swapnil-jadhav-90247a2b0?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="pl-3 pt-2 h-[40px] w-[40px] bg-green-600 rounded-full hover:bg-green-400 " target="blank">
    <i className="bi bi-linkedin text-white text-lg"></i>
  </a>
  <a href="https://github.com/swapniljadhav08" className="pl-3 pt-2 h-[40px] w-[40px] bg-green-600 rounded-full hover:bg-green-400" target="blank">
    <i className="bi bi-github text-white text-lg"></i>
  </a>
  <a href="#" className="pl-3 pt-2 h-[40px] w-[40px] bg-green-600 rounded-full hover:bg-green-400">
    <i className="bi bi-instagram text-white text-lg"></i>
  </a>
</div>


        </div>
        <div>
          <h3 className="font-semibold mb-3">Services</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="#">MVP Development</a></li>
            <li><a href="#">Full-Stack Development</a></li>
            <li><a href="#">AI Solutions</a></li>
            <li><a href="#">LLM Applications</a></li>
            <li><a href="#">Data Engineering</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Team</a></li>
            <li><a href="#">Case Studies</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Careers</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Contact</h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <MapPin size={16} /> Kolhapur, Maharastra
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} /> sm2021jadhav@gmail.com
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} /> +91 9021397009
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t py-4 text-center text-sm text-gray-500">
        © 2025 Chillbion. All rights reserved.
      </div>
    </footer>
  );
}
