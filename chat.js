/**
 * Chat Widget for Odoo AI Assistant
 * Client-side chat widget that sends messages to n8n webhook
 */

// Configuration
const N8N_WEBHOOK_URL = "https://your-n8n-domain.com/webhook/odoo-ai";

// DOM Elements
const chatWidget = document.querySelector('.chat-widget');
const chatToggleBtn = document.getElementById('chatToggleBtn');
const chatWindow = document.getElementById('chatWindow');
const chatMessages = document.getElementById('chatMessages');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');

// State
let isOpen = false;

/**
 * Initialize the chat widget
 */
function init() {
    // Toggle chat window
    chatToggleBtn.addEventListener('click', toggleChat);
    
    // Handle form submission
    chatForm.addEventListener('submit', handleSubmit);
    
    // Prevent enter key from adding newlines
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            chatForm.requestSubmit();
        }
    });
}

/**
 * Toggle chat window open/close
 */
function toggleChat() {
    isOpen = !isOpen;
    chatWidget.classList.toggle('active', isOpen);
    
    if (isOpen) {
        chatInput.focus();
        scrollToBottom();
    }
}

/**
 * Handle form submission
 */
async function handleSubmit(e) {
    e.preventDefault();
    
    const message = chatInput.value.trim();
    if (!message) return;
    
    // Clear input
    chatInput.value = '';
    
    // Add user message to chat
    addMessage(message, 'user');
    
    // Show loading indicator
    const loadingId = showLoading();
    
    // Disable input while processing
    setInputState(false);
    
    try {
        // Send message to n8n webhook
        const response = await sendMessageToWebhook(message);
        
        // Remove loading indicator
        removeLoading(loadingId);
        
        // Add bot response
        addMessage(response, 'bot');
        
    } catch (error) {
        // Remove loading indicator
        removeLoading(loadingId);
        
        // Show error message
        addMessage('Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.', 'bot');
        
        console.error('Error sending message:', error);
    } finally {
        // Re-enable input
        setInputState(true);
        chatInput.focus();
    }
}

/**
 * Send message to n8n webhook
 */
async function sendMessageToWebhook(message) {
    const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message: message
        })
    });
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Get response as text
    const responseText = await response.text();
    
    return responseText;
}

/**
 * Add message to chat
 */
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    const p = document.createElement('p');
    p.textContent = text;
    
    contentDiv.appendChild(p);
    messageDiv.appendChild(contentDiv);
    
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    scrollToBottom();
}

/**
 * Show loading indicator
 */
function showLoading() {
    const loadingId = 'loading-' + Date.now();
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message loading-message';
    messageDiv.id = loadingId;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    // Create 3 loading dots
    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('div');
        dot.className = 'loading-dot';
        contentDiv.appendChild(dot);
    }
    
    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    scrollToBottom();
    
    return loadingId;
}

/**
 * Remove loading indicator
 */
function removeLoading(loadingId) {
    const loadingElement = document.getElementById(loadingId);
    if (loadingElement) {
        loadingElement.remove();
    }
}

/**
 * Scroll chat to bottom
 */
function scrollToBottom() {
    // Small delay to ensure DOM is updated
    setTimeout(() => {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 100);
}

/**
 * Enable/disable input and send button
 */
function setInputState(enabled) {
    chatInput.disabled = !enabled;
    sendBtn.disabled = !enabled;
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
