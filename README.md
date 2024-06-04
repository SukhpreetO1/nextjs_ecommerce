<!------------------------------------------------------------------------------------------------------------------------------------- -->
To create a next js, run this command 
    npx create-next-app@latest

To change the port number, just the following script in the package.json file 
    "scripts": {
    "start": "[ -e .env ] && set -a && . ./.env; next start",
    },

To run the project, run this command 
    npm run dev <!-- locally -->
    npm run build <!-- to make the build -->
    npm start  <!-- to deploy it online -->

To connect the next js with firebase  : 
    npm install firebase

    to check the firebase version
        firebase --version
    If you have the Firebase CLI installed, but it's not v12.5.4 or higher, update it
        npm update -g firebase-tools
    If you don't have the Firebase CLI installed, install it:
        npm install -g firebase-tools

To read the env file, fotenv package is used 
    npm install dotenv

To add the notification, 
    npm install react-toastify

To use the font awesome,
    npm i --save @fortawesome/fontawesome-svg-core
    npm i --save @fortawesome/free-regular-svg-icons
    npm i --save @fortawesome/react-fontawesome
    npm i --save @fortawesome/react-fontawesome@latest

    npm install @fortawesome/free-solid-svg-icons


To store data in cookies
    npm install js-cookie

To do password hashing
    npm install bcryptjs

In order to stop calling routes 2 times when add "use client", then change the nextConfig in the next.config.mjs file
    const nextConfig = {
        reactStrictMode: false
    };

To read the data from token, 
    npm install jsonwebtoken

To 
    npm install axios

To send the mail 
    npm install nodemailer
    
To connect the front end with database
    npm install mongoose
    npm install aws4


To Kill the terminal in windows 
    netstat -ano | findstr :3000

    taskkill /PID <PID> /F

To add the checklist of the password
    npm install react-password-checklist