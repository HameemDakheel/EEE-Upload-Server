# EEE-Server

The EEE-Server is an electronic library designed to provide media and resources for the courses offered in the Electrical and Electronic Engineering Department at UOT (University of Tripoli). It also serves as a file upload and download server storage solution. Currently, the project is deployed on a local network.

## Table of Contents

- [Overview](#overview)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Overview

The EEE-Library is a comprehensive platform that aims to support students and faculty members in accessing educational materials related to the courses offered by Student Affairs Office, Department of Electrical and Electronic Engineering, University of Tripoli. It serves as a centralized repository for course-specific media, resources, lecture notes, presentations, and more.

Additionally, the EEE-Library provides a file upload and download server storage feature, allowing users to securely store and retrieve files, such as assignments, project reports. Currently, the project is deployed locally within a local network, ensuring controlled access within the network environment.

## Requirements

Before installing the EEE-Library, make sure you have the following requirements:

- Node.js (>=16.0.0) and npm (Node Package Manager)
- MongoDB (>=4.0.0)

## Installation

To install and set up the EEE-Library on your local network, follow the steps below:

1. Clone the repository: `git clone https://github.com/your-username/EEE-Library.git`
2. Install the required dependencies: `npm install`
3. Set up the database (MongoDB) and configure the connection details in the `db.js` file.
4. Configure the server settings by modifying the `.env` file to suit your local network environment.
5. Start the server: `npm start`

## Usage

Once the EEE-Library server is up and running within your local network, users within the network can access its features through a web interface. To access the EEE-Library, open a web browser on any device connected to the local network and navigate to the appropriate address and port specified during installation (e.g., `http://192.168.0.100:8080`).

From the web interface, users can utilize the available functionalities, such as browsing and searching for course-specific media and resources, uploading and downloading files, managing user accounts and access permissions, and generating reports and statistics about library usage.

## Features

The EEE-Library offers the following features:

- Course-specific media and resources, including lecture videos, presentations, documents, and more.
- User-friendly search and browsing functionalities for efficient content discovery.
- Secure file upload and download functionality for storing and sharing files.
- User account management with customizable access permissions.

The EEE-Library uses the following technologies:

- Front-end: React.js
- Back-end: Node.js with Express.js framework
- Database: MongoDB
- File Uploads: Formidable (for handling file uploads)

## Contributing

Contributions to the EEE-Library project are welcome. If you wish to contribute, please follow these guidelines:

- Fork the repository and make your changes in a new branch.
- Commit your changes and push them to your forked repository.
- Submit a pull request with a clear description of the changes made.

Ensure that your code adheres to the project's coding conventions and that you have included appropriate tests for your modifications.

## License

The EEE-Library is distributed under the MIT License.
