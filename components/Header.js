import React from "react";
import Link from "next/link";
import { FileQuestion, Mail, MessageCircleMore, SquareUser   } from "lucide-react";
const Header = () => {
  return (
    <>
      <header>
        <nav className="container mx-auto p-2 space-x-4 flex justify-center items-center md:justify-end flex-wrap gap-4">
          <Link
            href={"#"}
            className="text-sm flex gap-1 items-center text-textColor font-normal"
          >
            FAQ <FileQuestion size={16} />
          </Link>
          <Link
            href={"#"}
            className="text-sm flex gap-1 items-center text-textColor font-normal"
          >
            Send Inquiry <Mail size={16} />
          </Link>
          <Link
            href={"#"}
            className="text-sm flex gap-1 items-center text-textColor font-normal"
          >
            Live Support <MessageCircleMore  size={16} />
          </Link>
          <Link
            href={"#"}
            className="text-sm flex gap-1 items-center text-textColor font-normal"
          >
            Contact <SquareUser   size={16} />
          </Link>
        </nav>
      </header>
    </>
  );
};

export default Header;
