import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const Navbar = () => {
  const [isCourseDropdownOpen, setIsCourseDropdownOpen] = useState(false);
  const [isRankDropdownOpen, setIsRankDropdownOpen] = useState(false);
  const courseDropdownRef = useRef(null);
  const rankDropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        courseDropdownRef.current &&
        !courseDropdownRef.current.contains(event.target)
      ) {
        setIsCourseDropdownOpen(false);
      }
      if (
        rankDropdownRef.current &&
        !rankDropdownRef.current.contains(event.target)
      ) {
        setIsRankDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    
    <nav className="bg-white px-4 py-2 shadow-md w-full relative">
      <div className="flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <img
            src="/university-logo.webp"
            alt="University Logo"
            className="h-20 w-20 mr-3 object-contain"
          />
          <div>
            <h1 className="text-xl font-bold text-blue-900">
              OXFORDIA UNIVERSITY OF SCIENCE AND TECHNOLOGY
            </h1>
            <p className="text-sm text-blue-800 font-medium">
              ഓക്സ്ഫോർഡിയ ശാസ്ത്ര സാങ്കേതിക സർവകലാശാല
            </p>
            <p className="text-xs text-blue-600 font-semibold">
              Re-accredited by NAAC with A++
            </p>
            <h2 className="text-lg font-bold text-red-600 mt-1">
              ACADEMIC ADMISSIONS - 2025
            </h2>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-10 text-blue-900 font-semibold text-sm">
          <Link to="/" className="hover:underline">HOME</Link>
          <Link to="/about" className="hover:underline">ABOUT US</Link>

          {/* Course List with Dropdown */}
          <div className="relative" ref={courseDropdownRef}>
            <button
              className="hover:underline focus:outline-none"
              onClick={() => setIsCourseDropdownOpen(!isCourseDropdownOpen)}
            >
              COURSE LIST ▼
            </button>
            {isCourseDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white text-blue-900 rounded-lg shadow-lg border border-gray-300 z-50">
                <Link to="/ug-programs" className="block px-4 py-2 hover:bg-gray-100">UG Programs</Link>
                <Link to="/pg-programs" className="block px-4 py-2 hover:bg-gray-100">PG Programs</Link>
                <Link to="/short-courses" className="block px-4 py-2 hover:bg-gray-100">Short-term Courses</Link>
                <Link to="/research-programs" className="block px-4 py-2 hover:bg-gray-100">Research Programs</Link>
              </div>
            )}
          </div>

          <Link to="/downloads" className="hover:underline">DOWNLOADS</Link>

          {/* Last Rank Dropdown */}
          <div className="relative" ref={rankDropdownRef}>
            <button
              className="hover:underline focus:outline-none"
              onClick={() => setIsRankDropdownOpen(!isRankDropdownOpen)}
            >
              LAST RANK ▼
            </button>
            {isRankDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white text-blue-900 rounded-lg shadow-lg border border-gray-300 z-50">
                <Link to="/last-rank/btech" className="block px-4 py-2 hover:bg-gray-100">B.Tech</Link>
                <Link to="/last-rank/mtech" className="block px-4 py-2 hover:bg-gray-100">M.Tech</Link>
                <Link to="/last-rank/mba" className="block px-4 py-2 hover:bg-gray-100">MBA</Link>
                <Link to="/last-rank/phd" className="block px-4 py-2 hover:bg-gray-100">PhD</Link>
              </div>
            )}
          </div>

          <Link to="/contact" className="hover:underline">CONTACT US</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
