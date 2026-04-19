"use client";
import React, { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex items-end max-w-2xl justify-between mb-5 md:mb-10  w-full">
      <a
        href="/"
        className="hover:bg-neutral-200 dark:hover:bg-neutral-700 p-2 rounded-2xl -ml-2 transition-[background-color] font-bold"
      >
        Fahad Khan
      </a>
      <nav className="text-xs grow justify-end items-center flex">
        <a className="group p-2" href="/about">
          <span className="group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700 rounded-xl py-0.5 px-1.5 inline-flex">
            About
          </span>
        </a>
        <a className="group p-2" href="/about">
          <span className="group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700 rounded-xl py-0.5 px-1.5 inline-flex">
            Blogs
          </span>
        </a>
        <a className="group p-2" href="/about">
          <span className="group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700 rounded-xl py-0.5 px-1.5 inline-flex">
            Books
          </span>
        </a>
        {/* <div className="flex flex-col relative items-center">
          <span onClick={() => setOpen(true)} className="group p-2">
            <span
              className={`group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700 ${open == true && "bg-neutral-700"} rounded-xl py-0.5 px-1.5 inline-flex`}
            >
              More
            </span>
          </span>
          {open == true && (
            <div className="flex flex-col items-center bg-neutral-800 rounded-xl absolute top-8 py-1 px-2 gap-0">
              <a className="group px-2 py-1" href="/blogs">
                <span className="group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700 rounded-xl py-0.5 px-1.5 inline-flex">
                  Blogs
                </span>
              </a>
              <a className="group px-2 py-1" href="/books">
                <span className="group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700 rounded-xl py-0.5 px-1.5 inline-flex">
                  Books
                </span>
              </a>
            </div>
          )}
        </div> */}
          <div className="flex gap-1 relative  px-2">
          <span className="absolute -top-2 left-2 font-bold text-neutral-400 whitespace-nowrap">Follow me</span>
            <a
              href="https://x.com/dezloperr"
              target="_blank"
              className="group inline-flex items-center py-2 px-1 rounded-sm transition-[background-color] whitespace-nowrap -mr-2"
            >
              <span className="group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700 rounded-xl py-0.5 px-1.5 inline-flex items-center gap-1">
                <svg
                  viewBox="0 0 24 24"
                  className="inline-flex fill-current"
                  width="12"
                  height="12"
                >
                  <g>
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                  </g>
                </svg>
              </span>
            </a>
            <a
              href="https://github.com/fahad-dezloper"
              aria-label="Homepage"
              className="group inline-flex items-center py-2 px-1 rounded-sm transition-[background-color] whitespace-nowrap -mr-2"
              title="GitHub"
            >
              <span className="group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700 rounded-xl py-0.5 px-1.5 inline-flex items-center gap-1">
              <svg
                aria-hidden="true"
                className="inline-flex fill-current"
                height="12"
                version="1.1"
                viewBox="0 0 16 16"
                width="12"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
                ></path>
              </svg>
              </span>
            </a>
          </div>
      </nav>
    </div>
  );
};

export default Navbar;
