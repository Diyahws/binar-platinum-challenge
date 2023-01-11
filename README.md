# platinum-challenge-gold
1. after you git clone or download our repository make sure to NPM INSTALL first to generate all of the packages

* ENVIRONMENT
- Development Environment
1. Sequelize db:create
2. sequelize db:migrate
3. sequelize db:seed:all

-Test Environment
1. Sequelize db:create --env test
2. sequelize db:migrate --env test
3. sequelize db:seed:all --env test

-Production Environment
- create new connection in dbeaver
- host: db-platinum.cdnypr5aefim.ap-southeast-1.rds.amazonaws.com
- port: 5432
- database: postgres
- username: dbchplatinum_1
- password: see on config/config.json

- after the step above, do this:
1. Sequelize db:create --env production
2. sequelize db:migrate --env production
3. sequelize db:seed:all --env production

- Account that on seed:
  {
      name: 'dava',
      email: 'erandadava@gmail.com',
      password:superadmin123,
      roles:'superadmin',
      createdAt: new Date(),
      updatedAt: new Date()
  },
  {
    name: 'rama',
    email: 'amanullahr545@gmail.com',
    password:admin123,
    roles:'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'diyah',
    email: 'diyahwulans@gmail.com',
    password:user123,
    roles:'user',
    createdAt: new Date(),
    updatedAt: new Date()
  }

# Swagger Documentation

* AUTH DOCUMENTATION
1. open https://challengeapp.herokuapp.com/api/v0/documentation/
2. Register your account
3. login with your account
4. Copy Access token
5. Click Authorize, and paste the access token in the field
6. click authorize

* PRODUCT DOCUMENTATIONS
- Get All product data
1. Click Find All Product
2. Click try it out
3. execute

- if you want to add a new product, upload image first in Upload Image Product
1. Click Upload Image Product
2. Click try it out
3. upload your file
4. execute
5. copy the URL for your image

- Add new product
1. Click add new product
2. Click try it out
3. replace bingle.com with the url for your image
4. execute 

- Update existing product of yours
1. Click update a product
2. input id of your product (see your product id on Get All Product data documentation)
3. change anything in your field
4. execute

- Delete existing product of yours
1. Click Delete a Product
2. input id of your product (see your product id on Get All Product data documentation)
3. execute

* EMAIL DOCUMENTATION
this email function only works for an email blast for account that has been registered

1. Click Send Email
2. Click try it out
3. execute

# CHAT FEATURES DOCUMENTATION
*Socket Request id 1
1. Add new in Postman
2. Choose websocket request
3. Change "Raw" -> "Socket.IO"
4. input "challengeapp.herokuapp.com" in URL field
5. input "Chat message" in Event Name
6. Example message: {"id":2,"message":"Apakah Barang Ada?"}

*Socket Request id 2
1. Add new in Postman
2. Choose websocket request
3. Change "Raw" -> "Socket.IO"
4. input "challengeapp.herokuapp.com" in URL field
5. input "Chat message" in Event Name
6. Example message: {"id":1,"message":"Barang Habis?"}

in All Socket Request
- Click Connect first
- and Click send message to each others