export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6">
      <div className="text-2xl font-bold tracking-wider text-white">
        ai-ne<span className="text-amber-400">.uk</span>
      </div>

      <nav className="hidden md:block">
        <ul className="flex space-x-8">
          <li>
            <a href="#" className="text-sm text-amber-400 hover:text-amber-300">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="text-sm text-gray-400 hover:text-white">
              About
            </a>
          </li>
          <li>
            <a href="#" className="text-sm text-gray-400 hover:text-white">
              Portfolio
            </a>
          </li>
          <li>
            <a href="#" className="text-sm text-gray-400 hover:text-white">
              Service
            </a>
          </li>
          <li>
            <a href="#" className="text-sm text-gray-400 hover:text-white">
              Team
            </a>
          </li>
          <li>
            <a href="#" className="text-sm text-gray-400 hover:text-white">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
