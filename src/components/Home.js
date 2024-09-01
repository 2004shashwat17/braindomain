import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [showChat, setShowChat] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [isSpeciallyAbled, setIsSpeciallyAbled] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [filteredGames, setFilteredGames] = useState([]);
  const [sortCriteria, setSortCriteria] = useState("all");
  const navigate = useNavigate();

  const games = [
    { name: "Memory Match🎯", path: "/memory-match", type: "normal" },
    { name: "Shape Sorter🥙", path: "/shape-sorter", type: "normal" },
    { name: "Social Awareness🚀", path: "/color-quiz", type: "normal" },
    { name: "Number Sequencing⚙️", path: "/puzzle-game", type: "normal" },
    { name: "Puzzle Game🧩", path: "/math-game", type: "normal" },
    { name: "Maze Game🌽", path: "/maze", type: "normal" },
    { name: "Speech Game🤥", path: "/word-search", type: "special" },
    { name: "Sign Language💌", path: "/letter", type: "special" },
    { name: "Hand Writing🅰️", path: "/building", type: "special" },
    { name: "Sound Identification🔊", path: "/sound", type: "special" },
  ];

  useEffect(() => {
    const sortedGames = games
      .filter((game) => {
        if (sortCriteria === "all") return true;
        if (sortCriteria === "children" && game.type === "normal") return true;
        if (sortCriteria === "special" && game.type === "special") return true;
        return false;
      })
      .sort((a, b) => {
        if (sortCriteria === "special" && a.type === "normal") return 1;
        if (sortCriteria === "special" && b.type === "normal") return -1;
        return 0;
      });

    setFilteredGames(sortedGames);
  }, [sortCriteria]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setShowPopup(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    const checkPopup = () => {
      const registrationTimestamp = localStorage.getItem(
        "registrationTimestamp"
      );
      if (registrationTimestamp) {
        const now = new Date().getTime();
        const elapsed = now - registrationTimestamp;
        const tenMinutes = 10 * 60 * 1000; // 10 minutes in milliseconds
        if (elapsed >= tenMinutes) {
          setShowPopup(true);
        }
      }
    };

    checkPopup(); // Check on component mount
    const interval = setInterval(checkPopup, 60 * 1000); // Check every minute

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && age && gender && isSpeciallyAbled !== "" && termsAccepted) {
      setShowPopup(false);
      // Save profile data to local storage
      const profileData = { name, age, gender, isSpeciallyAbled };
      localStorage.setItem("profile", JSON.stringify(profileData));
      // Save the registration timestamp
      const now = new Date().getTime();
      localStorage.setItem("registrationTimestamp", now);
      // Filter games based on isSpeciallyAbled value
      const sortedGames = games.filter((game) => {
        if (isSpeciallyAbled === "yes" && game.type === "normal") return false;
        if (isSpeciallyAbled === "no" && game.type === "special") return false;
        return true;
      });
      setFilteredGames(sortedGames);
      // Navigate to profile section
      navigate("/profile");
    } else {
      alert("Please fill all the fields and accept the terms.");
    }
  };

 const toggleChat = () => {
    setShowChat(!showChat);
  };
  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
  };
  // Premium Content Carousel State
 const [activeSlide, setActiveSlide] = useState(0);

  const subscriptionOptions = [
    {
      title: "Yearly Subscription",
      description: "Access all premium Games for a year.",
      price: "₹500/year",
    }
  ];
    // {
    //   title: "Monthly Subscription",
    //   description: "Access all premium content for a month.",
    //   price: "$15/month",
    // },
    // {
    //   title: "Yearly Subscription",
    //   description: "Access all premium content for a year.",
    //   price: "$100/year",
    // },
  return (
    <div className="home">
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <button
              className="close-button"
              onClick={() => setShowPopup(false)}
            >
              ×
            </button>
            <h2>Please Provide Your Details</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>
              <br />
              <br />
              <label>
                Age:
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
              </label>
              <br />
              <br />
              <label>Gender:</label>
              <div>
                <label>
                  <input
                    type="radio"
                    value="male"
                    checked={gender === "male"}
                    onChange={() => setGender("male")}
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    value="female"
                    checked={gender === "female"}
                    onChange={() => setGender("female")}
                  />
                  Female
                </label>
                <label>
                  <input
                    type="radio"
                    value="other"
                    checked={gender === "other"}
                    onChange={() => setGender("other")}
                  />
                  Other
                </label>
              </div>
              <br />
              <label>Is your child special?</label>
              <div>
                <label>
                  <input
                    type="radio"
                    value="yes"
                    checked={isSpeciallyAbled === "yes"}
                    onChange={() => setIsSpeciallyAbled("yes")}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    value="no"
                    checked={isSpeciallyAbled === "no"}
                    onChange={() => setIsSpeciallyAbled("no")}
                  />
                  No
                </label>
              </div>
              <br />
              <label>
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={() => setTermsAccepted(!termsAccepted)}
                  required
                />
                I accept the Terms and Conditions
              </label>
              <br />
              <button type="submit">Register</button>
            </form>
          </div>
        </div>
      )}

      <header>
        <nav className="header-nav">
          <Link to="/about" className="about-button">
            MoreInfo 🪶
          </Link>
          <div className="header-rewards">
            <Link to="/reward" className="about-button">
              Rewards🎁
            </Link>
            <Link to="/score" className="about-button">
              Score🪙
            </Link>
          </div>
          <Link to="/report" className="about-button weekly-report-button">
            WeeklyReports🔁
          </Link>
          {/* Profile Icon */}
          <Link to="/profile" className="profile-icon">
            <svg
              width="70"
              height="50"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="12" fill="purple" />
              <path
                fill="white"
                d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-3.31 0-6 2.69-6 6v1h12v-1c0-3.31-2.69-6-6-6z"
              />
            </svg>
          </Link>
        </nav>
        <h1>
          <i>Brain Domain🧠</i>
        </h1>
      </header>
      <br />
      <main className="main">
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <i>
          <b>
            👇🏻Challenges your creative minds to conceptualize and develop unique
            mindsets across 5-10 years of children 👇🏻
          </b>
        </i>
        <br />
        <br />
        <b>
          ```It is dedicated to helping children from playing mindless,
          brain-draining
        </b>
        <br />
        <b>
          video games to engaging in activities that challenge and strengthen
          their minds```
        </b>
        <br />
        <br />
        <i>
          <b>
            Our games are designed to boost cognitive skills, enhance
            problem-solving abilities and promote healthy brain development in a
            fun and interactive way.🎰
          </b>
        </i>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </main>
      <br />
      <div className="sorting-bar">
          <label htmlFor="sort-options">Sort By:</label>
          <select id="sort-options" value={sortCriteria} onChange={handleSortChange}>
            <option value="all">All Games</option>
            <option value="children">For Child</option>
            <option value="special"> For Special Child</option>
          </select>
        </div>
      <div className="game-grid">
        {filteredGames.map((game, index) => (
          <div className="game-item" key={index}>
            <Link
              to={game.path}
              className={`game-link ${game.path.substring(1)}`}
            ></Link>
            <div className="game-name">{game.name}</div>
          </div>
        ))}
      </div>

      {/* Premium Content Section */}
      <section className="premium-content">
        <h2>SUBSCRIPTIONS®️</h2>
        <div className="carousel">
          {subscriptionOptions.map((option, index) => (
            <div
              key={index}
              className={`carousel-item ${
                index === activeSlide ? "active" : ""
              }`}
            >
              <h3>{option.title}</h3>
              <p>{option.description}</p>
              <span>{option.price}</span>
            </div>
          ))}
        </div>
      </section>
      <footer>
        <div className="footer-content">
          <p>© 2024 Brain Boost Games. All rights reserved.</p>
          <h2>
            <i>Brain Domain🧠</i>
          </h2>
          <div className="social-links">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://www.instagram.com/shashwats500/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/shashwat-singh-68b241235/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
          <br />
          <br />
        </div>
        <button
          className="floating-chat-icon"
          onClick={() =>
            window.open(
              "https://mediafiles.botpress.cloud/0a05936d-5547-499a-9e4a-4e91dd0b878d/webchat/bot.html",
              "_blank"
            )
          }
        >
          <i className="fas fa-comments"></i>
        </button>

        <div className="seminar">
        <a
          href="https://www.itu.int/en/ITU-T/Workshops-and-Seminars/2024/0130/Pages/default.aspx"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="seminar-button">Weekly (WHO) Seminar🚀</button>
        </a>
      </div>
      </footer>
    </div>
  );
};

export default Home;
