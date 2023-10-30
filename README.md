REST API functionality: reading data from server (using GET method), sending data to server (using POST method), updating existing data from server (using PUT method) 
and deleting existing data from server (using DELETE method). The app gets an array of items or an item from the array by its id, then modifies the item's name based on its id and 
deletes the item based on its id as well.
All status codes are handled: different messages are displayed based on the events, e.g. codes 200 and 201 have messages such as "Item added" (for GET method) or "Item modified" (for PUT method),
404 has the message "Item not found", and 400 is followed by "Missing new data".
