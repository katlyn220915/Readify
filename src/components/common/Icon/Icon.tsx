import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

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
