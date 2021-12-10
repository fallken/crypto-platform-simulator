<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://gitlab.com/fallken">
    <img src="https://thumbs.dreamstime.com/b/bitcoin-currency-exchange-bitcoin-exchange-bitcoin-trading-platform-buy-sell-bitcoin-fully-editable-vector-icons-bitcoin-208003309.jpg" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">User Crypto Profile Simulator (incomplete version)</h3>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#technical-analysis">Technical Analysis</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

this is url shortener project which will generate short urls for the input url that the use submits .

This project designed to simualte a user's profile in our crypto exchange platform
the whole project could be simply loaded and be used with docker-compose .if you already have docker installed on you env then you can simple use two compose files . i have provided two compose files :
* one for development (docker-compose.yml)
* one for production (docker-compose-production.yml)

there are route e2e tests associated with the proejct

### Built With

here are the list of major frameworks and techs used in the project : 
* [Express](https://expressjs.com/)
* [Mongoose](https://mongoosejs.com/)
* [Jest](https://jestjs.io/)
* [Typescript](https://www.typescriptlang.org/)



<!-- GETTING STARTED -->
## Getting Started

To run the application in the docker compose the only thing needed is the docker and docker-compose installed on your system .


### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```
* mongodb server (if no docker used)
* docker 
* docker-compose
### Installation

   * important : to change the environments you need to add an .env file to the root of the project . to simplify it i have included a .env.example file which you can simple copy the content of it into the .env file (make sure to change sensitive data)

* using docker

    the server port will be 3000 . feel free to modify the ports in docker-compose.yml 

    dev: 
    ```
        docker-compose up
    ```

    production: 
    ```
        docker-compose -f docker-compose-production.yml up
    ```

    * note : for dev i have also added a mongo-express admin panel to checkout the database and its collections without any pains using browser
    the port is 8083 . enjoy !!


* using npm

    * dev (mongodb server should be provided)
            
            
            1. Install
                ```
            2. Install NPM packages
                ```sh
                npm install
                ```
            3. run the server
                ```sh
                npm run dev
                ```
    * production (mongodb server should be provided)
            
            
            1. Install
                ```
            2. Install NPM packages
                ```sh
                npm install
                ```
            3. build the app
                ```sh
                  npm run build
                ```
            4. run the server
                ```sh
                npm start
                ```
* running seed script
    * simpy run (need to provide mongodb database) 
      ```sh
         npm run seed
       ``` 
  
* runnig tests 
   to run tests you wil have to provide the mongodb server ( its using real db but on a different test databae and will remove the db after tests are done ) and the env vars (better to use .env file)
   then run : 

          npm run test
   

<!-- USAGE EXAMPLES -->
## Technical Analysis

After checking the project and analysing the routes and responses I decided to make some big changes to it to make it (in my opinion ) closer to a production ready application . 
I believe that this application is going to provide service for individuals so I added authentication to the application so that each user can only add his own favourites and simulators . The authentication is done using email and password (email was already there) and for user request  validation I am using jsonwebtoken package (jwt) .
I could not get a details background of the target of the application and the models so I choose not to change the models a lot and just focused on optimizing them . 

* Project Structure <br/>
Since the project was was small and not much developments were implemented in it the folder structure looked normal models and routes were in their own folder .
I seperated the logic api into two files one index.ts and one app.ts . I just followed the common pattern in my recent projects for naming the files .  I moved the server and mongo start script to into index.ts for two reasons : 

  1- wanted to pass the app.ts file to allow the test files to start their server 

  2- in the previous code once you start the script the server will always run before the connection to database is established so imagine that the server is alive (even for short period of time ) but the db connection is not there yet , you send a request and it fails . To fix you need to wait  for the db connection to establish then start the server . For this I moved the mongoose connection script to index.ts this way the application will not start and serve any requests until the db connection is established . 
  In my opinion the config file looked fine just added default value for port and ofcourse changed CORS_ORIGINS  value to be taken from env . 


** Models
	
* Profile : <br/>
 the naming of profile model  didnt seem right to me . I mean profile itself would mean many things in the first look so I changed it to User which I believe is a more appropriate name for the model . The model did not have any timestamps which I think its crucial for a user collection so I added . And ofcourse for handling the authentication I also added password field to the model .

* Favourite: <br/>
there was a typo in the Favourite model name (Favorite changed to Favourite) this model has a profile_id which indicates that its related to specific user . I change profile_id to user and added relation to users collection . There were 3 other properties on the schema (favorite1,favorite2,favorite3) which I think its incorrect . In my opinion a user can have n number of favourites ( unless specified ) and each of them should be a document be easily manageable and extendable . So I removed these 3 properties and just kept the name (which I’m considering it as the name of the favorite item) .

* Simulator: <br/>
like Favourite model I changed profile_id to user with same relationship . There is a dateRecorded property which I think is actually the same as the date the simulator document is created so I removed it . There was another field euros which in my opinion is incorrect , what if user used another currency ? So I changed this field to currency ( ‘USD’ , ‘GDP’ , ‘EUR ‘ ) and I think the price will suffice to indicate the amount of money . There was another field quantity since I didnt know its exact usage (maybe for the amount of the cryptocurrency ) I didnt change it . After checking the seed script file I found out there were some properties missing so I added them to the Model as well ( like cryptoPriceStart  , cryptoPriceCheck , startDate,checkDate , divisia ) .


* ErrorHandler <br/>
I have added a middleware (errorHandler) which will act like as a Post receiver (after the request was handled by controller ) and it will catch all the errors thrown in the controllers and passed by them (using next(error) ) . I have specified an optional syntax to be able to pass the http status code to the error as well which requires to use the custom exceptions located in the exceptions folder .


* controllers <br/>
I have moved the request handling logic into controllers which I think is pretty common and in the controller methods . I dont intend to do the db logic In the controller so I have moved the db logic to the services . This way unit testing controlers would be easier and it would prevent creating a whole mess on each method . 


* services <br/>
to handle db CRUD operations I tried to move the logic into services ( to be clean and easily testable ) . the service directly talks to model and I named them same as the model names . 


* Middlewares <br/>
there are 4 middlewares added to middlewares folder . 
  * Errorhandle : is a post middleware to capture errors thrown in the app and return user friendly http responses . 
  * HttpValidator: is wrapping express-validator and will validate any schema passed to it .

  * JwtTokenAuth:  is the middleware for handling protected route request validation

  * RouteNotFound:  which will return not found if the request path does not match the current routes in the app


* interfaces & types <br/>
I have added both interfaces (interfaces folder ) and types (types folder) for the project . Tried do the job using types but used interfaces anywhere needed . Tried to define types and interfaces for all of definitions and use typescript features as much as possible.



* constants <br/>
I added http codes and responses as constants in the constants folder which I think is a good practice 


* utils <br/>
I have only added one Utility class which is ResponseHandler because I wanted to control the format and structure of outgoing responses . Im sending all responses to the user using this Class . This will give me a clean structure which is the same for all of my responses and I can change it anytime and it will change any response going out from the application

* input vlaidation  <br/>
im using express-validator to handle request validation and im keeping all the schema in the validation schema folder .



* tests <br/>
I only managed to add e2e route tests which is using a real instance of db server (but different database ) and will remove the test db after the tests are done .

<!-- CONTACT -->
## Contact

Faramarz Arsalani - arsalani@outlook.com

Project Link: [https://gitlab.com/fallken/vue-express-url-shortener](https://gitlab.com/fallken/vue-express-url-shortener)
