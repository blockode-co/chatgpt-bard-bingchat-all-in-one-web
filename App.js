import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [userInput, setUserInput] = useState('');
  const [openaiResponse, setOpenaiResponse] = useState('');
  const [bardResponse, setBardResponse] = useState('');
  const [bingChatResponse, setBingChatResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Call OpenAI GPT API
    const openaiResponse = await axios.post(
      'https://api.openai.com/v1/engines/davinci-codex/completions',
      {
        prompt: userInput,
        max_tokens: 50,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer YOUR_OPENAI_API_KEY',
        },
      }
    );
    setOpenaiResponse(openaiResponse.data.choices[0].text);

    // Call BARD API
    const bardResponse = await axios.post(
      'https://api.openai.com/v1/engines/bard-codex/completions',
      {
        prompt: userInput,
        max_tokens: 50,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer YOUR_BARD_API_KEY',
        },
      }
    );
    setBardResponse(bardResponse.data.choices[0].text);

    // Call Bing Chat API
    const bingChatResponse = await axios.post(
      'https://YOUR_BING_CHAT_API_ENDPOINT',
      {
        question: userInput,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': 'YOUR_BING_CHAT_API_KEY',
        },
      }
    );
    setBingChatResponse(bingChatResponse.data.answers[0].answer);

    setUserInput('');
  };

  return (
    <div className="App">
      <h1>Chatbot</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your message"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      <div>
        <h2>OpenAI GPT Response:</h2>
        <p>{openaiResponse}</p>
      </div>
      <div>
        <h2>BARD Response:</h2>
        <p>{bardResponse}</p>
      </div>
      <div>
        <h2>Bing Chat Response:</h2>
        <p>{bingChatResponse}</p>
      </div>
    </div>
  );
}

export default App;
