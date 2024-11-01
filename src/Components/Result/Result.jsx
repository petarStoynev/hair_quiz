import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./Result.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Result(props) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const answers = props.answers;

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  useEffect(() => {
    // Fetch products when the component mounts
    fetch("https://jeval.com.au/collections/hair-care/products.json?page=1")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products); // Update the state with products data
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError("Failed to load products.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="main-container">
      <div className="header">
        <div className="header-container">
          <h1>
            Build your everyday self
            <br />
            care routine.
          </h1>
          <p>
            Perfect for if you're looking for soft, nourished skin, our
            moisturizing body washes are made with skin-natural nutrients that
            work with your skin to replenish moisture. With a light formula, the
            bubbly lather leaves your skin feeling cleansed and cared for. And
            by choosing relaxing fragrances you can add a moment of calm to the
            end of your day.
          </p>
          <button className="header-button">Retake the quiz</button>
        </div>
      </div>

      <div className="slider">
        <Slider {...settings}>
          <div className="routine-card">
            <h2>Daily routine</h2>
            <p>
              Perfect for if you're looking for soft, nourished skin, our
              moisturizing body washes are made with skin-natural nutrients that
              work with your skin to replenish moisture. With a light formula,
              the bubbly lather leaves your skin feeling cleansed and cared for.
              And by choosing relaxing fragrances you can add a moment of calm
              to the end of your day.
            </p>
          </div>

          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={product.images[0]?.src}
                alt={product.title}
                className="product-image"
              />
              <p>{product.product_type}</p>
              <p>${product.variants[0]?.price}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Result;
