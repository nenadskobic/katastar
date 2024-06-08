const { exec } = require("child_process");




[


["58", "NOVI GRAD SARAJEVO"],
["59", "NOVI TRAVNIK"],
["60", "NOVO SARAJEVO"],
["61", "ODZAK"],
["62", "OLOVO"],
["63", "ORASJE"],
["64", "PALE-PRACA"],
["65", "POSUSJE"],
["66", "PROZOR-RAMA"],
["67", "RAVNO"],
["68", "SANSKI MOST"],
["69", "SAPNA"],
["70", "SIROKI BRIJEG"],
["71", "SREBRENIK"],
["72", "STARI GRAD SARAJEVO"],
["73", "STOLAC"],
["74", "TEOCAK"],
["75", "TESANJ"],
["76", "TOMISLAVGRAD"],
["77", "TRAVNIK"],
["78", "TRNOVO"],
["79", "TUZLA"],
["80", "USORA"],
["81", "VARES"],
["82", "VELIKA KLADUSA"],
["83", "VISOKO"],
["84", "VITEZ"],
["85", "VOGOSCA"],
["86", "ZAVIDOVICI"],
["87", "ZENICA"],
["88", "ZEPCE"],
["89", "ZIVINICE"]


].forEach(it => {




exec(`node index ${it[0]} ${it[1]}`, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});



});












