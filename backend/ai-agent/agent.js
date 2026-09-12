const { AURESTA_AGENT_PROMPT } = require("./prompt");

async function runAurestaAgent(userMessage) {
  const response = await fetch("http://localhost:11434/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama3.2:latest",
      messages: [
        {
          role: "system",
          content: AURESTA_AGENT_PROMPT
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      stream: false
    })
  });

  if (!response.ok) {
    throw new Error(`Ollama returned HTTP ${response.status}`);
  }

  const data = await response.json();

  return {
    response: data.message?.content || "I could not generate a response."
  };
}

module.exports = {
  runAurestaAgent
};

