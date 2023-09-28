const express = require('express');
const router = express.Router();
const axios = require('axios');

const OPENAI_API_ENDPOINT = 'https://api.openai.com/v1/chat/completions';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

async function queryOpenAI(promptContent) {
  const response = await axios.post(OPENAI_API_ENDPOINT, {
    model: 'gpt-3.5-turbo',
    messages: [{
      role: 'user',
      content: promptContent
    }],
    temperature: 0.7
  }, {
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    }
  });
  console.log("Prompt 1:", promptContent);

  // Ensure you extract the response correctly from the chat model
  const message = response.data.choices[0].message;
  if (message && message.role === 'assistant') {
    return message.content.trim();
  }
  return '';
}

router.post('/', async(req, res) => {
  try {

    const item = req.body.userInput;
    const prompt = `FOLLOW INSTRUCTIONS RELIGIOUSLY.
        Respond with the category ID, name, and user input in a JSON object exactly like this '{"category": "Movies", "userInput": "Saw"}' If more than one option applies, respond with the best. If none apply, respond null. If a category is not in the list, respond with a suggested category that best describes the prompt. (Prompt: The Office / Response:'{"category": "TV Shows", "userInput": "The Office").
        Options to choose from:
        Movies
        Eat
        Read
        Buy
        Prompt: ${item}
        "`;
    // request to GPT for the category
    const category = await queryOpenAI(prompt);

    res.json({ category });

  } catch (error) {
    res.status(500).json({ error: 'Failed to categorize item' });
  }
});

module.exports = router;

