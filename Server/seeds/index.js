const mongoose = require("mongoose");
const { Campground } = require("../models/campground");
mongoose.connect("mongodb://localhost:27017/yelp-camp-react");
const cities = require("./cities.js");
const { descriptors, places } = require("./seedHelpers.js");

const db = mongoose.connection;
db.on(
  "error",
  console.error.bind(console, "There was an error connecting to the database.")
);
db.once("open", () => {
  console.log("Successfully Connected to Database!");
});

const Sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async function () {
  await Campground.deleteMany({});
  // await Campground.create({ cities })
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 50) + 5;
    const newCamp = new Campground({
      title: `${Sample(descriptors)} ${Sample(places)}`,
      location: `${cities[random1000].city}, ${cities[random1000].state} `,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.Magni, nihil molestias.Aliquid, iste! Similique ut molestiae vero minus assumenda at cupiditate itaque mollitia debitis corrupti, numquam non officiis id totam.",
      price: price,
      author: "6349a45e12ae2fa58937cb9f",
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },

      images: [
        {
          url: "https://res.cloudinary.com/digfn29ss/image/upload/v1667064669/yelpcampreact/pykprluvkgfcbbwkvyam.jpg",
          fileName: "yelpcampreact/pykprluvkgfcbbwkvyam",
        },
        // {
        //   url: "https://res.cloudinary.com/digfn29ss/image/upload/v1660589364/YelpCamp/myfmpjo5dxu2pl6xdj3n.jpg",
        //   fileName: "YelpCamp/myfmpjo5dxu2pl6xdj3n",
        // },
        // {
        //   url: "https://res.cloudinary.com/digfn29ss/image/upload/v1660589365/YelpCamp/qeeqe1lfthdwfaynrt9g.jpg",
        //   fileName: "YelpCamp/qeeqe1lfthdwfaynrt9g",
        // },
      ],
    });
    await newCamp.save();

    // const c = new Campground({ title: 'yeehaw land' })
    // await c.save();
  }
  console.log("Successfully re-seeded the database.");
};
seedDB().then(() => {
  mongoose.connection.close();
});
