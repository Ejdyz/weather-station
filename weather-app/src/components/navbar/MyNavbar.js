"use client"
import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuToggle} from "@nextui-org/navbar";
import {Link} from "@nextui-org/link"
import {LogoIcon} from "@/components/icons/Icons";

export default function App({page}) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        behavior: "smooth",
        top: section.offsetTop
      });
    }
  }
  return (
  <Navbar onMenuOpenChange={setIsMenuOpen} position="static">
    <NavbarContent>
      <NavbarBrand>
        <LogoIcon className="w-11"/>
      </NavbarBrand>
    </NavbarContent>
    <NavbarContent className="hidden sm:flex gap-4" justify="center">
      <NavbarItem isActive={page==="about"}>
        <Link color="foreground" href="about">
          About
        </Link>
      </NavbarItem>
      <NavbarItem isActive={page==="home"}>
        <Link color="foreground"  href="/" >
          Home
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link color="foreground" onPress={()=>scrollToSection("charts")} className="cursor-pointer">
          Charts
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link color="foreground" onPress={()=>scrollToSection("radar")} className="cursor-pointer">
          Radar
        </Link>
      </NavbarItem>
    </NavbarContent>
    <NavbarContent justify="end">
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />
    </NavbarContent>
    <NavbarMenu>
      <NavbarItem isActive={page==="about"}>
        <Link color="foreground" href="about">
          About
        </Link>
      </NavbarItem>
      <NavbarItem isActive={page==="home"}>
        <Link color="foreground"  href="/" >
          Home
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link color="foreground" href="icons">
          Icons
        </Link>
      </NavbarItem>
    </NavbarMenu>
  </Navbar>
  );
}
