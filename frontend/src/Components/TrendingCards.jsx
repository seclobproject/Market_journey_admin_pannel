import React from "react";
import "./Trendingcards.css";

function TrendingCards() {
  return (
    <>
    <div className="container">
  <div className="row " style={{background:"black"}}>
    <div className="col-md-4">

  <img
    src="/dist/images/trendingcard.png"
    className="img-fluid "
    alt="Image"
  />


    </div>
    <div className="col-md-4">

<img
  src="/dist/images/trendingcard.png"
  className="img-fluid"
  alt="Image"
  width="100px"
  height="100px"
/>


  </div>
  <div className="col-md-4">

<img
  src="/dist/images/trendingcard.png"
  className="img-fluid"
  alt="Image"
/>


  </div>
  </div>
</div>

    </>
  );
}

export default TrendingCards;
