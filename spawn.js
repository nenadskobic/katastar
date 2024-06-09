const { spawn } = require("child_process");


const args = process.argv.slice(2);

const opstina = args[0];


let o = 0;

const data = [

["11", "BANOVICI"],
["12", "BIHAC"],
["13", "BOSANSKA KRUPA"],
["14", "BOSANSKI PETROVAC"],
["15", "BOSANSKO GRAHOVO"],
["16", "BREZA"],
["17", "BUGOJNO"],
["18", "BUSOVACA"],
["19", "BUZIM"],
["20", "CAPLJINA"],
["21", "CAZIN"],
["22", "CELIC"],
["23", "CENTAR SARAJEVO"],
["24", "CITLUK"],
["25", "DOBOJ-ISTOK"],
["26", "DOBOJ-JUG"],
["27", "DOBRETICI"],
["28", "DOMALJEVAC SAMAC"],
["29", "DONJI VAKUF"],
["30", "DRVAR"],
["31", "USTIKOLINA"],
["32", "FOJNICA"],
["33", "GLAMOC"],
["34", "GORAZDE"],



["35", "GORNJI VAKUF USKOPLJE"],
["36", "GRACANICA"],
["37", "GRADACAC"],
["38", "GRUDE"],
["39", "HADZICI"],
["40", "ILIDZA"],
["41", "ILIJAS"],
["42", "JABLANICA"],
["43", "JAJCE"],
["44", "KAKANJ"],
["45", "KALESI]A"],
["46", "KISELJAK"],
["47", "KLADANJ"],
["48", "KLJUC"],
["49", "KONJIC"],
["50", "KRESEVO"],
["51", "KUPRES"],
["52", "LIVNO"],
["53", "LJUBUSKI"],
["54", "LUKAVAC"],
["55", "MAGLAJ"],
["56", "MOSTAR"],
["57", "NEUM"],
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


]

async function loop() {


    for (let i = 0; i < data.length; i++) {


        await spawnIndex(data[i]);
        //await new Promise(resolve => setTimeout(resolve, 30 * 60000));

    }

}


async function spawnIndex(it) {


    for (let i = 1; i < 26; i++) {//TODO promijeni indexe mjesta da pokupis nova za vece opstine


        const ls = spawn("node", ["index", it[0], it[1], "" + i ]);

        ls.stdout.on("data", data => {
            console.log(`stdout: ${data}`);
        });

        ls.stderr.on("data", data => {
            console.log(`stderr: ${data}`);
        });

        ls.on('error', (error) => {
            console.log(`error: ${error.message}`);
        });

        ls.on("close", code => {
            console.log(`child process exited with code ${code}`);
        });


        await new Promise(resolve => setTimeout(resolve, 5 * 60000));

    }






}

loop().then(r => console.log('Program finished'));








