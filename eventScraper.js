import * as cheerio  from "cheerio";
import fetch from "node-fetch";
import express from "express";
import cors from 'cors'

const app=express()
app.use(cors())
const url='https://www.ufc.com/event/ufc-282'

const UFC282=[]

async function getEvents(){

    try{
    const response= await fetch(url)
    const body= await response.text()
    const $= cheerio.load(body)

    //name of events in ufc 282
    const FightSectionName=$('.anchors-bar__list > li > a').text()
    const FightDate=$('#main-card > div > div > div > div > div.tz-change-inner').text().trim()
        $('#main-card > div > section > ul > li').map((i,el)=>{
            const ufc282={
                fightTypeTitle:$(el).find('.c-listing-fight__class--mobile > .c-listing-fight__class-text').text().trim(),
                imageLeft: $(el).find('div.layout__region--content > img').attr('src').trim(),
                LeftFighterName:$(el).find('div.c-listing-fight__names-row > .c-listing-fight__corner-name--red').text().trim(),
                countryLeftName:$(el).find('.c-listing-fight__odds-row > .c-listing-fight__country--red').text().trim(),
                countryLeftFlagImg:$(el).find('.c-listing-fight__odds-row > .c-listing-fight__country--red > img').attr('src').trim(),

                imageRight:$(el).find('div.c-listing-fight__corner-image--blue > div > div > img').attr('src').trim(),
                RightFighterName:$(el).find('div.c-listing-fight__names-row > .c-listing-fight__corner-name--blue ').text().trim(),
                countryRightName:$(el).find('.c-listing-fight__odds-row > .c-listing-fight__country--blue').text().trim(),
                countryRightFlagImg:$(el).find('.c-listing-fight__odds-row > .c-listing-fight__country--blue > img').attr('src').trim()
                //allDetail:$(el).find('.c-listing-fight__names-row').text().trim(),
                    //console.log(countryRightFlagImg)
            }
            UFC282.push(ufc282)
        })
    }catch(err){console.error(err)}
console.log(UFC282)
}
getEvents()

//express server 
app.get('/',(req,res)=>{
    return res.json(UFC282)
})


app.listen(process.env.PORT || 9000,()=>console.log(`server is working ${process.env.PORT||9000}`))