import React, { FC, useState  } from "react";
import "./SearchBar.css";
import request from "request";
import FileCopyIcon from '@material-ui/icons/FileCopy';
import CircularProgress from '@material-ui/core/CircularProgress';
const SearchBar: FC = () => {
  const [link, setLink] = useState<string>("");
  const urlButtonValues = ["loader" , "copy", "short"]
  const [shorteningDone, setShorteningDone] = useState<boolean>(false);
  // const [activateLoader , setActivateLoader] = useState<boolean>(false);
  const [buttonStatus , setButtonStatus] = useState<string>(urlButtonValues[2]);
  var headers = {
    Authorization: "Bearer "+process.env.REACT_APP_BITLY_KEY,
    "Content-Type": "application/json",
  };
console.log("Value of the link is "+ link)
  var dataString = JSON.stringify({"long_url": link});

  var options = {
    url: "https://api-ssl.bitly.com/v4/shorten",
    method: "POST",
    headers: headers,
    body: dataString,
  };
  
  const handleShortenedUrl = (shortenedlink: string): void => {
  setLink(shortenedlink);
  setShorteningDone(true); 
  // setActivateLoader(false)
  setButtonStatus(urlButtonValues[1])
  console.log("Finish ", shortenedlink)
  };
  const copyToClipboard = (e:any)=> {
    console.log("in the Copy")
    e.preventDefault();
   if(link) if(shorteningDone) navigator.clipboard.writeText(link)
    setLink("")
  }

  function callback(error: any, response: any, body: any) {
    if (!error && response.statusCode === 200) { 
      var url = JSON.parse(body);
      handleShortenedUrl(url.link);
      console.log("Inner ", url.link, "Status Code is ", response.statusCode);
    }
  }
  function shortenUrl (e: any)  {
    e.preventDefault()  
    console.log("ShortenUrl Method")
    // setActivateLoader(true)
    setButtonStatus(urlButtonValues[0])
    request(options, callback); 
  };
  return (
    <div className="container">
      <div className="container1">
        <div className="form-container">
          <div className="form">
            <input 
              type="text"
              name="url"
              className="url-input"
              placeholder="Shorten your URL"
              required
              autoFocus
              value={link}
              onChange={(e) => setLink(e.target.value)}
              autoComplete="off"
            />
            <button
              onClick={(e) => {shorteningDone ? copyToClipboard(e) :shortenUrl(e)}  }
              type="submit"
              className="submit-button"
            >
            { buttonStatus === urlButtonValues[0] ?  (<CircularProgress color="secondary" />) :
            ( buttonStatus === urlButtonValues[1] ? (<span className="span-info"> <FileCopyIcon/>&nbsp;Copy</span>) :
              buttonStatus === urlButtonValues[2] ? "Shorten": null)

            }
             {/* {
                shorteningDone
                 ? ( activateLoader ?
                       <CircularProgress color="secondary" /> :
                       (<span className="span-info"> <FileCopyIcon/>&nbsp;Copy</span>))
                 : "Shorten"
              }*/}

            </button> 
          </div>
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
    