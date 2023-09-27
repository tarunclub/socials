# Socials - A Social Media App for Sharing Pictures

## Table of Contents

- [Socials - A Social Media App for Sharing Pictures](#socials---a-social-media-app-for-sharing-pictures)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Tech Stack](#tech-stack)
  - [Contributing](#contributing)

## Introduction

Socials is a social media application that allows users to share their favorite pictures with friends and followers. Built with React, Recoil, React Router DOM, Express, and AWS S3 for image storage, Socials provides a seamless and enjoyable experience for both posting and viewing pictures.

## Features

- User authentication and authorization for secure access.
- User-friendly interface for posting images.
- Image upload and storage using AWS S3 presigned URLs.
- Real-time feed of posts
- Input validation using Zod for data integrity.

## Getting Started

### Prerequisites

Before you start, ensure you have the following prerequisites:

- Node.js and npm installed.
- An AWS S3 bucket set up to store images.
- Create `.env` files for both the server and client and configure environment variables, including AWS S3 credentials.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/tarunclub/socials.git

    cd socials/server
    npm install
    cd ../client
    npm install
   ```

2. Start the server and client applications:

   ```
   # In the server folder
    npm build
    npm start

   # In the client folder
    npm install
    npm run dev
   ```

## Tech Stack

- React
- Recoil
- React Router DOM
- Express
- AWS S3(for image upload)
- Zod(for input validation)

## Contributing

Contributions are welcome!
