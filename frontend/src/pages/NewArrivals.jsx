import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config/api";

function NewArrivals() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const parseImages = (images) => {
    try {
      if (Array.isArray(images)) return images;
      return JSON.parse(images || "[]");
    } catch {
      return [];
    }
  };

  const fetchNewArrivals = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/api/products/new-arrivals`);
      setItems(res.data || []);
    } catch (e) {
      console.error("Failed to load new arrivals", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewArrivals();
  }, []);

  const handleClick = (id) => navigate(`/products/${id}`);

  return (
    <div className="min-h-screen bg-[#f7f7f7] text-[#111]">
      {/* Header / Hero */}
      <div className="sticky top-0 z-10 bg-[#f7f7f7]/80 backdrop-blur supports-[backdrop-filter]:bg-[#f7f7f7]/60">
        <div className="mx-auto max-w-6xl px-6 py-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-[#111]" />
            <span className="font-semibold tracking-tight">Campus Closet</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 rounded-full bg-white border border-[#e5e5e5] shadow-sm hover:shadow transition">Explore</button>
            <button className="px-4 py-2 rounded-full bg-[#111] text-white hover:opacity-90 transition">Sign in</button>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-6 pt-8 pb-6">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#111]">New Arrivals</h1>
        <p className="mt-2 text-sm md:text-base text-[#666]">Fresh picks in a clean, minimal gallery — tap any card to view details.</p>
      </section>

      {/* Masonry Grid */}
      <section className="mx-auto max-w-6xl px-4 md:px-6">
        {loading ? (
          <div className="py-20 text-center text-[#666]">Loading new arrivals...</div>
        ) : (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6">
            {items.map((item) => {
              const imgs = parseImages(item.images);
              const img = imgs[0] || "https://images.unsplash.com/photo-1529101091764-c3526daf38fe?q=80&w=800&auto=format&fit=crop";
              return (
                <div key={item.id} className="mb-6 break-inside-avoid" style={{ breakInside: "avoid" }}>
                  <button onClick={() => handleClick(item.id)} className="group w-full text-left">
                    <div className="overflow-hidden rounded-2xl bg-white border border-[#eaeaea] shadow-sm group-hover:shadow-md transition">
                      <img src={img} alt={item.name} className="w-full h-auto object-cover" />
                      <div className="p-4">
                        <h3 className="text-[15px] md:text-[16px] font-semibold text-[#111] leading-snug">
                          {item.name}
                        </h3>
                        {item.description && (
                          <p className="mt-1 text-[#666] text-xs md:text-sm line-clamp-2">{item.description}</p>
                        )}
                        <div className="mt-3 text-[#111] font-bold">₹{(item.price || 0).toLocaleString()}</div>
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

export default NewArrivals;
