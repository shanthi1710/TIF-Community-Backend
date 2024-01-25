## **Project Description: Community SaaS Platform**

The Community SaaS Platform is a web-based service that empowers users to create and manage their communities effortlessly. The platform provides a range of features centered around community creation, user authentication, and moderation. Users can sign up, create communities, and perform moderation tasks such as adding or removing members.

**Key Features:**

1. **Authentication Module:**
   - Users can sign up using a valid name, email, and a strong password.
   - Authentication is achieved through secure sign-in using valid credentials.

2. **Community Module:**
   - Users can view a list of all existing communities.
   - Creation of new communities is supported, with unique names enforced.

3. **Moderation Module:**
   - Community admins can view a list of all members in a specific community.
   - Admins have the ability to add or remove members from their communities.

**Tech Stack:**

- **Language:** Node v14+
- **Database:** MongoDB
- **ORM:** Mongoose / MongoDB Native Driver
- **Library:** @theinternetfolks/snowflake for generating unique IDs

**API Documentation:**
- The project adheres to fixed API URLs and response structures.
- User roles, such as Community Admin and Community Member, are strictly defined.
- Validations are implemented for each API endpoint to ensure data integrity.

**Deployment:**

To run this project locally, make sure you have installed mongodb and nodejs on your machine. Create env variables and do the following

```bash
  npm install
  npm run dev
```
**http commands**
-Role:
	1)GET:http://localhost:8000/api/v1/role/getAllRole
	2)POSt:http://localhost:8000/api/v1/role/createRole
-User:
	1)POST:http://localhost:8000/api/v1/users/register
	2)POST:https://community-app-c8b1.onrender.com/users/login
	3)POST:http://localhost:8000/api/v1/users/logout
	4)GET:http://localhost:8000/api/v1/users/getMe
-Community:
	1)POST:http://localhost:8000/api/v1/community/cCommunity
	2)GET:http://localhost:8000/api/v1/community/gaCommunity
	3)GET:http://localhost:8000/api/v1/community/7156173990150738171/member
	4)GET:http://localhost:8000/api/v1/community/me/owner
	5)GET:http://localhost:8000/api/v1/community/me/member
-Member
	1)POST:http://localhost:8000/api/v1/member/addMember
	2)DELETE:http://localhost:8000/api/v1/member/id/community/cid

**Note:** The provided documentation and implementation files can be found in the GitHub repository for a detailed reference.

*This Community SaaS Platform aims to facilitate the seamless creation and management of online communities, offering users a reliable and secure environment for collaboration and interaction.*
