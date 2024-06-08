const fetch = require("node-fetch");
var zlib = require('zlib');
const fs = require('fs');

let data = '';


async function getData(plBroj, plSufix, opstina) {

    const plBroj4Code = formatTo4Numbers(plBroj)
    const url = `https://katastar.ba/inc/rezultati.php?ajax=true&width=960&height=90%&pl=${plSufix}${plBroj4Code}&pl_broj=${plBroj}&opcina=${opstina}&kn=0`

    let res = '';

    await fetch(url, {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-US,en-GB;q=0.9,en;q=0.8,sr-BA;q=0.7,sr;q=0.6",
            "priority": "u=1, i",
            "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
            "cookie": "_gid=GA1.2.2076535770.1717571686; cf_clearance=AP1hHwTT7iFUFScBxU6a2D2diz3ESVA.d2hdwd7.Qeg-1717571685-1.0.1.1-rSLhen6OIeHmiNFk4jywz9zRViJm73AC5MvQPwiPizwqSqiLutV_RKJzBEE5TLzDlOEZcvOZo.2htn7slGkbyA; ice_login=nenadskobic%40gmail.com%7C%7Cbe453c66dafeb97022669cc7127492a7; _ga_LC7KQJ7ZVL=GS1.1.1717571685.1.1.1717571702.0.0.0; _ga=GA1.1.724794390.1717571686",
            "Referer": "https://katastar.ba/pregled",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": null,
        "method": "GET"
    }).then(async r => {
            await r.text().then(text => {
                res = text;
                return text;
            })
        }
    ).catch(e => {
        console.log(e);
    });
    return res;
}


function formatTo4Numbers(number) {
    var str = "" + number
    var pad = "0000"
    return pad.substring(0, pad.length - str.length) + str
}


const bug_sifra = 17 + '';
const gla_sifra = 33 - +'';
const tom_sifra = 76 - +'';
const liv_sifra = 52 - +'';

const OPSTINE_PODACI = [
    // 0-naziv mjesta i opstine, 1- plPrefix
//    ['KUPRES&kat_opcina=D.%20VUKOVSKO%20-%20austrougarski%20premjer', '510020000'],

//    ['KUPRES&kat_opcina=BLAGAJ%20-%20austrougarski%20premjer','510010000'],
//    ['KUPRES&kat_opcina=G.%20VUKOVSKO%20-%20austrougarski%20premjer','510030000'],
/*    ['KUPRES&kat_opcina=MALOVAN%20-%20austrougarski%20premjer','510050000'],
    ['KUPRES&kat_opcina=OSMANLIJE%20-%20katastar%20nekretnina','510060000'],
    ['KUPRES&kat_opcina=OTINOVCI%20-%20austrougarski%20premjer','510070000'],
    ['KUPRES&kat_opcina=RASTI%C4%8CEVO%20-%20austrougarski%20premjer','510080000'],
    ['KUPRES&kat_opcina=RAVNO%20-%20austrougarski%20premjer','510090000'],
    ['KUPRES&kat_opcina=RILI%C4%86%20-%20austrougarski%20premjer','510100000'],
    ['KUPRES&kat_opcina=VRILA%20-%20austrougarski%20premjer','510110000'],
    ['KUPRES&kat_opcina=ZLOSELA%20-%20katastar%20nekretnina','510120000'],
    ['KUPRES&kat_opcina=ZLOSELO%20-%20austrougarski%20premjer','510130000'],
    ['KUPRES&kat_opcina=KUPRES%20-%20austrougarski%20premjer','510040000'],
*/


//['BUGOJNO&kat_opcina=BRISTOVI%20-%20katastar%20zemljista', bug_sifra + '0010000'],
/*['BUGOJNO&kat_opcina=%C4%8CAU%C5%A0LIJE%20-%20katastar%20zemljista', bug_sifra + '0030000'],
['BUGOJNO&kat_opcina=%C4%8CIPULJI%C4%86%20-%20katastar%20zemljista', bug_sifra + '0040000'],
['BUGOJNO&kat_opcina=CRNI%C4%8CE%20-%20katastar%20zemljista', bug_sifra + '0050000'],
['BUGOJNO&kat_opcina=DRVETINE%20-%20katastar%20zemljista', bug_sifra + '0060000'],
['BUGOJNO&kat_opcina=GLAVICE%20-%20katastar%20zemljista', bug_sifra + '0070000'],
['BUGOJNO&kat_opcina=GRA%C4%8CANICA%20-%20katastar%20zemljista', bug_sifra + '0080000'],
['BUGOJNO&kat_opcina=KANDIJA%20-%20katastar%20zemljista', bug_sifra + '0090000'],
['BUGOJNO&kat_opcina=KOP%C4%8CI%C4%86%20-%20katastar%20zemljista', bug_sifra + '0100000'],
['BUGOJNO&kat_opcina=LJUBNI%C4%86%20-%20katastar%20zemljista', bug_sifra + '0110000'],
['BUGOJNO&kat_opcina=MRA%C4%8CAJ%20-%20katastar%20zemljista', bug_sifra + '0120000'],
['BUGOJNO&kat_opcina=OD%C5%BDAK%20-%20katastar%20zemljista', bug_sifra + '0130000'],
['BUGOJNO&kat_opcina=PLANINICA%20-%20katastar%20zemljista', bug_sifra + '0140000'],
['BUGOJNO&kat_opcina=PORI%C4%8CE%20-%20katastar%20zemljista', bug_sifra + '0150000'],
['BUGOJNO&kat_opcina=POTO%C4%8CANI%20-%20katastar%20zemljista', bug_sifra + '0150000'],
['BUGOJNO&kat_opcina=SKAKAVCI%20-%20katastar%20zemljista', bug_sifra + '0160000'],
['BUGOJNO&kat_opcina=VESELA%20-%20katastar%20zemljista', bug_sifra + '0170000'],
['BUGOJNO&kat_opcina=ZIJAMET%20-%20katastar%20zemljista', bug_sifra + '0180000'],*/
//['BUGOJNO&kat_opcina=BUGOJNO%20-%20katastar%20zemljista', bug_sifra + '0020000'],


/*
['LIVNO&kat_opcina=BILA%20-%20austrougarski%20premjer', liv_sifra + '0010000'],
['LIVNO&kat_opcina=BILA%20-%20katastar%20nekretnina', liv_sifra + '0020000'],
['LIVNO&kat_opcina=%C4%8CAPRAZLIJE%20-%20austrougarski%20premjer', liv_sifra + '0030000'],
['LIVNO&kat_opcina=%C4%8CELEBI%C4%86%20-%20austrougarski%20premjer', liv_sifra + '0040000'],
['LIVNO&kat_opcina=%C4%8CUKLI%C4%86%20-%20katastar%20nekretnina', liv_sifra + '0050000'],
['LIVNO&kat_opcina=DOBRO%20-%20katastar%20nekretnina', liv_sifra + '0060000'],
['LIVNO&kat_opcina=GOLINJEVO%20-%20katastar%20nekretnina', liv_sifra + '0070000'],
['LIVNO&kat_opcina=GRGURI%C4%86I%20-%20katastar%20nekretnina', liv_sifra + '0080000'],
['LIVNO&kat_opcina=GUBER%20-%20austrougarski%20premjer', liv_sifra + '0090000'],
['LIVNO&kat_opcina=KABLI%C4%86I%20-%20popisni%20katastar', liv_sifra + '0100000'],
['LIVNO&kat_opcina=KAME%C5%A0NICA%20-%20katastar%20nekretnina', liv_sifra + '0110000'],
['LIVNO&kat_opcina=LJUBUN%C4%8CI%C4%86%20-%20austrougarski%20premjer', liv_sifra + '0130000'],
['LIVNO&kat_opcina=MI%C5%A0I%20-%20katastar%20nekretnina', liv_sifra + '0140000'],
['LIVNO&kat_opcina=OD%C5%BDAK%20-%20austrougarski%20premjer', liv_sifra + '0150000'],
['LIVNO&kat_opcina=PODGREDA%20-%20austrougarski%20premjer', liv_sifra + '0160000'],
['LIVNO&kat_opcina=PODHUM%20-%20katastar%20nekretnina', liv_sifra + '0170000'],
['LIVNO&kat_opcina=POTO%C4%8CANI%20-%20austrougarski%20premjer', liv_sifra + '0180000'],
['LIVNO&kat_opcina=PRILUKA%20-%20austrougarski%20premjer', liv_sifra + '0190000'],
['LIVNO&kat_opcina=PROLOG%20-%20popisni%20katastar', liv_sifra + '0200000'],
['LIVNO&kat_opcina=RAPOVINE%20-%20popisni%20katastar', liv_sifra + '0210000'],
['LIVNO&kat_opcina=RUJANI%20-%20austrougarski%20premjer', liv_sifra + '0220000'],
['LIVNO&kat_opcina=SMRI%C4%8CANI%20-%20austrougarski%20premjer', liv_sifra + '0230000'],
['LIVNO&kat_opcina=SMRI%C4%8CANI%20-%20katastar%20nekretnina', liv_sifra + '0240000'],
['LIVNO&kat_opcina=SR%C4%90EVI%C4%86I%20-%20katastar%20nekretnina', liv_sifra + '0250000'],
['LIVNO&kat_opcina=STRUPNI%C4%86%20-%20austrougarski%20premjer', liv_sifra + '0260000'],
['LIVNO&kat_opcina=VR%C5%BDERALE%20-%20katastar%20nekretnina', liv_sifra + '0270000'],
['LIVNO&kat_opcina=%C5%BDABLJAK%20-%20popisni%20katastar', liv_sifra + '0280000'],
['LIVNO&kat_opcina=ZASTINJE%20-%20popisni%20katastar', liv_sifra + '0290000'],
['LIVNO&kat_opcina=LIVNO%20-%20austrougarski%20premjer', liv_sifra + '0120000'],



['TOMISLAVGRAD&kat_opcina=BALJCI%20-%20katastar%20zemljista', tom_sifra + '0010000'],
['TOMISLAVGRAD&kat_opcina=BOR%C4%8CANI%20-%20katastar%20zemljista', tom_sifra + '0020000'],
['TOMISLAVGRAD&kat_opcina=BUKOVICA%20-%20katastar%20zemljista', tom_sifra + '0030000'],
['TOMISLAVGRAD&kat_opcina=%C4%86AVAROV%20STAN%20-%20katastar%20zemljista', tom_sifra + '0040000'],
['TOMISLAVGRAD&kat_opcina=%C4%8CEBARA%20-%20katastar%20zemljista', tom_sifra + '0050000'],
['TOMISLAVGRAD&kat_opcina=CRVENICE%20-%20katastar%20zemljista', tom_sifra + '0060000'],
['TOMISLAVGRAD&kat_opcina=DONJI%20BRI%C5%A0NIK%20-%20katastar%20zemljista', tom_sifra + '0070000'],
['TOMISLAVGRAD&kat_opcina=EMINOVO%20SELO%20-%20katastar%20zemljista', tom_sifra + '0080000'],
['TOMISLAVGRAD&kat_opcina=GALE%C4%8CI%C4%86%20-%20katastar%20zemljista', tom_sifra + '0090000'],
['TOMISLAVGRAD&kat_opcina=GORNJI%20BRI%C5%A0NIK%20-%20katastar%20zemljista', tom_sifra + '0100000'],
['TOMISLAVGRAD&kat_opcina=GRABOVICA-%20austrougarski%20premjer', tom_sifra + '0110000'],
['TOMISLAVGRAD&kat_opcina=KOLO%20-%20katastar%20zemljista', tom_sifra + '0120000'],
['TOMISLAVGRAD&kat_opcina=KONGORA%20-%20katastar%20zemljista', tom_sifra + '0130000'],
['TOMISLAVGRAD&kat_opcina=KOP%C4%8CEVINA%20-%20austrougarski%20premjer', tom_sifra + '0140000'],
['TOMISLAVGRAD&kat_opcina=KORITA%20-%20austrougarski%20premjer', tom_sifra + '0150000'],
['TOMISLAVGRAD&kat_opcina=KOVA%C4%8CI%20-%20katastar%20zemljista', tom_sifra + '0160000'],
['TOMISLAVGRAD&kat_opcina=KRNJIN%20-%20katastar%20zemljista', tom_sifra + '0170000'],
['TOMISLAVGRAD&kat_opcina=LETKA%20-%20katastar%20zemljista', tom_sifra + '0180000'],
['TOMISLAVGRAD&kat_opcina=LIPAT%20-%20katastar%20zemljista', tom_sifra + '0190000'],
['TOMISLAVGRAD&kat_opcina=MANDINO%20SELO%20-%20katastar%20zemljista', tom_sifra + '0200000'],
['TOMISLAVGRAD&kat_opcina=MESIHOVINA%20-%20katastar%20zemljista', tom_sifra + '0210000'],
['TOMISLAVGRAD&kat_opcina=MIJAKOVO%20POLJE%20-%20katastar%20zemljista', tom_sifra + '0220000'],
['TOMISLAVGRAD&kat_opcina=MILJACKA%20-%20katastar%20zemljista', tom_sifra + '0230000'],
['TOMISLAVGRAD&kat_opcina=MOKRONOGE%20-%20katastar%20zemljista', tom_sifra + '0240000'],
['TOMISLAVGRAD&kat_opcina=MRKODOL%20-%20katastar%20zemljista', tom_sifra + '0250000'],
['TOMISLAVGRAD&kat_opcina=OMEROVI%C4%86I%20-%20katastar%20zemljista', tom_sifra + '0260000'],
['TOMISLAVGRAD&kat_opcina=OMOLJE%20-%20katastar%20zemljista', tom_sifra + '0270000'],
['TOMISLAVGRAD&kat_opcina=OPLE%C4%86ANI%20-%20katastar%20zemljista', tom_sifra + '0280000'],
['TOMISLAVGRAD&kat_opcina=PA%C5%A0I%C4%86%20-%20katastar%20zemljista', tom_sifra + '0290000'],
['TOMISLAVGRAD&kat_opcina=PODGAJ%20-%20katastar%20zemljista', tom_sifra + '0300000'],
['TOMISLAVGRAD&kat_opcina=PRISOJE%20-%20austrougarski%20premjer', tom_sifra + '0310000'],
['TOMISLAVGRAD&kat_opcina=RA%C5%A0%C4%86ANI%20-%20katastar%20zemljista', tom_sifra + '0320000'],
['TOMISLAVGRAD&kat_opcina=RO%C5%A0KO%20POLJE%20-%20katastar%20zemljista', tom_sifra + '0330000'],
['TOMISLAVGRAD&kat_opcina=RO%C5%A0NJA%C4%8CE%20-%20katastar%20zemljista', tom_sifra + '0340000'],
['TOMISLAVGRAD&kat_opcina=SARAJLIJE%20-%20katastar%20zemljista', tom_sifra + '0350000'],
['TOMISLAVGRAD&kat_opcina=SELI%C5%A0TE%20-%20austrougarski%20premjer', tom_sifra + '0360000'],
['TOMISLAVGRAD&kat_opcina=SEONICA%20-%20katastar%20zemljista', tom_sifra + '0370000'],
['TOMISLAVGRAD&kat_opcina=SR%C4%90ANI%20-%20katastar%20zemljista', tom_sifra + '0380000'],
['TOMISLAVGRAD&kat_opcina=STIPANJI%C4%86I%20-%20katastar%20zemljista', tom_sifra + '0390000'],
['TOMISLAVGRAD&kat_opcina=%C5%A0UICA%20-%20katastar%20zemljista', tom_sifra + '0400000'],
['TOMISLAVGRAD&kat_opcina=TOMISLAVGRAD%20-%20katastar%20zemljista', tom_sifra + '0410000'],
['TOMISLAVGRAD&kat_opcina=VEDA%C5%A0I%C4%86%20-%20katastar%20zemljista', tom_sifra + '0420000'],
['TOMISLAVGRAD&kat_opcina=VINICA%20-%20katastar%20zemljista', tom_sifra + '0430000'],
['TOMISLAVGRAD&kat_opcina=VOJKOVI%C4%86I%20-%20katastar%20zemljista', tom_sifra + '0440000'],
['TOMISLAVGRAD&kat_opcina=VRANJA%C4%8CE%20-%20katastar%20zemljista', tom_sifra + '0450000'],
['TOMISLAVGRAD&kat_opcina=VRAN%20-%20katastar%20zemljista', tom_sifra + '0460000'],
*/

['GLAMO%C4%8C&kat_opcina=CRNI%20VRH%20-%20katastar%20zemljista', gla_sifra + '0010000'],
['GLAMO%C4%8C&kat_opcina=DOLAC%20-%20katastar%20zemljista', gla_sifra + '0020000'],
['GLAMO%C4%8C&kat_opcina=GLAMO%C4%8C%20-%20katastar%20zemljista', gla_sifra + '0030000'],
['GLAMO%C4%8C&kat_opcina=GLAVICE%20-%20katastar%20zemljista', gla_sifra + '0040000'],
['GLAMO%C4%8C&kat_opcina=HALAPI%C4%86%20-%20katastar%20zemljista', gla_sifra + '0050000'],
['GLAMO%C4%8C&kat_opcina=HASANBEGOVI%C4%86I%20-%20katastar%20zemljista', gla_sifra + '0060000'],
['GLAMO%C4%8C&kat_opcina=HOTKOVCI%20-%20katastar%20zemljista', gla_sifra + '0070000'],
['GLAMO%C4%8C&kat_opcina=HRBINE%20-%20katastar%20zemljista', gla_sifra + '0080000'],
['GLAMO%C4%8C&kat_opcina=ISAKOVCI%20-%20katastar%20zemljista', gla_sifra + '0090000'],
['GLAMO%C4%8C&kat_opcina=JAKIR%20-%20katastar%20zemljista', gla_sifra + '0100000'],
['GLAMO%C4%8C&kat_opcina=KOVA%C4%8CEVCI%20-%20katastar%20zemljista', gla_sifra + '0110000'],
['GLAMO%C4%8C&kat_opcina=MALKO%C4%8CEVCI%20-%20katastar%20zemljista', gla_sifra + '0120000'],
['GLAMO%C4%8C&kat_opcina=MLADE%C5%A0KOVCI%20-%20katastar%20zemljista', gla_sifra + '0130000'],
['GLAMO%C4%8C&kat_opcina=OD%C5%BDAK%20-%20katastar%20zemljista', gla_sifra + '0140000'],
['GLAMO%C4%8C&kat_opcina=POPOVI%C4%86I%20-%20katastar%20zemljista', gla_sifra + '0150000'],
['GLAMO%C4%8C&kat_opcina=PRIBELJA%20-%20katastar%20zemljista', gla_sifra + '0160000'],
['GLAMO%C4%8C&kat_opcina=RORE%20-%20katastar%20zemljista', gla_sifra + '0170000'],
['GLAMO%C4%8C&kat_opcina=STEKEROVCI%20-%20katastar%20zemljista', gla_sifra + '0180000'],
['GLAMO%C4%8C&kat_opcina=VAGAN%20-%20katastar%20zemljista', gla_sifra + '0190000'],
['GLAMO%C4%8C&kat_opcina=VIDIMLIJE%20-%20katastar%20zemljista', gla_sifra + '0200000'],


]


function invalidData(str) {
    return !!str.includes('<td><strong>0</strong></td>');
}


async function print() {

    for (let i = 0; i < OPSTINE_PODACI.length; i++) {

        let invalidFor = 0;

        for (let j = 1; j <= 9999; j++) {


            console.log('Processing ' + OPSTINE_PODACI[i][0], ' , plBroj: ', j);
            const currentData = await getData(j, OPSTINE_PODACI[i][1], OPSTINE_PODACI[i][0]);

            const isInvalid = invalidData(currentData);

            if (isInvalid) {
                ++invalidFor;
            } else {
                invalidFor = 0;
            }




            if (invalidFor > 25) {
                fs.appendFileSync('glamoc.html', data);
                data = '';
                invalidFor = 0;
                break;
            }

            //console.log(currentData);

            if (!isInvalid) {
                data += currentData;
            }

        }
    }

    data += '</body></html>'
    fs.appendFileSync('glamoc.html', data);

}

print();
