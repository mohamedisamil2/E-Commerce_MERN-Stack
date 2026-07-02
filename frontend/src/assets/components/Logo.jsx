import { Link } from "react-router-dom";

function Logo() {
  return (
    
      
        <Link to="/">
          <h1 className="text-lg md:text-2xl font-semibold bg-linear-to-r/hsl from-indigo-500 to-teal-400 ">
            ElNene Store
          </h1>
        </Link>
  );
}

export default Logo