Prerequisites
1. Node.js
2. Node Package Manager (npm)
3. Firefox or Google Chrome (recommended) or Opera
4. Working internet connection
Environment Setup
1. npm install -g truffle
2. npm install -g ganache-cli
3. Clone the repository into ‘smartlock’
4. npm install in the root folder
Running the App
1. On terminal 1
* ganache-cli
2. Open MetaMask in a browser and login using the generated seed words
3. On terminal 2, navigate to smartlock/contract
* truffle compile
* truffle migrate --reset
4. On terminal 3, navigate to smartlock /server
* node server.js
5. On terminal 4, navigate to smartlock /client
* ng serve
6. Start localhost:4200 in the browser
