// ==UserScript==
// @name         Mega one
// @namespace    http://tampermonkey.net/
// @version      1.1.2
// @description  try to take over the world!
// @author       Askhabova Kheda
// @match        https://swisscows.com/*
// @match        https://ya.ru/*
// @match        https://www.nigma.net.ru/*
// @match        https://www.google.com/*
// @match        https://www.phind.com/*
// @match        https://you.com/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  // Your code here...
})();

let input;
let button;
let links = document.links;
let keywords = [
  "Writing CSS In 2023",
  "How To Search For A Developer Job Abroad",
  "Learning JavaScript With Imagination",
];

let keyword = keywords[getRandom(keywords.length, 0)];

if ((location.href = "https://nigma")) {
  input = document.getElementById("query");
  button = document.querySelector('[value="Найти!"]');
}
if ((location.href = "https://www.bing.com/")) {
  input = document.getElementsByName("q")[0];
  button = document.getElementsByClassName("search")[0];
}
if ((location.href = "https://swisscows.com/")) {
  input = document.querySelector('[type="search"]');
  button = document.getElementsByClassName("search-submit")[0];
}
if ((location.href = "https://www.phind.com/")) {
  input = document.querySelector('[placeholder="Ask anything. What are you stuck on?"]');
  button = document.getElementsByClassName("fe-arrow-right")[0];
}

if ((location.href = "https://www.you.com/")) {
  input = document.getElementById("search-input-textarea");
  button = document.querySelector('[data-eventactionname="click_send"]');
}
if ((location.href = "https://www.ya.ru/")) {
  //input =;
  //button = ;
}

if (button !== undefined) {
  input.value = keyword;
  button.click();
  if (cowsBtn.click()) console.log("клик");
} else {
  for (let i = 0; i < links.length; i++) {
    if (links[i].href.indexOf("smashingmagazine.com") != -1) {
      let link = links[i];
      console.log("Нашёл строку " + link);
      link.click();
      break;
    }
  }
}

function getRandom(max, min) {
  return Math.floor(Math.random() * (max - min) + min);
}
