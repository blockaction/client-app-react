import { URL } from "utils/constants";
import * as action from "utils/api";

export const getImageSRC = data => {
  const addedOnDate = new Date(data.added_on);
  const fixedDate = new Date("10/01/2019");
  const diffTime = fixedDate - addedOnDate;

  let imageSRC = "";
  if (diffTime > 0) {
    imageSRC = data.image_name
      ? `${cloudinaryURL}${data.image_name.document_name}`
      : `${cloudinaryURL}${data.main_image.document_name}`;
  } else {
    imageSRC = data.image_name
      ? `${URL}${data.image_name.document_name}`
      : `${URL}${data.main_image.document_name}`;
  }

  return imageSRC;
};

export const addComma = (val) => {
  return val && val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const getReadTime = time => {
  const readTime =
    time !== undefined
      ? `${time} ${time === 1 ? "min read" : "mins read"}`
      : "Not Available";
  return readTime;
};

export const capitaliseFirstLetter = (text, index = 0) => {
  return text.charAt(index).toUpperCase() + text.slice(index + 1);
};

export const text_truncate = (fullStr, strLen, separator) => {
  if (fullStr.length <= strLen) return fullStr;
  
  separator = separator || '......';
  
  var sepLen = separator.length,
      charsToShow = strLen - sepLen,
      frontChars = Math.ceil(charsToShow/4),
      backChars = Math.floor(charsToShow/4);

  return fullStr.substr(0, frontChars) + 
         separator + 
         fullStr.substr(fullStr.length - backChars);
};

export const getBreadCrumbRoute = text => {
  return text.slice(1) === "research"
    ? "Research Papers"
    : capitaliseFirstLetter(text, 1);
};

export const getTime = isoDate => {
  const date = new Date(isoDate);
  return `${date.getHours()}:${
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
  }`;
};

export const validateEmail = email => {
  if (
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i.test(
      email
    )
  ) {
    return true;
  }
  return false;
};

export const urlParser = url => {
  let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  let match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
};

export const getShortDate = isoDate => {
  const date = new Date(isoDate);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let dt = date.getDate();

  const currentMonth = new Date().getMonth() + 1;
  const dateDifference = month - currentMonth;

  if (dateDifference === 1) {
    return dateDifference + "month ago.";
  } else if (dateDifference > 1) {
    return dateDifference + "months ago";
  } else {
    return `${dt}/${month}/${year}`;
  }
};
