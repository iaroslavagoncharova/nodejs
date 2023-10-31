## REST API functionality: 
* reading data from server (using GET method)
* sending data to server (using POST method)
* updating existing data from server (using PUT method)
* deleting existing data from server (using DELETE method)
---
The app retrieves an array of items (GET /items) or a specific item from the array by its ID (GET /items/:id), can add new items (POST /items/:id, name needs to be sent inside the request body, and the ID is generated automatically using Math.random), modify the item's name based on its ID (PUT /items/:id) and delete the item based on its ID as well (DELETE /items/:id). 

