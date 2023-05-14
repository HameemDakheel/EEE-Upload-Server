import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Path from "path";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Breadcrumb({ username }) {
  const query = useQuery();
  const [arrItems, setArrItems] = useState([]);
  const path = query.get("path");

  const getListItems = () => {
    const tempArr = [];
    var temp = query.get("path");
    if (temp) {
      temp = temp.split("/");
      temp.shift();
      temp.pop();
      var str = "";
      for (let i = 0; i < temp.length; i++) {
        str = str + "/" + temp[i];
        tempArr.push(str);
      }
      setArrItems(tempArr);
    }
  };
  // eslint-disable-next-line
  useEffect(getListItems, [path]);

  return (
    <>
      {/* breadcrumb */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light rounded-5 mt-4 shadow-5">
        <div className="container-fluid">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/?path=/">Home</Link>
              </li>
              {username ? (
                <li className="breadcrumb-item">
                  <Link to={`/users/h?path=/`}>{username}</Link>
                </li>
              ) : (
                ""
              )}
              {arrItems.map((value, index) => {
                return (
                  <li key={index} className="breadcrumb-item">
                    <Link to={`/?path=${value}/`}>
                      {Path.basename(value + "/")}
                    </Link>
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>
      </nav>
      {/* /breadcrumb */}
    </>
  );
}
