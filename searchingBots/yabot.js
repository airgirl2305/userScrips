// ==UserScript==
// @name         yandex bot
// @namespace    http://tampermonkey.net/
// @version      1.00
// @description  Bot for yandex
// @author       Belyakova Alexandra
// @match        https://ya.ru/*
// @match        https://htmlbook.ru/*
// @grant        none
// ==/UserScript==

let yaInput = document.getElementsByName('text')[0];
let yaBtn = document.getElementsByClassName("search3__button mini-suggest__button")[0];
let links = document.links;
let keywords = ["CSS-анимация для начинающих", "Справочник по HTML"];
let keyword = keywords[getRandom(0, keywords.length)];


let mouseClick = new MouseEvent("click");

//Работаем на главной странице
if (yaBtn !== undefined) {
let i = 0;
 //  yaInput.focus();
 //  yaInput.dispatchEvent(mouseClick);
 //  yaInput.value = keyword;
 //  yaBtn.click();

   let timerId = setInterval(() => {
     yaInput.value += keyword[i];
     i++;
    if (i == keyword.length) {
      clearInterval(timerId);
      yaBtn.click();
    }
   },150)
  //Работаем на целевом сайте
  } else if (location.hostname == "htmlbook.ru") {

    setInterval(() => {
      let linkIndex = getRandom(0, links.length);
      let localLink = links[linkIndex];

      if (getRandom(0, 101) > 50) {
        location.href = "https://ya.ru/";
      }
      if (links.length == 0) {
        location.href = "https://htmlbook.ru/";
      }

      if (localLink.href.includes("htmlbook.ru")) {
        localLink.click();
      }
    }, getRandom(5000, 7000))

    console.log("Мы на целевом сайте");
  }
//Работаем на странице поисковой выдачи
else if (document.querySelector(".Pager-Content") !== null){
  let nextPage = true;
  for (let i = 0; i < links.length; i++) {
    if (links[i].href.indexOf("htmlbook.ru") != -1) {
      let link = links[i];
      let nextPage = false;
      console.log("Нашел строку " + link);
      setTimeout(() => {
        link.target = '_self';
        link.click();
      }, getRandom(2000, 3000));
      break;
    }
  }
  let elementExist = setInterval(() => {
    let elem = document.querySelector('a[aria-label="Первая страница"]');
    if (elem !== null ) {
      if (elem.innerText == "5") {
        let nextPage = false;
        location.href = "https://ya.ru/";
      }
      clearInterval(elementExist);
    }
  }, 100)


  if (nextPage) {
    setTimeout(() => {
      document.querySelector('a[aria-label="Следующая страница"]').click();
    }, getRandom(2500, 3500))

  }
}

function getRandom(min,max) {
  return Math.floor(Math.random() * (max - min) + min);
}

