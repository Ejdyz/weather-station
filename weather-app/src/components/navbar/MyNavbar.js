"use client"
import React, {useEffect, useRef, useState} from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuToggle} from "@nextui-org/navbar";
import {Link} from "@nextui-org/link"
import {LogoIcon} from "@/components/icons/Icons";
import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react";
import {Button} from "@nextui-org/button";
import { ChevronDown} from "lucide-react";
import {useRouter} from "next/navigation";

export default function App({page}) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollToSection, setScrollToSection] = useState(null);

  const handleLinkClick = (sectionId) => {
    router.push("/#" + sectionId ); // Redirect to the home page
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (!isMenuOpen && scrollToSection) {
      const section = document.getElementById(scrollToSection);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
      // Reset scrollToSection to avoid re-triggering
      setScrollToSection(null);
    }
  }, [isMenuOpen, scrollToSection]);


  function scrollToSectionX(sectionId) {
    if (page !== "home") {
      router.push("/#" + sectionId ); // Redirect to the home page
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
  <Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} position="static" className="z-10" >
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
            color="primary"
            onAction={()=>scrollToSectionX("sunrise")}
            >
              Východ slunce
          </DropdownItem>
          <DropdownItem
             color="primary" onAction={()=>scrollToSectionX("charts")}
            >
              Grafy a tabulky
          </DropdownItem>
          <DropdownItem
             color="primary" onAction={()=>scrollToSectionX("radar")}
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
    <NavbarMenu >
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
