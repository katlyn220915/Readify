import {
  faBookOpen,
  faBoxArchive,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { ListItemProps } from "@/types/CategoryPage";

const staticSidebarItems: ListItemProps[] = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "My Library",
    path: "mylibrary",
    iconProp: faBookOpen,
  },
  {
    title: "Later",
    path: "later",
    iconProp: faClock,
  },
  {
    title: "Archive",
    path: "archive",
    iconProp: faBoxArchive,
  },
  {
    title: "Search",
    path: "search",
    iconProp: faMagnifyingGlass,
  },
];

export default staticSidebarItems;
