const tools = [
  {
    type: "function",
    name: "get_event_planning_advice",
    description:
      "Provides general event planning advice based on the user's event type, guest count, budget, and requirements.",
    parameters: {
      type: "object",
      properties: {
        event_type: {
          type: "string",
          description: "Type of event, such as birthday, wedding, corporate event, etc."
        },
        guest_count: {
          type: "integer",
          description: "Approximate number of guests."
        },
        budget: {
          type: "number",
          description: "Approximate event budget."
        },
        requirements: {
          type: "string",
          description: "Additional requirements or preferences."
        }
      },
      required: ["event_type"],
      additionalProperties: false
    },
    strict: true
  }
];

module.exports = {
  tools
};
