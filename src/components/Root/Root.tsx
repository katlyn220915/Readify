import React from "react";
import ActionMenu from "../ActionMenu/ActionMenu";

export default function Root() {
  return (
    <div onClick={(e) => console.log(e.target)}>
      <ActionMenu />
    </div>
  );
}
