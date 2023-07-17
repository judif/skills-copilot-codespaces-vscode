// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const { default: axios } = require('axios');

// Create web server
const app = express();
app.use(bodyParser.json());

// Create an object to store the comments
const commentsByPostId = {};

// Create a route to handle a GET request
app.get('/posts/:id/comments', (req, res) => {
  // send back the comments for the post id
  res.send(commentsByPostId[req.params.id] || []);
});

// Create a route to handle a POST request
app.post('/posts/:id/comments', async (req, res) => {
  // Generate a random id for the comment
  const commentId = randomBytes(4).toString('hex');
  // Get the content from the body
  const { content } = req.body;
  // Get the comments for the post id
  const comments = commentsByPostId[req.params.id] || [];
  // Add the new comment to the comments array
  comments.push({ id: commentId, content, status: 'pending' });
  // Update the comments for the post id
  commentsByPostId[req.params.id] = comments;
  // Send