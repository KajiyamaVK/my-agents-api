Source: https://docs.wwebjs.dev/structures_Order.js.html#source-line-10

1.  `'use strict';`

3.  `const Base = require('./Base');`
4.  `const Product = require('./Product');`

6.  `/**`
7.   `* Represents a Order on WhatsApp`
8.   `* @extends {Base}`
9.   `*/`
10.  `class Order extends Base {`
11.      `constructor(client, data) {`
12.          `super(client);`

14.          `if (data) this._patch(data);`
15.      `}`

17.      `_patch(data) {`
18.          `/**`
19.           `* List of products`
20.           `* @type {Array&lt;Product>}`
21.           `*/`
22.          `if (data.products) {`
23.              `this.products = data.products.map(product => new Product(this.client, product));`
24.          `}`
25.          `/**`
26.           `* Order Subtotal`
27.           `* @type {string}`
28.           `*/`
29.          `this.subtotal = data.subtotal;`
30.          `/**`
31.           `* Order Total`
32.           `* @type {string}`
33.           `*/`
34.          `this.total = data.total;`
35.          `/**`
36.           `* Order Currency`
37.           `* @type {string}`
38.           `*/`
39.          `this.currency = data.currency;`
40.          `/**`
41.           `* Order Created At`
42.           `* @type {number}`
43.           `*/`
44.          `this.createdAt = data.createdAt;`

46.          `return super._patch(data);`
47.      `}`

50.  `}`

52.  `module.exports = Order;`