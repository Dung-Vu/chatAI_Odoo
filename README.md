# chatAI_Odoo - Modern Chat Widget

A modern, ChatGPT/Facebook Messenger-style chat widget for Odoo AI Assistant with n8n webhook integration.

![Chat Widget Demo](https://github.com/user-attachments/assets/f64693bc-19ae-44c5-a217-a4234d1846e2)

## Features

✨ **Modern UI Design**
- Gradient purple theme with smooth animations
- Fixed position in bottom-right corner
- Open/close toggle with elegant transitions
- Responsive design for desktop and mobile

💬 **Chat Functionality**
- User and bot message bubbles with distinct styles
- Loading indicator (3 animated dots) while waiting for response
- Auto-scroll to latest messages
- Vietnamese character support (UTF-8)

🔌 **n8n Webhook Integration**
- Sends POST requests to configurable webhook URL
- JSON payload: `{"message": "user message"}`
- Handles plain text responses
- Error handling with user-friendly messages

🚀 **Client-Side Only**
- No backend required
- Pure HTML/CSS/JavaScript
- No frameworks or dependencies
- Ready to run immediately

## Quick Start

1. **Clone or download this repository**
   ```bash
   git clone https://github.com/Dung-Vu/chatAI_Odoo.git
   cd chatAI_Odoo
   ```

2. **Configure the webhook URL**
   
   Open `chat.js` and update the webhook URL:
   ```javascript
   const N8N_WEBHOOK_URL = "https://your-n8n-domain.com/webhook/odoo-ai";
   ```

3. **Open in browser**
   
   Simply open `index.html` in your web browser:
   ```bash
   # Using Python's built-in HTTP server
   python3 -m http.server 8000
   
   # Or using Node.js http-server
   npx http-server
   ```
   
   Then navigate to `http://localhost:8000/index.html`

## File Structure

```
chatAI_Odoo/
├── index.html      # Main HTML structure
├── style.css       # Modern styling and animations
├── chat.js         # Chat functionality and API calls
└── README.md       # Documentation
```

## Configuration

### Webhook URL

Update the webhook URL in `chat.js`:
```javascript
const N8N_WEBHOOK_URL = "https://your-n8n-domain.com/webhook/odoo-ai";
```

### Expected Response Format

The widget expects a plain text response from the n8n webhook:
```
Your response text here
```

### n8n Webhook Setup

1. Create a webhook node in your n8n workflow
2. Set the HTTP method to POST
3. Configure your workflow to:
   - Receive JSON payload: `{"message": "user message"}`
   - Process the message (e.g., send to AI model)
   - Return plain text response

## Customization

### Colors and Theming

Edit `style.css` to customize colors:
```css
/* Main gradient theme */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* User message bubble */
.user-message .message-content {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Messages

Edit the welcome message in `index.html`:
```html
<div class="message bot-message">
    <div class="message-content">
        <p>Xin chào! Tôi là trợ lý AI của Odoo. Tôi có thể giúp gì cho bạn?</p>
    </div>
</div>
```

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Screenshots

### Desktop View
<img src="https://github.com/user-attachments/assets/f64693bc-19ae-44c5-a217-a4234d1846e2" width="600" alt="Desktop View">

### Mobile View
<img src="https://github.com/user-attachments/assets/66e2d90e-c726-4256-9d79-58173d2bed50" width="300" alt="Mobile View">

## Technical Details

- **No dependencies**: Pure HTML/CSS/JavaScript
- **Responsive breakpoints**: 768px (tablet), 480px (mobile)
- **Animations**: CSS transitions with cubic-bezier easing
- **Accessibility**: ARIA labels for screen readers
- **Error handling**: User-friendly error messages for failed requests

## License

MIT License - feel free to use and modify as needed.

## Contributing

Issues and pull requests are welcome!