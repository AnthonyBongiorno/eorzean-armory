# How to use the api

# Sign Up [POST]

Use this endpoint to register a new user.

**Method:** POST  
**Route:** /signup  
**Content-Type:** application/json

## Request Body
```json

{ 
"email": "user@example.com", 
"password": "password123", 
"username": "JohnDoe" 
}

```

## Response 201 (Created)

Successful user registration response.

**Content-Type:** application/json

```json

{ "message": "User registered successfully" }

```


## Response 400 (Bad Request)

User already exists with the provided email.

**Content-Type:** application/json
```json
 { "error": "User already exists" }
```

## Response 500 (Internal Server Error)

Server error occurred.

**Content-Type:** application/json
```json

 { "error": "Server error" }

```

# Sign In

## Endpoint

`POST /signin`

## Description

Signs in a user with the provided email and password.

## Request Body

| Field    | Type   | Description           |
|----------|--------|-----------------------|
| email    | string | User's email address  |
| password | string | User's password       |

## Response

The response will be a JSON object containing the user's data, excluding the password and email fields.

### Example response:

```json  
{ "username": "example_user", 
"characters": 
    [ 
        { 
        "characterId": 3243254334564526, 
        "characterName": "Example name", 
        "serverName": "Excalibur", 
        "avatar": "examplepng" 
        } 
    ] 
}

```

If the provided email or password is invalid, the response will include an error message:

```json 
{ "error": "Invalid email or password" } 
```


If there is a server error, the response will include an error message:

```json 
{ "error": "Server error" }
```
## Endpoint

The function is mapped to the endpoint: **GET** "/character/:id"

Here `:id` is a dynamic parameter indicating the unique identifier _id of a user in MongoDB. The placeholder `:id` in the URI will be replaced by the actual user id when a GET request is made.

## Response Example

The function queries a MongoDB database for a user by its unique identifier, then fetches and returns the user's character information. Here is an example of the actual response provided when calling the endpoint with a valid id:

```json 
[ 
    { 
        "characterId": 25303973, 
        "characterName": "Draco Skyiron", 
        "serverName": "Excalibur", 
        "avatar": "https://img2.finalfantasyxiv.com/f/5502c524ef2d98d2cfadf71705b76235_745baffc465480ed372e274d50318290fc0_96x96.jpg?1688880288" 
    } 
] 
```


If a user with the provided id does not exist in the database, the function returns a 404 error with the following response:

``` json 
{ "error": "User not found" } 
```


If there is an unexpected server error, it would result in the following response:

``` json 
{ "error": "Server error" } 
```
# Attach a character
## Endpoint

`POST /character`

Request Body
The request body should be a JSON object with the following properties:

- characterName: The name of the character to be attached.
- serverName: The name of the server on which the character resides.
- userId: The ID of the user to whom the character will be attached.
- Example:

```json
{
  "characterName": "Example Character",
  "serverName": "Example Server",
  "userId": "123456789"
}
```
Response
If the character is successfully attached to the user, the endpoint will return a JSON response with a status code of 200.
Example:

```json
{
  "message": "Character attached successfully"
}
```
If the character is already claimed by another user, the endpoint will return a JSON response with a status code of 400 and an error message indicating that the character is already claimed.
Example:

```json
{
  "error": "Character is already claimed"
}
 ```

If the character is not found in the XIVAPI database, the endpoint will return a JSON response with a status code of 404 and an error message indicating that the character was not found.
Example:

```json
{
  "error": "Character not found"
}
```
If there is a server error during the process, the endpoint will return a JSON response with a status code of 500 and an error message indicating a server error.
Example:

```json
{
  "error": "Server error"
} 
```

# Verify Character
## Endpoint

`GET /characters/verify`

Query Parameters

The endpoint expects the following query parameters:

- firstName: The first name of the character.
- lastName: The last name of the character.
- serverName: The name of the server on which the character resides.

Example:

`GET /characters/verify?firstName=John&lastName=Doe&serverName=ExampleServer`
Response
If the character is found, the endpoint will return a JSON response with a status code of 200.

Example:

```json
{
  "name": "John Doe",
  "server": "ExampleServer",
  "lodestoneId": "123456789",
  "avatar": "https://example.com/avatar.png",
  "isClaimed": false
}
```
The response includes the following properties:

- name: The full name of the character.

- server: The name of the server on which the character resides.

- lodestoneId: The ID of the character on the Lodestone.

- avatar: The URL of the character's avatar image.

- isClaimed: A boolean value indicating if the character is already claimed.

If the character is not found, the endpoint will return a JSON response with a status code of 404 and an error message indicating that the character was not found.

Example:

```json
{
  "error": "Character not found"
}
```
If there is a server error during the process, the endpoint will return a JSON response with a status code of 500 and an error message indicating a server error.
Example:

```json
{
  "error": "Server error"
}
```

# Search Items
## Endpoint

`GET /items`

Query Parameters

The endpoint expects the following query parameters:

minLevelItem: The minimum level requirement of the items.
maxLevelItem: The maximum level requirement of the items.
itemUICategoryId: The ID of the item UI category.

Example:


`GET /items?minLevelItem=30&maxLevelItem=50&itemUICategoryId=5`

Response
The endpoint will return a JSON response with a status code of 200, containing the search results.

Pagination
The response includes the following pagination information:

Page: The current page number.
PageNext: The number of the next page, if available. (null if no next page)
PagePrev: The number of the previous page, if available. (null if no previous page)
PageTotal: The total number of pages.
Results: The total number of results in the current page.
ResultsPerPage: The number of results per page.
ResultsTotal: The total number of results across all pages.
Results
The response includes an array of items that match the search criteria. Each item object contains the following properties:

- ID: The ID of the item.
- Icon: The URL of the item's icon image.
- Name: The name of the item.
- Url: The URL of the item's details page.
- UrlType: The type of URL (e.g., "Item").
- _: The type of the search result (e.g., "item").
- _Score: The relevance score of the item (null if not applicable).
Example:

``` json

{
  "Pagination": {
    "Page": 1,
    "PageNext": null,
    "PagePrev": null,
    "PageTotal": 1,
    "Results": 45,
    "ResultsPerPage": 100,
    "ResultsTotal": 45
  },
  "Results": [
    {
      "ID": 35194,
      "Icon": "/i/049000/049411.png",
      "Name": "Augmented Radiant's Sabatons of Fending",
      "Url": "/Item/35194",
      "UrlType": "Item",
      "_": "item",
      "_Score": null
    },
    // More items
  ]
}
```

# `POST /items/post/:userId/`

This endpoint is used to add gear to a user's inventory. 

## URL Parameters

- `userId` - The ID of the user to whom the gear will be added. This parameter is required.

## Body Parameters

The body of the request should be a JSON object with the following properties:

- `id` - The ID of the gear to add. This parameter is required.
- `icon` - The icon URL of the gear to add. This parameter is required.
- `name` - The name of the gear to add. This parameter is required.

## Post gear

POST /items/post/EX:5fcd647a5e922800177b7c85
Content-Type: application/json
```json

{
"id": "10",
"icon": "/i/052000/052601.png",
"name": "Weathered Shortbow"
}
```

## Responses


200 OK
Content-Type: application/json
```json
{
"message": "Gear added to user successfully"
}
```

## Error Handling

- If the user with the specified `userId` cannot be found, a status code of 404 is returned, along with a JSON object with an `error` property of `'User not found'`.
- If a server error occurs, a status code of 500 is returned, along with a JSON object with an `error` property of `'Server error'`.

# DELETE /characters/delete

This endpoint is responsible for deleting a character from a user's account.

## Request

| Name           | Type   | In     | Description                                 |
|----------------|--------|--------|---------------------------------------------|
| `characterName`| String | Body   | The name of the character to be deleted     |
| `userId`       | String | Body   | The ID of the user from whom to delete the character |

```json
{
  "characterName": "CharacterName",
  "userId": "UserID"
}
```
Response
Success
Status Code: 200 OK

Name	Type	Description
message	String	Confirmation that the character was successfully detached
```json
{
  "message": "Character detached successfully"
}
```
Failure
When the operation fails to delete the character:

Status Code: 400 Bad Request

```json
{
  "error": "Failed to detach character"
}
```

When there is a server error:

Status Code: 500 Internal Server Error

```json
{
  "error": "Server error"
}
```

Notes
This endpoint performs two database operations:

Removes the character from the user's character array in the 'users' collection.
Deletes the character name from the 'claimedID' collection.

Please replace `"CharacterName"` and `"UserID"` with the appropriate value

Delete Gear Item
Deletes a specified gear item from a user's gear array.

## ENDPOINT

### /items/delete

Method:

### DELETE

```json
{
  "gearId": "<ID_OF_GEAR_ITEM_TO_DELETE>",
  "userId": "<ID_OF_USER_TO_DELETE_GEAR_FROM>"
}
``````
Success Response:

Code: 200
Content:
```json
{
  "message": "Gear deleted successfully"
}
```
Error Responses:

Code: 400
Content:

```json
{
  "error": "Failed to delete gear"
}
```
Code: 500
Content:

```json
{
  "error": "Server error"
}
```
Sample Call:

```javascript
fetch('/api/gear', {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    gearId: '37932',
    userId: '8c585bc9-b5e0-4902-bd96-cbceda341f43',
  }),
});
```