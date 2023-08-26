<p align="center">
  <h2 align="center">Email Notification Module Documentation</h2>
  <p align="center"><i>Send email notifications for user registration and password recovery.</i></p>
</p>

---

## 📖 Table of Contents

- [📄 Overview](#-overview)
- [🚀 Functions](#-functions)
  - [🔗 sendRecoveryEmail](#-sendrecoveryemail)
  - [🔔 sendSuccessfullyRegisterUser](#-sendsuccessfullyregisteruser)
- [🌍 Environment Setup](#-environment-setup)
- [🚫 Warnings](#-warnings)

---

## 📄 Overview

This module primarily focuses on sending out emails, utilizing the `nodemailer` package. It contains functions to:
- Dispatch a password recovery email.
- Notify about a new user registration.

The `dotenv` package aids in the extraction of environment variables from the `.env` file.

---

## 🚀 Functions

### 🔗 sendRecoveryEmail

**Purpose**: Sends a password recovery email.

**Parameters**:
- `userEmail` (String) - Target email address for password recovery.

**Description**: 

The function establishes a nodemailer transporter with the SMTP server data and authentication credentials from the environment variables. It then proceeds to email the user a recovery link.

### 🔔 sendSuccessfullyRegisterUser

**Purpose**: Notify via email when a new user registers.

**Parameters**:
- `json` (Object) - An object containing details of the newly registered user.

**Description**:

This function constructs a nodemailer transporter in a similar vein to the `sendRecoveryEmail` function. An email detailing the new user's information is dispatched to a predefined email address.

---

## 🌍 Environment Setup

Make use of the `dotenv.config()` method to derive environment variables from the `.env` file situated at the defined path. These variables should cover SMTP server details along with email credentials and addresses.

---

## 🚫 Warnings

For the sake of security:
1. Always store sensitive data like email credentials in environment variables. Refrain from hardcoding them into the application.
2. Ensure the `.env` file remains excluded from your version control to maintain secrecy.

---

