# Express best practices and Apidoc documentation
- This Express application's security has been enhanced by implementing password hashing and using Express best security practices. The documentation was generated using Apidoc.
- Password hashing is implemented using bcrypt. After generating a salt, hashing the password, and securely storing it in the database, the provided password is compared with the hashed password in the database when a user attempts to log in. 
- For security, Helmet (set security headers such as Content-Security-Policy and Strict-Transport-Security) and cookie-session (stores session data in cookies) middlewares and reduced fingerprinting (disabling the X-Powered-By header) have been implemented 
- API documentation provides information about all routes and examples of successful and failed requests. Information about headers, request bodies, response status codes, and response bodies is included. The documentation is served statically through the /docs route
