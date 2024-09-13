import { Link } from "@tanstack/react-router";

const Navbar = () => {
  return (
    <div>
      <div className='p-2 flex gap-2 h-[72px] px-12 py-4 border-y border-y-custom-gray-stroke'>
        <Link to='/' className='[&.active]:font-bold'>
          Home
        </Link>{" "}
        <Link to='/HPCalculator' className='[&.active]:font-bold'>
          Calculator
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
