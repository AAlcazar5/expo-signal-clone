## Expo Signal Clone

Signal clone built using Expo; has the ability to authenticate the user using Firebase, and message other users who are signed up to the app. 

To get started:

1. npm i --legacy-peer-deps (or yarn add --legacy-peer-deps)
2. Create Firebase web, android, and iOS apps
3. Create a .env file in your expo project and add the following variables:
<ul> 
    <li> FIREBASE_API_KEY</li>
    <li> FIREBASE_AUTH_DOMAIN</li>
    <li> FIREBASE_PROJECT_ID</li>
    <li> FIREBASE_STORAGE_BUCKET</li>
    <li> FIREBASE_MESSAGING_SENDER_ID</li>
    <li> FIREBASE_APP_ID</li>
    <li> IOS_CLIENT_ID</li>
    <li> ANDROID_CLIENT_ID*</li>
</ul>

4. npm run start

*note: in order to properly obtain the ANDROID_CLIENT_ID, you must run (expo build:android) then (expo fetch:android:hashes) in your expo app, and fetch the SHA-1 SHA-256 hashes to input into your firebase android app config.

![IMG_0721](https://user-images.githubusercontent.com/25801107/198164562-e81a6e5f-53b5-42ee-8613-8f451f6758ae.PNG)
