import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { motion } from "framer-motion"
import { supabase } from "../supabase"

import letterBg from "../assets/letter.png"

function LetterPage() {
  const { id } = useParams()

  const [letter, setLetter] = useState(null)

  useEffect(() => {
    fetchLetter()
  }, [])

  async function fetchLetter() {
    const { data, error } = await supabase
      .from("letters")
      .select("*")
      .eq("id", id)
      .single()

    if (!error) {
      setLetter(data)
    }
  }

  if (!letter) {
    return (
      <main className="min-h-screen bg-[#120807] flex items-center justify-center text-[#eadfcb] text-2xl">
        This letter was lost to time.
      </main>
    )
  }

  return (
    <main
      className="min-h-screen relative overflow-hidden px-6 py-20"
      style={{
        backgroundImage: `url(${letterBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/65" />

      {/* CONTENT */}
      <div className="relative z-10">

        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4 }}
          className="
            max-w-5xl
            mx-auto
            bg-[#e8ddc4]/95
            text-[#2d1d16]
            p-16
            shadow-2xl
            border
            border-[#b89d6a]
            backdrop-blur-sm
          "
        >

          <h1 className="font-display text-7xl italic mb-12">
            {letter.title}
          </h1>

          <p className="text-3xl leading-loose whitespace-pre-wrap">
            {letter.content}
          </p>

          <p className="mt-16 italic opacity-60 text-lg">
            Sealed on{" "}
            {new Date(letter.created_at).toLocaleDateString()}
          </p>

        </motion.section>

      </div>

    </main>
  )
}

export default LetterPage