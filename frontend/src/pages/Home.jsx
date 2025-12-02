import React from "react";
import buyerVideo from "../assets/buyerSection.mp4";
import { useNavigate, Link } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const styles = {
    container: "bg-[#F6F1EB] dark:bg-background-dark font-body text-text-light dark:text-text-dark transition-colors duration-300",

    wrapper: "max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8",

    /* HERO */
    heroSection: "relative py-16 sm:py-24 lg:py-32 flex items-center",
    heroGrid: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center",
    heroHeading:
      "font-display text-5xl md:text-7xl lg:text-8xl font-medium leading-tight",
    heroSub: "mt-6 text-lg text-subtle-light",
    heroBtnPrimary: "inline-block bg-[#9B7E62] text-white px-8 py-4 rounded-full text-center transition-transform hover:scale-105",

    heroBtnOutline: "inline-block bg-transparent text-[#9B7E62] border border-[#9B7E62] px-8 py-4 rounded-full text-center hover:bg-[#EDE4DC]",

    heroImgWrapper: "relative h-96 lg:h-[38rem] overflow-hidden",
    heroVideo: "absolute inset-0 w-full h-full object-cover object-[center_-390px] rounded-xl opacity-80",


    /* NEW ARRIVALS */
    sectionTitle: "font-display text-4xl text-center font-medium",
    grid4:
      "mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12",
    cardWrapper: "group relative",
    cardImgWrapper: "w-full overflow-hidden rounded-lg",
    cardImg:
      "w-full h-64 object-cover group-hover:opacity-80 transition-opacity",
    cardTitleRow: "mt-4 flex justify-between",
    cardTitle: "text-sm",
    cardPrice: "text-sm font-medium",

    /* BUYER / SELLER CARDS */
    bsSection: "py-16 sm:py-24",
    bsGrid: "grid grid-cols-1 lg:grid-cols-2 gap-8",
    bsCard:
      "relative rounded-xl overflow-hidden min-h-[400px] flex items-end p-12",
    bsImg: "absolute inset-0 w-full h-full object-cover",
    bsOverlay: "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent",
    bsText: "relative text-white",
    bsTitle: "font-display text-4xl",
    bsDesc: "mt-4 max-w-sm",
    bsBtn: "inline-block mt-6 text-sm uppercase border-b border-white/50 pb-1",
  };


  const categories = [
    "Books",
    "Electronics",
    "Furniture",
    "Fashion",
    "Rentals",
    "Freebies",
  ];

  const newArrivals = [
    {
      title: "Vintage Cardigan Sweater",
      price: "Rs. 400",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1LgEpXyFeGZUe4f22KO4ZbOj6hebFmSHes8-_A93TP1e7Xh1OSq3IZUl9vFjARC77vppEml3ajvszwOjSBbKLtO6zMZm919tKpxHW5NhFu89x49_hxwylAeTbA3lzdmlUibhfaOK1PFF5Ds2BU2aiJex1oJm9Sm0KmtnrQ8RSlNM_JMpgstjLYhL1AESoU3s_ab2Skyx1zBM_WzFZddo5sRoWiyozVHq57EjGX38g010lXP3qlBwqLKTiDZFyDy2T-AxM5pOGCxU",
    },
    {
      title: "Sofa",
      price: "Rs 600",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDqChUxOcEyPsVWmzXPXyWiMTWKBKp5V1u0edWWdhIeqSa0Q9zacM7eN7YVxFgb9Dpt6_g_YTkKo6eIEvAkltvh-LK7Pkh-ObCU4Z2H78ajAwOUAoFoP2uKss1-3Qp7V_Mhg7zLpLdj5c6qjRUxvbjXuAIwrWHJVpC2daVXlPvtmNmiYcLcibzpbddhsodt_xYkYHWyBQwRN78m1_rwEcliGI1AEodSPgMRs_hBKWC24rvxO3Buwry25yZ9YrJv8WOvIbf-p73fZBg",
    },
    {
      title: "Wooden utensil set",
      price: "Rs.700",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuATgs_dzHIAEJQXGlSD7mOXaSKROsXN1LjLuQdEpFNf8tFds0mLQafpgY2xs4UbLDth2bUSp-pcYv5azprWcEYhtJnAxI22TBVWnr8qyb19WSng1I1Ol4UfJ9hrZnTyb5thJTKZnJ4uJiQb3UJR77FIrzF0PCxUI0QkXi999Bys-IAaavwLWzZRxpaza-71-OwRakEDL-WK-B6oK0O9bVP6usRtNQvPftPhCGP7sAv-R9R2RV70zJ4mC_4RspdqYS-WHZxSS7qJFWw",
    },
    {
      title: "Basket",
      price: "Rs. 200",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA95dDlkYHgtLLEbKFCEMxYSf91Pa0D1UsdzzifupE1H9T5IF5SfkKSk2KcT5DFNJrtXifvURbfq9bk8uC4K8A4ZS5pGIF3QkRu3yVvILdUzQRiBqBhmdn6Lr2zffDceDmQIBitXDxSztTBKLT2-Vk8gYKfmQbCWatsd79a7f2oBrpCc0RxVCiCqv8BEMayUYzwKuJ1G2x__LvodLOB4mwfFvhx4JVT_g9g2O7TNSq1Exr5BaOw0ye725s4cAZXjOrnQc0oFm3stn8",
    },
  ];


  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>

        {/* HERO SECTION */}
        <section className={styles.heroSection}>
          <div className={styles.heroGrid}>
            {/* LEFT */}
            <div>
              <h1 className={styles.heroHeading}>
                Find Everything You Need On Campus
              </h1>
              <p className={styles.heroSub}>
                Buy • Sell • Rent • Freebies — all within your college.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/shop" className={styles.heroBtnPrimary}>Start Browsing</Link>
                <a className={styles.heroBtnOutline}>Post an Item</a>
              </div>
            </div>

            {/* RIGHT MEDIA */}
            <div className={styles.heroImgWrapper}>
              <video
                className={styles.heroVideo}
                src={buyerVideo}
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
          </div>
        </section>

        {/* NEW ARRIVALS */}
        <section className={styles.categorySection}>
          <h2 className={styles.sectionTitle}>New Arrivals</h2>

          <div className={styles.grid4}>
            {newArrivals.map((item, i) => (
              <div key={i} className={styles.cardWrapper}>
                <div className={styles.cardImgWrapper}>
                  <img src={item.img} className={styles.cardImg} alt="" />
                </div>

                <div className={styles.cardTitleRow}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardPrice}>{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* BUYERS & SELLERS */}
        <section className={styles.bsSection}>
          <div className={styles.bsGrid}>

          {/* BUYERS CARD */}
          <div className={styles.bsCard}>
            <img
              className={styles.bsImg}
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFIwPLjqIxiPc-Z05-G8Oymk2n4WPJvm4142AazrMK-sNc7MTvI4wIvYv8CluZ1kx99dwXN--5NnqzF8puNt3gfBUqK77NDPWZCaCOlgfvXi3YkktUN72SvukmQSXIJzC7Elobz1J-Bw7DjbUWv1DIiPXPWaDnOzvD6w7Qe-6otG47ciizEqAO8RCp7n8xEkNhfbAKc5NBfD7_U7DjqfxptZOflc9lBiuzu3NuEXLs28XClVY9DLOpVo6RuBwYhOQhLt02K5QMMzI"
              onError={(e) => {
                e.currentTarget.src =
                  "https://images.unsplash.com/photo-1615874959474-dff860fdf5d1?q=80&w=1600&auto=format&fit=crop";
              }}
            />
              <div className={styles.bsOverlay}></div>

              <div className={styles.bsText}>
                <h2 className={styles.bsTitle}>For Buyers</h2>
                <p className={styles.bsDesc}>
                  Discover unique items from fellow students. Your next great find is just around the corner.
                </p>
                <a
                  className={styles.bsBtn}
                  onClick={() => navigate("/buyer/dashboard")}
                  style={{ cursor: "pointer" }}
                >
                  Shop Now
                </a>

              </div>
            </div>

          {/* SELLERS CARD */}
          <div className={styles.bsCard}>
            <img
              className={styles.bsImg}
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuChQyh9NslMdWEogUSdW6w_3xM_nnM4nIHA0446W_XFyB_9prTVU8fUXqv1wJHFHhNPyuIZ8oh6jW8ZfsuKd5uJ1ddwtgObTvmsyfxRIubwymIccR3_P4P0QzcKnLHuWS3n-twTAdZrm2X5MKBINGZrzbxtfscf0lNNN5n6vwD0UbNBKZCCO0XLJth1SQb9E3SqeRU0nQv5bD5sezrLkiiPnWl8lvIXcJKqX3YrOkon-VIw4kAD4pIFEvzn0vVhkG0aKPp5vy4fc3o"
              onError={(e) => {
                e.currentTarget.src =
                  "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1600&auto=format&fit=crop";
              }}
            />
              <div className={styles.bsOverlay}></div>

              <div className={styles.bsText}>
                <h2 className={styles.bsTitle}>For Sellers</h2>
                <p className={styles.bsDesc}>
                  Turn your unused items into cash. It's simple, fast, and connects you with your campus community.
                </p>
                <a
                  className={styles.bsBtn}
                  onClick={() => navigate("/seller/dashboard")}
                  style={{ cursor: "pointer" }}
                >
                  Start Selling
                </a>

              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}


