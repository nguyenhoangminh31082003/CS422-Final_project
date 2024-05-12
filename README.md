# CS422-Final_project

CS422 - Software Analysis and Design - Final project

cd large_shelf

npm run dev

python manage.py makemigrations

python manage.py migrate

python manage.py runserver

http://127.0.0.1:8000/admin/

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
