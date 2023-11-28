import React from "react";

import Image from "next/image";
import SidebarList from "@/components/StaticSidebarList/StaticSidebarList";

import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faBoxArchive } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const staticList = [
  {
    path: "/mybooks",
    iconProp: faBookOpen,
  },
  {
    path: "/later",
    iconProp: faClock,
  },
  {
    path: "/archive",
    iconProp: faBoxArchive,
  },
  {
    path: "/search",
    iconProp: faMagnifyingGlass,
  },
];

// export default function Mylibrary() {
//   return (

//   );
// }
