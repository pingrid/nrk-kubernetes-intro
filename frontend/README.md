# Frontend application

This is the frontend of our CV application. 

**About the frontend**
 
In addition of [react](https://facebook.github.io/react/). For development and building steps we are using [Create React App](https://github.com/facebook/create-react-app). For production we use a [node](https://nodejs.org/en/) server with http-proxy to connect with our backend. The application is served through an express server in the cloud. 

## Run the application 

**In the cloud**

When deploying our application to the cloud, we need to know the address of our backend application. 
This can be found through environment variables. 


**Locally** 

If you want to run the code local you need to start the backend first. 
To start the backend, follow the instructions [here](./../backend/README.md). 

After you have followed the instructions, open the terminal and navigate to this folder, i.e., `cd /frontend`.

Install all packages from npm: 

```
npm i 
```

Run the application: 

```
npm run dev
```
Open your browser and enter the url `localhost:8081`.

## Allow data from api

Because of no-cors, [add this extension to chrome](https://mybrowseraddon.com/access-control-allow-origin.html?v=0.1.3&type=install). 

## Debugging

If you want to debug the state of your application, you can install [Redux DevTools for Chrome](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en).

