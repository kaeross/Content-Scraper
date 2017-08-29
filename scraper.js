/*************************************
Global variables and Required modules
*************************************/

//required modules
const scrapeIt = require("scrape-it");
const fs = require('fs');
const path = require('path');

//global variables
const dataDir = "./data/";


/*************************************
Functions
*************************************/

//print readable error messages
function printError(error) {
	console.error(`there has been an error:` + error.message);
}

//check for data folder - if not present create new data folder.
fs.stat(dataDir, (err, fd) => {	
	if (err) {
		if (err.code === 'ENOENT') {
			console.log('You don\'t have a data directory yet, I\'ll just make you one now.');
			fs.mkdir(dataDir, 0777, (err) => {
				if (err) {
					printError(err);
				}
			});
		} else { 
			printError(err);
		}
	} else {
		console.log('Oh aren\'t you organised. You already have a data folder!');
	}
});

// Promise interface
// scrapeIt("http://http://www.shirts4mike.com/shirts.php", {
//     title: ".header h1"
//   , desc: ".header h2"
//   , avatar: {
//         selector: ".header img"
//       , attr: "src"
//     }
// }).then(page => {
//     console.log(page);
// });




