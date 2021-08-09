import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./MainList.css";

function Movie({ id, price, image, hello }) {

  return (
   <div className={hello === true ? "mypage_top" : "product"}>
      <Link
        to={{
          pathname: `/post/${id}`,
          state: {
            price,
            image,
            id
          }
        }}
      >
        <img src={image} alt={id} title={price} />
        <div className="product__title">
          <h3 className>₩ {price}</h3>
        </div>
      </Link>
    </div>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  price: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default Movie;