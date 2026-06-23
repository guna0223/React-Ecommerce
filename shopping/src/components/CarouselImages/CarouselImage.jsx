import { useState, useEffect } from "react";
import "../Css/CarouselImages.css";

const carouselData = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80",
    title: "Summer Collection",
    subtitle: "Up to 50% Off",
    description: "Discover the hottest trends for this season"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80",
    title: "New Arrivals",
    subtitle: "Premium Quality",
    description: "Explore our latest fashion collection"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=80",
    title: "Special Offers",
    subtitle: "Limited Time",
    description: "Don't miss out on exclusive deals"
  }
];

function CarouselImage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselData.length) % carouselData.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselData.length);
  };

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        <div 
          className="carousel-track"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {carouselData.map((item, index) => (
            <div key={item.id} className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}>
              <img src={item.image} alt={item.title} />
              <div className="carousel-overlay"></div>
              <div className="carousel-content">
                <span className="carousel-subtitle">{item.subtitle}</span>
                <h2 className="carousel-title">{item.title}</h2>
                <p className="carousel-description">{item.description}</p>
                <button className="btn-gradient">Shop Now</button>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button className="carousel-arrow carousel-arrow-prev" onClick={goToPrev}>
          <i className="bi bi-chevron-left"></i>
        </button>
        <button className="carousel-arrow carousel-arrow-next" onClick={goToNext}>
          <i className="bi bi-chevron-right"></i>
        </button>

        {/* Dots Indicators */}
        <div className="carousel-dots">
          {carouselData.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CarouselImage;
