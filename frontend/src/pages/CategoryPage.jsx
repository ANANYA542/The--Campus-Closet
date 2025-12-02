import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";
import API_BASE_URL from "../config/api";

function CategoryPage() {
  const { slug } = useParams();
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

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${API_BASE_URL}/api/categories/${slug}/products`
        );
        setItems(res.data || []);
      } catch (e) {
        console.error("Category fetch failed", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug]);

  const clickItem = (id) => navigate(`/products/${id}`);

  const title = slug.charAt(0).toUpperCase() + slug.slice(1);

  return (
    <div className="min-h-screen bg-[#f7f7f7] text-[#111]">
      <div className="mx-auto max-w-6xl px-6 pt-10 pb-6">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          {title}
        </h1>
        <p className="mt-2 text-sm md:text-base text-[#666]">
          Explore {title} products curated for your campus life.
        </p>
      </div>

      <section className="mx-auto max-w-6xl px-4 md:px-6">
        {loading ? (
          <div className="py-20 text-center text-[#666]">
            Loading products...
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6">
            {items.map((item) => {
              const imgs = parseImages(item.images);
              const img =
                Array.isArray(imgs) && imgs.length
                  ? imgs[0]
                  : "https://images.pexels.com/photos/1597111/pexels-photo-1597111.jpeg?auto=compress&cs=tinysrgb&w=800";
              return (
                <div
                  key={item.id}
                  className="mb-6 break-inside-avoid"
                  style={{ breakInside: "avoid" }}
                >
                  <button
                    onClick={() => clickItem(item.id)}
                    className="group w-full text-left"
                  >
                    <div className="overflow-hidden rounded-2xl bg-white border border-[#eaeaea] shadow-sm group-hover:shadow-md transition">
                      <img
                        src={img}
                        alt={item.name}
                        className="w-full h-auto object-cover"
                      />
                      <div className="p-4">
                        <h3 className="text-[15px] md:text-[16px] font-semibold text-[#111] leading-snug">
                          {item.name}
                        </h3>
                        {item.description && (
                          <p className="mt-1 text-[#666] text-xs md:text-sm line-clamp-2">
                            {item.description}
                          </p>
                        )}
                        <div className="mt-3 text-[#111] font-bold">
                          ₹{(item.price || 0).toLocaleString()}
                        </div>
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

export default CategoryPage;
