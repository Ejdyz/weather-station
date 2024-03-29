"use client"
import React, {useEffect, useRef} from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuToggle} from "@nextui-org/navbar";
import {Link} from "@nextui-org/link"
import {LogoIcon} from "@/components/icons/Icons";
import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react";
import {Button} from "@nextui-org/button";
import { ChevronDown} from "lucide-react";
import {useRouter} from "next/navigation";

export default function App({page}) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const scrollToRef = useRef(null);
  const handleLinkClick = (sectionId) => {
    if (page !== "home") {
      router.replace("/#" + sectionId ); // Redirect to the home page
    }
    setIsMenuOpen(false);
    scrollToRef.current = sectionId;
  };
  useEffect(() => {
    // Scroll to the section after the navbar is closed
    if (scrollToRef.current) {
      scrollToSection(scrollToRef.current);
      scrollToRef.current = null; // Reset the stored section ID
    }
  }, [isMenuOpen]); // Run this effect whenever isOpen changes

  function scrollToSection(sectionId) {
    if (page !== "home") {
      router.replace("/#" + sectionId ); // Redirect to the home page
    }
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        behavior: "smooth",
        top: section.offsetTop
      });
    }
  }

  return (
  <Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} position="static" className="z-10">
    <NavbarContent>
      <NavbarBrand>
        <LogoIcon className="w-11"/>
      </NavbarBrand>
    </NavbarContent>
    <NavbarContent className="hidden sm:flex gap-4" justify="center">
      <NavbarItem isActive={page==="about"}>
        <Link color="foreground" href="about">
          O projektu
        </Link>
      </NavbarItem>
      <NavbarItem isActive={page==="home"}>
        <Link color="foreground"  href="/" >
          Počasí
        </Link>
      </NavbarItem>
      <Dropdown>
        <NavbarItem>
          <DropdownTrigger>
            <Button
              disableRipple
              className="p-0 bg-transparent data-[hover=true]:bg-transparent "
              radius="sm"
              variant="light"
              endContent={<ChevronDown size={16} />}
            >
              Funkce
            </Button>
          </DropdownTrigger>
        </NavbarItem>
        <DropdownMenu
          aria-label="Možnosti zobrazení"
          itemClasses={{
            base: "gap-4",
          }}
        >
          <DropdownItem
            key="Východ slunce"
            color="primary"
            onPress={()=>scrollToSection("sunrise")}
            >
              Východ slunce
          </DropdownItem>
          <DropdownItem
            key="Východ slunce"
             color="primary" onPress={()=>scrollToSection("charts")}
            >
              Grafy a tabulky
          </DropdownItem>
          <DropdownItem
            key="Východ slunce"
             color="primary" onPress={()=>scrollToSection("radar")}
            >
              Radar
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <NavbarItem isActive={page==="status"}>
        <Link color="foreground" href="status">
          Status
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
        <Link color="foreground"  href="/about" >
          O projektu
        </Link>
      </NavbarItem>
      <NavbarItem isActive={page==="home"}>
        <Link color="foreground"  href="/" >
          Počasí
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link color="foreground" onPress={()=> {handleLinkClick("sunrise")}} className="cursor-pointer">
          - Východ slunce
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link color="foreground" onPress={()=>handleLinkClick("charts")} className="cursor-pointer">
          - Grafy
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link color="foreground" onPress={()=> {handleLinkClick("radar")}} className="cursor-pointer">
          - Radar
        </Link>
      </NavbarItem>
      <NavbarItem isActive={page==="status"}>
        <Link color="foreground"  href="/status" >
          Status
        </Link>
      </NavbarItem>
    </NavbarMenu>
  </Navbar>
  );
}
