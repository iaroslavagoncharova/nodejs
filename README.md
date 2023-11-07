## REST API (using Express and Pug)
The REST API includes functionality for:
- Reading data from the server (using the GET method)
- Sending data to the server (using the POST method)
- Updating existing data on the server (using the PUT method)
- Deleting existing data from the server (using the DELETE method)
It uses Express framework for implementing API functionality and Pug template engine for an HTML landing page.

### JSON Data Retrieval
The application provides access to data in JSON format, including media objects and user profiles:
- Fetch all media objects: `GET /api/media`
- Fetch all user profiles: `GET /api/user`
- Retrieve a specific media object by ID: `GET /api/media/:id`
- Retrieve a specific user profile by ID: `GET /api/user/:id`

### Adding New Data
- Add a new media object: `POST /api/media`
- Add a new user profile: `POST /api/user`
- The POST request should include all necessary information about the item/user, except for an ID, which is automatically generated using `Math.random()`

### Modifying Data
- Modify an item's title and description based on its ID: `PUT /api/media/:id`
- Modify a user's password and email based on their ID: `PUT /api/user/:id`

### Deleting Data
- Delete an item/user based on ID using the DELETE method:
  - Delete a media object: `DELETE /api/media/:id`
  - Delete a user profile: `DELETE /api/user/:id`

### Response Status Codes
Every response status code is appropriately handled and displayed

### Media Files
Mock media files, such as images, are available and can be served anywhere within the API. One of them is displayed on the home page

