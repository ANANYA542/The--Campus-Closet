import { Link } from "react-router-dom";

function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero__content">
          <h1 className="hero__title">Buy and sell on your campus</h1>
          <p className="hero__subtitle">
            Thrift clothing and campus essentials from students near you. Safe, simple, sustainable.
          </p>
          <div className="hero__ctas">
            <Link to="/signup" className="btn btn--primary btn--lg">Get started</Link>
            <Link to="/login" className="btn btn--ghost btn--lg">I already have an account</Link>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="features__grid">
          <div className="feature">
            <div className="feature__icon">🛍️</div>
            <h3 className="feature__title">Student marketplace</h3>
            <p className="feature__text">Only verified students can list or buy — keep it on campus.</p>
          </div>
          <div className="feature">
            <div className="feature__icon">♻️</div>
            <h3 className="feature__title">Sustainable thrifting</h3>
            <p className="feature__text">Give clothes and goods a second life and save money.</p>
          </div>
          <div className="feature">
            <div className="feature__icon">⚡</div>
            <h3 className="feature__title">Fast and simple</h3>
            <p className="feature__text">List items in minutes and chat to coordinate pickups.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;


