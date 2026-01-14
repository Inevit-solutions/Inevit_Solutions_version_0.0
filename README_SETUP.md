# Local Development Setup

## Prerequisites
- Node.js installed
- MongoDB connection string

## Step 1: Create `.env.local` file

Create a file named `.env.local` in the root directory with:

```env
MONGODB_URI=mongodb+srv://username:password@clientbase.gkkeluz.mongodb.net/InevitBase?retryWrites=true&w=majority
```

**Important:** Replace with your actual MongoDB connection string.

## Step 2: Install Dependencies

```bash
npm install
```

## Step 3: Run Local Development

```bash
npm run dev
```

This will:
- Start Vercel dev server on `http://localhost:3000`
- Handle both frontend (Vite) and API routes automatically
- Load environment variables from `.env.local`

## Step 4: Test the API

- Footer email subscription: Should save to `Subscribers` collection
- Contact form: Should save to `Clients` collection

## Troubleshooting

### "Not Found" Error
- Make sure `.env.local` exists with `MONGODB_URI`
- Check that `npm run dev` is running
- Verify API routes are accessible at `http://localhost:3000/api/subscribe` and `/api/contact`

### MongoDB Connection Error
- Verify `MONGODB_URI` in `.env.local` is correct
- Check MongoDB Atlas network access (IP whitelist)
- Ensure database name `InevitBase` is correct in connection string
