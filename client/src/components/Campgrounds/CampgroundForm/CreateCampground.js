import React, { useRef, useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./CampgroundForm.module.css";

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
    <Fragment>
      <div className={classes.formContainer}>
        <h1 className={classes.formh1}>List Your Campground</h1>

        <form
          className={classes.campForm}
          onSubmit={formSubmitHandler}
          encType="multipart/form-data"
        >
          <div>
            <div className={classes.campLabel}>
              <label htmlFor="title">Title</label>
            </div>
            <input
              className={classes.formInput}
              type="Title"
              name="title"
              ref={formTitle}
            />
          </div>
          <div>
            <div className={classes.campLabel}>
              <label htmlFor="location">Location</label>
            </div>
            <input
              className={classes.formInput}
              type="text"
              name="location"
              ref={formLocation}
            />
          </div>
          <div>
            <div className={classes.campLabel}>
              <label htmlFor="description">Description</label>
            </div>
            <textarea
              className={classes.formInput}
              name="location"
              ref={formDescription}
            ></textarea>
          </div>
          <div>
            <div className={classes.campLabel}>
              <label htmlFor="price">Price</label>
            </div>

            <input
              className={classes.formInput}
              type="number"
              name="price"
              ref={formPrice}
            />
          </div>

          <div className={classes.campLabel}>
            <div>
              <label htmlFor="campImage">Images</label>
            </div>
            <input
              className={classes.formInput}
              type="file"
              name="campImage"
              id="campImage"
              onChange={fileChangeHandler}
              multiple
            />
          </div>
          <button>Submit</button>
        </form>
      </div>
    </Fragment>
  );
};

export default CreateCampground;
