# Community SaaS Platform

The Community SaaS Platform is a web-based service designed to empower users to effortlessly create and manage their own communities. With a focus on community creation, user authentication, and moderation, this platform provides essential tools for building vibrant online communities.

## Key Features

1. **Authentication Module:**
   - Users can sign up using a valid name, email, and a strong password.
   - Secure sign-in is ensured through authentication with valid credentials.

2. **Community Module:**
   - Users can explore a comprehensive list of existing communities.
   - Creation of new communities is supported, with enforced uniqueness of community names.

3. **Moderation Module:**
   - Community administrators have access to a list of all members within their community.
   - Admins possess the authority to manage community membership by adding or removing members.

## Tech Stack

- **Language:** Node.js v14+
- **Database:** MongoDB
- **ORM:** Mongoose / MongoDB Native Driver
- **Library:** @theinternetfolks/snowflake for generating unique IDs

## API Documentation

- The project follows predefined API URLs and consistent response structures.
- User roles, such as Community Admin and Community Member, are clearly defined.
- Each API endpoint incorporates validation mechanisms to uphold data integrity.

## Deployment

To run this project locally, ensure you have MongoDB and Node.js installed on your machine. Set up environment variables and follow these steps:

```bash
npm install
npm run dev
