// let curPage = document.location.href = "https://ranobes.com/chapters/against-the-gods/102105-glava-1227-gorenie-krovi-feniksa.html";

// curPage ? console.log("loaded"):console.log("not loaded"); 

// document.addEventListener("DOMContentLoaded", function(event) {
//   console.log("DOM fully loaded and parsed");
// });
const fs = require('fs');
const request = require('request');
const {JSDOM} = require('jsdom');

let URL = 'https://ranobes.com/chapters/against-the-gods/102105-glava-1227-gorenie-krovi-feniksa.html';

request(URL, function (err, res, body) {
    if (err) throw err;
    const dom = new JSDOM(body);
    let pageText = dom.window.document.querySelector('#arrticle').innerHTML;
    let pageTitle = dom.window.document.querySelector('.h4').innerHTML;

    fs.writeFileSync("body.html", body);
    fs.writeFileSync("dom.html", pageText);
    
    console.log(res.statusCode);
    rwTitle(pageTitle);
    // rwText();
});

function rwTitle(pageTitle) {
    pageTitle = pageTitle.replace(/\<span(.*)/gims, '');
    console.log('pageTitle: ', pageTitle);
}

// Регулярки можно записывать подряд к одному файлу
function rwText () {
    let data = fs.readFileSync('dom.html', 'utf-8');
    data = data.replace(/\&nbsp\;/gi, ' ');
    data = data.replace(/\<br\>\<br\>/gi, '\n');
    data = data.replace(/\<div(.*)\/div\>/gims, ' ');
    fs.writeFileSync('dataReplaced.html', data, 'utf-8');
    console.log('complete');
}