// ==UserScript==
// @name         My new Bot Bing
// @namespace    http://tampermonkey.net/
// @version      1.00
// @description  Bot for Bing
// @author       Chizhikov Sergey
// @match        https://www.bing.com/*
// @match        https://napli.ru/*
// @grant        none
// ==/UserScript==

let bingInput = document.getElementsByName("q")[0];
let bingBtn = document.getElementsByClassName("search")[0];
let links = document.links;
let keywords = ["Базовые вещи про GIT", "10 самых популярных шрифтов от Google",
  "Отключение редакций и ревизий в WordPress", "Vite или Webpack?",
  "Вывод произвольных типов записей и полей"];
let keyword = keywords[getRandom(0, keywords.length)];
//let keyword = "Vite — отличное решение для проектов";
let mouseClick = new MouseEvent("click");// new user event - our bot ears

//Работаем на главной странице
if (bingBtn !== undefined) {
  let i = 0;
  bingInput.focus();
  bingInput.dispatchEvent(mouseClick);
  bingInput.value = keyword;
  bingBtn.click();
//  let timerId = setInterval(() => {
//    bingInput.value += keyword[i];
//    i++;
//    if (i == keyword.length) {
//      clearInterval(timerId);
//      bingBtn.click();
//    }
//  },150)
  //Работаем на целевом сайте
} else if (location.hostname == "napli.ru") {

  setInterval(() => {
    let linkIndex = getRandom(0, links.length);
    let localLink = links[linkIndex];

    if (getRandom(0, 101) > 50) {
      location.href = "https://www.bing.com/";
    }
    if (links.length == 0) {
      location.href = "https://napli.ru";
    }

    if (localLink.href.includes("napli.ru")) {
      localLink.click();
    }
  }, getRandom(3000, 5000))

  console.log("Мы на целевом сайте");
}
//Работаем на странице поисковой выдачи
else if (document.querySelector(".b_scopebar") !== null){
  let nextPage = true;
  for (let i = 0; i < links.length; i++) {
    if (links[i].href.indexOf("napli.ru") != -1) {
      let link = links[i];
      let nextPage = false;
      console.log("Нашел строку " + link);
      setTimeout(() => {
        link.click();
      }, getRandom(2000, 3000));
      break;
    }
  }
  let elementExist = setInterval(() => {
    let elem = document.querySelector(".sb_pagS");

    if (elem !== null ) {
      if (elem.innerText == "5") {
        let nextPage = false;
        location.href = "https://www.bing.com/";
      }
      clearInterval(elementExist);
    }
  }, 100)


  if (nextPage) {
    setTimeout(() => {
      document.querySelector(".sb_pagN").click();
    }, getRandom(2500, 3500))

  }
}

function getRandom(min,max) {
  return Math.floor(Math.random() * (max - min) + min);
}
