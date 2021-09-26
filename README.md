# Nextjs Firebase Mongodb - Printhouse

Online print house concept created with [**Next.js**](https://nextjs.org/), [**Firebase**](https://firebase.google.com/) and [**MongoDB**](https://www.mongodb.com/).

:rocket: [**Live Demo**](https://nextjs-firebase-mongodb-printhouse.vercel.app/)

## Features

### Auth
* signup/login/logout
* delete/update account
* password reset
* update claims

### Shop
* add/remove products from the basket + persist store to session storage
* create/update/delete orders
* upload/delete product files
* calculate the most optimal shipping container
* card payment for orders

### More
* two languages - english, polish (translated with url paths)
* caching fetched data
* styled components
* notification popups
* form validations
* pagination
* rate limits

## Setup
1. Install project locally using npm `$ npm install`.
2. Create [**Firebase**](https://firebase.google.com/), [**MongoDB**](https://www.mongodb.com/), [**Stripe**](https://stripe.com/) accounts and
connect them to your project by creating __.env__ file and setting up required enviromental variables:

__App__
* `NEXT_PUBLIC_APP_URL` - App url, for development use `http://localhost:3000`

__Mongo db__
* `MONGODB_URI` - Mongo db connection string with username and password
* `MONGODB_NAME` - Database name

__Firebase client__
* `NEXT_PUBLIC_FIREBASE_API_KEY`
* `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
* `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
* `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
* `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
* `NEXT_PUBLIC_FIREBASE_APP_ID`

__Firebase admin__
* `FIREBASE_CLIENT_EMAIL`
* `FIREBASE_PRIVATE_KEY`
* `FIREBASE_DB_URL`

__Stripe__
* `NEXT_PUBLIC_STRIPE`
* `STRIPE_SECRET`
* `WEBHOOK_SECRET` Stripe webhook secret to validate webook attempts.

___
4. Setp up firebase rules.
* __Firestore database__:
```
rules_version = "2"
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
    allow read, write: if isLoggedIn() && isContentOwner(uid);
    }
  }
  function isLoggedIn() {
  	return request.auth != null
  }
  function isContentOwner(uid) {
    return request.auth.uid == uid
  }
}
```
* __Firebase storage__:
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /userFiles/{uid}/{orderId}/{file} {
      allow read: if isLoggedIn() && isContentOwner(uid);
    }
  }
}
function isLoggedIn() {
  return request.auth != null
}
function isContentOwner(uid) {
  return request.auth.uid == uid
}
```

3. Create in database following collections: `products`, `productCategories`, `productPrices` and `shippings` by uncommenting the code in __pages/index.js__ file: 
```
// import productsColl from "@/mongodb/collections/products";
// import productCategoriesColl from "@/mongodb/collections/productCategories";
// import productPricesColl from "@/mongodb/collections/productPrices";
// import shippingsColl from "@/mongodb/collections/shippings";
```
and
```
// try {
//   await db.collection("products").insert(productsColl);
//   await db.collection("productCategories").insert(productCategoriesColl);
//   await db.collection("productPrices").insert(productPricesColl);
//   await db.collection("shippings").insert(shippingsColl);
// } catch (err) {
//   console.log(err, "error creating collections");
// }
```

After saving the changes and refreshing the page, collections should be successfully created in your mongodb. You can delete commented code above and the entire folder `mongodb/collections`.

5. Start project using `npm run dev`.

6. Set up stripe webhooks.
* __Locally__: To listen stripe webhhook events locally you need to install [**Stripe CLI**](https://github.com/stripe/stripe-cli/releases/tag/v1.7.3) on your computer and run unzipped `.exe` file
from your terminal, then use `stripe login` command to login your stripe account and `stripe listen --forward-to localhost:3000/api/payment` to listen webhhok events.
* __Production__: Add webhook endpoint in your stripe account (developer tab) and listen for `payment_intent.succeeded` event.

## Note
* all users have ability to add **admin** claims to thier accounts.
* admin can update/delete and __view other users orders__ (so dont use your private informations and files in this project).
* admin cannot __download__ other users order files, only thier __owners__ can (in order details).
* all products informations and prices are random.
* create order __limit__ 5/15 min.

## Payment for orders (Stripe)
To make successful payment use stripe test card number: __4242424242424242__. Other fields can be filled with random numbers.

## Dependencies
`@fortawesome/fontawesome-svg-core`,
`@fortawesome/free-solid-svg-icons`,
`@fortawesome/react-fontawesome`,
`@stripe/stripe-js`,
`babel-plugin-styled-components`,
`bcryptjs`,
`binpackingjs`,
`body-scroll-lock`,
`connect-mongo`,
`dotenv`,
`express-rate-limit`,
`file-type`,
`filepond`,
`filepond-plugin-file-validate-size`,
`filepond-plugin-file-validate-type`,
`final-form`,
`firebase`,
`firebase-admin`,
`js-cookie`,
`micro`,
`mongodb`,
`mongodb-core`,
`next`,
`next-connect`,
`next-redux-wrapper`,
`next-translate`,
`nprogress`,
`react`,
`react-dom`,
`react-filepond`,
`react-final-form`,
`react-redux`,
`react-toastify`,
`redux`,
`redux-devtools-extension`,
`redux-persist`,
`redux-thunk`,
`redux-wrapper`,
`stripe`,
`styled-components`,
`styled-reset`,
`swr`
