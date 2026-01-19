Source: https://docs.wwebjs.dev/structures_BusinessContact.js.html#source-line-9

1.  `'use strict';`

3.  `const Contact = require('./Contact');`

5.  `/**`
6.   `* Represents a Business Contact on WhatsApp`
7.   `* @extends {Contact}`
8.   `*/`
9.  `class BusinessContact extends Contact {`
10.      `_patch(data) {`
11.          `/**`
12.           `* The contact's business profile`
13.           `*/`
14.          `this.businessProfile = data.businessProfile;`

16.          `return super._patch(data);`
17.      `}`

19.  `}`

21.  `module.exports = BusinessContact;`