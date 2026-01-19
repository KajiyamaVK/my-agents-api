Source: https://docs.wwebjs.dev/structures_Product.js.html#source-line-10

1.  `'use strict';`

3.  `const Base = require('./Base');`
4.  `const ProductMetadata = require('./ProductMetadata');`

6.  `/**`
7.   `* Represents a Product on WhatsAppBusiness`
8.   `* @extends {Base}`
9.   `*/`
10.  `class Product extends Base {`
11.      `constructor(client, data) {`
12.          `super(client);`

14.          `if (data) this._patch(data);`
15.      `}`

17.      `_patch(data) {`
18.          `/**`
19.           `* Product ID`
20.           `* @type {string}`
21.           `*/`
22.          `this.id = data.id;`
23.          `/**`
24.           `* Price`
25.           `* @type {string}`
26.           `*/`
27.          `this.price = data.price ? data.price : '';`
28.          `/**`
29.           `* Product Thumbnail`
30.           `* @type {string}`
31.           `*/`
32.          `this.thumbnailUrl = data.thumbnailUrl;`
33.          `/**`
34.           `* Currency`
35.           `* @type {string}`
36.           `*/`
37.          `this.currency = data.currency;`
38.          `/**`
39.           `* Product Name`
40.           `* @type {string}`
41.           `*/`
42.          `this.name = data.name;`
43.          `/**`
44.           `* Product Quantity`
45.           `* @type {number}`
46.           `*/`
47.          `this.quantity = data.quantity;`
48.          `/** Product metadata */`
49.          `this.data = null;`
50.          `return super._patch(data);`
51.      `}`

53.      `async getData() {`
54.          `if (this.data === null) {`
55.              `let result = await this.client.pupPage.evaluate((productId) => {`
56.                  `return window.WWebJS.getProductMetadata(productId);`
57.              `}, this.id);`
58.              `if (!result) {`
59.                  `this.data = undefined;`
60.              `} else {`
61.                  `this.data = new ProductMetadata(this.client, result);`
62.              `}`
63.          `}`
64.          `return this.data;`
65.      `}`
66.  `}`

68.  `module.exports = Product;`