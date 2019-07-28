# Ranker Hack

Ranker Hack is a basic version of Google spreadsheet.
Its implementation can be found at [Live Here](https://ranker-hack.herokuapp.com/)

# Features
  - Highly Dynamic in nature
  - Lets use basic features like SUM, AVERAGE, POWER ( case in-sensitive )
  - Can support more mathematical functions easily 
  - Highlights cells which will be used in fn evaluation
  - Save & Retrieve the version ( Uses local storage )
  
### Allowed versions of =SUM
| fn   |        Evaluation |
| :----- |:------|
| =sum(A1:A20) | cells from A1 to A20|
| =sum(D10:B2) | cells from B2 to D10, regardless of their sequnce of cols & rows|
| =sum(1, 2, 3) | supports normal addition as well
| =sum(A1, A2, A4:A5, 10) | Hybrid mode of evaluation |
| =sum(A1, A2 | Evaluates incomplete probable valid commands |
 | =sum( | #ERROR |
| =sum() | #ERROR |
| =sum) | #ERROR |

### Allowed versions of =AVERAGE
| fn   |        Evaluation |
| :----- |:------|
| =average(A1:A20) | cells from A1 to A20|
| =average(D10:B2) | cells from B2 to D10, regardless of their sequnce of cols & rows|
| =average(1, 2, 3) | supports normal addition as well
| =average(A1, A2, A4:A8, 10) | Hybrid mode of evaluation, considers 8 items total with cells A1, A2, A4, A5, A6, A7, A8 and value 10 |
| =average(A1, A2 | Evaluates incomplete probable lid commvaands |
 | =average( | #ERROR |
| =average() | #ERROR |
| =average) | #ERROR |

### Allowed versions of =POW or =POWER
| fn   |        Evaluation |
| :----- |:------|
| =pow(A1, 2) | cell value A1 with expo value 2|
| =pow(A1, B2) | cell value A1 with expo value B2|
| =pow() | #ERROR|
| =pow(A1, A2, 2) | #ERROR|
  
# Scope of Improvments
  - Sticky Columns & Row headers
  - Highlighting corresponding column & header
  - Supporting fn version =SUM(A) which will sum entire column
  - Drag & Select
  - Copy and paste of cell value ( currently one need to press enter and then select the cell value & paste it to some other cell after pressing enter to the destination cell )
  - Connecting with API


### Tech

Ranker Hack uses a number of open source projects to work properly

* [ReactJS] - Client side popular JS Framework!
* [CSS] - Styling of the app
* [create-react-app] - Quickly lets bootstrap the ReactJS app.
* [node.js] - evented I/O for serving React App
* [Express] - fast node.js network app framework
* [Heroku] - Where the live application is deployed

And of course Ranker Hack itself is open source on a GitHub

### Installation

Ranker Hack requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ cd tableiq
$ npm install -d
$ npm run start-dev
```

For production environments...

```sh
$ npm install --production
$ npm run build
$ npm start
```
