# angular-material-firebase

Example using the following libraries:
* Angular
* angular-material
* angularfire2

## Installation

Ensure you have Node and NPM installed using the instructions at:

[https://nodejs.org/download/](https://nodejs.org/download/)

Install the project dependancies using:

    npm install

Create a file at /src/app/config.ts containing your settings:

    export const firebaseConfig = {
        apiKey: 'ABC123',
        authDomain: 'yourapp.firebaseapp.com',
        databaseURL: 'https://yourapp.firebaseio.com',
        storageBucket: 'yourapp.appspot.com',
        messagingSenderId: '01234'
    };

## Usage

Run the local server using the command:

    npm start

Then view the site at:

    http://localhost:4200/


## Deployment

Use the deploy command to build and deploy your application to firebase hosting:

    npm run deploy

If you haven't already, you can setup firebase using:

    firebase login
    firebase init


## Directory structure

    src/                       --> Frontend sources files


## Contact

For more information please contact kmturley
