import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const id = localStorage.getItem('userId');

  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/signin');
  };

  return (
    <nav className="px-5 py-3 shadow-md sticky top-0 bg-white z-50">
      <div className="flex items-center justify-between max-w-5xl mx-auto">
        {/* left section */}
        <section>
          <Link to={'/'} className="text-3xl font-semibold">
            myspace
          </Link>
        </section>

        {/* right section */}
        {!token ? (
          <section className="flex items-center space-x-4">
            <button className="btn" onClick={() => navigate('/signin')}>
              Signin
            </button>
            <button className="btn" onClick={() => navigate('/signup')}>
              Signup
            </button>
          </section>
        ) : (
          <section>
            <div className="flex items-center space-x-4">
              <Link to={`/profile/${id}`} className="btn">
                Profile
              </Link>
              <button className="btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </section>
        )}
      </div>
    </nav>
  );
}
