## Authorization, authentication, and validation
This app has all of the following:
- Authentication using JWT (generating token and using it for requests as PUT and DELETE)
- Authorization on protected routes (PUT and DELETE), preventing users from updating and deleting others' data
- Implementation of user roles (administrator and regular user), granting administrators permission to update and delete all media items and users
- Validation and error-handling middleware using express-validator
- mysql2 for retrieving data from the database

