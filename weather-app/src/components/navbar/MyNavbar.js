import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@nextui-org/navbar";
import {Link} from "@nextui-org/link"
import {LogoIcon} from "@/components/icons/Icons";

export default function App({page}) {
  return (
    <Navbar position="static">
      <NavbarBrand >
        <LogoIcon className="w-10"/>
      </NavbarBrand>
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
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="end">
      </NavbarContent>
    </Navbar>
  );
}
