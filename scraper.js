/*************************************
Global variables and Required modules
*************************************/

//required modules
const scrapeIt = require("scrape-it");
const fs = require('fs');
const csv = require('csv');
const osmosis = require ('osmosis');

//data variables
const dataDir = "./data/";
let savedData = [];


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
	}
});

//use npm package osmosis to scrape data from shirts for mike
osmosis
.get("http://www.shirts4mike.com/shirts.php")
.follow(".products a")
.set({
	'Title': 'title',
	'Price': '.shirt-details h1 span',
	'ImageURL': '.shirt-picture img@src',
	'URL': '@url'
})
.log(console.log)
.data(function(data) {
      console.log(data);
      savedData.push(data);
   })
.error(console.error)

 .done(function() {
      fs.writeFile('./data/data.json', JSON.stringify( savedData, null, 4), function(err) {
        if(err) console.error(err);
        else console.log('Data Saved to data.json file');
      })
   });




















// /** CSV parsing and generation */
// csv.generate({seed: 1, columns: 5}, function(err, data){
//   csv.parse(data, function(err, data){
//     csv.transform(data, function(data){
//       return data.map(function(value){return value.toUpperCase()});
//     }, function(err, data){
//       csv.stringify(data, function(err, data){
//         process.stdout.write(data);
//       });
//     });
//   });
// });


