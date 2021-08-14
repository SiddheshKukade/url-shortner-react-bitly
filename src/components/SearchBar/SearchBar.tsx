import React, { FC, useState } from "react";
import "./SearchBar.css";
import request from 'request';
const SearchBar: FC = () => {
  const [link, setLink] = useState("");
  const [shorteningDone, setShorteningDone] = useState(false);
  const shortenUrl= ()=>{


var headers = {
  Authorization: "Bearer {TOKEN}",
  "Content-Type": "application/json",
};

var dataString =
  '{ "long_url": "https://dev.bitly.com", "domain": "bit.ly", "group_guid": "Ba1bc23dE4F" }';

var options = {
  url: "https://api-ssl.bitly.com/v4/shorten",
  method: "POST",
  headers: headers,
  body: dataString,
};

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body);
  }
}

request(options, callback);

  }
  return (
    <div className="container">
      <div className="container1">
        <div className="form-container">
          <form className="form">
            <input
              type="text"
              name="url"
              className="url-input"
              placeholder="Shorten your URL"
              required
              autoFocus
              autoComplete="off"
            />
            <button type="submit" className="submit-button">
              {(shorteningDone && "Shorten") || "Copy"}
            </button>
          </form>
          {/* <button name="copy">Copy URL </button> */}
          <div className="info">
            By clicking SHORTEN, you are agreeing to Bitly’s Terms of Service
            and Privacy Policy
          </div>
        </div>
      </div>
    </div>
  );
};
export default SearchBar;
console.log(process.env.REACT_APP_BITLY_KEY);

// curl \
// -H 'Authorization: Bearer 6c4c87bdc14ae7ca267c1f4c7e206eb446de72cd' \
// -H 'Content-Type: application/json' \
// -X POST \
// -d '{
//   "long_url": "https://apple.com",
//   "domain": "bit.ly"

// }'
// https://api-ssl.bitly.com/v4/shorten
