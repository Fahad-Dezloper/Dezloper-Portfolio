import React from 'react'

const Navbar = () => {
  return (
    <div className="flex items-end max-w-2xl justify-between mb-5 md:mb-10  w-full">
        <a href='/' className="hover:bg-neutral-200 dark:hover:bg-neutral-700 p-2 rounded-2xl -ml-2 transition-[background-color] font-bold">Fahad Khan</a>
        <nav className="text-xs grow justify-end items-center flex">
        <a className="group p-2" href="/about"><span className="group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700 rounded-xl py-0.5 px-1.5 inline-flex">About</span></a>
        <a className="group p-2" href="/about"><span className="group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700 rounded-xl py-0.5 px-1.5 inline-flex">More</span></a>
          <a href="https://x.com/dezloperr" target="_blank" className="group inline-flex items-center p-2 rounded-sm transition-[background-color] whitespace-nowrap -mr-2"><span className="group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700 rounded-xl py-0.5 px-1.5 inline-flex items-center gap-1"><svg viewBox="0 0 24 24" className="inline-flex fill-current" width="12" height="12"><g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g></svg><span>Follow me</span></span></a>
        </nav>
        </div>
  )
}

export default Navbar