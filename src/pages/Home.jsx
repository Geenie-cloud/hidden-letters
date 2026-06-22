import { Music2 } from "lucide-react"
import heroImage from "../assets/hero-Computer.png"
import { Link } from "react-router-dom"

function Home({ toggleAudio }) {
  return (
    <main
      className="min-h-screen text-parchment bg-cover bg-center bg-no-repeat"
      style={{
        backgroundBlendMode: "multiply",
        backgroundImage: `
          linear-gradient(
            rgba(15, 8, 4, 0.35),
            rgba(10, 5, 2, 0.75)
          ),
          url(${heroImage})
        `
      }}
    >

      {/* NAVBAR */}
      {/* FIXED: Switched px-12 to px-4 on mobile, and made it stack flex-col on small screens */}
      <nav className="sticky top-0 z-50 w-full flex flex-col md:flex-row items-center justify-between px-4 md:px-12 py-4 md:py-6 border-b border-gold/10 backdrop-blur-md bg-black/20 gap-4 md:gap-0">

        <div className="text-2xl md:text-3xl font-display tracking-widest">
          HL
        </div>

        {/* FIXED: Reduced gap-16 to gap-4 on mobile so links wrap and fit on phone screens */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-16 text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.35em]">

          <Link
            to="/"
            className="hover:text-gold transition duration-300"
          >
            Home
          </Link>

          <Link
            to="/write-letter"
            className="hover:text-gold transition duration-300"
          >
            Write a Letter
          </Link>

          <Link
            to="/archive"
            className="hover:text-gold transition duration-300"
          >
            Archive
          </Link>

        </div>

        <button
          onClick={toggleAudio}
          className="flex items-center gap-3 hover:text-gold transition duration-300 text-sm"
        >
          <Music2 size={18} />
          Soundtrack
        </button>

      </nav>

      {/* HERO */}
      <section className="min-h-[88vh]" />

    </main>
  )
}

export default Home
