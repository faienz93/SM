# Mobile Systems 
## Master Degree in Computer Science <br> University of Bologna - Alma Mater Studiorum <br> A.A. 2018/2019
Antonio Faienza | 
------------ | 
0000798822 | 
antonio.faienza@studio.unibo.it | 

## Requirements
* [Node.js](https://nodejs.org/en/)
* [Express.js](http://expressjs.com/)
* [Bootstrap](https://getbootstrap.com/)
* [OpenLayers](https://openlayers.org/download/)
* [MongoDB](https://www.mongodb.com/download-center/community)
* (Eventually install [MongoDB Compass](https://www.mongodb.com/download-center/compass))

**NOTE:** Create the directory where Mongo will store data, called “db” directory. You can create the directory in the default location by running [tutorial](https://treehouse.github.io/installation-guides/mac/mongo-mac.html): 
- `sudo mkdir -p /data/db`
- ```sudo chown -R `id -un` /data/db```


## How to Install
* Clone project 

`git clone https://github.com/antoniofaienza93/SM.git`

`cd SM`

* Install npm 

`npm install`

* Create a custom file `.env` inside the root of the 
project in this way: 
```
# Database Name
DATABASE=mongodb://localhost:27017/DATABASE-NAME
```
* Run the Database
`mongod` 
## How to Run
To start the server: 
* `npm run start`

### Development Mode
To start the server in development mode: 
* `npm run watch`

### Debug Mode
To start the server in debug mode: 
* `npm run debug`

# Possible Error: 
* `self signed certificate in certificate chain`
**SOLUTION**
* `npm set strict-ssl false`
##### [REF](https://stackoverflow.com/a/34945326)




