import { createContext } from "react";

const CampContext = createContext({
  campData: {
    title: "",
    price: "",
    description: "",
    images: [{ url: "", fileName: "" }],
  },
});

export default CampContext;
