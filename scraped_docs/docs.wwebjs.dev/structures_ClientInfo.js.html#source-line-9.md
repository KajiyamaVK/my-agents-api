Source: https://docs.wwebjs.dev/structures_ClientInfo.js.html#source-line-9

1.  `'use strict';`

3.  `const Base = require('./Base');`

5.  `/**`
6.   `* Current connection information`
7.   `* @extends {Base}`
8.   `*/`
9.  `class ClientInfo extends Base {`
10.      `constructor(client, data) {`
11.          `super(client);`

13.          `if (data) this._patch(data);`
14.      `}`

16.      `_patch(data) {`
17.          `/**`
18.           `* Name configured to be shown in push notifications`
19.           `* @type {string}`
20.           `*/`
21.          `this.pushname = data.pushname;`

23.          `/**`
24.           `* Current user ID`
25.           `* @type {object}`
26.           `*/`
27.          `this.wid = data.wid;`

29.          `/**`
30.           `* @type {object}`
31.           `* @deprecated Use .wid instead`
32.           `*/`
33.          `this.me = data.wid;`

35.          `/**`
36.           `* Information about the phone this client is connected to. Not available in multi-device.`
37.           `* @type {object}`
38.           `* @property {string} wa_version WhatsApp Version running on the phone`
39.           `* @property {string} os_version OS Version running on the phone (iOS or Android version)`
40.           `* @property {string} device_manufacturer Device manufacturer`
41.           `* @property {string} device_model Device model`
42.           `* @property {string} os_build_number OS build number`
43.           `* @deprecated`
44.           `*/`
45.          `this.phone = data.phone;`

47.          `/**`
48.           `* Platform WhatsApp is running on`
49.           `* @type {string}`
50.           `*/`
51.          `this.platform = data.platform;`

53.          `return super._patch(data);`
54.      `}`

56.      `/**`
57.       `* Get current battery percentage and charging status for the attached device`
58.       `* @returns {object} batteryStatus`
59.       `* @returns {number} batteryStatus.battery - The current battery percentage`
60.       `* @returns {boolean} batteryStatus.plugged - Indicates if the phone is plugged in (true) or not (false)`
61.       `* @deprecated`
62.       `*/`
63.      `async getBatteryStatus() {`
64.          `return await this.client.pupPage.evaluate(() => {`
65.              `const { battery, plugged } = window.Store.Conn;`
66.              `return { battery, plugged };`
67.          `});`
68.      `}`
69.  `}`

71.  `module.exports = ClientInfo;`