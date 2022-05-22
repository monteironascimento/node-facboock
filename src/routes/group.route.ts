import { Router } from 'express';
import puppeteer from 'puppeteer';  

const postGroup = Router();

postGroup.post("/", async (req, res) => {

    const obj = req.body;

    try {
      const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        headless: true, //(process.env.NODE_ENV === 'production' ? true : false),
        slowMo: 20,
      });

      console.log(obj);
      try {

                // type inside create post 
                let sentenceList = [];

                for (const key in obj.listaOfertas) {
                  sentenceList.push(`${obj.listaOfertas[key].description}Link: ${obj.listaOfertas[key].link}`)
                }


                console.log(sentenceList);
        
        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(1000000);
        await page.setViewport({ width: 1000, height: 600 });
        await page.goto('https://www.facebook.com');
        await page.waitForSelector('#email');
        await page.type('#email', 'mastervenda7@gmail.com');
        await page.type('#pass', 'Monteiro01*');
        await page.click(`[type="submit"]`);
        await page.waitForNavigation();
        await page.keyboard.press(String.fromCharCode(13)); // character code for enter is 13
        //await page.click(`div`); // this is because facebook leaves some black overlay if you log in with my chromium; it may not be the same for yours
        console.log('LOGADO');        

        //await page.click(`[aria-label="Criar publicação"]`);
        //await page.waitFor(3000)
        for (let j = 0; j < sentenceList.length; j++) {

          await page.waitFor(5000)
          await page.goto('https://www.facebook.com/ofertabestt');
          await page.waitFor(3000)
          await page.keyboard.press(String.fromCharCode(13));
          //await page.click('div')
          await page.waitForSelector(
            `[aria-label="Criar publicação"]`
          );
          await page.click(`[aria-label="Criar publicação"]`);
          await page.waitFor(3000)

          console.log('CRIA PUBLICACAO');        

          let sentence = sentenceList[j];
          for (let i = 0; i < sentence.length; i++) {
          
            await page.keyboard.press(sentence[i]);
            if (i === sentence.length - 1) {
              await page.waitFor(4000);
              
              await page.keyboard.down('Control');
              await page.waitFor(4000);
              await page.keyboard.press(String.fromCharCode(13)); // character code for enter is 13
              await page.keyboard.up('Control');
              await page.waitFor(100000);
    
              console.log('done');
              
            }
          }
        }
        
      
        console.log('yay we are in facebook logged in');
      } catch (error) {
        console.error(error);
      }
      //browser.close();
  } catch (error) {
    console.error(error);
  }

    console.log(`PROCESSO FINALIZADO!`);
      
    return res.status(201).json({ status: "OK"});
})

export { postGroup };