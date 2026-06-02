import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { supabase } from "../supabase"

import archiveBg from "../assets/archive.png"

function Archive() {

  const [letters, setLetters] = useState([])
  const [openShelf, setOpenShelf] = useState(false)

  useEffect(() => {
    fetchLetters()
  }, [])

  async function fetchLetters() {

    const { data, error } = await supabase
      .from("letters")
      .select("*")
      .order("created_at", { ascending: false })

    if (!error) {
      setLetters(data)
    }
  }

  return (

    <main
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url(${archiveBg})`,
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
      <div className="absolute inset-0 bg-black/45 z-10" />

      {/* CLICKABLE DRAWERS */}
      <button
        onClick={() => setOpenShelf(true)}
        className="
          absolute
          bottom-0
          left-1/2
          -translate-x-1/2
          z-30
          w-[85%]
          h-[320px]
          bg-transparent
          border-none
          cursor-pointer
        "
      >

        {/* HOVER GLOW */}
        <div className="
          absolute
          inset-0
          hover:bg-[#c9a46a]/5
          transition
          duration-500
        " />

      </button>

      {/* OPEN SHELF */}
      <AnimatePresence>

        {openShelf && (

          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              type: "spring",
              damping: 18,
              stiffness: 100,
            }}
            className="
              fixed
              inset-0
              z-[999]
              bg-[#120b08]/92
              overflow-y-auto
            "
          >

            {/* CLOSE */}
            <button
              onClick={() => setOpenShelf(false)}
              className="
                fixed
                top-24
                right-10
                z-[1000]
                cursor-pointer
                bg-transparent
                border-none
                text-[#eadfcb]
                text-sm
                tracking-[0.35em]
                uppercase
                hover:text-white
                transition
                duration-300
              "
            >
              CLOSE
            </button>

            {/* SHELF WRAPPER */}
            <div className="
              max-w-7xl
              mx-auto
              px-10
              pt-40
              pb-24
            ">

              {/* BROWN SHELF */}
              <div className="
                bg-[#3a2417]/95
                border-[12px]
                border-[#24140b]
                shadow-[0_0_80px_rgba(0,0,0,0.85)]
                p-14
              ">

                {/* TITLE INSIDE BOX */}
                <div className="text-center mb-20">

                  <h2 className="
                    font-display
                    text-7xl
                    text-[#eadfcb]
                    mb-4
                  ">
                    Hidden Shelf
                  </h2>

                  <p className="
                    text-[#c9a46a]
                    italic
                    text-2xl
                  ">
                    Forgotten letters preserved forever.
                  </p>

                </div>

                {/* LETTER GRID */}
                <div className="
                  grid
                  grid-cols-1
                  md:grid-cols-2
                  lg:grid-cols-3
                  gap-14
                ">

                  {letters.map((letter, index) => (

                    <motion.div
                      key={letter.id}
                      initial={{
                        opacity: 0,
                        y: 40,
                        rotate: -2
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        rotate: index % 2 === 0 ? -1 : 1
                      }}
                      transition={{
                        delay: index * 0.05
                      }}
                      whileHover={{
                        y: -12,
                        rotate: 0,
                        scale: 1.02
                      }}
                      className="
                        bg-[#ece1cb]
                        text-[#2d1d16]
                        p-10
                        min-h-[520px]
                        border
                        border-[#b89d6a]
                        shadow-2xl
                        cursor-pointer
                        relative
                      "
                    >

                      {/* LETTER TITLE */}
                      <h2 className="
                        font-display
                        text-5xl
                        italic
                        leading-tight
                        mb-10
                      ">
                        {letter.title}
                      </h2>

                      {/* LETTER CONTENT */}
                      <p className="
                        text-xl
                        leading-loose
                      ">
                        {letter.content}
                      </p>

                      {/* DATE */}
                      <p className="
                        italic
                        text-sm
                        opacity-60
                        mt-10
                      ">
                        Sealed on{" "}
                        {new Date(letter.created_at).toLocaleDateString()}
                      </p>

                    </motion.div>

                  ))}

                </div>

              </div>

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </main>
  )
}

export default Archive