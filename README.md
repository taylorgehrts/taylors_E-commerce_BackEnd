# Taylor's E-Commerce Backend [![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Walkthrough](#walkthrough)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Description
This is the working backend for a E-commerce site that allows the user to see, add, update and delete categories, products and tags all from inside insomnia or Postman

### TECHNOLOGIES USED: 
- Node.js
- dotenv
- Express
- Sequelize
- mysql2
- git
- Insomnia

## Installation
Clone the repo, then install dependencies with npm install, then you will need to use your mysql terminal to create a database, once that is done seed the database by running node to the path of the index.js file inside of the seeds folder.

## Usage
you can run npm start to start the server and then use insomnia or postman to test the endpoints.
### End Points to test:
#### Categories
- For get all request and for post requests
http://localhost:3001/api/categories
- for get one, put and delete requests
http://localhost:3001/api/categories/3
#### Products
- For get all request and for post requests
http://localhost:3001/api/products/
- for get one, put and delete requests
http://localhost:3001/api/products/3
#### Tags
- For get all request and for post requests
http://localhost:3001/api/tags/
- for get one, put and delete requests
http://localhost:3001/api/tags/2


## Walkthrough

### Link to walkthrough video
https://drive.google.com/file/d/1m49OrPboSZrcF9IKvL5SUeid4pnSeILx/view

## License
This project is licensed under the ISC license. Click [License](https://opensource.org/licenses/ISC) for more information.

## Contributing
- Taylor Gehrts finished the code 
- Xandromus -provided starter code found here -> https://github.com/coding-boot-camp/fantastic-umbrella

## Tests
There are currently no test for this project

## Questions
If you have any questions, you can reach out to me via GitHub or E-mail:

- GitHub: [taylorgehrts](https://github.com/taylorgehrts)
- Email: [taylorgehrts@gmail.com](mailto:taylorgehrts@gmail.com)

