# Content Scraper

The content scraper is a Node.js command line app that scrapes data from an ecommerce site to get the latest prices and saves them to a spreadsheet in CSV format which can then be used by other applications to populate a database. The application runs once a day.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need to have Node.js and NPM installed. The best way is to install with homebrew - for instructions on how to install check out [this teamtreehouse blog post](http://blog.teamtreehouse.com/install-node-js-npm-mac). Once you have done that install the following npm packages:

[Osmosis](https://github.com/rchipka/node-osmosis)

[json2csv](https://www.npmjs.com/package/json2csv)

All you need to do is navigate to the directory in terminal or console

```
cd {Path to directory}/Content-Scraper/
```

then run

```
npm install
```

### How to run Content-Scraper

Its simple!

To start the program, simply run:

```
npm start
```

And that's it. You'll then have your CSV file with all your data.


## Authors

* **Kate Ross** - *Initial work* - [Kaeross](https://github.com/kaeross)