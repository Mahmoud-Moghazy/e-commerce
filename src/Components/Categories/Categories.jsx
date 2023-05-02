import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { Link } from "react-router-dom";
// import styles from './Categories.module.css';

export default function Categories() {

  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(true);

  const getCategories = async () => {
    try {
      const { data } = await axios.get("https://route-ecommerce.onrender.com/api/v1/categories");
      setCategories(data.data);
      console.log(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  if (loading || !categories) {
    // add a loading screen when data is being fetched or brands is null
    return <LoadingScreen />;
  }
  return (
  <>
    <div className="container py-5">
      <div className="row row-cols-2 row-cols-md-4 row-cols-lg-5 g-3 text-center">
      {categories.map((categories) => (
            <Link to={`/CategoriesDetails/${categories._id}`} className="col" key={categories._id}>
              <figure className="figure">
                <img src={categories.image} className="figure-img w-100" height={200} alt={categories.title} />
                <figcaption className="figure-caption my-3">
                  <h5 className=" text-success">{categories.name}</h5>
                </figcaption>
              </figure>
            </Link>
          ))}
      </div>
    </div>
  </>
  )
}