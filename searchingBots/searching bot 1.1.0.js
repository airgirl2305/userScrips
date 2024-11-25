// ==UserScript==
// @name         My new Bot Bing
// @namespace    http://tampermonkey.net/
// @version      1.00
// @description  Bot for Bing
// @author       Chizhikov Sergey
// @match        https://www.bing.com/*
// @grant        none
// ==/UserScript==

let bingInput = document.getElementsByName("q")[0];
let bingBtn = document.getElementsByClassName("search")[0];
let links = document.links;
let keywords = [
  "Базовые вещи про GIT",
  "10 самых популярных шрифтов от Google",
  "Отключение редакций и ревизий в WordPress",
  "Vite — отличное решение для проектов",
];
let keyword = keywords[getRandom(0, keywords.length)];

if (bingBtn !== undefined) {
  bingInput.value = keyword;
  bingBtn.click();
} else {
  for (let i = 0; i < links.length; i++) {
    if (links[i].href.indexOf("napli.ru") != -1) {
      let link = links[i];
      console.log("Нашел строку " + link);
      link.click();
      break;
    }
  }
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
