[![Next CI](https://github.com/miraajkadam/Movies-DB/actions/workflows/Next-CI.yml/badge.svg)](https://github.com/miraajkadam/Movies-DB/actions/workflows/Next-CI.yml)
# Movies-DB
Mock movie database with add/update/delete/read (CRUD) functionality.

## Built With
* [Next.js](https://nextjs.org/)
* [Chakra-UI](https://chakra-ui.com/)
* [Firebase](https://firebase.google.com/) for online Database
* [JSON Server](https://github.com/typicode/json-server) for local DB
* Written in [Typescript](https://www.typescriptlang.org/)

## Getting Started
* **Step 1:** Clone this repository.
* **Step 2:** Change your directory to the clone.
```bash
cd <folder_name>
```
* **Step 3:** Install all dependencies
```bash
yarn
```
* **Step 4:** Setup Firebase with your credentials and add it to the environment variables.
```bash
touch .env.local

echo NEXT_PUBLIC_FIREBASE_URL=[your-firebase-endpoint] >> .env.local
echo NEXT_PUBLIC_API_BASE=/api/movies >> .env.local
```
* **Step 5:** Run the dev server locally.
```bash
yarn dev 
```
## Available Scripts
In the project directory, you can run:
##### `yarn dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

##### `yarn run build`

Builds and optimizes the application for production usage.\
It correctly bundles React with Next in production mode and optimizes the build for the best performance.

##### `yarn start`

Runs the app in  Next.js production server.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

##### `yarn run lint`

Sets up Next.js' built-in ESLint configuration

## License
Distributed under the GPL-2.0 License. See `LICENSE.txt` for more information
