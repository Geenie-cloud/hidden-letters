import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useRef, useState } from "react"

import Home from "./pages/Home"
import WriteLetter from "./pages/WriteLetter"
import Archive from "./pages/Archive"
import LetterPage from "./pages/LetterPage"

function App() {

  const audioRef = useRef(null)

  const [playing, setPlaying] = useState(false)

  async function toggleAudio() {

    console.log("clicked")

    if (!audioRef.current) return

    try {

      if (playing) {

        audioRef.current.pause()

        setPlaying(false)

      } else {

        audioRef.current.volume = 0.3

        await audioRef.current.play()

        setPlaying(true)

      }

    } catch (err) {

      console.log(err)

    }

  }

  return (

    <BrowserRouter>

      {/* AUDIO */}

      <audio
        ref={audioRef}
        loop
      >
        <source
          src="/audio/audio.mp3"
          type="audio/mpeg"
        />
      </audio>

      {/* SOUNDTRACK */}

      {/* SOUNDTRACK */}

<button
  onClick={toggleAudio}
  className="
    fixed
    top-10
    right-10
    z-[9999]
    bg-transparent
    border-none
    outline-none
    cursor-pointer
    text-transparent
    w-[170px]
    h-[50px]
  "
  aria-label="Toggle soundtrack"
>
</button>

      {/* ROUTES */}

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/write-letter"
          element={<WriteLetter />}
        />

        <Route
          path="/archive"
          element={<Archive />}
        />

        <Route
          path="/letter/:id"
          element={<LetterPage />}
        />

      </Routes>

    </BrowserRouter>

  )
}

export default App