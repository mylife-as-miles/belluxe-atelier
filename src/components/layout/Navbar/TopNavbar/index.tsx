import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import Link from "next/link";
import React from "react";
import { NavMenu } from "../navbar.types";
import { MenuList } from "./MenuList";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { MenuItem } from "./MenuItem";
import Image from "next/image";
import InputGroup from "@/components/ui/input-group";
import ResTopNavbar from "./ResTopNavbar";
import CartBtn from "./CartBtn";
import UserMenu from "./UserMenu";

const data: NavMenu = [
  {
    id: 1,
    label: "Shop",
    type: "MenuList",
    children: [
      {
        id: 11,
        label: "Watches",
        url: "/shop",
        description: "Sophisticated timepieces for every occasion",
      },
      {
        id: 12,
        label: "Earrings",
        url: "/shop",
        description: "Elegant earrings from studs to statement pieces",
      },
      {
        id: 13,
        label: "Necklaces",
        url: "/shop",
        description: "Beautiful necklaces and pendants for every style",
      },
      {
        id: 14,
        label: "Rings",
        url: "/shop",
        description: "Stunning rings from everyday to special occasions",
      },
      {
        id: 15,
        label: "Bracelets",
        url: "/shop",
        description: "Stylish bracelets and bangles for any look",
      },
      {
        id: 16,
        label: "Jewelry Sets",
        url: "/shop",
        description: "Complete jewelry sets for a coordinated look",
      },
    ],
  },
  {
    id: 2,
    type: "MenuItem",
    label: "On Sale",
    url: "/shop",
    children: [],
  },
  {
    id: 3,
    type: "MenuItem",
    label: "New Arrivals",
    url: "/shop",
    children: [],
  },
  {
    id: 4,
    type: "MenuItem",
    label: "Brands",
    url: "/shop",
    children: [],
  },
];

const TopNavbar = () => {
  return (
    <nav className="sticky top-0 bg-white z-20">
      <div className="flex relative max-w-frame mx-auto items-center justify-between md:justify-start py-5 md:py-6 px-4 xl:px-0">
        <div className="flex items-center">
          <div className="block md:hidden mr-4">
            <ResTopNavbar data={data} />
          </div>
          <Link
            href="/"
            className={cn([
              integralCF.className,
              "text-2xl lg:text-[32px] mb-2 mr-3 lg:mr-10",
            ])}
          >
            BELLUXE ATELIER
          </Link>
        </div>
        <NavigationMenu className="hidden md:flex mr-2 lg:mr-7">
          <NavigationMenuList>
            {data.map((item) => (
              <React.Fragment key={item.id}>
                {item.type === "MenuItem" && (
                  <MenuItem label={item.label} url={item.url} />
                )}
                {item.type === "MenuList" && (
                  <MenuList data={item.children} label={item.label} />
                )}
              </React.Fragment>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <InputGroup className="hidden md:flex bg-[#F0F0F0] mr-3 lg:mr-10">
          <InputGroup.Text>
            <Image
              priority
              src="/icons/search.svg"
              height={20}
              width={20}
              alt="search"
              className="min-w-5 min-h-5"
            />
          </InputGroup.Text>
          <InputGroup.Input
            type="search"
            name="search"
            placeholder="Search for jewelry, watches, rings..."
            className="bg-transparent placeholder:text-black/40"
          />
        </InputGroup>
        <div className="flex items-center">
          <Link href="/search" className="block md:hidden mr-[14px] p-1">
            <Image
              priority
              src="/icons/search-black.svg"
              height={100}
              width={100}
              alt="search"
              className="max-w-[22px] max-h-[22px]"
            />
          </Link>
          <CartBtn />
          <UserMenu />
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;