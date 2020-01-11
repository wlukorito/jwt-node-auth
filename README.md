# jwt-node-auth

### Node.js Aunthentication API using JWT & BCRYPT

The code demonstrates creating a `Node.js` API using `Express.js` routes.
In the code, I create a `register user route` for creating users.
Then I create a `login route` which validates user and returns relevant feedback.
In all this, I use `bcrytjs` to encrypt user password for storage in a `MySQL` database.
I then create a `private route` for posts that mimics a `protected route`. Here, requests are validated using `jwt` token that is generated when a user logs in.

### Tags

`jsonwebtoken` `jwt` `jwt authentication` `node.js` `express.js` `private routes` `bcrypt`
