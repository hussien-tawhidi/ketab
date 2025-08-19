import React from "react";
import DesktopHeader from "./DesktopHeader";

import MobileTopHeader from "./mobile/MobileTopHeader";
import MobileBottomHeader from "./mobile/MobileBottomHeader";

export default function Header() {
  return (
    <div>
      <div className='md:hidden block'>
        <MobileTopHeader />
        <MobileBottomHeader />
      </div>
      <div className='md:block hidden'>
        <DesktopHeader />
      </div>
    </div>
  );
}
