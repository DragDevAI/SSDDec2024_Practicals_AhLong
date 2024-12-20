const express = require('express');
const bodyParser = require('body-parser');

//Create an instance of the Express app using express()
const app = express();

//Specify the port on which server will listen for requests
const port = 3000;

//Create an array to store book data
let books = [
    { id: 1, title: 'The Lord of the Rings', author: 'J.R.R. Tolkien' },
    { id: 2, title: 'Pride and Prejudice', author: 'Jane Austen' },
    { id: 3, title: 'Cocaine Cowboys II: Hustlin With the Godmother', author: 'Yénora'},
    { id: 4, title: 'Bluebeard', author: 'Mylène'},
    { id: 5, title: 'Last Circus, The (Balada triste de trompeta) (Sad Trumpet Ballad, A)', author: 'Maëlle'},
    { id: 6, title: 'Lady and the Reaper, The (Dama y la muerte, La)', author: 'Personnalisée'},
    { id: 7, title: 'Prospero Books', author: 'Gisèle'},
    { id: 8, title: 'Man on the Train (Homme du train, L)', author: 'Sélène'},
    { id: 9, title: 'Any Day Now', author: 'Mélys'},
    { id: 10, title: 'Big Hero 6', author: 'Torbjörn'},
    { id: 11, title: 'Chain Camera', author: 'Mahélie'},
    { id: 12, title: 'Panic', author: 'Uò'},
    { id: 13, title: 'Condemned, The', author: 'Annotée'},
    { id: 14, title: 'Semper Fi', author: 'André'},
    { id: 15, title: 'The Beautiful Story', author: 'Cécilia'}
];

 // Parse incoming JSON data in requests
app.use(express.json())
// Configure body-parser to handle URL-encoded form data
app.use(bodyParser.urlencoded({ extended: true })); // Set extended: true for nested objects

// Create the Route for Getting All Books (GET /books)
app.get('/books', (req, res) => {
    res.json(books); // Send the array of books as JSON response
 });

 // Add the Route for Creating a Book (POST /books)
 app.post('/books', (req, res) => {
    const newBook = req.body; // Get the new book data from the request body
    newBook.id = books.length + 1; // Assign a unique ID
    books.push(newBook); // Add the new book to the array
    res.status(201).json(newBook); // Send created book with status code 201
   });

// Route for Getting a Single Book (GET /books/:id)
app.get('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id); // Get book ID from URL parameter
    const book = books.find(book => book.id === bookId);
  
    if (book) {
      res.json(book); // Send the book data if found
    } else {
      res.status(404).send('Book not found'); // Send error for non-existent book
    }
    });
// Route for Updating a Book (PUT /books/:id)
app.put('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id); // Get book ID from URL parameter
    const updatedBook = req.body; // Get updated book data from request body
  
    const bookIndex = books.findIndex(book => book.id === bookId);
  
    if (bookIndex !== -1) {
      updatedBook.id = bookId;
      books[bookIndex] = updatedBook; // Update book data in the array
      res.json(updatedBook); // Send updated book data
    } else {
      res.status(404).send('Book not found'); // Send error for non-existent book
    }
  });

// Route for Deleting a Book (DELETE /books/:id)
app.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id); // Get book ID from URL parameter
  
    const bookIndex = books.findIndex(book => book.id === bookId);
  
    if (bookIndex !== -1) {
      books.splice(bookIndex, 1); // Remove book from the array
      res.status(204).send(); // Send empty response with status code 204 (No Content)
    } else {
      res.status(404).send('Book not found'); // Send error for non-existent book
    }
  });

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
 });