// ==UserScript==
// @name         My 1st searching Bot
// @namespace    http://tampermonkey.net/
// @version      1.1.2
// @description  Bot for ya to serf for the smashingmagazine.com
// @author       Askhabova Kheda
// @match        https://ya.ru/*
// @grant        none
// ==/UserScript==

let input = document.getElementById("text");
let button = document.getElementsByClassName("search3__button")[0]; // hidden button for search
let links = document.links;
let keywords = [
  "Writing CSS In 2023",
  "How To Search For A Developer Job Abroad",
  "Learning JavaScript With Imagination",
  "Making Sense Of “Senseless” JavaScript Features",
];
let keyword = keywords[getRandom(keywords.length, 0)];

if (button !== undefined) {
  input.value = keyword;
  button.click();
} else {
  for (let i = 0; i < links.length; i++) {
    if (links[i].href.indexOf("smashingmagazine.com") !== -1) {
      let link = links[i];
      console.log("I've found one " + link);
      link.click();
      break;
    }
  }
}

function getRandom(max, min) {
  return Math.floor(Math.random() * (max - min) + min);
}
