<p align="center">
  <h2 align="center">AuthService Documentation</h2>
  <p align="center"><i>Securing your application with advanced JWT and Encryption services</i></p>
</p>

---

## 📖 Table of Contents

- [🛠 Installation](#-installation)
- [🚀 Methods](#-methods)
  - [🧪 Constructor](#-constructor)
  - [🔐 verifyAccessToken](#-verifyaccesstoken)
  - [🔍 verifyAccessUrl](#-verifyaccessurl)
  - [🔒 encrypt](#-encrypt)
  - [🔓 decrypt](#-decrypt)
- [💡 Usage](#-usage)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)

---

## 🛠 Installation

Before diving in, ensure you have the necessary dependencies:

\```bash
npm install jsonwebtoken
# Note: The crypto module is bundled with Node.js, so no separate installation is needed.
\```

---

## 🚀 Methods

### 🧪 Constructor

Kickstarts the `AuthService` class.

- **secretKey 📜 (String):** The linchpin for JWT verification.

### 🔐 verifyAccessToken

Authenticate and validate JWT tokens.

- **token 🔖 (String):** The JWT token awaiting verification.
- **Returns:** 🔄 Decoded payload if the token passes verification.
- **Throws:** ❌ An error if the token proves invalid.

### 🔍 verifyAccessUrl

Cross-checks the referer in the request headers against a predefined referer.

- **req 🌐 (Object):** The HTTP request.
- **expectedReferer 🔗 (String):** The anticipated referer URL.
- **Returns:** ✅/❌ true if they align, false otherwise.

### 🔒 encrypt

Turns plain text into a jumble using secrets & IV from env variables.

- **input_string 📝 (String):** The text awaiting encryption.
- **Returns:** 🔏 Hexadecimal representation of the encrypted string.

### 🔓 decrypt

Deciphers the encrypted text using a secret and IV from env variables.

- **encrypted_string 🔒 (String):** The text in its encrypted form.
- **secret 📜 (String):** The decryption keystone.
- **Returns:** 📝 The original string.

---

## 💡 Usage

To weave `AuthService` into your code:

\```javascript
import AuthService from 'path_to_AuthService.js';
const authService = new AuthService('YOUR_SECRET_KEY');
\```
Replace `'YOUR_SECRET_KEY'` with your bespoke JWT secret.
