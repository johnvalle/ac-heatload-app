import { Link } from "@tanstack/react-router"

const Navbar = () => {
  return (
    <div className="mx-auto max-w-[1000px] bg-white">
      <div className="p-2 flex gap-6 h-[72px] px-8 py-4 border-y border-y-custom-gray-stroke">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{" "}
        <Link to="/ACCalculator" className="[&.active]:font-bold">
          AC Calculator
        </Link>
        <Link to="/ACValidator" className="[&.active]:font-bold">
          AC Validator
        </Link>
      </div>
    </div>
  )
}

export default Navbar
