/* =========================================================
   AURESTA — CHAT COMPONENT
   ========================================================= */

function renderChat(options = {}) {

    const {
        title = 'Chat',
        messages = [],
        placeholder = 'Type a message...'
    } = options;

    return `
        <div class="chat-container">

            <div class="chat-header">

                <h3>
                    ${title}
                </h3>

            </div>


            <div class="chat-messages">

                ${messages.length
                    ? messages.map(message => `
                        <div
                            class="chat-message ${message.sender === 'user'
                                ? 'sent'
                                : 'received'}"
                        >
                            ${message.text}
                        </div>
                    `).join('')
                    : `
                        <div class="chat-empty">
                            No messages yet.
                        </div>
                    `
                }

            </div>


            <form
                class="chat-input-area"
                id="chat-form"
            >

                <input
                    type="text"
                    class="form-input"
                    name="message"
                    placeholder="${placeholder}"
                    required
                >

                <button
                    type="submit"
                    class="btn btn-primary"
                >
                    Send
                </button>

            </form>

        </div>
    `;
}