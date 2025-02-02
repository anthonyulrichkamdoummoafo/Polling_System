import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import { FaQuestionCircle, FaCamera, FaThLarge, FaUsers } from "react-icons/fa";

const Main = () => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    }

    // Scroll event listener to change header style
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className={styles.main_container}>
            {/* Header with Logo and Navigation */}
            <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
                <div className={styles.logo}>Pulse <span>Vote</span></div>
                <nav className={styles.nav}>
                    <Link to="/create-poll" className={styles.nav_item}>Create Poll</Link>
                    <Link to="/browse-polls" className={styles.nav_item}>Browse Polls</Link>
                    <Link to="/profile" className={styles.nav_item} onClick={handleLogout}>Logout</Link>
                </nav>
            </header>

            {/* Hero Section */}
            <section className={styles.hero_section}>
                <div className={styles.hero_content}>
                    <h1>Welcome to Pulse Vote</h1>
                    <p>Your voice matters. Create and participate in real-time polls to influence decisions.</p>
                    <div className={styles.cta_buttons}>
                        <Link to="/create-poll">
                            <button className={styles.green_btn}>Create Poll</button>
                        </Link>
                        <Link to="/browse-polls">
                            <button className={styles.white_btn}>Browse Polls</button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className={styles.features_section}>
      <h1>
        Create Polls That <span className={styles.highlight}>Engage</span> Your
        Audience
      </h1>
      <p className={styles.subtitle}>
        Pulse Vote Provides All The Capabilities You Need To Create And Manage A
        Successful Poll.
      </p>

      <div className={styles.features_grid}>
        <div className={styles.feature_card}>
          <FaQuestionCircle className={styles.icon} />
          <h2>Gauge Customer Sentiment</h2>
          <p>
            Find out what products, services, and marketing messages are best
            resonating with your audience by surveying them in an interactive
            way.
          </p>
        </div>

        <div className={styles.feature_card}>
          <FaCamera className={styles.icon} />
          <h2>Highlight Your Best Medium</h2>
          <p>
            Make use of your preferred media, whether it&apos;s Images, Videos, HTML,
            or just some killer copy to create an immersive poll experience.
          </p>
        </div>

        <div className={styles.feature_card}>
          <FaThLarge className={styles.icon} />
          <h2>The Gift Of Choice</h2>
          <p>
            Present your audience with as few as two voting options or as many
            as fifty.
          </p>
        </div>

        <div className={styles.feature_card}>
          <FaUsers className={styles.icon} />
          <h2>Spread The Debate</h2>
          <p>
            Show voters customized results pages and provide them with
            customized share messages that will help increase the reach of your
            poll.
          </p>
        </div>
      </div>
    </section>

            {/* Footer Section */}
            <footer className={styles.footer}>
                <p>&copy; 2025 Pulse Vote. All Rights Reserved.</p>
                <div className={styles.footer_links}>
                    <Link to="/about" className={styles.footer_link}>About</Link>
                    <Link to="/privacy" className={styles.footer_link}>Privacy Policy</Link>
                    <Link to="/contact" className={styles.footer_link}>Contact Us</Link>
                </div>
            </footer>
        </div>
    );
};

export default Main;
