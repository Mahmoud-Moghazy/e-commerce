import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { Link } from "react-router-dom";
// import styles from './Brands.module.css';

export default function Brands() {

  const [brands, setBrands] = useState(null);
  const [loading, setLoading] = useState(true);

  const getBrands = async () => {
    try {
      const { data } = await axios.get("https://route-ecommerce.onrender.com/api/v1/brands");
      setBrands(data.data);
      setLoading(false);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBrands();
  }, []);

  if (loading || !brands) {
    // add a loading screen when data is being fetched or brands is null
    return <LoadingScreen />;
  }
  return (
  <>
    <div className="container py-5">
      <div className="row row-cols-2 row-cols-md-4 row-cols-lg-6 g-3">
      {brands.map((brand) => (
            <Link to={`/brandDetails/${brand._id}`} className="col" key={brand._id}>
              <figure className="figure">
                <img src={brand.image} className="figure-img w-100" alt={brand.title} />
              </figure>
            </Link>
          ))}
      </div>
    </div>
  </>
  )
}