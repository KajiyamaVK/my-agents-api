Source: https://docs.wwebjs.dev/util_InterfaceController.js.html#source-line-6

1.  `'use strict';`

3.  `/**`
4.   `* Interface Controller`
5.   `*/`
6.  `class InterfaceController {`

8.      `constructor(props) {`
9.          `this.pupPage = props.pupPage;`
10.      `}`

12.      `/**`
13.       `* Opens the Chat Window`
14.       `* @param {string} chatId ID of the chat window that will be opened`
15.       `*/`
16.      `async openChatWindow(chatId) {`
17.          `return await this.pupPage.evaluate(async (chatId) => {`
18.              `const chat = await window.WWebJS.getChat(chatId, { getAsModel: false });`
19.              `return await window.Store.Cmd.openChatBottom({'chat':chat});`
20.          `}, chatId);`
21.      `}`

23.      `/**`
24.       `* Opens the Chat Drawer`
25.       `* @param {string} chatId ID of the chat drawer that will be opened`
26.       `*/`
27.      `async openChatDrawer(chatId) {`
28.          `await this.pupPage.evaluate(async chatId => {`
29.              `let chat = await window.WWebJS.getChat(chatId, { getAsModel: false });`
30.              `await window.Store.Cmd.openDrawerMid(chat);`
31.          `}, chatId);`
32.      `}`

34.      `/**`
35.       `* Opens the Chat Search`
36.       `* @param {string} chatId ID of the chat search that will be opened`
37.       `*/`
38.      `async openChatSearch(chatId) {`
39.          `await this.pupPage.evaluate(async chatId => {`
40.              `let chat = await window.WWebJS.getChat(chatId, { getAsModel: false });`
41.              `await window.Store.Cmd.chatSearch(chat);`
42.          `}, chatId);`
43.      `}`

45.      `/**`
46.       `* Opens or Scrolls the Chat Window to the position of the message`
47.       `* @param {string} msgId ID of the message that will be scrolled to`
48.       `*/`
49.      `async openChatWindowAt(msgId) {`
50.          `await this.pupPage.evaluate(async (msgId) => {`
51.              `const msg = window.Store.Msg.get(msgId) || (await window.Store.Msg.getMessagesById([msgId]))?.messages?.[0];`
52.              `const chat = window.Store.Chat.get(msg.id.remote) ?? await window.Store.Chat.find(msg.id.remote);`
53.              `const searchContext = await window.Store.SearchContext.getSearchContext(chat, msg.id);`
54.              `await window.Store.Cmd.openChatAt({ chat: chat, msgContext: searchContext });`
55.          `}, msgId);`
56.      `}`

58.      `/**`
59.       `* Opens the Message Drawer`
60.       `* @param {string} msgId ID of the message drawer that will be opened`
61.       `*/`
62.      `async openMessageDrawer(msgId) {`
63.          `await this.pupPage.evaluate(async msgId => {`
64.              `const msg = window.Store.Msg.get(msgId) || (await window.Store.Msg.getMessagesById([msgId]))?.messages?.[0];`
65.              `await window.Store.Cmd.msgInfoDrawer(msg);`
66.          `}, msgId);`
67.      `}`

69.      `/**`
70.       `* Closes the Right Drawer`
71.       `*/`
72.      `async closeRightDrawer() {`
73.          `await this.pupPage.evaluate(async () => {`
74.              `await window.Store.DrawerManager.closeDrawerRight();`
75.          `});`
76.      `}`

78.      `/**`
79.       `* Get all Features`
80.       `*/`
81.      `async getFeatures() {`
82.          `return await this.pupPage.evaluate(() => {`
83.              `if(!window.Store.Features) throw new Error('This version of Whatsapp Web does not support features');`
84.              `return window.Store.Features.F;`
85.          `});`
86.      `}`

88.      `/**`
89.       `* Check if Feature is enabled`
90.       `* @param {string} feature status to check`
91.       `*/`
92.      `async checkFeatureStatus(feature) {`
93.          `return await this.pupPage.evaluate((feature) => {`
94.              `if(!window.Store.Features) throw new Error('This version of Whatsapp Web does not support features');`
95.              `return window.Store.Features.supportsFeature(feature);`
96.          `}, feature);`
97.      `}`

99.      `/**`
100.       `* Enable Features`
101.       `* @param {string[]} features to be enabled`
102.       `*/`
103.      `async enableFeatures(features) {`
104.          `await this.pupPage.evaluate((features) => {`
105.              `if(!window.Store.Features) throw new Error('This version of Whatsapp Web does not support features');`
106.              `for (const feature in features) {`
107.                  `window.Store.Features.setFeature(features[feature], true);`
108.              `}`
109.          `}, features);`
110.      `}`

112.      `/**`
113.       `* Disable Features`
114.       `* @param {string[]} features to be disabled`
115.       `*/`
116.      `async disableFeatures(features) {`
117.          `await this.pupPage.evaluate((features) => {`
118.              `if(!window.Store.Features) throw new Error('This version of Whatsapp Web does not support features');`
119.              `for (const feature in features) {`
120.                  `window.Store.Features.setFeature(features[feature], false);`
121.              `}`
122.          `}, features);`
123.      `}`
124.  `}`

126.  `module.exports = InterfaceController;`