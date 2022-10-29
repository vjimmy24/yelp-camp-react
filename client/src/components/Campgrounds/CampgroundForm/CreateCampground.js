import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateCampground = () => {
  const navigate = useNavigate();

  const formTitle = useRef();
  const formLocation = useRef();
  const formDescription = useRef();
  const formPrice = useRef();
  // const formImage = useRef()
  const [formImage, setFormImage] = useState();

  const fileChangeHandler = (e) => {
    // const fileList = e.target.files;
    // console.log(fileList);
    // // const imageArray = [...fileList];
    setFormImage(e.target.files);
    // setFormImage(e.target.files[0]);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("title", formTitle.current.value);
    fd.append("location", formLocation.current.value);
    fd.append("description", formDescription.current.value);
    fd.append("price", formPrice.current.value);
    for (var x = 0; x < formImage.length; x++) {
      const file = formImage[x];
      fd.append("campImage", file);
    }
    console.log(Array.from(fd));
    const sendAPIData = async (campData) => {
      const options = {
        method: "POST",
        body: campData,
        mode: "cors",
        // headers: {
        //   "Content-Type": "multipart/form-data; boundary=XXX",
        // },
        credentials: "include",
      };
      try {
        await fetch("/campground", options);
        console.log("success");
      } catch (e) {
        console.log(e);
      }
    };
    sendAPIData(fd);
    navigate("/campgrounds");
  };

  // makeCampground();

  return (
    <form onSubmit={formSubmitHandler} encType="multipart/form-data">
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
        <label htmlFor="campImage">Image</label>
        <input
          type="file"
          name="campImage"
          id="campImage"
          onChange={fileChangeHandler}
          multiple
        />
      </div>
      <button>Submit</button>
    </form>
  );
};

export default CreateCampground;
