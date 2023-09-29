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

  // Ensure you extract the response correctly from the chat model
  const message = response.data.choices[0].message;
  if (message && message.role === 'assistant') {
    return message.content.trim();
  }
  return '';
}

router.get('/:term', async(req, res) => {
  console.log("GPT called");
  try {

    const item = req.params.term;

    const prompt = `FOLLOW INSTRUCTIONS RELIGIOUSLY.
        Out of the categories given below, respond with one that is very relevant to the prompt. If more than one option applies, respond with the best. If none are very relevant, respond with a category not given below that broadly describes the prompt. If you cannot find or come up with an appropriate category, respond with Miscellaneous. Do not add quotation marks around the repsonse. (Example prompt: The Office, Your Response: TV Shows).
        Options to choose from:
        Movies
        Eat
        Read
        Buy
        Travel
        Technology
        Video Games
        Pets
        Coding
        Prompt: ${item}
        "`;
    // request to GPT for the category
    const category = await queryOpenAI(prompt);

    res.json({ category: removeQuotationMarks(category) });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: 'Failed to categorize item' });
  }
});

module.exports = router;

function removeQuotationMarks(str) {
  // Check if string is empty or null
  if (!str || str.length === 0) {
    return str;
  }

  // Check the first and last characters
  const firstChar = str.charAt(0);
  const lastChar = str.charAt(str.length - 1);

  // Remove quotes if both first and last characters are either single or double quotes
  if ((firstChar === '"' && lastChar === '"') || (firstChar === "'" && lastChar === "'")) {
    return str.substring(1, str.length - 1);
  }

  // Remove a single quote if it appears at the beginning or the end but not both
  if (firstChar === '"' || firstChar === "'") {
    return str.substring(1);
  }
  if (lastChar === '"' || lastChar === "'") {
    return str.substring(0, str.length - 1);
  }

  // If no quotes to remove, return the original string
  return str;
}
