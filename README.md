# E-Commerce Web App

## Overview
- Developed a full-stack E-Commerce web application featuring a complete shopping cart, Google login authentication, and secure payment processing with Stripe.
- Built an intuitive admin dashboard with real-time product management tools, integrating Firebase Storage for image uploads. This improved inventory tracking accuracy by 30% and enhanced the user experience for the entire team.
- Designed an intuitive UI with TailwindCSS, implementing search functionality, product categories, and a rating system to optimize user engagement.
- Focused on optimizing user experience with a responsive, dynamic interface and seamless backend integration.

## Technologies Used
- **Frontend:** Next.js 14, React.js, TypeScript, TailwindCSS
- **Backend:** Prisma, MongoDB, NextAuth, Firebase Storage
- **Payment Processing:** Stripe



### Description of Environment Variables

- **`DATABASE_URL`**: The connection string for your database. For example, a MongoDB URI.
- **`GOOGLE_CLIENT_ID`**: Your Google OAuth 2.0 Client ID obtained from the Google Cloud Console.
- **`GOOGLE_CLIENT_SECRET`**: Your Google OAuth 2.0 Client Secret obtained from the Google Cloud Console.
- **`NEXTAUTH_SECRET`**: A secret string used by NextAuth.js to encrypt session data. You can generate a secure string using `openssl rand -base64 32`.
- **`STRIPE_SECRET_KEY`**: Your Stripe Secret Key for processing payments, available in your Stripe dashboard.
- **`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`**: Your Stripe Publishable Key, also available in your Stripe dashboard.
- **`STRIPE_WEBHOOK_SECRET`**: The secret for verifying Stripe webhooks. Obtain this from your Stripe dashboard after setting up a webhook endpoint.

### Setting Up the `.env` File

1. **Create a `.env` file** in the root directory of your project:

   ```bash
   touch .env
   ```

2. **Fill in the variables** with your specific configuration details:

   ```env
   DATABASE_URL=your_database_url
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   NEXTAUTH_SECRET=your_nextauth_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   ```

3. **Ensure the `.env` file is included in your `.gitignore`** to prevent sensitive information from being committed to your repository.

   ```gitignore
   # Environment Variables
   .env
   ```

### Obtaining the Credentials

- **Google OAuth Credentials**:
  - Go to the [Google Cloud Console](https://console.cloud.google.com/).
  - Create a new project or select an existing one.
  - Navigate to **APIs & Services > Credentials**.
  - Click **Create Credentials > OAuth client ID** and follow the prompts.
  - Use the generated **Client ID** and **Client Secret** in your `.env` file.

- **Stripe API Keys**:
  - Log in to your [Stripe Dashboard](https://dashboard.stripe.com/).
  - Navigate to **Developers > API keys**.
  - Use the **Publishable key** and **Secret key** provided.
  - For **Webhook Secret**, set up a webhook endpoint and copy the signing secret.

- **NextAuth Secret**:
  - Generate a secure random string using the following command:
    ```bash
    openssl rand -base64 32
    ```
  - Use the generated string as your `NEXTAUTH_SECRET`.

- **Database URL**:
  - For MongoDB, you can create a free cluster using [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
  - Replace the placeholder in the connection string with your database credentials.

### Starting the Application

After setting up the environment variables, install the dependencies and run the development server:

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Visit `http://localhost:3000` to view the application.

---

**Note**: Always keep your environment variables secure and do not share them publicly or commit them to version control systems.
```

This README section provides clear instructions for setting up the necessary environment variables to run your E-Commerce web application. It includes details on how to obtain each credential and ensures that users understand the importance of keeping this information secure.


This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.


