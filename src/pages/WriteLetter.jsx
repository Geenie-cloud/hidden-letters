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
      <nav className="
        fixed
        top-0
        left-0
        w-full
        z-50
        flex
        items-center
        justify-between
        px-12
        py-6
        border-b
        border-[#c9a46a]/10
        backdrop-blur-md
        bg-black/20
      ">

        {/* LOGO */}
        <div className="
          text-3xl
          font-display
          tracking-widest
          text-[#eadfcb]
        ">
          HL
        </div>

        {/* NAV LINKS */}
        <div className="
          flex
          gap-16
          text-sm
          uppercase
          tracking-[0.35em]
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
      <div className="relative z-10 px-6 py-32">

        {/* HEADER */}
        <section className="text-center mb-14">

          <h1 className="font-display text-7xl text-[#eadfcb] mb-6">
            Write a Letter
          </h1>

          <p className="text-[#c9a46a] italic text-2xl">
            Leave words behind for someone unknown.
          </p>

        </section>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="max-w-5xl mx-auto"
        >

          <div className="flex flex-col min-h-[700px] px-20 py-24">

            <input
              type="text"
              placeholder="Letter title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="
                bg-transparent
                text-6xl
                italic
                text-[#eadfcb]
                placeholder:text-[#d6c8b5]
                outline-none
                border-b
                border-[#c8a97e]
                pb-5
                mb-14
                font-display
              "
            />

            <textarea
              placeholder="Begin writing..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="
                flex-1
                bg-transparent
                resize-none
                outline-none
                text-3xl
                leading-loose
                text-[#f3e7cf]
                placeholder:text-[#d6c8b5]
              "
            />

          </div>

          {/* WAX SEAL BUTTON */}
          <div className="flex flex-col items-center mt-10 gap-6">

            <button
              type="submit"
              disabled={loading}
              className="
                w-40
                h-40
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
              <p className="italic text-[#c9a46a] text-xl">
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