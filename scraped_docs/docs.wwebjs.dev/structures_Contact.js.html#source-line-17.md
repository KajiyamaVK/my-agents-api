Source: https://docs.wwebjs.dev/structures_Contact.js.html#source-line-17

1.  `'use strict';`

3.  `const Base = require('./Base');`

5.  `/**`
6.   `* ID that represents a contact`
7.   `* @typedef {Object} ContactId`
8.   `* @property {string} server`
9.   `* @property {string} user`
10.   `* @property {string} _serialized`
11.   `*/`

13.  `/**`
14.   `* Represents a Contact on WhatsApp`
15.   `* @extends {Base}`
16.   `*/`
17.  `class Contact extends Base {`
18.      `constructor(client, data) {`
19.          `super(client);`

21.          `if(data) this._patch(data);`
22.      `}`

24.      `_patch(data) {`
25.          `/**`
26.           `* ID that represents the contact`
27.           `* @type {ContactId}`
28.           `*/`
29.          `this.id = data.id;`

31.          `/**`
32.           `* Contact's phone number`
33.           `* @type {string}`
34.           `*/`
35.          `this.number = data.userid;`

37.          `/**`
38.           `* Indicates if the contact is a business contact`
39.           `* @type {boolean}`
40.           `*/`
41.          `this.isBusiness = data.isBusiness;`

43.          `/**`
44.           `* Indicates if the contact is an enterprise contact`
45.           `* @type {boolean}`
46.           `*/`
47.          `this.isEnterprise = data.isEnterprise;`

49.          `this.labels = data.labels;`

51.          `/**`
52.           `* The contact's name, as saved by the current user`
53.           `* @type {?string}`
54.           `*/`
55.          `this.name = data.name;`

57.          `/**`
58.           `* The name that the contact has configured to be shown publically`
59.           `* @type {string}`
60.           `*/`
61.          `this.pushname = data.pushname;`

63.          `this.sectionHeader = data.sectionHeader;`

65.          `/**`
66.           `* A shortened version of name`
67.           `* @type {?string}`
68.           `*/`
69.          `this.shortName = data.shortName;`

71.          `this.statusMute = data.statusMute;`
72.          `this.type = data.type;`
73.          `this.verifiedLevel = data.verifiedLevel;`
74.          `this.verifiedName = data.verifiedName;`

76.          `/**`
77.           `* Indicates if the contact is the current user's contact`
78.           `* @type {boolean}`
79.           `*/`
80.          `this.isMe = data.isMe;`

82.          `/**`
83.           `* Indicates if the contact is a user contact`
84.           `* @type {boolean}`
85.           `*/`
86.          `this.isUser = data.isUser;`

88.          `/**`
89.           `* Indicates if the contact is a group contact`
90.           `* @type {boolean}`
91.           `*/`
92.          `this.isGroup = data.isGroup;`

94.          `/**`
95.           `* Indicates if the number is registered on WhatsApp`
96.           `* @type {boolean}`
97.           `*/`
98.          `this.isWAContact = data.isWAContact;`

100.          `/**`
101.           `* Indicates if the number is saved in the current phone's contacts`
102.           `* @type {boolean}`
103.           `*/`
104.          `this.isMyContact = data.isMyContact;`

106.          `/**`
107.           `* Indicates if you have blocked this contact`
108.           `* @type {boolean}`
109.           `*/`
110.          `this.isBlocked = data.isBlocked;`

112.          `return super._patch(data);`
113.      `}`

115.      `/**`
116.       `* Returns the contact's profile picture URL, if privacy settings allow it`
117.       `* @returns {Promise&lt;string>}`
118.       `*/`
119.      `async getProfilePicUrl() {`
120.          `return await this.client.getProfilePicUrl(this.id._serialized);`
121.      `}`

123.      `/**`
124.       `* Returns the contact's formatted phone number, (12345678901@c.us) => (+1 (234) 5678-901)`
125.       `* @returns {Promise&lt;string>}`
126.       `*/`
127.      `async getFormattedNumber() {`
128.          `return await this.client.getFormattedNumber(this.id._serialized);`
129.      `}`

131.      `/**`
132.       `* Returns the contact's countrycode, (1541859685@c.us) => (1)`
133.       `* @returns {Promise&lt;string>}`
134.       `*/`
135.      `async getCountryCode() {`
136.          `return await this.client.getCountryCode(this.id._serialized);`
137.      `}`

139.      `/**`
140.       `* Returns the Chat that corresponds to this Contact.` 
141.       `* Will return null when getting chat for currently logged in user.`
142.       `* @returns {Promise&lt;Chat>}`
143.       `*/`
144.      `async getChat() {`
145.          `if(this.isMe) return null;`

147.          `return await this.client.getChatById(this.id._serialized);`
148.      `}`

150.      `/**`
151.       `* Blocks this contact from WhatsApp`
152.       `* @returns {Promise&lt;boolean>}`
153.       `*/`
154.      `async block() {`
155.          `if(this.isGroup) return false;`

157.          `await this.client.pupPage.evaluate(async (contactId) => {`
158.              `const contact = window.Store.Contact.get(contactId);`
159.              `await window.Store.BlockContact.blockContact({contact});`
160.          `}, this.id._serialized);`

162.          `this.isBlocked = true;`
163.          `return true;`
164.      `}`

166.      `/**`
167.       `* Unblocks this contact from WhatsApp`
168.       `* @returns {Promise&lt;boolean>}`
169.       `*/`
170.      `async unblock() {`
171.          `if(this.isGroup) return false;`

173.          `await this.client.pupPage.evaluate(async (contactId) => {`
174.              `const contact = window.Store.Contact.get(contactId);`
175.              `await window.Store.BlockContact.unblockContact(contact);`
176.          `}, this.id._serialized);`

178.          `this.isBlocked = false;`
179.          `return true;`
180.      `}`

182.      `/**`
183.       `* Gets the Contact's current "about" info. Returns null if you don't have permission to read their status.`
184.       `* @returns {Promise&lt;?string>}`
185.       `*/`
186.      `async getAbout() {`
187.          `const about = await this.client.pupPage.evaluate(async (contactId) => {`
188.              `const wid = window.Store.WidFactory.createWid(contactId);`
189.              `return window.Store.StatusUtils.getStatus({'token':'', 'wid': wid});`
190.          `}, this.id._serialized);`

192.          `if (typeof about.status !== 'string')`
193.              `return null;`

195.          `return about.status;`
196.      `}`

198.      `/**`
199.       `* Gets the Contact's common groups with you. Returns empty array if you don't have any common group.`
200.       `* @returns {Promise&lt;WAWebJS.ChatId[]>}`
201.       `*/`
202.      `async getCommonGroups() {`
203.          `return await this.client.getCommonGroups(this.id._serialized);`
204.      `}`

206.      `/**`
207.       `* Gets the Contact's current status broadcast.`
208.       `* @returns {Promise&lt;Broadcast>}`
209.      `*/`
210.      `async getBroadcast() {`
211.          `return await this.client.getBroadcastById(this.id._serialized);`
212.      `}`
213.  `}`

215.  `module.exports = Contact;`