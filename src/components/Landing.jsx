import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../../src/hooks/logout";
export default function Landing() {
  const logout = useLogout();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = useSelector((store) => store?.user?.data);

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    }
  }, [user]);
  return (
    <div className="min-h-screen bg-base-100">
      {/* Navbar */}
      <div className="navbar bg-base-100 sticky top-0 z-50 px-4 lg:px-8">
        <div className="navbar-start">
          <a className="btn btn-ghost text-xl font-bold text-primary">
            <svg
              className="w-6 h-6 mr-2"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            CodeCrush
          </a>
        </div>
        {!isLoggedIn ? (
          <div className="navbar-end space-x-2">
            <button
              className="btn btn-ghost"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </button>
          </div>
        ) : (
          <div className="flex justify-end w-full">
            <div className="dropdown dropdown-end flex align-center">
              <div className="flex self-center">Hey, {user?.firstName}</div>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-20 rounded-full mx-1 ">
                  <img alt="User Photo" src={user?.photo_url} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-10 w-52 p-1 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a onClick={logout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Hero Section */}
      <section className="hero min-h-screen bg-gradient-to-br from-base-100 to-base-200">
        <div className="hero-content text-center max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Pair programming
                <br />
                <span className="text-accent">for life.</span>
              </h1>
              <p className="text-xl text-base-content/80 max-w-md mx-auto lg:mx-0">
                Connect with developers who share your passion, tech stack, and
                coding style. Build something amazing together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-center">
                <button className="btn btn-primary btn-lg">Get Started</button>
                <button className="btn btn-outline btn-lg">Explore</button>
              </div>
            </div>
            <div className="mockup-code bg-base-300 text-primary">
              <pre data-prefix="$">
                <code>git clone https://love.dev/you</code>
              </pre>
              <pre data-prefix=">" className="text-warning">
                <code>Cloning into 'you'...</code>
              </pre>
              <pre data-prefix=">" className="text-success">
                <code>Match found! 💕</code>
              </pre>
              <pre data-prefix="$">
                <code>npm run build-relationship</code>
              </pre>
              <pre data-prefix=">" className="text-success">
                <code>Building... ❤️ Compiled successfully!</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            Why developers choose CodeCrush
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body text-center">
                <div className="mx-auto mb-4 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </div>
                <h3 className="card-title justify-center">
                  Match by Tech Stack
                </h3>
                <p>
                  Find developers who code in your favorite languages and
                  frameworks.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body text-center">
                <div className="mx-auto mb-4 w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-secondary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h3 className="card-title justify-center">
                  Merge-Ready Profiles
                </h3>
                <p>
                  Showcase your GitHub repos, skills, and coding personality.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body text-center">
                <div className="mx-auto mb-4 w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-accent"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h3 className="card-title justify-center">
                  Open-Source Friendly
                </h3>
                <p>
                  Connect over shared contributions and collaborative projects.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body text-center">
                <div className="mx-auto mb-4 w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-success"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="card-title justify-center">Secure & Private</h3>
                <p>
                  Your code and conversations stay safe with end-to-end
                  encryption.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">How it works</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="mx-auto mb-6 w-16 h-16 bg-primary text-primary-content rounded-full flex items-center justify-center text-2xl font-bold">
                1
              </div>
              <h3 className="text-2xl font-bold mb-4">Create Profile</h3>
              <p className="text-base-content/80">
                Set up your developer profile with your skills, interests, and
                what you're looking to build.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-6 w-16 h-16 bg-secondary text-secondary-content rounded-full flex items-center justify-center text-2xl font-bold">
                2
              </div>
              <h3 className="text-2xl font-bold mb-4">Match</h3>
              <p className="text-base-content/80">
                Swipe through developers, match based on compatibility, and
                start meaningful conversations.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-6 w-16 h-16 bg-accent text-accent-content rounded-full flex items-center justify-center text-2xl font-bold">
                3
              </div>
              <h3 className="text-2xl font-bold mb-4">Pair & Build</h3>
              <p className="text-base-content/80">
                Collaborate on projects, share knowledge, and maybe find your
                coding soulmate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary-content mb-6">
            Ready to find your coding partner?
          </h2>
          <p className="text-xl text-primary-content/90 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who've already found their perfect
            match. Your next great collaboration is just a swipe away.
          </p>
          {!isLoggedIn ? (
            <button
              className="btn btn-lg bg-base-100 text-primary hover:bg-base-200"
              onClick={() => navigate("/signup")}
            >
              Sign up now
            </button>
          ) : (
            <button
              className="btn btn-lg bg-base-100 text-primary hover:bg-base-200"
              onClick={() => navigate("/profile/feed")}
            >
              Go To Feed
            </button>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer footer-center p-10 bg-base-200 text-base-content">
        <nav className="grid grid-flow-col gap-4">
          <a className="link link-hover">Privacy Policy</a>
          <a className="link link-hover">Terms of Service</a>
          <a className="link link-hover">Contact</a>
        </nav>
        <aside>
          <p className="text-sm text-base-content/60">
            © 2024 CodeCrush. Where developers find their match.
          </p>
        </aside>
      </footer>
    </div>
  );
}
