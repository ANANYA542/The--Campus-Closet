import { Link } from "react-router-dom";

function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero__content">
          <h1 className="hero__title">Buy and sell on your campus</h1>
          <p className="hero__subtitle">
            Thrift clothing and campus essentials from students near you. Safe, simple, and sustainable.
          </p>
          <div className="hero__ctas">
            <Link to="/shop" className="btn btn--primary btn--lg">
              Browse Items
            </Link>
            <Link to="/signup" className="btn btn--ghost btn--lg">
              Get Started
            </Link>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="features__grid">
          <div className="feature">
            <div className="feature__icon">🛍️</div>
            <h3 className="feature__title">Student Marketplace</h3>
            <p className="feature__text">
              Only verified students can list or buy — keeping transactions safe and on campus.
            </p>
          </div>

          <div className="feature">
            <div className="feature__icon">♻️</div>
            <h3 className="feature__title">Sustainable Thrifting</h3>
            <p className="feature__text">
              Give clothes and goods a second life while saving money and reducing waste.
            </p>
          </div>

          <div className="feature">
            <div className="feature__icon">⚡</div>
            <h3 className="feature__title">Fast & Simple</h3>
            <p className="feature__text">
              List items in minutes and chat with buyers to coordinate quick pickups.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;