require('dotenv').config()
import puppeteer from 'puppeteer';  
(async () => {
  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: true,
      slowMo: 20,
    });
    console.log("UM")
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(1000000);
    await page.setViewport({ width: 1000, height: 600 });
    await page.goto('https://www.facebook.com');
    await page.waitForSelector('#email');
    await page.type('#email', 'mastervenda7@gmail.com');
    await page.type('#pass', 'Monteiro01*');
    await page.click(`[type="submit"]`);
    console.log("DOIS")
    await page.waitForNavigation();
    await page.keyboard.press(String.fromCharCode(13)); // character code for enter is 13
    //await page.click(`div`); // this is because facebook leaves some black overlay if you log in with my chromium; it may not be the same for yours
    await page.waitFor(5000)
    await page.goto('https://www.facebook.com/ofertabestt');
    await page.waitFor(3000)
    await page.keyboard.press(String.fromCharCode(13));
    console.log("TRES")
    //await page.click('div')
    await page.waitForSelector(
      `[aria-label="Criar publicação"]`
    );
    await page.click(`[aria-label="Criar publicação"]`);
    // type inside create post
    let sentenceList = [
      `Carregador Veicular 1 USB-C PD + 1 USB, Anker, 11144308, PowerDrive PD 2, 33W, Carregamento Rapido, Preto.${String.fromCharCode(13)}${String.fromCharCode(13)}Com 0%OFF.${String.fromCharCode(13)}${String.fromCharCode(13)}Link: https://ofertabest.com/produto/carregador-veicular-1-usb-c-pd-1-usb-anker-11144308-powerdrive-pd-2-33w-carregamento-rapido-preto-163/`,
    ];

    await page.waitFor(3000)
    //await page.click(`[aria-label="Criar publicação"]`);
    //await page.waitFor(3000)
    console.log("QUATRO")
    for (let j = 0; j < sentenceList.length; j++) {
      let sentence = sentenceList[j];
      for (let i = 0; i < sentence.length; i++) {
        console.log(sentence[i])
        await page.keyboard.press(sentence[i]);
        if (i === sentence.length - 1) {

          console.log("CINCO")
          await page.waitFor(10000);
          await page.keyboard.down('Control');
          await page.waitFor(40000);
          await page.keyboard.press(String.fromCharCode(13)); // character code for enter is 13
          console.log("SEIS")
          await page.keyboard.up('Control');
          await page.waitFor(4000);

          console.log('done');
          
        }
      }
    }

    console.log("SETE")
    
    browser.close();
    console.log('yay we are in facebook logged in');
  } catch (error) {
    console.error(error);
  }
})();