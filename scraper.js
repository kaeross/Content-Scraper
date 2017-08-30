/*************************************
Global variables and Required modules
*************************************/

//required modules
const fs = require('fs');
const json2csv = require('json2csv');
const osmosis = require ('osmosis');
const util = require('util');

//data variables
const dataDir = "./data/";
let savedData = [];


/*************************************
Functions
*************************************/

//print readable error messages
function printError(error) {
	console.error(`Whoops! Something went wrong: ${error.message}`);
	//log error message with timestamp
	
	//create log file if doesn't exist or append error to file
	function writeErrorFile(err) {
		const logError = `[${new Date}] ${error.message} \n`;
		//check for error log
		fs.stat('scraper-error.log', (err, fd) => {
			if (err) {
				//if no log create log and write error
				if (err.code === 'ENOENT') {
					console.log('there is no file');
					fs.writeFileSync('scraper-error.log', logError, (err) => {
						console.log(' 1 Error has been logged in scraper-error.log');
					});
				}
			} else {
				//else append error to file
				fs.appendFileSync('scraper-error.log', logError, (err) => {
					if (err) throw err;
					console.log('Error has been logged in scraper-error.log');
				});
			}
		});
	}	
	writeErrorFile(error);
}

/*******************************************************************
		   Format date and time stamps
*******************************************************************/


const makeDoubleDigit = (dateTimeElement) => {
		if (dateTimeElement < 10) {
			dateTimeElement = `0${dateTimeElement}`;
			return dateTimeElement;
		} else {
			return dateTimeElement;
		}
	}

function getFormattedDate() {
	const date = new Date;
	const yyyy = date.getFullYear();
	const month = date.getMonth();
	const mm = makeDoubleDigit(month);
	const day = date.getDay();
	const dd = makeDoubleDigit(day);
	return `${yyyy}-${mm}-${dd}`;
}

//Create date / time stamp 
function getFormattedDateTime() {
	const date = new Date;
	const hours = date.getHours();
	const hh = makeDoubleDigit(hours);
	const mins = date.getMinutes();
	const mm = makeDoubleDigit(mins);
	const seconds = date.getSeconds();
	const ss = makeDoubleDigit(seconds);
	return `${getFormattedDate()} ${hh}:${mm}:${ss}`;
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
	}
});

//use npm package osmosis to scrape data from shirts for mike
osmosis
.get("http://www.shirts4mike.com/shirts.php").error(function(err) {
	var errMessage = new Error("There’s been a 404 error. Cannot connect to http://shirts4mike.com.");
	printError(errMessage);
})
.follow(".products a")
.set({
	'Title': 'title',
	'Price': '.shirt-details h1 span',
	'ImageURL': '.shirt-picture img@src',
	'URL': '@url'
})
//.log(console.log)
.data(function(data) {
	//console.log(data);
	savedData.push(data);
})
.error(function(error) {
	printError(error);
})
.debug(util.debuglog)


//functions to run once data has been scraped
.done(function() {
	//loop through json object and add time stamp
	for(let i = 0; i < savedData.length; i++) {
		savedData[i].Time = getFormattedDateTime();
	}
	//convert json data to csv
	var fields = ['Title','Price', 'ImageURL', 'URL', 'Time'];
	var csv = json2csv({data: savedData, fields: fields});
	fs.writeFile(`./data/${getFormattedDate()}.csv`, csv, function(err) {
		if(err) printError(err);
		else console.log(`Data Saved to ${getFormattedDate()}.csv file`);	
	});
});




