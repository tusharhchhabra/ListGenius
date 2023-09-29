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
  try {

    const item = req.params.term;
    console.log("gpt called", item)

    const prompt = `FOLLOW INSTRUCTIONS RELIGIOUSLY.
        Out of the categories given below, respond with one that is very relevant to the prompt. If more than one option applies, respond with the best. If none are very relevant, respond with a new suggested category that broadly describes the prompt. If you cannot find or come up with an appropriate category, respond with ''. (Example prompt: 'The Office', Your Response: 'TV Shows').
        Options to choose from:
        Movies
        Eat
        Read
        Buy
        Prompt: ${item}
        "`;
    // request to GPT for the category
    const category = await queryOpenAI(prompt);
    console.log(category)

    res.json({ category });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: 'Failed to categorize item' });
  }
});

module.exports = router;

