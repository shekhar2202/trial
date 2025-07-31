import { Link } from 'react-router-dom';

const Navbar = ({ user, logout }) => {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-white text-xl font-bold hover:text-blue-100 transition-colors">
            Complaint System
          </Link>
          
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/" className="text-white hover:text-blue-100 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Dashboard
                </Link>
                <Link to="/complaint" className="text-white hover:text-blue-100 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Submit Complaint
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="text-white hover:text-blue-100 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    Admin Panel
                  </Link>
                )}
                <div className="flex items-center space-x-3">
                  <span className="text-white text-sm">Welcome, {user.name}</span>
                  <button 
                    onClick={logout} 
                    className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-white hover:text-blue-100 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Login
                </Link>
                <Link to="/register" className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-200">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-white hover:text-blue-100 focus:outline-none focus:text-blue-100">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {user ? (
              <>
                <Link to="/" className="text-white hover:text-blue-100 block px-3 py-2 rounded-md text-base font-medium">
                  Dashboard
                </Link>
                <Link to="/complaint" className="text-white hover:text-blue-100 block px-3 py-2 rounded-md text-base font-medium">
                  Submit Complaint
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="text-white hover:text-blue-100 block px-3 py-2 rounded-md text-base font-medium">
                    Admin Panel
                  </Link>
                )}
                <div className="border-t border-blue-500 pt-4">
                  <span className="text-white text-sm block px-3 py-2">Welcome, {user.name}</span>
                  <button 
                    onClick={logout} 
                    className="text-white hover:text-blue-100 block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-white hover:text-blue-100 block px-3 py-2 rounded-md text-base font-medium">
                  Login
                </Link>
                <Link to="/register" className="text-white hover:text-blue-100 block px-3 py-2 rounded-md text-base font-medium">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 