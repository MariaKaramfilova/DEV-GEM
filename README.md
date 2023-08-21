# Addonis - Addons Registry Web Application
<span style="color:red">Recheck at the end of project</span>
Welcome to Addonis, a powerful Addons Registry web application that makes it easy for users to find, publish, and manage addons for their preferred IDE. Whether you're a developer looking for the right tool or an admin overseeing the registry, Addonis has got you covered.

## Table of Contents

- [Addonis - Addons Registry Web Application](#addonis---addons-registry-web-application)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Getting Started](#getting-started)
  - [Scheme (structure) of the documents in the database](#scheme-structure-of-the-documents-in-the-database)
  - [Badges](#badges)
  - [Public Part](#public-part)
  - [Private Part](#private-part)
  - [Administrative Part](#administrative-part)
  - [Additional Features](#additional-features)
  - [License](#license)
  - [Authors and acknowledgment](#authors-and-acknowledgment)

## Introduction

Addonis is designed to provide a seamless experience for users who want to explore, publish, and manage addons. It encompasses a wide range of features to ensure that both anonymous and authenticated users can make the most of the application.

## Getting Started
<span style="color:red">Recheck at the end of project</span>
To run Addonis on your local machine, follow these steps:

1. Clone this repository: `git clone https://github.com/your-username/addonis.git`
2. Navigate to the project directory: `cd addonis`
3. Install dependencies: `npm install`
4. Start the development server: `npm run dev`

## Scheme (structure) of the documents in the database
<span style="color:red">Recheck at the end of project</span>
The data is stored in a document (NoSQL) database hosted by Google Firebase. The documents are organized to achieve the functionalities described in the project description.

## Badges
<span style="color:red">Recheck at the end of project</span>

On some READMEs, you may see small images that convey metadata, such as whether or not all the tests are passing for the project. You can use Shields to add some to your README. Many services also have instructions for adding a badge.
## Public Part

The public part of Addonis is accessible to anonymous users. Here's what you can do:

- Register and login.
- Explore featured, popular, and new addons.
- View addon details including name, description, creator, tags, downloads, rating, and more.
- Filter and sort addons based on various criteria.
- Download addons directly from the landing page.

## Private Part

Authenticated users have access to the private part of Addonis. Here's what you can do:

- Login and logout securely.
- Update your profile information.
- Manage your addons (Create, Read, Update, Delete).
- Rate addons to share your feedback.

## Administrative Part

Admin users have additional privileges for managing the application. Here's what you can do:

- Approve new addons and make them visible to the public.
- Manage users by searching, blocking, or unblocking them.
- Edit or delete all addons.
- View drafts and delete them.

## Additional Features

Addonis offers optional features to enhance the user experience:
<span style="color:red">Recheck at the end of project</span>
- Email Verification: Verify email before completing registration.
- Addon Creation Verification: Verify addons with unique codes.
- Invite a Friend: Send registration links to non-registered users.
- Identity Verification: Verify users with ID card and selfie.
- Joint Addons: Collaboratively manage addons.
- Recurring Metrics Reports: Receive automated reports for addons.
- Additional User Functionality: Follow other users and get notifications.
- Drafts: Create and manage draft addons.

## License

Addonis is licensed under the [MIT License](LICENSE).

## Authors and acknowledgment

[Hristiyan Fachikov](https://gitlab.com/hristiyan.fachikov)

[Maria Karamfilova](https://gitlab.com/maria_karamfilova)

[Viktor Petrov](https://gitlab.com/viktor.mp)


