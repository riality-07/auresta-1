const { runAurestaAgent } = require("../ai-agent/agent");

async function chatWithAurestaAgent(req, res) {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "A valid message is required."
      });
    }

    const result = await runAurestaAgent(message.trim());

    return res.status(200).json({
      success: true,
      response: result.response
    });

  } catch (error) {
    console.error("AURESTA AI Agent Error:", error);

    return res.status(500).json({
      success: false,
      message: "The AI agent could not process the request."
    });
  }
}

module.exports = {
  chatWithAurestaAgent
};
