## Design
![Architecture of BabelChat](public/images/Babel-Chat-diagram.png "Architecture of BabelChat")

## Aims & Objectives
- Use Agile and XP values
- Have fun as a team
- Use full stack JS
- Strong team communication via Waffle and Slack


## How Team works
```
9:30am starts / stand-ups
Structure each day based on stand-up
12pm to 1pm lunch
End of day retros
Reassess MPV regularly
Regular commits
Review code before merging
Outline objectives before meetings  
Engage team after struggling for more than 45mins
```

## Installation Instructions

 * Install [Node.js](https://nodejs.org/)
 * `npm install --save express`
 * `npm i nyc --save-dev` (Incase nyc file gets deleted from node_modules folder)
 * `npm install --save socket.io`
 * `npm install --save google-translate`
 * `npm install react react-dom --save`
 * `npm install -g webpack --save`
 * `npm install babel-core babel-loader babel-preset-es2015 babel-preset-react --save`
 * `npm install --save async`

To set up Google Translate API for Heroku
 * `heroku config:set TRANSLATE_KEY=$TRANSLATE_KEY`
 * ` heroku config:set DATABASE_DEVELOPMENT=mongodb://<username>:<password>@<hostname>.mlab.com:<port>/babelchat`

To run:
 * `node index.js`

then visit `http://localhost:3000/`

##  Testing

 * Install Mocha, Chai:
 * `npm install --save-dev mocha`
 * `npm install --save-dev chai`
 * `npm install --save-dev enzyme`
 * `npm install --save-dev sinon`
 * `npm install --save-dev sinon-mongoose`
 * `npm install --save-dev react-test-renderer`
 * `npm install --save-dev jsdom jsdom-global`

To run:
 * `webpack; npm start`

## mongodb

  * Have 2 terminals open
    * 1. running mongod (or sudo mongod)
    * 2. mongo
      * a. Add new database 'use babelchat_test'
      * b. this will only show when a record is added

  mongod MUST BE RUNNING AT ALL TIMES TO SAVE database

  * to view database information
    * show dbs (this shows all current databases)
    * use database name (this command opens the database)
    * show collections (lists models)
    * db.messages.find().pretty() (lists all records within messages)

## Team Members
[Panteha Ahmadi](https://github.com/panteha)
[Ian Simpson](https://github.com/Simo72)
[Andrew Clarke](https://github.com/Dino982)
[Spencer Barton-Fisher](https://github.com/spencerbf)
[Aaron Rodrigues](https://github.com/AaronRodrigues)
[Elena Morton](https://github.com/elenamorton)
