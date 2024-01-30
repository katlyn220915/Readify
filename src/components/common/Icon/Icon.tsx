import React from "react";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Icon({
  path,
  iconProp,
}: {
  path: string;
  iconProp: any;
}) {
  return (
    <Link href={path}>
      <FontAwesomeIcon icon={iconProp} className="icon" />
    </Link>
  );
}
