"use client"
import Link from "next/link"
import { FC } from "react"

const Footer: FC = () => {
  return (
    <footer>
      <hr />
      <div>
        <p>Jungle Chess &#169; 2025</p>
        <Link href="https://discord.gg/bJbRaCrJ3x" target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-discord text-[#5865F2] text-2xl" />
        </Link>
        <Link href="https://twitter.com/JungleChess" target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-twitter text-[#00ACEE] text-2xl" />
        </Link>
        <Link href="https://www.instagram.com/junglechess/" target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-instagram text-[#ce1efa] text-2xl" />
        </Link>
        <Link href="https://github.com/TochuGV/JungleChess" target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-github text-[#fafafa] text-2xl" />
        </Link>
      </div>
    </footer>
  )
}

export default Footer 