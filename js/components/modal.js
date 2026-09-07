/* =========================================================
   AURESTA — MODAL COMPONENT
   ========================================================= */

function renderModal(options = {}) {

    const {
        id = 'auresta-modal',
        title = 'Auresta',
        content = '',
        show = false
    } = options;

    return `
        <div
            id="${id}"
            class="modal-overlay ${show ? '' : 'hidden'}"
            role="dialog"
            aria-modal="true"
        >

            <div class="modal">

                <div class="modal-header">

                    <h2 class="modal-title">
                        ${title}
                    </h2>

                    <button
                        class="modal-close"
                        data-action="close-modal"
                        aria-label="Close"
                    >
                        ×
                    </button>

                </div>


                <div class="modal-body">
                    ${content}
                </div>

            </div>

        </div>
    `;
}