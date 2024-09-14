import React from "react";
import Link from "next/link";

import { Button } from "./ui/button";

export default function StartButton() {
  return (
    <div className="flex justify-center">
      <Link href="https://cloud.vizoai.com">
        <Button>开始使用</Button>
      </Link>
    </div>
  );
}
