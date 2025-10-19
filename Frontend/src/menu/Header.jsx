import { useState } from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import { Menu, X } from "lucide-react"

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <div className="flex items-center justify-between px-5 py-4">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img 
            src="/PhishEye.png" 
            alt="PhishEye" 
            className="h-12 w-12 bg-green-500 rounded-2xl shadow-xl"
          />
          <h1 className="text-2xl font-serif">PhishEye</h1>
        </div>

        {/* Desktop Navbar */}
        <div className="hidden md:flex items-center h-[60px] px-6 py-3 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl">
          <ul className="flex gap-8">
            <li className="border-b-2 border-green-500"><a href="/">Home</a></li>
            <li><a href="/howItWork">Docs</a></li>
            <li><a href="/showCase">Showcase</a></li>
          </ul>
        </div>


        <div className="flex items-center gap-3">
          <div className=" pt-1 h-10 w-10 flex items-center justify-center backdrop-blur-xl border border-white/10 bg-gradient-to-r from-green-600 to-green-700 rounded-4xl shadow-xl">
            <header>
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </header>
          </div>


          <button 
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={26}/> : <Menu size={26}/>}
          </button>
        </div>
      </div>

   
      {menuOpen && (
        <div className="md:hidden mx-4 mb-3 px-5 py-3 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl">
          <ul className="flex flex-col gap-4 text-lg">
            <li className="border-b-2 border-green-500"><a href="#">Home</a></li>
            <li><a href="#">Docs</a></li>
            <li><a href="#">Showcase</a></li>
          </ul>
        </div>
      )}
    </>
  )
}

export default Header
