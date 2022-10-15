import React, { useEffect, useRef } from "react";
import { redirect, useNavigate } from "react-router-dom";

const CreateCampground = () => {
  const navigate = useNavigate();
  const formTitle = useRef();
  const formLocation = useRef();
  const formDescription = useRef();
  const formPrice = useRef();
  const formImage = useRef();
  // const inputData = {
  //   title: "d1",
  //   location: "d1",
  //   price: "d1",
  //   image: "d1",
  // };
  //   const makeCampground = async (req, res) => {
  //     const newCampground = new Campground(req.body.camp);
  //     await newCampground.save();
  //   };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const sendAPIData = async (campData) => {
      const options = {
        method: "POST",
        body: JSON.stringify(campData),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await fetch("/campground", options);
      const data = await res.json();
    };
    sendAPIData({
      title: formTitle.current.value,
      location: formLocation.current.value,
      description: formDescription.current.value,
      price: formPrice.current.value,
      image: formImage.current.value,
    });
    navigate("/campgrounds");
  };

  // makeCampground();

  return (
    <form onSubmit={formSubmitHandler}>
      <div>
        <label htmlFor="title">Campground Title</label>
        <input type="Title" name="title" ref={formTitle} />
      </div>
      <div>
        <label htmlFor="location">Location</label>
        <input type="text" name="location" ref={formLocation} />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea name="location" ref={formDescription}></textarea>
      </div>
      <div>
        <label htmlFor="price">Price</label>
        <input type="number" name="price" ref={formPrice} />
      </div>

      <div>
        <label htmlFor="image">Image</label>
        <input type="text" name="image" ref={formImage} />
      </div>
      <button>Submit</button>
    </form>
  );
};

export default CreateCampground;
