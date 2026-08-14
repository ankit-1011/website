# Backend Setup Instructions

## Quick Start

### Step 1: Create .env file

Create a `.env` file in the `backend` folder with the following content:

```env
RESEND_API_KEY=your_resend_api_key_here
ADMIN_EMAIL=your-admin@example.com
FROM_EMAIL=diOnce <onboarding@resend.dev>
PORT=3000
```

Get `RESEND_API_KEY` from the [Resend dashboard](https://resend.com/api-keys). Never commit real keys to git — use a local `backend/.env` file only.

### Step 2: Install Dependencies

```bash
cd backend
npm install
```

### Step 3: Start the Server

```bash
npm run start:dev
```

The server will start on `http://localhost:3000`

## Verification

Once the server is running, you should see:
```
🚀 Backend server is running on: http://localhost:3000
📧 Contact API endpoint: http://localhost:3000/api/contact
```

## Testing

You can test the API using curl:

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message"
  }'
```

## Frontend Integration

The Angular frontend is already configured to use `http://localhost:3000/api/contact`.

Make sure:
1. Backend is running on port 3000
2. Angular app is running on port 4200
3. CORS is enabled (already configured in `src/main.ts`)

## Troubleshooting

### Port 3000 already in use
Change the `PORT` in `.env` file to a different port (e.g., 3001), and update the frontend `contact.service.ts` to use the new port.

### CORS errors
Make sure the backend is running and the origin in `src/main.ts` matches your Angular app URL.

### Email not sending
1. Verify `RESEND_API_KEY` is correct
2. Check Resend dashboard for API key status
3. Verify email addresses are valid
