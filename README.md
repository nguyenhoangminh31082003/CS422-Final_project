# CS422-Final_project

CS422 - Software Analysis and Design - Final project

# Front end

cd large_shelf

npm run dev

http://localhost:5173/

https://www.figma.com/design/nCrflEP4oiyyWoEQUu2bMI/CS422---Final-project---books?node-id=0-1&t=wD6dmcDYYoFmgVyi-0

# Back end

https://github.com/TranLeQuoc/project

https://docs.google.com/document/d/1S_qeJBNLeycAXmFpauPEtQh77vGPaOFHV_rONrXj2WI/edit

python manage.py makemigrations

python manage.py migrate

python manage.py runserver

http://127.0.0.1:8000/admin/

# Back end (Speech)

http://103.82.194.67:8000/docs#/default

id=4JVOFy4SLQs9my0OLhEw
Luca - calm, soothing, steady
A young adult American male with a calm, almost sober, slightly breathy way of talking. Great for voiceovers and narrations of all kinds.

id=j9jfwdrw7BRfcR43Qohk
Frederick Surrey - Professional, calm, well spoken
Professional, calm, well spoken British narrator full of intrigue and wonder. Suitable for Nature, Science, Mystery & History documentaries or audio books & narration projects that need a smooth & velvety tone.

id=ucTq4wzRNSiqJDhpxhUO
Sue - fantastic for all uses
A young female british. A pleasant voice fantastic for all uses

# Authenticate request (log in request)

Request
{
"email": string,
"password": string
}

Response
{
"validity": boolean,
"userID": string,
"message": string
}

"message" would be mainly used for explaining reason why user can not login

# Register request

Request
{
"email": string,
"password": string
}

Response
{
"validity": boolean,
"userID": string,
"message": string
}

"message" would be mainly used for explaining reason why user can not login

# Get shelf list of a user

Request
{
userID: string
}

Response
{
shelves: Array of shelf ID (string)
}

# Get shelf brief information

Request
{
shelfID: string
}

Response
{
"imageCoverLink": string,
"moveRecentBook": string, // Look figma to know format
"LastUpdateDate": string, // Look figma to know format
"numberOfBooks": number
}

# Get book information

Request
{
bookID: string
}

Response
{
bookName: string,
authorName: string,
summary: string
}

# Get review of a user on a book

Request
{
userID: string,
bookID: string
}

Response
{
starRating: number//0 means that user has not rated the book yet and 1, 2, 3, 4, 5 means the rating that user gives
}

# Change password

Request
{
userID: string,
oldPassword: string,
newPassword: string
}

Response
{
success: boolean,
message: string
}

# Get password

Request
{
userID: string
}

Response
{
allowance: boolean,
password: string,
message: string
}

# Get user information

Request
{
userID: string
}

Response
{
profilePictureLink: string,
firstName: string,
lastName: string,
email: string,
phoneNumber: string,
fullName: string,
biography: string
}

# Update user information

Request
{
userID: string,
profilePictureLink: string,
firstName: string,
lastName: string,
email: string,
phoneNumber: string,
fullName: string,
biography: string
}

Response
{
success: boolean,
message: string
}

# Get the number of shelves of the user

Request

{
"userID": string
}

Response
{
"numberOfShelves": string
}

# Get the i-th shelf of the user (sorted by names)

Request

{
"userID": string,
"shelfOrder": number
}

Response {
"shelfID": string
}

# Get the number of books of a shelf of a user

Reqeust
{
"shelfID": string
}

Response {
"numberOfBooks": number
}

# Get the number of audio folders of a user

Request
{
"userID": string
}

Response
{
"numberOfBooks": number
}

# Get the number of audio files in a given audio folder

Request
{
"userID": string
}

Response
{
"numberOfAudioFiles": number
}

# Get list of audio files in a given audio folder

Request
{
"userID": string
}

Response
{
"audioFileList": [{"audioFileID": string}, ...]
}
