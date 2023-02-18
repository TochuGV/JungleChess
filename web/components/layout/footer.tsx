"use client"
import Link from "next/link"
import { FC } from "react"

const Footer: FC = () => {
  return (
    <footer>
      <hr />
      <div>
        <p>Jungle Chess &#169; 2023</p>
        <Link href="https://discord.gg/bJbRaCrJ3x" target="_blank" rel="noopener noreferrer">
          <i className="discord-icon" />
        </Link>
      </div>
    </footer>
  )
}

export default Footer 