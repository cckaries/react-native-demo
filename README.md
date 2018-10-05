## Android
### Google Maps API Configuration
1.	In **android/** Create **keys.gradle**, add the following lines:
 
	```gradle
	project.ext.mapsApiKeyDev = "MAPS_API_KEY_DEV"
	project.ext.mapsApiKeyProd = "MAPS_API_KEY_PROD"
	```

2.	Replace `MAPS_API_KEY_DEV` and `MAPS_API_KEY_PROD` with your own Google Maps API key for development and production, respectively. Both keys can be the same.

	Please refer to [Google Maps Platform website] (<https://developers.google.com/maps/documentation/javascript/get-api-key>) to get your own API key
	
## Firebase
### API Key for User Log in / Sign up
1. An API key is required for user authorization. In **/**, create **keys.js**, and and the following lines:


	```javascript
	export const AUTH_API_KEY = 'YOUR_API_KEY';
	```
	
2. Replace `YOUR_API_KEY ` with your own Firebase API key.	

### Project ID for Deployment
1. A project ID is required for firebase deployment. In **functions/**, create **keys.js**, and and the following lines:


	```javascript
	const firebaseProjectId = "YOUR_PROJECT_ID";
	exports.firebaseProjectId = firebaseProjectId;
	```
	
2. Replace `YOUR_PROJECT_ID` with your own Firebase project ID.