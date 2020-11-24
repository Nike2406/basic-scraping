// let curPage = document.location.href = "https://ranobes.com/chapters/against-the-gods/102105-glava-1227-gorenie-krovi-feniksa.html";

// curPage ? console.log("loaded"):console.log("not loaded"); 

// document.addEventListener("DOMContentLoaded", function(event) {
//   console.log("DOM fully loaded and parsed");
// });
const fs = require('fs');
const request = require('request');
const {
    JSDOM
} = require('jsdom');

let url = 'https://ranobes.com/chapters/against-the-gods/102105-glava-1227-gorenie-krovi-feniksa.html';

for (let i = 0; i < 10; i++) {
    console.log('url1: ', url);
    getText();
    console.log('url2: ', url);
    // setTimeout(nextPush(), 3000);
    console.log('url3: ', url);
}

function getText() {

    request(url, function (err, res, body) {
        if (err) {
            throw err;
        }
        const dom = new JSDOM(body);
        let pageText = dom.window.document.querySelector('#arrticle').innerHTML;
        let pageTitle = dom.window.document.querySelector('.h4').innerHTML;
        
        let nextPage = dom.window.document.querySelector('#next');
        // console.log('nextPage: ', nextPage);
        // console.log('nextPage: ', nextPage.href);
        url = nextPage.href;

        fs.writeFileSync("dom.html", pageText);

        console.log(res.statusCode);
        rwTitle(pageTitle);
        rwText();
         return url;
    });

    function rwTitle(pageTitle) {
        pageTitle = pageTitle.replace(/(<span)(.*)/gims, '');
        fs.appendFileSync('dataReplaced.html', `\n${pageTitle}\n`, 'utf-8');
    }

    // Регулярки можно записывать подряд к одному файлу
    function rwText() {
        let data = fs.readFileSync('dom.html', 'utf-8');
        // Убираем неразрывные пробелы
        data = data.replace(/\&nbsp\;/gi, ' ');
        // Двойной перенос строки
        data = data.replace(/<br><br>/gi, '\n');
        // Непонятный див со скриптом
        data = data.replace(/<div(.*)\/div>/gims, ' ');
        fs.appendFileSync('dataReplaced.html', data, 'utf-8');
        clearSrc();
        console.log('complete');
    }

    // Удаляем излишки
    function clearSrc() {
        fs.unlinkSync("dom.html");
    }
}
// getText();

function nextPush(nextPage) {
    nextPage.click();
}