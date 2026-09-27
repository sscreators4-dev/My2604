# Private Two-Person Chat — One-Click Render Ready

## Fast deployment

1. Upload this project to a GitHub repository.
2. Open Render and choose **New + → Blueprint**.
3. Select the GitHub repository.
4. Render reads `render.yaml` automatically.
5. Click **Apply**.
6. After deployment, open the generated `https://...onrender.com` URL on both phones.
7. Enter password: `2604`.

## What is included
- Real-time Socket.IO chat
- Password authentication
- Mobile-first UI
- Auto-lock when the browser page becomes hidden
- HTTPS through Render
- No database required for live messages

## Important
This version does not permanently store messages. Messages are live-relayed through the server and disappear after the server restarts.

For permanent encrypted chat history, a database and stronger end-to-end encryption should be added.
