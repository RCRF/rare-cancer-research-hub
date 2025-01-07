import Link from "next/link";

import { Container } from "./Container";
import { NavLink } from "./NavLink";

export function Footer() {
  return (
    <footer className="bg-slate-50 ">
      <Container>
        <div className="py-10">

        </div>
        <div className="flex flex-col items-center border-t border-slate-400/10 py-5 sm:justify-between">

          <p className=" text-xs text-slate-500 sm:mt-0 text-center">The information provided on this website is for informational purposes only and should not be considered as medical advice.</p>
          <p className="pt-2 text-sm text-slate-500 sm:mt-0 text-center">
            Copyright &copy; {new Date().getFullYear()} TechNessie. All rights
            reserved.
          </p>
          <p>
            <a href="/privacy" target="_blank" className="text-sm text-slate-500 sm:mt-0 text-center w-1/5">Privacy Policy</a>
          </p>


        </div>
      </Container>
    </footer>
  );
}
