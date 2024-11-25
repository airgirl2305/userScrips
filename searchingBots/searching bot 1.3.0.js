// ==UserScript==
// @name         My new Bot Bing
// @namespace    http://tampermonkey.net/
// @version      1.25
// @description  Bot for Bing
// @author       Chizhikov Sergey
// @match        https://www.bing.com/*
// @match        https://napli.ru/*
// @match        https://kiteuniverse.ru/*
// @match        https://motoreforma.com/*
// @grant        none
// ==/UserScript==

let bingInput = document.getElementsByName("q")[0];
let bingBtn = document.getElementsByClassName("search")[0];
let links = document.links;
let sites = {
  "napli.ru": ["Базовые вещи про GIT", "10 самых популярных шрифтов от Google",
    "Отключение редакций и ревизий в WordPress", "Vite или Webpack?", "Вывод произвольных типов записей и полей"],
  "kiteuniverse.ru": ["Kite Universe Россия", "Красота. Грация. Интеллект", "Мастер классы Kite"],
  "motoreforma.com": ["вариатор CVTech CAN-AM", "Прошивки для CAN-AM BRP", "тюнинг Maverick X3"],
}
let sitesKeys = Object.keys(sites);
let site = sitesKeys[getRandom(0, sitesKeys.length)];
let keywords = sites[site];
let keyword = keywords[getRandom(0, keywords.length)];
//let keyword = "Vite — отличное решение для проектов";
let mouseClick = new MouseEvent("click");

if (bingBtn !== undefined) {
  document.cookie = `site=${site}`;
} else if (location.hostname == "www.bing.com") {
  site = getCookie("site");
} else {
  site = location.hostname;
}

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
} else if (location.hostname == site) {
  setInterval(() => {
    let linkIndex = getRandom(0, links.length);
    let localLink = links[linkIndex];

    if (getRandom(0, 101) > 70) {
      location.href = "https://www.bing.com/";
    }
    if (links.length == 0) {
      location.href = site;
    }
    if (localLink.href.includes(site)) {
      localLink.click();
    }
  }, getRandom(3000, 5000))
  console.log("Мы на целевом сайте");
}
//Работаем на странице поисковой выдачи
else if (document.querySelector(".b_scopebar") !== null){
  let nextPage = true;
  for (let i = 0; i < links.length; i++) {
    if (links[i].href.indexOf(site) != -1) {
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

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
