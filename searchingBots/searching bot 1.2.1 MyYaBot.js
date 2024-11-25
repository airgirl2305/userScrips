// ==UserScript==
// @name         My 1st searching Bot 1.1.2
// @namespace    http://tampermonkey.net/
// @version      1.1.2
// @description  Bot for ya to serf for the smashingmagazine.com
// @author       Askhabova Kheda
// @match        https://ya.ru/*
// @match        https://smashingmagazine.com/*
// @grant        none
// ==/UserScript==

let input = document.getElementById("text");
let button = document.getElementsByClassName("search3__button")[0]; // hidden button for search
let links = document.links;
let site = "smashingmagazine.com";
let searchEngine = "https://ya.ru/"
let keywords = [
  "CSS 2023", // page 2 - "Writing CSS In 2023",
  "developer job abroad", // page 2 - "How To Search For A Developer Job Abroad",
  "Learning JavaScript With Imagination",
  "Making Sense Of “Senseless” JavaScript Features",
];
let keyword = keywords[getRandom(0, keywords.length)];

//MouseEvent("click");// new user event - our bot ears

// working on the search engine main page
if (button !== undefined) { // search button is only in the main page
  let i = 0;
  //  input.focus();
  //  input.dispatchEvent(mouseClick);
  //  input.value = keyword;
  //  button.click();

  let timerId = setInterval(() => {
    input.value += keyword[i];
    i++;
    if (i == keyword.length) {
      clearInterval(timerId);
      button.click();
    }
  }, 150);

  // working on the target page
} else if (location.hostname == site) {
  setInterval(() => {
    let linkIndex = getRandom(0, links.length);
    let localLink = links[linkIndex];

    if (getRandom(0, 101) > 50) {
      location.href = searchEngine;
    }
    if (links.length == 0) {
      location.href = site;
    }
    if (localLink.href.includes(site)) {
      localLink.click();
    }
  }, getRandom(5000, 7000));
  console.log("We are on the target page");
}

//working on a search results page
else if (document.querySelector(".Pager-Content") !== null) { // search results page has pages in it
  let nextPage = true;
  for (let i = 0; i < links.length; i++) {
    if (links[i].href.indexOf(site) !== -1) {
      let link = links[i];
      let nextPage = false;
      console.log("I've found one " + link);
      setTimeout(() => {
        link.target = "_self";
        link.click();
      }, getRandom(2000, 3000));
      break;
    }
  }
  let pagesExist = setInterval(() => {
    let page = document.querySelectorAll(".Pager-Item_current")[0];
    if (page !== null) {
      if (page.innerText == "5") {
        let nextPage = false;
        location.href = searchEngine;
      }
      clearInterval(pagesExist);
    }
  }, 100);

  if (nextPage) {
    setTimeout(() => {
      document.getElementsByClassName("Pager-Item_type_next")[0].click();
    }, getRandom(2500, 3500));
  }
}

function getRandom(max, min) {
  return Math.floor(Math.random() * (max - min) + min);
}
