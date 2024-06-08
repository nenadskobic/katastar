const fetch = require("node-fetch");
const fs = require('fs');

let data = '';

const args = process.argv.slice(2);

const opstinaBroj = args[0]
const opstinaIme = args[1]



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
        res = '<p style="background-color: red">error: ' + e.message + ', url: ' + url+ '</p>';
        console.log(e);
    });
    return res;
}


function formatTo4Numbers(number) {
    var str = "" + number
    var pad = "0000"
    return pad.substring(0, pad.length - str.length) + str
}

function formatTo2Numbers(number) {
    var str = "" + number
    var pad = "00"
    return pad.substring(0, pad.length - str.length) + str
}

function invalidData(str) {
    return !!str.includes('<td><strong>0</strong></td>');
}


async function print() {

    for (let i = 1; i < 61; i++) {

        let invalidFor = 0;
        let resetPeriod = 0;

        for (let j = 1; j <= 9999; j++) {

            console.log(`Processing ${opstinaBroj} , ${opstinaIme} , mjesto: ${i} , plBroj: , ${j}`);
            const currentData = await getData(j, `${opstinaBroj}0${formatTo2Numbers(i)}0000`, `${opstinaIme}&kat_opcina=${opstinaBroj}`);

            const isInvalid = invalidData(currentData);

            if (isInvalid) {
                ++invalidFor;
            } else {
                invalidFor = 0;
            }


            if (invalidFor > 5000) {
                writeFile(data);
                data = '';
                invalidFor = 0;
                break;
            }

            //console.log(currentData);

            if (!isInvalid) {
                data += currentData;

                ++resetPeriod;

                if (resetPeriod > 50) {
                    writeFile(data)
                    data = '';
                    resetPeriod = 0;
                }

            }

        }
    }

    data += '</body></html>'
    writeFile(data);

}

function writeFile(data) {
    fs.appendFileSync(`docs/${opstinaBroj}.html`, data);
}

print();
