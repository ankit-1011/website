# Dionce Backend API

Backend API for handling contact form submissions and sending emails via Resend.

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Variables

The `.env` file is already configured with:
- `RESEND_API_KEY`: Your Resend API key
- `ADMIN_EMAIL`: Email address to receive contact form submissions
- `FROM_EMAIL`: Email address to send from
- `PORT`: Server port (default: 3000)

### 3. Start the Server

**Development mode (with auto-reload):**
```bash
npm run start:dev
```

**Production mode:**
```bash
npm run build
npm run start:prod
```

The server will start on `http://localhost:3000`

## API Endpoints

### POST `/api/contact`

Submit a contact form.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "companyName": "Example Corp",
  "message": "Hello, I'm interested in your services."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Contact form submitted successfully",
  "result": {
    "adminEmailSent": true,
    "userEmailSent": true
  }
}
```

## CORS Configuration

The backend is configured to accept requests from `http://localhost:4200` (Angular dev server).

To change this, update the `origin` in `src/main.ts`:

```typescript
app.enableCors({
  origin: 'http://localhost:4200', // Change this to your frontend URL
  // ...
});
```

## Email Configuration

- Admin emails are sent to the address specified in `ADMIN_EMAIL` environment variable
- Auto-reply emails are sent to the user's email address
- Both emails use the `FROM_EMAIL` environment variable for the sender address

## Troubleshooting

### Port Already in Use
If port 3000 is already in use, change the `PORT` in `.env` file.

### CORS Errors
Make sure the `origin` in `src/main.ts` matches your Angular app URL.

### Email Not Sending
1. Verify `RESEND_API_KEY` is correct in `.env`
2. Check Resend dashboard for API key status
3. Verify email addresses are valid
