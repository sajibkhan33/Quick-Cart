"use client";
import React, { useState } from "react";
import { assets, BagIcon, BoxIcon, CartIcon, HomeIcon } from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, UserButton } from "@clerk/nextjs";
import { Menu, X } from "lucide-react"; // ✅ hamburger & close icon

const Navbar = () => {
  const { isSeller, router, user } = useAppContext();
  const { openSignIn } = useClerk();
  const [menuOpen, setMenuOpen] = useState(false); // ✅ toggle state

  return (
    <nav className="flex items-center justify-between px-4 sm:px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700 relative">
      {/* Logo */}
      <Image
        className="cursor-pointer w-28 md:w-32"
        onClick={() => router.push("/")}
        src={assets.logo}
        alt="logo"
      />

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6 lg:gap-10">
        <Link href="/">Home</Link>
        <Link href="/all-products">Shop</Link>
        <Link href="/">About Us</Link>
        <Link href="/">Contact</Link>

        {isSeller && (
          <button
            onClick={() => router.push("/seller")}
            className="text-xs border px-4 py-1.5 rounded-full"
          >
            Seller Dashboard
          </button>
        )}
      </div>

      {/* Desktop Right Side */}
      <ul className="hidden md:flex items-center gap-4">
        <Image className="w-4 h-4" src={assets.search_icon} alt="search" />
        {user ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <button
            onClick={openSignIn}
            className="flex items-center gap-2 hover:text-gray-900 transition"
          >
            <Image src={assets.user_icon} alt="user icon" />
            Account
          </button>
        )}
      </ul>

      {/* Mobile Section */}
      <div className="flex md:hidden items-center gap-4">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div
          className={`absolute top-14 right-0 w-2/3 sm:w-1/2 bg-white shadow-md border-t border-gray-200 flex flex-col items-start gap-4 p-4 md:hidden z-50 
          transition-all duration-300 ease-in-out transform
          ${
            menuOpen
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0 pointer-events-none"
          }
        `}
        >
          <Link href="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link href="/all-products" onClick={() => setMenuOpen(false)}>
            Shop
          </Link>
          <Link href="/" onClick={() => setMenuOpen(false)}>
            About Us
          </Link>
          <Link href="/" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>

          {isSeller && (
            <button
              onClick={() => {
                router.push("/seller");
                setMenuOpen(false);
              }}
              className="text-xs border px-4 py-1.5 rounded-full"
            >
              Seller Dashboard
            </button>
          )}

          {user ? (
            <button
              onClick={() => {
                router.push("/cart");
                setMenuOpen(false);
              }}
              className="flex items-center gap-2"
            >
              <CartIcon /> Cart
            </button>
          ) : (
            <button
              onClick={() => {
                openSignIn();
                setMenuOpen(false);
              }}
              className="flex items-center gap-2"
            >
              <Image src={assets.user_icon} alt="user icon" />
              Account
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
