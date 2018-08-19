const { promisify } = require('util')
const readFile = promisify(require('fs').readFile)
const mkdir = promisify(require('fs').mkdir)
const tempDir = require('temp-dir')
const puppeteer = require('puppeteer')

module.exports = async ({ 
  url, 
  width: width = 1024, 
  height: height = 768 , 
  timeout:timeout = 3000
}) => {
  const cwd = `${tempDir}/${Date.now()}${Math.random().toString(16).slice(2)}`
  let error = false;
  function timeoutHandler(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }; //

  await mkdir(cwd)
  await (async() => {

    try {
      const browser = await puppeteer.launch({args: ['--no-sandbox']});
      const page = await browser.newPage();
      await page.setViewport({width: width, height: height})
      await page.goto(url, {waitUntil: 'networkidle2'});
      await timeoutHandler(timeout)
      await page.screenshot({path: `${cwd}/screenshot.png`});
      await browser.close();
    } catch(e) {  
      error = true
      console.log('no such page')
    }
  })();

  if (!error) {
    return readFile(`${cwd}/screenshot.png`)
  } else {
    return 'no such page'
  }

}
