// ==UserScript==
// @name         Mega one
// @namespace    http://tampermonkey.net/
// @version      1.1.2
// @description  try to take over the world!
// @author       Askhabova Kheda
// @match        https://ya.ru/*
// @match        https://www.bing.com/*
// @match        https://swisscows.com/*
// @match        https://www.nigma.net.ru/*
// @match        https://www.google.com/*
// @match        https://www.phind.com/*
// @match        https://you.com/*
// @match        https://smashingmagazine.com/*
// @match        https://www.freecodecamp.org/*
// @match        https://anywhere.epam.com/*
// @grant        none
// ==/UserScript==

// (function () {
//   "use strict";
//
//   // Your code here...
// })();
let searchEngine;
let input;
let button;
let nextPageSelector;
let currentPageSelector;
let sites = {
  "smashingmagazine.com": [
    "Writing CSS In 2023",
    "How To Search For A Developer Job Abroad",
    "Learning JavaScript With Imagination",
  ],
  "anywhere.epam.com": [
    "web developer resume", // in first results
    "best practices for nodejs",
    "JavaScript Portfolio",
  ],
  "freecodecamp.org": [
    "How to Deploy Web", // first result
    "Portfolio Website", // further
    "LocalStorage",
  ],
};
let sitesKeys = Object.keys(sites);
let site = sitesKeys[getRandom(0, sitesKeys.length)];
let keywords = sites[site];
let keyword = keywords[getRandom(0, keywords.length)];
console.log(keyword);
let links = document.links;
// let mouseClick = new MouseEvent("click"); //?

if (location.href == "https://www.bing.com/") {
  searchEngine = "https://www.bing.com/";
  input = document.getElementsByName("q")[0];
  button = document.getElementsByClassName("search")[0];
  nextPageSelector = ".sb_pagN";
  currentPageSelector = ".sb_pagS";
} else if (location.href == "https://www.ya.ru/") {
  searchEngine = "https://ya.ru";
  input = document.getElementById("text");
  button = document.getElementsByClassName("search3__button")[0]; // hidden button for search
  nextPageSelector = ".Pager-Item_type_next";
  currentPageSelector = ".Pager-Item_current";
} else if (location.href == "https://www.google.com/") {
  searchEngine = "https://www.google.com/";
  input = document.getElementById("input");
  button = document.querySelector('[aria-label="Поиск в Google"]');
  nextPageSelector = "";
  currentPageSelector = "";
} else if (location.href == "https://nigma.net.ru/") {
  searchEngine = "https://nigma.net.ru/";
  input = document.getElementById("query");
  button = document.querySelector('[value="Найти!"]');
  currentPageSelector = ".gsc-cursor-current-page";
  nextPageSelector = "";
} else if (location.href == "https://swisscows.com/") {
  searchEngine = "https://swisscows.com/";
  input = document.querySelector('[type="search"]');
  button = document.getElementsByClassName("search-submit")[0];
  nextPageSelector = "";
  currentPageSelector = "";
} else if (location.href == "https://www.phind.com/") {
  searchEngine = "https://www.phind.com/";
  input = document.querySelector('[placeholder="Ask anything. What are you stuck on?"]');
  button = document.getElementsByClassName("fe-arrow-right")[0];
  nextPageSelector = "";
  currentPageSelector = "";
} else if (location.href == "https://you.com/") {
  searchEngine = "https://www.you.com/";
  input = document.getElementById("search-input-textarea");
  button = document.querySelector('[data-eventactionname="click_send"]');
  nextPageSelector = "";
  currentPageSelector = "";
}

// working on the search engine main page
if (button !== undefined) {
  // search button is only in the main page

  // input.focus();
  // input.dispatchEvent(mouseClick);
  // input.value = keyword;
  // button.click();
  let i = 0;
  let timerId = setInterval(() => {
    input.value += keyword[i];
    i++;
    if (i == keyword.length) {
      clearInterval(timerId);
      button.click();
    }
  }, 150);

  document.cookie = `site=${site}`;
  console.log("we are on the main page, cookie", cookie);
  // working on the target page
} else if (location.hostname == site) {
  setInterval(() => {
    let linkIndex = getRandom(0, links.length);
    let localLink = links[linkIndex];

    if (getRandom(0, 101) > 70) {
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
  site = getCookie("site");
}

//working on a search results page
else if (document.querySelector(currentPageSelector) !== null) {
  // instead of pages container
  // search results page has pages in it

  site = location.hostname;

  let nextPage = true;
  for (let i = 0; i < links.length; i++) {
    if (links[i].href.indexOf(site) !== -1) {
      let link = links[i];
      let nextPage = false;
      console.log("I've found one " + link);
      setTimeout(() => {
        link.target = "_self"; // diff for ya
        link.click();
      }, getRandom(2000, 3000));
      break;
    }
  }
  let pagesExist = setInterval(() => {
    let page = document.querySelector(currentPageSelector);
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
      document.querySelector(currentPageSelector).click();
    }, getRandom(2500, 3500));
  }
}

function getRandom(max, min) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)")
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
