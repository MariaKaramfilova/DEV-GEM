# DEV/GEM - Add-ons Registry Web Application
<span style="color:red">Recheck at the end of project</span>
Welcome to DEV/GEM, a powerful Add-ons Registry web application that makes it easy for users to find, publish, and manage addons for their preferred IDE. Whether you're a developer looking for the right tool or you have developed your own extension you want to publish, DEV/GEM has got you covered.

**Disclaimer**: This application was made as an educational project. All content is not intended for real-world use and any transactions are in test mode. Please refrain from using the content in any other way.

## Table of Contents

- [DEV/GEM - Add-ons Registry Web Application](#devgem---add-ons-registry-web-application)
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

DEV/GEM is designed to provide a seamless experience for users who want to explore, publish, and manage addons. It encompasses a wide range of features to ensure that both anonymous and authenticated users can make the most of the application.

## Getting Started

You can view the latest deployed online version [HERE](https://unknown-adonis.web.app/).

To run DEV/GEM on your local machine, follow these steps:

1. Clone this repository: `git clone https://github.com/your-username/addonis.git`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`


## Scheme (structure) of the documents in the database
<span style="color:red">Recheck at the end of project</span>
The data is stored in a document (NoSQL) database hosted by Google Firebase. The documents are organized to achieve the functionalities described in the project description.

## Badges
<span style="color:red">Recheck at the end of project</span>

On some READMEs, you may see small images that convey metadata, such as whether or not all the tests are passing for the project. You can use Shields to add some to your README. Many services also have instructions for adding a badge.
## Public Part

The public part of DEV/GEM is accessible to anonymous users. Here's what you can do:

- Register and login.
- Explore featured, popular, and new addons.
- View addon details including name, description, creator, tags, downloads, rating, and more.
- Filter and sort addons based on various criteria.
- Download addons directly from the landing page.

## Private Part

Authenticated users have access to the private part of DEV/GEM. Here's what you can do:

- Login and logout securely.
- Update your profile information.
- Manage your addons (Create, Read, Update, Delete).
- Rate addons to share your feedback.
- Buy add-on subscriptions.

## Administrative Part

Admin users have additional privileges for managing the application. Here's what you can do:

- Approve new addons and make them visible to the public.
- Manage users by searching, blocking, or unblocking them.
- Edit or delete all addons.

## Additional Features

DEV/GEM offers optional features to enhance the user experience:
<span style="color:red">Recheck at the end of project</span>
- Email Verification: Verify email to complete registration.
- Addon Creation Verification: Verify addons with unique codes.
- Invite a Friend: Send registration links to non-registered users.
- Identity Verification: Verify users with ID card and selfie.
- Joint Add-ons: Collaboratively manage addons.
- Recurring Metrics Reports: Receive automated reports for addons.
- Additional User Functionality: Follow other users and get notifications.
- Buy add-on subscriptions: Make purchases using card, GPay or Apple pay.
- Admin chat: Group chat available for admin users.
- Notifications: User notifications for important events.
- Rich text and images descriptions: Upload concise, visually rich add-ons.
- Manage subscriptions: View invoices or cancel subscriptions.

## License

DEV/GEM is licensed under the [MIT License](LICENSE).

## Authors and acknowledgment

[Hristiyan Fachikov](https://gitlab.com/hristiyan.fachikov)

[Maria Karamfilova](https://gitlab.com/maria_karamfilova)

[Viktor Petrov](https://gitlab.com/viktor.mp)


