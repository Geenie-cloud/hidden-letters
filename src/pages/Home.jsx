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
      <nav className="sticky top-0 z-50 w-full flex items-center justify-between px-12 py-6 border-b border-gold/10 backdrop-blur-md bg-black/20">

        <div className="text-3xl font-display tracking-widest">
          HL
        </div>

        <div className="flex gap-16 text-sm uppercase tracking-[0.35em]">

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
          className="flex items-center gap-3 hover:text-gold transition duration-300"
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