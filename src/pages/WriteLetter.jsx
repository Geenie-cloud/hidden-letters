import { useState } from "react"
import { Link } from "react-router-dom"
import { supabase } from "../supabase"

import letterBg from "../assets/letter.png"
import waxSeal from "../assets/wax-seal.png"

function WriteLetter() {

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()

    if (!title || !content) {
      setMessage("Please complete your letter.")
      return
    }

    setLoading(true)

    const { error } = await supabase
      .from("letters")
      .insert([
        {
          title,
          content,
          letter_group: title.charAt(0).toUpperCase(),
        },
      ])

    if (error) {
      console.error(error)
      setMessage("Something went wrong.")
    } else {
      setMessage("Your letter has been sealed.")
      setTitle("")
      setContent("")
    }

    setLoading(false)
  }

  return (
    <main
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url(${letterBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >

      {/* NAVBAR */}
      {/* FIXED: Added flex-col for mobile layout, switches back to flex-row on desktop */}
      <nav className="
        fixed
        top-0
        left-0
        w-full
        z-50
        flex
        flex-col
        md:flex-row
        items-center
        justify-between
        px-4
        md:px-12
        py-4
        md:py-6
        border-b
        border-[#c9a46a]/10
        backdrop-blur-md
        bg-black/20
        gap-4
        md:gap-0
      ">

        {/* LOGO */}
        <div className="
          text-2xl
          md:text-3xl
          font-display
          tracking-widest
          text-[#eadfcb]
        ">
          HL
        </div>

        {/* NAV LINKS */}
        {/* FIXED: Reduced layout gap and font tracking so links wrap nicely on mobile phones */}
        <div className="
          flex
          flex-wrap
          justify-center
          gap-4
          md:gap-16
          text-xs
          md:text-sm
          uppercase
          tracking-[0.2em]
          md:tracking-[0.35em]
          text-[#eadfcb]
        ">
          <Link
            to="/"
            className="hover:text-[#c9a46a] transition duration-300"
          >
            Home
          </Link>

          <Link
            to="/write-letter"
            className="hover:text-[#c9a46a] transition duration-300"
          >
            Write a Letter
          </Link>

          <Link
            to="/archive"
            className="hover:text-[#c9a46a] transition duration-300"
          >
            Archive
          </Link>
        </div>

      </nav>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/35" />

      {/* CONTENT */}
      {/* FIXED: Increased top padding so the new vertical mobile navbar won't overlap the text */}
      <div className="relative z-10 px-4 md:px-6 py-40 md:py-32">

        {/* HEADER */}
        <section className="text-center mb-10 md:mb-14">
          {/* FIXED: Reduced title text size on mobile screens */}
          <h1 className="font-display text-4xl md:text-7xl text-[#eadfcb] mb-4 md:mb-6">
            Write a Letter
          </h1>

          <p className="text-[#c9a46a] italic text-lg md:text-2xl px-2">
            Leave words behind for someone unknown.
          </p>
        </section>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="max-w-5xl mx-auto"
        >
          {/* FIXED: Lowered fixed padding on mobile layout to maximize typing screen space */}
          <div className="flex flex-col min-h-[500px] md:min-h-[700px] px-4 md:px-20 py-10 md:py-24 bg-black/10 backdrop-blur-sm rounded-lg">
            {/* FIXED: Scaled down input text font size on small viewports */}
            <input
              type="text"
              placeholder="Letter title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="
                bg-transparent
                text-3xl
                md:text-6xl
                italic
                text-[#eadfcb]
                placeholder:text-[#d6c8b5]
                outline-none
                border-b
                border-[#c8a97e]
                pb-3
                md:pb-5
                mb-8
                md:mb-14
                font-display
              "
            />

            {/* FIXED: Scaled down body text font size on small viewports */}
            <textarea
              placeholder="Begin writing..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="
                flex-1
                bg-transparent
                resize-none
                outline-none
                text-xl
                md:text-3xl
                leading-loose
                text-[#f3e7cf]
                placeholder:text-[#d6c8b5]
              "
            />
          </div>

          {/* WAX SEAL BUTTON */}
          {/* FIXED: Scaled down button size on mobile layout */}
          <div className="flex flex-col items-center mt-8 md:mt-10 gap-4 md:gap-6">
            <button
              type="submit"
              disabled={loading}
              className="
                w-28
                h-28
                md:w-40
                md:h-40
                hover:scale-105
                active:scale-95
                transition
                duration-300
                drop-shadow-2xl
              "
            >
              <img
                src={waxSeal}
                alt="Seal Letter"
                className="w-full h-full object-contain"
              />
            </button>

            {message && (
              <p className="italic text-[#c9a46a] text-lg md:text-xl">
                {message}
              </p>
            )}
          </div>

        </form>

      </div>

    </main>
  )
}

export default WriteLetter
