import Image from "next/image";
import React from "react";

export default function Logo() {
  return (
    <div className="flex gap-2 items-center cursor-pointer">
      <Image
        width={120}
        height={20}
        src="https://langfuse.com/langfuse_logo.svg"
        alt="logo"
      />
    </div>
  );
}
