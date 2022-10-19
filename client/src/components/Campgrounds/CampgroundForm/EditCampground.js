import { Fragment, useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditCampground = () => {
  const navigate = useNavigate();
  const [campDetails, setCampDetails] = useState([{}]);
  const [isLoading, setisLoading] = useState(false);

  const formTitle = useRef();
  const formLocation = useRef();
  const formDescription = useRef();
  const formPrice = useRef();
  const formImage = useRef();

  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    setisLoading(true);
    async function fetchAPIData() {
      const res = await fetch(`/campgrounddetails/${id}`);
      const data = await res.json();
      setCampDetails(data.foundCamp[0]);
    }
    fetchAPIData().catch(console.error);
    setisLoading(false);
    //use relative route since we defined the proxy to be port 5000 in package.json
  }, [id]);

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
      const res = await fetch(`/campground/${id}`, options);
      const data = await res.json();
    };
    sendAPIData({
      title: formTitle.current.value,
      location: formLocation.current.value,
      description: formDescription.current.value,
      price: formPrice.current.value,
      image: formImage.current.value,
    });
    navigate(`/campgrounds/${id}`);
  };

  return (
    <Fragment>
      <h1>Edit Your Campground!</h1>
      <form onSubmit={formSubmitHandler}>
        <div>
          <label htmlFor="title">Campground Title</label>
          <input
            type="Title"
            name="title"
            ref={formTitle}
            defaultValue={campDetails.title}
          />
        </div>
        <div>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            name="location"
            ref={formLocation}
            defaultValue={campDetails.location}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            type="textarea"
            name="location"
            ref={formDescription}
            defaultValue={campDetails.description}
          ></textarea>
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            ref={formPrice}
            defaultValue={campDetails.price}
          />
        </div>

        <div>
          <label htmlFor="image">Image</label>
          <input
            type="text"
            name="image"
            ref={formImage}
            value={campDetails.image}
          />
        </div>
        <button>Submit</button>
      </form>
    </Fragment>
  );
};

export default EditCampground;
