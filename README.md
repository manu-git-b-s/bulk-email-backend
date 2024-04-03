# Bulk Email Nodejs Project

Welcome to the Bulk Email Project! This repository contains the source code and documentation for a Node.js application built with Express.js for sending bulk emails. The project utilizes various libraries and tools including bcrypt, jsonwebtoken, cors, dotenv, mongoose, cookie-parser, nodemon, and nodemailer. It provides full authentication and authorization through protected routes.

## Features

- **Bulk Email Sending**: Allows users to send emails to multiple recipients in bulk.
- **Authentication**: Implements user authentication using bcrypt for password hashing, jsonwebtoken for generating and verifying authentication tokens, and cookie-parser for parsing cookies.
- **Authorization**: Provides authorization through protected routes, ensuring only authenticated users can access certain functionalities.
- **Email Sending**: Utilizes nodemailer to send emails efficiently.
- **Environment Variables**: Utilizes dotenv for managing environment variables securely.
- **Cross-Origin Resource Sharing (CORS)**: Implements CORS to allow requests from authorized domains.

## Authentication and Authorization

- Users need to register and log in to access the email sending functionality.
- Authentication tokens are generated upon successful login and stored as cookies.
- Protected routes are accessed using these authentication tokens to ensure authorization.

## Features

- **URL Shortening**: Allows users to shorten long URLs into shorter, more manageable links.
- **User Authentication**: Implements user authentication using bcrypt for password hashing and jsonwebtoken for generating and verifying authentication tokens.
- **Custom Short URLs**: Allows users to customize the shortened URLs if desired.
- **Link Expiry**: Provides the option to set expiration times for shortened links.
- **Statistics**: Tracks the number of times a shortened URL has been clicked.
- **Cross-Origin Resource Sharing (CORS)**: Implements CORS to allow requests from authorized domains.
- **Environment Variables**: Utilizes dotenv for managing environment variables securely.
- **Database Integration**: Integrates with MongoDB using mongoose for storing user data and shortened URLs.
- **Email Notifications**: Uses nodemailer to send email notifications for account registration and password resets.

## Dependencies

- [Express.js](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [Nodemailer](https://nodemailer.com/)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [cors](https://www.npmjs.com/package/cors)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [Cookie Parser](https://www.npmjs.com/package/cookie-parser)

## API Endpoints

- `POST /api/mail/create-mail`: send mail to multiple recipeients.
- `POST /api/mail/all-mails`: Get All mails sent by the user.
- `POST /api/mail/today-mails`: Get All mails sent by the user today.
- `POST /api/mail/monthly-mails`: Get All mails sent by the user in this month.
- `POST /register`: Register a new user.
- `POST /login`: Log in with existing credentials.
- `POST /logout`: Log out from the application.
- `POST /forgotPassword`: Request a password reset.
- `POST /resetPassword`: Reset password using the provided mail link.

## Getting Started

To get started with the Bulk Email Project, follow these steps:

1. **Clone the Repository**: Clone this repository to your local machine using `git clone https://github.com/manu-git-b-s/bulk-email-backend.git`.

2. **Install Dependencies**: Install the necessary dependencies by running `npm install`.

3. **Set Environment Variables**: Create a `.env` file in the root directory and define environment variables such as database connection URI, JWT secret, and email configuration.

4. **Database Setup**: Set up a MongoDB database either locally or using a cloud service like MongoDB Atlas. Update the `.env` file with the appropriate database connection URI.

5. **Start the Server**: Start the server by running `npm start` or `npm run dev` if using nodemon for development. The API will be accessible at the specified port 8080.

6. **Testing**: Test the functionality thoroughly to ensure it meets your requirements and works as expected.

7. **Customization**: Customize the project as needed to integrate it with your existing application or to add additional features.

## Contributing

Contributions are welcome! If you'd like to contribute to the project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature/feature-name`).
6. Create a new Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).

## Support

For any questions or issues, please open an issue on the GitHub repository or contact [manupriyan722@gmail.com].

## Deployed Render Link

[Bulk Email Project](https://bulk-email-backend-mnvn.onrender.com)
