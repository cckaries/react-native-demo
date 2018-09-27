## Android
### Google Maps API Configuration
1.	Create `android/keys.gradle`, add the following lines:
 
	`project.ext.mapsApiKeyDev = "MAPS_API_KEY_DEV"`
	`project.ext.mapsApiKeyProd = "MAPS_API_KEY_PROD"`

2.	Replace `MAPS_API_KEY_DEV` and `MAPS_API_KEY_PROD` with your own Google Maps API key for development and production, respectively. Both keys can be the same.

	Please refer to [Google Maps Platform website] (<https://developers.google.com/maps/documentation/javascript/get-api-key>) to get your own API key