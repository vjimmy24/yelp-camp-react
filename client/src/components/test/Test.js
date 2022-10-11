import { useEffect, useState, Fragment } from "react";
import React from "react";

const Test = () => {
  const [APIdata, setAPIData] = useState([{}]);
  useEffect(() => {
    async function fetchAPIData() {
      const res = await fetch("/api");
      const data = await res.json();
      setAPIData(data);
    }
    fetchAPIData();
    //use relative route since we defined the proxy to be port 5000 in package.json
  }, []);
  return (
    <Fragment>
      {typeof APIdata.users === "undefined" ? (
        <p>Loading...</p>
      ) : (
        APIdata.users.map((user, i) => <p key={i}>{user}</p>)
      )}
    </Fragment>
  );
};

export default Test;
