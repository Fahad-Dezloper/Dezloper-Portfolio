import react from 'react'
import GitHubContributionsDemo from '../components/GithubChart'

const Blogs = () => {
    return (
        <div className="min-w-2xl max-w-2xl">
        
        <div className="w-full mb-12">
          <div className='flex justify-between w-full'>
            <span>how are you doing</span>
            <span>Jan 18, 2026</span>
          </div>
        </div>

        <div className="flex flex-col">
          <h2 className="w-full mb-5 text-left text-xl font-bold text-neutral-900 dark:text-white">
        For Devs
          </h2>
          <div className='grid grid-cols-2 overflow-hidden gap-4'>
          {[
      { title: "Project One", desc: "Short description that can wrap to two lines.", color: "bg-blue-100" },
      { title: "Project One", desc: "Short description that can wrap to two lines.", color: "bg-red-100" },
    ].map((item, index) => (
      <article
        key={index}
        className="flex h-[20vh] bg-red-300 rounded-2xl w-full flex-col gap-3"
      >
        {/* <div
          className={`h-[20vh] w-full rounded-2xl ${item.color}`}
        />
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-left text-base font-semibold text-neutral-900 dark:text-white">
            {item.title}
          </h3>
          <span className="shrink-0 text-neutral-900 dark:text-white" aria-hidden>
            ↗
          </span>
        </div>
        <p className="text-left text-sm leading-snug text-zinc-600 dark:text-zinc-400">
          {item.desc}
        </p> */}
      </article>
    ))}
          </div>
        </div>
      </div>
    )
}
export default Blogs
