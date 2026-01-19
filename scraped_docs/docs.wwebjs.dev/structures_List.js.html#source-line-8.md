Source: https://docs.wwebjs.dev/structures_List.js.html#source-line-8

1.  `'use strict';`

3.  `const Util = require('../util/Util');`

5.  `/**`
6.   `* Message type List`
7.   `*/`
8.  `class List {`
9.      `/**`
10.       `* @param {string} body`
11.       `* @param {string} buttonText`
12.       `* @param {Array&lt;any>} sections`
13.       `* @param {string?} title`
14.       `* @param {string?} footer`
15.       `*/`
16.      `constructor(body, buttonText, sections, title, footer) {`
17.          `/**`
18.           `* Message body`
19.           `* @type {string}`
20.           `*/`
21.          `this.description = body;`

23.          `/**`
24.           `* List button text`
25.           `* @type {string}`
26.           `*/`
27.          `this.buttonText = buttonText;`

29.          `/**`
30.           `* title of message`
31.           `* @type {string}`
32.           `*/`
33.          `this.title = title;`

36.          `/**`
37.           `* footer of message`
38.           `* @type {string}`
39.           `*/`
40.          `this.footer = footer;`

42.          `/**`
43.           `* sections of message`
44.           `* @type {Array&lt;any>}`
45.           `*/`
46.          `this.sections = this._format(sections);`

48.      `}`

50.      `/**`
51.       `* Creates section array from simple array`
52.       `* @param {Array&lt;any>} sections`
53.       `* @returns {Array&lt;any>}`
54.       `* @example`
55.       `* Input: [{title:'sectionTitle',rows:[{id:'customId', title:'ListItem2', description: 'desc'},{title:'ListItem2'}]}}]`
56.       `* Returns: [{'title':'sectionTitle','rows':[{'rowId':'customId','title':'ListItem1','description':'desc'},{'rowId':'oGSRoD','title':'ListItem2','description':''}]}]`
57.       `*/`
58.      `_format(sections){`
59.          `if(!sections.length){throw '[LT02] List without sections';}`
60.          `if(sections.length > 1 &amp;&amp; sections.filter(s => typeof s.title == 'undefined').length > 1){throw '[LT05] You can\'t have more than one empty title.';}`
61.          `return sections.map( (section) =>{`
62.              `if(!section.rows.length){throw '[LT03] Section without rows';}`
63.              `return {`
64.                  `title: section.title ? section.title : undefined,`
65.                  `rows: section.rows.map( (row) => {`
66.                      `if(!row.title){throw '[LT04] Row without title';}`
67.                      `return {`
68.                          `rowId: row.id ? row.id : Util.generateHash(6),`
69.                          `title: row.title,`
70.                          `description: row.description ? row.description : ''`
71.                      `};`
72.                  `})`
73.              `};`
74.          `});`
75.      `}`

77.  `}`

79.  `module.exports = List;`