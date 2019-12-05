# Ethereum Block Status

## Very Brief Summary
A web app that displays the current status of Ethereum block mining.

## Description
This web app displays information the most recent blocks mined for Ethereum. This information includes:
* Block height
* Date and time at which the mining was successful
* Time elapsed between the mining of the current block and the previously mined block
* Hash of the mined block

The page also calculates the hash rate for the Ethereum network using the avereged time elapsed.

## Included Files
* "interface.html" - the visuals for the project
* "backend.js" - the backend scripting that checks in with the API and sends the information to be displayed wihtin "interface.html"
* "example.png" - simply a screenshot of the project in action
* "README.md" - instructions for using this project

## Installation
Clone the repo. To see the page, double click on "interface.html" and it will open in your default web browser. 

## Known Problems
With the free version of the API used, there is a maximum number of requests per hour: 200. The page GETs from the API every 5 seconds, so if the page is run for more than 16 minutes, it will likely stop running for at most 44 minutes. 

Since "backend.js" only checks with the API every 5 seconds, it is possible to miss a block here and there. You can know if a block was missed by noticing if the block height changes by more than one at any point in the leftmost column. To avoid this, decrease the second parameter (represented in milliseconds) of the "setInterval()" function. Note: decreasing teh time between checks with the API will decrease the amount of time  the page will run for without needing to wait for the hourly limitation to reset.
