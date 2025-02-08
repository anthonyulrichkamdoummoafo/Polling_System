import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Vote = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  // Scroll event listener to change header style
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // State for selected voting option and user name
  const [selectedOption, setSelectedOption] = useState("");
  const [name, setName] = useState("Anthony Ulrich Kamdoum Moafo");

  // Function to handle voting
  const handleVote = () => {
    if (!selectedOption) {
      alert("Please select a team before voting!");
      return;
    }

    if (!name.trim()) {
      alert("Please enter your name before voting!");
      return;
    }

    // Here you would send the vote to your backend
    console.log(`Vote submitted: ${selectedOption} by ${name}`);

    alert(`You voted for ${selectedOption}!`);
  };

  return (
    <div className="container">
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
        <div className={styles.logo}>
          Pulse <span>Vote</span>
        </div>
        <nav className={styles.nav}>
          <Link to="/create-poll" className={styles.nav_item}>
            Create Poll
          </Link>
          <Link to="/browse-polls" className={styles.nav_item}>
            Browse Polls
          </Link>
          <Link to="/profile" className={styles.nav_item} onClick={handleLogout}>
            Logout
          </Link>
        </nav>
      </header>

      <div className={styles.pollContainer}>
        <h2 className={styles.title}>Who will win the El Clasico?</h2>
        <p className={styles.author}>
          by <strong>Anthony Ulrich Kamdoum Moafo</strong> · 3 weeks ago
        </p>

        <div className={styles.pollImage}>
          <img src="/el-clasico.jpg" alt="El Clasico" />
        </div>

        <form>
          <p className={styles.choiceText}>Make a choice:</p>
          <label className={styles.option}>
            <input
              type="radio"
              name="team"
              value="FC Barcelona"
              onChange={(e) => setSelectedOption(e.target.value)}
            />
            FC Barcelona
          </label>
          <label className={styles.option}>
            <input
              type="radio"
              name="team"
              value="Real Madrid"
              onChange={(e) => setSelectedOption(e.target.value)}
            />
            Real Madrid
          </label>

          <label htmlFor="name" className={styles.label}>
            Name (Required)
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
          />

          <div className={styles.pollActions}>
            <button type="button" className={styles.voteBtn} onClick={handleVote}>
              Vote
            </button>
            <button type="button" className={styles.resultsBtn}>Show results</button>
            <button type="button" className={styles.shareBtn}>Share</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Vote;
