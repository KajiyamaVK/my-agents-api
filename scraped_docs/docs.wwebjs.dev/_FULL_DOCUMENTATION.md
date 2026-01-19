# Full Documentation for docs.wwebjs.dev
Generated on: 2026-01-18T22:15:04.122Z



--- END OF FILE: Base.html.md ---
--- START OF FILE: Base.html.md ---

Source: https://docs.wwebjs.dev/Base.html

## new Base()

--- END OF FILE: BaseAuthStrategy.html.md ---
--- START OF FILE: BaseAuthStrategy.html.md ---

Source: https://docs.wwebjs.dev/BaseAuthStrategy.html

## new BaseAuthStrategy()

--- END OF FILE: Broadcast.html.md ---
--- START OF FILE: Broadcast.html.md ---

Source: https://docs.wwebjs.dev/Broadcast.html

## Properties

[id](Broadcast.html#id)

[msgs](Broadcast.html#msgs)

[timestamp](Broadcast.html#timestamp)

[totalCount](Broadcast.html#totalCount)

[unreadCount](Broadcast.html#unreadCount)

## Methods

[getChat()](Broadcast.html#getChat)

[getContact()](Broadcast.html#getContact)

## new Broadcast()

Extends

[Base](Base.html)

## Properties

### id  object

ID that represents the chat

### msgs  Array of [Message](Message.html)

Messages statuses

### timestamp  number

Unix timestamp of last status

### totalCount  number

Number of available statuses

### unreadCount  number

Number of not viewed

## Methods

### getChat() → Promise containing [Chat](Chat.html)

Returns the Chat this message was sent in

Returns

`Promise containing [Chat](Chat.html)` 

### getContact() → Promise containing [Contact](Contact.html)

Returns the Contact this message was sent from

Returns

`Promise containing [Contact](Contact.html)`

--- END OF FILE: BusinessContact.html.md ---
--- START OF FILE: BusinessContact.html.md ---

Source: https://docs.wwebjs.dev/BusinessContact.html

## Properties

[businessProfile](BusinessContact.html#businessProfile)

[id](BusinessContact.html#id)

[isBlocked](BusinessContact.html#isBlocked)

[isBusiness](BusinessContact.html#isBusiness)

[isEnterprise](BusinessContact.html#isEnterprise)

[isGroup](BusinessContact.html#isGroup)

[isMe](BusinessContact.html#isMe)

[isMyContact](BusinessContact.html#isMyContact)

[isUser](BusinessContact.html#isUser)

[isWAContact](BusinessContact.html#isWAContact)

[name](BusinessContact.html#name)

[number](BusinessContact.html#number)

[pushname](BusinessContact.html#pushname)

[shortName](BusinessContact.html#shortName)

## Methods

[block()](BusinessContact.html#block)

[getAbout()](BusinessContact.html#getAbout)

[getBroadcast()](BusinessContact.html#getBroadcast)

[getChat()](BusinessContact.html#getChat)

[getCommonGroups()](BusinessContact.html#getCommonGroups)

[getCountryCode()](BusinessContact.html#getCountryCode)

[getFormattedNumber()](BusinessContact.html#getFormattedNumber)

[getProfilePicUrl()](BusinessContact.html#getProfilePicUrl)

[unblock()](BusinessContact.html#unblock)

## new BusinessContact()

Extends

[Contact](Contact.html)

## Properties

### businessProfile

The contact's business profile

### id  unknown

ID that represents the contact

Inherited from

[Contact#id](Contact.html#id)

### isBlocked  unknown

Indicates if you have blocked this contact

Inherited from

[Contact#isBlocked](Contact.html#isBlocked)

### isBusiness  unknown

Indicates if the contact is a business contact

Inherited from

[Contact#isBusiness](Contact.html#isBusiness)

### isEnterprise  unknown

Indicates if the contact is an enterprise contact

Inherited from

[Contact#isEnterprise](Contact.html#isEnterprise)

### isGroup  unknown

Indicates if the contact is a group contact

Inherited from

[Contact#isGroup](Contact.html#isGroup)

### isMe  unknown

Indicates if the contact is the current user's contact

Inherited from

[Contact#isMe](Contact.html#isMe)

### isMyContact  unknown

Indicates if the number is saved in the current phone's contacts

Inherited from

[Contact#isMyContact](Contact.html#isMyContact)

### isUser  unknown

Indicates if the contact is a user contact

Inherited from

[Contact#isUser](Contact.html#isUser)

### isWAContact  unknown

Indicates if the number is registered on WhatsApp

Inherited from

[Contact#isWAContact](Contact.html#isWAContact)

### name  unknown

The contact's name, as saved by the current user

Inherited from

[Contact#name](Contact.html#name)

### number  unknown

Contact's phone number

Inherited from

[Contact#number](Contact.html#number)

### pushname  unknown

The name that the contact has configured to be shown publically

Inherited from

[Contact#pushname](Contact.html#pushname)

### shortName  unknown

A shortened version of name

Inherited from

[Contact#shortName](Contact.html#shortName)

## Methods

async

### block() → Promise containing boolean

Blocks this contact from WhatsApp

Inherited from

[Contact#block](Contact.html#block)

Returns

async

### getAbout() → Promise containing nullable string

Gets the Contact's current "about" info. Returns null if you don't have permission to read their status.

Inherited from

[Contact#getAbout](Contact.html#getAbout)

Returns

async

### getBroadcast() → Promise containing [Broadcast](Broadcast.html)

Gets the Contact's current status broadcast.

Inherited from

[Contact#getBroadcast](Contact.html#getBroadcast)

Returns

async

### getChat() → Promise containing [Chat](Chat.html)

Returns the Chat that corresponds to this Contact. Will return null when getting chat for currently logged in user.

Inherited from

[Contact#getChat](Contact.html#getChat)

Returns

async

### getCommonGroups() → Promise containing Array of WAWebJS.ChatId

Gets the Contact's common groups with you. Returns empty array if you don't have any common group.

Inherited from

[Contact#getCommonGroups](Contact.html#getCommonGroups)

Returns

async

### getCountryCode() → Promise containing string

Returns the contact's countrycode, (1541859685@c.us) => (1)

Inherited from

[Contact#getCountryCode](Contact.html#getCountryCode)

Returns

async

### getFormattedNumber() → Promise containing string

Returns the contact's formatted phone number, (12345678901@c.us) => (+1 (234) 5678-901)

Inherited from

[Contact#getFormattedNumber](Contact.html#getFormattedNumber)

Returns

async

### getProfilePicUrl() → Promise containing string

Returns the contact's profile picture URL, if privacy settings allow it

Inherited from

[Contact#getProfilePicUrl](Contact.html#getProfilePicUrl)

Returns

async

### unblock() → Promise containing boolean

Unblocks this contact from WhatsApp

Inherited from

[Contact#unblock](Contact.html#unblock)

Returns

--- END OF FILE: Buttons.html.md ---
--- START OF FILE: Buttons.html.md ---

Source: https://docs.wwebjs.dev/Buttons.html

## Properties

[body](Buttons.html#body)

[buttons](Buttons.html#buttons)

[footer](Buttons.html#footer)

[title](Buttons.html#title)

## Method

[\_format(buttons)](Buttons.html#_format)

## new Buttons(body, buttons, title, footer)

### Parameters

Name

Type

Optional

Description

body

buttons

See [`ButtonSpec`](global.html#ButtonSpec)

title

Value can be null.

footer

Value can be null.

## Properties

### body  (string or [MessageMedia](MessageMedia.html))

Message body

### buttons  Array of [FormattedButtonSpec](global.html#FormattedButtonSpec)

buttons of message

### footer  string

footer of message

### title  string

title of message

## Method

### \_format(buttons) → Array of [FormattedButtonSpec](global.html#FormattedButtonSpec)

Creates button array from simple array

#### Example

```
Input: [{id:'customId',body:'button1'},{body:'button2'},{body:'button3'},{body:'button4'}]
Returns: [{ buttonId:'customId',buttonText:{'displayText':'button1'},type: 1 },{buttonId:'n3XKsL',buttonText:{'displayText':'button2'},type:1},{buttonId:'NDJk0a',buttonText:{'displayText':'button3'},type:1}]
```

#### Parameter

Name

Type

Optional

Description

buttons

Array of [ButtonSpec](global.html#ButtonSpec)

Returns

`Array of [FormattedButtonSpec](global.html#FormattedButtonSpec)`

--- END OF FILE: Call.html.md ---
--- START OF FILE: Call.html.md ---

Source: https://docs.wwebjs.dev/Call.html

## Properties

[canHandleLocally](Call.html#canHandleLocally)

[from](Call.html#from)

[fromMe](Call.html#fromMe)

[id](Call.html#id)

[isGroup](Call.html#isGroup)

[isVideo](Call.html#isVideo)

[participants](Call.html#participants)

[timestamp](Call.html#timestamp)

[webClientShouldHandle](Call.html#webClientShouldHandle)

## Method

[reject()](Call.html#reject)

## new Call()

Extends

[Base](Base.html)

## Properties

### canHandleLocally  boolean

Indicates if the call can be handled in waweb

### from  string

From

### fromMe  boolean

Indicates if the call was sent by the current user

### id  string

Call ID

### isGroup  boolean

Is Group

### isVideo  boolean

Is video

### participants  object

Object with participants

### timestamp  number

Unix timestamp for when the call was created

### webClientShouldHandle  boolean

Indicates if the call Should be handled in waweb

## Method

async

### reject()

Reject the call

--- END OF FILE: Channel.html.md ---
--- START OF FILE: Channel.html.md ---

Source: https://docs.wwebjs.dev/Channel.html

## Properties

[description](Channel.html#description)

[id](Channel.html#id)

[isChannel](Channel.html#isChannel)

[isGroup](Channel.html#isGroup)

[isMuted](Channel.html#isMuted)

[isReadOnly](Channel.html#isReadOnly)

[lastMessage](Channel.html#lastMessage)

[muteExpiration](Channel.html#muteExpiration)

[name](Channel.html#name)

[timestamp](Channel.html#timestamp)

[unreadCount](Channel.html#unreadCount)

## Methods

[\_muteUnmuteChannel(action)](Channel.html#_muteUnmuteChannel)

[\_setChannelMetadata(value, property)](Channel.html#_setChannelMetadata)

[acceptChannelAdminInvite()](Channel.html#acceptChannelAdminInvite)

[deleteChannel()](Channel.html#deleteChannel)

[demoteChannelAdmin(userId)](Channel.html#demoteChannelAdmin)

[fetchMessages(searchOptions)](Channel.html#fetchMessages)

[getSubscribers(limit)](Channel.html#getSubscribers)

[mute()](Channel.html#mute)

[revokeChannelAdminInvite(userId)](Channel.html#revokeChannelAdminInvite)

[sendChannelAdminInvite(chatId, options)](Channel.html#sendChannelAdminInvite)

[sendMessage(content, options)](Channel.html#sendMessage)

[sendSeen()](Channel.html#sendSeen)

[setDescription(newDescription)](Channel.html#setDescription)

[setProfilePicture(newProfilePicture)](Channel.html#setProfilePicture)

[setReactionSetting(reactionCode)](Channel.html#setReactionSetting)

[setSubject(newSubject)](Channel.html#setSubject)

[transferChannelOwnership(newOwnerId, options)](Channel.html#transferChannelOwnership)

[unmute()](Channel.html#unmute)

## new Channel()

Extends

[Base](Base.html)

## Properties

### description  string

The channel description

### id  [ChannelId](global.html#ChannelId)

ID that represents the channel

### isChannel  boolean

Indicates if it is a Channel

### isGroup  boolean

Indicates if it is a Group

### isMuted  boolean

Indicates if the channel is muted or not

### isReadOnly  boolean

Indicates if the channel is readonly

### lastMessage  [Message](Message.html)

Last message in the channel

### muteExpiration  number

Unix timestamp for when the mute expires

### name  string

Title of the channel

### timestamp  number

Unix timestamp for when the last activity occurred

### unreadCount  number

Amount of messages unread

## Methods

async

### \_muteUnmuteChannel(action) → Promise containing boolean

Internal method to mute or unmute the channel

#### Parameter

Name

Type

Optional

Description

action

string

The action: 'MUTE' or 'UNMUTE'

Returns

`Promise containing boolean` 

Returns true if the operation completed successfully, false otherwise

async

### \_setChannelMetadata(value, property) → Promise containing boolean

Internal method to change the channel metadata

#### Parameters

Name

Type

Optional

Description

value

(string, number, or [MessageMedia](MessageMedia.html))

The new value to set

property

string

The property of a channel metadata to change

Returns

`Promise containing boolean` 

Returns true if the operation completed successfully, false otherwise

async

### acceptChannelAdminInvite() → Promise containing boolean

Accepts a channel admin invitation and promotes the current user to a channel admin

Returns

`Promise containing boolean` 

Returns true if the operation completed successfully, false otherwise

async

### deleteChannel() → Promise containing boolean

Deletes the channel you created

Returns

`Promise containing boolean` 

Returns true if the operation completed successfully, false otherwise

async

### demoteChannelAdmin(userId) → Promise containing boolean

Demotes a channel admin to a regular subscriber (can be used also for self-demotion)

#### Parameter

Name

Type

Optional

Description

userId

string

The user ID to demote

Returns

`Promise containing boolean` 

Returns true if the operation completed successfully, false otherwise

async

### fetchMessages(searchOptions) → Promise containing Array of [Message](Message.html)

Loads channel messages, sorted from earliest to latest

#### Parameters

Name

Type

Optional

Description

searchOptions

Object

Options for searching messages. Right now only limit and fromMe is supported

Values in `searchOptions` have the following properties:

Name

Type

Optional

Description

limit

Number

Yes

The amount of messages to return. If no limit is specified, the available messages will be returned. Note that the actual number of returned messages may be smaller if there aren't enough messages in the conversation. Set this to Infinity to load all messages

fromMe

Boolean

Yes

Return only messages from the bot number or vise versa. To get all messages, leave the option undefined

Returns

`Promise containing Array of [Message](Message.html)` 

async

### getSubscribers(limit) → Promise containing Array of {contact: [Contact](Contact.html), role: string}

Gets the subscribers of the channel (only those who are in your contact list)

#### Parameter

Name

Type

Optional

Description

limit

number

Optional parameter to specify the limit of subscribers to retrieve

Value can be null.

Returns

`Promise containing Array of {contact: [Contact](Contact.html), role: string}` 

Returns an array of objects that handle the subscribed contacts and their roles in the channel

async

### mute() → Promise containing boolean

Mutes the channel

Returns

`Promise containing boolean` 

Returns true if the operation completed successfully, false otherwise

async

### revokeChannelAdminInvite(userId) → Promise containing boolean

Revokes a channel admin invitation sent to a user by a channel owner

#### Parameter

Name

Type

Optional

Description

userId

string

The user ID the invitation was sent to

Returns

`Promise containing boolean` 

Returns true if the operation completed successfully, false otherwise

async

### sendChannelAdminInvite(chatId, options) → Promise containing boolean

Sends a channel admin invitation to a user, allowing them to become an admin of the channel

#### Parameters

Name

Type

Optional

Description

chatId

string

The ID of a user to send the channel admin invitation to

options

[SendChannelAdminInviteOptions](global.html#SendChannelAdminInviteOptions)

Returns

`Promise containing boolean` 

Returns true if an invitation was sent successfully, false otherwise

async

### sendMessage(content, options) → Promise containing [Message](Message.html)

Sends a message to this channel

#### Parameters

Name

Type

Optional

Description

content

(string or [MessageMedia](MessageMedia.html))

options

[MessageSendOptions](global.html#MessageSendOptions)

Value can be null.

Returns

`Promise containing [Message](Message.html)` 

Message that was just sent

async

### sendSeen() → Promise containing boolean

Sets the channel as seen

Returns

`Promise containing boolean` 

async

### setDescription(newDescription) → Promise containing boolean

Updates the channel description

#### Parameter

Name

Type

Optional

Description

newDescription

string

Returns

`Promise containing boolean` 

Returns true if the operation completed successfully, false otherwise

async

### setProfilePicture(newProfilePicture) → Promise containing boolean

Updates the channel profile picture

#### Parameter

Name

Type

Optional

Description

newProfilePicture

[MessageMedia](MessageMedia.html)

Returns

`Promise containing boolean` 

Returns true if the operation completed successfully, false otherwise

async

### setReactionSetting(reactionCode) → Promise containing boolean

Updates available reactions to use in the channel

Valid values for passing to the method are: 0 for NONE reactions to be avaliable 1 for BASIC reactions to be available: 👍, ❤️, 😂, 😮, 😢, 🙏 2 for ALL reactions to be available

#### Parameter

Name

Type

Optional

Description

reactionCode

number

Returns

`Promise containing boolean` 

Returns true if the operation completed successfully, false otherwise

async

### setSubject(newSubject) → Promise containing boolean

Updates the channel subject

#### Parameter

Name

Type

Optional

Description

newSubject

string

Returns

`Promise containing boolean` 

Returns true if the subject was properly updated. This can return false if the user does not have the necessary permissions.

async

### transferChannelOwnership(newOwnerId, options) → Promise containing boolean

Transfers a channel ownership to another user. Note: the user you are transferring the channel ownership to must be a channel admin.

#### Parameters

Name

Type

Optional

Description

newOwnerId

string

options

[TransferChannelOwnershipOptions](global.html#TransferChannelOwnershipOptions)

Returns

`Promise containing boolean` 

Returns true if the operation completed successfully, false otherwise

async

### unmute() → Promise containing boolean

Unmutes the channel

Returns

`Promise containing boolean` 

Returns true if the operation completed successfully, false otherwise

--- END OF FILE: Chat.html.md ---
--- START OF FILE: Chat.html.md ---

Source: https://docs.wwebjs.dev/Chat.html

## Properties

[archived](Chat.html#archived)

[id](Chat.html#id)

[isGroup](Chat.html#isGroup)

[isMuted](Chat.html#isMuted)

[isReadOnly](Chat.html#isReadOnly)

[lastMessage](Chat.html#lastMessage)

[muteExpiration](Chat.html#muteExpiration)

[name](Chat.html#name)

[pinned](Chat.html#pinned)

[timestamp](Chat.html#timestamp)

[unreadCount](Chat.html#unreadCount)

## Methods

[addOrEditCustomerNote(note)](Chat.html#addOrEditCustomerNote)

[archive()](Chat.html#archive)

[changeLabels(labelIds)](Chat.html#changeLabels)

[clearMessages()](Chat.html#clearMessages)

[clearState()](Chat.html#clearState)

[delete()](Chat.html#delete)

[fetchMessages(searchOptions)](Chat.html#fetchMessages)

[getContact()](Chat.html#getContact)

[getCustomerNote()](Chat.html#getCustomerNote)

[getLabels()](Chat.html#getLabels)

[getPinnedMessages()](Chat.html#getPinnedMessages)

[markUnread()](Chat.html#markUnread)

[mute(unmuteDate)](Chat.html#mute)

[pin()](Chat.html#pin)

[sendMessage(content\[, options\])](Chat.html#sendMessage)

[sendSeen()](Chat.html#sendSeen)

[sendStateRecording()](Chat.html#sendStateRecording)

[sendStateTyping()](Chat.html#sendStateTyping)

[syncHistory()](Chat.html#syncHistory)

[unarchive()](Chat.html#unarchive)

[unmute()](Chat.html#unmute)

[unpin()](Chat.html#unpin)

## new Chat()

Extends

[Base](Base.html)

## Properties

### archived  boolean

Indicates if the Chat is archived

### id  object

ID that represents the chat

### isGroup  boolean

Indicates if the Chat is a Group Chat

### isMuted  boolean

Indicates if the chat is muted or not

### isReadOnly  boolean

Indicates if the Chat is readonly

### lastMessage  [Message](Message.html)

Last message fo chat

### muteExpiration  number

Unix timestamp for when the mute expires

### name  string

Title of the chat

### pinned  boolean

Indicates if the Chat is pinned

### timestamp  number

Unix timestamp for when the last activity occurred

### unreadCount  number

Amount of messages unread

## Methods

async

### addOrEditCustomerNote(note) → Promise containing void

Add or edit a customer note

#### Parameter

Name

Type

Optional

Description

note

string

The note to add

See also

[https://faq.whatsapp.com/1433099287594476](https://faq.whatsapp.com/1433099287594476)

Returns

`Promise containing void` 

async

### archive()

Archives this chat

async

### changeLabels(labelIds) → Promise containing void

Add or remove labels to this Chat

#### Parameter

Name

Type

Optional

Description

labelIds

Array of (number or string)

Returns

`Promise containing void` 

async

### clearMessages() → Promise containing boolean

Clears all messages from the chat

Returns

`Promise containing boolean` 

result

async

### clearState()

Stops typing or recording in chat immediately.

async

### delete() → Promise containing Boolean

Deletes the chat

Returns

`Promise containing Boolean` 

result

async

### fetchMessages(searchOptions) → Promise containing Array of [Message](Message.html)

Loads chat messages, sorted from earliest to latest.

#### Parameters

Name

Type

Optional

Description

searchOptions

Object

Options for searching messages. Right now only limit and fromMe is supported.

Values in `searchOptions` have the following properties:

Name

Type

Optional

Description

limit

Number

Yes

The amount of messages to return. If no limit is specified, the available messages will be returned. Note that the actual number of returned messages may be smaller if there aren't enough messages in the conversation. Set this to Infinity to load all messages.

fromMe

Boolean

Yes

Return only messages from the bot number or vise versa. To get all messages, leave the option undefined.

Returns

`Promise containing Array of [Message](Message.html)` 

async

### getContact() → Promise containing [Contact](Contact.html)

Returns the Contact that corresponds to this Chat.

Returns

`Promise containing [Contact](Contact.html)` 

async

### getCustomerNote() → Promise containing {chatId: string, content: string, createdAt: number, id: string, modifiedAt: number, type: string}

Get a customer note

See also

[https://faq.whatsapp.com/1433099287594476](https://faq.whatsapp.com/1433099287594476)

Returns

`Promise containing {chatId: string, content: string, createdAt: number, id: string, modifiedAt: number, type: string}` 

async

### getLabels() → Promise containing Array of [Label](Label.html)

Returns array of all Labels assigned to this Chat

Returns

`Promise containing Array of [Label](Label.html)` 

async

### getPinnedMessages() → Promise containing Array of [Message](Message.html)

Gets instances of all pinned messages in a chat

Returns

`Promise containing Array of [Message](Message.html)` 

async

### markUnread()

Mark this chat as unread

async

### mute(unmuteDate) → Promise containing {isMuted: boolean, muteExpiration: number}

Mutes this chat forever, unless a date is specified

#### Parameter

Name

Type

Optional

Description

unmuteDate

Date

Date when the chat will be unmuted, don't provide a value to mute forever

Value can be null.

Returns

`Promise containing {isMuted: boolean, muteExpiration: number}` 

async

### pin() → Promise containing boolean

Pins this chat

Returns

`Promise containing boolean` 

New pin state. Could be false if the max number of pinned chats was reached.

async

### sendMessage(content\[, options\]) → Promise containing [Message](Message.html)

Send a message to this chat

#### Parameters

Name

Type

Optional

Description

content

(string, [MessageMedia](MessageMedia.html), or [Location](Location.html))

options

[MessageSendOptions](global.html#MessageSendOptions)

Yes

Returns

`Promise containing [Message](Message.html)` 

Message that was just sent

async

### sendSeen() → Promise containing Boolean

Sets the chat as seen

Returns

`Promise containing Boolean` 

result

async

### sendStateRecording()

Simulate recording audio in chat. This will last for 25 seconds.

async

### sendStateTyping()

Simulate typing in chat. This will last for 25 seconds.

async

### syncHistory() → Promise containing boolean

Sync chat history conversation

Returns

`Promise containing boolean` 

True if operation completed successfully, false otherwise.

async

### unarchive()

un-archives this chat

async

### unmute() → Promise containing {isMuted: boolean, muteExpiration: number}

Unmutes this chat

Returns

`Promise containing {isMuted: boolean, muteExpiration: number}` 

async

### unpin() → Promise containing boolean

Unpins this chat

Returns

`Promise containing boolean` 

New pin state

--- END OF FILE: Client.html.md ---
--- START OF FILE: Client.html.md ---

Source: https://docs.wwebjs.dev/Client.html

## Properties

[info](Client.html#info)

[pupBrowser](Client.html#pupBrowser)

[pupPage](Client.html#pupPage)

## Methods

[\_muteUnmuteChat(chatId, action, unmuteDateTs)](Client.html#_muteUnmuteChat)

[acceptChannelAdminInvite(channelId)](Client.html#acceptChannelAdminInvite)

[acceptGroupV4Invite(inviteInfo)](Client.html#acceptGroupV4Invite)

[acceptInvite(inviteCode)](Client.html#acceptInvite)

[addOrEditCustomerNote(userId, note)](Client.html#addOrEditCustomerNote)

[addOrRemoveLabels(labelIds, chatIds)](Client.html#addOrRemoveLabels)

[approveGroupMembershipRequests(groupId, options)](Client.html#approveGroupMembershipRequests)

[archiveChat()](Client.html#archiveChat)

[attachEventListeners()](Client.html#attachEventListeners)

[createCallLink(startTime, callType)](Client.html#createCallLink)

[createChannel(title, options)](Client.html#createChannel)

[createGroup(title, participants, options)](Client.html#createGroup)

[deleteAddressbookContact(phoneNumber)](Client.html#deleteAddressbookContact)

[deleteChannel(channelId)](Client.html#deleteChannel)

[deleteProfilePicture()](Client.html#deleteProfilePicture)

[demoteChannelAdmin(channelId, userId)](Client.html#demoteChannelAdmin)

[destroy()](Client.html#destroy)

[getBlockedContacts()](Client.html#getBlockedContacts)

[getBroadcastById(contactId)](Client.html#getBroadcastById)

[getBroadcasts()](Client.html#getBroadcasts)

[getChannelByInviteCode(inviteCode)](Client.html#getChannelByInviteCode)

[getChannels()](Client.html#getChannels)

[getChatById(chatId)](Client.html#getChatById)

[getChatLabels(chatId)](Client.html#getChatLabels)

[getChats()](Client.html#getChats)

[getChatsByLabelId(labelId)](Client.html#getChatsByLabelId)

[getCommonGroups(contactId)](Client.html#getCommonGroups)

[getContactById(contactId)](Client.html#getContactById)

[getContactDeviceCount(userId)](Client.html#getContactDeviceCount)

[getContactLidAndPhone(userIds)](Client.html#getContactLidAndPhone)

[getContacts()](Client.html#getContacts)

[getCountryCode(number)](Client.html#getCountryCode)

[getCustomerNote(userId)](Client.html#getCustomerNote)

[getFormattedNumber(number)](Client.html#getFormattedNumber)

[getGroupMembershipRequests(groupId)](Client.html#getGroupMembershipRequests)

[getInviteInfo(inviteCode)](Client.html#getInviteInfo)

[getLabelById(labelId)](Client.html#getLabelById)

[getLabels()](Client.html#getLabels)

[getMessageById(messageId)](Client.html#getMessageById)

[getNumberId(number)](Client.html#getNumberId)

[getPinnedMessages(chatId)](Client.html#getPinnedMessages)

[getPollVotes(messageId)](Client.html#getPollVotes)

[getProfilePicUrl(contactId)](Client.html#getProfilePicUrl)

[getState()](Client.html#getState)

[getWWebVersion()](Client.html#getWWebVersion)

[initialize()](Client.html#initialize)

[inject()](Client.html#inject)

[isRegisteredUser(id)](Client.html#isRegisteredUser)

[logout()](Client.html#logout)

[markChatUnread(chatId)](Client.html#markChatUnread)

[muteChat(chatId, unmuteDate)](Client.html#muteChat)

[pinChat()](Client.html#pinChat)

[rejectGroupMembershipRequests(groupId, options)](Client.html#rejectGroupMembershipRequests)

[requestPairingCode(phoneNumber\[, showNotification\]\[, intervalMs\])](Client.html#requestPairingCode)

[resetState()](Client.html#resetState)

[revokeChannelAdminInvite(channelId, userId)](Client.html#revokeChannelAdminInvite)

[revokeStatusMessage(messageId)](Client.html#revokeStatusMessage)

[saveOrEditAddressbookContact(phoneNumber, firstName, lastName\[, syncToAddressbook\])](Client.html#saveOrEditAddressbookContact)

[searchChannels(searchOptions)](Client.html#searchChannels)

[searchMessages(query\[, options\])](Client.html#searchMessages)

[sendChannelAdminInvite(chatId, channelId, options)](Client.html#sendChannelAdminInvite)

[sendMessage(chatId, content\[, options\])](Client.html#sendMessage)

[sendPresenceAvailable()](Client.html#sendPresenceAvailable)

[sendPresenceUnavailable()](Client.html#sendPresenceUnavailable)

[sendResponseToScheduledEvent(response, eventMessageId)](Client.html#sendResponseToScheduledEvent)

[sendSeen(chatId)](Client.html#sendSeen)

[setAutoDownloadAudio(flag)](Client.html#setAutoDownloadAudio)

[setAutoDownloadDocuments(flag)](Client.html#setAutoDownloadDocuments)

[setAutoDownloadPhotos(flag)](Client.html#setAutoDownloadPhotos)

[setAutoDownloadVideos(flag)](Client.html#setAutoDownloadVideos)

[setBackgroundSync(flag)](Client.html#setBackgroundSync)

[setDisplayName(displayName)](Client.html#setDisplayName)

[setProfilePicture(media)](Client.html#setProfilePicture)

[setStatus(status)](Client.html#setStatus)

[subscribeToChannel(channelId)](Client.html#subscribeToChannel)

[syncHistory(chatId)](Client.html#syncHistory)

[transferChannelOwnership(channelId, newOwnerId, options)](Client.html#transferChannelOwnership)

[unarchiveChat()](Client.html#unarchiveChat)

[unmuteChat(chatId)](Client.html#unmuteChat)

[unpinChat()](Client.html#unpinChat)

[unsubscribeFromChannel(channelId, options)](Client.html#unsubscribeFromChannel)

## Events

[auth\_failure](Client.html#event:auth_failure)

[authenticated](Client.html#event:authenticated)

[change\_battery](Client.html#event:change_battery)

[change\_state](Client.html#event:change_state)

[chat\_archived](Client.html#event:chat_archived)

[chat\_removed](Client.html#event:chat_removed)

[code](Client.html#event:code)

[contact\_changed](Client.html#event:contact_changed)

[disconnected](Client.html#event:disconnected)

[group\_admin\_changed](Client.html#event:group_admin_changed)

[group\_join](Client.html#event:group_join)

[group\_leave](Client.html#event:group_leave)

[group\_membership\_request](Client.html#event:group_membership_request)

[group\_update](Client.html#event:group_update)

[incoming\_call](Client.html#event:incoming_call)

[media\_uploaded](Client.html#event:media_uploaded)

[message](Client.html#event:message)

[message\_ack](Client.html#event:message_ack)

[message\_ciphertext](Client.html#event:message_ciphertext)

[message\_create](Client.html#event:message_create)

[message\_edit](Client.html#event:message_edit)

[message\_reaction](Client.html#event:message_reaction)

[message\_revoke\_everyone](Client.html#event:message_revoke_everyone)

[message\_revoke\_me](Client.html#event:message_revoke_me)

[qr](Client.html#event:qr)

[ready](Client.html#event:ready)

[vote\_update](Client.html#event:vote_update)

## new Client(options)

### Parameters

Name

Type

Optional

Description

options

Client options

Values in `options` have the following properties:

Name

Type

Optional

Description

authStrategy

Determines how to save and restore sessions. Will use LegacySessionAuth if options.session is set. Otherwise, NoAuth will be used.

webVersion

The version of WhatsApp Web to use. Use options.webVersionCache to configure how the version is retrieved.

webVersionCache

Determines how to retrieve the WhatsApp Web version. Defaults to a local cache (LocalWebCache) that falls back to latest if the requested version is not found.

authTimeoutMs

Timeout for authentication selector in puppeteer

evalOnNewDoc

function to eval on new doc

puppeteer

Puppeteer launch options. View docs here: https://github.com/puppeteer/puppeteer/

qrMaxRetries

How many times should the qrcode be refreshed before giving up

restartOnAuthFail

@deprecated This option should be set directly on the LegacySessionAuth.

session

@deprecated Only here for backwards-compatibility. You should move to using LocalAuth, or set the authStrategy to LegacySessionAuth explicitly.

takeoverOnConflict

If another whatsapp web session is detected (another browser), take over the session in the current browser

takeoverTimeoutMs

How much time to wait before taking over the session

userAgent

User agent to use in puppeteer

ffmpegPath

Ffmpeg path to use when formatting videos to webp while sending stickers

bypassCSP

Sets bypassing of page's Content-Security-Policy.

deviceName

Sets the device name of a current linked device., i.e.: 'TEST'.

browserName

Sets the browser name of a current linked device, i.e.: 'Firefox'.

proxyAuthentication

Proxy Authentication object.

Extends

EventEmitter

Fires

[Client#event:qr](Client.html#event:qr)

[Client#event:authenticated](Client.html#event:authenticated)

[Client#event:auth\_failure](Client.html#event:auth_failure)

[Client#event:ready](Client.html#event:ready)

[Client#event:message](Client.html#event:message)

[Client#event:message\_ack](Client.html#event:message_ack)

[Client#event:message\_create](Client.html#event:message_create)

[Client#event:message\_revoke\_me](Client.html#event:message_revoke_me)

[Client#event:message\_revoke\_everyone](Client.html#event:message_revoke_everyone)

[Client#event:message\_ciphertext](Client.html#event:message_ciphertext)

[Client#event:message\_edit](Client.html#event:message_edit)

[Client#event:media\_uploaded](Client.html#event:media_uploaded)

[Client#event:group\_join](Client.html#event:group_join)

[Client#event:group\_leave](Client.html#event:group_leave)

[Client#event:group\_update](Client.html#event:group_update)

[Client#event:disconnected](Client.html#event:disconnected)

[Client#event:change\_state](Client.html#event:change_state)

[Client#event:contact\_changed](Client.html#event:contact_changed)

[Client#event:group\_admin\_changed](Client.html#event:group_admin_changed)

[Client#event:group\_membership\_request](Client.html#event:group_membership_request)

[Client#event:vote\_update](Client.html#event:vote_update)

## Properties

### info  [ClientInfo](ClientInfo.html)

Current connection information

### pupBrowser  puppeteer.Browser

### pupPage  puppeteer.Page

## Methods

async

### \_muteUnmuteChat(chatId, action, unmuteDateTs) → Promise containing {isMuted: boolean, muteExpiration: number}

Internal method to mute or unmute the chat

#### Parameters

Name

Type

Optional

Description

chatId

string

ID of the chat that will be muted/unmuted

action

string

The action: 'MUTE' or 'UNMUTE'

unmuteDateTs

number

Timestamp at which the chat will be unmuted

Returns

`Promise containing {isMuted: boolean, muteExpiration: number}` 

async

### acceptChannelAdminInvite(channelId) → Promise containing boolean

Accepts a channel admin invitation and promotes the current user to a channel admin

#### Parameter

Name

Type

Optional

Description

channelId

string

The channel ID to accept the admin invitation from

Returns

`Promise containing boolean` 

Returns true if the operation completed successfully, false otherwise

async

### acceptGroupV4Invite(inviteInfo) → Promise containing Object

Accepts a private invitation to join a group

#### Parameter

Name

Type

Optional

Description

inviteInfo

object

Invite V4 Info

Returns

`Promise containing Object` 

async

### acceptInvite(inviteCode) → Promise containing string

Accepts an invitation to join a group

#### Parameter

Name

Type

Optional

Description

inviteCode

string

Invitation code

Returns

`Promise containing string` 

Id of the joined Chat

async

### addOrEditCustomerNote(userId, note) → Promise containing void

Add or edit a customer note

#### Parameters

Name

Type

Optional

Description

userId

string

The ID of a customer to add a note to

note

string

The note to add

See also

[https://faq.whatsapp.com/1433099287594476](https://faq.whatsapp.com/1433099287594476)

Returns

`Promise containing void` 

async

### addOrRemoveLabels(labelIds, chatIds) → Promise containing void

Change labels in chats

#### Parameters

Name

Type

Optional

Description

labelIds

Array of (number or string)

chatIds

Array of string

Returns

`Promise containing void` 

async

### approveGroupMembershipRequests(groupId, options) → Promise containing Array of [MembershipRequestActionResult](global.html#MembershipRequestActionResult)

Approves membership requests if any

#### Parameters

Name

Type

Optional

Description

groupId

string

The group ID to get the membership request for

options

[MembershipRequestActionOptions](global.html#MembershipRequestActionOptions)

Options for performing a membership request action

Returns

`Promise containing Array of [MembershipRequestActionResult](global.html#MembershipRequestActionResult)` 

Returns an array of requester IDs whose membership requests were approved and an error for each requester, if any occurred during the operation. If there are no requests, an empty array will be returned

async

### archiveChat() → boolean

Enables and returns the archive state of the Chat

Returns

`boolean` 

async

### attachEventListeners()

Attach event listeners to WA Web Private function

#### Property

Name

Type

Optional

Description

reinject

boolean

is this a reinject?

async

### createCallLink(startTime, callType) → Promise containing string

Generates a WhatsApp call link (video call or voice call)

#### Parameters

Name

Type

Optional

Description

startTime

Date

The start time of the call

callType

string

The type of a WhatsApp call link to generate, valid values are: `video` | `voice`

Returns

`Promise containing string` 

The WhatsApp call link (https://call.whatsapp.com/video/XxXxXxXxXxXxXx) or an empty string if a generation failed.

async

### createChannel(title, options) → Promise containing ([CreateChannelResult](global.html#CreateChannelResult) or string)

Creates a new channel

#### Parameters

Name

Type

Optional

Description

title

string

The channel name

options

[CreateChannelOptions](global.html#CreateChannelOptions)

Returns

`Promise containing ([CreateChannelResult](global.html#CreateChannelResult) or string)` 

Returns an object that handles the result for the channel creation or an error message as a string

async

### createGroup(title, participants, options) → Promise containing ([CreateGroupResult](global.html#CreateGroupResult) or string)

Creates a new group

#### Parameters

Name

Type

Optional

Description

title

string

Group title

participants

(string, [Contact](Contact.html), Array of ([Contact](Contact.html) or string), or undefined)

A single Contact object or an ID as a string or an array of Contact objects or contact IDs to add to the group

options

[CreateGroupOptions](global.html#CreateGroupOptions)

An object that handles options for group creation

Returns

`Promise containing ([CreateGroupResult](global.html#CreateGroupResult) or string)` 

Object with resulting data or an error message as a string

async

### deleteAddressbookContact(phoneNumber) → Promise containing void

Deletes the contact from user's addressbook

#### Parameter

Name

Type

Optional

Description

phoneNumber

string

The contact's phone number in a format "17182222222", where "1" is a country code

Returns

`Promise containing void` 

async

### deleteChannel(channelId) → Promise containing boolean

Deletes the channel you created

#### Parameter

Name

Type

Optional

Description

channelId

string

The ID of a channel to delete

Returns

`Promise containing boolean` 

Returns true if the operation completed successfully, false otherwise

async

### deleteProfilePicture() → Promise containing boolean

Deletes the current user's profile picture.

Returns

`Promise containing boolean` 

Returns true if the picture was properly deleted.

async

### demoteChannelAdmin(channelId, userId) → Promise containing boolean

Demotes a channel admin to a regular subscriber (can be used also for self-demotion)

#### Parameters

Name

Type

Optional

Description

channelId

string

The channel ID to demote an admin in

userId

string

The user ID to demote

Returns

`Promise containing boolean` 

Returns true if the operation completed successfully, false otherwise

async

### destroy()

Closes the client

async

### getBlockedContacts() → Promise containing Array of [Contact](Contact.html)

Gets all blocked contacts by host account

Returns

`Promise containing Array of [Contact](Contact.html)` 

async

### getBroadcastById(contactId) → Promise containing [Broadcast](Broadcast.html)

Get broadcast instance by current user ID

#### Parameter

Name

Type

Optional

Description

contactId

string

Returns

`Promise containing [Broadcast](Broadcast.html)` 

async

### getBroadcasts() → Promise containing Array of [Broadcast](Broadcast.html)

Get all current Broadcast

Returns

`Promise containing Array of [Broadcast](Broadcast.html)` 

async

### getChannelByInviteCode(inviteCode) → Promise containing [Channel](Channel.html)

Gets a [`Channel`](Channel.html) instance by invite code

#### Parameter

Name

Type

Optional

Description

inviteCode

string

The code that comes after the 'https://whatsapp.com/channel/'

Returns

`Promise containing [Channel](Channel.html)` 

async

### getChannels() → Promise containing Array of [Channel](Channel.html)

Gets all cached [`Channel`](Channel.html) instance

Returns

`Promise containing Array of [Channel](Channel.html)` 

async

### getChatById(chatId) → Promise containing ([Chat](Chat.html) or [Channel](Channel.html))

Gets chat or channel instance by ID

#### Parameter

Name

Type

Optional

Description

chatId

string

Returns

`Promise containing ([Chat](Chat.html) or [Channel](Channel.html))` 

async

### getChatLabels(chatId) → Promise containing Array of [Label](Label.html)

Get all Labels assigned to a chat

#### Parameter

Name

Type

Optional

Description

chatId

string

Returns

`Promise containing Array of [Label](Label.html)` 

async

### getChats() → Promise containing Array of [Chat](Chat.html)

Get all current chat instances

Returns

`Promise containing Array of [Chat](Chat.html)` 

async

### getChatsByLabelId(labelId) → Promise containing Array of [Chat](Chat.html)

Get all Chats for a specific Label

#### Parameter

Name

Type

Optional

Description

labelId

string

Returns

`Promise containing Array of [Chat](Chat.html)` 

async

### getCommonGroups(contactId) → Promise containing Array of WAWebJS.ChatId

Gets the Contact's common groups with you. Returns empty array if you don't have any common group.

#### Parameter

Name

Type

Optional

Description

contactId

string

the whatsapp user's ID (\_serialized format)

Returns

`Promise containing Array of WAWebJS.ChatId` 

async

### getContactById(contactId) → Promise containing [Contact](Contact.html)

Get contact instance by ID

#### Parameter

Name

Type

Optional

Description

contactId

string

Returns

`Promise containing [Contact](Contact.html)` 

async

### getContactDeviceCount(userId) → Promise containing number

Get user device count by ID Each WaWeb Connection counts as one device, and the phone (if exists) counts as one So for a non-enterprise user with one WaWeb connection it should return "2"

#### Parameter

Name

Type

Optional

Description

userId

string

Returns

`Promise containing number` 

async

### getContactLidAndPhone(userIds) → Promise containing Array of {lid: string, pn: string}

Get lid and phone number for multiple users

#### Parameter

Name

Type

Optional

Description

userIds

Array of string

Array of user IDs

Returns

`Promise containing Array of {lid: string, pn: string}` 

async

### getContacts() → Promise containing Array of [Contact](Contact.html)

Get all current contact instances

Returns

`Promise containing Array of [Contact](Contact.html)` 

async

### getCountryCode(number) → Promise containing string

Get the country code of a WhatsApp ID.

#### Parameter

Name

Type

Optional

Description

number

string

Number or ID

Returns

`Promise containing string` 

async

### getCustomerNote(userId) → Promise containing {chatId: string, content: string, createdAt: number, id: string, modifiedAt: number, type: string}

Get a customer note

#### Parameter

Name

Type

Optional

Description

userId

string

The ID of a customer to get a note from

See also

[https://faq.whatsapp.com/1433099287594476](https://faq.whatsapp.com/1433099287594476)

Returns

`Promise containing {chatId: string, content: string, createdAt: number, id: string, modifiedAt: number, type: string}` 

async

### getFormattedNumber(number) → Promise containing string

Get the formatted number of a WhatsApp ID.

#### Parameter

Name

Type

Optional

Description

number

string

Number or ID

Returns

`Promise containing string` 

async

### getGroupMembershipRequests(groupId) → Promise containing Array of [GroupMembershipRequest](global.html#GroupMembershipRequest)

Gets an array of membership requests

#### Parameter

Name

Type

Optional

Description

groupId

string

The ID of a group to get membership requests for

Returns

`Promise containing Array of [GroupMembershipRequest](global.html#GroupMembershipRequest)` 

An array of membership requests

async

### getInviteInfo(inviteCode) → Promise containing object

Returns an object with information about the invite code's group

#### Parameter

Name

Type

Optional

Description

inviteCode

string

Returns

`Promise containing object` 

Invite information

async

### getLabelById(labelId) → Promise containing [Label](Label.html)

Get Label instance by ID

#### Parameter

Name

Type

Optional

Description

labelId

string

Returns

`Promise containing [Label](Label.html)` 

async

### getLabels() → Promise containing Array of [Label](Label.html)

Get all current Labels

Returns

`Promise containing Array of [Label](Label.html)` 

async

### getMessageById(messageId) → Promise containing [Message](Message.html)

Get message by ID

#### Parameter

Name

Type

Optional

Description

messageId

string

Returns

`Promise containing [Message](Message.html)` 

async

### getNumberId(number) → Promise containing (Object or null)

Get the registered WhatsApp ID for a number. Will return null if the number is not registered on WhatsApp.

#### Parameter

Name

Type

Optional

Description

number

string

Number or ID ("@c.us" will be automatically appended if not specified)

Returns

`Promise containing (Object or null)` 

async

### getPinnedMessages(chatId) → Promise containing Array of [Message](Message.html)

Gets instances of all pinned messages in a chat

#### Parameter

Name

Type

Optional

Description

chatId

string

The chat ID

Returns

`Promise containing Array of [Message](Message.html)` 

async

### getPollVotes(messageId) → Promise containing Array of [PollVote](PollVote.html)

Get Poll Votes

#### Parameter

Name

Type

Optional

Description

messageId

string

Returns

`Promise containing Array of [PollVote](PollVote.html)` 

async

### getProfilePicUrl(contactId) → Promise containing string

Returns the contact ID's profile picture URL, if privacy settings allow it

#### Parameter

Name

Type

Optional

Description

contactId

string

the whatsapp user's ID

Returns

`Promise containing string` 

async

### getState() → [WAState](global.html#WAState)

Gets the current connection state for the client

Returns

`[WAState](global.html#WAState)` 

async

### getWWebVersion() → Promise containing string

Returns the version of WhatsApp Web currently being run

Returns

`Promise containing string` 

async

### initialize()

Sets up events and requirements, kicks off authentication request

async

### inject()

Injection logic Private function

async

### isRegisteredUser(id) → Promise containing Boolean

Check if a given ID is registered in whatsapp

#### Parameter

Name

Type

Optional

Description

id

string

the whatsapp user's ID

Returns

`Promise containing Boolean` 

async

### logout()

Logs out the client, closing the current session

async

### markChatUnread(chatId)

Mark the Chat as unread

#### Parameter

Name

Type

Optional

Description

chatId

string

ID of the chat that will be marked as unread

async

### muteChat(chatId, unmuteDate) → Promise containing {isMuted: boolean, muteExpiration: number}

Mutes this chat forever, unless a date is specified

#### Parameters

Name

Type

Optional

Description

chatId

string

ID of the chat that will be muted

unmuteDate

Date

Date when the chat will be unmuted, don't provide a value to mute forever

Value can be null.

Returns

`Promise containing {isMuted: boolean, muteExpiration: number}` 

async

### pinChat() → Promise containing boolean

Pins the Chat

Returns

`Promise containing boolean` 

New pin state. Could be false if the max number of pinned chats was reached.

async

### rejectGroupMembershipRequests(groupId, options) → Promise containing Array of [MembershipRequestActionResult](global.html#MembershipRequestActionResult)

Rejects membership requests if any

#### Parameters

Name

Type

Optional

Description

groupId

string

The group ID to get the membership request for

options

[MembershipRequestActionOptions](global.html#MembershipRequestActionOptions)

Options for performing a membership request action

Returns

`Promise containing Array of [MembershipRequestActionResult](global.html#MembershipRequestActionResult)` 

Returns an array of requester IDs whose membership requests were rejected and an error for each requester, if any occurred during the operation. If there are no requests, an empty array will be returned

async

### requestPairingCode(phoneNumber\[, showNotification\]\[, intervalMs\]) → Promise containing string

Request authentication via pairing code instead of QR code

#### Parameters

Name

Type

Optional

Description

phoneNumber

string

Phone number in international, symbol-free format (e.g. 12025550108 for US, 551155501234 for Brazil)

showNotification

boolean

Yes

Show notification to pair on phone number

Defaults to `true`.

intervalMs

number

Yes

The interval in milliseconds on how frequent to generate pairing code (WhatsApp default to 3 minutes)

Defaults to `180000`.

Returns

`Promise containing string` 

*   Returns a pairing code in format "ABCDEFGH"

async

### resetState()

Force reset of connection state for the client

async

### revokeChannelAdminInvite(channelId, userId) → Promise containing boolean

Revokes a channel admin invitation sent to a user by a channel owner

#### Parameters

Name

Type

Optional

Description

channelId

string

The channel ID an invitation belongs to

userId

string

The user ID the invitation was sent to

Returns

`Promise containing boolean` 

Returns true if the operation completed successfully, false otherwise

async

### revokeStatusMessage(messageId) → Promise containing void

Revoke current own status messages

#### Parameter

Name

Type

Optional

Description

messageId

string

Returns

`Promise containing void` 

async

### saveOrEditAddressbookContact(phoneNumber, firstName, lastName\[, syncToAddressbook\]) → Promise containing void

Save new contact to user's addressbook or edit the existing one

#### Parameters

Name

Type

Optional

Description

phoneNumber

string

The contact's phone number in a format "17182222222", where "1" is a country code

firstName

string

lastName

string

syncToAddressbook

boolean

Yes

If set to true, the contact will also be saved to the user's address book on their phone. False by default

Defaults to `false`.

Returns

`Promise containing void` 

async

### searchChannels(searchOptions) → Promise containing Array of [Channel](Channel.html)

Searches for channels based on search criteria, there are some notes:

1.  The method finds only channels you are not subscribed to currently
2.  If you have never been subscribed to a found channel or you have unsubscribed from it with `UnsubscribeOptions.deleteLocalModels` set to 'true', the lastMessage property of a found channel will be 'null'

#### Parameters

Name

Type

Optional

Description

searchOptions

Object

Search options

Values in `searchOptions` have the following properties:

Name

Type

Optional

Description

searchText

string

Yes

Text to search

Defaults to `''`.

countryCodes

Array of string

Yes

Array of country codes in 'ISO 3166-1 alpha-2' standart (@see https://en.wikipedia.org/wiki/ISO\_3166-1\_alpha-2) to search for channels created in these countries

Defaults to `[your local region]`.

skipSubscribedNewsletters

boolean

Yes

If true, channels that user is subscribed to won't appear in found channels

Defaults to `false`.

view

number

Yes

View type, makes sense only when the searchText is empty. Valid values to provide are: 0 for RECOMMENDED channels 1 for TRENDING channels 2 for POPULAR channels 3 for NEW channels

Defaults to `0`.

limit

number

Yes

The limit of found channels to be appear in the returnig result

Defaults to `50`.

Returns

`Promise containing Array of [Channel](Channel.html)` 

Returns an array of Channel objects or an empty array if no channels were found

async

### searchMessages(query\[, options\]) → Promise containing Array of [Message](Message.html)

Searches for messages

#### Parameters

Name

Type

Optional

Description

query

string

options

Object

Yes

Values in `options` have the following properties:

Name

Type

Optional

Description

page

number

Yes

limit

number

Yes

chatId

string

Yes

Returns

`Promise containing Array of [Message](Message.html)` 

async

### sendChannelAdminInvite(chatId, channelId, options) → Promise containing boolean

Sends a channel admin invitation to a user, allowing them to become an admin of the channel

#### Parameters

Name

Type

Optional

Description

chatId

string

The ID of a user to send the channel admin invitation to

channelId

string

The ID of a channel for which the invitation is being sent

options

[SendChannelAdminInviteOptions](global.html#SendChannelAdminInviteOptions)

Returns

`Promise containing boolean` 

Returns true if an invitation was sent successfully, false otherwise

async

### sendMessage(chatId, content\[, options\]) → Promise containing [Message](Message.html)

Send a message to a specific chatId

#### Parameters

Name

Type

Optional

Description

chatId

string

content

(string, [MessageMedia](MessageMedia.html), [Location](Location.html), [Poll](Poll.html), [Contact](Contact.html), Array of [Contact](Contact.html), [Buttons](Buttons.html), or [List](List.html))

options

[MessageSendOptions](global.html#MessageSendOptions)

Yes

Options used when sending the message

Returns

`Promise containing [Message](Message.html)` 

Message that was just sent

async

### sendPresenceAvailable()

Marks the client as online

async

### sendPresenceUnavailable()

Marks the client as unavailable

async

### sendResponseToScheduledEvent(response, eventMessageId) → Promise containing boolean

Sends a response to the scheduled event message, indicating whether a user is going to attend the event or not

#### Parameters

Name

Type

Optional

Description

response

number

The response code to the scheduled event message. Valid values are: `0` for NONE response (removes a previous response) | `1` for GOING | `2` for NOT GOING | `3` for MAYBE going

eventMessageId

string

The scheduled event message ID

Returns

`Promise containing boolean` 

async

### sendSeen(chatId) → Promise containing boolean

Mark as seen for the Chat

#### Parameter

Name

Type

Optional

Description

chatId

string

Returns

`Promise containing boolean` 

result

async

### setAutoDownloadAudio(flag)

Setting autoload download audio

#### Parameter

Name

Type

Optional

Description

flag

boolean

true/false

async

### setAutoDownloadDocuments(flag)

Setting autoload download documents

#### Parameter

Name

Type

Optional

Description

flag

boolean

true/false

async

### setAutoDownloadPhotos(flag)

Setting autoload download photos

#### Parameter

Name

Type

Optional

Description

flag

boolean

true/false

async

### setAutoDownloadVideos(flag)

Setting autoload download videos

#### Parameter

Name

Type

Optional

Description

flag

boolean

true/false

async

### setBackgroundSync(flag) → Promise containing boolean

Setting background synchronization. NOTE: this action will take effect after you restart the client.

#### Parameter

Name

Type

Optional

Description

flag

boolean

true/false

Returns

`Promise containing boolean` 

async

### setDisplayName(displayName) → Promise containing Boolean

Sets the current user's display name. This is the name shown to WhatsApp users that have not added you as a contact beside your number in groups and in your profile.

#### Parameter

Name

Type

Optional

Description

displayName

string

New display name

Returns

`Promise containing Boolean` 

async

### setProfilePicture(media) → Promise containing boolean

Sets the current user's profile picture.

#### Parameter

Name

Type

Optional

Description

media

[MessageMedia](MessageMedia.html)

Returns

`Promise containing boolean` 

Returns true if the picture was properly updated.

async

### setStatus(status)

Sets the current user's status message

#### Parameter

Name

Type

Optional

Description

status

string

New status message

async

### subscribeToChannel(channelId) → Promise containing boolean

Subscribe to channel

#### Parameter

Name

Type

Optional

Description

channelId

string

The channel ID

Returns

`Promise containing boolean` 

Returns true if the operation completed successfully, false otherwise

async

### syncHistory(chatId) → Promise containing boolean

Sync chat history conversation

#### Parameter

Name

Type

Optional

Description

chatId

string

Returns

`Promise containing boolean` 

True if operation completed successfully, false otherwise.

async

### transferChannelOwnership(channelId, newOwnerId, options) → Promise containing boolean

Transfers a channel ownership to another user. Note: the user you are transferring the channel ownership to must be a channel admin.

#### Parameters

Name

Type

Optional

Description

channelId

string

newOwnerId

string

options

[TransferChannelOwnershipOptions](global.html#TransferChannelOwnershipOptions)

Returns

`Promise containing boolean` 

Returns true if the operation completed successfully, false otherwise

async

### unarchiveChat() → boolean

Changes and returns the archive state of the Chat

Returns

`boolean` 

async

### unmuteChat(chatId) → Promise containing {isMuted: boolean, muteExpiration: number}

Unmutes the Chat

#### Parameter

Name

Type

Optional

Description

chatId

string

ID of the chat that will be unmuted

Returns

`Promise containing {isMuted: boolean, muteExpiration: number}` 

async

### unpinChat() → Promise containing boolean

Unpins the Chat

Returns

`Promise containing boolean` 

New pin state

async

### unsubscribeFromChannel(channelId, options) → Promise containing boolean

Unsubscribe from channel

#### Parameters

Name

Type

Optional

Description

channelId

string

The channel ID

options

[UnsubscribeOptions](global.html#UnsubscribeOptions)

Returns

`Promise containing boolean` 

Returns true if the operation completed successfully, false otherwise

## Events

### auth\_failure

Emitted when there has been an error while trying to restore an existing session

#### Parameter

Name

Type

Optional

Description

message

string

### authenticated

Emitted when authentication is successful

### change\_battery

Emitted when the battery percentage for the attached device changes. Will not be sent if using multi-device.

#### Parameters

Name

Type

Optional

Description

batteryInfo

object

Values in `batteryInfo` have the following properties:

Name

Type

Optional

Description

battery

number

The current battery percentage

plugged

boolean

Indicates if the phone is plugged in (true) or not (false)

Deprecated

### change\_state

Emitted when the connection state changes

#### Parameter

Name

Type

Optional

Description

state

[WAState](global.html#WAState)

the new connection state

### chat\_archived

Emitted when a chat is archived/unarchived

#### Parameters

Name

Type

Optional

Description

chat

[Chat](Chat.html)

currState

boolean

prevState

boolean

### chat\_removed

Emitted when a chat is removed

#### Parameter

Name

Type

Optional

Description

chat

[Chat](Chat.html)

### code

Emitted when a pairing code is received

#### Parameter

Name

Type

Optional

Description

code

string

Code

Returns

`string` 

Code that was just received

### contact\_changed

Emitted when a contact or a group participant changes their phone number.

#### Parameters

Name

Type

Optional

Description

message

[Message](Message.html)

Message with more information about the event.

oldId

String

The user's id (an old one) who changed their phone number and who triggered the notification.

newId

String

The user's new id after the change.

isContact

Boolean

Indicates if a contact or a group participant changed their phone number.

### disconnected

Emitted when the client has been disconnected

#### Parameter

Name

Type

Optional

Description

reason

([WAState](global.html#WAState) or "LOGOUT")

reason that caused the disconnect

### group\_admin\_changed

Emitted when a current user is promoted to an admin or demoted to a regular user.

#### Parameter

Name

Type

Optional

Description

notification

[GroupNotification](GroupNotification.html)

GroupNotification with more information about the action

### group\_join

Emitted when a user joins the chat via invite link or is added by an admin.

#### Parameter

Name

Type

Optional

Description

notification

[GroupNotification](GroupNotification.html)

GroupNotification with more information about the action

### group\_leave

Emitted when a user leaves the chat or is removed by an admin.

#### Parameter

Name

Type

Optional

Description

notification

[GroupNotification](GroupNotification.html)

GroupNotification with more information about the action

### group\_membership\_request

Emitted when some user requested to join the group that has the membership approval mode turned on

#### Parameters

Name

Type

Optional

Description

notification

[GroupNotification](GroupNotification.html)

GroupNotification with more information about the action

Values in `notification` have the following properties:

Name

Type

Optional

Description

chatId

string

The group ID the request was made for

author

string

The user ID that made a request

timestamp

number

The timestamp the request was made at

### group\_update

Emitted when group settings are updated, such as subject, description or picture.

#### Parameter

Name

Type

Optional

Description

notification

[GroupNotification](GroupNotification.html)

GroupNotification with more information about the action

### incoming\_call

Emitted when a call is received

#### Parameters

Name

Type

Optional

Description

call

object

Values in `call` have the following properties:

Name

Type

Optional

Description

id

number

Call id

peerJid

string

Who called

isVideo

boolean

if is video

isGroup

boolean

if is group

canHandleLocally

boolean

if we can handle in waweb

outgoing

boolean

if is outgoing

webClientShouldHandle

boolean

If Waweb should handle

participants

object

Participants

### media\_uploaded

Emitted when media has been uploaded for a message sent by the client.

#### Parameter

Name

Type

Optional

Description

message

[Message](Message.html)

The message with media that was uploaded

### message

Emitted when a new message is received.

#### Parameter

Name

Type

Optional

Description

message

[Message](Message.html)

The message that was received

### message\_ack

Emitted when an ack event occurrs on message type.

#### Parameters

Name

Type

Optional

Description

message

[Message](Message.html)

The message that was affected

ack

[MessageAck](global.html#MessageAck)

The new ACK value

### message\_ciphertext

Emitted when messages are edited

#### Parameter

Name

Type

Optional

Description

message

[Message](Message.html)

### message\_create

Emitted when a new message is created, which may include the current user's own messages.

#### Parameter

Name

Type

Optional

Description

message

[Message](Message.html)

The message that was created

### message\_edit

Emitted when messages are edited

#### Parameters

Name

Type

Optional

Description

message

[Message](Message.html)

newBody

string

prevBody

string

### message\_reaction

Emitted when a reaction is sent, received, updated or removed

#### Parameters

Name

Type

Optional

Description

reaction

object

Values in `reaction` have the following properties:

Name

Type

Optional

Description

id

object

Reaction id

orphan

number

Orphan

orphanReason

string

Orphan reason

Value can be null.

timestamp

number

Timestamp

reaction

string

Reaction

read

boolean

Read

msgId

object

Parent message id

senderId

string

Sender id

ack

number

Ack

Value can be null.

### message\_revoke\_everyone

Emitted when a message is deleted for everyone in the chat.

#### Parameters

Name

Type

Optional

Description

message

[Message](Message.html)

The message that was revoked, in its current state. It will not contain the original message's data.

revoked\_msg

[Message](Message.html)

The message that was revoked, before it was revoked. It will contain the message's original data. Note that due to the way this data is captured, it may be possible that this param will be undefined.

Value can be null.

### message\_revoke\_me

Emitted when a message is deleted by the current user.

#### Parameter

Name

Type

Optional

Description

message

[Message](Message.html)

The message that was revoked

### qr

Emitted when a QR code is received

#### Parameter

Name

Type

Optional

Description

qr

string

QR Code

### ready

Emitted when the client has initialized and is ready to receive messages.

### vote\_update

Emitted when some poll option is selected or deselected, shows a user's current selected option(s) on the poll

--- END OF FILE: Client.js.html#source-line-66.md ---
--- START OF FILE: Client.js.html#source-line-66.md ---

Source: https://docs.wwebjs.dev/Client.js.html#source-line-66

1.  `'use strict';`

3.  `const EventEmitter = require('events');`
4.  `const puppeteer = require('puppeteer');`
5.  `const moduleRaid = require('@pedroslopez/moduleraid/moduleraid');`

7.  `const Util = require('./util/Util');`
8.  `const InterfaceController = require('./util/InterfaceController');`
9.  `const { WhatsWebURL, DefaultOptions, Events, WAState, MessageTypes } = require('./util/Constants');`
10.  `const { ExposeAuthStore } = require('./util/Injected/AuthStore/AuthStore');`
11.  `const { ExposeStore } = require('./util/Injected/Store');`
12.  `const { ExposeLegacyAuthStore } = require('./util/Injected/AuthStore/LegacyAuthStore');`
13.  `const { ExposeLegacyStore } = require('./util/Injected/LegacyStore');`
14.  `const { LoadUtils } = require('./util/Injected/Utils');`
15.  `const ChatFactory = require('./factories/ChatFactory');`
16.  `const ContactFactory = require('./factories/ContactFactory');`
17.  `const WebCacheFactory = require('./webCache/WebCacheFactory');`
18.  `const { ClientInfo, Message, MessageMedia, Contact, Location, Poll, PollVote, GroupNotification, Label, Call, Buttons, List, Reaction, Broadcast, ScheduledEvent } = require('./structures');`
19.  `const NoAuth = require('./authStrategies/NoAuth');`
20.  `const {exposeFunctionIfAbsent} = require('./util/Puppeteer');`

22.  `/**`
23.   `* Starting point for interacting with the WhatsApp Web API`
24.   `* @extends {EventEmitter}`
25.   `* @param {object} options - Client options`
26.   `* @param {AuthStrategy} options.authStrategy - Determines how to save and restore sessions. Will use LegacySessionAuth if options.session is set. Otherwise, NoAuth will be used.`
27.   `* @param {string} options.webVersion - The version of WhatsApp Web to use. Use options.webVersionCache to configure how the version is retrieved.`
28.   `* @param {object} options.webVersionCache - Determines how to retrieve the WhatsApp Web version. Defaults to a local cache (LocalWebCache) that falls back to latest if the requested version is not found.`
29.   `* @param {number} options.authTimeoutMs - Timeout for authentication selector in puppeteer`
30.   `* @param {function} options.evalOnNewDoc - function to eval on new doc`
31.   `* @param {object} options.puppeteer - Puppeteer launch options. View docs here: https://github.com/puppeteer/puppeteer/`
32.   `* @param {number} options.qrMaxRetries - How many times should the qrcode be refreshed before giving up`
33.   `* @param {string} options.restartOnAuthFail  - @deprecated This option should be set directly on the LegacySessionAuth.`
34.   `* @param {object} options.session - @deprecated Only here for backwards-compatibility. You should move to using LocalAuth, or set the authStrategy to LegacySessionAuth explicitly.` 
35.   `* @param {number} options.takeoverOnConflict - If another whatsapp web session is detected (another browser), take over the session in the current browser`
36.   `* @param {number} options.takeoverTimeoutMs - How much time to wait before taking over the session`
37.   `* @param {string} options.userAgent - User agent to use in puppeteer`
38.   `* @param {string} options.ffmpegPath - Ffmpeg path to use when formatting videos to webp while sending stickers` 
39.   `* @param {boolean} options.bypassCSP - Sets bypassing of page's Content-Security-Policy.`
40.   `* @param {string} options.deviceName - Sets the device name of a current linked device., i.e.: 'TEST'.`
41.   `* @param {string} options.browserName - Sets the browser name of a current linked device, i.e.: 'Firefox'.`
42.   `* @param {object} options.proxyAuthentication - Proxy Authentication object.`
43.   `*` 
44.   `* @fires Client#qr`
45.   `* @fires Client#authenticated`
46.   `* @fires Client#auth_failure`
47.   `* @fires Client#ready`
48.   `* @fires Client#message`
49.   `* @fires Client#message_ack`
50.   `* @fires Client#message_create`
51.   `* @fires Client#message_revoke_me`
52.   `* @fires Client#message_revoke_everyone`
53.   `* @fires Client#message_ciphertext`
54.   `* @fires Client#message_edit`
55.   `* @fires Client#media_uploaded`
56.   `* @fires Client#group_join`
57.   `* @fires Client#group_leave`
58.   `* @fires Client#group_update`
59.   `* @fires Client#disconnected`
60.   `* @fires Client#change_state`
61.   `* @fires Client#contact_changed`
62.   `* @fires Client#group_admin_changed`
63.   `* @fires Client#group_membership_request`
64.   `* @fires Client#vote_update`
65.   `*/`
66.  `class Client extends EventEmitter {`
67.      `constructor(options = {}) {`
68.          `super();`

70.          `this.options = Util.mergeDefault(DefaultOptions, options);`

72.          `if(!this.options.authStrategy) {`
73.              `this.authStrategy = new NoAuth();`
74.          `} else {`
75.              `this.authStrategy = this.options.authStrategy;`
76.          `}`

78.          `this.authStrategy.setup(this);`

80.          `/**`
81.           `* @type {puppeteer.Browser}`
82.           `*/`
83.          `this.pupBrowser = null;`
84.          `/**`
85.           `* @type {puppeteer.Page}`
86.           `*/`
87.          `this.pupPage = null;`

89.          `this.currentIndexHtml = null;`
90.          `this.lastLoggedOut = false;`

92.          `Util.setFfmpegPath(this.options.ffmpegPath);`
93.      `}`
94.      `/**`
95.       `* Injection logic`
96.       `* Private function`
97.       `*/`
98.      `async inject() {`
99.          `if(this.options.authTimeoutMs === undefined || this.options.authTimeoutMs==0){`
100.              `this.options.authTimeoutMs = 30000;`
101.          `}`
102.          `let start = Date.now();`
103.          `let timeout = this.options.authTimeoutMs;`
104.          `let res = false;`
105.          `while(start > (Date.now() - timeout)){`
106.              `res = await this.pupPage.evaluate('window.Debug?.VERSION != undefined');`
107.              `if(res){break;}`
108.              `await new Promise(r => setTimeout(r, 200));`
109.          `}`
110.          `if(!res){` 
111.              `throw 'auth timeout';`
112.          `}`       
113.          `await this.setDeviceName(this.options.deviceName, this.options.browserName);`
114.          `const pairWithPhoneNumber = this.options.pairWithPhoneNumber;`
115.          `const version = await this.getWWebVersion();`
116.          `const isCometOrAbove = parseInt(version.split('.')?.[1]) >= 3000;`

118.          `if (isCometOrAbove) {`
119.              `await this.pupPage.evaluate(ExposeAuthStore);`
120.          `} else {`
121.              `await this.pupPage.evaluate(ExposeLegacyAuthStore, moduleRaid.toString());`
122.          `}`

124.          `const needAuthentication = await this.pupPage.evaluate(async () => {`
125.              `let state = window.AuthStore.AppState.state;`

127.              `if (state === 'OPENING' || state === 'UNLAUNCHED' || state === 'PAIRING') {`
128.                  `// wait till state changes`
129.                  `await new Promise(r => {`
130.                      `window.AuthStore.AppState.on('change:state', function waitTillInit(_AppState, state) {`
131.                          `if (state !== 'OPENING' &amp;&amp; state !== 'UNLAUNCHED' &amp;&amp; state !== 'PAIRING') {`
132.                              `window.AuthStore.AppState.off('change:state', waitTillInit);`
133.                              `r();`
134.                          `}` 
135.                      `});`
136.                  `});` 
137.              `}`
138.              `state = window.AuthStore.AppState.state;`
139.              `return state == 'UNPAIRED' || state == 'UNPAIRED_IDLE';`
140.          `});`

142.          `if (needAuthentication) {`
143.              `const { failed, failureEventPayload, restart } = await this.authStrategy.onAuthenticationNeeded();`

145.              `if(failed) {`
146.                  `/**`
147.                   `* Emitted when there has been an error while trying to restore an existing session`
148.                   `* @event Client#auth_failure`
149.                   `* @param {string} message`
150.                   `*/`
151.                  `this.emit(Events.AUTHENTICATION_FAILURE, failureEventPayload);`
152.                  `await this.destroy();`
153.                  `if (restart) {`
154.                      `// session restore failed so try again but without session to force new authentication`
155.                      `return this.initialize();`
156.                  `}`
157.                  `return;`
158.              `}`

160.              `// Register qr/code events`
161.              `if (pairWithPhoneNumber.phoneNumber) {`
162.                  `await exposeFunctionIfAbsent(this.pupPage, 'onCodeReceivedEvent', async (code) => {`
163.                      `/**`
164.                      `* Emitted when a pairing code is received`
165.                      `* @event Client#code`
166.                      `* @param {string} code Code`
167.                      `* @returns {string} Code that was just received`
168.                      `*/`
169.                      `this.emit(Events.CODE_RECEIVED, code);`
170.                      `return code;`
171.                  `});`
172.                  `this.requestPairingCode(pairWithPhoneNumber.phoneNumber, pairWithPhoneNumber.showNotification, pairWithPhoneNumber.intervalMs);`
173.              `} else {`
174.                  `let qrRetries = 0;`
175.                  `await exposeFunctionIfAbsent(this.pupPage, 'onQRChangedEvent', async (qr) => {`
176.                      `/**`
177.                      `* Emitted when a QR code is received`
178.                      `* @event Client#qr`
179.                      `* @param {string} qr QR Code`
180.                      `*/`
181.                      `this.emit(Events.QR_RECEIVED, qr);`
182.                      `if (this.options.qrMaxRetries > 0) {`
183.                          `qrRetries++;`
184.                          `if (qrRetries > this.options.qrMaxRetries) {`
185.                              `this.emit(Events.DISCONNECTED, 'Max qrcode retries reached');`
186.                              `await this.destroy();`
187.                          `}`
188.                      `}`
189.                  `});`

192.                  `await this.pupPage.evaluate(async () => {`
193.                      `const registrationInfo = await window.AuthStore.RegistrationUtils.waSignalStore.getRegistrationInfo();`
194.                      `const noiseKeyPair = await window.AuthStore.RegistrationUtils.waNoiseInfo.get();`
195.                      `const staticKeyB64 = window.AuthStore.Base64Tools.encodeB64(noiseKeyPair.staticKeyPair.pubKey);`
196.                      `const identityKeyB64 = window.AuthStore.Base64Tools.encodeB64(registrationInfo.identityKeyPair.pubKey);`
197.                      `const advSecretKey = await window.AuthStore.RegistrationUtils.getADVSecretKey();`
198.                      `const platform = window.AuthStore.RegistrationUtils.DEVICE_PLATFORM;`
199.                      `const getQR = (ref) => ref + ',' + staticKeyB64 + ',' + identityKeyB64 + ',' + advSecretKey + ',' + platform;`

201.                      `window.onQRChangedEvent(getQR(window.AuthStore.Conn.ref)); // initial qr`
202.                      `window.AuthStore.Conn.on('change:ref', (_, ref) => { window.onQRChangedEvent(getQR(ref)); }); // future QR changes`
203.                  `});`
204.              `}`
205.          `}`

207.          `await exposeFunctionIfAbsent(this.pupPage, 'onAuthAppStateChangedEvent', async (state) => {`
208.              `if (state == 'UNPAIRED_IDLE' &amp;&amp; !pairWithPhoneNumber.phoneNumber) {`
209.                  `// refresh qr code`
210.                  `window.Store.Cmd.refreshQR();`
211.              `}`
212.          `});`

214.          `await exposeFunctionIfAbsent(this.pupPage, 'onAppStateHasSyncedEvent', async () => {`
215.              `const authEventPayload = await this.authStrategy.getAuthEventPayload();`
216.              `/**`
217.                   `* Emitted when authentication is successful`
218.                   `* @event Client#authenticated`
219.                   `*/`
220.              `this.emit(Events.AUTHENTICATED, authEventPayload);`

222.              `const injected = await this.pupPage.evaluate(async () => {`
223.                  `return typeof window.Store !== 'undefined' &amp;&amp; typeof window.WWebJS !== 'undefined';`
224.              `});`

226.              `if (!injected) {`
227.                  `if (this.options.webVersionCache.type === 'local' &amp;&amp; this.currentIndexHtml) {`
228.                      `const { type: webCacheType, ...webCacheOptions } = this.options.webVersionCache;`
229.                      `const webCache = WebCacheFactory.createWebCache(webCacheType, webCacheOptions);`

231.                      `await webCache.persist(this.currentIndexHtml, version);`
232.                  `}`

234.                  `if (isCometOrAbove) {`
235.                      `await this.pupPage.evaluate(ExposeStore);`
236.                  `} else {`
237.                      `// make sure all modules are ready before injection`
238.                      `// 2 second delay after authentication makes sense and does not need to be made dyanmic or removed`
239.                      `await new Promise(r => setTimeout(r, 2000));` 
240.                      `await this.pupPage.evaluate(ExposeLegacyStore);`
241.                  `}`
242.                  `let start = Date.now();`
243.                  `let res = false;`
244.                  `while(start > (Date.now() - 30000)){`
245.                      `// Check window.Store Injection`
246.                      `res = await this.pupPage.evaluate('window.Store != undefined');`
247.                      `if(res){break;}`
248.                      `await new Promise(r => setTimeout(r, 200));`
249.                  `}`
250.                  `if(!res){`
251.                      `throw 'ready timeout';`
252.                  `}`

254.                  `/**`
255.                       `* Current connection information`
256.                       `* @type {ClientInfo}`
257.                       `*/`
258.                  `this.info = new ClientInfo(this, await this.pupPage.evaluate(() => {`
259.                      `return { ...window.Store.Conn.serialize(), wid: window.Store.User.getMaybeMePnUser() || window.Store.User.getMaybeMeLidUser() };`
260.                  `}));`

262.                  `this.interface = new InterfaceController(this);`

264.                  `//Load util functions (serializers, helper functions)`
265.                  `await this.pupPage.evaluate(LoadUtils);`

267.                  `await this.attachEventListeners();`
268.              `}`
269.              `/**`
270.                   `* Emitted when the client has initialized and is ready to receive messages.`
271.                   `* @event Client#ready`
272.                   `*/`
273.              `this.emit(Events.READY);`
274.              `this.authStrategy.afterAuthReady();`
275.          `});`
276.          `let lastPercent = null;`
277.          `await exposeFunctionIfAbsent(this.pupPage, 'onOfflineProgressUpdateEvent', async (percent) => {`
278.              `if (lastPercent !== percent) {`
279.                  `lastPercent = percent;`
280.                  `this.emit(Events.LOADING_SCREEN, percent, 'WhatsApp'); // Message is hardcoded as "WhatsApp" for now`
281.              `}`
282.          `});`
283.          `await exposeFunctionIfAbsent(this.pupPage, 'onLogoutEvent', async () => {`
284.              `this.lastLoggedOut = true;`
285.              `await this.pupPage.waitForNavigation({waitUntil: 'load', timeout: 5000}).catch((_) => _);`
286.          `});`
287.          `await this.pupPage.evaluate(() => {`
288.              `window.AuthStore.AppState.on('change:state', (_AppState, state) => { window.onAuthAppStateChangedEvent(state); });`
289.              `window.AuthStore.AppState.on('change:hasSynced', () => { window.onAppStateHasSyncedEvent(); });`
290.              `window.AuthStore.Cmd.on('offline_progress_update', () => {`
291.                  `window.onOfflineProgressUpdateEvent(window.AuthStore.OfflineMessageHandler.getOfflineDeliveryProgress());` 
292.              `});`
293.              `window.AuthStore.Cmd.on('logout', async () => {`
294.                  `await window.onLogoutEvent();`
295.              `});`
296.          `});`
297.      `}`

299.      `/**`
300.       `* Sets up events and requirements, kicks off authentication request`
301.       `*/`
302.      `async initialize() {`

304.          `let` 
305.              `/**`
306.               `* @type {puppeteer.Browser}`
307.               `*/`
308.              `browser,` 
309.              `/**`
310.               `* @type {puppeteer.Page}`
311.               `*/`
312.              `page;`

314.          `browser = null;`
315.          `page = null;`

317.          `await this.authStrategy.beforeBrowserInitialized();`

319.          `const puppeteerOpts = this.options.puppeteer;`
320.          `if (puppeteerOpts &amp;&amp; (puppeteerOpts.browserWSEndpoint || puppeteerOpts.browserURL)) {`
321.              `browser = await puppeteer.connect(puppeteerOpts);`
322.              `page = await browser.newPage();`
323.          `} else {`
324.              `const browserArgs = [...(puppeteerOpts.args || [])];`
325.              `if(this.options.userAgent !== false &amp;&amp; !browserArgs.find(arg => arg.includes('--user-agent'))) {`
326.                  ``browserArgs.push(`--user-agent=${this.options.userAgent}`);``
327.              `}`
328.              `// navigator.webdriver fix`
329.              `browserArgs.push('--disable-blink-features=AutomationControlled');`

331.              `browser = await puppeteer.launch({...puppeteerOpts, args: browserArgs});`
332.              `page = (await browser.pages())[0];`
333.          `}`

335.          `if (this.options.proxyAuthentication !== undefined) {`
336.              `await page.authenticate(this.options.proxyAuthentication);`
337.          `}`
338.          `if(this.options.userAgent !== false) {`
339.              `await page.setUserAgent(this.options.userAgent);`
340.          `}`
341.          `if (this.options.bypassCSP) await page.setBypassCSP(true);`

343.          `this.pupBrowser = browser;`
344.          `this.pupPage = page;`

346.          `await this.authStrategy.afterBrowserInitialized();`
347.          `await this.initWebVersionCache();`

349.          `if (this.options.evalOnNewDoc !== undefined) {`
350.              `await page.evaluateOnNewDocument(this.options.evalOnNewDoc);`
351.          `}`

353.          `// ocVersion (isOfficialClient patch)`
354.          `// remove after 2.3000.x hard release`
355.          `await page.evaluateOnNewDocument(() => {`
356.              `const originalError = Error;`
357.              `window.originalError = originalError;`
358.              `//eslint-disable-next-line no-global-assign`
359.              `Error = function (message) {`
360.                  `const error = new originalError(message);`
361.                  `const originalStack = error.stack;`
362.                  `if (error.stack.includes('moduleRaid')) error.stack = originalStack + '\n    at https://web.whatsapp.com/vendors~lazy_loaded_low_priority_components.05e98054dbd60f980427.js:2:44';`
363.                  `return error;`
364.              `};`
365.          `});`

367.          `await page.goto(WhatsWebURL, {`
368.              `waitUntil: 'load',`
369.              `timeout: 0,`
370.              `referer: 'https://whatsapp.com/'`
371.          `});`

373.          `await this.inject();`

375.          `this.pupPage.on('framenavigated', async (frame) => {`
376.              `if(frame.url().includes('post_logout=1') || this.lastLoggedOut) {`
377.                  `this.emit(Events.DISCONNECTED, 'LOGOUT');`
378.                  `await this.authStrategy.logout();`
379.                  `await this.authStrategy.beforeBrowserInitialized();`
380.                  `await this.authStrategy.afterBrowserInitialized();`
381.                  `this.lastLoggedOut = false;`
382.              `}`
383.              `await this.inject();`
384.          `});`
385.      `}`

387.      `/**`
388.       `* Request authentication via pairing code instead of QR code`
389.       `* @param {string} phoneNumber - Phone number in international, symbol-free format (e.g. 12025550108 for US, 551155501234 for Brazil)`
390.       `* @param {boolean} [showNotification = true] - Show notification to pair on phone number`
391.       `* @param {number} [intervalMs = 180000] - The interval in milliseconds on how frequent to generate pairing code (WhatsApp default to 3 minutes)`
392.       `* @returns {Promise&lt;string>} - Returns a pairing code in format "ABCDEFGH"`
393.       `*/`
394.      `async requestPairingCode(phoneNumber, showNotification = true, intervalMs = 180000) {`
395.          `return await this.pupPage.evaluate(async (phoneNumber, showNotification, intervalMs) => {`
396.              `const getCode = async () => {`
397.                  `while (!window.AuthStore.PairingCodeLinkUtils) {`
398.                      `await new Promise(resolve => setTimeout(resolve, 250));`
399.                  `}`
400.                  `window.AuthStore.PairingCodeLinkUtils.setPairingType('ALT_DEVICE_LINKING');`
401.                  `await window.AuthStore.PairingCodeLinkUtils.initializeAltDeviceLinking();`
402.                  `return window.AuthStore.PairingCodeLinkUtils.startAltLinkingFlow(phoneNumber, showNotification);`
403.              `};`
404.              `if (window.codeInterval) {`
405.                  `clearInterval(window.codeInterval); // remove existing interval`
406.              `}`
407.              `window.codeInterval = setInterval(async () => {`
408.                  `if (window.AuthStore.AppState.state != 'UNPAIRED' &amp;&amp; window.AuthStore.AppState.state != 'UNPAIRED_IDLE') {`
409.                      `clearInterval(window.codeInterval);`
410.                      `return;`
411.                  `}`
412.                  `window.onCodeReceivedEvent(await getCode());`
413.              `}, intervalMs);`
414.              `return window.onCodeReceivedEvent(await getCode());`
415.          `}, phoneNumber, showNotification, intervalMs);`
416.      `}`

418.      `/**`
419.       `* Attach event listeners to WA Web`
420.       `* Private function`
421.       `* @property {boolean} reinject is this a reinject?`
422.       `*/`
423.      `async attachEventListeners() {`
424.          `await exposeFunctionIfAbsent(this.pupPage, 'onAddMessageEvent', msg => {`
425.              `if (msg.type === 'gp2') {`
426.                  `const notification = new GroupNotification(this, msg);`
427.                  `if (['add', 'invite', 'linked_group_join'].includes(msg.subtype)) {`
428.                      `/**`
429.                           `* Emitted when a user joins the chat via invite link or is added by an admin.`
430.                           `* @event Client#group_join`
431.                           `* @param {GroupNotification} notification GroupNotification with more information about the action`
432.                           `*/`
433.                      `this.emit(Events.GROUP_JOIN, notification);`
434.                  `} else if (msg.subtype === 'remove' || msg.subtype === 'leave') {`
435.                      `/**`
436.                           `* Emitted when a user leaves the chat or is removed by an admin.`
437.                           `* @event Client#group_leave`
438.                           `* @param {GroupNotification} notification GroupNotification with more information about the action`
439.                           `*/`
440.                      `this.emit(Events.GROUP_LEAVE, notification);`
441.                  `} else if (msg.subtype === 'promote' || msg.subtype === 'demote') {`
442.                      `/**`
443.                           `* Emitted when a current user is promoted to an admin or demoted to a regular user.`
444.                           `* @event Client#group_admin_changed`
445.                           `* @param {GroupNotification} notification GroupNotification with more information about the action`
446.                           `*/`
447.                      `this.emit(Events.GROUP_ADMIN_CHANGED, notification);`
448.                  `} else if (msg.subtype === 'membership_approval_request') {`
449.                      `/**`
450.                           `* Emitted when some user requested to join the group`
451.                           `* that has the membership approval mode turned on`
452.                           `* @event Client#group_membership_request`
453.                           `* @param {GroupNotification} notification GroupNotification with more information about the action`
454.                           `* @param {string} notification.chatId The group ID the request was made for`
455.                           `* @param {string} notification.author The user ID that made a request`
456.                           `* @param {number} notification.timestamp The timestamp the request was made at`
457.                           `*/`
458.                      `this.emit(Events.GROUP_MEMBERSHIP_REQUEST, notification);`
459.                  `} else {`
460.                      `/**`
461.                           `* Emitted when group settings are updated, such as subject, description or picture.`
462.                           `* @event Client#group_update`
463.                           `* @param {GroupNotification} notification GroupNotification with more information about the action`
464.                           `*/`
465.                      `this.emit(Events.GROUP_UPDATE, notification);`
466.                  `}`
467.                  `return;`
468.              `}`

470.              `const message = new Message(this, msg);`

472.              `/**`
473.                   `* Emitted when a new message is created, which may include the current user's own messages.`
474.                   `* @event Client#message_create`
475.                   `* @param {Message} message The message that was created`
476.                   `*/`
477.              `this.emit(Events.MESSAGE_CREATE, message);`

479.              `if (msg.id.fromMe) return;`

481.              `/**`
482.                   `* Emitted when a new message is received.`
483.                   `* @event Client#message`
484.                   `* @param {Message} message The message that was received`
485.                   `*/`
486.              `this.emit(Events.MESSAGE_RECEIVED, message);`
487.          `});`

489.          `let last_message;`

491.          `await exposeFunctionIfAbsent(this.pupPage, 'onChangeMessageTypeEvent', (msg) => {`

493.              `if (msg.type === 'revoked') {`
494.                  `const message = new Message(this, msg);`
495.                  `let revoked_msg;`
496.                  `if (last_message &amp;&amp; msg.id.id === last_message.id.id) {`
497.                      `revoked_msg = new Message(this, last_message);`

499.                      `if (message.protocolMessageKey)`
500.                          `revoked_msg.id = { ...message.protocolMessageKey };`                    
501.                  `}`

503.                  `/**`
504.                       `* Emitted when a message is deleted for everyone in the chat.`
505.                       `* @event Client#message_revoke_everyone`
506.                       `* @param {Message} message The message that was revoked, in its current state. It will not contain the original message's data.`
507.                       `* @param {?Message} revoked_msg The message that was revoked, before it was revoked. It will contain the message's original data.` 
508.                       `* Note that due to the way this data is captured, it may be possible that this param will be undefined.`
509.                       `*/`
510.                  `this.emit(Events.MESSAGE_REVOKED_EVERYONE, message, revoked_msg);`
511.              `}`

513.          `});`

515.          `await exposeFunctionIfAbsent(this.pupPage, 'onChangeMessageEvent', (msg) => {`

517.              `if (msg.type !== 'revoked') {`
518.                  `last_message = msg;`
519.              `}`

521.              `/**`
522.                   `* The event notification that is received when one of`
523.                   `* the group participants changes their phone number.`
524.                   `*/`
525.              `const isParticipant = msg.type === 'gp2' &amp;&amp; msg.subtype === 'modify';`

527.              `/**`
528.                   `* The event notification that is received when one of`
529.                   `* the contacts changes their phone number.`
530.                   `*/`
531.              `const isContact = msg.type === 'notification_template' &amp;&amp; msg.subtype === 'change_number';`

533.              `if (isParticipant || isContact) {`
534.                  `/** @type {GroupNotification} object does not provide enough information about this event, so a @type {Message} object is used. */`
535.                  `const message = new Message(this, msg);`

537.                  `const newId = isParticipant ? msg.recipients[0] : msg.to;`
538.                  `const oldId = isParticipant ? msg.author : msg.templateParams.find(id => id !== newId);`

540.                  `/**`
541.                       `* Emitted when a contact or a group participant changes their phone number.`
542.                       `* @event Client#contact_changed`
543.                       `* @param {Message} message Message with more information about the event.`
544.                       `* @param {String} oldId The user's id (an old one) who changed their phone number`
545.                       `* and who triggered the notification.`
546.                       `* @param {String} newId The user's new id after the change.`
547.                       `* @param {Boolean} isContact Indicates if a contact or a group participant changed their phone number.`
548.                       `*/`
549.                  `this.emit(Events.CONTACT_CHANGED, message, oldId, newId, isContact);`
550.              `}`
551.          `});`

553.          `await exposeFunctionIfAbsent(this.pupPage, 'onRemoveMessageEvent', (msg) => {`

555.              `if (!msg.isNewMsg) return;`

557.              `const message = new Message(this, msg);`

559.              `/**`
560.                   `* Emitted when a message is deleted by the current user.`
561.                   `* @event Client#message_revoke_me`
562.                   `* @param {Message} message The message that was revoked`
563.                   `*/`
564.              `this.emit(Events.MESSAGE_REVOKED_ME, message);`

566.          `});`

568.          `await exposeFunctionIfAbsent(this.pupPage, 'onMessageAckEvent', (msg, ack) => {`

570.              `const message = new Message(this, msg);`

572.              `/**`
573.                   `* Emitted when an ack event occurrs on message type.`
574.                   `* @event Client#message_ack`
575.                   `* @param {Message} message The message that was affected`
576.                   `* @param {MessageAck} ack The new ACK value`
577.                   `*/`
578.              `this.emit(Events.MESSAGE_ACK, message, ack);`

580.          `});`

582.          `await exposeFunctionIfAbsent(this.pupPage, 'onChatUnreadCountEvent', async (data) =>{`
583.              `const chat = await this.getChatById(data.id);`

585.              `/**`
586.                   `* Emitted when the chat unread count changes`
587.                   `*/`
588.              `this.emit(Events.UNREAD_COUNT, chat);`
589.          `});`

591.          `await exposeFunctionIfAbsent(this.pupPage, 'onMessageMediaUploadedEvent', (msg) => {`

593.              `const message = new Message(this, msg);`

595.              `/**`
596.                   `* Emitted when media has been uploaded for a message sent by the client.`
597.                   `* @event Client#media_uploaded`
598.                   `* @param {Message} message The message with media that was uploaded`
599.                   `*/`
600.              `this.emit(Events.MEDIA_UPLOADED, message);`
601.          `});`

603.          `await exposeFunctionIfAbsent(this.pupPage, 'onAppStateChangedEvent', async (state) => {`
604.              `/**`
605.                   `* Emitted when the connection state changes`
606.                   `* @event Client#change_state`
607.                   `* @param {WAState} state the new connection state`
608.                   `*/`
609.              `this.emit(Events.STATE_CHANGED, state);`

611.              `const ACCEPTED_STATES = [WAState.CONNECTED, WAState.OPENING, WAState.PAIRING, WAState.TIMEOUT];`

613.              `if (this.options.takeoverOnConflict) {`
614.                  `ACCEPTED_STATES.push(WAState.CONFLICT);`

616.                  `if (state === WAState.CONFLICT) {`
617.                      `setTimeout(() => {`
618.                          `this.pupPage.evaluate(() => window.Store.AppState.takeover());`
619.                      `}, this.options.takeoverTimeoutMs);`
620.                  `}`
621.              `}`

623.              `if (!ACCEPTED_STATES.includes(state)) {`
624.                  `/**`
625.                       `* Emitted when the client has been disconnected`
626.                       `* @event Client#disconnected`
627.                       `* @param {WAState|"LOGOUT"} reason reason that caused the disconnect`
628.                       `*/`
629.                  `await this.authStrategy.disconnect();`
630.                  `this.emit(Events.DISCONNECTED, state);`
631.                  `this.destroy();`
632.              `}`
633.          `});`

635.          `await exposeFunctionIfAbsent(this.pupPage, 'onBatteryStateChangedEvent', (state) => {`
636.              `const { battery, plugged } = state;`

638.              `if (battery === undefined) return;`

640.              `/**`
641.                   `* Emitted when the battery percentage for the attached device changes. Will not be sent if using multi-device.`
642.                   `* @event Client#change_battery`
643.                   `* @param {object} batteryInfo`
644.                   `* @param {number} batteryInfo.battery - The current battery percentage`
645.                   `* @param {boolean} batteryInfo.plugged - Indicates if the phone is plugged in (true) or not (false)`
646.                   `* @deprecated`
647.                   `*/`
648.              `this.emit(Events.BATTERY_CHANGED, { battery, plugged });`
649.          `});`

651.          `await exposeFunctionIfAbsent(this.pupPage, 'onIncomingCall', (call) => {`
652.              `/**`
653.                   `* Emitted when a call is received`
654.                   `* @event Client#incoming_call`
655.                   `* @param {object} call`
656.                   `* @param {number} call.id - Call id`
657.                   `* @param {string} call.peerJid - Who called`
658.                   `* @param {boolean} call.isVideo - if is video`
659.                   `* @param {boolean} call.isGroup - if is group`
660.                   `* @param {boolean} call.canHandleLocally - if we can handle in waweb`
661.                   `* @param {boolean} call.outgoing - if is outgoing`
662.                   `* @param {boolean} call.webClientShouldHandle - If Waweb should handle`
663.                   `* @param {object} call.participants - Participants`
664.                   `*/`
665.              `const cll = new Call(this, call);`
666.              `this.emit(Events.INCOMING_CALL, cll);`
667.          `});`

669.          `await exposeFunctionIfAbsent(this.pupPage, 'onReaction', (reactions) => {`
670.              `for (const reaction of reactions) {`
671.                  `/**`
672.                       `* Emitted when a reaction is sent, received, updated or removed`
673.                       `* @event Client#message_reaction`
674.                       `* @param {object} reaction`
675.                       `* @param {object} reaction.id - Reaction id`
676.                       `* @param {number} reaction.orphan - Orphan`
677.                       `* @param {?string} reaction.orphanReason - Orphan reason`
678.                       `* @param {number} reaction.timestamp - Timestamp`
679.                       `* @param {string} reaction.reaction - Reaction`
680.                       `* @param {boolean} reaction.read - Read`
681.                       `* @param {object} reaction.msgId - Parent message id`
682.                       `* @param {string} reaction.senderId - Sender id`
683.                       `* @param {?number} reaction.ack - Ack`
684.                       `*/`

686.                  `this.emit(Events.MESSAGE_REACTION, new Reaction(this, reaction));`
687.              `}`
688.          `});`

690.          `await exposeFunctionIfAbsent(this.pupPage, 'onRemoveChatEvent', async (chat) => {`
691.              `const _chat = await this.getChatById(chat.id);`

693.              `/**`
694.                   `* Emitted when a chat is removed`
695.                   `* @event Client#chat_removed`
696.                   `* @param {Chat} chat`
697.                   `*/`
698.              `this.emit(Events.CHAT_REMOVED, _chat);`
699.          `});`

701.          `await exposeFunctionIfAbsent(this.pupPage, 'onArchiveChatEvent', async (chat, currState, prevState) => {`
702.              `const _chat = await this.getChatById(chat.id);`

704.              `/**`
705.                   `* Emitted when a chat is archived/unarchived`
706.                   `* @event Client#chat_archived`
707.                   `* @param {Chat} chat`
708.                   `* @param {boolean} currState`
709.                   `* @param {boolean} prevState`
710.                   `*/`
711.              `this.emit(Events.CHAT_ARCHIVED, _chat, currState, prevState);`
712.          `});`

714.          `await exposeFunctionIfAbsent(this.pupPage, 'onEditMessageEvent', (msg, newBody, prevBody) => {`

716.              `if(msg.type === 'revoked'){`
717.                  `return;`
718.              `}`
719.              `/**`
720.                   `* Emitted when messages are edited`
721.                   `* @event Client#message_edit`
722.                   `* @param {Message} message`
723.                   `* @param {string} newBody`
724.                   `* @param {string} prevBody`
725.                   `*/`
726.              `this.emit(Events.MESSAGE_EDIT, new Message(this, msg), newBody, prevBody);`
727.          `});`

729.          `await exposeFunctionIfAbsent(this.pupPage, 'onAddMessageCiphertextEvent', msg => {`

731.              `/**`
732.                   `* Emitted when messages are edited`
733.                   `* @event Client#message_ciphertext`
734.                   `* @param {Message} message`
735.                   `*/`
736.              `this.emit(Events.MESSAGE_CIPHERTEXT, new Message(this, msg));`
737.          `});`

739.          `await exposeFunctionIfAbsent(this.pupPage, 'onPollVoteEvent', (votes) => {`
740.              `for (const vote of votes) {`
741.                  `/**`
742.                   `* Emitted when some poll option is selected or deselected,`
743.                   `* shows a user's current selected option(s) on the poll`
744.                   `* @event Client#vote_update`
745.                   `*/`
746.                  `this.emit(Events.VOTE_UPDATE, new PollVote(this, vote));`
747.              `}`
748.          `});`

750.          `await this.pupPage.evaluate(() => {`
751.              `window.Store.Msg.on('change', (msg) => { window.onChangeMessageEvent(window.WWebJS.getMessageModel(msg)); });`
752.              `window.Store.Msg.on('change:type', (msg) => { window.onChangeMessageTypeEvent(window.WWebJS.getMessageModel(msg)); });`
753.              `window.Store.Msg.on('change:ack', (msg, ack) => { window.onMessageAckEvent(window.WWebJS.getMessageModel(msg), ack); });`
754.              `window.Store.Msg.on('change:isUnsentMedia', (msg, unsent) => { if (msg.id.fromMe &amp;&amp; !unsent) window.onMessageMediaUploadedEvent(window.WWebJS.getMessageModel(msg)); });`
755.              `window.Store.Msg.on('remove', (msg) => { if (msg.isNewMsg) window.onRemoveMessageEvent(window.WWebJS.getMessageModel(msg)); });`
756.              `window.Store.Msg.on('change:body change:caption', (msg, newBody, prevBody) => { window.onEditMessageEvent(window.WWebJS.getMessageModel(msg), newBody, prevBody); });`
757.              `window.Store.AppState.on('change:state', (_AppState, state) => { window.onAppStateChangedEvent(state); });`
758.              `window.Store.Conn.on('change:battery', (state) => { window.onBatteryStateChangedEvent(state); });`
759.              `window.Store.Call.on('add', (call) => { window.onIncomingCall(call); });`
760.              `window.Store.Chat.on('remove', async (chat) => { window.onRemoveChatEvent(await window.WWebJS.getChatModel(chat)); });`
761.              `window.Store.Chat.on('change:archive', async (chat, currState, prevState) => { window.onArchiveChatEvent(await window.WWebJS.getChatModel(chat), currState, prevState); });`
762.              `window.Store.Msg.on('add', (msg) => {` 
763.                  `if (msg.isNewMsg) {`
764.                      `if(msg.type === 'ciphertext') {`
765.                          `// defer message event until ciphertext is resolved (type changed)`
766.                          `msg.once('change:type', (_msg) => window.onAddMessageEvent(window.WWebJS.getMessageModel(_msg)));`
767.                          `window.onAddMessageCiphertextEvent(window.WWebJS.getMessageModel(msg));`
768.                      `} else {`
769.                          `window.onAddMessageEvent(window.WWebJS.getMessageModel(msg));` 
770.                      `}`
771.                  `}`
772.              `});`
773.              `window.Store.Chat.on('change:unreadCount', (chat) => {window.onChatUnreadCountEvent(chat);});`

775.              `if (window.compareWwebVersions(window.Debug.VERSION, '>=', '2.3000.1014111620')) {`
776.                  `const module = window.Store.AddonReactionTable;`
777.                  `const ogMethod = module.bulkUpsert;`
778.                  `module.bulkUpsert = ((...args) => {`
779.                      `window.onReaction(args[0].map(reaction => {`
780.                          `const msgKey = reaction.id;`
781.                          `const parentMsgKey = reaction.reactionParentKey;`
782.                          `const timestamp = reaction.reactionTimestamp / 1000;`
783.                          `const sender = reaction.author ?? reaction.from;`
784.                          `const senderUserJid = sender._serialized;`

786.                          `return {...reaction, msgKey, parentMsgKey, senderUserJid, timestamp };`
787.                      `}));`

789.                      `return ogMethod(...args);`
790.                  `}).bind(module);`

792.                  `const pollVoteModule = window.Store.AddonPollVoteTable;`
793.                  `const ogPollVoteMethod = pollVoteModule.bulkUpsert;`

795.                  `pollVoteModule.bulkUpsert = (async (...args) => {`
796.                      `const votes = await Promise.all(args[0].map(async vote => {`
797.                          `const msgKey = vote.id;`
798.                          `const parentMsgKey = vote.pollUpdateParentKey;`
799.                          `const timestamp = vote.t / 1000;`
800.                          `const sender = vote.author ?? vote.from;`
801.                          `const senderUserJid = sender._serialized;`

803.                          `let parentMessage = window.Store.Msg.get(parentMsgKey._serialized);`
804.                          `if (!parentMessage) {`
805.                              `const fetched = await window.Store.Msg.getMessagesById([parentMsgKey._serialized]);`
806.                              `parentMessage = fetched?.messages?.[0] || null;`
807.                          `}`

809.                          `return {`
810.                              `...vote,`
811.                              `msgKey,`
812.                              `sender,`
813.                              `parentMsgKey,`
814.                              `senderUserJid,`
815.                              `timestamp,`
816.                              `parentMessage`
817.                          `};`
818.                      `}));`

820.                      `window.onPollVoteEvent(votes);`

822.                      `return ogPollVoteMethod.apply(pollVoteModule, args);`
823.                  `}).bind(pollVoteModule);`
824.              `} else {`
825.                  `const module = window.Store.createOrUpdateReactionsModule;`
826.                  `const ogMethod = module.createOrUpdateReactions;`
827.                  `module.createOrUpdateReactions = ((...args) => {`
828.                      `window.onReaction(args[0].map(reaction => {`
829.                          `const msgKey = window.Store.MsgKey.fromString(reaction.msgKey);`
830.                          `const parentMsgKey = window.Store.MsgKey.fromString(reaction.parentMsgKey);`
831.                          `const timestamp = reaction.timestamp / 1000;`

833.                          `return {...reaction, msgKey, parentMsgKey, timestamp };`
834.                      `}));`

836.                      `return ogMethod(...args);`
837.                  `}).bind(module);`
838.              `}`
839.          `});`
840.      `}`    

842.      `async initWebVersionCache() {`
843.          `const { type: webCacheType, ...webCacheOptions } = this.options.webVersionCache;`
844.          `const webCache = WebCacheFactory.createWebCache(webCacheType, webCacheOptions);`

846.          `const requestedVersion = this.options.webVersion;`
847.          `const versionContent = await webCache.resolve(requestedVersion);`

849.          `if(versionContent) {`
850.              `await this.pupPage.setRequestInterception(true);`
851.              `this.pupPage.on('request', async (req) => {`
852.                  `if(req.url() === WhatsWebURL) {`
853.                      `req.respond({`
854.                          `status: 200,`
855.                          `contentType: 'text/html',`
856.                          `body: versionContent`
857.                      `});` 
858.                  `} else {`
859.                      `req.continue();`
860.                  `}`
861.              `});`
862.          `} else {`
863.              `this.pupPage.on('response', async (res) => {`
864.                  `if(res.ok() &amp;&amp; res.url() === WhatsWebURL) {`
865.                      `const indexHtml = await res.text();`
866.                      `this.currentIndexHtml = indexHtml;`
867.                  `}`
868.              `});`
869.          `}`
870.      `}`

872.      `/**`
873.       `* Closes the client`
874.       `*/`
875.      `async destroy() {`
876.          `await this.pupBrowser.close();`
877.          `await this.authStrategy.destroy();`
878.      `}`

880.      `/**`
881.       `* Logs out the client, closing the current session`
882.       `*/`
883.      `async logout() {`
884.          `await this.pupPage.evaluate(() => {`
885.              `if (window.Store &amp;&amp; window.Store.AppState &amp;&amp; typeof window.Store.AppState.logout === 'function') {`
886.                  `return window.Store.AppState.logout();`
887.              `}`
888.          `});`
889.          `await this.pupBrowser.close();`

891.          `let maxDelay = 0;`
892.          `while (this.pupBrowser.isConnected() &amp;&amp; (maxDelay &lt; 10)) { // waits a maximum of 1 second before calling the AuthStrategy`
893.              `await new Promise(resolve => setTimeout(resolve, 100));`
894.              `maxDelay++;` 
895.          `}`

897.          `await this.authStrategy.logout();`
898.      `}`

900.      `/**`
901.       `* Returns the version of WhatsApp Web currently being run`
902.       `* @returns {Promise&lt;string>}`
903.       `*/`
904.      `async getWWebVersion() {`
905.          `return await this.pupPage.evaluate(() => {`
906.              `return window.Debug.VERSION;`
907.          `});`
908.      `}`

910.      `async setDeviceName(deviceName, browserName) {`
911.          `(deviceName || browserName) &amp;&amp; await this.pupPage.evaluate((deviceName, browserName) => {`
912.              `const func = window.require('WAWebMiscBrowserUtils').info;`
913.              `window.require('WAWebMiscBrowserUtils').info = () => {`
914.                  `return {`
915.                      `...func(),`
916.                      `...(deviceName ? { os: deviceName } : {}),`
917.                      `...(browserName ? { name: browserName } : {})`
918.                  `};`
919.              `};`
920.          `}, deviceName, browserName);`
921.      `}`

923.      `/**`
924.       `* Mark as seen for the Chat`
925.       `*  @param {string} chatId`
926.       `*  @returns {Promise&lt;boolean>} result`
927.       `*` 
928.       `*/`
929.      `async sendSeen(chatId) {`
930.          `return await this.pupPage.evaluate(async (chatId) => {`
931.              `return window.WWebJS.sendSeen(chatId);`
932.          `}, chatId);`
933.      `}`

935.      `/**`
936.       `* An object representing mentions of groups`
937.       `* @typedef {Object} GroupMention`
938.       `* @property {string} subject - The name of a group to mention (can be custom)`
939.       `* @property {string} id - The group ID, e.g.: 'XXXXXXXXXX@g.us'`
940.       `*/`

942.      `/**`
943.       `* Message options.`
944.       `* @typedef {Object} MessageSendOptions`
945.       `* @property {boolean} [linkPreview=true] - Show links preview. Has no effect on multi-device accounts.`
946.       `* @property {boolean} [sendAudioAsVoice=false] - Send audio as voice message with a generated waveform`
947.       `* @property {boolean} [sendVideoAsGif=false] - Send video as gif`
948.       `* @property {boolean} [sendMediaAsSticker=false] - Send media as a sticker`
949.       `* @property {boolean} [sendMediaAsDocument=false] - Send media as a document`
950.       `* @property {boolean} [sendMediaAsHd=false] - Send image as quality HD`
951.       `* @property {boolean} [isViewOnce=false] - Send photo/video as a view once message`
952.       `* @property {boolean} [parseVCards=true] - Automatically parse vCards and send them as contacts`
953.       `* @property {string} [caption] - Image or video caption`
954.       `* @property {string} [quotedMessageId] - Id of the message that is being quoted (or replied to)`
955.       `* @property {GroupMention[]} [groupMentions] - An array of object that handle group mentions`
956.       `* @property {string[]} [mentions] - User IDs to mention in the message`
957.       `* @property {boolean} [sendSeen=true] - Mark the conversation as seen after sending the message`
958.       `* @property {string} [invokedBotWid=undefined] - Bot Wid when doing a bot mention like @Meta AI`
959.       `* @property {string} [stickerAuthor=undefined] - Sets the author of the sticker, (if sendMediaAsSticker is true).`
960.       `* @property {string} [stickerName=undefined] - Sets the name of the sticker, (if sendMediaAsSticker is true).`
961.       `* @property {string[]} [stickerCategories=undefined] - Sets the categories of the sticker, (if sendMediaAsSticker is true). Provide emoji char array, can be null.`
962.       `* @property {boolean} [ignoreQuoteErrors = true] - Should the bot send a quoted message without the quoted message if it fails to get the quote?`
963.       `* @property {boolean} [waitUntilMsgSent = false] - Should the bot wait for the message send result?`
964.       `* @property {MessageMedia} [media] - Media to be sent`
965.       `* @property {any} [extra] - Extra options`
966.       `*/`

968.      `/**`
969.       `* Send a message to a specific chatId`
970.       `* @param {string} chatId`
971.       `* @param {string|MessageMedia|Location|Poll|Contact|Array&lt;Contact>|Buttons|List} content`
972.       `* @param {MessageSendOptions} [options] - Options used when sending the message`
973.       `*` 
974.       `* @returns {Promise&lt;Message>} Message that was just sent`
975.       `*/`
976.      `async sendMessage(chatId, content, options = {}) {`
977.          `const isChannel = /@\w*newsletter\b/.test(chatId);`
978.          `const isStatus = /@\w*broadcast\b/.test(chatId);`

980.          `if (isChannel &amp;&amp; [`
981.              `options.sendMediaAsDocument, options.quotedMessageId,`
982.              `options.parseVCards, options.isViewOnce,`
983.              `content instanceof Location, content instanceof Contact,`
984.              `content instanceof Buttons, content instanceof List,`
985.              `Array.isArray(content) &amp;&amp; content.length > 0 &amp;&amp; content[0] instanceof Contact`
986.          `].includes(true)) {`
987.              `console.warn('The message type is currently not supported for sending in channels,\nthe supported message types are: text, image, sticker, gif, video, voice and poll.');`
988.              `return null;`

990.          `} else if (isStatus &amp;&amp; [`
991.              `options.sendMediaAsDocument, options.quotedMessageId,`
992.              `options.parseVCards, options.isViewOnce, options.sendMediaAsSticker,`
993.              `content instanceof Location, content instanceof Contact,`
994.              `content instanceof Poll, content instanceof Buttons, content instanceof List,`
995.              `Array.isArray(content) &amp;&amp; content.length > 0 &amp;&amp; content[0] instanceof Contact`
996.          `].includes(true)) {`
997.              `console.warn('The message type is currently not supported for sending in status broadcast,\nthe supported message types are: text, image, gif, audio and video.');`
998.              `return null;`
999.          `}`

1001.          `if (options.mentions) {`
1002.              `!Array.isArray(options.mentions) &amp;&amp; (options.mentions = [options.mentions]);`
1003.              `if (options.mentions.some((possiblyContact) => possiblyContact instanceof Contact)) {`
1004.                  `console.warn('Mentions with an array of Contact are now deprecated. See more at https://github.com/pedroslopez/whatsapp-web.js/pull/2166.');`
1005.                  `options.mentions = options.mentions.map((a) => a.id._serialized);`
1006.              `}`
1007.          `}`

1009.          `options.groupMentions &amp;&amp; !Array.isArray(options.groupMentions) &amp;&amp; (options.groupMentions = [options.groupMentions]);`

1011.          `let internalOptions = {`
1012.              `linkPreview: options.linkPreview === false ? undefined : true,`
1013.              `sendAudioAsVoice: options.sendAudioAsVoice,`
1014.              `sendVideoAsGif: options.sendVideoAsGif,`
1015.              `sendMediaAsSticker: options.sendMediaAsSticker,`
1016.              `sendMediaAsDocument: options.sendMediaAsDocument,`
1017.              `sendMediaAsHd: options.sendMediaAsHd,`
1018.              `caption: options.caption,`
1019.              `quotedMessageId: options.quotedMessageId,`
1020.              `parseVCards: options.parseVCards !== false,`
1021.              `mentionedJidList: options.mentions || [],`
1022.              `groupMentions: options.groupMentions,`
1023.              `invokedBotWid: options.invokedBotWid,`
1024.              `ignoreQuoteErrors: options.ignoreQuoteErrors !== false,`
1025.              `waitUntilMsgSent: options.waitUntilMsgSent || false,`
1026.              `extraOptions: options.extra`
1027.          `};`

1029.          `const sendSeen = options.sendSeen !== false;`

1031.          `if (content instanceof MessageMedia) {`
1032.              `internalOptions.media = content;`
1033.              `internalOptions.isViewOnce = options.isViewOnce,`
1034.              `content = '';`
1035.          `} else if (options.media instanceof MessageMedia) {`
1036.              `internalOptions.media = options.media;`
1037.              `internalOptions.caption = content;`
1038.              `internalOptions.isViewOnce = options.isViewOnce,`
1039.              `content = '';`
1040.          `} else if (content instanceof Location) {`
1041.              `internalOptions.location = content;`
1042.              `content = '';`
1043.          `} else if (content instanceof Poll) {`
1044.              `internalOptions.poll = content;`
1045.              `content = '';`
1046.          `} else if (content instanceof ScheduledEvent) {`
1047.              `internalOptions.event = content;`
1048.              `content = '';`
1049.          `} else if (content instanceof Contact) {`
1050.              `internalOptions.contactCard = content.id._serialized;`
1051.              `content = '';`
1052.          `} else if (Array.isArray(content) &amp;&amp; content.length > 0 &amp;&amp; content[0] instanceof Contact) {`
1053.              `internalOptions.contactCardList = content.map(contact => contact.id._serialized);`
1054.              `content = '';`
1055.          `} else if (content instanceof Buttons) {`
1056.              `console.warn('Buttons are now deprecated. See more at https://www.youtube.com/watch?v=hv1R1rLeVVE.');`
1057.              `if (content.type !== 'chat') { internalOptions.attachment = content.body; }`
1058.              `internalOptions.buttons = content;`
1059.              `content = '';`
1060.          `} else if (content instanceof List) {`
1061.              `console.warn('Lists are now deprecated. See more at https://www.youtube.com/watch?v=hv1R1rLeVVE.');`
1062.              `internalOptions.list = content;`
1063.              `content = '';`
1064.          `}`

1066.          `if (internalOptions.sendMediaAsSticker &amp;&amp; internalOptions.media) {`
1067.              `internalOptions.media = await Util.formatToWebpSticker(`
1068.                  `internalOptions.media, {`
1069.                      `name: options.stickerName,`
1070.                      `author: options.stickerAuthor,`
1071.                      `categories: options.stickerCategories`
1072.                  `}, this.pupPage`
1073.              `);`
1074.          `}`

1076.          `const sentMsg = await this.pupPage.evaluate(async (chatId, content, options, sendSeen) => {`
1077.              `const chat = await window.WWebJS.getChat(chatId, { getAsModel: false });`

1079.              `if (!chat) return null;`

1081.              `if (sendSeen) {`
1082.                  `await window.WWebJS.sendSeen(chatId);`
1083.              `}`

1085.              `const msg = await window.WWebJS.sendMessage(chat, content, options);`
1086.              `return msg`
1087.                  `? window.WWebJS.getMessageModel(msg)`
1088.                  `: undefined;`
1089.          `}, chatId, content, internalOptions, sendSeen);`

1091.          `return sentMsg`
1092.              `? new Message(this, sentMsg)`
1093.              `: undefined;`
1094.      `}`

1096.      `/**`
1097.       `* @typedef {Object} SendChannelAdminInviteOptions`
1098.       `* @property {?string} comment The comment to be added to an invitation`
1099.       `*/`

1101.      `/**`
1102.       `* Sends a channel admin invitation to a user, allowing them to become an admin of the channel`
1103.       `* @param {string} chatId The ID of a user to send the channel admin invitation to`
1104.       `* @param {string} channelId The ID of a channel for which the invitation is being sent`
1105.       `* @param {SendChannelAdminInviteOptions} options` 
1106.       `* @returns {Promise&lt;boolean>} Returns true if an invitation was sent successfully, false otherwise`
1107.       `*/`
1108.      `async sendChannelAdminInvite(chatId, channelId, options = {}) {`
1109.          `const response = await this.pupPage.evaluate(async (chatId, channelId, options) => {`
1110.              `const channelWid = window.Store.WidFactory.createWid(channelId);`
1111.              `const chatWid = window.Store.WidFactory.createWid(chatId);`
1112.              `const chat = window.Store.Chat.get(chatWid) || (await window.Store.Chat.find(chatWid));`

1114.              `if (!chatWid.isUser()) {`
1115.                  `return false;`
1116.              `}`

1118.              `return await window.Store.SendChannelMessage.sendNewsletterAdminInviteMessage(`
1119.                  `chat,`
1120.                  `{`
1121.                      `newsletterWid: channelWid,`
1122.                      `invitee: chatWid,`
1123.                      `inviteMessage: options.comment,`
1124.                      `base64Thumb: await window.WWebJS.getProfilePicThumbToBase64(channelWid)`
1125.                  `}`
1126.              `);`
1127.          `}, chatId, channelId, options);`

1129.          `return response.messageSendResult === 'OK';`
1130.      `}`

1132.      `/**`
1133.       `* Searches for messages`
1134.       `* @param {string} query`
1135.       `* @param {Object} [options]`
1136.       `* @param {number} [options.page]`
1137.       `* @param {number} [options.limit]`
1138.       `* @param {string} [options.chatId]`
1139.       `* @returns {Promise&lt;Message[]>}`
1140.       `*/`
1141.      `async searchMessages(query, options = {}) {`
1142.          `const messages = await this.pupPage.evaluate(async (query, page, count, remote) => {`
1143.              `const { messages } = await window.Store.Msg.search(query, page, count, remote);`
1144.              `return messages.map(msg => window.WWebJS.getMessageModel(msg));`
1145.          `}, query, options.page, options.limit, options.chatId);`

1147.          `return messages.map(msg => new Message(this, msg));`
1148.      `}`

1150.      `/**`
1151.       `* Get all current chat instances`
1152.       `* @returns {Promise&lt;Array&lt;Chat>>}`
1153.       `*/`
1154.      `async getChats() {`
1155.          `const chats = await this.pupPage.evaluate(async () => {`
1156.              `return await window.WWebJS.getChats();`
1157.          `});`

1159.          `return chats.map(chat => ChatFactory.create(this, chat));`
1160.      `}`

1162.      `/**`
1163.       `* Gets all cached {@link Channel} instance`
1164.       `* @returns {Promise&lt;Array&lt;Channel>>}`
1165.       `*/`
1166.      `async getChannels() {`
1167.          `const channels = await this.pupPage.evaluate(async () => {`
1168.              `return await window.WWebJS.getChannels();`
1169.          `});`

1171.          `return channels.map((channel) => ChatFactory.create(this, channel));`
1172.      `}`

1174.      `/**`
1175.       `* Gets chat or channel instance by ID`
1176.       `* @param {string} chatId` 
1177.       `* @returns {Promise&lt;Chat|Channel>}`
1178.       `*/`
1179.      `async getChatById(chatId) {`
1180.          `const chat = await this.pupPage.evaluate(async chatId => {`
1181.              `return await window.WWebJS.getChat(chatId);`
1182.          `}, chatId);`
1183.          `return chat`
1184.              `? ChatFactory.create(this, chat)`
1185.              `: undefined;`
1186.      `}`

1188.      `/**`
1189.       `* Gets a {@link Channel} instance by invite code`
1190.       `* @param {string} inviteCode The code that comes after the 'https://whatsapp.com/channel/'`
1191.       `* @returns {Promise&lt;Channel>}`
1192.       `*/`
1193.      `async getChannelByInviteCode(inviteCode) {`
1194.          `const channel = await this.pupPage.evaluate(async (inviteCode) => {`
1195.              `let channelMetadata;`
1196.              `try {`
1197.                  `channelMetadata = await window.WWebJS.getChannelMetadata(inviteCode);`
1198.              `} catch (err) {`
1199.                  `if (err.name === 'ServerStatusCodeError') return null;`
1200.                  `throw err;`
1201.              `}`
1202.              `return await window.WWebJS.getChat(channelMetadata.id);`
1203.          `}, inviteCode);`

1205.          `return channel`
1206.              `? ChatFactory.create(this, channel)`
1207.              `: undefined;`
1208.      `}`

1210.      `/**`
1211.       `* Get all current contact instances`
1212.       `* @returns {Promise&lt;Array&lt;Contact>>}`
1213.       `*/`
1214.      `async getContacts() {`
1215.          `let contacts = await this.pupPage.evaluate(() => {`
1216.              `return window.WWebJS.getContacts();`
1217.          `});`

1219.          `return contacts.map(contact => ContactFactory.create(this, contact));`
1220.      `}`

1222.      `/**`
1223.       `* Get contact instance by ID`
1224.       `* @param {string} contactId`
1225.       `* @returns {Promise&lt;Contact>}`
1226.       `*/`
1227.      `async getContactById(contactId) {`
1228.          `let contact = await this.pupPage.evaluate(contactId => {`
1229.              `return window.WWebJS.getContact(contactId);`
1230.          `}, contactId);`

1232.          `return ContactFactory.create(this, contact);`
1233.      `}`

1235.      `/**`
1236.       `* Get message by ID`
1237.       `* @param {string} messageId`
1238.       `* @returns {Promise&lt;Message>}`
1239.       `*/`
1240.      `async getMessageById(messageId) {`
1241.          `const msg = await this.pupPage.evaluate(async messageId => {`
1242.              `let msg = window.Store.Msg.get(messageId);`
1243.              `if(msg) return window.WWebJS.getMessageModel(msg);`

1245.              `const params = messageId.split('_');`
1246.              `if (params.length !== 3 &amp;&amp; params.length !== 4) throw new Error('Invalid serialized message id specified');`

1248.              `let messagesObject = await window.Store.Msg.getMessagesById([messageId]);`
1249.              `if (messagesObject &amp;&amp; messagesObject.messages.length) msg = messagesObject.messages[0];`

1251.              `if(msg) return window.WWebJS.getMessageModel(msg);`
1252.          `}, messageId);`

1254.          `if(msg) return new Message(this, msg);`
1255.          `return null;`
1256.      `}`

1258.      `/**`
1259.       `* Gets instances of all pinned messages in a chat`
1260.       `* @param {string} chatId The chat ID`
1261.       `* @returns {Promise&lt;Array&lt;Message>>}`
1262.       `*/`
1263.      `async getPinnedMessages(chatId) {`
1264.          `const pinnedMsgs = await this.pupPage.evaluate(async (chatId) => {`
1265.              `const chatWid = window.Store.WidFactory.createWid(chatId);`
1266.              `const chat = window.Store.Chat.get(chatWid) ?? await window.Store.Chat.find(chatWid);`
1267.              `if (!chat) return [];`

1269.              `const msgs = await window.Store.PinnedMsgUtils.getTable().equals(['chatId'], chatWid.toString());`

1271.              `const pinnedMsgs = (`
1272.                  `await Promise.all(`
1273.                      `msgs.filter(msg => msg.pinType == 1).map(async (msg) => {`
1274.                          `const res = await window.Store.Msg.getMessagesById([msg.parentMsgKey]);`
1275.                          `return res?.messages?.[0];`
1276.                      `})`
1277.                  `)`
1278.              `).filter(Boolean);`

1280.              `return !pinnedMsgs.length`
1281.                  `? []`
1282.                  `: await Promise.all(pinnedMsgs.map((msg) => window.WWebJS.getMessageModel(msg)));`
1283.          `}, chatId);`

1285.          `return pinnedMsgs.map((msg) => new Message(this, msg));`
1286.      `}`

1288.      `/**`
1289.       `* Returns an object with information about the invite code's group`
1290.       `* @param {string} inviteCode` 
1291.       `* @returns {Promise&lt;object>} Invite information`
1292.       `*/`
1293.      `async getInviteInfo(inviteCode) {`
1294.          `return await this.pupPage.evaluate(inviteCode => {`
1295.              `return window.Store.GroupInvite.queryGroupInvite(inviteCode);`
1296.          `}, inviteCode);`
1297.      `}`

1299.      `/**`
1300.       `* Accepts an invitation to join a group`
1301.       `* @param {string} inviteCode Invitation code`
1302.       `* @returns {Promise&lt;string>} Id of the joined Chat`
1303.       `*/`
1304.      `async acceptInvite(inviteCode) {`
1305.          `const res = await this.pupPage.evaluate(async inviteCode => {`
1306.              `return await window.Store.GroupInvite.joinGroupViaInvite(inviteCode);`
1307.          `}, inviteCode);`

1309.          `return res.gid._serialized;`
1310.      `}`

1312.      `/**`
1313.       `* Accepts a channel admin invitation and promotes the current user to a channel admin`
1314.       `* @param {string} channelId The channel ID to accept the admin invitation from`
1315.       `* @returns {Promise&lt;boolean>} Returns true if the operation completed successfully, false otherwise`
1316.       `*/`
1317.      `async acceptChannelAdminInvite(channelId) {`
1318.          `return await this.pupPage.evaluate(async (channelId) => {`
1319.              `try {`
1320.                  `await window.Store.ChannelUtils.acceptNewsletterAdminInvite(channelId);`
1321.                  `return true;`
1322.              `} catch (err) {`
1323.                  `if (err.name === 'ServerStatusCodeError') return false;`
1324.                  `throw err;`
1325.              `}`
1326.          `}, channelId);`
1327.      `}`

1329.      `/**`
1330.       `* Revokes a channel admin invitation sent to a user by a channel owner`
1331.       `* @param {string} channelId The channel ID an invitation belongs to`
1332.       `* @param {string} userId The user ID the invitation was sent to`
1333.       `* @returns {Promise&lt;boolean>} Returns true if the operation completed successfully, false otherwise`
1334.       `*/`
1335.      `async revokeChannelAdminInvite(channelId, userId) {`
1336.          `return await this.pupPage.evaluate(async (channelId, userId) => {`
1337.              `try {`
1338.                  `const userWid = window.Store.WidFactory.createWid(userId);`
1339.                  `await window.Store.ChannelUtils.revokeNewsletterAdminInvite(channelId, userWid);`
1340.                  `return true;`
1341.              `} catch (err) {`
1342.                  `if (err.name === 'ServerStatusCodeError') return false;`
1343.                  `throw err;`
1344.              `}`
1345.          `}, channelId, userId);`
1346.      `}`

1348.      `/**`
1349.       `* Demotes a channel admin to a regular subscriber (can be used also for self-demotion)`
1350.       `* @param {string} channelId The channel ID to demote an admin in`
1351.       `* @param {string} userId The user ID to demote`
1352.       `* @returns {Promise&lt;boolean>} Returns true if the operation completed successfully, false otherwise`
1353.       `*/`
1354.      `async demoteChannelAdmin(channelId, userId) {`
1355.          `return await this.pupPage.evaluate(async (channelId, userId) => {`
1356.              `try {`
1357.                  `const userWid = window.Store.WidFactory.createWid(userId);`
1358.                  `await window.Store.ChannelUtils.demoteNewsletterAdmin(channelId, userWid);`
1359.                  `return true;`
1360.              `} catch (err) {`
1361.                  `if (err.name === 'ServerStatusCodeError') return false;`
1362.                  `throw err;`
1363.              `}`
1364.          `}, channelId, userId);`
1365.      `}`

1367.      `/**`
1368.       `* Accepts a private invitation to join a group`
1369.       `* @param {object} inviteInfo Invite V4 Info`
1370.       `* @returns {Promise&lt;Object>}`
1371.       `*/`
1372.      `async acceptGroupV4Invite(inviteInfo) {`
1373.          `if (!inviteInfo.inviteCode) throw 'Invalid invite code, try passing the message.inviteV4 object';`
1374.          `if (inviteInfo.inviteCodeExp == 0) throw 'Expired invite code';`
1375.          `return this.pupPage.evaluate(async inviteInfo => {`
1376.              `let { groupId, fromId, inviteCode, inviteCodeExp } = inviteInfo;`
1377.              `let userWid = window.Store.WidFactory.createWid(fromId);`
1378.              `return await window.Store.GroupInviteV4.joinGroupViaInviteV4(inviteCode, String(inviteCodeExp), groupId, userWid);`
1379.          `}, inviteInfo);`
1380.      `}`

1382.      `/**`
1383.       `* Sets the current user's status message`
1384.       `* @param {string} status New status message`
1385.       `*/`
1386.      `async setStatus(status) {`
1387.          `await this.pupPage.evaluate(async status => {`
1388.              `return await window.Store.StatusUtils.setMyStatus(status);`
1389.          `}, status);`
1390.      `}`

1392.      `/**`
1393.       `* Sets the current user's display name.` 
1394.       `* This is the name shown to WhatsApp users that have not added you as a contact beside your number in groups and in your profile.`
1395.       `* @param {string} displayName New display name`
1396.       `* @returns {Promise&lt;Boolean>}`
1397.       `*/`
1398.      `async setDisplayName(displayName) {`
1399.          `const couldSet = await this.pupPage.evaluate(async displayName => {`
1400.              `if(!window.Store.Conn.canSetMyPushname()) return false;`
1401.              `await window.Store.Settings.setPushname(displayName);`
1402.              `return true;`
1403.          `}, displayName);`

1405.          `return couldSet;`
1406.      `}`

1408.      `/**`
1409.       `* Gets the current connection state for the client`
1410.       `* @returns {WAState}` 
1411.       `*/`
1412.      `async getState() {`
1413.          `return await this.pupPage.evaluate(() => {`
1414.              `if(!window.Store) return null;`
1415.              `return window.Store.AppState.state;`
1416.          `});`
1417.      `}`

1419.      `/**`
1420.       `* Marks the client as online`
1421.       `*/`
1422.      `async sendPresenceAvailable() {`
1423.          `return await this.pupPage.evaluate(() => {`
1424.              `return window.Store.PresenceUtils.sendPresenceAvailable();`
1425.          `});`
1426.      `}`

1428.      `/**`
1429.       `* Marks the client as unavailable`
1430.       `*/`
1431.      `async sendPresenceUnavailable() {`
1432.          `return await this.pupPage.evaluate(() => {`
1433.              `return window.Store.PresenceUtils.sendPresenceUnavailable();`
1434.          `});`
1435.      `}`

1437.      `/**`
1438.       `* Enables and returns the archive state of the Chat`
1439.       `* @returns {boolean}`
1440.       `*/`
1441.      `async archiveChat(chatId) {`
1442.          `return await this.pupPage.evaluate(async chatId => {`
1443.              `let chat = await window.WWebJS.getChat(chatId, { getAsModel: false });`
1444.              `await window.Store.Cmd.archiveChat(chat, true);`
1445.              `return true;`
1446.          `}, chatId);`
1447.      `}`

1449.      `/**`
1450.       `* Changes and returns the archive state of the Chat`
1451.       `* @returns {boolean}`
1452.       `*/`
1453.      `async unarchiveChat(chatId) {`
1454.          `return await this.pupPage.evaluate(async chatId => {`
1455.              `let chat = await window.WWebJS.getChat(chatId, { getAsModel: false });`
1456.              `await window.Store.Cmd.archiveChat(chat, false);`
1457.              `return false;`
1458.          `}, chatId);`
1459.      `}`

1461.      `/**`
1462.       `* Pins the Chat`
1463.       `* @returns {Promise&lt;boolean>} New pin state. Could be false if the max number of pinned chats was reached.`
1464.       `*/`
1465.      `async pinChat(chatId) {`
1466.          `return this.pupPage.evaluate(async chatId => {`
1467.              `let chat = await window.WWebJS.getChat(chatId, { getAsModel: false });`
1468.              `if (chat.pin) {`
1469.                  `return true;`
1470.              `}`
1471.              `const MAX_PIN_COUNT = 3;`
1472.              `const chatModels = window.Store.Chat.getModelsArray();`
1473.              `if (chatModels.length > MAX_PIN_COUNT) {`
1474.                  `let maxPinned = chatModels[MAX_PIN_COUNT - 1].pin;`
1475.                  `if (maxPinned) {`
1476.                      `return false;`
1477.                  `}`
1478.              `}`
1479.              `await window.Store.Cmd.pinChat(chat, true);`
1480.              `return true;`
1481.          `}, chatId);`
1482.      `}`

1484.      `/**`
1485.       `* Unpins the Chat`
1486.       `* @returns {Promise&lt;boolean>} New pin state`
1487.       `*/`
1488.      `async unpinChat(chatId) {`
1489.          `return this.pupPage.evaluate(async chatId => {`
1490.              `let chat = await window.WWebJS.getChat(chatId, { getAsModel: false });`
1491.              `if (!chat.pin) {`
1492.                  `return false;`
1493.              `}`
1494.              `await window.Store.Cmd.pinChat(chat, false);`
1495.              `return false;`
1496.          `}, chatId);`
1497.      `}`

1499.      `/**`
1500.       `* Mutes this chat forever, unless a date is specified`
1501.       `* @param {string} chatId ID of the chat that will be muted`
1502.       `* @param {?Date} unmuteDate Date when the chat will be unmuted, don't provide a value to mute forever`
1503.       `* @returns {Promise&lt;{isMuted: boolean, muteExpiration: number}>}`
1504.       `*/`
1505.      `async muteChat(chatId, unmuteDate) {`
1506.          `unmuteDate = unmuteDate ? Math.floor(unmuteDate.getTime() / 1000) : -1;`
1507.          `return this._muteUnmuteChat(chatId, 'MUTE', unmuteDate);`
1508.      `}`

1510.      `/**`
1511.       `* Unmutes the Chat`
1512.       `* @param {string} chatId ID of the chat that will be unmuted`
1513.       `* @returns {Promise&lt;{isMuted: boolean, muteExpiration: number}>}`
1514.       `*/`
1515.      `async unmuteChat(chatId) {`
1516.          `return this._muteUnmuteChat(chatId, 'UNMUTE');`
1517.      `}`

1519.      `/**`
1520.       `* Internal method to mute or unmute the chat`
1521.       `* @param {string} chatId ID of the chat that will be muted/unmuted`
1522.       `* @param {string} action The action: 'MUTE' or 'UNMUTE'`
1523.       `* @param {number} unmuteDateTs Timestamp at which the chat will be unmuted`
1524.       `* @returns {Promise&lt;{isMuted: boolean, muteExpiration: number}>}`
1525.       `*/`
1526.      `async _muteUnmuteChat (chatId, action, unmuteDateTs) {`
1527.          `return this.pupPage.evaluate(async (chatId, action, unmuteDateTs) => {`
1528.              `const chat = window.Store.Chat.get(chatId) ?? await window.Store.Chat.find(chatId);`
1529.              `action === 'MUTE'`
1530.                  `? await chat.mute.mute({ expiration: unmuteDateTs, sendDevice: true })`
1531.                  `: await chat.mute.unmute({ sendDevice: true });`
1532.              `return { isMuted: chat.mute.expiration !== 0, muteExpiration: chat.mute.expiration };`
1533.          `}, chatId, action, unmuteDateTs || -1);`
1534.      `}`

1536.      `/**`
1537.       `* Mark the Chat as unread`
1538.       `* @param {string} chatId ID of the chat that will be marked as unread`
1539.       `*/`
1540.      `async markChatUnread(chatId) {`
1541.          `await this.pupPage.evaluate(async chatId => {`
1542.              `let chat = await window.WWebJS.getChat(chatId, { getAsModel: false });`
1543.              `await window.Store.Cmd.markChatUnread(chat, true);`
1544.          `}, chatId);`
1545.      `}`

1547.      `/**`
1548.       `* Returns the contact ID's profile picture URL, if privacy settings allow it`
1549.       `* @param {string} contactId the whatsapp user's ID`
1550.       `* @returns {Promise&lt;string>}`
1551.       `*/`
1552.      `async getProfilePicUrl(contactId) {`
1553.          `const profilePic = await this.pupPage.evaluate(async contactId => {`
1554.              `try {`
1555.                  `const chatWid = window.Store.WidFactory.createWid(contactId);`
1556.                  `return window.compareWwebVersions(window.Debug.VERSION, '&lt;', '2.3000.0')`
1557.                      `? await window.Store.ProfilePic.profilePicFind(chatWid)`
1558.                      `: await window.Store.ProfilePic.requestProfilePicFromServer(chatWid);`
1559.              `} catch (err) {`
1560.                  `if(err.name === 'ServerStatusCodeError') return undefined;`
1561.                  `throw err;`
1562.              `}`
1563.          `}, contactId);`

1565.          `return profilePic ? profilePic.eurl : undefined;`
1566.      `}`

1568.      `/**`
1569.       `* Gets the Contact's common groups with you. Returns empty array if you don't have any common group.`
1570.       `* @param {string} contactId the whatsapp user's ID (_serialized format)`
1571.       `* @returns {Promise&lt;WAWebJS.ChatId[]>}`
1572.       `*/`
1573.      `async getCommonGroups(contactId) {`
1574.          `const commonGroups = await this.pupPage.evaluate(async (contactId) => {`
1575.              `let contact = window.Store.Contact.get(contactId);`
1576.              `if (!contact) {`
1577.                  `const wid = window.Store.WidFactory.createWid(contactId);`
1578.                  `const chatConstructor = window.Store.Contact.getModelsArray().find(c=>!c.isGroup).constructor;`
1579.                  `contact = new chatConstructor({id: wid});`
1580.              `}`

1582.              `if (contact.commonGroups) {`
1583.                  `return contact.commonGroups.serialize();`
1584.              `}`
1585.              `const status = await window.Store.findCommonGroups(contact);`
1586.              `if (status) {`
1587.                  `return contact.commonGroups.serialize();`
1588.              `}`
1589.              `return [];`
1590.          `}, contactId);`
1591.          `const chats = [];`
1592.          `for (const group of commonGroups) {`
1593.              `chats.push(group.id);`
1594.          `}`
1595.          `return chats;`
1596.      `}`

1598.      `/**`
1599.       `* Force reset of connection state for the client`
1600.      `*/`
1601.      `async resetState() {`
1602.          `await this.pupPage.evaluate(() => {`
1603.              `window.Store.AppState.reconnect();` 
1604.          `});`
1605.      `}`

1607.      `/**`
1608.       `* Check if a given ID is registered in whatsapp`
1609.       `* @param {string} id the whatsapp user's ID`
1610.       `* @returns {Promise&lt;Boolean>}`
1611.       `*/`
1612.      `async isRegisteredUser(id) {`
1613.          `return Boolean(await this.getNumberId(id));`
1614.      `}`

1616.      `/**`
1617.       `* Get the registered WhatsApp ID for a number.` 
1618.       `* Will return null if the number is not registered on WhatsApp.`
1619.       `* @param {string} number Number or ID ("@c.us" will be automatically appended if not specified)`
1620.       `* @returns {Promise&lt;Object|null>}`
1621.       `*/`
1622.      `async getNumberId(number) {`
1623.          `if (!number.endsWith('@c.us')) {`
1624.              `number += '@c.us';`
1625.          `}`

1627.          `return await this.pupPage.evaluate(async number => {`
1628.              `const wid = window.Store.WidFactory.createWid(number);`
1629.              `const result = await window.Store.QueryExist(wid);`
1630.              `if (!result || result.wid === undefined) return null;`
1631.              `return result.wid;`
1632.          `}, number);`
1633.      `}`

1635.      `/**`
1636.       `* Get the formatted number of a WhatsApp ID.`
1637.       `* @param {string} number Number or ID`
1638.       `* @returns {Promise&lt;string>}`
1639.       `*/`
1640.      `async getFormattedNumber(number) {`
1641.          `if (!number.endsWith('@s.whatsapp.net')) number = number.replace('c.us', 's.whatsapp.net');`
1642.          ``if (!number.includes('@s.whatsapp.net')) number = `${number}@s.whatsapp.net`;``

1644.          `return await this.pupPage.evaluate(async numberId => {`
1645.              `return window.Store.NumberInfo.formattedPhoneNumber(numberId);`
1646.          `}, number);`
1647.      `}`

1649.      `/**`
1650.       `* Get the country code of a WhatsApp ID.`
1651.       `* @param {string} number Number or ID`
1652.       `* @returns {Promise&lt;string>}`
1653.       `*/`
1654.      `async getCountryCode(number) {`
1655.          `number = number.replace(' ', '').replace('+', '').replace('@c.us', '');`

1657.          `return await this.pupPage.evaluate(async numberId => {`
1658.              `return window.Store.NumberInfo.findCC(numberId);`
1659.          `}, number);`
1660.      `}`

1662.      `/**`
1663.       `* An object that represents the result for a participant added to a group`
1664.       `* @typedef {Object} ParticipantResult`
1665.       `* @property {number} statusCode The status code of the result`
1666.       `* @property {string} message The result message`
1667.       `* @property {boolean} isGroupCreator Indicates if the participant is a group creator`
1668.       `* @property {boolean} isInviteV4Sent Indicates if the inviteV4 was sent to the participant`
1669.       `*/`

1671.      `/**`
1672.       `* An object that handles the result for {@link createGroup} method`
1673.       `* @typedef {Object} CreateGroupResult`
1674.       `* @property {string} title A group title`
1675.       `* @property {Object} gid An object that handles the newly created group ID`
1676.       `* @property {string} gid.server`
1677.       `* @property {string} gid.user`
1678.       `* @property {string} gid._serialized`
1679.       `* @property {Object.&lt;string, ParticipantResult>} participants An object that handles the result value for each added to the group participant`
1680.       `*/`

1682.      `/**`
1683.       `* An object that handles options for group creation`
1684.       `* @typedef {Object} CreateGroupOptions`
1685.       `* @property {number} [messageTimer = 0] The number of seconds for the messages to disappear in the group (0 by default, won't take an effect if the group is been creating with myself only)`
1686.       `* @property {string|undefined} parentGroupId The ID of a parent community group to link the newly created group with (won't take an effect if the group is been creating with myself only)`
1687.       `* @property {boolean} [autoSendInviteV4 = true] If true, the inviteV4 will be sent to those participants who have restricted others from being automatically added to groups, otherwise the inviteV4 won't be sent (true by default)`
1688.       `* @property {string} [comment = ''] The comment to be added to an inviteV4 (empty string by default)`
1689.       `* @property {boolean} [memberAddMode = false] If true, only admins can add members to the group (false by default)`
1690.       `* @property {boolean} [membershipApprovalMode = false] If true, group admins will be required to approve anyone who wishes to join the group (false by default)`
1691.       `* @property {boolean} [isRestrict = true] If true, only admins can change group group info (true by default)`
1692.       `* @property {boolean} [isAnnounce = false] If true, only admins can send messages (false by default)`
1693.       `*/`

1695.      `/**`
1696.       `* Creates a new group`
1697.       `* @param {string} title Group title`
1698.       `* @param {string|Contact|Array&lt;Contact|string>|undefined} participants A single Contact object or an ID as a string or an array of Contact objects or contact IDs to add to the group`
1699.       `* @param {CreateGroupOptions} options An object that handles options for group creation`
1700.       `* @returns {Promise&lt;CreateGroupResult|string>} Object with resulting data or an error message as a string`
1701.       `*/`
1702.      `async createGroup(title, participants = [], options = {}) {`
1703.          `!Array.isArray(participants) &amp;&amp; (participants = [participants]);`
1704.          `participants.map(p => (p instanceof Contact) ? p.id._serialized : p);`

1706.          `return await this.pupPage.evaluate(async (title, participants, options) => {`
1707.              `const {`
1708.                  `messageTimer = 0,`
1709.                  `parentGroupId,`
1710.                  `autoSendInviteV4 = true,`
1711.                  `comment = '',`
1712.              `} = options;`
1713.              `const participantData = {}, participantWids = [], failedParticipants = [];`
1714.              `let createGroupResult, parentGroupWid;`

1716.              `const addParticipantResultCodes = {`
1717.                  `default: 'An unknown error occupied while adding a participant',`
1718.                  `200: 'The participant was added successfully',`
1719.                  `403: 'The participant can be added by sending private invitation only',`
1720.                  `404: 'The phone number is not registered on WhatsApp'`
1721.              `};`

1723.              `for (const participant of participants) {`
1724.                  `const pWid = window.Store.WidFactory.createWid(participant);`
1725.                  `if ((await window.Store.QueryExist(pWid))?.wid) {`
1726.                      `participantWids.push({ phoneNumber: pWid });`
1727.                  `}`
1728.                  `else failedParticipants.push(participant);`
1729.              `}`

1731.              `parentGroupId &amp;&amp; (parentGroupWid = window.Store.WidFactory.createWid(parentGroupId));`

1733.              `try {`
1734.                  `createGroupResult = await window.Store.GroupUtils.createGroup(`
1735.                      `{`
1736.                          `'addressingModeOverride': 'lid',`
1737.                          `'memberAddMode': options.memberAddMode ?? false,`
1738.                          `'membershipApprovalMode': options.membershipApprovalMode ?? false,`
1739.                          `'announce': options.announce ?? false,`
1740.                          `'restrict': options.isRestrict !== undefined ? !options.isRestrict : false,`
1741.                          `'ephemeralDuration': messageTimer,`
1742.                          `'parentGroupId': parentGroupWid,`
1743.                          `'title': title,`
1744.                      `},`
1745.                      `participantWids`
1746.                  `);`
1747.              `} catch (err) {`
1748.                  `return 'CreateGroupError: An unknown error occupied while creating a group';`
1749.              `}`

1751.              `for (const participant of createGroupResult.participants) {`
1752.                  `let isInviteV4Sent = false;`
1753.                  `participant.wid.server == 'lid' &amp;&amp; (participant.wid = window.Store.LidUtils.getPhoneNumber(participant.wid));`
1754.                  `const participantId = participant.wid._serialized;`
1755.                  `const statusCode = participant.error || 200;`

1757.                  `if (autoSendInviteV4 &amp;&amp; statusCode === 403) {`
1758.                      `window.Store.Contact.gadd(participant.wid, { silent: true });`
1759.                      `const addParticipantResult = await window.Store.GroupInviteV4.sendGroupInviteMessage(`
1760.                          `window.Store.Chat.get(participant.wid) || await window.Store.Chat.find(participant.wid),`
1761.                          `createGroupResult.wid._serialized,`
1762.                          `createGroupResult.subject,`
1763.                          `participant.invite_code,`
1764.                          `participant.invite_code_exp,`
1765.                          `comment,`
1766.                          `await window.WWebJS.getProfilePicThumbToBase64(createGroupResult.wid)`
1767.                      `);`
1768.                      `isInviteV4Sent = addParticipantResult.messageSendResult === 'OK';`
1769.                  `}`

1771.                  `participantData[participantId] = {`
1772.                      `statusCode: statusCode,`
1773.                      `message: addParticipantResultCodes[statusCode] || addParticipantResultCodes.default,`
1774.                      `isGroupCreator: participant.type === 'superadmin',`
1775.                      `isInviteV4Sent: isInviteV4Sent`
1776.                  `};`
1777.              `}`

1779.              `for (const f of failedParticipants) {`
1780.                  `participantData[f] = {`
1781.                      `statusCode: 404,`
1782.                      `message: addParticipantResultCodes[404],`
1783.                      `isGroupCreator: false,`
1784.                      `isInviteV4Sent: false`
1785.                  `};`
1786.              `}`

1788.              `return { title: title, gid: createGroupResult.wid, participants: participantData };`
1789.          `}, title, participants, options);`
1790.      `}`

1792.      `/**`
1793.       `* An object that handles the result for {@link createChannel} method`
1794.       `* @typedef {Object} CreateChannelResult`
1795.       `* @property {string} title A channel title`
1796.       `* @property {ChatId} nid An object that handels the newly created channel ID`
1797.       `* @property {string} nid.server 'newsletter'`
1798.       `* @property {string} nid.user 'XXXXXXXXXX'`
1799.       `* @property {string} nid._serialized 'XXXXXXXXXX@newsletter'`
1800.       `* @property {string} inviteLink The channel invite link, starts with 'https://whatsapp.com/channel/'`
1801.       `* @property {number} createdAtTs The timestamp the channel was created at`
1802.       `*/`

1804.      `/**`
1805.       `* Options for the channel creation`
1806.       `* @typedef {Object} CreateChannelOptions`
1807.       `* @property {?string} description The channel description`
1808.       `* @property {?MessageMedia} picture The channel profile picture`
1809.       `*/`

1811.      `/**`
1812.       `* Creates a new channel`
1813.       `* @param {string} title The channel name`
1814.       `* @param {CreateChannelOptions} options` 
1815.       `* @returns {Promise&lt;CreateChannelResult|string>} Returns an object that handles the result for the channel creation or an error message as a string`
1816.       `*/`
1817.      `async createChannel(title, options = {}) {`
1818.          `return await this.pupPage.evaluate(async (title, options) => {`
1819.              `let response, { description = null, picture = null } = options;`

1821.              `if (!window.Store.ChannelUtils.isNewsletterCreationEnabled()) {`
1822.                  `return 'CreateChannelError: A channel creation is not enabled';`
1823.              `}`

1825.              `if (picture) {`
1826.                  `picture = await window.WWebJS.cropAndResizeImage(picture, {`
1827.                      `asDataUrl: true,`
1828.                      `mimetype: 'image/jpeg',`
1829.                      `size: 640,`
1830.                      `quality: 1`
1831.                  `});`
1832.              `}`

1834.              `try {`
1835.                  `response = await window.Store.ChannelUtils.createNewsletterQuery({`
1836.                      `name: title,`
1837.                      `description: description,`
1838.                      `picture: picture,`
1839.                  `});`
1840.              `} catch (err) {`
1841.                  `if (err.name === 'ServerStatusCodeError') {`
1842.                      `return 'CreateChannelError: An error occupied while creating a channel';`
1843.                  `}`
1844.                  `throw err;`
1845.              `}`

1847.              `return {`
1848.                  `title: title,`
1849.                  `nid: window.Store.JidToWid.newsletterJidToWid(response.idJid),`
1850.                  ``inviteLink: `https://whatsapp.com/channel/${response.newsletterInviteLinkMetadataMixin.inviteCode}`,``
1851.                  `createdAtTs: response.newsletterCreationTimeMetadataMixin.creationTimeValue`
1852.              `};`
1853.          `}, title, options);`
1854.      `}`

1856.      `/**`
1857.       `* Subscribe to channel`
1858.       `* @param {string} channelId The channel ID`
1859.       `* @returns {Promise&lt;boolean>} Returns true if the operation completed successfully, false otherwise`
1860.       `*/`
1861.      `async subscribeToChannel(channelId) {`
1862.          `return await this.pupPage.evaluate(async (channelId) => {`
1863.              `return await window.WWebJS.subscribeToUnsubscribeFromChannel(channelId, 'Subscribe');`
1864.          `}, channelId);`
1865.      `}`

1867.      `/**`
1868.       `* Options for unsubscribe from a channel`
1869.       `* @typedef {Object} UnsubscribeOptions`
1870.       `* @property {boolean} [deleteLocalModels = false] If true, after an unsubscription, it will completely remove a channel from the channel collection making it seem like the current user have never interacted with it. Otherwise it will only remove a channel from the list of channels the current user is subscribed to and will set the membership type for that channel to GUEST`
1871.       `*/`

1873.      `/**`
1874.       `* Unsubscribe from channel`
1875.       `* @param {string} channelId The channel ID`
1876.       `* @param {UnsubscribeOptions} options`
1877.       `* @returns {Promise&lt;boolean>} Returns true if the operation completed successfully, false otherwise`
1878.       `*/`
1879.      `async unsubscribeFromChannel(channelId, options) {`
1880.          `return await this.pupPage.evaluate(async (channelId, options) => {`
1881.              `return await window.WWebJS.subscribeToUnsubscribeFromChannel(channelId, 'Unsubscribe', options);`
1882.          `}, channelId, options);`
1883.      `}`

1885.      `/**`
1886.       `* Options for transferring a channel ownership to another user`
1887.       `* @typedef {Object} TransferChannelOwnershipOptions`
1888.       `* @property {boolean} [shouldDismissSelfAsAdmin = false] If true, after the channel ownership is being transferred to another user, the current user will be dismissed as a channel admin and will become to a channel subscriber.`
1889.       `*/`

1891.      `/**`
1892.       `* Transfers a channel ownership to another user.`
1893.       `* Note: the user you are transferring the channel ownership to must be a channel admin.`
1894.       `* @param {string} channelId`
1895.       `* @param {string} newOwnerId`
1896.       `* @param {TransferChannelOwnershipOptions} options`
1897.       `* @returns {Promise&lt;boolean>} Returns true if the operation completed successfully, false otherwise`
1898.       `*/`
1899.      `async transferChannelOwnership(channelId, newOwnerId, options = {}) {`
1900.          `return await this.pupPage.evaluate(async (channelId, newOwnerId, options) => {`
1901.              `const channel = await window.WWebJS.getChat(channelId, { getAsModel: false });`
1902.              `const newOwner = window.Store.Contact.get(newOwnerId) || (await window.Store.Contact.find(newOwnerId));`
1903.              `if (!channel.newsletterMetadata) {`
1904.                  `await window.Store.NewsletterMetadataCollection.update(channel.id);`
1905.              `}`

1907.              `try {`
1908.                  `await window.Store.ChannelUtils.changeNewsletterOwnerAction(channel, newOwner);`

1910.                  `if (options.shouldDismissSelfAsAdmin) {`
1911.                      `const meContact = window.Store.ContactCollection.getMeContact();`
1912.                      `meContact &amp;&amp; (await window.Store.ChannelUtils.demoteNewsletterAdminAction(channel, meContact));`
1913.                  `}`
1914.              `} catch (error) {`
1915.                  `return false;`
1916.              `}`

1918.              `return true;`
1919.          `}, channelId, newOwnerId, options);`
1920.      `}`

1922.      `/**`
1923.       `* Searches for channels based on search criteria, there are some notes:`
1924.       `* 1. The method finds only channels you are not subscribed to currently`
1925.       `* 2. If you have never been subscribed to a found channel`
1926.       `* or you have unsubscribed from it with {@link UnsubscribeOptions.deleteLocalModels} set to 'true',`
1927.       `* the lastMessage property of a found channel will be 'null'`
1928.       `*`
1929.       `* @param {Object} searchOptions Search options`
1930.       `* @param {string} [searchOptions.searchText = ''] Text to search`
1931.       `* @param {Array&lt;string>} [searchOptions.countryCodes = [your local region]] Array of country codes in 'ISO 3166-1 alpha-2' standart (@see https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) to search for channels created in these countries`
1932.       `* @param {boolean} [searchOptions.skipSubscribedNewsletters = false] If true, channels that user is subscribed to won't appear in found channels`
1933.       `* @param {number} [searchOptions.view = 0] View type, makes sense only when the searchText is empty. Valid values to provide are:`
1934.       `* 0 for RECOMMENDED channels`
1935.       `* 1 for TRENDING channels`
1936.       `* 2 for POPULAR channels`
1937.       `* 3 for NEW channels`
1938.       `* @param {number} [searchOptions.limit = 50] The limit of found channels to be appear in the returnig result`
1939.       `* @returns {Promise&lt;Array&lt;Channel>>} Returns an array of Channel objects or an empty array if no channels were found`
1940.       `*/`
1941.      `async searchChannels(searchOptions = {}) {`
1942.          `return await this.pupPage.evaluate(async ({`
1943.              `searchText = '',`
1944.              `countryCodes = [window.Store.ChannelUtils.currentRegion],`
1945.              `skipSubscribedNewsletters = false,`
1946.              `view = 0,`
1947.              `limit = 50`
1948.          `}) => {`
1949.              `searchText = searchText.trim();`
1950.              `const currentRegion = window.Store.ChannelUtils.currentRegion;`
1951.              `if (![0, 1, 2, 3].includes(view)) view = 0;`

1953.              `countryCodes = countryCodes.length === 1 &amp;&amp; countryCodes[0] === currentRegion`
1954.                  `? countryCodes`
1955.                  `: countryCodes.filter((code) => Object.keys(window.Store.ChannelUtils.countryCodesIso).includes(code));`

1957.              `const viewTypeMapping = {`
1958.                  `0: 'RECOMMENDED',`
1959.                  `1: 'TRENDING',`
1960.                  `2: 'POPULAR',`
1961.                  `3: 'NEW'`
1962.              `};`

1964.              `searchOptions = {`
1965.                  `searchText: searchText,`
1966.                  `countryCodes: countryCodes,`
1967.                  `skipSubscribedNewsletters: skipSubscribedNewsletters,`
1968.                  `view: viewTypeMapping[view],`
1969.                  `categories: [],`
1970.                  `cursorToken: ''`
1971.              `};`

1973.              `const originalFunction = window.Store.ChannelUtils.getNewsletterDirectoryPageSize;`
1974.              `limit !== 50 &amp;&amp; (window.Store.ChannelUtils.getNewsletterDirectoryPageSize = () => limit);`

1976.              `const channels = (await window.Store.ChannelUtils.fetchNewsletterDirectories(searchOptions)).newsletters;`

1978.              `limit !== 50 &amp;&amp; (window.Store.ChannelUtils.getNewsletterDirectoryPageSize = originalFunction);`

1980.              `return channels`
1981.                  `? await Promise.all(channels.map((channel) => window.WWebJS.getChatModel(channel, { isChannel: true })))`
1982.                  `: [];`
1983.          `}, searchOptions);`
1984.      `}`

1986.      `/**`
1987.       `* Deletes the channel you created`
1988.       `* @param {string} channelId The ID of a channel to delete`
1989.       `* @returns {Promise&lt;boolean>} Returns true if the operation completed successfully, false otherwise`
1990.       `*/`
1991.      `async deleteChannel(channelId) {`
1992.          `return await this.client.pupPage.evaluate(async (channelId) => {`
1993.              `const channel = await window.WWebJS.getChat(channelId, { getAsModel: false });`
1994.              `if (!channel) return false;`
1995.              `try {`
1996.                  `await window.Store.ChannelUtils.deleteNewsletterAction(channel);`
1997.                  `return true;`
1998.              `} catch (err) {`
1999.                  `if (err.name === 'ServerStatusCodeError') return false;`
2000.                  `throw err;`
2001.              `}`
2002.          `}, channelId);`
2003.      `}`

2005.      `/**`
2006.       `* Get all current Labels`
2007.       `* @returns {Promise&lt;Array&lt;Label>>}`
2008.       `*/`
2009.      `async getLabels() {`
2010.          `const labels = await this.pupPage.evaluate(async () => {`
2011.              `return window.WWebJS.getLabels();`
2012.          `});`

2014.          `return labels.map(data => new Label(this, data));`
2015.      `}`

2017.      `/**`
2018.       `* Get all current Broadcast`
2019.       `* @returns {Promise&lt;Array&lt;Broadcast>>}`
2020.       `*/`
2021.      `async getBroadcasts() {`
2022.          `const broadcasts = await this.pupPage.evaluate(async () => {`
2023.              `return window.WWebJS.getAllStatuses();`
2024.          `});`
2025.          `return broadcasts.map(data => new Broadcast(this, data));`
2026.      `}`

2028.      `/**`
2029.       `* Get broadcast instance by current user ID`
2030.       `* @param {string} contactId`
2031.       `* @returns {Promise&lt;Broadcast>}`
2032.       `*/`
2033.      `async getBroadcastById(contactId) {`
2034.          `const broadcast = await this.pupPage.evaluate(async (userId) => {`
2035.              `let status;`
2036.              `try {`
2037.                  `status = window.Store.Status.get(userId);`
2038.                  `if (!status) {`
2039.                      `status = await window.Store.Status.find(userId);`
2040.                  `}`
2041.              `} catch {`
2042.                  `status = null;`
2043.              `}`

2045.              `if (status) return window.WWebJS.getStatusModel(status);`
2046.          `}, contactId);`
2047.          `return new Broadcast(this, broadcast);`
2048.      `}`

2050.      `/**`
2051.       `* Revoke current own status messages`
2052.       `* @param {string} messageId`
2053.       `* @returns {Promise&lt;void>}`
2054.       `*/`
2055.      `async revokeStatusMessage(messageId) {`
2056.          `return await this.pupPage.evaluate(async (msgId) => {`
2057.              `const status = window.Store.Status.getMyStatus();`
2058.              `if (!status) return;`

2060.              `const msg =`
2061.                  `window.Store.Msg.get(msgId) || (await window.Store.Msg.getMessagesById([msgId]))?.messages?.[0];`
2062.              `if (!msg) return;`

2064.              `if (!msg.id.fromMe || !msg.id.remote.isStatus())`
2065.                  `throw 'Invalid usage! Can only revoke the message its from own status broadcast';`

2067.              `return await window.Store.StatusUtils.sendStatusRevokeMsgAction(status, msg);`
2068.          `}, messageId);`
2069.      `}`

2071.      `/**`
2072.       `* Get Label instance by ID`
2073.       `* @param {string} labelId`
2074.       `* @returns {Promise&lt;Label>}`
2075.       `*/`
2076.      `async getLabelById(labelId) {`
2077.          `const label = await this.pupPage.evaluate(async (labelId) => {`
2078.              `return window.WWebJS.getLabel(labelId);`
2079.          `}, labelId);`

2081.          `return new Label(this, label);`
2082.      `}`

2084.      `/**`
2085.       `* Get all Labels assigned to a chat` 
2086.       `* @param {string} chatId`
2087.       `* @returns {Promise&lt;Array&lt;Label>>}`
2088.       `*/`
2089.      `async getChatLabels(chatId) {`
2090.          `const labels = await this.pupPage.evaluate(async (chatId) => {`
2091.              `return window.WWebJS.getChatLabels(chatId);`
2092.          `}, chatId);`

2094.          `return labels.map(data => new Label(this, data));`
2095.      `}`

2097.      `/**`
2098.       `* Get all Chats for a specific Label`
2099.       `* @param {string} labelId`
2100.       `* @returns {Promise&lt;Array&lt;Chat>>}`
2101.       `*/`
2102.      `async getChatsByLabelId(labelId) {`
2103.          `const chatIds = await this.pupPage.evaluate(async (labelId) => {`
2104.              `const label = window.Store.Label.get(labelId);`
2105.              `const labelItems = label.labelItemCollection.getModelsArray();`
2106.              `return labelItems.reduce((result, item) => {`
2107.                  `if (item.parentType === 'Chat') {`
2108.                      `result.push(item.parentId);`
2109.                  `}`
2110.                  `return result;`
2111.              `}, []);`
2112.          `}, labelId);`

2114.          `return Promise.all(chatIds.map(id => this.getChatById(id)));`
2115.      `}`

2117.      `/**`
2118.       `* Gets all blocked contacts by host account`
2119.       `* @returns {Promise&lt;Array&lt;Contact>>}`
2120.       `*/`
2121.      `async getBlockedContacts() {`
2122.          `const blockedContacts = await this.pupPage.evaluate(() => {`
2123.              `let chatIds = window.Store.Blocklist.getModelsArray().map(a => a.id._serialized);`
2124.              `return Promise.all(chatIds.map(id => window.WWebJS.getContact(id)));`
2125.          `});`

2127.          `return blockedContacts.map(contact => ContactFactory.create(this.client, contact));`
2128.      `}`

2130.      `/**`
2131.       `* Sets the current user's profile picture.`
2132.       `* @param {MessageMedia} media`
2133.       `* @returns {Promise&lt;boolean>} Returns true if the picture was properly updated.`
2134.       `*/`
2135.      `async setProfilePicture(media) {`
2136.          `const success = await this.pupPage.evaluate((chatid, media) => {`
2137.              `return window.WWebJS.setPicture(chatid, media);`
2138.          `}, this.info.wid._serialized, media);`

2140.          `return success;`
2141.      `}`

2143.      `/**`
2144.       `* Deletes the current user's profile picture.`
2145.       `* @returns {Promise&lt;boolean>} Returns true if the picture was properly deleted.`
2146.       `*/`
2147.      `async deleteProfilePicture() {`
2148.          `const success = await this.pupPage.evaluate((chatid) => {`
2149.              `return window.WWebJS.deletePicture(chatid);`
2150.          `}, this.info.wid._serialized);`

2152.          `return success;`
2153.      `}`

2155.      `/**`
2156.       `* Change labels in chats`
2157.       `* @param {Array&lt;number|string>} labelIds`
2158.       `* @param {Array&lt;string>} chatIds`
2159.       `* @returns {Promise&lt;void>}`
2160.       `*/`
2161.      `async addOrRemoveLabels(labelIds, chatIds) {`

2163.          `return this.pupPage.evaluate(async (labelIds, chatIds) => {`
2164.              `if (['smba', 'smbi'].indexOf(window.Store.Conn.platform) === -1) {`
2165.                  `throw '[LT01] Only Whatsapp business';`
2166.              `}`
2167.              `const labels = window.WWebJS.getLabels().filter(e => labelIds.find(l => l == e.id) !== undefined);`
2168.              `const chats = window.Store.Chat.filter(e => chatIds.includes(e.id._serialized));`

2170.              `let actions = labels.map(label => ({id: label.id, type: 'add'}));`

2172.              `chats.forEach(chat => {`
2173.                  `(chat.labels || []).forEach(n => {`
2174.                      `if (!actions.find(e => e.id == n)) {`
2175.                          `actions.push({id: n, type: 'remove'});`
2176.                      `}`
2177.                  `});`
2178.              `});`

2180.              `return await window.Store.Label.addOrRemoveLabels(actions, chats);`
2181.          `}, labelIds, chatIds);`
2182.      `}`

2184.      `/**`
2185.       `* An object that handles the information about the group membership request`
2186.       `* @typedef {Object} GroupMembershipRequest`
2187.       `* @property {Object} id The wid of a user who requests to enter the group`
2188.       `* @property {Object} addedBy The wid of a user who created that request`
2189.       `* @property {Object|null} parentGroupId The wid of a community parent group to which the current group is linked`
2190.       `* @property {string} requestMethod The method used to create the request: NonAdminAdd/InviteLink/LinkedGroupJoin`
2191.       `* @property {number} t The timestamp the request was created at`
2192.       `*/`

2194.      `/**`
2195.       `* Gets an array of membership requests`
2196.       `* @param {string} groupId The ID of a group to get membership requests for`
2197.       `* @returns {Promise&lt;Array&lt;GroupMembershipRequest>>} An array of membership requests`
2198.       `*/`
2199.      `async getGroupMembershipRequests(groupId) {`
2200.          `return await this.pupPage.evaluate(async (groupId) => {`
2201.              `const groupWid = window.Store.WidFactory.createWid(groupId);`
2202.              `return await window.Store.MembershipRequestUtils.getMembershipApprovalRequests(groupWid);`
2203.          `}, groupId);`
2204.      `}`

2206.      `/**`
2207.       `* An object that handles the result for membership request action`
2208.       `* @typedef {Object} MembershipRequestActionResult`
2209.       `* @property {string} requesterId User ID whos membership request was approved/rejected`
2210.       `* @property {number|undefined} error An error code that occurred during the operation for the participant`
2211.       `* @property {string} message A message with a result of membership request action`
2212.       `*/`

2214.      `/**`
2215.       `* An object that handles options for {@link approveGroupMembershipRequests} and {@link rejectGroupMembershipRequests} methods`
2216.       `* @typedef {Object} MembershipRequestActionOptions`
2217.       `* @property {Array&lt;string>|string|null} requesterIds User ID/s who requested to join the group, if no value is provided, the method will search for all membership requests for that group`
2218.       `* @property {Array&lt;number>|number|null} sleep The number of milliseconds to wait before performing an operation for the next requester. If it is an array, a random sleep time between the sleep[0] and sleep[1] values will be added (the difference must be >=100 ms, otherwise, a random sleep time between sleep[1] and sleep[1] + 100 will be added). If sleep is a number, a sleep time equal to its value will be added. By default, sleep is an array with a value of [250, 500]`
2219.       `*/`

2221.      `/**`
2222.       `* Approves membership requests if any`
2223.       `* @param {string} groupId The group ID to get the membership request for`
2224.       `* @param {MembershipRequestActionOptions} options Options for performing a membership request action`
2225.       `* @returns {Promise&lt;Array&lt;MembershipRequestActionResult>>} Returns an array of requester IDs whose membership requests were approved and an error for each requester, if any occurred during the operation. If there are no requests, an empty array will be returned`
2226.       `*/`
2227.      `async approveGroupMembershipRequests(groupId, options = {}) {`
2228.          `return await this.pupPage.evaluate(async (groupId, options) => {`
2229.              `const { requesterIds = null, sleep = [250, 500] } = options;`
2230.              `return await window.WWebJS.membershipRequestAction(groupId, 'Approve', requesterIds, sleep);`
2231.          `}, groupId, options);`
2232.      `}`

2234.      `/**`
2235.       `* Rejects membership requests if any`
2236.       `* @param {string} groupId The group ID to get the membership request for`
2237.       `* @param {MembershipRequestActionOptions} options Options for performing a membership request action`
2238.       `* @returns {Promise&lt;Array&lt;MembershipRequestActionResult>>} Returns an array of requester IDs whose membership requests were rejected and an error for each requester, if any occurred during the operation. If there are no requests, an empty array will be returned`
2239.       `*/`
2240.      `async rejectGroupMembershipRequests(groupId, options = {}) {`
2241.          `return await this.pupPage.evaluate(async (groupId, options) => {`
2242.              `const { requesterIds = null, sleep = [250, 500] } = options;`
2243.              `return await window.WWebJS.membershipRequestAction(groupId, 'Reject', requesterIds, sleep);`
2244.          `}, groupId, options);`
2245.      `}`

2248.      `/**`
2249.       `* Setting  autoload download audio`
2250.       `* @param {boolean} flag true/false`
2251.       `*/`
2252.      `async setAutoDownloadAudio(flag) {`
2253.          `await this.pupPage.evaluate(async flag => {`
2254.              `const autoDownload = window.Store.Settings.getAutoDownloadAudio();`
2255.              `if (autoDownload === flag) {`
2256.                  `return flag;`
2257.              `}`
2258.              `await window.Store.Settings.setAutoDownloadAudio(flag);`
2259.              `return flag;`
2260.          `}, flag);`
2261.      `}`

2263.      `/**`
2264.       `* Setting  autoload download documents`
2265.       `* @param {boolean} flag true/false`
2266.       `*/`
2267.      `async setAutoDownloadDocuments(flag) {`
2268.          `await this.pupPage.evaluate(async flag => {`
2269.              `const autoDownload = window.Store.Settings.getAutoDownloadDocuments();`
2270.              `if (autoDownload === flag) {`
2271.                  `return flag;`
2272.              `}`
2273.              `await window.Store.Settings.setAutoDownloadDocuments(flag);`
2274.              `return flag;`
2275.          `}, flag);`
2276.      `}`

2278.      `/**`
2279.       `* Setting  autoload download photos`
2280.       `* @param {boolean} flag true/false`
2281.       `*/`
2282.      `async setAutoDownloadPhotos(flag) {`
2283.          `await this.pupPage.evaluate(async flag => {`
2284.              `const autoDownload = window.Store.Settings.getAutoDownloadPhotos();`
2285.              `if (autoDownload === flag) {`
2286.                  `return flag;`
2287.              `}`
2288.              `await window.Store.Settings.setAutoDownloadPhotos(flag);`
2289.              `return flag;`
2290.          `}, flag);`
2291.      `}`

2293.      `/**`
2294.       `* Setting  autoload download videos`
2295.       `* @param {boolean} flag true/false`
2296.       `*/`
2297.      `async setAutoDownloadVideos(flag) {`
2298.          `await this.pupPage.evaluate(async flag => {`
2299.              `const autoDownload = window.Store.Settings.getAutoDownloadVideos();`
2300.              `if (autoDownload === flag) {`
2301.                  `return flag;`
2302.              `}`
2303.              `await window.Store.Settings.setAutoDownloadVideos(flag);`
2304.              `return flag;`
2305.          `}, flag);`
2306.      `}`

2308.      `/**`
2309.       `* Setting background synchronization.`
2310.       `* NOTE: this action will take effect after you restart the client.`
2311.       `* @param {boolean} flag true/false`
2312.       `* @returns {Promise&lt;boolean>}`
2313.       `*/`
2314.      `async setBackgroundSync(flag) {`
2315.          `return await this.pupPage.evaluate(async flag => {`
2316.              `const backSync = window.Store.Settings.getGlobalOfflineNotifications();`
2317.              `if (backSync === flag) {`
2318.                  `return flag;`
2319.              `}`
2320.              `await window.Store.Settings.setGlobalOfflineNotifications(flag);`
2321.              `return flag;`
2322.          `}, flag);`
2323.      `}`

2325.      `/**`
2326.       `* Get user device count by ID`
2327.       `* Each WaWeb Connection counts as one device, and the phone (if exists) counts as one`
2328.       `* So for a non-enterprise user with one WaWeb connection it should return "2"`
2329.       `* @param {string} userId`
2330.       `* @returns {Promise&lt;number>}`
2331.       `*/`
2332.      `async getContactDeviceCount(userId) {`
2333.          `return await this.pupPage.evaluate(async (userId) => {`
2334.              `const devices = await window.Store.DeviceList.getDeviceIds([window.Store.WidFactory.createWid(userId)]);`
2335.              `if (devices &amp;&amp; devices.length &amp;&amp; devices[0] != null &amp;&amp; typeof devices[0].devices == 'object') {`
2336.                  `return devices[0].devices.length;`
2337.              `}`
2338.              `return 0;`
2339.          `}, userId);`
2340.      `}`

2342.      `/**`
2343.       `* Sync chat history conversation`
2344.       `* @param {string} chatId`
2345.       `* @return {Promise&lt;boolean>} True if operation completed successfully, false otherwise.`
2346.       `*/`
2347.      `async syncHistory(chatId) {`
2348.          `return await this.pupPage.evaluate(async (chatId) => {`
2349.              `const chatWid = window.Store.WidFactory.createWid(chatId);`
2350.              `const chat = window.Store.Chat.get(chatWid) ?? (await window.Store.Chat.find(chatWid));`
2351.              `if (chat?.endOfHistoryTransferType === 0) {`
2352.                  `await window.Store.HistorySync.sendPeerDataOperationRequest(3, {`
2353.                      `chatId: chat.id`
2354.                  `});`
2355.                  `return true;`
2356.              `}`
2357.              `return false;`
2358.          `}, chatId);`
2359.      `}`

2361.      `/**`
2362.       `* Generates a WhatsApp call link (video call or voice call)`
2363.       `* @param {Date} startTime The start time of the call`
2364.       `` * @param {string} callType The type of a WhatsApp call link to generate, valid values are: `video` | `voice` ``
2365.       `* @returns {Promise&lt;string>} The WhatsApp call link (https://call.whatsapp.com/video/XxXxXxXxXxXxXx) or an empty string if a generation failed.`
2366.       `*/`
2367.      `async createCallLink(startTime, callType) {`
2368.          `if (!['video', 'voice'].includes(callType)) {`
2369.              `throw new class CreateCallLinkError extends Error {`
2370.                  `constructor(m) { super(m); }`
2371.              `}('Invalid \'callType\' parameter value is provided. Valid values are: \'voice\' | \'video\'.');`
2372.          `}`

2374.          `startTime = Math.floor(startTime.getTime() / 1000);`

2376.          `return await this.pupPage.evaluate(async (startTimeTs, callType) => {`
2377.              `const response = await window.Store.ScheduledEventMsgUtils.createEventCallLink(startTimeTs, callType);`
2378.              `return response ?? '';`
2379.          `}, startTime, callType);`
2380.      `}`

2382.      `/**`
2383.       `* Sends a response to the scheduled event message, indicating whether a user is going to attend the event or not`
2384.       ``* @param {number} response The response code to the scheduled event message. Valid values are: `0` for NONE response (removes a previous response) | `1` for GOING | `2` for NOT GOING | `3` for MAYBE going``
2385.       `* @param {string} eventMessageId The scheduled event message ID`
2386.       `* @returns {Promise&lt;boolean>}`
2387.       `*/`
2388.      `async sendResponseToScheduledEvent(response, eventMessageId) {`
2389.          `if (![0, 1, 2, 3].includes(response)) return false;`

2391.          `return await this.pupPage.evaluate(async (response, msgId) => {`
2392.              `const eventMsg = window.Store.Msg.get(msgId) || (await window.Store.Msg.getMessagesById([msgId]))?.messages?.[0];`
2393.              `if (!eventMsg) return false;`

2395.              `await window.Store.ScheduledEventMsgUtils.sendEventResponseMsg(response, eventMsg);`
2396.              `return true;`
2397.          `}, response, eventMessageId);`
2398.      `}`

2400.      `/**`
2401.       `* Save new contact to user's addressbook or edit the existing one`
2402.       `* @param {string} phoneNumber The contact's phone number in a format "17182222222", where "1" is a country code`
2403.       `* @param {string} firstName` 
2404.       `* @param {string} lastName` 
2405.       `* @param {boolean} [syncToAddressbook = false] If set to true, the contact will also be saved to the user's address book on their phone. False by default`
2406.       `* @returns {Promise&lt;void>}`
2407.       `*/`
2408.      `async saveOrEditAddressbookContact(phoneNumber, firstName, lastName, syncToAddressbook = false)`
2409.      `{`
2410.          `return await this.pupPage.evaluate(async (phoneNumber, firstName, lastName, syncToAddressbook) => {`
2411.              `return await window.Store.AddressbookContactUtils.saveContactAction(`
2412.                  `phoneNumber,`
2413.                  `phoneNumber,`
2414.                  `null,`
2415.                  `null,`
2416.                  `firstName,`
2417.                  `lastName,`
2418.                  `syncToAddressbook`
2419.              `);`
2420.          `}, phoneNumber, firstName, lastName, syncToAddressbook);`
2421.      `}`

2423.      `/**`
2424.       `* Deletes the contact from user's addressbook`
2425.       `* @param {string} phoneNumber The contact's phone number in a format "17182222222", where "1" is a country code`
2426.       `* @returns {Promise&lt;void>}`
2427.       `*/`
2428.      `async deleteAddressbookContact(phoneNumber)`
2429.      `{`
2430.          `return await this.pupPage.evaluate(async (phoneNumber) => {`
2431.              `return await window.Store.AddressbookContactUtils.deleteContactAction(phoneNumber);`
2432.          `}, phoneNumber);`
2433.      `}`

2435.      `/**`
2436.       `* Get lid and phone number for multiple users`
2437.       `* @param {string[]} userIds - Array of user IDs`
2438.       `* @returns {Promise&lt;Array&lt;{ lid: string, pn: string }>>}`
2439.       `*/`
2440.      `async getContactLidAndPhone(userIds) {`
2441.          `return await this.pupPage.evaluate(async (userIds) => {`
2442.              `if (!Array.isArray(userIds)) userIds = [userIds];`

2444.              `return await Promise.all(userIds.map(async (userId) => {`
2445.                  `const { lid, phone } = await window.WWebJS.enforceLidAndPnRetrieval(userId);`

2447.                  `return {`
2448.                      `lid: lid?._serialized,`
2449.                      `pn: phone?._serialized`
2450.                  `};`
2451.              `}));`
2452.          `}, userIds);`
2453.      `}`

2455.      `/**`
2456.       `* Add or edit a customer note`
2457.       `* @see https://faq.whatsapp.com/1433099287594476`
2458.       `* @param {string} userId The ID of a customer to add a note to`
2459.       `* @param {string} note The note to add`
2460.       `* @returns {Promise&lt;void>}`
2461.       `*/`
2462.      `async addOrEditCustomerNote(userId, note) {`
2463.          `return await this.pupPage.evaluate(async (userId, note) => {`
2464.              `if (!window.Store.BusinessGatingUtils.smbNotesV1Enabled()) return;`

2466.              `return window.Store.CustomerNoteUtils.noteAddAction(`
2467.                  `'unstructured',`
2468.                  `window.Store.WidToJid.widToUserJid(window.Store.WidFactory.createWid(userId)),`
2469.                  `note`
2470.              `);`
2471.          `}, userId, note);`
2472.      `}`

2474.      `/**`
2475.       `* Get a customer note`
2476.       `* @see https://faq.whatsapp.com/1433099287594476`
2477.       `* @param {string} userId The ID of a customer to get a note from`
2478.       `* @returns {Promise&lt;{`
2479.       `*    chatId: string,`
2480.       `*    content: string,`
2481.       `*    createdAt: number,`
2482.       `*    id: string,`
2483.       `*    modifiedAt: number,`
2484.       `*    type: string`
2485.       `* }>}`
2486.       `*/`
2487.      `async getCustomerNote(userId) {`
2488.          `return await this.pupPage.evaluate(async (userId) => {`
2489.              `if (!window.Store.BusinessGatingUtils.smbNotesV1Enabled()) return null;`

2491.              `const note = await window.Store.CustomerNoteUtils.retrieveOnlyNoteForChatJid(`
2492.                  `window.Store.WidToJid.widToUserJid(window.Store.WidFactory.createWid(userId))`
2493.              `);`

2495.              `let serialized = note?.serialize();`

2497.              `if (!serialized) return null;`

2499.              `serialized.chatId = window.Store.JidToWid.userJidToUserWid(serialized.chatJid)._serialized;`
2500.              `delete serialized.chatJid;`

2502.              `return serialized;`
2503.          `}, userId);`
2504.      `}`

2506.      `/**`
2507.       `* Get Poll Votes`
2508.       `* @param {string} messageId`
2509.       `* @return {Promise&lt;Array&lt;PollVote>>}` 
2510.       `*/`
2511.      `async getPollVotes(messageId) {`
2512.          `const msg = await this.getMessageById(messageId);`
2513.          `if (!msg) return [];`
2514.          `if (msg.type != MessageTypes.POLL_CREATION) throw 'Invalid usage! Can only be used with a pollCreation message';`

2516.          `const pollVotes = await this.pupPage.evaluate( async (msg) => {`
2517.              `const msgKey = window.Store.MsgKey.fromString(msg.id._serialized);`
2518.              `let pollVotes = await window.Store.PollsVotesSchema.getTable().equals(['parentMsgKey'], msgKey.toString());`

2520.              `return pollVotes.map(item => {`
2521.                  `const typedArray = new Uint8Array(item.selectedOptionLocalIds);`
2522.                  `return {`
2523.                      `...item,`
2524.                      `selectedOptionLocalIds: Array.from(typedArray)`
2525.                  `};`
2526.              `});`
2527.          `}, msg);`

2529.          `return pollVotes.map((pollVote) => new PollVote(this.client, {...pollVote, parentMessage: msg}));`
2530.      `}`
2531.  `}`

2533.  `module.exports = Client;`

--- END OF FILE: ClientInfo.html.md ---
--- START OF FILE: ClientInfo.html.md ---

Source: https://docs.wwebjs.dev/ClientInfo.html

## Properties

[me](ClientInfo.html#me)

[phone](ClientInfo.html#phone)

[platform](ClientInfo.html#platform)

[pushname](ClientInfo.html#pushname)

[wid](ClientInfo.html#wid)

## Method

[getBatteryStatus()](ClientInfo.html#getBatteryStatus)

## new ClientInfo()

Extends

[Base](Base.html)

## Properties

### me  object

Deprecated

Use .wid instead

### phone  object

Information about the phone this client is connected to. Not available in multi-device.

#### Properties

Name

Type

Optional

Description

wa\_version

string

WhatsApp Version running on the phone

os\_version

string

OS Version running on the phone (iOS or Android version)

device\_manufacturer

string

Device manufacturer

device\_model

string

Device model

os\_build\_number

string

OS build number

Deprecated

### platform  string

Platform WhatsApp is running on

### pushname  string

Name configured to be shown in push notifications

### wid  object

Current user ID

## Method

async

### getBatteryStatus() → (object, number, or boolean)

Get current battery percentage and charging status for the attached device

Deprecated

Returns

`object` 

batteryStatus

`number` 

batteryStatus.battery - The current battery percentage

`boolean` 

batteryStatus.plugged - Indicates if the phone is plugged in (true) or not (false)

--- END OF FILE: Contact.html.md ---
--- START OF FILE: Contact.html.md ---

Source: https://docs.wwebjs.dev/Contact.html

## Properties

[id](Contact.html#id)

[isBlocked](Contact.html#isBlocked)

[isBusiness](Contact.html#isBusiness)

[isEnterprise](Contact.html#isEnterprise)

[isGroup](Contact.html#isGroup)

[isMe](Contact.html#isMe)

[isMyContact](Contact.html#isMyContact)

[isUser](Contact.html#isUser)

[isWAContact](Contact.html#isWAContact)

[name](Contact.html#name)

[number](Contact.html#number)

[pushname](Contact.html#pushname)

[shortName](Contact.html#shortName)

## Methods

[block()](Contact.html#block)

[getAbout()](Contact.html#getAbout)

[getBroadcast()](Contact.html#getBroadcast)

[getChat()](Contact.html#getChat)

[getCommonGroups()](Contact.html#getCommonGroups)

[getCountryCode()](Contact.html#getCountryCode)

[getFormattedNumber()](Contact.html#getFormattedNumber)

[getProfilePicUrl()](Contact.html#getProfilePicUrl)

[unblock()](Contact.html#unblock)

## new Contact()

Extends

[Base](Base.html)

## Properties

### id  [ContactId](global.html#ContactId)

ID that represents the contact

### isBlocked  boolean

Indicates if you have blocked this contact

### isBusiness  boolean

Indicates if the contact is a business contact

### isEnterprise  boolean

Indicates if the contact is an enterprise contact

### isGroup  boolean

Indicates if the contact is a group contact

### isMe  boolean

Indicates if the contact is the current user's contact

### isMyContact  boolean

Indicates if the number is saved in the current phone's contacts

### isUser  boolean

Indicates if the contact is a user contact

### isWAContact  boolean

Indicates if the number is registered on WhatsApp

### name  nullable string

The contact's name, as saved by the current user

### number  string

Contact's phone number

### pushname  string

The name that the contact has configured to be shown publically

### shortName  nullable string

A shortened version of name

## Methods

async

### block() → Promise containing boolean

Blocks this contact from WhatsApp

Returns

`Promise containing boolean` 

async

### getAbout() → Promise containing nullable string

Gets the Contact's current "about" info. Returns null if you don't have permission to read their status.

Returns

`Promise containing nullable string` 

async

### getBroadcast() → Promise containing [Broadcast](Broadcast.html)

Gets the Contact's current status broadcast.

Returns

`Promise containing [Broadcast](Broadcast.html)` 

async

### getChat() → Promise containing [Chat](Chat.html)

Returns the Chat that corresponds to this Contact. Will return null when getting chat for currently logged in user.

Returns

`Promise containing [Chat](Chat.html)` 

async

### getCommonGroups() → Promise containing Array of WAWebJS.ChatId

Gets the Contact's common groups with you. Returns empty array if you don't have any common group.

Returns

`Promise containing Array of WAWebJS.ChatId` 

async

### getCountryCode() → Promise containing string

Returns the contact's countrycode, (1541859685@c.us) => (1)

Returns

`Promise containing string` 

async

### getFormattedNumber() → Promise containing string

Returns the contact's formatted phone number, (12345678901@c.us) => (+1 (234) 5678-901)

Returns

`Promise containing string` 

async

### getProfilePicUrl() → Promise containing string

Returns the contact's profile picture URL, if privacy settings allow it

Returns

`Promise containing string` 

async

### unblock() → Promise containing boolean

Unblocks this contact from WhatsApp

Returns

`Promise containing boolean`

--- END OF FILE: GroupChat.html.md ---
--- START OF FILE: GroupChat.html.md ---

Source: https://docs.wwebjs.dev/GroupChat.html

## Properties

[archived](GroupChat.html#archived)

[createdAt](GroupChat.html#createdAt)

[description](GroupChat.html#description)

[id](GroupChat.html#id)

[isGroup](GroupChat.html#isGroup)

[isMuted](GroupChat.html#isMuted)

[isReadOnly](GroupChat.html#isReadOnly)

[lastMessage](GroupChat.html#lastMessage)

[muteExpiration](GroupChat.html#muteExpiration)

[name](GroupChat.html#name)

[owner](GroupChat.html#owner)

[participants](GroupChat.html#participants)

[pinned](GroupChat.html#pinned)

[timestamp](GroupChat.html#timestamp)

[unreadCount](GroupChat.html#unreadCount)

## Methods

[addOrEditCustomerNote(note)](GroupChat.html#addOrEditCustomerNote)

[addParticipants(participantIds, options)](GroupChat.html#addParticipants)

[approveGroupMembershipRequests(options)](GroupChat.html#approveGroupMembershipRequests)

[archive()](GroupChat.html#archive)

[changeLabels(labelIds)](GroupChat.html#changeLabels)

[clearMessages()](GroupChat.html#clearMessages)

[clearState()](GroupChat.html#clearState)

[delete()](GroupChat.html#delete)

[deletePicture()](GroupChat.html#deletePicture)

[demoteParticipants(participantIds)](GroupChat.html#demoteParticipants)

[fetchMessages(searchOptions)](GroupChat.html#fetchMessages)

[getContact()](GroupChat.html#getContact)

[getCustomerNote()](GroupChat.html#getCustomerNote)

[getGroupMembershipRequests()](GroupChat.html#getGroupMembershipRequests)

[getInviteCode()](GroupChat.html#getInviteCode)

[getLabels()](GroupChat.html#getLabels)

[getPinnedMessages()](GroupChat.html#getPinnedMessages)

[leave()](GroupChat.html#leave)

[markUnread()](GroupChat.html#markUnread)

[mute(unmuteDate)](GroupChat.html#mute)

[pin()](GroupChat.html#pin)

[promoteParticipants(participantIds)](GroupChat.html#promoteParticipants)

[rejectGroupMembershipRequests(options)](GroupChat.html#rejectGroupMembershipRequests)

[removeParticipants(participantIds)](GroupChat.html#removeParticipants)

[revokeInvite()](GroupChat.html#revokeInvite)

[sendMessage(content\[, options\])](GroupChat.html#sendMessage)

[sendSeen()](GroupChat.html#sendSeen)

[sendStateRecording()](GroupChat.html#sendStateRecording)

[sendStateTyping()](GroupChat.html#sendStateTyping)

[setAddMembersAdminsOnly(\[adminsOnly\])](GroupChat.html#setAddMembersAdminsOnly)

[setDescription(description)](GroupChat.html#setDescription)

[setInfoAdminsOnly(\[adminsOnly\])](GroupChat.html#setInfoAdminsOnly)

[setMessagesAdminsOnly(\[adminsOnly\])](GroupChat.html#setMessagesAdminsOnly)

[setPicture(media)](GroupChat.html#setPicture)

[setSubject(subject)](GroupChat.html#setSubject)

[syncHistory()](GroupChat.html#syncHistory)

[unarchive()](GroupChat.html#unarchive)

[unmute()](GroupChat.html#unmute)

[unpin()](GroupChat.html#unpin)

## new GroupChat()

Extends

[Chat](Chat.html)

## Properties

### archived  unknown

Indicates if the Chat is archived

Inherited from

[Chat#archived](Chat.html#archived)

### createdAt  date

Gets the date at which the group was created

### description  string

Gets the group description

### id  unknown

ID that represents the chat

Inherited from

[Chat#id](Chat.html#id)

### isGroup  unknown

Indicates if the Chat is a Group Chat

Inherited from

[Chat#isGroup](Chat.html#isGroup)

### isMuted  unknown

Indicates if the chat is muted or not

Inherited from

[Chat#isMuted](Chat.html#isMuted)

### isReadOnly  unknown

Indicates if the Chat is readonly

Inherited from

[Chat#isReadOnly](Chat.html#isReadOnly)

### lastMessage  unknown

Last message fo chat

Inherited from

[Chat#lastMessage](Chat.html#lastMessage)

### muteExpiration  unknown

Unix timestamp for when the mute expires

Inherited from

[Chat#muteExpiration](Chat.html#muteExpiration)

### name  unknown

Title of the chat

Inherited from

[Chat#name](Chat.html#name)

### owner  [ContactId](global.html#ContactId)

Gets the group owner

### participants  Array of [GroupParticipant](global.html#GroupParticipant)

Gets the group participants

### pinned  unknown

Indicates if the Chat is pinned

Inherited from

[Chat#pinned](Chat.html#pinned)

### timestamp  unknown

Unix timestamp for when the last activity occurred

Inherited from

[Chat#timestamp](Chat.html#timestamp)

### unreadCount  unknown

Amount of messages unread

Inherited from

[Chat#unreadCount](Chat.html#unreadCount)

## Methods

async

### addOrEditCustomerNote(note) → Promise containing void

Add or edit a customer note

#### Parameter

Name

Type

Optional

Description

note

The note to add

Inherited from

[Chat#addOrEditCustomerNote](Chat.html#addOrEditCustomerNote)

See also

[https://faq.whatsapp.com/1433099287594476](https://faq.whatsapp.com/1433099287594476)

Returns

async

### addParticipants(participantIds, options) → Promise containing (Object with [AddParticipantsResult](global.html#AddParticipantsResult) properties or string)

Adds a list of participants by ID to the group

#### Parameters

Name

Type

Optional

Description

participantIds

(string or Array of string)

options

[AddParticipnatsOptions](global.html#AddParticipnatsOptions)

An object thay handles options for adding participants

Returns

`Promise containing (Object with [AddParticipantsResult](global.html#AddParticipantsResult) properties or string)` 

Returns an object with the resulting data or an error message as a string

async

### approveGroupMembershipRequests(options) → Promise containing Array of [MembershipRequestActionResult](global.html#MembershipRequestActionResult)

Approves membership requests if any

#### Parameter

Name

Type

Optional

Description

options

[MembershipRequestActionOptions](global.html#MembershipRequestActionOptions)

Options for performing a membership request action

Returns

`Promise containing Array of [MembershipRequestActionResult](global.html#MembershipRequestActionResult)` 

Returns an array of requester IDs whose membership requests were approved and an error for each requester, if any occurred during the operation. If there are no requests, an empty array will be returned

async

### archive()

Archives this chat

Inherited from

[Chat#archive](Chat.html#archive)

async

### changeLabels(labelIds) → Promise containing void

Add or remove labels to this Chat

#### Parameter

Name

Type

Optional

Description

labelIds

Inherited from

[Chat#changeLabels](Chat.html#changeLabels)

Returns

async

### clearMessages() → Promise containing boolean

Clears all messages from the chat

Inherited from

[Chat#clearMessages](Chat.html#clearMessages)

Returns

result

async

### clearState()

Stops typing or recording in chat immediately.

Inherited from

[Chat#clearState](Chat.html#clearState)

async

### delete() → Promise containing Boolean

Deletes the chat

Inherited from

[Chat#delete](Chat.html#delete)

Returns

result

async

### deletePicture() → Promise containing boolean

Deletes the group's picture.

Returns

`Promise containing boolean` 

Returns true if the picture was properly deleted. This can return false if the user does not have the necessary permissions.

async

### demoteParticipants(participantIds) → Promise containing {status: number}

Demotes participants by IDs to regular users

#### Parameter

Name

Type

Optional

Description

participantIds

Array of string

Returns

`Promise containing {status: number}` 

Object with status code indicating if the operation was successful

async

### fetchMessages(searchOptions) → Promise containing Array of [Message](Message.html)

Loads chat messages, sorted from earliest to latest.

#### Parameters

Name

Type

Optional

Description

searchOptions

Options for searching messages. Right now only limit and fromMe is supported.

Values in `searchOptions` have the following properties:

Name

Type

Optional

Description

limit

Yes

The amount of messages to return. If no limit is specified, the available messages will be returned. Note that the actual number of returned messages may be smaller if there aren't enough messages in the conversation. Set this to Infinity to load all messages.

fromMe

Yes

Return only messages from the bot number or vise versa. To get all messages, leave the option undefined.

Inherited from

[Chat#fetchMessages](Chat.html#fetchMessages)

Returns

async

### getContact() → Promise containing [Contact](Contact.html)

Returns the Contact that corresponds to this Chat.

Inherited from

[Chat#getContact](Chat.html#getContact)

Returns

async

### getCustomerNote() → Promise containing {chatId: string, content: string, createdAt: number, id: string, modifiedAt: number, type: string}

Get a customer note

Inherited from

[Chat#getCustomerNote](Chat.html#getCustomerNote)

See also

[https://faq.whatsapp.com/1433099287594476](https://faq.whatsapp.com/1433099287594476)

Returns

async

### getGroupMembershipRequests() → Promise containing Array of [GroupMembershipRequest](global.html#GroupMembershipRequest)

Gets an array of membership requests

Returns

`Promise containing Array of [GroupMembershipRequest](global.html#GroupMembershipRequest)` 

An array of membership requests

async

### getInviteCode() → Promise containing string

Gets the invite code for a specific group

Returns

`Promise containing string` 

Group's invite code

async

### getLabels() → Promise containing Array of [Label](Label.html)

Returns array of all Labels assigned to this Chat

Inherited from

[Chat#getLabels](Chat.html#getLabels)

Returns

async

### getPinnedMessages() → Promise containing Array of [Message](Message.html)

Gets instances of all pinned messages in a chat

Inherited from

[Chat#getPinnedMessages](Chat.html#getPinnedMessages)

Returns

async

### leave() → Promise

Makes the bot leave the group

Returns

`Promise` 

async

### markUnread()

Mark this chat as unread

Inherited from

[Chat#markUnread](Chat.html#markUnread)

async

### mute(unmuteDate) → Promise containing {isMuted: boolean, muteExpiration: number}

Mutes this chat forever, unless a date is specified

#### Parameter

Name

Type

Optional

Description

unmuteDate

Date when the chat will be unmuted, don't provide a value to mute forever

Value can be null.

Inherited from

[Chat#mute](Chat.html#mute)

Returns

async

### pin() → Promise containing boolean

Pins this chat

Inherited from

[Chat#pin](Chat.html#pin)

Returns

New pin state. Could be false if the max number of pinned chats was reached.

async

### promoteParticipants(participantIds) → Promise containing {status: number}

Promotes participants by IDs to admins

#### Parameter

Name

Type

Optional

Description

participantIds

Array of string

Returns

`Promise containing {status: number}` 

Object with status code indicating if the operation was successful

async

### rejectGroupMembershipRequests(options) → Promise containing Array of [MembershipRequestActionResult](global.html#MembershipRequestActionResult)

Rejects membership requests if any

#### Parameter

Name

Type

Optional

Description

options

[MembershipRequestActionOptions](global.html#MembershipRequestActionOptions)

Options for performing a membership request action

Returns

`Promise containing Array of [MembershipRequestActionResult](global.html#MembershipRequestActionResult)` 

Returns an array of requester IDs whose membership requests were rejected and an error for each requester, if any occurred during the operation. If there are no requests, an empty array will be returned

async

### removeParticipants(participantIds) → Promise containing {status: number}

Removes a list of participants by ID to the group

#### Parameter

Name

Type

Optional

Description

participantIds

Array of string

Returns

`Promise containing {status: number}` 

async

### revokeInvite() → Promise containing string

Invalidates the current group invite code and generates a new one

Returns

`Promise containing string` 

New invite code

async

### sendMessage(content\[, options\]) → Promise containing [Message](Message.html)

Send a message to this chat

#### Parameters

Name

Type

Optional

Description

content

options

Yes

Inherited from

[Chat#sendMessage](Chat.html#sendMessage)

Returns

Message that was just sent

async

### sendSeen() → Promise containing Boolean

Sets the chat as seen

Inherited from

[Chat#sendSeen](Chat.html#sendSeen)

Returns

result

async

### sendStateRecording()

Simulate recording audio in chat. This will last for 25 seconds.

Inherited from

[Chat#sendStateRecording](Chat.html#sendStateRecording)

async

### sendStateTyping()

Simulate typing in chat. This will last for 25 seconds.

Inherited from

[Chat#sendStateTyping](Chat.html#sendStateTyping)

async

### setAddMembersAdminsOnly(\[adminsOnly\]) → Promise containing boolean

Updates the group setting to allow only admins to add members to the group.

#### Parameter

Name

Type

Optional

Description

adminsOnly

boolean

Yes

Enable or disable this option

Defaults to `true`.

Returns

`Promise containing boolean` 

Returns true if the setting was properly updated. This can return false if the user does not have the necessary permissions.

async

### setDescription(description) → Promise containing boolean

Updates the group description

#### Parameter

Name

Type

Optional

Description

description

string

Returns

`Promise containing boolean` 

Returns true if the description was properly updated. This can return false if the user does not have the necessary permissions.

async

### setInfoAdminsOnly(\[adminsOnly\]) → Promise containing boolean

Updates the group settings to only allow admins to edit group info (title, description, photo).

#### Parameter

Name

Type

Optional

Description

adminsOnly

boolean

Yes

Enable or disable this option

Defaults to `true`.

Returns

`Promise containing boolean` 

Returns true if the setting was properly updated. This can return false if the user does not have the necessary permissions.

async

### setMessagesAdminsOnly(\[adminsOnly\]) → Promise containing boolean

Updates the group settings to only allow admins to send messages.

#### Parameter

Name

Type

Optional

Description

adminsOnly

boolean

Yes

Enable or disable this option

Defaults to `true`.

Returns

`Promise containing boolean` 

Returns true if the setting was properly updated. This can return false if the user does not have the necessary permissions.

async

### setPicture(media) → Promise containing boolean

Sets the group's picture.

#### Parameter

Name

Type

Optional

Description

media

[MessageMedia](MessageMedia.html)

Returns

`Promise containing boolean` 

Returns true if the picture was properly updated. This can return false if the user does not have the necessary permissions.

async

### setSubject(subject) → Promise containing boolean

Updates the group subject

#### Parameter

Name

Type

Optional

Description

subject

string

Returns

`Promise containing boolean` 

Returns true if the subject was properly updated. This can return false if the user does not have the necessary permissions.

async

### syncHistory() → Promise containing boolean

Sync chat history conversation

Inherited from

[Chat#syncHistory](Chat.html#syncHistory)

Returns

True if operation completed successfully, false otherwise.

async

### unarchive()

un-archives this chat

Inherited from

[Chat#unarchive](Chat.html#unarchive)

async

### unmute() → Promise containing {isMuted: boolean, muteExpiration: number}

Unmutes this chat

Inherited from

[Chat#unmute](Chat.html#unmute)

Returns

async

### unpin() → Promise containing boolean

Unpins this chat

Inherited from

[Chat#unpin](Chat.html#unpin)

Returns

New pin state

--- END OF FILE: GroupNotification.html.md ---
--- START OF FILE: GroupNotification.html.md ---

Source: https://docs.wwebjs.dev/GroupNotification.html

## Properties

[author](GroupNotification.html#author)

[body](GroupNotification.html#body)

[chatId](GroupNotification.html#chatId)

[id](GroupNotification.html#id)

[recipientIds](GroupNotification.html#recipientIds)

[timestamp](GroupNotification.html#timestamp)

[type](GroupNotification.html#type)

## Methods

[getChat()](GroupNotification.html#getChat)

[getContact()](GroupNotification.html#getContact)

[getRecipients()](GroupNotification.html#getRecipients)

[reply(content, options)](GroupNotification.html#reply)

## new GroupNotification()

Extends

[Base](Base.html)

## Properties

### author  string

ContactId for the user that produced the GroupNotification.

### body  string

Extra content

### chatId  string

ID for the Chat that this groupNotification was sent for.

### id  object

ID that represents the groupNotification

### recipientIds  Array of string

Contact IDs for the users that were affected by this GroupNotification.

### timestamp  number

Unix timestamp for when the groupNotification was created

### type  [GroupNotificationTypes](global.html#GroupNotificationTypes)

GroupNotification type

## Methods

### getChat() → Promise containing [Chat](Chat.html)

Returns the Chat this groupNotification was sent in

Returns

`Promise containing [Chat](Chat.html)` 

### getContact() → Promise containing [Contact](Contact.html)

Returns the Contact this GroupNotification was produced by

Returns

`Promise containing [Contact](Contact.html)` 

async

### getRecipients() → Promise containing Array of [Contact](Contact.html)

Returns the Contacts affected by this GroupNotification.

Returns

`Promise containing Array of [Contact](Contact.html)` 

async

### reply(content, options) → Promise containing [Message](Message.html)

Sends a message to the same chat this GroupNotification was produced in.

#### Parameters

Name

Type

Optional

Description

content

(string, [MessageMedia](MessageMedia.html), or [Location](Location.html))

options

object

Returns

`Promise containing [Message](Message.html)`

--- END OF FILE: InterfaceController.html.md ---
--- START OF FILE: InterfaceController.html.md ---

Source: https://docs.wwebjs.dev/InterfaceController.html

## Methods

[checkFeatureStatus(feature)](InterfaceController.html#checkFeatureStatus)

[closeRightDrawer()](InterfaceController.html#closeRightDrawer)

[disableFeatures(features)](InterfaceController.html#disableFeatures)

[enableFeatures(features)](InterfaceController.html#enableFeatures)

[getFeatures()](InterfaceController.html#getFeatures)

[openChatDrawer(chatId)](InterfaceController.html#openChatDrawer)

[openChatSearch(chatId)](InterfaceController.html#openChatSearch)

[openChatWindow(chatId)](InterfaceController.html#openChatWindow)

[openChatWindowAt(msgId)](InterfaceController.html#openChatWindowAt)

[openMessageDrawer(msgId)](InterfaceController.html#openMessageDrawer)

## new InterfaceController()

## Methods

async

### checkFeatureStatus(feature)

Check if Feature is enabled

#### Parameter

Name

Type

Optional

Description

feature

string

status to check

async

### closeRightDrawer()

Closes the Right Drawer

async

### disableFeatures(features)

Disable Features

#### Parameter

Name

Type

Optional

Description

features

Array of string

to be disabled

async

### enableFeatures(features)

Enable Features

#### Parameter

Name

Type

Optional

Description

features

Array of string

to be enabled

async

### getFeatures()

Get all Features

async

### openChatDrawer(chatId)

Opens the Chat Drawer

#### Parameter

Name

Type

Optional

Description

chatId

string

ID of the chat drawer that will be opened

async

### openChatSearch(chatId)

Opens the Chat Search

#### Parameter

Name

Type

Optional

Description

chatId

string

ID of the chat search that will be opened

async

### openChatWindow(chatId)

Opens the Chat Window

#### Parameter

Name

Type

Optional

Description

chatId

string

ID of the chat window that will be opened

async

### openChatWindowAt(msgId)

Opens or Scrolls the Chat Window to the position of the message

#### Parameter

Name

Type

Optional

Description

msgId

string

ID of the message that will be scrolled to

async

### openMessageDrawer(msgId)

Opens the Message Drawer

#### Parameter

Name

Type

Optional

Description

msgId

string

ID of the message drawer that will be opened

--- END OF FILE: Label.html.md ---
--- START OF FILE: Label.html.md ---

Source: https://docs.wwebjs.dev/Label.html

## Properties

[hexColor](Label.html#hexColor)

[id](Label.html#id)

[name](Label.html#name)

## Method

[getChats()](Label.html#getChats)

## new Label(client, labelData)

### Parameters

Name

Type

Optional

Description

client

labelData

## Properties

### hexColor  string

Label hex color

### id  string

Label ID

### name  string

Label name

## Method

async

### getChats() → Promise containing Array of [Chat](Chat.html)

Get all chats that have been assigned this Label

Returns

`Promise containing Array of [Chat](Chat.html)`

--- END OF FILE: List.html.md ---
--- START OF FILE: List.html.md ---

Source: https://docs.wwebjs.dev/List.html

## Properties

[buttonText](List.html#buttonText)

[description](List.html#description)

[footer](List.html#footer)

[sections](List.html#sections)

[title](List.html#title)

## Method

[\_format(sections)](List.html#_format)

## new List(body, buttonText, sections, title, footer)

### Parameters

Name

Type

Optional

Description

body

buttonText

sections

title

Value can be null.

footer

Value can be null.

## Properties

### buttonText  string

List button text

### description  string

Message body

### footer  string

footer of message

### sections  Array of any

sections of message

### title  string

title of message

## Method

### \_format(sections) → Array of any

Creates section array from simple array

#### Example

```
Input: [{title:'sectionTitle',rows:[{id:'customId', title:'ListItem2', description: 'desc'},{title:'ListItem2'}]}}]
Returns: [{'title':'sectionTitle','rows':[{'rowId':'customId','title':'ListItem1','description':'desc'},{'rowId':'oGSRoD','title':'ListItem2','description':''}]}]
```

#### Parameter

Name

Type

Optional

Description

sections

Array of any

Returns

`Array of any`

--- END OF FILE: LocalAuth.html.md ---
--- START OF FILE: LocalAuth.html.md ---

Source: https://docs.wwebjs.dev/LocalAuth.html

## new LocalAuth(options)

### Parameters

Name

Type

Optional

Description

options

options

Values in `options` have the following properties:

Name

Type

Optional

Description

clientId

Client id to distinguish instances if you are using multiple, otherwise keep null if you are using only one instance

dataPath

Change the default path for saving session files, default is: "./.wwebjs\_auth/"

rmMaxRetries

Sets the maximum number of retries for removing the session directory

--- END OF FILE: LocalWebCache.html.md ---
--- START OF FILE: LocalWebCache.html.md ---

Source: https://docs.wwebjs.dev/LocalWebCache.html

## new LocalWebCache(options)

### Parameters

Name

Type

Optional

Description

options

options

Values in `options` have the following properties:

Name

Type

Optional

Description

path

Path to the directory where cached versions are saved, default is: "./.wwebjs\_cache/"

strict

If true, will throw an error if the requested version can't be fetched. If false, will resolve to the latest version.

--- END OF FILE: Location.html.md ---
--- START OF FILE: Location.html.md ---

Source: https://docs.wwebjs.dev/Location.html

## Properties

[address](Location.html#address)

[description](Location.html#description)

[latitude](Location.html#latitude)

[longitude](Location.html#longitude)

[name](Location.html#name)

[url](Location.html#url)

## new Location(latitude, longitude\[, options\])

### Parameters

Name

Type

Optional

Description

latitude

longitude

options

Yes

Location send options

## Properties

### address  (string or undefined)

Location address

### description  (string or undefined)

Location full description

### latitude  number

Location latitude

### longitude  number

Location longitude

### name  (string or undefined)

Name for the location

### url  (string or undefined)

URL address to be shown within a location message

--- END OF FILE: Message.html.md ---
--- START OF FILE: Message.html.md ---

Source: https://docs.wwebjs.dev/Message.html

## Properties

[ack](Message.html#ack)

[author](Message.html#author)

[body](Message.html#body)

[broadcast](Message.html#broadcast)

[deviceType](Message.html#deviceType)

[duration](Message.html#duration)

[forwardingScore](Message.html#forwardingScore)

[from](Message.html#from)

[fromMe](Message.html#fromMe)

[groupMentions](Message.html#groupMentions)

[hasMedia](Message.html#hasMedia)

[hasQuotedMsg](Message.html#hasQuotedMsg)

[hasReaction](Message.html#hasReaction)

[id](Message.html#id)

[inviteV4](Message.html#inviteV4)

[isEphemeral](Message.html#isEphemeral)

[isForwarded](Message.html#isForwarded)

[isGif](Message.html#isGif)

[isStarred](Message.html#isStarred)

[isStatus](Message.html#isStatus)

[links](Message.html#links)

[location](Message.html#location)

[mediaKey](Message.html#mediaKey)

[mentionedIds](Message.html#mentionedIds)

[orderId](Message.html#orderId)

[rawData](Message.html#rawData)

[timestamp](Message.html#timestamp)

[to](Message.html#to)

[token](Message.html#token)

[type](Message.html#type)

[vCards](Message.html#vCards)

## Methods

[acceptGroupV4Invite()](Message.html#acceptGroupV4Invite)

[delete(everyone\[, clearMedia\])](Message.html#delete)

[downloadMedia()](Message.html#downloadMedia)

[edit(content\[, options\])](Message.html#edit)

[editScheduledEvent(editedEventObject)](Message.html#editScheduledEvent)

[forward(chat)](Message.html#forward)

[getChat()](Message.html#getChat)

[getContact()](Message.html#getContact)

[getGroupMentions()](Message.html#getGroupMentions)

[getInfo()](Message.html#getInfo)

[getMentions()](Message.html#getMentions)

[getOrder()](Message.html#getOrder)

[getPayment()](Message.html#getPayment)

[getPollVotes()](Message.html#getPollVotes)

[getQuotedMessage()](Message.html#getQuotedMessage)

[getReactions()](Message.html#getReactions)

[pin(duration)](Message.html#pin)

[react(reaction)](Message.html#react)

[reload()](Message.html#reload)

[reply(content\[, chatId\]\[, options\])](Message.html#reply)

[star()](Message.html#star)

[unpin()](Message.html#unpin)

[unstar()](Message.html#unstar)

[vote(selectedOptions)](Message.html#vote)

## new Message()

Extends

[Base](Base.html)

## Properties

### ack  [MessageAck](global.html#MessageAck)

ACK status for the message

### author  string

If the message was sent to a group, this field will contain the user that sent the message.

### body  string

Message content

### broadcast  boolean

Indicates if the message was a broadcast

### deviceType  string

String that represents from which device type the message was sent

### duration  string

Indicates the duration of the message in seconds

### forwardingScore  number

Indicates how many times the message was forwarded.

The maximum value is 127.

### from  string

ID for the Chat that this message was sent to, except if the message was sent by the current user.

### fromMe  boolean

Indicates if the message was sent by the current user

### groupMentions  Array of [GroupMention](global.html#GroupMention)

Indicates whether there are group mentions in the message body

### hasMedia  boolean

Indicates if the message has media available for download

### hasQuotedMsg  boolean

Indicates if the message was sent as a reply to another message.

### hasReaction  boolean

Indicates whether there are reactions to the message

### id  object

ID that represents the message

### inviteV4  object

Group Invite Data

### isEphemeral  boolean

Indicates if the message will disappear after it expires

### isForwarded  boolean

Indicates if the message was forwarded

### isGif  boolean

Indicates whether the message is a Gif

### isStarred  boolean

Indicates if the message was starred

### isStatus  boolean

Indicates if the message is a status update

### links  Array of {link: string, isSuspicious: boolean}

Links included in the message.

### location  [Location](Location.html)

Location information contained in the message, if the message is type "location"

### mediaKey  string

MediaKey that represents the sticker 'ID'

### mentionedIds  Array of string

Indicates the mentions in the message body.

### orderId  string

Order ID for message type ORDER

### rawData  Object

Returns message in a raw format

### timestamp  number

Unix timestamp for when the message was created

### to  string

ID for who this message is for.

If the message is sent by the current user, it will be the Chat to which the message is being sent. If the message is sent by another user, it will be the ID for the current user.

### token  string

Order Token for message type ORDER

### type  [MessageTypes](global.html#MessageTypes)

Message type

### vCards  Array of string

List of vCards contained in the message.

## Methods

async

### acceptGroupV4Invite() → Promise containing Object

Accept Group V4 Invite

Returns

`Promise containing Object` 

async

### delete(everyone\[, clearMedia\])

Deletes a message from the chat

#### Parameters

Name

Type

Optional

Description

everyone

boolean

If true and the message is sent by the current user or the user is an admin, will delete it for everyone in the chat.

Value can be null.

clearMedia

boolean

Yes

If true, any associated media will also be deleted from a device.

Value can be null. Defaults to `true`.

async

### downloadMedia() → Promise containing [MessageMedia](MessageMedia.html)

Downloads and returns the attatched message media

Returns

`Promise containing [MessageMedia](MessageMedia.html)` 

async

### edit(content\[, options\]) → Promise containing nullable [Message](Message.html)

Edits the current message.

#### Parameters

Name

Type

Optional

Description

content

string

options

MessageEditOptions

Yes

Options used when editing the message

Returns

`Promise containing nullable [Message](Message.html)` 

async

### editScheduledEvent(editedEventObject) → Promise containing nullable [Message](Message.html)

Edits the current ScheduledEvent message. Once the scheduled event is canceled, it can not be edited.

#### Parameter

Name

Type

Optional

Description

editedEventObject

[ScheduledEvent](ScheduledEvent.html)

Returns

`Promise containing nullable [Message](Message.html)` 

async

### forward(chat) → Promise

Forwards this message to another chat (that you chatted before, otherwise it will fail)

#### Parameter

Name

Type

Optional

Description

chat

(string or [Chat](Chat.html))

Chat model or chat ID to which the message will be forwarded

Returns

`Promise` 

### getChat() → Promise containing [Chat](Chat.html)

Returns the Chat this message was sent in

Returns

`Promise containing [Chat](Chat.html)` 

### getContact() → Promise containing [Contact](Contact.html)

Returns the Contact this message was sent from

Returns

`Promise containing [Contact](Contact.html)` 

async

### getGroupMentions() → Promise containing Array of [GroupChat](GroupChat.html)

Returns groups mentioned in this message

Returns

`Promise containing Array of [GroupChat](GroupChat.html)` 

async

### getInfo() → Promise containing nullable [MessageInfo](global.html#MessageInfo)

Get information about message delivery status. May return null if the message does not exist or is not sent by you.

Returns

`Promise containing nullable [MessageInfo](global.html#MessageInfo)` 

async

### getMentions() → Promise containing Array of [Contact](Contact.html)

Returns the Contacts mentioned in this message

Returns

`Promise containing Array of [Contact](Contact.html)` 

async

### getOrder() → Promise containing [Order](Order.html)

Gets the order associated with a given message

Returns

`Promise containing [Order](Order.html)` 

async

### getPayment() → Promise containing [Payment](Payment.html)

Gets the payment details associated with a given message

Returns

`Promise containing [Payment](Payment.html)` 

async

### getPollVotes() → Promise containing Array of [PollVote](PollVote.html)

Returns the PollVote this poll message

Returns

`Promise containing Array of [PollVote](PollVote.html)` 

async

### getQuotedMessage() → Promise containing [Message](Message.html)

Returns the quoted message, if any

Returns

`Promise containing [Message](Message.html)` 

async

### getReactions() → Promise containing Array of [ReactionList](global.html#ReactionList)

Gets the reactions associated with the given message

Returns

`Promise containing Array of [ReactionList](global.html#ReactionList)` 

async

### pin(duration) → Promise containing boolean

Pins the message (group admins can pin messages of all group members)

#### Parameter

Name

Type

Optional

Description

duration

number

The duration in seconds the message will be pinned in a chat

Returns

`Promise containing boolean` 

Returns true if the operation completed successfully, false otherwise

async

### react(reaction) → Promise

React to this message with an emoji

#### Parameter

Name

Type

Optional

Description

reaction

string

Emoji to react with. Send an empty string to remove the reaction.

Returns

`Promise` 

async

### reload() → Promise containing [Message](Message.html)

Reloads this Message object's data in-place with the latest values from WhatsApp Web. Note that the Message must still be in the web app cache for this to work, otherwise will return null.

Returns

`Promise containing [Message](Message.html)` 

async

### reply(content\[, chatId\]\[, options\]) → Promise containing [Message](Message.html)

Sends a message as a reply to this message. If chatId is specified, it will be sent through the specified Chat. If not, it will send the message in the same Chat as the original message was sent.

#### Parameters

Name

Type

Optional

Description

content

(string, [MessageMedia](MessageMedia.html), or [Location](Location.html))

chatId

string

Yes

options

[MessageSendOptions](global.html#MessageSendOptions)

Yes

Returns

`Promise containing [Message](Message.html)` 

async

### star()

Stars this message

async

### unpin() → Promise containing boolean

Unpins the message (group admins can unpin messages of all group members)

Returns

`Promise containing boolean` 

Returns true if the operation completed successfully, false otherwise

async

### unstar()

Unstars this message

async

### vote(selectedOptions) → Promise

Send votes to the poll message

#### Parameter

Name

Type

Optional

Description

selectedOptions

Array of string

Array of options selected.

Returns

`Promise`

--- END OF FILE: MessageMedia.html.md ---
--- START OF FILE: MessageMedia.html.md ---

Source: https://docs.wwebjs.dev/MessageMedia.html

## Properties

[data](MessageMedia.html#data)

[filename](MessageMedia.html#filename)

[filesize](MessageMedia.html#filesize)

[mimetype](MessageMedia.html#mimetype)

## Methods

[fromFilePath(filePath)](MessageMedia.html#.fromFilePath)

[fromUrl(url\[, options\])](MessageMedia.html#.fromUrl)

## new MessageMedia(mimetype, data, filename, filesize)

### Parameters

Name

Type

Optional

Description

mimetype

MIME type of the attachment

data

Base64-encoded data of the file

filename

Document file name. Value can be null

Value can be null.

filesize

Document file size in bytes. Value can be null

Value can be null.

## Properties

### data  string

Base64 encoded data that represents the file

### filename  nullable string

Document file name. Value can be null

### filesize  nullable number

Document file size in bytes. Value can be null

### mimetype  string

MIME type of the attachment

## Methods

static

### fromFilePath(filePath) → [MessageMedia](MessageMedia.html)

Creates a MessageMedia instance from a local file path

#### Parameter

Name

Type

Optional

Description

filePath

string

Returns

`[MessageMedia](MessageMedia.html)` 

async static

### fromUrl(url\[, options\]) → Promise containing [MessageMedia](MessageMedia.html)

Creates a MessageMedia instance from a URL

#### Parameters

Name

Type

Optional

Description

url

string

options

Object

Yes

Values in `options` have the following properties:

Name

Type

Optional

Description

unsafeMime

boolean

Yes

Defaults to `false`.

filename

string

Yes

client

object

Yes

reqOptions

object

Yes

reqOptions.size

number

Yes

Defaults to `0`.

Returns

`Promise containing [MessageMedia](MessageMedia.html)`

--- END OF FILE: NoAuth.html.md ---
--- START OF FILE: NoAuth.html.md ---

Source: https://docs.wwebjs.dev/NoAuth.html

## new NoAuth()

--- END OF FILE: Order.html.md ---
--- START OF FILE: Order.html.md ---

Source: https://docs.wwebjs.dev/Order.html

## Properties

[createdAt](Order.html#createdAt)

[currency](Order.html#currency)

[subtotal](Order.html#subtotal)

[total](Order.html#total)

## new Order()

Extends

[Base](Base.html)

## Properties

### createdAt  number

Order Created At

### currency  string

Order Currency

### subtotal  string

Order Subtotal

### total  string

Order Total

--- END OF FILE: Payment.html#id.md ---
--- START OF FILE: Payment.html#id.md ---

Source: https://docs.wwebjs.dev/Payment.html#id

# 404

**File not found**

The site configured at this address does not contain the requested file.

If this is your site, make sure that the filename case matches the URL as well as any file permissions.  
For root URLs (like `http://example.com/`) you must provide an `index.html` file.

[Read the full documentation](https://help.github.com/pages/) for more information about using **GitHub Pages**.

[GitHub Status](https://githubstatus.com) — [@githubstatus](https://twitter.com/githubstatus)

 [![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFMTZCRDY3REIzRjAxMUUyQUQzREIxQzRENUFFNUM5NiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFMTZCRDY3RUIzRjAxMUUyQUQzREIxQzRENUFFNUM5NiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkUxNkJENjdCQjNGMDExRTJBRDNEQjFDNEQ1QUU1Qzk2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkUxNkJENjdDQjNGMDExRTJBRDNEQjFDNEQ1QUU1Qzk2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+SM9MCAAAA+5JREFUeNrEV11Ik1EY3s4+ddOp29Q5b0opCgKFsoKoi5Kg6CIhuwi6zLJLoYLopq4qsKKgi4i6CYIoU/q5iDAKs6syoS76IRWtyJ+p7cdt7sf1PGOD+e0c3dygAx/67ZzzPM95/877GYdHRg3ZjMXFxepQKNS6sLCwJxqNNuFpiMfjVs4ZjUa/pmmjeD6VlJS8NpvNT4QQ7mxwjSsJiEQim/1+/9lgMHgIr5ohuxG1WCw9Vqv1clFR0dCqBODElV6v90ogEDjGdYbVjXhpaendioqK07CIR7ZAqE49PT09BPL2PMgTByQGsYiZlQD4uMXtdr+JxWINhgINYhGT2MsKgMrm2dnZXgRXhaHAg5jEJodUAHxux4LudHJE9RdEdA+i3Juz7bGHe4mhE9FNrgwBCLirMFV9Okh5eflFh8PR5nK5nDabrR2BNJlKO0T35+Li4n4+/J+/JQCxhmu5h3uJoXNHPbmWZAHMshWB8l5/ipqammaAf0zPDDx1ONV3vurdidqwAQL+pEc8sLcAe1CCvQ3YHxIW8Pl85xSWNC1hADDIv0rIE/o4J0k3kww4xSlwIhcq3EFFOm7KN/hUGOQkt0CFa5WpNJlMvxBEz/IVQAxg/ZRZl9wiHA63yDYieM7DnLP5CiAGsC7I5sgtYKJGWe2A8seFqgFJrJjEPY1Cn3pJ8/9W1e5VWsFDTEmFrBcoDhZJEQkXuhICMyKpjhahqN21hRYATKfUOlDmkygrR4o4C0VOLGJKrOITKB4jijzdXygBKixyC5TDQdnk/Pz8qRw6oOWGlsTKGOQW6OH6FBWsyePxdOXLTgxiyebILZCjz+GLgMIKnXNzc49YMlcRdHXcSwxFVgTInQhC9G33UhNoJLuqq6t345p9y3eUy8OTk5PjAHuI9uo4b07FBaOhsu0A4Unc+T1TU1Nj3KsSSE5yJ65jqF2DDd8QqWYmAZrIM2VlZTdnZmb6AbpdV9V6ec9znf5Q7HjYumdRE0JOp3MjitO4SFa+cZz8Umqe3TCbSLvdfkR/kWDdNQl5InuTcysOcpFT35ZrbBxx4p3JAHlZVVW1D/634VRt+FvLBgK/v5LV9WS+10xMTEwtRw7XvqOL+e2Q8V3AYIOIAXQ26/heWVnZCVfcyKHg2CBgTpmPmjYM8l24GyaUHyaIh7XwfR9ErE8qHoDfn2LTNAVC0HX6MFcBIP8Bi+6F6cdW/DICkANRfx99fEYFQ7Nph5i/uQiA214gno7K+guhaiKg9gC62+M8eR7XsBsYJ4ilam60Fb7r7uAj8wFyuwM1oIOWgfmDy6RXEEQzJMPe23DXrVS7rtyD3Df8z/FPgAEAzWU5Ku59ZAUAAAAASUVORK5CYII=)](/)[![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpEQUM1QkUxRUI0MUMxMUUyQUQzREIxQzRENUFFNUM5NiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpEQUM1QkUxRkI0MUMxMUUyQUQzREIxQzRENUFFNUM5NiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkUxNkJENjdGQjNGMDExRTJBRDNEQjFDNEQ1QUU1Qzk2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkUxNkJENjgwQjNGMDExRTJBRDNEQjFDNEQ1QUU1Qzk2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+hfPRaQAAB6lJREFUeNrsW2mME2UYbodtt+2222u35QheoCCYGBQligIJgkZJNPzgigoaTEj8AdFEMfADfyABkgWiiWcieK4S+QOiHAYUj2hMNKgYlEujpNttu9vttbvdw+chU1K6M535pt3ubHCSyezR+b73eb73+t7vrfXsufOW4bz6+vom9/b23ovnNNw34b5xYGAgODg46Mbt4mesVmsWd1qSpHhdXd2fuP/Afcput5/A88xwymcdBgLqenp6FuRyuWV4zu/v759QyWBjxoz5t76+/gun09mK5xFyakoCAPSaTCazNpvNPoYVbh6O1YKGRF0u13sNDQ27QMzfpiAAKj0lnU6/gBVfAZW2WWpwwVzy0IgP3G73FpjI6REhAGA9qVRqA1b9mVoBVyIC2tDi8Xg24+dUzQiAbS/s7Ox8G2o/3mKCC+Zw0efzPQEfcVjYrARX3dbV1bUtHo8fMgt42f+Mp0yUTVQbdWsAHVsikdiHkHaPxcQXQufXgUBgMRxme9U0AAxfH4vFvjM7eF6UkbJS5qoQwEQGA57Ac5JllFyUVZZ5ckUEgMVxsK2jlSYzI+QXJsiyjzNEAJyJAzb/KQa41jJKL8pODMQiTEAymXw5n8/P0IjD3bh7Rgog59aanxiIRTVvV/oj0tnHca/WMrVwODwB3raTGxzkBg/gnZVapFV62Wy2n5AO70HM/5wbJ0QnXyQSaVPDIuNZzY0V3ntHMwxiwHA0Gj2Np7ecIBDgaDAYXKCQJM1DhrgJ3nhulcPbl8j4NmHe46X/g60fwbz3aewjkqFQaAqebWU1AOqyQwt8Id6qEHMc97zu7u7FGGsn7HAiVuosVw7P35C1nccdgSCxop1dHeZswmfHMnxBo6ZTk+jN8dl/vF7vWofDsa+MLN9oEUBMxOb3+1eoEsBVw6Zmua49r8YmhAKDiEPcMwBsxMiqQ+ixzPFxZyqRpXARG/YOr1ObFJ0gUskXBbamcR1OKmMUvDxHRAu8/LmY3jFLMUpFqz9HxG65smYJdyKyECOxDiEAe/p1gjF2oonivZAsxVgl2daa4EQWCW6J55qFAFFZiJWYLxNQy2qOSUzGRsyXCUDIeliwAHEO4WSlWQBRFoZakXcKmCXmyXAKs0Ve9vl8q42WoIYpJU4hV3hKcNs8m9gl7p/xQ73eF5kB4j5mNrWmTJRNwAzqiV1CxjVTZCIkEq+Z1bZFZSN2CenmVAFVy4Plz8xKAGWjjAKFk6lCBMDR/MJjLLMSQNm43xAiQKTaA+9/wewhDjL+JVI1kkTSSOTcKbMTwPqESAot6dn6Fr1gHwVJju6IRuyiByPuUUBAg5DGkAgBmxlvdgIEK9gDkohdY/BJo4CAG0R8miRSsGABkgVQs4KXu098IgUXSSRsFAoKZiVAVDY2WUiiPTjYRi41KwGisrGsLtlsth8Fiwnz2fBkQvWfRtlE3iF2yW63/yCacXZ1dW02GwGyTFaRd4idJnCKHRaCxYRHoG5LTKT6SyiToP1fJHbmAYPYRR0UnZQtMnA6s0zg+GZBlt0Gdo7EPHgpE3Q6nZ8YyLhc8Xj8MJh/aKTAY+5FPAKHLE7RdwuYJZmNwzyCMkBCYyKROJBMJl9B/PXXCjjmCmDOVzH3fiPpObEWGqoKe4EBl8v1hlqsdLvd23mkxHM9pc9kMpmno9HoeTii7ewbHEZPPx1ztLS1tV3AnGuMjiNjvbQFuHw6zDo5By7dTPAQNBgMLrRarTkSls1mnwT7uwp9virx9QzbW/HuV/j5d/b+6jniKlllP8lkeONJDk+dq9GsQTnC4fB1heO0K47Hwe7WdDr9nAKgXwOBwHI+C45Htj1d6sd429TUNEcmUdc+PRaLHcvn87dXW4ugzdsaGxufL94NFv9zi1J7GVbhlvb2dnaJ3SVrxfc+n2+NTsZ7/H7/Mr3g5XdSIHyJSH1PZ+7fToyl2+ErqilgZ4NaLYB9goVGaHjR93Hv1ZrU4XDsFT20kH3PObzbWk0CgG1jacVIUnAQb9F+VexyLMzkpcLv0IJV7AHQIOCAUYHx7v5qgScmYHtTqSAyZLEJTK22Bie4iq3xsqpm4SAf9Hq9a2DnJ4uLK3SEULcdRvp3i3zHySqpficxEdsQc1NrlYXXvR+O7qASSezXB+h1SuUomgg9LL8BUoV4749EIolKh+EiqWmqVEZlDgHks2pxHw7xTqUQw9J5NcAXOK10AGIoZ6Zli6JY6Z1Q461KoZ4NiKLHarW+KDsxlDUPHZ5zPQZqUVDPJsTqb5n9malbpAh8C2XXDLl62+WZIDFRUlNVOiwencnNU3aQEkL+cDMSoLvZo2fQB7AJssNAuFuvorlDVVkkg2I87+jo2K2QAVphDrfyViK5VqtO34OkaxXCp+7drdDBCAdubm6eidX+2WwqT5komwh4YQLk+H4aE93h8Xg2gvHekQZOGSgLZTLyDTLJ4Lx9/KZWKBSainT4Iy3FqQBfnUZR42PKQFksBr9QKVXCPusD3OiA/RkQ5kP8qV/Jl1WywAp/6+dcmPM2zL1UrUahe4JqfnWWKXIul3uUbfP8njAFLW1OFr3gdFtZ72cNH+PtQT7/brW+NXqJAHh0y9V8/U/A1U7AfwIMAD7mS3pCbuWJAAAAAElFTkSuQmCC)](/)

--- END OF FILE: Poll.html.md ---
--- START OF FILE: Poll.html.md ---

Source: https://docs.wwebjs.dev/Poll.html

## Properties

[options](Poll.html#options)

[pollName](Poll.html#pollName)

[pollOptions](Poll.html#pollOptions)

## new Poll(pollName, pollOptions, options)

### Parameters

Name

Type

Optional

Description

pollName

pollOptions

options

## Properties

### options  [PollSendOptions](global.html#PollSendOptions)

The send options for the poll

### pollName  string

The name of the poll

### pollOptions  Array of {name: string, localId: number}

The array of poll options

--- END OF FILE: PollVote.html.md ---
--- START OF FILE: PollVote.html.md ---

Source: https://docs.wwebjs.dev/PollVote.html

## Properties

[interractedAtTs](PollVote.html#interractedAtTs)

[parentMessage](PollVote.html#parentMessage)

[parentMsgKey](PollVote.html#parentMsgKey)

[voter](PollVote.html#voter)

## new PollVote()

Extends

[Base](Base.html)

## Properties

### interractedAtTs  number

Timestamp the option was selected or deselected at

### parentMessage  [Message](Message.html)

The poll creation message associated with the poll vote

### parentMsgKey  Object

The poll creation message id

### voter  string

The person who voted

--- END OF FILE: PrivateChat.html.md ---
--- START OF FILE: PrivateChat.html.md ---

Source: https://docs.wwebjs.dev/PrivateChat.html

## Properties

[archived](PrivateChat.html#archived)

[id](PrivateChat.html#id)

[isGroup](PrivateChat.html#isGroup)

[isMuted](PrivateChat.html#isMuted)

[isReadOnly](PrivateChat.html#isReadOnly)

[lastMessage](PrivateChat.html#lastMessage)

[muteExpiration](PrivateChat.html#muteExpiration)

[name](PrivateChat.html#name)

[pinned](PrivateChat.html#pinned)

[timestamp](PrivateChat.html#timestamp)

[unreadCount](PrivateChat.html#unreadCount)

## Methods

[addOrEditCustomerNote(note)](PrivateChat.html#addOrEditCustomerNote)

[archive()](PrivateChat.html#archive)

[changeLabels(labelIds)](PrivateChat.html#changeLabels)

[clearMessages()](PrivateChat.html#clearMessages)

[clearState()](PrivateChat.html#clearState)

[delete()](PrivateChat.html#delete)

[fetchMessages(searchOptions)](PrivateChat.html#fetchMessages)

[getContact()](PrivateChat.html#getContact)

[getCustomerNote()](PrivateChat.html#getCustomerNote)

[getLabels()](PrivateChat.html#getLabels)

[getPinnedMessages()](PrivateChat.html#getPinnedMessages)

[markUnread()](PrivateChat.html#markUnread)

[mute(unmuteDate)](PrivateChat.html#mute)

[pin()](PrivateChat.html#pin)

[sendMessage(content\[, options\])](PrivateChat.html#sendMessage)

[sendSeen()](PrivateChat.html#sendSeen)

[sendStateRecording()](PrivateChat.html#sendStateRecording)

[sendStateTyping()](PrivateChat.html#sendStateTyping)

[syncHistory()](PrivateChat.html#syncHistory)

[unarchive()](PrivateChat.html#unarchive)

[unmute()](PrivateChat.html#unmute)

[unpin()](PrivateChat.html#unpin)

## new PrivateChat()

Extends

[Chat](Chat.html)

## Properties

### archived  unknown

Indicates if the Chat is archived

Inherited from

[Chat#archived](Chat.html#archived)

### id  unknown

ID that represents the chat

Inherited from

[Chat#id](Chat.html#id)

### isGroup  unknown

Indicates if the Chat is a Group Chat

Inherited from

[Chat#isGroup](Chat.html#isGroup)

### isMuted  unknown

Indicates if the chat is muted or not

Inherited from

[Chat#isMuted](Chat.html#isMuted)

### isReadOnly  unknown

Indicates if the Chat is readonly

Inherited from

[Chat#isReadOnly](Chat.html#isReadOnly)

### lastMessage  unknown

Last message fo chat

Inherited from

[Chat#lastMessage](Chat.html#lastMessage)

### muteExpiration  unknown

Unix timestamp for when the mute expires

Inherited from

[Chat#muteExpiration](Chat.html#muteExpiration)

### name  unknown

Title of the chat

Inherited from

[Chat#name](Chat.html#name)

### pinned  unknown

Indicates if the Chat is pinned

Inherited from

[Chat#pinned](Chat.html#pinned)

### timestamp  unknown

Unix timestamp for when the last activity occurred

Inherited from

[Chat#timestamp](Chat.html#timestamp)

### unreadCount  unknown

Amount of messages unread

Inherited from

[Chat#unreadCount](Chat.html#unreadCount)

## Methods

async

### addOrEditCustomerNote(note) → Promise containing void

Add or edit a customer note

#### Parameter

Name

Type

Optional

Description

note

The note to add

Inherited from

[Chat#addOrEditCustomerNote](Chat.html#addOrEditCustomerNote)

See also

[https://faq.whatsapp.com/1433099287594476](https://faq.whatsapp.com/1433099287594476)

Returns

async

### archive()

Archives this chat

Inherited from

[Chat#archive](Chat.html#archive)

async

### changeLabels(labelIds) → Promise containing void

Add or remove labels to this Chat

#### Parameter

Name

Type

Optional

Description

labelIds

Inherited from

[Chat#changeLabels](Chat.html#changeLabels)

Returns

async

### clearMessages() → Promise containing boolean

Clears all messages from the chat

Inherited from

[Chat#clearMessages](Chat.html#clearMessages)

Returns

result

async

### clearState()

Stops typing or recording in chat immediately.

Inherited from

[Chat#clearState](Chat.html#clearState)

async

### delete() → Promise containing Boolean

Deletes the chat

Inherited from

[Chat#delete](Chat.html#delete)

Returns

result

async

### fetchMessages(searchOptions) → Promise containing Array of [Message](Message.html)

Loads chat messages, sorted from earliest to latest.

#### Parameters

Name

Type

Optional

Description

searchOptions

Options for searching messages. Right now only limit and fromMe is supported.

Values in `searchOptions` have the following properties:

Name

Type

Optional

Description

limit

Yes

The amount of messages to return. If no limit is specified, the available messages will be returned. Note that the actual number of returned messages may be smaller if there aren't enough messages in the conversation. Set this to Infinity to load all messages.

fromMe

Yes

Return only messages from the bot number or vise versa. To get all messages, leave the option undefined.

Inherited from

[Chat#fetchMessages](Chat.html#fetchMessages)

Returns

async

### getContact() → Promise containing [Contact](Contact.html)

Returns the Contact that corresponds to this Chat.

Inherited from

[Chat#getContact](Chat.html#getContact)

Returns

async

### getCustomerNote() → Promise containing {chatId: string, content: string, createdAt: number, id: string, modifiedAt: number, type: string}

Get a customer note

Inherited from

[Chat#getCustomerNote](Chat.html#getCustomerNote)

See also

[https://faq.whatsapp.com/1433099287594476](https://faq.whatsapp.com/1433099287594476)

Returns

async

### getLabels() → Promise containing Array of [Label](Label.html)

Returns array of all Labels assigned to this Chat

Inherited from

[Chat#getLabels](Chat.html#getLabels)

Returns

async

### getPinnedMessages() → Promise containing Array of [Message](Message.html)

Gets instances of all pinned messages in a chat

Inherited from

[Chat#getPinnedMessages](Chat.html#getPinnedMessages)

Returns

async

### markUnread()

Mark this chat as unread

Inherited from

[Chat#markUnread](Chat.html#markUnread)

async

### mute(unmuteDate) → Promise containing {isMuted: boolean, muteExpiration: number}

Mutes this chat forever, unless a date is specified

#### Parameter

Name

Type

Optional

Description

unmuteDate

Date when the chat will be unmuted, don't provide a value to mute forever

Value can be null.

Inherited from

[Chat#mute](Chat.html#mute)

Returns

async

### pin() → Promise containing boolean

Pins this chat

Inherited from

[Chat#pin](Chat.html#pin)

Returns

New pin state. Could be false if the max number of pinned chats was reached.

async

### sendMessage(content\[, options\]) → Promise containing [Message](Message.html)

Send a message to this chat

#### Parameters

Name

Type

Optional

Description

content

options

Yes

Inherited from

[Chat#sendMessage](Chat.html#sendMessage)

Returns

Message that was just sent

async

### sendSeen() → Promise containing Boolean

Sets the chat as seen

Inherited from

[Chat#sendSeen](Chat.html#sendSeen)

Returns

result

async

### sendStateRecording()

Simulate recording audio in chat. This will last for 25 seconds.

Inherited from

[Chat#sendStateRecording](Chat.html#sendStateRecording)

async

### sendStateTyping()

Simulate typing in chat. This will last for 25 seconds.

Inherited from

[Chat#sendStateTyping](Chat.html#sendStateTyping)

async

### syncHistory() → Promise containing boolean

Sync chat history conversation

Inherited from

[Chat#syncHistory](Chat.html#syncHistory)

Returns

True if operation completed successfully, false otherwise.

async

### unarchive()

un-archives this chat

Inherited from

[Chat#unarchive](Chat.html#unarchive)

async

### unmute() → Promise containing {isMuted: boolean, muteExpiration: number}

Unmutes this chat

Inherited from

[Chat#unmute](Chat.html#unmute)

Returns

async

### unpin() → Promise containing boolean

Unpins this chat

Inherited from

[Chat#unpin](Chat.html#unpin)

Returns

New pin state

--- END OF FILE: PrivateContact.html.md ---
--- START OF FILE: PrivateContact.html.md ---

Source: https://docs.wwebjs.dev/PrivateContact.html

## Properties

[id](PrivateContact.html#id)

[isBlocked](PrivateContact.html#isBlocked)

[isBusiness](PrivateContact.html#isBusiness)

[isEnterprise](PrivateContact.html#isEnterprise)

[isGroup](PrivateContact.html#isGroup)

[isMe](PrivateContact.html#isMe)

[isMyContact](PrivateContact.html#isMyContact)

[isUser](PrivateContact.html#isUser)

[isWAContact](PrivateContact.html#isWAContact)

[name](PrivateContact.html#name)

[number](PrivateContact.html#number)

[pushname](PrivateContact.html#pushname)

[shortName](PrivateContact.html#shortName)

## Methods

[block()](PrivateContact.html#block)

[getAbout()](PrivateContact.html#getAbout)

[getBroadcast()](PrivateContact.html#getBroadcast)

[getChat()](PrivateContact.html#getChat)

[getCommonGroups()](PrivateContact.html#getCommonGroups)

[getCountryCode()](PrivateContact.html#getCountryCode)

[getFormattedNumber()](PrivateContact.html#getFormattedNumber)

[getProfilePicUrl()](PrivateContact.html#getProfilePicUrl)

[unblock()](PrivateContact.html#unblock)

## new PrivateContact()

Extends

[Contact](Contact.html)

## Properties

### id  unknown

ID that represents the contact

Inherited from

[Contact#id](Contact.html#id)

### isBlocked  unknown

Indicates if you have blocked this contact

Inherited from

[Contact#isBlocked](Contact.html#isBlocked)

### isBusiness  unknown

Indicates if the contact is a business contact

Inherited from

[Contact#isBusiness](Contact.html#isBusiness)

### isEnterprise  unknown

Indicates if the contact is an enterprise contact

Inherited from

[Contact#isEnterprise](Contact.html#isEnterprise)

### isGroup  unknown

Indicates if the contact is a group contact

Inherited from

[Contact#isGroup](Contact.html#isGroup)

### isMe  unknown

Indicates if the contact is the current user's contact

Inherited from

[Contact#isMe](Contact.html#isMe)

### isMyContact  unknown

Indicates if the number is saved in the current phone's contacts

Inherited from

[Contact#isMyContact](Contact.html#isMyContact)

### isUser  unknown

Indicates if the contact is a user contact

Inherited from

[Contact#isUser](Contact.html#isUser)

### isWAContact  unknown

Indicates if the number is registered on WhatsApp

Inherited from

[Contact#isWAContact](Contact.html#isWAContact)

### name  unknown

The contact's name, as saved by the current user

Inherited from

[Contact#name](Contact.html#name)

### number  unknown

Contact's phone number

Inherited from

[Contact#number](Contact.html#number)

### pushname  unknown

The name that the contact has configured to be shown publically

Inherited from

[Contact#pushname](Contact.html#pushname)

### shortName  unknown

A shortened version of name

Inherited from

[Contact#shortName](Contact.html#shortName)

## Methods

async

### block() → Promise containing boolean

Blocks this contact from WhatsApp

Inherited from

[Contact#block](Contact.html#block)

Returns

async

### getAbout() → Promise containing nullable string

Gets the Contact's current "about" info. Returns null if you don't have permission to read their status.

Inherited from

[Contact#getAbout](Contact.html#getAbout)

Returns

async

### getBroadcast() → Promise containing [Broadcast](Broadcast.html)

Gets the Contact's current status broadcast.

Inherited from

[Contact#getBroadcast](Contact.html#getBroadcast)

Returns

async

### getChat() → Promise containing [Chat](Chat.html)

Returns the Chat that corresponds to this Contact. Will return null when getting chat for currently logged in user.

Inherited from

[Contact#getChat](Contact.html#getChat)

Returns

async

### getCommonGroups() → Promise containing Array of WAWebJS.ChatId

Gets the Contact's common groups with you. Returns empty array if you don't have any common group.

Inherited from

[Contact#getCommonGroups](Contact.html#getCommonGroups)

Returns

async

### getCountryCode() → Promise containing string

Returns the contact's countrycode, (1541859685@c.us) => (1)

Inherited from

[Contact#getCountryCode](Contact.html#getCountryCode)

Returns

async

### getFormattedNumber() → Promise containing string

Returns the contact's formatted phone number, (12345678901@c.us) => (+1 (234) 5678-901)

Inherited from

[Contact#getFormattedNumber](Contact.html#getFormattedNumber)

Returns

async

### getProfilePicUrl() → Promise containing string

Returns the contact's profile picture URL, if privacy settings allow it

Inherited from

[Contact#getProfilePicUrl](Contact.html#getProfilePicUrl)

Returns

async

### unblock() → Promise containing boolean

Unblocks this contact from WhatsApp

Inherited from

[Contact#unblock](Contact.html#unblock)

Returns

--- END OF FILE: Product.html.md ---
--- START OF FILE: Product.html.md ---

Source: https://docs.wwebjs.dev/Product.html

## Properties

[currency](Product.html#currency)

[data](Product.html#data)

[id](Product.html#id)

[name](Product.html#name)

[price](Product.html#price)

[quantity](Product.html#quantity)

[thumbnailUrl](Product.html#thumbnailUrl)

## new Product()

Extends

[Base](Base.html)

## Properties

### currency  string

Currency

### data

Product metadata

### id  string

Product ID

### name  string

Product Name

### price  string

Price

### quantity  number

Product Quantity

### thumbnailUrl  string

Product Thumbnail

--- END OF FILE: ProductMetadata.html#description.md ---
--- START OF FILE: ProductMetadata.html#description.md ---

Source: https://docs.wwebjs.dev/ProductMetadata.html#description

# 404

**File not found**

The site configured at this address does not contain the requested file.

If this is your site, make sure that the filename case matches the URL as well as any file permissions.  
For root URLs (like `http://example.com/`) you must provide an `index.html` file.

[Read the full documentation](https://help.github.com/pages/) for more information about using **GitHub Pages**.

[GitHub Status](https://githubstatus.com) — [@githubstatus](https://twitter.com/githubstatus)

 [![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFMTZCRDY3REIzRjAxMUUyQUQzREIxQzRENUFFNUM5NiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFMTZCRDY3RUIzRjAxMUUyQUQzREIxQzRENUFFNUM5NiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkUxNkJENjdCQjNGMDExRTJBRDNEQjFDNEQ1QUU1Qzk2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkUxNkJENjdDQjNGMDExRTJBRDNEQjFDNEQ1QUU1Qzk2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+SM9MCAAAA+5JREFUeNrEV11Ik1EY3s4+ddOp29Q5b0opCgKFsoKoi5Kg6CIhuwi6zLJLoYLopq4qsKKgi4i6CYIoU/q5iDAKs6syoS76IRWtyJ+p7cdt7sf1PGOD+e0c3dygAx/67ZzzPM95/877GYdHRg3ZjMXFxepQKNS6sLCwJxqNNuFpiMfjVs4ZjUa/pmmjeD6VlJS8NpvNT4QQ7mxwjSsJiEQim/1+/9lgMHgIr5ohuxG1WCw9Vqv1clFR0dCqBODElV6v90ogEDjGdYbVjXhpaendioqK07CIR7ZAqE49PT09BPL2PMgTByQGsYiZlQD4uMXtdr+JxWINhgINYhGT2MsKgMrm2dnZXgRXhaHAg5jEJodUAHxux4LudHJE9RdEdA+i3Juz7bGHe4mhE9FNrgwBCLirMFV9Okh5eflFh8PR5nK5nDabrR2BNJlKO0T35+Li4n4+/J+/JQCxhmu5h3uJoXNHPbmWZAHMshWB8l5/ipqammaAf0zPDDx1ONV3vurdidqwAQL+pEc8sLcAe1CCvQ3YHxIW8Pl85xSWNC1hADDIv0rIE/o4J0k3kww4xSlwIhcq3EFFOm7KN/hUGOQkt0CFa5WpNJlMvxBEz/IVQAxg/ZRZl9wiHA63yDYieM7DnLP5CiAGsC7I5sgtYKJGWe2A8seFqgFJrJjEPY1Cn3pJ8/9W1e5VWsFDTEmFrBcoDhZJEQkXuhICMyKpjhahqN21hRYATKfUOlDmkygrR4o4C0VOLGJKrOITKB4jijzdXygBKixyC5TDQdnk/Pz8qRw6oOWGlsTKGOQW6OH6FBWsyePxdOXLTgxiyebILZCjz+GLgMIKnXNzc49YMlcRdHXcSwxFVgTInQhC9G33UhNoJLuqq6t345p9y3eUy8OTk5PjAHuI9uo4b07FBaOhsu0A4Unc+T1TU1Nj3KsSSE5yJ65jqF2DDd8QqWYmAZrIM2VlZTdnZmb6AbpdV9V6ec9znf5Q7HjYumdRE0JOp3MjitO4SFa+cZz8Umqe3TCbSLvdfkR/kWDdNQl5InuTcysOcpFT35ZrbBxx4p3JAHlZVVW1D/634VRt+FvLBgK/v5LV9WS+10xMTEwtRw7XvqOL+e2Q8V3AYIOIAXQ26/heWVnZCVfcyKHg2CBgTpmPmjYM8l24GyaUHyaIh7XwfR9ErE8qHoDfn2LTNAVC0HX6MFcBIP8Bi+6F6cdW/DICkANRfx99fEYFQ7Nph5i/uQiA214gno7K+guhaiKg9gC62+M8eR7XsBsYJ4ilam60Fb7r7uAj8wFyuwM1oIOWgfmDy6RXEEQzJMPe23DXrVS7rtyD3Df8z/FPgAEAzWU5Ku59ZAUAAAAASUVORK5CYII=)](/)[![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpEQUM1QkUxRUI0MUMxMUUyQUQzREIxQzRENUFFNUM5NiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpEQUM1QkUxRkI0MUMxMUUyQUQzREIxQzRENUFFNUM5NiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkUxNkJENjdGQjNGMDExRTJBRDNEQjFDNEQ1QUU1Qzk2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkUxNkJENjgwQjNGMDExRTJBRDNEQjFDNEQ1QUU1Qzk2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+hfPRaQAAB6lJREFUeNrsW2mME2UYbodtt+2222u35QheoCCYGBQligIJgkZJNPzgigoaTEj8AdFEMfADfyABkgWiiWcieK4S+QOiHAYUj2hMNKgYlEujpNttu9vttbvdw+chU1K6M535pt3ubHCSyezR+b73eb73+t7vrfXsufOW4bz6+vom9/b23ovnNNw34b5xYGAgODg46Mbt4mesVmsWd1qSpHhdXd2fuP/Afcput5/A88xwymcdBgLqenp6FuRyuWV4zu/v759QyWBjxoz5t76+/gun09mK5xFyakoCAPSaTCazNpvNPoYVbh6O1YKGRF0u13sNDQ27QMzfpiAAKj0lnU6/gBVfAZW2WWpwwVzy0IgP3G73FpjI6REhAGA9qVRqA1b9mVoBVyIC2tDi8Xg24+dUzQiAbS/s7Ox8G2o/3mKCC+Zw0efzPQEfcVjYrARX3dbV1bUtHo8fMgt42f+Mp0yUTVQbdWsAHVsikdiHkHaPxcQXQufXgUBgMRxme9U0AAxfH4vFvjM7eF6UkbJS5qoQwEQGA57Ac5JllFyUVZZ5ckUEgMVxsK2jlSYzI+QXJsiyjzNEAJyJAzb/KQa41jJKL8pODMQiTEAymXw5n8/P0IjD3bh7Rgog59aanxiIRTVvV/oj0tnHca/WMrVwODwB3raTGxzkBg/gnZVapFV62Wy2n5AO70HM/5wbJ0QnXyQSaVPDIuNZzY0V3ntHMwxiwHA0Gj2Np7ecIBDgaDAYXKCQJM1DhrgJ3nhulcPbl8j4NmHe46X/g60fwbz3aewjkqFQaAqebWU1AOqyQwt8Id6qEHMc97zu7u7FGGsn7HAiVuosVw7P35C1nccdgSCxop1dHeZswmfHMnxBo6ZTk+jN8dl/vF7vWofDsa+MLN9oEUBMxOb3+1eoEsBVw6Zmua49r8YmhAKDiEPcMwBsxMiqQ+ixzPFxZyqRpXARG/YOr1ObFJ0gUskXBbamcR1OKmMUvDxHRAu8/LmY3jFLMUpFqz9HxG65smYJdyKyECOxDiEAe/p1gjF2oonivZAsxVgl2daa4EQWCW6J55qFAFFZiJWYLxNQy2qOSUzGRsyXCUDIeliwAHEO4WSlWQBRFoZakXcKmCXmyXAKs0Ve9vl8q42WoIYpJU4hV3hKcNs8m9gl7p/xQ73eF5kB4j5mNrWmTJRNwAzqiV1CxjVTZCIkEq+Z1bZFZSN2CenmVAFVy4Plz8xKAGWjjAKFk6lCBMDR/MJjLLMSQNm43xAiQKTaA+9/wewhDjL+JVI1kkTSSOTcKbMTwPqESAot6dn6Fr1gHwVJju6IRuyiByPuUUBAg5DGkAgBmxlvdgIEK9gDkohdY/BJo4CAG0R8miRSsGABkgVQs4KXu098IgUXSSRsFAoKZiVAVDY2WUiiPTjYRi41KwGisrGsLtlsth8Fiwnz2fBkQvWfRtlE3iF2yW63/yCacXZ1dW02GwGyTFaRd4idJnCKHRaCxYRHoG5LTKT6SyiToP1fJHbmAYPYRR0UnZQtMnA6s0zg+GZBlt0Gdo7EPHgpE3Q6nZ8YyLhc8Xj8MJh/aKTAY+5FPAKHLE7RdwuYJZmNwzyCMkBCYyKROJBMJl9B/PXXCjjmCmDOVzH3fiPpObEWGqoKe4EBl8v1hlqsdLvd23mkxHM9pc9kMpmno9HoeTii7ewbHEZPPx1ztLS1tV3AnGuMjiNjvbQFuHw6zDo5By7dTPAQNBgMLrRarTkSls1mnwT7uwp9virx9QzbW/HuV/j5d/b+6jniKlllP8lkeONJDk+dq9GsQTnC4fB1heO0K47Hwe7WdDr9nAKgXwOBwHI+C45Htj1d6sd429TUNEcmUdc+PRaLHcvn87dXW4ugzdsaGxufL94NFv9zi1J7GVbhlvb2dnaJ3SVrxfc+n2+NTsZ7/H7/Mr3g5XdSIHyJSH1PZ+7fToyl2+ErqilgZ4NaLYB9goVGaHjR93Hv1ZrU4XDsFT20kH3PObzbWk0CgG1jacVIUnAQb9F+VexyLMzkpcLv0IJV7AHQIOCAUYHx7v5qgScmYHtTqSAyZLEJTK22Bie4iq3xsqpm4SAf9Hq9a2DnJ4uLK3SEULcdRvp3i3zHySqpficxEdsQc1NrlYXXvR+O7qASSezXB+h1SuUomgg9LL8BUoV4749EIolKh+EiqWmqVEZlDgHks2pxHw7xTqUQw9J5NcAXOK10AGIoZ6Zli6JY6Z1Q461KoZ4NiKLHarW+KDsxlDUPHZ5zPQZqUVDPJsTqb5n9malbpAh8C2XXDLl62+WZIDFRUlNVOiwencnNU3aQEkL+cDMSoLvZo2fQB7AJssNAuFuvorlDVVkkg2I87+jo2K2QAVphDrfyViK5VqtO34OkaxXCp+7drdDBCAdubm6eidX+2WwqT5komwh4YQLk+H4aE93h8Xg2gvHekQZOGSgLZTLyDTLJ4Lx9/KZWKBSainT4Iy3FqQBfnUZR42PKQFksBr9QKVXCPusD3OiA/RkQ5kP8qV/Jl1WywAp/6+dcmPM2zL1UrUahe4JqfnWWKXIul3uUbfP8njAFLW1OFr3gdFtZ72cNH+PtQT7/brW+NXqJAHh0y9V8/U/A1U7AfwIMAD7mS3pCbuWJAAAAAElFTkSuQmCC)](/)

--- END OF FILE: Reaction.html.md ---
--- START OF FILE: Reaction.html.md ---

Source: https://docs.wwebjs.dev/Reaction.html

## Properties

[ack](Reaction.html#ack)

[id](Reaction.html#id)

[msgId](Reaction.html#msgId)

[orphan](Reaction.html#orphan)

[orphanReason](Reaction.html#orphanReason)

[reaction](Reaction.html#reaction)

[read](Reaction.html#read)

[senderId](Reaction.html#senderId)

[timestamp](Reaction.html#timestamp)

## new Reaction()

Extends

[Base](Base.html)

## Properties

### ack  nullable number

ACK

### id  object

Reaction ID

### msgId  object

Message ID

### orphan  number

Orphan

### orphanReason  nullable string

Orphan reason

### reaction  string

Reaction

### read  boolean

Read

### senderId  string

Sender ID

### timestamp  number

Unix timestamp for when the reaction was created

--- END OF FILE: RemoteAuth.html.md ---
--- START OF FILE: RemoteAuth.html.md ---

Source: https://docs.wwebjs.dev/RemoteAuth.html

## new RemoteAuth(options)

### Parameters

Name

Type

Optional

Description

options

options

Values in `options` have the following properties:

Name

Type

Optional

Description

store

Remote database store instance

clientId

Client id to distinguish instances if you are using multiple, otherwise keep null if you are using only one instance

dataPath

Change the default path for saving session files, default is: "./.wwebjs\_auth/"

backupSyncIntervalMs

Sets the time interval for periodic session backups. Accepts values starting from 60000ms {1 minute}

rmMaxRetries

Sets the maximum number of retries for removing the session directory

--- END OF FILE: RemoteWebCache.html.md ---
--- START OF FILE: RemoteWebCache.html.md ---

Source: https://docs.wwebjs.dev/RemoteWebCache.html

## new RemoteWebCache(options)

### Parameters

Name

Type

Optional

Description

options

options

Values in `options` have the following properties:

Name

Type

Optional

Description

remotePath

Endpoint that should be used to fetch the version index. Use {version} as a placeholder for the version number.

strict

If true, will throw an error if the requested version can't be fetched. If false, will resolve to the latest version. Defaults to false.

--- END OF FILE: ScheduledEvent.html.md ---
--- START OF FILE: ScheduledEvent.html.md ---

Source: https://docs.wwebjs.dev/ScheduledEvent.html

## Properties

[eventSendOptions](ScheduledEvent.html#eventSendOptions)

[name](ScheduledEvent.html#name)

[startTimeTs](ScheduledEvent.html#startTimeTs)

## Method

[\_validateInputs(propName, propValue)](ScheduledEvent.html#_validateInputs)

## new ScheduledEvent(name, startTime, options)

### Parameters

Name

Type

Optional

Description

name

startTime

options

## Properties

### eventSendOptions  Object

The send options for the event

### name  string

The name of the event

### startTimeTs  number

The start time of the event

## Method

### \_validateInputs(propName, propValue) → (string or number)

Inner function to validate input values

#### Parameters

Name

Type

Optional

Description

propName

string

The property name to validate the value of

propValue

(string or number)

The property value to validate

Returns

`(string or number)` 

The property value if a validation succeeded

--- END OF FILE: Util.html.md ---
--- START OF FILE: Util.html.md ---

Source: https://docs.wwebjs.dev/Util.html

## Methods

[formatImageToWebpSticker(media)](Util.html#.formatImageToWebpSticker)

[formatToWebpSticker(media, metadata)](Util.html#.formatToWebpSticker)

[formatVideoToWebpSticker(media)](Util.html#.formatVideoToWebpSticker)

[setFfmpegPath(path)](Util.html#.setFfmpegPath)

## new Util()

## Methods

async static

### formatImageToWebpSticker(media) → Promise containing [MessageMedia](MessageMedia.html)

Formats a image to webp

#### Parameter

Name

Type

Optional

Description

media

[MessageMedia](MessageMedia.html)

Returns

`Promise containing [MessageMedia](MessageMedia.html)` 

media in webp format

async static

### formatToWebpSticker(media, metadata) → Promise containing [MessageMedia](MessageMedia.html)

Formats a media to webp

#### Parameters

Name

Type

Optional

Description

media

[MessageMedia](MessageMedia.html)

metadata

[StickerMetadata](global.html#StickerMetadata)

Returns

`Promise containing [MessageMedia](MessageMedia.html)` 

media in webp format

async static

### formatVideoToWebpSticker(media) → Promise containing [MessageMedia](MessageMedia.html)

Formats a video to webp

#### Parameter

Name

Type

Optional

Description

media

[MessageMedia](MessageMedia.html)

Returns

`Promise containing [MessageMedia](MessageMedia.html)` 

media in webp format

static

### setFfmpegPath(path)

Configure ffmpeg path

#### Parameter

Name

Type

Optional

Description

path

string

--- END OF FILE: WebCache.html.md ---
--- START OF FILE: WebCache.html.md ---

Source: https://docs.wwebjs.dev/WebCache.html

## new WebCache()

--- END OF FILE: authStrategies_BaseAuthStrategy.js.html#source-line-6.md ---
--- START OF FILE: authStrategies_BaseAuthStrategy.js.html#source-line-6.md ---

Source: https://docs.wwebjs.dev/authStrategies_BaseAuthStrategy.js.html#source-line-6

1.  `'use strict';`

3.  `/**`
4.   `* Base class which all authentication strategies extend`
5.   `*/`
6.  `class BaseAuthStrategy {`
7.      `constructor() {}`
8.      `setup(client) {`
9.          `this.client = client;`
10.      `}`
11.      `async beforeBrowserInitialized() {}`
12.      `async afterBrowserInitialized() {}`
13.      `async onAuthenticationNeeded() {`
14.          `return {`
15.              `failed: false,`
16.              `restart: false,`
17.              `failureEventPayload: undefined`
18.          `};`
19.      `}`
20.      `async getAuthEventPayload() {}`
21.      `async afterAuthReady() {}`
22.      `async disconnect() {}`
23.      `async destroy() {}`
24.      `async logout() {}`
25.  `}`

27.  `module.exports = BaseAuthStrategy;`

--- END OF FILE: authStrategies_LocalAuth.js.html#source-line-14.md ---
--- START OF FILE: authStrategies_LocalAuth.js.html#source-line-14.md ---

Source: https://docs.wwebjs.dev/authStrategies_LocalAuth.js.html#source-line-14

1.  `'use strict';`

3.  `const path = require('path');`
4.  `const fs = require('fs');`
5.  `const BaseAuthStrategy = require('./BaseAuthStrategy');`

7.  `/**`
8.   `* Local directory-based authentication`
9.   `* @param {object} options - options`
10.   `* @param {string} options.clientId - Client id to distinguish instances if you are using multiple, otherwise keep null if you are using only one instance`
11.   `* @param {string} options.dataPath - Change the default path for saving session files, default is: "./.wwebjs_auth/"` 
12.   `* @param {number} options.rmMaxRetries - Sets the maximum number of retries for removing the session directory`
13.  `*/`
14.  `class LocalAuth extends BaseAuthStrategy {`
15.      `constructor({ clientId, dataPath, rmMaxRetries }={}) {`
16.          `super();`

18.          `const idRegex = /^[-_\w]+$/i;`
19.          `if(clientId &amp;&amp; !idRegex.test(clientId)) {`
20.              `throw new Error('Invalid clientId. Only alphanumeric characters, underscores and hyphens are allowed.');`
21.          `}`

23.          `this.dataPath = path.resolve(dataPath || './.wwebjs_auth/');`
24.          `this.clientId = clientId;`
25.          `this.rmMaxRetries = rmMaxRetries ?? 4;`
26.      `}`

28.      `async beforeBrowserInitialized() {`
29.          `const puppeteerOpts = this.client.options.puppeteer;`
30.          ``const sessionDirName = this.clientId ? `session-${this.clientId}` : 'session';``
31.          `const dirPath = path.join(this.dataPath, sessionDirName);`

33.          `if(puppeteerOpts.userDataDir &amp;&amp; puppeteerOpts.userDataDir !== dirPath) {`
34.              `throw new Error('LocalAuth is not compatible with a user-supplied userDataDir.');`
35.          `}`

37.          `fs.mkdirSync(dirPath, { recursive: true });`

39.          `this.client.options.puppeteer = {`
40.              `...puppeteerOpts,`
41.              `userDataDir: dirPath`
42.          `};`

44.          `this.userDataDir = dirPath;`
45.      `}`

47.      `async logout() {`
48.          `if (this.userDataDir) {`
49.              `await fs.promises.rm(this.userDataDir, { recursive: true, force: true, maxRetries: this.rmMaxRetries })`
50.                  `.catch((e) => {`
51.                      `throw new Error(e);`
52.                  `});`
53.          `}`
54.      `}`

56.  `}`

58.  `module.exports = LocalAuth;`

--- END OF FILE: authStrategies_NoAuth.js.html#source-line-9.md ---
--- START OF FILE: authStrategies_NoAuth.js.html#source-line-9.md ---

Source: https://docs.wwebjs.dev/authStrategies_NoAuth.js.html#source-line-9

1.  `'use strict';`

3.  `const BaseAuthStrategy = require('./BaseAuthStrategy');`

5.  `/**`
6.   `* No session restoring functionality`
7.   `* Will need to authenticate via QR code every time`
8.  `*/`
9.  `class NoAuth extends BaseAuthStrategy { }`

12.  `module.exports = NoAuth;`

--- END OF FILE: authStrategies_RemoteAuth.js.html#source-line-27.md ---
--- START OF FILE: authStrategies_RemoteAuth.js.html#source-line-27.md ---

Source: https://docs.wwebjs.dev/authStrategies_RemoteAuth.js.html#source-line-27

1.  `'use strict';`

3.  `/* Require Optional Dependencies */`
4.  `try {`
5.      `var fs = require('fs-extra');`
6.      `var unzipper = require('unzipper');`
7.      `var archiver = require('archiver');`
8.  `} catch {`
9.      `fs = undefined;`
10.      `unzipper = undefined;`
11.      `archiver = undefined;`
12.  `}`

14.  `const path = require('path');`
15.  `const { Events } = require('./../util/Constants');`
16.  `const BaseAuthStrategy = require('./BaseAuthStrategy');`

18.  `/**`
19.   `* Remote-based authentication`
20.   `* @param {object} options - options`
21.   `* @param {object} options.store - Remote database store instance`
22.   `* @param {string} options.clientId - Client id to distinguish instances if you are using multiple, otherwise keep null if you are using only one instance`
23.   `* @param {string} options.dataPath - Change the default path for saving session files, default is: "./.wwebjs_auth/"` 
24.   `* @param {number} options.backupSyncIntervalMs - Sets the time interval for periodic session backups. Accepts values starting from 60000ms {1 minute}`
25.   `* @param {number} options.rmMaxRetries - Sets the maximum number of retries for removing the session directory`
26.   `*/`
27.  `class RemoteAuth extends BaseAuthStrategy {`
28.      `constructor({ clientId, dataPath, store, backupSyncIntervalMs, rmMaxRetries } = {}) {`
29.          `if (!fs &amp;&amp; !unzipper &amp;&amp; !archiver) throw new Error('Optional Dependencies [fs-extra, unzipper, archiver] are required to use RemoteAuth. Make sure to run npm install correctly and remove the --no-optional flag');`
30.          `super();`

32.          `const idRegex = /^[-_\w]+$/i;`
33.          `if (clientId &amp;&amp; !idRegex.test(clientId)) {`
34.              `throw new Error('Invalid clientId. Only alphanumeric characters, underscores and hyphens are allowed.');`
35.          `}`
36.          `if (!backupSyncIntervalMs || backupSyncIntervalMs &lt; 60000) {`
37.              `throw new Error('Invalid backupSyncIntervalMs. Accepts values starting from 60000ms {1 minute}.');`
38.          `}`
39.          `if(!store) throw new Error('Remote database store is required.');`

41.          `this.store = store;`
42.          `this.clientId = clientId;`
43.          `this.backupSyncIntervalMs = backupSyncIntervalMs;`
44.          `this.dataPath = path.resolve(dataPath || './.wwebjs_auth/');`
45.          ``this.tempDir = `${this.dataPath}/wwebjs_temp_session_${this.clientId}`;``
46.          `this.requiredDirs = ['Default', 'IndexedDB', 'Local Storage']; /* => Required Files &amp; Dirs in WWebJS to restore session */`
47.          `this.rmMaxRetries = rmMaxRetries ?? 4;`
48.      `}`

50.      `async beforeBrowserInitialized() {`
51.          `const puppeteerOpts = this.client.options.puppeteer;`
52.          ``const sessionDirName = this.clientId ? `RemoteAuth-${this.clientId}` : 'RemoteAuth';``
53.          `const dirPath = path.join(this.dataPath, sessionDirName);`

55.          `if (puppeteerOpts.userDataDir &amp;&amp; puppeteerOpts.userDataDir !== dirPath) {`
56.              `throw new Error('RemoteAuth is not compatible with a user-supplied userDataDir.');`
57.          `}`

59.          `this.userDataDir = dirPath;`
60.          `this.sessionName = sessionDirName;`

62.          `await this.extractRemoteSession();`

64.          `this.client.options.puppeteer = {`
65.              `...puppeteerOpts,`
66.              `userDataDir: dirPath`
67.          `};`
68.      `}`

70.      `async logout() {`
71.          `await this.disconnect();`
72.      `}`

74.      `async destroy() {`
75.          `clearInterval(this.backupSync);`
76.      `}`

78.      `async disconnect() {`
79.          `await this.deleteRemoteSession();`

81.          `let pathExists = await this.isValidPath(this.userDataDir);`
82.          `if (pathExists) {`
83.              `await fs.promises.rm(this.userDataDir, {`
84.                  `recursive: true,`
85.                  `force: true,`
86.                  `maxRetries: this.rmMaxRetries,`
87.              `}).catch(() => {});`
88.          `}`
89.          `clearInterval(this.backupSync);`
90.      `}`

92.      `async afterAuthReady() {`
93.          `const sessionExists = await this.store.sessionExists({session: this.sessionName});`
94.          `if(!sessionExists) {`
95.              `await this.delay(60000); /* Initial delay sync required for session to be stable enough to recover */`
96.              `await this.storeRemoteSession({emit: true});`
97.          `}`
98.          `var self = this;`
99.          `this.backupSync = setInterval(async function () {`
100.              `await self.storeRemoteSession();`
101.          `}, this.backupSyncIntervalMs);`
102.      `}`

104.      `async storeRemoteSession(options) {`
105.          `/* Compress &amp; Store Session */`
106.          `const pathExists = await this.isValidPath(this.userDataDir);`
107.          `if (pathExists) {`
108.              `await this.compressSession();`
109.              `await this.store.save({session: this.sessionName});`
110.              ``await fs.promises.unlink(`${this.sessionName}.zip`);``
111.              ``await fs.promises.rm(`${this.tempDir}`, {``
112.                  `recursive: true,`
113.                  `force: true,`
114.                  `maxRetries: this.rmMaxRetries,`
115.              `}).catch(() => {});`
116.              `if(options &amp;&amp; options.emit) this.client.emit(Events.REMOTE_SESSION_SAVED);`
117.          `}`
118.      `}`

120.      `async extractRemoteSession() {`
121.          `const pathExists = await this.isValidPath(this.userDataDir);`
122.          ``const compressedSessionPath = `${this.sessionName}.zip`;``
123.          `const sessionExists = await this.store.sessionExists({session: this.sessionName});`
124.          `if (pathExists) {`
125.              `await fs.promises.rm(this.userDataDir, {`
126.                  `recursive: true,`
127.                  `force: true,`
128.                  `maxRetries: this.rmMaxRetries,`
129.              `}).catch(() => {});`
130.          `}`
131.          `if (sessionExists) {`
132.              `await this.store.extract({session: this.sessionName, path: compressedSessionPath});`
133.              `await this.unCompressSession(compressedSessionPath);`
134.          `} else {`
135.              `fs.mkdirSync(this.userDataDir, { recursive: true });`
136.          `}`
137.      `}`

139.      `async deleteRemoteSession() {`
140.          `const sessionExists = await this.store.sessionExists({session: this.sessionName});`
141.          `if (sessionExists) await this.store.delete({session: this.sessionName});`
142.      `}`

144.      `async compressSession() {`
145.          `const archive = archiver('zip');`
146.          ``const stream = fs.createWriteStream(`${this.sessionName}.zip`);``

148.          `await fs.copy(this.userDataDir, this.tempDir).catch(() => {});`
149.          `await this.deleteMetadata();`
150.          `return new Promise((resolve, reject) => {`
151.              `archive`
152.                  `.directory(this.tempDir, false)`
153.                  `.on('error', err => reject(err))`
154.                  `.pipe(stream);`

156.              `stream.on('close', () => resolve());`
157.              `archive.finalize();`
158.          `});`
159.      `}`

161.      `async unCompressSession(compressedSessionPath) {`
162.          `var stream = fs.createReadStream(compressedSessionPath);`
163.          `await new Promise((resolve, reject) => {`
164.              `stream.pipe(unzipper.Extract({`
165.                  `path: this.userDataDir`
166.              `}))`
167.                  `.on('error', err => reject(err))`
168.                  `.on('finish', () => resolve());`
169.          `});`
170.          `await fs.promises.unlink(compressedSessionPath);`
171.      `}`

173.      `async deleteMetadata() {`
174.          `const sessionDirs = [this.tempDir, path.join(this.tempDir, 'Default')];`
175.          `for (const dir of sessionDirs) {`
176.              `const sessionFiles = await fs.promises.readdir(dir);`
177.              `for (const element of sessionFiles) {`
178.                  `if (!this.requiredDirs.includes(element)) {`
179.                      `const dirElement = path.join(dir, element);`
180.                      `const stats = await fs.promises.lstat(dirElement);`

182.                      `if (stats.isDirectory()) {`
183.                          `await fs.promises.rm(dirElement, {`
184.                              `recursive: true,`
185.                              `force: true,`
186.                              `maxRetries: this.rmMaxRetries,`
187.                          `}).catch(() => {});`
188.                      `} else {`
189.                          `await fs.promises.unlink(dirElement).catch(() => {});`
190.                      `}`
191.                  `}`
192.              `}`
193.          `}`
194.      `}`

196.      `async isValidPath(path) {`
197.          `try {`
198.              `await fs.promises.access(path);`
199.              `return true;`
200.          `} catch {`
201.              `return false;`
202.          `}`
203.      `}`

205.      `async delay(ms) {`
206.          `return new Promise(resolve => setTimeout(resolve, ms));`
207.      `}`
208.  `}`

210.  `module.exports = RemoteAuth;`

--- END OF FILE: global.html#ChatTypes#.GROUP.md ---
--- START OF FILE: global.html#ChatTypes#.GROUP.md ---

Source: https://docs.wwebjs.dev/global.html#ChatTypes#.GROUP

# Globals

## Properties

[ChatTypes](global.html#ChatTypes)

[Events](global.html#Events)

[GroupNotificationTypes](global.html#GroupNotificationTypes)

[MessageAck](global.html#MessageAck)

[MessageTypes](global.html#MessageTypes)

[Status](global.html#Status)

[WAState](global.html#WAState)

## Method

[exposeFunctionIfAbsent(page, name, fn)](global.html#exposeFunctionIfAbsent)

## Abstract types

[AddParticipantsResult](global.html#AddParticipantsResult)

[AddParticipnatsOptions](global.html#AddParticipnatsOptions)

[ButtonSpec](global.html#ButtonSpec)

[ChannelId](global.html#ChannelId)

[ContactId](global.html#ContactId)

[CreateChannelOptions](global.html#CreateChannelOptions)

[CreateChannelResult](global.html#CreateChannelResult)

[CreateGroupOptions](global.html#CreateGroupOptions)

[CreateGroupResult](global.html#CreateGroupResult)

[FormattedButtonSpec](global.html#FormattedButtonSpec)

[GroupMembershipRequest](global.html#GroupMembershipRequest)

[GroupMembershipRequest](global.html#GroupMembershipRequest)

[GroupMention](global.html#GroupMention)

[GroupMention](global.html#GroupMention)

[GroupParticipant](global.html#GroupParticipant)

[LocationSendOptions](global.html#LocationSendOptions)

[MembershipRequestActionOptions](global.html#MembershipRequestActionOptions)

[MembershipRequestActionOptions](global.html#MembershipRequestActionOptions)

[MembershipRequestActionResult](global.html#MembershipRequestActionResult)

[MembershipRequestActionResult](global.html#MembershipRequestActionResult)

[MessageInfo](global.html#MessageInfo)

[MessageSendOptions](global.html#MessageSendOptions)

[MessageSendOptions](global.html#MessageSendOptions)

[ParticipantResult](global.html#ParticipantResult)

[PollSendOptions](global.html#PollSendOptions)

[ReactionList](global.html#ReactionList)

[ScheduledEventSendOptions](global.html#ScheduledEventSendOptions)

[SelectedPollOption](global.html#SelectedPollOption)

[SendChannelAdminInviteOptions](global.html#SendChannelAdminInviteOptions)

[SendChannelAdminInviteOptions](global.html#SendChannelAdminInviteOptions)

[StickerMetadata](global.html#StickerMetadata)

[TargetOptions](global.html#TargetOptions)

[TargetOptions](global.html#TargetOptions)

[TransferChannelOwnershipOptions](global.html#TransferChannelOwnershipOptions)

[TransferChannelOwnershipOptions](global.html#TransferChannelOwnershipOptions)

[UnsubscribeOptions](global.html#UnsubscribeOptions)

## Properties

read-only

### ChatTypes  string

Chat types

#### Properties

Name

Type

Optional

Description

SOLO

GROUP

UNKNOWN

read-only

### Events  string

Events that can be emitted by the client

#### Properties

Name

Type

Optional

Description

AUTHENTICATED

AUTHENTICATION\_FAILURE

READY

CHAT\_REMOVED

CHAT\_ARCHIVED

MESSAGE\_RECEIVED

MESSAGE\_CIPHERTEXT

MESSAGE\_CREATE

MESSAGE\_REVOKED\_EVERYONE

MESSAGE\_REVOKED\_ME

MESSAGE\_ACK

MESSAGE\_EDIT

UNREAD\_COUNT

MESSAGE\_REACTION

MEDIA\_UPLOADED

CONTACT\_CHANGED

GROUP\_JOIN

GROUP\_LEAVE

GROUP\_ADMIN\_CHANGED

GROUP\_MEMBERSHIP\_REQUEST

GROUP\_UPDATE

QR\_RECEIVED

CODE\_RECEIVED

LOADING\_SCREEN

DISCONNECTED

STATE\_CHANGED

BATTERY\_CHANGED

INCOMING\_CALL

REMOTE\_SESSION\_SAVED

VOTE\_UPDATE

read-only

### GroupNotificationTypes  string

Group notification types

#### Properties

Name

Type

Optional

Description

ADD

INVITE

REMOVE

LEAVE

PROMOTE

DEMOTE

SUBJECT

DESCRIPTION

PICTURE

ANNOUNCE

RESTRICT

read-only

### MessageAck  number

Message ACK

#### Properties

Name

Type

Optional

Description

ACK\_ERROR

ACK\_PENDING

ACK\_SERVER

ACK\_DEVICE

ACK\_READ

ACK\_PLAYED

read-only

### MessageTypes  string

Message types

#### Properties

Name

Type

Optional

Description

TEXT

AUDIO

VOICE

IMAGE

ALBUM

VIDEO

DOCUMENT

STICKER

LOCATION

CONTACT\_CARD

CONTACT\_CARD\_MULTI

ORDER

REVOKED

PRODUCT

UNKNOWN

GROUP\_INVITE

LIST

LIST\_RESPONSE

BUTTONS\_RESPONSE

PAYMENT

BROADCAST\_NOTIFICATION

CALL\_LOG

CIPHERTEXT

DEBUG

E2E\_NOTIFICATION

GP2

GROUP\_NOTIFICATION

HSM

INTERACTIVE

NATIVE\_FLOW

NOTIFICATION

NOTIFICATION\_TEMPLATE

OVERSIZED

PROTOCOL

REACTION

TEMPLATE\_BUTTON\_REPLY

POLL\_CREATION

SCHEDULED\_EVENT\_CREATION

read-only

### Status  number

Client status

#### Properties

Name

Type

Optional

Description

INITIALIZING

AUTHENTICATING

READY

read-only

### WAState  string

WhatsApp state

#### Properties

Name

Type

Optional

Description

CONFLICT

CONNECTED

DEPRECATED\_VERSION

OPENING

PAIRING

PROXYBLOCK

SMB\_TOS\_BLOCK

TIMEOUT

TOS\_BLOCK

UNLAUNCHED

UNPAIRED

UNPAIRED\_IDLE

## Method

async

### exposeFunctionIfAbsent(page, name, fn)

Expose a function to the page if it does not exist

NOTE: Rewrite it to 'upsertFunction' after updating Puppeteer to 20.6 or higher using page.removeExposedFunction https://pptr.dev/api/puppeteer.page.removeexposedfunction

#### Parameters

Name

Type

Optional

Description

page

object

Puppeteer Page instance

name

string

fn

function()

## Abstract types

### AddParticipantsResult  Object

An object that handles the result for `addParticipants` method

#### Properties

Name

Type

Optional

Description

code

number

The code of the result

message

string

The result message

isInviteV4Sent

boolean

Indicates if the inviteV4 was sent to the partitipant

### AddParticipnatsOptions  Object

An object that handles options for adding participants

#### Properties

Name

Type

Optional

Description

sleep

(Array of number or number)

Yes

The number of milliseconds to wait before adding the next participant. If it is an array, a random sleep time between the sleep\[0\] and sleep\[1\] values will be added (the difference must be >=100 ms, otherwise, a random sleep time between sleep\[1\] and sleep\[1\] + 100 will be added). If sleep is a number, a sleep time equal to its value will be added. By default, sleep is an array with a value of \[250, 500\]

Defaults to `[250, 500]`.

autoSendInviteV4

boolean

Yes

If true, the inviteV4 will be sent to those participants who have restricted others from being automatically added to groups, otherwise the inviteV4 won't be sent (true by default)

Defaults to `true`.

comment

string

Yes

The comment to be added to an inviteV4 (empty string by default)

Defaults to `''`.

### ButtonSpec  Object

Button spec used in Buttons constructor

#### Properties

Name

Type

Optional

Description

id

string

Yes

Custom ID to set on the button. A random one will be generated if one is not passed.

body

string

The text to show on the button.

### ChannelId  Object

Channel ID structure

#### Properties

Name

Type

Optional

Description

server

string

user

string

\_serialized

string

### ContactId  Object

ID that represents a contact

#### Properties

Name

Type

Optional

Description

server

string

user

string

\_serialized

string

### CreateChannelOptions  Object

Options for the channel creation

#### Properties

Name

Type

Optional

Description

description

string

The channel description

Value can be null.

picture

[MessageMedia](MessageMedia.html)

The channel profile picture

Value can be null.

### CreateChannelResult  Object

An object that handles the result for `createChannel` method

#### Properties

Name

Type

Optional

Description

title

string

A channel title

nid

ChatId

An object that handels the newly created channel ID

Values in `nid` have the following properties:

Name

Type

Optional

Description

server

string

'newsletter'

user

string

'XXXXXXXXXX'

\_serialized

string

'XXXXXXXXXX@newsletter'

inviteLink

string

The channel invite link, starts with 'https://whatsapp.com/channel/'

createdAtTs

number

The timestamp the channel was created at

### CreateGroupOptions  Object

An object that handles options for group creation

#### Properties

Name

Type

Optional

Description

messageTimer

number

Yes

The number of seconds for the messages to disappear in the group (0 by default, won't take an effect if the group is been creating with myself only)

Defaults to `0`.

parentGroupId

(string or undefined)

The ID of a parent community group to link the newly created group with (won't take an effect if the group is been creating with myself only)

autoSendInviteV4

boolean

Yes

If true, the inviteV4 will be sent to those participants who have restricted others from being automatically added to groups, otherwise the inviteV4 won't be sent (true by default)

Defaults to `true`.

comment

string

Yes

The comment to be added to an inviteV4 (empty string by default)

Defaults to `''`.

memberAddMode

boolean

Yes

If true, only admins can add members to the group (false by default)

Defaults to `false`.

membershipApprovalMode

boolean

Yes

If true, group admins will be required to approve anyone who wishes to join the group (false by default)

Defaults to `false`.

isRestrict

boolean

Yes

If true, only admins can change group group info (true by default)

Defaults to `true`.

isAnnounce

boolean

Yes

If true, only admins can send messages (false by default)

Defaults to `false`.

### CreateGroupResult  Object

An object that handles the result for `createGroup` method

#### Properties

Name

Type

Optional

Description

title

string

A group title

gid

Object

An object that handles the newly created group ID

Values in `gid` have the following properties:

Name

Type

Optional

Description

server

string

user

string

\_serialized

string

participants

Object with [ParticipantResult](global.html#ParticipantResult) properties

An object that handles the result value for each added to the group participant

### FormattedButtonSpec  Object

#### Properties

Name

Type

Optional

Description

buttonId

string

type

number

buttonText

Object

### GroupMembershipRequest  Object

An object that handles the information about the group membership request

#### Properties

Name

Type

Optional

Description

id

Object

The wid of a user who requests to enter the group

addedBy

Object

The wid of a user who created that request

parentGroupId

(Object or null)

The wid of a community parent group to which the current group is linked

requestMethod

string

The method used to create the request: NonAdminAdd/InviteLink/LinkedGroupJoin

t

number

The timestamp the request was created at

### GroupMembershipRequest  Object

An object that handles the information about the group membership request

#### Properties

Name

Type

Optional

Description

id

Object

The wid of a user who requests to enter the group

addedBy

Object

The wid of a user who created that request

parentGroupId

(Object or null)

The wid of a community parent group to which the current group is linked

requestMethod

string

The method used to create the request: NonAdminAdd/InviteLink/LinkedGroupJoin

t

number

The timestamp the request was created at

### GroupMention  Object

An object representing mentions of groups

#### Properties

Name

Type

Optional

Description

subject

string

The name of a group to mention (can be custom)

id

string

The group ID, e.g.: 'XXXXXXXXXX@g.us'

### GroupMention  Object

#### Properties

Name

Type

Optional

Description

groupSubject

string

The name of the group

groupJid

string

The group ID

### GroupParticipant  Object

Group participant information

#### Properties

Name

Type

Optional

Description

id

[ContactId](global.html#ContactId)

isAdmin

boolean

isSuperAdmin

boolean

### LocationSendOptions  Object

Location send options

#### Properties

Name

Type

Optional

Description

name

string

Yes

Location name

address

string

Yes

Location address

url

string

Yes

URL address to be shown within a location message

description

string

Yes

Location full description

### MembershipRequestActionOptions  Object

An object that handles options for `approveGroupMembershipRequests` and `rejectGroupMembershipRequests` methods

#### Properties

Name

Type

Optional

Description

requesterIds

(Array of string, string, or null)

User ID/s who requested to join the group, if no value is provided, the method will search for all membership requests for that group

sleep

(Array of number, number, or null)

The number of milliseconds to wait before performing an operation for the next requester. If it is an array, a random sleep time between the sleep\[0\] and sleep\[1\] values will be added (the difference must be >=100 ms, otherwise, a random sleep time between sleep\[1\] and sleep\[1\] + 100 will be added). If sleep is a number, a sleep time equal to its value will be added. By default, sleep is an array with a value of \[250, 500\]

### MembershipRequestActionOptions  Object

An object that handles options for `approveGroupMembershipRequests` and `rejectGroupMembershipRequests` methods

#### Properties

Name

Type

Optional

Description

requesterIds

(Array of string, string, or null)

User ID/s who requested to join the group, if no value is provided, the method will search for all membership requests for that group

sleep

(Array of number, number, or null)

The number of milliseconds to wait before performing an operation for the next requester. If it is an array, a random sleep time between the sleep\[0\] and sleep\[1\] values will be added (the difference must be >=100 ms, otherwise, a random sleep time between sleep\[1\] and sleep\[1\] + 100 will be added). If sleep is a number, a sleep time equal to its value will be added. By default, sleep is an array with a value of \[250, 500\]

### MembershipRequestActionResult  Object

An object that handles the result for membership request action

#### Properties

Name

Type

Optional

Description

requesterId

string

User ID whos membership request was approved/rejected

error

(number or undefined)

An error code that occurred during the operation for the participant

message

string

A message with a result of membership request action

### MembershipRequestActionResult  Object

An object that handles the result for membership request action

#### Properties

Name

Type

Optional

Description

requesterId

string

User ID whos membership request was approved/rejected

error

number

An error code that occurred during the operation for the participant

message

string

A message with a result of membership request action

### MessageInfo  Object

Message Info

#### Properties

Name

Type

Optional

Description

delivery

Array of {id: [ContactId](global.html#ContactId), t: number}

Contacts to which the message has been delivered to

deliveryRemaining

number

Amount of people to whom the message has not been delivered to

played

Array of {id: [ContactId](global.html#ContactId), t: number}

Contacts who have listened to the voice message

playedRemaining

number

Amount of people who have not listened to the message

read

Array of {id: [ContactId](global.html#ContactId), t: number}

Contacts who have read the message

readRemaining

number

Amount of people who have not read the message

### MessageSendOptions  Object

Message options.

#### Properties

Name

Type

Optional

Description

linkPreview

boolean

Yes

Show links preview. Has no effect on multi-device accounts.

Defaults to `true`.

sendAudioAsVoice

boolean

Yes

Send audio as voice message with a generated waveform

Defaults to `false`.

sendVideoAsGif

boolean

Yes

Send video as gif

Defaults to `false`.

sendMediaAsSticker

boolean

Yes

Send media as a sticker

Defaults to `false`.

sendMediaAsDocument

boolean

Yes

Send media as a document

Defaults to `false`.

sendMediaAsHd

boolean

Yes

Send image as quality HD

Defaults to `false`.

isViewOnce

boolean

Yes

Send photo/video as a view once message

Defaults to `false`.

parseVCards

boolean

Yes

Automatically parse vCards and send them as contacts

Defaults to `true`.

caption

string

Yes

Image or video caption

quotedMessageId

string

Yes

Id of the message that is being quoted (or replied to)

groupMentions

Array of [GroupMention](global.html#GroupMention)

Yes

An array of object that handle group mentions

mentions

Array of string

Yes

User IDs to mention in the message

sendSeen

boolean

Yes

Mark the conversation as seen after sending the message

Defaults to `true`.

invokedBotWid

string

Yes

Bot Wid when doing a bot mention like @Meta AI

stickerAuthor

string

Yes

Sets the author of the sticker, (if sendMediaAsSticker is true).

stickerName

string

Yes

Sets the name of the sticker, (if sendMediaAsSticker is true).

stickerCategories

Array of string

Yes

Sets the categories of the sticker, (if sendMediaAsSticker is true). Provide emoji char array, can be null.

ignoreQuoteErrors

boolean

Yes

Should the bot send a quoted message without the quoted message if it fails to get the quote?

Defaults to `true`.

waitUntilMsgSent

boolean

Yes

Should the bot wait for the message send result?

Defaults to `false`.

media

[MessageMedia](MessageMedia.html)

Yes

Media to be sent

extra

any

Yes

Extra options

### MessageSendOptions  Object

Message options

#### Properties

Name

Type

Optional

Description

caption

string

Image or video caption

Value can be null.

mentions

Array of string

User IDs of user that will be mentioned in the message

Value can be null.

media

[MessageMedia](MessageMedia.html)

Image or video to be sent

Value can be null.

### ParticipantResult  Object

An object that represents the result for a participant added to a group

#### Properties

Name

Type

Optional

Description

statusCode

number

The status code of the result

message

string

The result message

isGroupCreator

boolean

Indicates if the participant is a group creator

isInviteV4Sent

boolean

Indicates if the inviteV4 was sent to the participant

### PollSendOptions  Object

Poll send options

#### Properties

Name

Type

Optional

Description

allowMultipleAnswers

boolean

Yes

If false it is a single choice poll, otherwise it is a multiple choice poll (false by default)

Defaults to `false`.

messageSecret

Array of number

The custom message secret, can be used as a poll ID. NOTE: it has to be a unique vector with a length of 32

Value can be null.

### ReactionList  Object

Reaction List

#### Properties

Name

Type

Optional

Description

id

string

Original emoji

aggregateEmoji

string

aggregate emoji

hasReactionByMe

boolean

Flag who sent the reaction

senders

Array of [Reaction](Reaction.html)

Reaction senders, to this message

### ScheduledEventSendOptions  Object

ScheduledEvent send options

#### Properties

Name

Type

Optional

Description

description

string

The scheduled event description

Value can be null.

endTime

Date

The end time of the event

Value can be null.

location

string

The location of the event

Value can be null.

callType

string

The type of a WhatsApp call link to generate, valid values are: `video` | `voice` | `none`

Value can be null.

isEventCanceled

boolean

Yes

Indicates if a scheduled event should be sent as an already canceled

Defaults to `false`.

messageSecret

Array of number

The custom message secret, can be used as an event ID. NOTE: it has to be a unique vector with a length of 32

Value can be null.

### SelectedPollOption  Object

Selected poll option structure

#### Properties

Name

Type

Optional

Description

id

number

The local selected or deselected option ID

name

string

The option name

### SendChannelAdminInviteOptions  Object

#### Property

Name

Type

Optional

Description

comment

string

The comment to be added to an invitation

Value can be null.

### SendChannelAdminInviteOptions  Object

#### Property

Name

Type

Optional

Description

comment

string

The comment to be added to an invitation

Value can be null.

### StickerMetadata  Object

Sticker metadata.

#### Properties

Name

Type

Optional

Description

name

string

Yes

author

string

Yes

categories

Array of string

Yes

### TargetOptions  Object

Target options object description

#### Properties

Name

Type

Optional

Description

module

(string or number)

The name or a key of the target module to search

index

number

The index value of the target module

function

string

The function name to get from a module

### TargetOptions  Object

Target options object description

#### Properties

Name

Type

Optional

Description

module

(string or number)

The target module

function

string

The function name to get from a module

### TransferChannelOwnershipOptions  Object

Options for transferring a channel ownership to another user

#### Property

Name

Type

Optional

Description

shouldDismissSelfAsAdmin

boolean

Yes

If true, after the channel ownership is being transferred to another user, the current user will be dismissed as a channel admin and will become to a channel subscriber.

Defaults to `false`.

### TransferChannelOwnershipOptions  Object

Options for transferring a channel ownership to another user

#### Property

Name

Type

Optional

Description

shouldDismissSelfAsAdmin

boolean

Yes

If true, after the channel ownership is being transferred to another user, the current user will be dismissed as a channel admin and will become to a channel subscriber.

Defaults to `false`.

### UnsubscribeOptions  Object

Options for unsubscribe from a channel

#### Property

Name

Type

Optional

Description

deleteLocalModels

boolean

Yes

If true, after an unsubscription, it will completely remove a channel from the channel collection making it seem like the current user have never interacted with it. Otherwise it will only remove a channel from the list of channels the current user is subscribed to and will set the membership type for that channel to GUEST

Defaults to `false`.

--- END OF FILE: index.html.md ---
--- START OF FILE: index.html.md ---

Source: https://docs.wwebjs.dev/index.html

  

[![WWebJS Website](https://github.com/wwebjs/assets/blob/main/Collection/GitHub/wwebjs.png?raw=true "whatsapp-web.js")](https://wwebjs.dev)

  

[![npm](https://img.shields.io/npm/v/whatsapp-web.js.svg)](https://www.npmjs.com/package/whatsapp-web.js) [![Depfu](https://badges.depfu.com/badges/4a65a0de96ece65fdf39e294e0c8dcba/overview.svg)](https://depfu.com/github/pedroslopez/whatsapp-web.js?project_id=9765) ![WhatsApp_Web 2.2346.52](https://img.shields.io/badge/WhatsApp_Web-2.3000.1017054665-brightgreen.svg) [![Discord server](https://img.shields.io/discord/698610475432411196.svg?logo=discord)](https://discord.gg/H7DqQs4)

  

## About

**A WhatsApp API client that operates via the WhatsApp Web browser.**

The library launches the WhatsApp Web browser app via Puppeteer, accessing its internal functions and creating a managed instance to reduce the risk of being blocked. This gives the API client nearly all WhatsApp Web features for dynamic use in a Node.js application.

> \[!IMPORTANT\] **It is not guaranteed you will not be blocked by using this method. WhatsApp does not allow bots or unofficial clients on their platform, so this shouldn't be considered totally safe.**

## Links

*   [GitHub](https://github.com/pedroslopez/whatsapp-web.js)
*   [Guide](https://guide.wwebjs.dev/guide) ([source](https://github.com/wwebjs/wwebjs.dev/tree/main))
*   [Documentation](https://docs.wwebjs.dev/) ([source](https://github.com/pedroslopez/whatsapp-web.js/tree/main/docs))
*   [Discord Server](https://discord.gg/H7DqQs4)
*   [npm](https://npmjs.org/package/whatsapp-web.js)

## Installation

The module is available on [npm](https://npmjs.org/package/whatsapp-web.js) via `npm i whatsapp-web.js`!

> \[!NOTE\] **Node `v18` or higher, is required.**  
> See the [Guide](https://guide.wwebjs.dev/guide) for quick upgrade instructions.

## Example usage

```
const { Client } = require('whatsapp-web.js');

const client = new Client();

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    console.log('QR RECEIVED', qr);
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', msg => {
    if (msg.body == '!ping') {
        msg.reply('pong');
    }
});

client.initialize();
```

Take a look at [example.js](https://github.com/pedroslopez/whatsapp-web.js/blob/master/example.js) for another examples with additional use cases.  
For further details on saving and restoring sessions, explore the provided [Authentication Strategies](https://wwebjs.dev/guide/creating-your-bot/authentication.html).

## Supported features

Feature

Status

Multi Device

✅

Send messages

✅

Receive messages

✅

Send media (images/audio/documents)

✅

Send media (video)

✅ [(requires Google Chrome)](https://wwebjs.dev/guide/creating-your-bot/handling-attachments.html#caveat-for-sending-videos-and-gifs)

Send stickers

✅

Receive media (images/audio/video/documents)

✅

Send contact cards

✅

Send location

✅

Send buttons

❌ [(DEPRECATED)](https://www.youtube.com/watch?v=hv1R1rLeVVE)

Send lists

❌ [(DEPRECATED)](https://www.youtube.com/watch?v=hv1R1rLeVVE)

Receive location

✅

Message replies

✅

Join groups by invite

✅

Get invite for group

✅

Modify group info (subject, description)

✅

Modify group settings (send messages, edit info)

✅

Add group participants

✅

Kick group participants

✅

Promote/demote group participants

✅

Mention users

✅

Mention groups

✅

Mute/unmute chats

✅

Block/unblock contacts

✅

Get contact info

✅

Get profile pictures

✅

Set user status message

✅

React to messages

✅

Create polls

✅

Channels

✅

Vote in polls

🔜

Communities

🔜

Something missing? Make an issue and let us know!

## Contributing

Feel free to open pull requests; we welcome contributions! However, for significant changes, it's best to open an issue beforehand. Make sure to review our [contribution guidelines](https://github.com/pedroslopez/whatsapp-web.js/blob/main/CODE_OF_CONDUCT.md) before creating a pull request. Before creating your own issue or pull request, always check to see if one already exists!

## Supporting the project

You can support the maintainer of this project through the links below

*   [Support via GitHub Sponsors](https://github.com/sponsors/pedroslopez)
*   [Support via PayPal](https://www.paypal.me/psla/)
*   [Sign up for DigitalOcean](https://m.do.co/c/73f906a36ed4) and get $200 in credit when you sign up (Referral)

## Disclaimer

This project is not affiliated, associated, authorized, endorsed by, or in any way officially connected with WhatsApp or any of its subsidiaries or its affiliates. The official WhatsApp website can be found at [whatsapp.com](https://whatsapp.com). "WhatsApp" as well as related names, marks, emblems and images are registered trademarks of their respective owners. Also it is not guaranteed you will not be blocked by using this method. WhatsApp does not allow bots or unofficial clients on their platform, so this shouldn't be considered totally safe.

## License

Copyright 2019 Pedro S Lopez

Licensed under the Apache License, Version 2.0 (the "License");  
you may not use this project except in compliance with the License.  
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.

Unless required by applicable law or agreed to in writing, software  
distributed under the License is distributed on an "AS IS" BASIS,  
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  
See the License for the specific language governing permissions and  
limitations under the License.

## Base

[Base()](Base.html)

## BaseAuthStrategy

[BaseAuthStrategy()](BaseAuthStrategy.html)

## Broadcast

[Broadcast()](Broadcast.html)

[Broadcast#getChat()](Broadcast.html#getChat)

[Broadcast#getContact()](Broadcast.html#getContact)

[Broadcast#id](Broadcast.html#id)

[Broadcast#msgs](Broadcast.html#msgs)

[Broadcast#timestamp](Broadcast.html#timestamp)

[Broadcast#totalCount](Broadcast.html#totalCount)

[Broadcast#unreadCount](Broadcast.html#unreadCount)

## BusinessContact

[BusinessContact()](BusinessContact.html)

[BusinessContact#block()](BusinessContact.html#block)

[BusinessContact#businessProfile](BusinessContact.html#businessProfile)

[BusinessContact#getAbout()](BusinessContact.html#getAbout)

[BusinessContact#getBroadcast()](BusinessContact.html#getBroadcast)

[BusinessContact#getChat()](BusinessContact.html#getChat)

[BusinessContact#getCommonGroups()](BusinessContact.html#getCommonGroups)

[BusinessContact#getCountryCode()](BusinessContact.html#getCountryCode)

[BusinessContact#getFormattedNumber()](BusinessContact.html#getFormattedNumber)

[BusinessContact#getProfilePicUrl()](BusinessContact.html#getProfilePicUrl)

[BusinessContact#id](BusinessContact.html#id)

[BusinessContact#isBlocked](BusinessContact.html#isBlocked)

[BusinessContact#isBusiness](BusinessContact.html#isBusiness)

[BusinessContact#isEnterprise](BusinessContact.html#isEnterprise)

[BusinessContact#isGroup](BusinessContact.html#isGroup)

[BusinessContact#isMe](BusinessContact.html#isMe)

[BusinessContact#isMyContact](BusinessContact.html#isMyContact)

[BusinessContact#isUser](BusinessContact.html#isUser)

[BusinessContact#isWAContact](BusinessContact.html#isWAContact)

[BusinessContact#name](BusinessContact.html#name)

[BusinessContact#number](BusinessContact.html#number)

[BusinessContact#pushname](BusinessContact.html#pushname)

[BusinessContact#shortName](BusinessContact.html#shortName)

[BusinessContact#unblock()](BusinessContact.html#unblock)

## Buttons

[Buttons(body, buttons, title, footer)](Buttons.html)

[Buttons#\_format(buttons)](Buttons.html#_format)

[Buttons#body](Buttons.html#body)

[Buttons#buttons](Buttons.html#buttons)

[Buttons#footer](Buttons.html#footer)

[Buttons#title](Buttons.html#title)

## Call

[Call()](Call.html)

[Call#canHandleLocally](Call.html#canHandleLocally)

[Call#from](Call.html#from)

[Call#fromMe](Call.html#fromMe)

[Call#id](Call.html#id)

[Call#isGroup](Call.html#isGroup)

[Call#isVideo](Call.html#isVideo)

[Call#participants](Call.html#participants)

[Call#reject()](Call.html#reject)

[Call#timestamp](Call.html#timestamp)

[Call#webClientShouldHandle](Call.html#webClientShouldHandle)

## Channel

[Channel()](Channel.html)

[Channel#\_muteUnmuteChannel(action)](Channel.html#_muteUnmuteChannel)

[Channel#\_setChannelMetadata(value, property)](Channel.html#_setChannelMetadata)

[Channel#acceptChannelAdminInvite()](Channel.html#acceptChannelAdminInvite)

[Channel#deleteChannel()](Channel.html#deleteChannel)

[Channel#demoteChannelAdmin(userId)](Channel.html#demoteChannelAdmin)

[Channel#description](Channel.html#description)

[Channel#fetchMessages(searchOptions)](Channel.html#fetchMessages)

[Channel#getSubscribers(limit)](Channel.html#getSubscribers)

[Channel#id](Channel.html#id)

[Channel#isChannel](Channel.html#isChannel)

[Channel#isGroup](Channel.html#isGroup)

[Channel#isMuted](Channel.html#isMuted)

[Channel#isReadOnly](Channel.html#isReadOnly)

[Channel#lastMessage](Channel.html#lastMessage)

[Channel#mute()](Channel.html#mute)

[Channel#muteExpiration](Channel.html#muteExpiration)

[Channel#name](Channel.html#name)

[Channel#revokeChannelAdminInvite(userId)](Channel.html#revokeChannelAdminInvite)

[Channel#sendChannelAdminInvite(chatId, options)](Channel.html#sendChannelAdminInvite)

[Channel#sendMessage(content, options)](Channel.html#sendMessage)

[Channel#sendSeen()](Channel.html#sendSeen)

[Channel#setDescription(newDescription)](Channel.html#setDescription)

[Channel#setProfilePicture(newProfilePicture)](Channel.html#setProfilePicture)

[Channel#setReactionSetting(reactionCode)](Channel.html#setReactionSetting)

[Channel#setSubject(newSubject)](Channel.html#setSubject)

[Channel#timestamp](Channel.html#timestamp)

[Channel#transferChannelOwnership(newOwnerId, options)](Channel.html#transferChannelOwnership)

[Channel#unmute()](Channel.html#unmute)

[Channel#unreadCount](Channel.html#unreadCount)

## Chat

[Chat()](Chat.html)

[Chat#addOrEditCustomerNote(note)](Chat.html#addOrEditCustomerNote)

[Chat#archive()](Chat.html#archive)

[Chat#archived](Chat.html#archived)

[Chat#changeLabels(labelIds)](Chat.html#changeLabels)

[Chat#clearMessages()](Chat.html#clearMessages)

[Chat#clearState()](Chat.html#clearState)

[Chat#delete()](Chat.html#delete)

[Chat#fetchMessages(searchOptions)](Chat.html#fetchMessages)

[Chat#getContact()](Chat.html#getContact)

[Chat#getCustomerNote()](Chat.html#getCustomerNote)

[Chat#getLabels()](Chat.html#getLabels)

[Chat#getPinnedMessages()](Chat.html#getPinnedMessages)

[Chat#id](Chat.html#id)

[Chat#isGroup](Chat.html#isGroup)

[Chat#isMuted](Chat.html#isMuted)

[Chat#isReadOnly](Chat.html#isReadOnly)

[Chat#lastMessage](Chat.html#lastMessage)

[Chat#markUnread()](Chat.html#markUnread)

[Chat#mute(unmuteDate)](Chat.html#mute)

[Chat#muteExpiration](Chat.html#muteExpiration)

[Chat#name](Chat.html#name)

[Chat#pin()](Chat.html#pin)

[Chat#pinned](Chat.html#pinned)

[Chat#sendMessage(content\[, options\])](Chat.html#sendMessage)

[Chat#sendSeen()](Chat.html#sendSeen)

[Chat#sendStateRecording()](Chat.html#sendStateRecording)

[Chat#sendStateTyping()](Chat.html#sendStateTyping)

[Chat#syncHistory()](Chat.html#syncHistory)

[Chat#timestamp](Chat.html#timestamp)

[Chat#unarchive()](Chat.html#unarchive)

[Chat#unmute()](Chat.html#unmute)

[Chat#unpin()](Chat.html#unpin)

[Chat#unreadCount](Chat.html#unreadCount)

## ChatTypes

[ChatTypes.GROUP](global.html#ChatTypes#.GROUP)

[ChatTypes.SOLO](global.html#ChatTypes#.SOLO)

[ChatTypes.UNKNOWN](global.html#ChatTypes#.UNKNOWN)

## Client

[Client(options)](Client.html)

[Client#\_muteUnmuteChat(chatId, action, unmuteDateTs)](Client.html#_muteUnmuteChat)

[Client#acceptChannelAdminInvite(channelId)](Client.html#acceptChannelAdminInvite)

[Client#acceptGroupV4Invite(inviteInfo)](Client.html#acceptGroupV4Invite)

[Client#acceptInvite(inviteCode)](Client.html#acceptInvite)

[Client#addOrEditCustomerNote(userId, note)](Client.html#addOrEditCustomerNote)

[Client#addOrRemoveLabels(labelIds, chatIds)](Client.html#addOrRemoveLabels)

[Client#approveGroupMembershipRequests(groupId, options)](Client.html#approveGroupMembershipRequests)

[Client#archiveChat()](Client.html#archiveChat)

[Client#attachEventListeners()](Client.html#attachEventListeners)

[Client#createCallLink(startTime, callType)](Client.html#createCallLink)

[Client#createChannel(title, options)](Client.html#createChannel)

[Client#createGroup(title, participants, options)](Client.html#createGroup)

[Client#deleteAddressbookContact(phoneNumber)](Client.html#deleteAddressbookContact)

[Client#deleteChannel(channelId)](Client.html#deleteChannel)

[Client#deleteProfilePicture()](Client.html#deleteProfilePicture)

[Client#demoteChannelAdmin(channelId, userId)](Client.html#demoteChannelAdmin)

[Client#destroy()](Client.html#destroy)

[Client#event:auth\_failure](Client.html#event:auth_failure)

[Client#event:authenticated](Client.html#event:authenticated)

[Client#event:change\_battery](Client.html#event:change_battery)

[Client#event:change\_state](Client.html#event:change_state)

[Client#event:chat\_archived](Client.html#event:chat_archived)

[Client#event:chat\_removed](Client.html#event:chat_removed)

[Client#event:code](Client.html#event:code)

[Client#event:contact\_changed](Client.html#event:contact_changed)

[Client#event:disconnected](Client.html#event:disconnected)

[Client#event:group\_admin\_changed](Client.html#event:group_admin_changed)

[Client#event:group\_join](Client.html#event:group_join)

[Client#event:group\_leave](Client.html#event:group_leave)

[Client#event:group\_membership\_request](Client.html#event:group_membership_request)

[Client#event:group\_update](Client.html#event:group_update)

[Client#event:incoming\_call](Client.html#event:incoming_call)

[Client#event:media\_uploaded](Client.html#event:media_uploaded)

[Client#event:message](Client.html#event:message)

[Client#event:message\_ack](Client.html#event:message_ack)

[Client#event:message\_ciphertext](Client.html#event:message_ciphertext)

[Client#event:message\_create](Client.html#event:message_create)

[Client#event:message\_edit](Client.html#event:message_edit)

[Client#event:message\_reaction](Client.html#event:message_reaction)

[Client#event:message\_revoke\_everyone](Client.html#event:message_revoke_everyone)

[Client#event:message\_revoke\_me](Client.html#event:message_revoke_me)

[Client#event:qr](Client.html#event:qr)

[Client#event:ready](Client.html#event:ready)

[Client#event:vote\_update](Client.html#event:vote_update)

[Client#getBlockedContacts()](Client.html#getBlockedContacts)

[Client#getBroadcastById(contactId)](Client.html#getBroadcastById)

[Client#getBroadcasts()](Client.html#getBroadcasts)

[Client#getChannelByInviteCode(inviteCode)](Client.html#getChannelByInviteCode)

[Client#getChannels()](Client.html#getChannels)

[Client#getChatById(chatId)](Client.html#getChatById)

[Client#getChatLabels(chatId)](Client.html#getChatLabels)

[Client#getChats()](Client.html#getChats)

[Client#getChatsByLabelId(labelId)](Client.html#getChatsByLabelId)

[Client#getCommonGroups(contactId)](Client.html#getCommonGroups)

[Client#getContactById(contactId)](Client.html#getContactById)

[Client#getContactDeviceCount(userId)](Client.html#getContactDeviceCount)

[Client#getContactLidAndPhone(userIds)](Client.html#getContactLidAndPhone)

[Client#getContacts()](Client.html#getContacts)

[Client#getCountryCode(number)](Client.html#getCountryCode)

[Client#getCustomerNote(userId)](Client.html#getCustomerNote)

[Client#getFormattedNumber(number)](Client.html#getFormattedNumber)

[Client#getGroupMembershipRequests(groupId)](Client.html#getGroupMembershipRequests)

[Client#getInviteInfo(inviteCode)](Client.html#getInviteInfo)

[Client#getLabelById(labelId)](Client.html#getLabelById)

[Client#getLabels()](Client.html#getLabels)

[Client#getMessageById(messageId)](Client.html#getMessageById)

[Client#getNumberId(number)](Client.html#getNumberId)

[Client#getPinnedMessages(chatId)](Client.html#getPinnedMessages)

[Client#getPollVotes(messageId)](Client.html#getPollVotes)

[Client#getProfilePicUrl(contactId)](Client.html#getProfilePicUrl)

[Client#getState()](Client.html#getState)

[Client#getWWebVersion()](Client.html#getWWebVersion)

[Client#info](Client.html#info)

[Client#initialize()](Client.html#initialize)

[Client#inject()](Client.html#inject)

[Client#isRegisteredUser(id)](Client.html#isRegisteredUser)

[Client#logout()](Client.html#logout)

[Client#markChatUnread(chatId)](Client.html#markChatUnread)

[Client#muteChat(chatId, unmuteDate)](Client.html#muteChat)

[Client#pinChat()](Client.html#pinChat)

[Client#pupBrowser](Client.html#pupBrowser)

[Client#pupPage](Client.html#pupPage)

[Client#rejectGroupMembershipRequests(groupId, options)](Client.html#rejectGroupMembershipRequests)

[Client#requestPairingCode(phoneNumber\[, showNotification\]\[, intervalMs\])](Client.html#requestPairingCode)

[Client#resetState()](Client.html#resetState)

[Client#revokeChannelAdminInvite(channelId, userId)](Client.html#revokeChannelAdminInvite)

[Client#revokeStatusMessage(messageId)](Client.html#revokeStatusMessage)

[Client#saveOrEditAddressbookContact(phoneNumber, firstName, lastName\[, syncToAddressbook\])](Client.html#saveOrEditAddressbookContact)

[Client#searchChannels(searchOptions)](Client.html#searchChannels)

[Client#searchMessages(query\[, options\])](Client.html#searchMessages)

[Client#sendChannelAdminInvite(chatId, channelId, options)](Client.html#sendChannelAdminInvite)

[Client#sendMessage(chatId, content\[, options\])](Client.html#sendMessage)

[Client#sendPresenceAvailable()](Client.html#sendPresenceAvailable)

[Client#sendPresenceUnavailable()](Client.html#sendPresenceUnavailable)

[Client#sendResponseToScheduledEvent(response, eventMessageId)](Client.html#sendResponseToScheduledEvent)

[Client#sendSeen(chatId)](Client.html#sendSeen)

[Client#setAutoDownloadAudio(flag)](Client.html#setAutoDownloadAudio)

[Client#setAutoDownloadDocuments(flag)](Client.html#setAutoDownloadDocuments)

[Client#setAutoDownloadPhotos(flag)](Client.html#setAutoDownloadPhotos)

[Client#setAutoDownloadVideos(flag)](Client.html#setAutoDownloadVideos)

[Client#setBackgroundSync(flag)](Client.html#setBackgroundSync)

[Client#setDisplayName(displayName)](Client.html#setDisplayName)

[Client#setProfilePicture(media)](Client.html#setProfilePicture)

[Client#setStatus(status)](Client.html#setStatus)

[Client#subscribeToChannel(channelId)](Client.html#subscribeToChannel)

[Client#syncHistory(chatId)](Client.html#syncHistory)

[Client#transferChannelOwnership(channelId, newOwnerId, options)](Client.html#transferChannelOwnership)

[Client#unarchiveChat()](Client.html#unarchiveChat)

[Client#unmuteChat(chatId)](Client.html#unmuteChat)

[Client#unpinChat()](Client.html#unpinChat)

[Client#unsubscribeFromChannel(channelId, options)](Client.html#unsubscribeFromChannel)

## ClientInfo

[ClientInfo()](ClientInfo.html)

[ClientInfo#getBatteryStatus()](ClientInfo.html#getBatteryStatus)

[ClientInfo#me](ClientInfo.html#me)

[ClientInfo#phone](ClientInfo.html#phone)

[ClientInfo#platform](ClientInfo.html#platform)

[ClientInfo#pushname](ClientInfo.html#pushname)

[ClientInfo#wid](ClientInfo.html#wid)

## Contact

[Contact()](Contact.html)

[Contact#block()](Contact.html#block)

[Contact#getAbout()](Contact.html#getAbout)

[Contact#getBroadcast()](Contact.html#getBroadcast)

[Contact#getChat()](Contact.html#getChat)

[Contact#getCommonGroups()](Contact.html#getCommonGroups)

[Contact#getCountryCode()](Contact.html#getCountryCode)

[Contact#getFormattedNumber()](Contact.html#getFormattedNumber)

[Contact#getProfilePicUrl()](Contact.html#getProfilePicUrl)

[Contact#id](Contact.html#id)

[Contact#isBlocked](Contact.html#isBlocked)

[Contact#isBusiness](Contact.html#isBusiness)

[Contact#isEnterprise](Contact.html#isEnterprise)

[Contact#isGroup](Contact.html#isGroup)

[Contact#isMe](Contact.html#isMe)

[Contact#isMyContact](Contact.html#isMyContact)

[Contact#isUser](Contact.html#isUser)

[Contact#isWAContact](Contact.html#isWAContact)

[Contact#name](Contact.html#name)

[Contact#number](Contact.html#number)

[Contact#pushname](Contact.html#pushname)

[Contact#shortName](Contact.html#shortName)

[Contact#unblock()](Contact.html#unblock)

## Events

[Events.AUTHENTICATED](global.html#Events#.AUTHENTICATED)

[Events.AUTHENTICATION\_FAILURE](global.html#Events#.AUTHENTICATION_FAILURE)

[Events.BATTERY\_CHANGED](global.html#Events#.BATTERY_CHANGED)

[Events.CHAT\_ARCHIVED](global.html#Events#.CHAT_ARCHIVED)

[Events.CHAT\_REMOVED](global.html#Events#.CHAT_REMOVED)

[Events.CODE\_RECEIVED](global.html#Events#.CODE_RECEIVED)

[Events.CONTACT\_CHANGED](global.html#Events#.CONTACT_CHANGED)

[Events.DISCONNECTED](global.html#Events#.DISCONNECTED)

[Events.GROUP\_ADMIN\_CHANGED](global.html#Events#.GROUP_ADMIN_CHANGED)

[Events.GROUP\_JOIN](global.html#Events#.GROUP_JOIN)

[Events.GROUP\_LEAVE](global.html#Events#.GROUP_LEAVE)

[Events.GROUP\_MEMBERSHIP\_REQUEST](global.html#Events#.GROUP_MEMBERSHIP_REQUEST)

[Events.GROUP\_UPDATE](global.html#Events#.GROUP_UPDATE)

[Events.INCOMING\_CALL](global.html#Events#.INCOMING_CALL)

[Events.LOADING\_SCREEN](global.html#Events#.LOADING_SCREEN)

[Events.MEDIA\_UPLOADED](global.html#Events#.MEDIA_UPLOADED)

[Events.MESSAGE\_ACK](global.html#Events#.MESSAGE_ACK)

[Events.MESSAGE\_CIPHERTEXT](global.html#Events#.MESSAGE_CIPHERTEXT)

[Events.MESSAGE\_CREATE](global.html#Events#.MESSAGE_CREATE)

[Events.MESSAGE\_EDIT](global.html#Events#.MESSAGE_EDIT)

[Events.MESSAGE\_REACTION](global.html#Events#.MESSAGE_REACTION)

[Events.MESSAGE\_RECEIVED](global.html#Events#.MESSAGE_RECEIVED)

[Events.MESSAGE\_REVOKED\_EVERYONE](global.html#Events#.MESSAGE_REVOKED_EVERYONE)

[Events.MESSAGE\_REVOKED\_ME](global.html#Events#.MESSAGE_REVOKED_ME)

[Events.QR\_RECEIVED](global.html#Events#.QR_RECEIVED)

[Events.READY](global.html#Events#.READY)

[Events.REMOTE\_SESSION\_SAVED](global.html#Events#.REMOTE_SESSION_SAVED)

[Events.STATE\_CHANGED](global.html#Events#.STATE_CHANGED)

[Events.UNREAD\_COUNT](global.html#Events#.UNREAD_COUNT)

[Events.VOTE\_UPDATE](global.html#Events#.VOTE_UPDATE)

## GroupChat

[GroupChat()](GroupChat.html)

[GroupChat#addOrEditCustomerNote(note)](GroupChat.html#addOrEditCustomerNote)

[GroupChat#addParticipants(participantIds, options)](GroupChat.html#addParticipants)

[GroupChat#approveGroupMembershipRequests(options)](GroupChat.html#approveGroupMembershipRequests)

[GroupChat#archive()](GroupChat.html#archive)

[GroupChat#archived](GroupChat.html#archived)

[GroupChat#changeLabels(labelIds)](GroupChat.html#changeLabels)

[GroupChat#clearMessages()](GroupChat.html#clearMessages)

[GroupChat#clearState()](GroupChat.html#clearState)

[GroupChat#createdAt](GroupChat.html#createdAt)

[GroupChat#delete()](GroupChat.html#delete)

[GroupChat#deletePicture()](GroupChat.html#deletePicture)

[GroupChat#demoteParticipants(participantIds)](GroupChat.html#demoteParticipants)

[GroupChat#description](GroupChat.html#description)

[GroupChat#fetchMessages(searchOptions)](GroupChat.html#fetchMessages)

[GroupChat#getContact()](GroupChat.html#getContact)

[GroupChat#getCustomerNote()](GroupChat.html#getCustomerNote)

[GroupChat#getGroupMembershipRequests()](GroupChat.html#getGroupMembershipRequests)

[GroupChat#getInviteCode()](GroupChat.html#getInviteCode)

[GroupChat#getLabels()](GroupChat.html#getLabels)

[GroupChat#getPinnedMessages()](GroupChat.html#getPinnedMessages)

[GroupChat#id](GroupChat.html#id)

[GroupChat#isGroup](GroupChat.html#isGroup)

[GroupChat#isMuted](GroupChat.html#isMuted)

[GroupChat#isReadOnly](GroupChat.html#isReadOnly)

[GroupChat#lastMessage](GroupChat.html#lastMessage)

[GroupChat#leave()](GroupChat.html#leave)

[GroupChat#markUnread()](GroupChat.html#markUnread)

[GroupChat#mute(unmuteDate)](GroupChat.html#mute)

[GroupChat#muteExpiration](GroupChat.html#muteExpiration)

[GroupChat#name](GroupChat.html#name)

[GroupChat#owner](GroupChat.html#owner)

[GroupChat#participants](GroupChat.html#participants)

[GroupChat#pin()](GroupChat.html#pin)

[GroupChat#pinned](GroupChat.html#pinned)

[GroupChat#promoteParticipants(participantIds)](GroupChat.html#promoteParticipants)

[GroupChat#rejectGroupMembershipRequests(options)](GroupChat.html#rejectGroupMembershipRequests)

[GroupChat#removeParticipants(participantIds)](GroupChat.html#removeParticipants)

[GroupChat#revokeInvite()](GroupChat.html#revokeInvite)

[GroupChat#sendMessage(content\[, options\])](GroupChat.html#sendMessage)

[GroupChat#sendSeen()](GroupChat.html#sendSeen)

[GroupChat#sendStateRecording()](GroupChat.html#sendStateRecording)

[GroupChat#sendStateTyping()](GroupChat.html#sendStateTyping)

[GroupChat#setAddMembersAdminsOnly(\[adminsOnly\])](GroupChat.html#setAddMembersAdminsOnly)

[GroupChat#setDescription(description)](GroupChat.html#setDescription)

[GroupChat#setInfoAdminsOnly(\[adminsOnly\])](GroupChat.html#setInfoAdminsOnly)

[GroupChat#setMessagesAdminsOnly(\[adminsOnly\])](GroupChat.html#setMessagesAdminsOnly)

[GroupChat#setPicture(media)](GroupChat.html#setPicture)

[GroupChat#setSubject(subject)](GroupChat.html#setSubject)

[GroupChat#syncHistory()](GroupChat.html#syncHistory)

[GroupChat#timestamp](GroupChat.html#timestamp)

[GroupChat#unarchive()](GroupChat.html#unarchive)

[GroupChat#unmute()](GroupChat.html#unmute)

[GroupChat#unpin()](GroupChat.html#unpin)

[GroupChat#unreadCount](GroupChat.html#unreadCount)

## GroupNotification

[GroupNotification()](GroupNotification.html)

[GroupNotification#author](GroupNotification.html#author)

[GroupNotification#body](GroupNotification.html#body)

[GroupNotification#chatId](GroupNotification.html#chatId)

[GroupNotification#getChat()](GroupNotification.html#getChat)

[GroupNotification#getContact()](GroupNotification.html#getContact)

[GroupNotification#getRecipients()](GroupNotification.html#getRecipients)

[GroupNotification#id](GroupNotification.html#id)

[GroupNotification#recipientIds](GroupNotification.html#recipientIds)

[GroupNotification#reply(content, options)](GroupNotification.html#reply)

[GroupNotification#timestamp](GroupNotification.html#timestamp)

[GroupNotification#type](GroupNotification.html#type)

## GroupNotificationTypes

[GroupNotificationTypes.ADD](global.html#GroupNotificationTypes#.ADD)

[GroupNotificationTypes.ANNOUNCE](global.html#GroupNotificationTypes#.ANNOUNCE)

[GroupNotificationTypes.DEMOTE](global.html#GroupNotificationTypes#.DEMOTE)

[GroupNotificationTypes.DESCRIPTION](global.html#GroupNotificationTypes#.DESCRIPTION)

[GroupNotificationTypes.INVITE](global.html#GroupNotificationTypes#.INVITE)

[GroupNotificationTypes.LEAVE](global.html#GroupNotificationTypes#.LEAVE)

[GroupNotificationTypes.PICTURE](global.html#GroupNotificationTypes#.PICTURE)

[GroupNotificationTypes.PROMOTE](global.html#GroupNotificationTypes#.PROMOTE)

[GroupNotificationTypes.REMOVE](global.html#GroupNotificationTypes#.REMOVE)

[GroupNotificationTypes.RESTRICT](global.html#GroupNotificationTypes#.RESTRICT)

[GroupNotificationTypes.SUBJECT](global.html#GroupNotificationTypes#.SUBJECT)

## InterfaceController

[InterfaceController()](InterfaceController.html)

[InterfaceController#checkFeatureStatus(feature)](InterfaceController.html#checkFeatureStatus)

[InterfaceController#closeRightDrawer()](InterfaceController.html#closeRightDrawer)

[InterfaceController#disableFeatures(features)](InterfaceController.html#disableFeatures)

[InterfaceController#enableFeatures(features)](InterfaceController.html#enableFeatures)

[InterfaceController#getFeatures()](InterfaceController.html#getFeatures)

[InterfaceController#openChatDrawer(chatId)](InterfaceController.html#openChatDrawer)

[InterfaceController#openChatSearch(chatId)](InterfaceController.html#openChatSearch)

[InterfaceController#openChatWindow(chatId)](InterfaceController.html#openChatWindow)

[InterfaceController#openChatWindowAt(msgId)](InterfaceController.html#openChatWindowAt)

[InterfaceController#openMessageDrawer(msgId)](InterfaceController.html#openMessageDrawer)

## Label

[Label(client, labelData)](Label.html)

[Label#getChats()](Label.html#getChats)

[Label#hexColor](Label.html#hexColor)

[Label#id](Label.html#id)

[Label#name](Label.html#name)

## List

[List(body, buttonText, sections, title, footer)](List.html)

[List#\_format(sections)](List.html#_format)

[List#buttonText](List.html#buttonText)

[List#description](List.html#description)

[List#footer](List.html#footer)

[List#sections](List.html#sections)

[List#title](List.html#title)

## LocalAuth

[LocalAuth(options)](LocalAuth.html)

## LocalWebCache

[LocalWebCache(options)](LocalWebCache.html)

## Location

[Location(latitude, longitude\[, options\])](Location.html)

[Location#address](Location.html#address)

[Location#description](Location.html#description)

[Location#latitude](Location.html#latitude)

[Location#longitude](Location.html#longitude)

[Location#name](Location.html#name)

[Location#url](Location.html#url)

## Message

[Message()](Message.html)

[Message#acceptGroupV4Invite()](Message.html#acceptGroupV4Invite)

[Message#ack](Message.html#ack)

[Message#author](Message.html#author)

[Message#body](Message.html#body)

[Message#broadcast](Message.html#broadcast)

[Message#delete(everyone\[, clearMedia\])](Message.html#delete)

[Message#deviceType](Message.html#deviceType)

[Message#downloadMedia()](Message.html#downloadMedia)

[Message#duration](Message.html#duration)

[Message#edit(content\[, options\])](Message.html#edit)

[Message#editScheduledEvent(editedEventObject)](Message.html#editScheduledEvent)

[Message#forward(chat)](Message.html#forward)

[Message#forwardingScore](Message.html#forwardingScore)

[Message#from](Message.html#from)

[Message#fromMe](Message.html#fromMe)

[Message#getChat()](Message.html#getChat)

[Message#getContact()](Message.html#getContact)

[Message#getGroupMentions()](Message.html#getGroupMentions)

[Message#getInfo()](Message.html#getInfo)

[Message#getMentions()](Message.html#getMentions)

[Message#getOrder()](Message.html#getOrder)

[Message#getPayment()](Message.html#getPayment)

[Message#getPollVotes()](Message.html#getPollVotes)

[Message#getQuotedMessage()](Message.html#getQuotedMessage)

[Message#getReactions()](Message.html#getReactions)

[Message#groupMentions](Message.html#groupMentions)

[Message#hasMedia](Message.html#hasMedia)

[Message#hasQuotedMsg](Message.html#hasQuotedMsg)

[Message#hasReaction](Message.html#hasReaction)

[Message#id](Message.html#id)

[Message#inviteV4](Message.html#inviteV4)

[Message#isEphemeral](Message.html#isEphemeral)

[Message#isForwarded](Message.html#isForwarded)

[Message#isGif](Message.html#isGif)

[Message#isStarred](Message.html#isStarred)

[Message#isStatus](Message.html#isStatus)

[Message#links](Message.html#links)

[Message#location](Message.html#location)

[Message#mediaKey](Message.html#mediaKey)

[Message#mentionedIds](Message.html#mentionedIds)

[Message#orderId](Message.html#orderId)

[Message#pin(duration)](Message.html#pin)

[Message#rawData](Message.html#rawData)

[Message#react(reaction)](Message.html#react)

[Message#reload()](Message.html#reload)

[Message#reply(content\[, chatId\]\[, options\])](Message.html#reply)

[Message#star()](Message.html#star)

[Message#timestamp](Message.html#timestamp)

[Message#to](Message.html#to)

[Message#token](Message.html#token)

[Message#type](Message.html#type)

[Message#unpin()](Message.html#unpin)

[Message#unstar()](Message.html#unstar)

[Message#vCards](Message.html#vCards)

[Message#vote(selectedOptions)](Message.html#vote)

## MessageAck

[MessageAck.ACK\_DEVICE](global.html#MessageAck#.ACK_DEVICE)

[MessageAck.ACK\_ERROR](global.html#MessageAck#.ACK_ERROR)

[MessageAck.ACK\_PENDING](global.html#MessageAck#.ACK_PENDING)

[MessageAck.ACK\_PLAYED](global.html#MessageAck#.ACK_PLAYED)

[MessageAck.ACK\_READ](global.html#MessageAck#.ACK_READ)

[MessageAck.ACK\_SERVER](global.html#MessageAck#.ACK_SERVER)

## MessageMedia

[MessageMedia(mimetype, data, filename, filesize)](MessageMedia.html)

[MessageMedia.fromFilePath(filePath)](MessageMedia.html#.fromFilePath)

[MessageMedia.fromUrl(url\[, options\])](MessageMedia.html#.fromUrl)

[MessageMedia#data](MessageMedia.html#data)

[MessageMedia#filename](MessageMedia.html#filename)

[MessageMedia#filesize](MessageMedia.html#filesize)

[MessageMedia#mimetype](MessageMedia.html#mimetype)

## MessageTypes

[MessageTypes.ALBUM](global.html#MessageTypes#.ALBUM)

[MessageTypes.AUDIO](global.html#MessageTypes#.AUDIO)

[MessageTypes.BROADCAST\_NOTIFICATION](global.html#MessageTypes#.BROADCAST_NOTIFICATION)

[MessageTypes.BUTTONS\_RESPONSE](global.html#MessageTypes#.BUTTONS_RESPONSE)

[MessageTypes.CALL\_LOG](global.html#MessageTypes#.CALL_LOG)

[MessageTypes.CIPHERTEXT](global.html#MessageTypes#.CIPHERTEXT)

[MessageTypes.CONTACT\_CARD](global.html#MessageTypes#.CONTACT_CARD)

[MessageTypes.CONTACT\_CARD\_MULTI](global.html#MessageTypes#.CONTACT_CARD_MULTI)

[MessageTypes.DEBUG](global.html#MessageTypes#.DEBUG)

[MessageTypes.DOCUMENT](global.html#MessageTypes#.DOCUMENT)

[MessageTypes.E2E\_NOTIFICATION](global.html#MessageTypes#.E2E_NOTIFICATION)

[MessageTypes.GP2](global.html#MessageTypes#.GP2)

[MessageTypes.GROUP\_INVITE](global.html#MessageTypes#.GROUP_INVITE)

[MessageTypes.GROUP\_NOTIFICATION](global.html#MessageTypes#.GROUP_NOTIFICATION)

[MessageTypes.HSM](global.html#MessageTypes#.HSM)

[MessageTypes.IMAGE](global.html#MessageTypes#.IMAGE)

[MessageTypes.INTERACTIVE](global.html#MessageTypes#.INTERACTIVE)

[MessageTypes.LIST](global.html#MessageTypes#.LIST)

[MessageTypes.LIST\_RESPONSE](global.html#MessageTypes#.LIST_RESPONSE)

[MessageTypes.LOCATION](global.html#MessageTypes#.LOCATION)

[MessageTypes.NATIVE\_FLOW](global.html#MessageTypes#.NATIVE_FLOW)

[MessageTypes.NOTIFICATION](global.html#MessageTypes#.NOTIFICATION)

[MessageTypes.NOTIFICATION\_TEMPLATE](global.html#MessageTypes#.NOTIFICATION_TEMPLATE)

[MessageTypes.ORDER](global.html#MessageTypes#.ORDER)

[MessageTypes.OVERSIZED](global.html#MessageTypes#.OVERSIZED)

[MessageTypes.PAYMENT](global.html#MessageTypes#.PAYMENT)

[MessageTypes.POLL\_CREATION](global.html#MessageTypes#.POLL_CREATION)

[MessageTypes.PRODUCT](global.html#MessageTypes#.PRODUCT)

[MessageTypes.PROTOCOL](global.html#MessageTypes#.PROTOCOL)

[MessageTypes.REACTION](global.html#MessageTypes#.REACTION)

[MessageTypes.REVOKED](global.html#MessageTypes#.REVOKED)

[MessageTypes.SCHEDULED\_EVENT\_CREATION](global.html#MessageTypes#.SCHEDULED_EVENT_CREATION)

[MessageTypes.STICKER](global.html#MessageTypes#.STICKER)

[MessageTypes.TEMPLATE\_BUTTON\_REPLY](global.html#MessageTypes#.TEMPLATE_BUTTON_REPLY)

[MessageTypes.TEXT](global.html#MessageTypes#.TEXT)

[MessageTypes.UNKNOWN](global.html#MessageTypes#.UNKNOWN)

[MessageTypes.VIDEO](global.html#MessageTypes#.VIDEO)

[MessageTypes.VOICE](global.html#MessageTypes#.VOICE)

## NoAuth

[NoAuth()](NoAuth.html)

## Order

[Order()](Order.html)

[Order#createdAt](Order.html#createdAt)

[Order#currency](Order.html#currency)

[Order#subtotal](Order.html#subtotal)

[Order#total](Order.html#total)

## Payment

[Payment#id](Payment.html#id)

[Payment#paymentAmount1000](Payment.html#paymentAmount1000)

[Payment#paymentCurrency](Payment.html#paymentCurrency)

[Payment#paymentMessageReceiverJid](Payment.html#paymentMessageReceiverJid)

[Payment#paymentNote](Payment.html#paymentNote)

[Payment#paymentStatus](Payment.html#paymentStatus)

[Payment#paymentTransactionTimestamp](Payment.html#paymentTransactionTimestamp)

[Payment#paymentTxnStatus](Payment.html#paymentTxnStatus)

## Poll

[Poll(pollName, pollOptions, options)](Poll.html)

[Poll#options](Poll.html#options)

[Poll#pollName](Poll.html#pollName)

[Poll#pollOptions](Poll.html#pollOptions)

## PollVote

[PollVote()](PollVote.html)

[PollVote#interractedAtTs](PollVote.html#interractedAtTs)

[PollVote#parentMessage](PollVote.html#parentMessage)

[PollVote#parentMsgKey](PollVote.html#parentMsgKey)

[PollVote#voter](PollVote.html#voter)

## PrivateChat

[PrivateChat()](PrivateChat.html)

[PrivateChat#addOrEditCustomerNote(note)](PrivateChat.html#addOrEditCustomerNote)

[PrivateChat#archive()](PrivateChat.html#archive)

[PrivateChat#archived](PrivateChat.html#archived)

[PrivateChat#changeLabels(labelIds)](PrivateChat.html#changeLabels)

[PrivateChat#clearMessages()](PrivateChat.html#clearMessages)

[PrivateChat#clearState()](PrivateChat.html#clearState)

[PrivateChat#delete()](PrivateChat.html#delete)

[PrivateChat#fetchMessages(searchOptions)](PrivateChat.html#fetchMessages)

[PrivateChat#getContact()](PrivateChat.html#getContact)

[PrivateChat#getCustomerNote()](PrivateChat.html#getCustomerNote)

[PrivateChat#getLabels()](PrivateChat.html#getLabels)

[PrivateChat#getPinnedMessages()](PrivateChat.html#getPinnedMessages)

[PrivateChat#id](PrivateChat.html#id)

[PrivateChat#isGroup](PrivateChat.html#isGroup)

[PrivateChat#isMuted](PrivateChat.html#isMuted)

[PrivateChat#isReadOnly](PrivateChat.html#isReadOnly)

[PrivateChat#lastMessage](PrivateChat.html#lastMessage)

[PrivateChat#markUnread()](PrivateChat.html#markUnread)

[PrivateChat#mute(unmuteDate)](PrivateChat.html#mute)

[PrivateChat#muteExpiration](PrivateChat.html#muteExpiration)

[PrivateChat#name](PrivateChat.html#name)

[PrivateChat#pin()](PrivateChat.html#pin)

[PrivateChat#pinned](PrivateChat.html#pinned)

[PrivateChat#sendMessage(content\[, options\])](PrivateChat.html#sendMessage)

[PrivateChat#sendSeen()](PrivateChat.html#sendSeen)

[PrivateChat#sendStateRecording()](PrivateChat.html#sendStateRecording)

[PrivateChat#sendStateTyping()](PrivateChat.html#sendStateTyping)

[PrivateChat#syncHistory()](PrivateChat.html#syncHistory)

[PrivateChat#timestamp](PrivateChat.html#timestamp)

[PrivateChat#unarchive()](PrivateChat.html#unarchive)

[PrivateChat#unmute()](PrivateChat.html#unmute)

[PrivateChat#unpin()](PrivateChat.html#unpin)

[PrivateChat#unreadCount](PrivateChat.html#unreadCount)

## PrivateContact

[PrivateContact()](PrivateContact.html)

[PrivateContact#block()](PrivateContact.html#block)

[PrivateContact#getAbout()](PrivateContact.html#getAbout)

[PrivateContact#getBroadcast()](PrivateContact.html#getBroadcast)

[PrivateContact#getChat()](PrivateContact.html#getChat)

[PrivateContact#getCommonGroups()](PrivateContact.html#getCommonGroups)

[PrivateContact#getCountryCode()](PrivateContact.html#getCountryCode)

[PrivateContact#getFormattedNumber()](PrivateContact.html#getFormattedNumber)

[PrivateContact#getProfilePicUrl()](PrivateContact.html#getProfilePicUrl)

[PrivateContact#id](PrivateContact.html#id)

[PrivateContact#isBlocked](PrivateContact.html#isBlocked)

[PrivateContact#isBusiness](PrivateContact.html#isBusiness)

[PrivateContact#isEnterprise](PrivateContact.html#isEnterprise)

[PrivateContact#isGroup](PrivateContact.html#isGroup)

[PrivateContact#isMe](PrivateContact.html#isMe)

[PrivateContact#isMyContact](PrivateContact.html#isMyContact)

[PrivateContact#isUser](PrivateContact.html#isUser)

[PrivateContact#isWAContact](PrivateContact.html#isWAContact)

[PrivateContact#name](PrivateContact.html#name)

[PrivateContact#number](PrivateContact.html#number)

[PrivateContact#pushname](PrivateContact.html#pushname)

[PrivateContact#shortName](PrivateContact.html#shortName)

[PrivateContact#unblock()](PrivateContact.html#unblock)

## Product

[Product()](Product.html)

[Product#currency](Product.html#currency)

[Product#data](Product.html#data)

[Product#id](Product.html#id)

[Product#name](Product.html#name)

[Product#price](Product.html#price)

[Product#quantity](Product.html#quantity)

[Product#thumbnailUrl](Product.html#thumbnailUrl)

## ProductMetadata

[ProductMetadata#description](ProductMetadata.html#description)

[ProductMetadata#id](ProductMetadata.html#id)

[ProductMetadata#name](ProductMetadata.html#name)

[ProductMetadata#retailer\_id](ProductMetadata.html#retailer_id)

## Reaction

[Reaction()](Reaction.html)

[Reaction#ack](Reaction.html#ack)

[Reaction#id](Reaction.html#id)

[Reaction#msgId](Reaction.html#msgId)

[Reaction#orphan](Reaction.html#orphan)

[Reaction#orphanReason](Reaction.html#orphanReason)

[Reaction#reaction](Reaction.html#reaction)

[Reaction#read](Reaction.html#read)

[Reaction#senderId](Reaction.html#senderId)

[Reaction#timestamp](Reaction.html#timestamp)

## RemoteAuth

[RemoteAuth(options)](RemoteAuth.html)

## RemoteWebCache

[RemoteWebCache(options)](RemoteWebCache.html)

## ScheduledEvent

[ScheduledEvent(name, startTime, options)](ScheduledEvent.html)

[ScheduledEvent#\_validateInputs(propName, propValue)](ScheduledEvent.html#_validateInputs)

[ScheduledEvent#eventSendOptions](ScheduledEvent.html#eventSendOptions)

[ScheduledEvent#name](ScheduledEvent.html#name)

[ScheduledEvent#startTimeTs](ScheduledEvent.html#startTimeTs)

## Status

[Status.AUTHENTICATING](global.html#Status#.AUTHENTICATING)

[Status.INITIALIZING](global.html#Status#.INITIALIZING)

[Status.READY](global.html#Status#.READY)

## Util

[Util()](Util.html)

[Util.formatImageToWebpSticker(media)](Util.html#.formatImageToWebpSticker)

[Util.formatToWebpSticker(media, metadata)](Util.html#.formatToWebpSticker)

[Util.formatVideoToWebpSticker(media)](Util.html#.formatVideoToWebpSticker)

[Util.setFfmpegPath(path)](Util.html#.setFfmpegPath)

## WAState

[WAState.CONFLICT](global.html#WAState#.CONFLICT)

[WAState.CONNECTED](global.html#WAState#.CONNECTED)

[WAState.DEPRECATED\_VERSION](global.html#WAState#.DEPRECATED_VERSION)

[WAState.OPENING](global.html#WAState#.OPENING)

[WAState.PAIRING](global.html#WAState#.PAIRING)

[WAState.PROXYBLOCK](global.html#WAState#.PROXYBLOCK)

[WAState.SMB\_TOS\_BLOCK](global.html#WAState#.SMB_TOS_BLOCK)

[WAState.TIMEOUT](global.html#WAState#.TIMEOUT)

[WAState.TOS\_BLOCK](global.html#WAState#.TOS_BLOCK)

[WAState.UNLAUNCHED](global.html#WAState#.UNLAUNCHED)

[WAState.UNPAIRED](global.html#WAState#.UNPAIRED)

[WAState.UNPAIRED\_IDLE](global.html#WAState#.UNPAIRED_IDLE)

## WebCache

[WebCache()](WebCache.html)

## window

[window.compareWwebVersions(lOperand, operator, rOperand)](window.html#.compareWwebVersions)

[window.injectToFunction(target, callback)](window.html#.injectToFunction)

--- END OF FILE: index.md ---
--- START OF FILE: index.md ---

Source: https://docs.wwebjs.dev/

  

[![WWebJS Website](https://github.com/wwebjs/assets/blob/main/Collection/GitHub/wwebjs.png?raw=true "whatsapp-web.js")](https://wwebjs.dev)

  

[![npm](https://img.shields.io/npm/v/whatsapp-web.js.svg)](https://www.npmjs.com/package/whatsapp-web.js) [![Depfu](https://badges.depfu.com/badges/4a65a0de96ece65fdf39e294e0c8dcba/overview.svg)](https://depfu.com/github/pedroslopez/whatsapp-web.js?project_id=9765) ![WhatsApp_Web 2.2346.52](https://img.shields.io/badge/WhatsApp_Web-2.3000.1017054665-brightgreen.svg) [![Discord server](https://img.shields.io/discord/698610475432411196.svg?logo=discord)](https://discord.gg/H7DqQs4)

  

## About

**A WhatsApp API client that operates via the WhatsApp Web browser.**

The library launches the WhatsApp Web browser app via Puppeteer, accessing its internal functions and creating a managed instance to reduce the risk of being blocked. This gives the API client nearly all WhatsApp Web features for dynamic use in a Node.js application.

> \[!IMPORTANT\] **It is not guaranteed you will not be blocked by using this method. WhatsApp does not allow bots or unofficial clients on their platform, so this shouldn't be considered totally safe.**

## Links

*   [GitHub](https://github.com/pedroslopez/whatsapp-web.js)
*   [Guide](https://guide.wwebjs.dev/guide) ([source](https://github.com/wwebjs/wwebjs.dev/tree/main))
*   [Documentation](https://docs.wwebjs.dev/) ([source](https://github.com/pedroslopez/whatsapp-web.js/tree/main/docs))
*   [Discord Server](https://discord.gg/H7DqQs4)
*   [npm](https://npmjs.org/package/whatsapp-web.js)

## Installation

The module is available on [npm](https://npmjs.org/package/whatsapp-web.js) via `npm i whatsapp-web.js`!

> \[!NOTE\] **Node `v18` or higher, is required.**  
> See the [Guide](https://guide.wwebjs.dev/guide) for quick upgrade instructions.

## Example usage

```
const { Client } = require('whatsapp-web.js');

const client = new Client();

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    console.log('QR RECEIVED', qr);
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', msg => {
    if (msg.body == '!ping') {
        msg.reply('pong');
    }
});

client.initialize();
```

Take a look at [example.js](https://github.com/pedroslopez/whatsapp-web.js/blob/master/example.js) for another examples with additional use cases.  
For further details on saving and restoring sessions, explore the provided [Authentication Strategies](https://wwebjs.dev/guide/creating-your-bot/authentication.html).

## Supported features

Feature

Status

Multi Device

✅

Send messages

✅

Receive messages

✅

Send media (images/audio/documents)

✅

Send media (video)

✅ [(requires Google Chrome)](https://wwebjs.dev/guide/creating-your-bot/handling-attachments.html#caveat-for-sending-videos-and-gifs)

Send stickers

✅

Receive media (images/audio/video/documents)

✅

Send contact cards

✅

Send location

✅

Send buttons

❌ [(DEPRECATED)](https://www.youtube.com/watch?v=hv1R1rLeVVE)

Send lists

❌ [(DEPRECATED)](https://www.youtube.com/watch?v=hv1R1rLeVVE)

Receive location

✅

Message replies

✅

Join groups by invite

✅

Get invite for group

✅

Modify group info (subject, description)

✅

Modify group settings (send messages, edit info)

✅

Add group participants

✅

Kick group participants

✅

Promote/demote group participants

✅

Mention users

✅

Mention groups

✅

Mute/unmute chats

✅

Block/unblock contacts

✅

Get contact info

✅

Get profile pictures

✅

Set user status message

✅

React to messages

✅

Create polls

✅

Channels

✅

Vote in polls

🔜

Communities

🔜

Something missing? Make an issue and let us know!

## Contributing

Feel free to open pull requests; we welcome contributions! However, for significant changes, it's best to open an issue beforehand. Make sure to review our [contribution guidelines](https://github.com/pedroslopez/whatsapp-web.js/blob/main/CODE_OF_CONDUCT.md) before creating a pull request. Before creating your own issue or pull request, always check to see if one already exists!

## Supporting the project

You can support the maintainer of this project through the links below

*   [Support via GitHub Sponsors](https://github.com/sponsors/pedroslopez)
*   [Support via PayPal](https://www.paypal.me/psla/)
*   [Sign up for DigitalOcean](https://m.do.co/c/73f906a36ed4) and get $200 in credit when you sign up (Referral)

## Disclaimer

This project is not affiliated, associated, authorized, endorsed by, or in any way officially connected with WhatsApp or any of its subsidiaries or its affiliates. The official WhatsApp website can be found at [whatsapp.com](https://whatsapp.com). "WhatsApp" as well as related names, marks, emblems and images are registered trademarks of their respective owners. Also it is not guaranteed you will not be blocked by using this method. WhatsApp does not allow bots or unofficial clients on their platform, so this shouldn't be considered totally safe.

## License

Copyright 2019 Pedro S Lopez

Licensed under the Apache License, Version 2.0 (the "License");  
you may not use this project except in compliance with the License.  
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.

Unless required by applicable law or agreed to in writing, software  
distributed under the License is distributed on an "AS IS" BASIS,  
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  
See the License for the specific language governing permissions and  
limitations under the License.

## Base

[Base()](Base.html)

## BaseAuthStrategy

[BaseAuthStrategy()](BaseAuthStrategy.html)

## Broadcast

[Broadcast()](Broadcast.html)

[Broadcast#getChat()](Broadcast.html#getChat)

[Broadcast#getContact()](Broadcast.html#getContact)

[Broadcast#id](Broadcast.html#id)

[Broadcast#msgs](Broadcast.html#msgs)

[Broadcast#timestamp](Broadcast.html#timestamp)

[Broadcast#totalCount](Broadcast.html#totalCount)

[Broadcast#unreadCount](Broadcast.html#unreadCount)

## BusinessContact

[BusinessContact()](BusinessContact.html)

[BusinessContact#block()](BusinessContact.html#block)

[BusinessContact#businessProfile](BusinessContact.html#businessProfile)

[BusinessContact#getAbout()](BusinessContact.html#getAbout)

[BusinessContact#getBroadcast()](BusinessContact.html#getBroadcast)

[BusinessContact#getChat()](BusinessContact.html#getChat)

[BusinessContact#getCommonGroups()](BusinessContact.html#getCommonGroups)

[BusinessContact#getCountryCode()](BusinessContact.html#getCountryCode)

[BusinessContact#getFormattedNumber()](BusinessContact.html#getFormattedNumber)

[BusinessContact#getProfilePicUrl()](BusinessContact.html#getProfilePicUrl)

[BusinessContact#id](BusinessContact.html#id)

[BusinessContact#isBlocked](BusinessContact.html#isBlocked)

[BusinessContact#isBusiness](BusinessContact.html#isBusiness)

[BusinessContact#isEnterprise](BusinessContact.html#isEnterprise)

[BusinessContact#isGroup](BusinessContact.html#isGroup)

[BusinessContact#isMe](BusinessContact.html#isMe)

[BusinessContact#isMyContact](BusinessContact.html#isMyContact)

[BusinessContact#isUser](BusinessContact.html#isUser)

[BusinessContact#isWAContact](BusinessContact.html#isWAContact)

[BusinessContact#name](BusinessContact.html#name)

[BusinessContact#number](BusinessContact.html#number)

[BusinessContact#pushname](BusinessContact.html#pushname)

[BusinessContact#shortName](BusinessContact.html#shortName)

[BusinessContact#unblock()](BusinessContact.html#unblock)

## Buttons

[Buttons(body, buttons, title, footer)](Buttons.html)

[Buttons#\_format(buttons)](Buttons.html#_format)

[Buttons#body](Buttons.html#body)

[Buttons#buttons](Buttons.html#buttons)

[Buttons#footer](Buttons.html#footer)

[Buttons#title](Buttons.html#title)

## Call

[Call()](Call.html)

[Call#canHandleLocally](Call.html#canHandleLocally)

[Call#from](Call.html#from)

[Call#fromMe](Call.html#fromMe)

[Call#id](Call.html#id)

[Call#isGroup](Call.html#isGroup)

[Call#isVideo](Call.html#isVideo)

[Call#participants](Call.html#participants)

[Call#reject()](Call.html#reject)

[Call#timestamp](Call.html#timestamp)

[Call#webClientShouldHandle](Call.html#webClientShouldHandle)

## Channel

[Channel()](Channel.html)

[Channel#\_muteUnmuteChannel(action)](Channel.html#_muteUnmuteChannel)

[Channel#\_setChannelMetadata(value, property)](Channel.html#_setChannelMetadata)

[Channel#acceptChannelAdminInvite()](Channel.html#acceptChannelAdminInvite)

[Channel#deleteChannel()](Channel.html#deleteChannel)

[Channel#demoteChannelAdmin(userId)](Channel.html#demoteChannelAdmin)

[Channel#description](Channel.html#description)

[Channel#fetchMessages(searchOptions)](Channel.html#fetchMessages)

[Channel#getSubscribers(limit)](Channel.html#getSubscribers)

[Channel#id](Channel.html#id)

[Channel#isChannel](Channel.html#isChannel)

[Channel#isGroup](Channel.html#isGroup)

[Channel#isMuted](Channel.html#isMuted)

[Channel#isReadOnly](Channel.html#isReadOnly)

[Channel#lastMessage](Channel.html#lastMessage)

[Channel#mute()](Channel.html#mute)

[Channel#muteExpiration](Channel.html#muteExpiration)

[Channel#name](Channel.html#name)

[Channel#revokeChannelAdminInvite(userId)](Channel.html#revokeChannelAdminInvite)

[Channel#sendChannelAdminInvite(chatId, options)](Channel.html#sendChannelAdminInvite)

[Channel#sendMessage(content, options)](Channel.html#sendMessage)

[Channel#sendSeen()](Channel.html#sendSeen)

[Channel#setDescription(newDescription)](Channel.html#setDescription)

[Channel#setProfilePicture(newProfilePicture)](Channel.html#setProfilePicture)

[Channel#setReactionSetting(reactionCode)](Channel.html#setReactionSetting)

[Channel#setSubject(newSubject)](Channel.html#setSubject)

[Channel#timestamp](Channel.html#timestamp)

[Channel#transferChannelOwnership(newOwnerId, options)](Channel.html#transferChannelOwnership)

[Channel#unmute()](Channel.html#unmute)

[Channel#unreadCount](Channel.html#unreadCount)

## Chat

[Chat()](Chat.html)

[Chat#addOrEditCustomerNote(note)](Chat.html#addOrEditCustomerNote)

[Chat#archive()](Chat.html#archive)

[Chat#archived](Chat.html#archived)

[Chat#changeLabels(labelIds)](Chat.html#changeLabels)

[Chat#clearMessages()](Chat.html#clearMessages)

[Chat#clearState()](Chat.html#clearState)

[Chat#delete()](Chat.html#delete)

[Chat#fetchMessages(searchOptions)](Chat.html#fetchMessages)

[Chat#getContact()](Chat.html#getContact)

[Chat#getCustomerNote()](Chat.html#getCustomerNote)

[Chat#getLabels()](Chat.html#getLabels)

[Chat#getPinnedMessages()](Chat.html#getPinnedMessages)

[Chat#id](Chat.html#id)

[Chat#isGroup](Chat.html#isGroup)

[Chat#isMuted](Chat.html#isMuted)

[Chat#isReadOnly](Chat.html#isReadOnly)

[Chat#lastMessage](Chat.html#lastMessage)

[Chat#markUnread()](Chat.html#markUnread)

[Chat#mute(unmuteDate)](Chat.html#mute)

[Chat#muteExpiration](Chat.html#muteExpiration)

[Chat#name](Chat.html#name)

[Chat#pin()](Chat.html#pin)

[Chat#pinned](Chat.html#pinned)

[Chat#sendMessage(content\[, options\])](Chat.html#sendMessage)

[Chat#sendSeen()](Chat.html#sendSeen)

[Chat#sendStateRecording()](Chat.html#sendStateRecording)

[Chat#sendStateTyping()](Chat.html#sendStateTyping)

[Chat#syncHistory()](Chat.html#syncHistory)

[Chat#timestamp](Chat.html#timestamp)

[Chat#unarchive()](Chat.html#unarchive)

[Chat#unmute()](Chat.html#unmute)

[Chat#unpin()](Chat.html#unpin)

[Chat#unreadCount](Chat.html#unreadCount)

## ChatTypes

[ChatTypes.GROUP](global.html#ChatTypes#.GROUP)

[ChatTypes.SOLO](global.html#ChatTypes#.SOLO)

[ChatTypes.UNKNOWN](global.html#ChatTypes#.UNKNOWN)

## Client

[Client(options)](Client.html)

[Client#\_muteUnmuteChat(chatId, action, unmuteDateTs)](Client.html#_muteUnmuteChat)

[Client#acceptChannelAdminInvite(channelId)](Client.html#acceptChannelAdminInvite)

[Client#acceptGroupV4Invite(inviteInfo)](Client.html#acceptGroupV4Invite)

[Client#acceptInvite(inviteCode)](Client.html#acceptInvite)

[Client#addOrEditCustomerNote(userId, note)](Client.html#addOrEditCustomerNote)

[Client#addOrRemoveLabels(labelIds, chatIds)](Client.html#addOrRemoveLabels)

[Client#approveGroupMembershipRequests(groupId, options)](Client.html#approveGroupMembershipRequests)

[Client#archiveChat()](Client.html#archiveChat)

[Client#attachEventListeners()](Client.html#attachEventListeners)

[Client#createCallLink(startTime, callType)](Client.html#createCallLink)

[Client#createChannel(title, options)](Client.html#createChannel)

[Client#createGroup(title, participants, options)](Client.html#createGroup)

[Client#deleteAddressbookContact(phoneNumber)](Client.html#deleteAddressbookContact)

[Client#deleteChannel(channelId)](Client.html#deleteChannel)

[Client#deleteProfilePicture()](Client.html#deleteProfilePicture)

[Client#demoteChannelAdmin(channelId, userId)](Client.html#demoteChannelAdmin)

[Client#destroy()](Client.html#destroy)

[Client#event:auth\_failure](Client.html#event:auth_failure)

[Client#event:authenticated](Client.html#event:authenticated)

[Client#event:change\_battery](Client.html#event:change_battery)

[Client#event:change\_state](Client.html#event:change_state)

[Client#event:chat\_archived](Client.html#event:chat_archived)

[Client#event:chat\_removed](Client.html#event:chat_removed)

[Client#event:code](Client.html#event:code)

[Client#event:contact\_changed](Client.html#event:contact_changed)

[Client#event:disconnected](Client.html#event:disconnected)

[Client#event:group\_admin\_changed](Client.html#event:group_admin_changed)

[Client#event:group\_join](Client.html#event:group_join)

[Client#event:group\_leave](Client.html#event:group_leave)

[Client#event:group\_membership\_request](Client.html#event:group_membership_request)

[Client#event:group\_update](Client.html#event:group_update)

[Client#event:incoming\_call](Client.html#event:incoming_call)

[Client#event:media\_uploaded](Client.html#event:media_uploaded)

[Client#event:message](Client.html#event:message)

[Client#event:message\_ack](Client.html#event:message_ack)

[Client#event:message\_ciphertext](Client.html#event:message_ciphertext)

[Client#event:message\_create](Client.html#event:message_create)

[Client#event:message\_edit](Client.html#event:message_edit)

[Client#event:message\_reaction](Client.html#event:message_reaction)

[Client#event:message\_revoke\_everyone](Client.html#event:message_revoke_everyone)

[Client#event:message\_revoke\_me](Client.html#event:message_revoke_me)

[Client#event:qr](Client.html#event:qr)

[Client#event:ready](Client.html#event:ready)

[Client#event:vote\_update](Client.html#event:vote_update)

[Client#getBlockedContacts()](Client.html#getBlockedContacts)

[Client#getBroadcastById(contactId)](Client.html#getBroadcastById)

[Client#getBroadcasts()](Client.html#getBroadcasts)

[Client#getChannelByInviteCode(inviteCode)](Client.html#getChannelByInviteCode)

[Client#getChannels()](Client.html#getChannels)

[Client#getChatById(chatId)](Client.html#getChatById)

[Client#getChatLabels(chatId)](Client.html#getChatLabels)

[Client#getChats()](Client.html#getChats)

[Client#getChatsByLabelId(labelId)](Client.html#getChatsByLabelId)

[Client#getCommonGroups(contactId)](Client.html#getCommonGroups)

[Client#getContactById(contactId)](Client.html#getContactById)

[Client#getContactDeviceCount(userId)](Client.html#getContactDeviceCount)

[Client#getContactLidAndPhone(userIds)](Client.html#getContactLidAndPhone)

[Client#getContacts()](Client.html#getContacts)

[Client#getCountryCode(number)](Client.html#getCountryCode)

[Client#getCustomerNote(userId)](Client.html#getCustomerNote)

[Client#getFormattedNumber(number)](Client.html#getFormattedNumber)

[Client#getGroupMembershipRequests(groupId)](Client.html#getGroupMembershipRequests)

[Client#getInviteInfo(inviteCode)](Client.html#getInviteInfo)

[Client#getLabelById(labelId)](Client.html#getLabelById)

[Client#getLabels()](Client.html#getLabels)

[Client#getMessageById(messageId)](Client.html#getMessageById)

[Client#getNumberId(number)](Client.html#getNumberId)

[Client#getPinnedMessages(chatId)](Client.html#getPinnedMessages)

[Client#getPollVotes(messageId)](Client.html#getPollVotes)

[Client#getProfilePicUrl(contactId)](Client.html#getProfilePicUrl)

[Client#getState()](Client.html#getState)

[Client#getWWebVersion()](Client.html#getWWebVersion)

[Client#info](Client.html#info)

[Client#initialize()](Client.html#initialize)

[Client#inject()](Client.html#inject)

[Client#isRegisteredUser(id)](Client.html#isRegisteredUser)

[Client#logout()](Client.html#logout)

[Client#markChatUnread(chatId)](Client.html#markChatUnread)

[Client#muteChat(chatId, unmuteDate)](Client.html#muteChat)

[Client#pinChat()](Client.html#pinChat)

[Client#pupBrowser](Client.html#pupBrowser)

[Client#pupPage](Client.html#pupPage)

[Client#rejectGroupMembershipRequests(groupId, options)](Client.html#rejectGroupMembershipRequests)

[Client#requestPairingCode(phoneNumber\[, showNotification\]\[, intervalMs\])](Client.html#requestPairingCode)

[Client#resetState()](Client.html#resetState)

[Client#revokeChannelAdminInvite(channelId, userId)](Client.html#revokeChannelAdminInvite)

[Client#revokeStatusMessage(messageId)](Client.html#revokeStatusMessage)

[Client#saveOrEditAddressbookContact(phoneNumber, firstName, lastName\[, syncToAddressbook\])](Client.html#saveOrEditAddressbookContact)

[Client#searchChannels(searchOptions)](Client.html#searchChannels)

[Client#searchMessages(query\[, options\])](Client.html#searchMessages)

[Client#sendChannelAdminInvite(chatId, channelId, options)](Client.html#sendChannelAdminInvite)

[Client#sendMessage(chatId, content\[, options\])](Client.html#sendMessage)

[Client#sendPresenceAvailable()](Client.html#sendPresenceAvailable)

[Client#sendPresenceUnavailable()](Client.html#sendPresenceUnavailable)

[Client#sendResponseToScheduledEvent(response, eventMessageId)](Client.html#sendResponseToScheduledEvent)

[Client#sendSeen(chatId)](Client.html#sendSeen)

[Client#setAutoDownloadAudio(flag)](Client.html#setAutoDownloadAudio)

[Client#setAutoDownloadDocuments(flag)](Client.html#setAutoDownloadDocuments)

[Client#setAutoDownloadPhotos(flag)](Client.html#setAutoDownloadPhotos)

[Client#setAutoDownloadVideos(flag)](Client.html#setAutoDownloadVideos)

[Client#setBackgroundSync(flag)](Client.html#setBackgroundSync)

[Client#setDisplayName(displayName)](Client.html#setDisplayName)

[Client#setProfilePicture(media)](Client.html#setProfilePicture)

[Client#setStatus(status)](Client.html#setStatus)

[Client#subscribeToChannel(channelId)](Client.html#subscribeToChannel)

[Client#syncHistory(chatId)](Client.html#syncHistory)

[Client#transferChannelOwnership(channelId, newOwnerId, options)](Client.html#transferChannelOwnership)

[Client#unarchiveChat()](Client.html#unarchiveChat)

[Client#unmuteChat(chatId)](Client.html#unmuteChat)

[Client#unpinChat()](Client.html#unpinChat)

[Client#unsubscribeFromChannel(channelId, options)](Client.html#unsubscribeFromChannel)

## ClientInfo

[ClientInfo()](ClientInfo.html)

[ClientInfo#getBatteryStatus()](ClientInfo.html#getBatteryStatus)

[ClientInfo#me](ClientInfo.html#me)

[ClientInfo#phone](ClientInfo.html#phone)

[ClientInfo#platform](ClientInfo.html#platform)

[ClientInfo#pushname](ClientInfo.html#pushname)

[ClientInfo#wid](ClientInfo.html#wid)

## Contact

[Contact()](Contact.html)

[Contact#block()](Contact.html#block)

[Contact#getAbout()](Contact.html#getAbout)

[Contact#getBroadcast()](Contact.html#getBroadcast)

[Contact#getChat()](Contact.html#getChat)

[Contact#getCommonGroups()](Contact.html#getCommonGroups)

[Contact#getCountryCode()](Contact.html#getCountryCode)

[Contact#getFormattedNumber()](Contact.html#getFormattedNumber)

[Contact#getProfilePicUrl()](Contact.html#getProfilePicUrl)

[Contact#id](Contact.html#id)

[Contact#isBlocked](Contact.html#isBlocked)

[Contact#isBusiness](Contact.html#isBusiness)

[Contact#isEnterprise](Contact.html#isEnterprise)

[Contact#isGroup](Contact.html#isGroup)

[Contact#isMe](Contact.html#isMe)

[Contact#isMyContact](Contact.html#isMyContact)

[Contact#isUser](Contact.html#isUser)

[Contact#isWAContact](Contact.html#isWAContact)

[Contact#name](Contact.html#name)

[Contact#number](Contact.html#number)

[Contact#pushname](Contact.html#pushname)

[Contact#shortName](Contact.html#shortName)

[Contact#unblock()](Contact.html#unblock)

## Events

[Events.AUTHENTICATED](global.html#Events#.AUTHENTICATED)

[Events.AUTHENTICATION\_FAILURE](global.html#Events#.AUTHENTICATION_FAILURE)

[Events.BATTERY\_CHANGED](global.html#Events#.BATTERY_CHANGED)

[Events.CHAT\_ARCHIVED](global.html#Events#.CHAT_ARCHIVED)

[Events.CHAT\_REMOVED](global.html#Events#.CHAT_REMOVED)

[Events.CODE\_RECEIVED](global.html#Events#.CODE_RECEIVED)

[Events.CONTACT\_CHANGED](global.html#Events#.CONTACT_CHANGED)

[Events.DISCONNECTED](global.html#Events#.DISCONNECTED)

[Events.GROUP\_ADMIN\_CHANGED](global.html#Events#.GROUP_ADMIN_CHANGED)

[Events.GROUP\_JOIN](global.html#Events#.GROUP_JOIN)

[Events.GROUP\_LEAVE](global.html#Events#.GROUP_LEAVE)

[Events.GROUP\_MEMBERSHIP\_REQUEST](global.html#Events#.GROUP_MEMBERSHIP_REQUEST)

[Events.GROUP\_UPDATE](global.html#Events#.GROUP_UPDATE)

[Events.INCOMING\_CALL](global.html#Events#.INCOMING_CALL)

[Events.LOADING\_SCREEN](global.html#Events#.LOADING_SCREEN)

[Events.MEDIA\_UPLOADED](global.html#Events#.MEDIA_UPLOADED)

[Events.MESSAGE\_ACK](global.html#Events#.MESSAGE_ACK)

[Events.MESSAGE\_CIPHERTEXT](global.html#Events#.MESSAGE_CIPHERTEXT)

[Events.MESSAGE\_CREATE](global.html#Events#.MESSAGE_CREATE)

[Events.MESSAGE\_EDIT](global.html#Events#.MESSAGE_EDIT)

[Events.MESSAGE\_REACTION](global.html#Events#.MESSAGE_REACTION)

[Events.MESSAGE\_RECEIVED](global.html#Events#.MESSAGE_RECEIVED)

[Events.MESSAGE\_REVOKED\_EVERYONE](global.html#Events#.MESSAGE_REVOKED_EVERYONE)

[Events.MESSAGE\_REVOKED\_ME](global.html#Events#.MESSAGE_REVOKED_ME)

[Events.QR\_RECEIVED](global.html#Events#.QR_RECEIVED)

[Events.READY](global.html#Events#.READY)

[Events.REMOTE\_SESSION\_SAVED](global.html#Events#.REMOTE_SESSION_SAVED)

[Events.STATE\_CHANGED](global.html#Events#.STATE_CHANGED)

[Events.UNREAD\_COUNT](global.html#Events#.UNREAD_COUNT)

[Events.VOTE\_UPDATE](global.html#Events#.VOTE_UPDATE)

## GroupChat

[GroupChat()](GroupChat.html)

[GroupChat#addOrEditCustomerNote(note)](GroupChat.html#addOrEditCustomerNote)

[GroupChat#addParticipants(participantIds, options)](GroupChat.html#addParticipants)

[GroupChat#approveGroupMembershipRequests(options)](GroupChat.html#approveGroupMembershipRequests)

[GroupChat#archive()](GroupChat.html#archive)

[GroupChat#archived](GroupChat.html#archived)

[GroupChat#changeLabels(labelIds)](GroupChat.html#changeLabels)

[GroupChat#clearMessages()](GroupChat.html#clearMessages)

[GroupChat#clearState()](GroupChat.html#clearState)

[GroupChat#createdAt](GroupChat.html#createdAt)

[GroupChat#delete()](GroupChat.html#delete)

[GroupChat#deletePicture()](GroupChat.html#deletePicture)

[GroupChat#demoteParticipants(participantIds)](GroupChat.html#demoteParticipants)

[GroupChat#description](GroupChat.html#description)

[GroupChat#fetchMessages(searchOptions)](GroupChat.html#fetchMessages)

[GroupChat#getContact()](GroupChat.html#getContact)

[GroupChat#getCustomerNote()](GroupChat.html#getCustomerNote)

[GroupChat#getGroupMembershipRequests()](GroupChat.html#getGroupMembershipRequests)

[GroupChat#getInviteCode()](GroupChat.html#getInviteCode)

[GroupChat#getLabels()](GroupChat.html#getLabels)

[GroupChat#getPinnedMessages()](GroupChat.html#getPinnedMessages)

[GroupChat#id](GroupChat.html#id)

[GroupChat#isGroup](GroupChat.html#isGroup)

[GroupChat#isMuted](GroupChat.html#isMuted)

[GroupChat#isReadOnly](GroupChat.html#isReadOnly)

[GroupChat#lastMessage](GroupChat.html#lastMessage)

[GroupChat#leave()](GroupChat.html#leave)

[GroupChat#markUnread()](GroupChat.html#markUnread)

[GroupChat#mute(unmuteDate)](GroupChat.html#mute)

[GroupChat#muteExpiration](GroupChat.html#muteExpiration)

[GroupChat#name](GroupChat.html#name)

[GroupChat#owner](GroupChat.html#owner)

[GroupChat#participants](GroupChat.html#participants)

[GroupChat#pin()](GroupChat.html#pin)

[GroupChat#pinned](GroupChat.html#pinned)

[GroupChat#promoteParticipants(participantIds)](GroupChat.html#promoteParticipants)

[GroupChat#rejectGroupMembershipRequests(options)](GroupChat.html#rejectGroupMembershipRequests)

[GroupChat#removeParticipants(participantIds)](GroupChat.html#removeParticipants)

[GroupChat#revokeInvite()](GroupChat.html#revokeInvite)

[GroupChat#sendMessage(content\[, options\])](GroupChat.html#sendMessage)

[GroupChat#sendSeen()](GroupChat.html#sendSeen)

[GroupChat#sendStateRecording()](GroupChat.html#sendStateRecording)

[GroupChat#sendStateTyping()](GroupChat.html#sendStateTyping)

[GroupChat#setAddMembersAdminsOnly(\[adminsOnly\])](GroupChat.html#setAddMembersAdminsOnly)

[GroupChat#setDescription(description)](GroupChat.html#setDescription)

[GroupChat#setInfoAdminsOnly(\[adminsOnly\])](GroupChat.html#setInfoAdminsOnly)

[GroupChat#setMessagesAdminsOnly(\[adminsOnly\])](GroupChat.html#setMessagesAdminsOnly)

[GroupChat#setPicture(media)](GroupChat.html#setPicture)

[GroupChat#setSubject(subject)](GroupChat.html#setSubject)

[GroupChat#syncHistory()](GroupChat.html#syncHistory)

[GroupChat#timestamp](GroupChat.html#timestamp)

[GroupChat#unarchive()](GroupChat.html#unarchive)

[GroupChat#unmute()](GroupChat.html#unmute)

[GroupChat#unpin()](GroupChat.html#unpin)

[GroupChat#unreadCount](GroupChat.html#unreadCount)

## GroupNotification

[GroupNotification()](GroupNotification.html)

[GroupNotification#author](GroupNotification.html#author)

[GroupNotification#body](GroupNotification.html#body)

[GroupNotification#chatId](GroupNotification.html#chatId)

[GroupNotification#getChat()](GroupNotification.html#getChat)

[GroupNotification#getContact()](GroupNotification.html#getContact)

[GroupNotification#getRecipients()](GroupNotification.html#getRecipients)

[GroupNotification#id](GroupNotification.html#id)

[GroupNotification#recipientIds](GroupNotification.html#recipientIds)

[GroupNotification#reply(content, options)](GroupNotification.html#reply)

[GroupNotification#timestamp](GroupNotification.html#timestamp)

[GroupNotification#type](GroupNotification.html#type)

## GroupNotificationTypes

[GroupNotificationTypes.ADD](global.html#GroupNotificationTypes#.ADD)

[GroupNotificationTypes.ANNOUNCE](global.html#GroupNotificationTypes#.ANNOUNCE)

[GroupNotificationTypes.DEMOTE](global.html#GroupNotificationTypes#.DEMOTE)

[GroupNotificationTypes.DESCRIPTION](global.html#GroupNotificationTypes#.DESCRIPTION)

[GroupNotificationTypes.INVITE](global.html#GroupNotificationTypes#.INVITE)

[GroupNotificationTypes.LEAVE](global.html#GroupNotificationTypes#.LEAVE)

[GroupNotificationTypes.PICTURE](global.html#GroupNotificationTypes#.PICTURE)

[GroupNotificationTypes.PROMOTE](global.html#GroupNotificationTypes#.PROMOTE)

[GroupNotificationTypes.REMOVE](global.html#GroupNotificationTypes#.REMOVE)

[GroupNotificationTypes.RESTRICT](global.html#GroupNotificationTypes#.RESTRICT)

[GroupNotificationTypes.SUBJECT](global.html#GroupNotificationTypes#.SUBJECT)

## InterfaceController

[InterfaceController()](InterfaceController.html)

[InterfaceController#checkFeatureStatus(feature)](InterfaceController.html#checkFeatureStatus)

[InterfaceController#closeRightDrawer()](InterfaceController.html#closeRightDrawer)

[InterfaceController#disableFeatures(features)](InterfaceController.html#disableFeatures)

[InterfaceController#enableFeatures(features)](InterfaceController.html#enableFeatures)

[InterfaceController#getFeatures()](InterfaceController.html#getFeatures)

[InterfaceController#openChatDrawer(chatId)](InterfaceController.html#openChatDrawer)

[InterfaceController#openChatSearch(chatId)](InterfaceController.html#openChatSearch)

[InterfaceController#openChatWindow(chatId)](InterfaceController.html#openChatWindow)

[InterfaceController#openChatWindowAt(msgId)](InterfaceController.html#openChatWindowAt)

[InterfaceController#openMessageDrawer(msgId)](InterfaceController.html#openMessageDrawer)

## Label

[Label(client, labelData)](Label.html)

[Label#getChats()](Label.html#getChats)

[Label#hexColor](Label.html#hexColor)

[Label#id](Label.html#id)

[Label#name](Label.html#name)

## List

[List(body, buttonText, sections, title, footer)](List.html)

[List#\_format(sections)](List.html#_format)

[List#buttonText](List.html#buttonText)

[List#description](List.html#description)

[List#footer](List.html#footer)

[List#sections](List.html#sections)

[List#title](List.html#title)

## LocalAuth

[LocalAuth(options)](LocalAuth.html)

## LocalWebCache

[LocalWebCache(options)](LocalWebCache.html)

## Location

[Location(latitude, longitude\[, options\])](Location.html)

[Location#address](Location.html#address)

[Location#description](Location.html#description)

[Location#latitude](Location.html#latitude)

[Location#longitude](Location.html#longitude)

[Location#name](Location.html#name)

[Location#url](Location.html#url)

## Message

[Message()](Message.html)

[Message#acceptGroupV4Invite()](Message.html#acceptGroupV4Invite)

[Message#ack](Message.html#ack)

[Message#author](Message.html#author)

[Message#body](Message.html#body)

[Message#broadcast](Message.html#broadcast)

[Message#delete(everyone\[, clearMedia\])](Message.html#delete)

[Message#deviceType](Message.html#deviceType)

[Message#downloadMedia()](Message.html#downloadMedia)

[Message#duration](Message.html#duration)

[Message#edit(content\[, options\])](Message.html#edit)

[Message#editScheduledEvent(editedEventObject)](Message.html#editScheduledEvent)

[Message#forward(chat)](Message.html#forward)

[Message#forwardingScore](Message.html#forwardingScore)

[Message#from](Message.html#from)

[Message#fromMe](Message.html#fromMe)

[Message#getChat()](Message.html#getChat)

[Message#getContact()](Message.html#getContact)

[Message#getGroupMentions()](Message.html#getGroupMentions)

[Message#getInfo()](Message.html#getInfo)

[Message#getMentions()](Message.html#getMentions)

[Message#getOrder()](Message.html#getOrder)

[Message#getPayment()](Message.html#getPayment)

[Message#getPollVotes()](Message.html#getPollVotes)

[Message#getQuotedMessage()](Message.html#getQuotedMessage)

[Message#getReactions()](Message.html#getReactions)

[Message#groupMentions](Message.html#groupMentions)

[Message#hasMedia](Message.html#hasMedia)

[Message#hasQuotedMsg](Message.html#hasQuotedMsg)

[Message#hasReaction](Message.html#hasReaction)

[Message#id](Message.html#id)

[Message#inviteV4](Message.html#inviteV4)

[Message#isEphemeral](Message.html#isEphemeral)

[Message#isForwarded](Message.html#isForwarded)

[Message#isGif](Message.html#isGif)

[Message#isStarred](Message.html#isStarred)

[Message#isStatus](Message.html#isStatus)

[Message#links](Message.html#links)

[Message#location](Message.html#location)

[Message#mediaKey](Message.html#mediaKey)

[Message#mentionedIds](Message.html#mentionedIds)

[Message#orderId](Message.html#orderId)

[Message#pin(duration)](Message.html#pin)

[Message#rawData](Message.html#rawData)

[Message#react(reaction)](Message.html#react)

[Message#reload()](Message.html#reload)

[Message#reply(content\[, chatId\]\[, options\])](Message.html#reply)

[Message#star()](Message.html#star)

[Message#timestamp](Message.html#timestamp)

[Message#to](Message.html#to)

[Message#token](Message.html#token)

[Message#type](Message.html#type)

[Message#unpin()](Message.html#unpin)

[Message#unstar()](Message.html#unstar)

[Message#vCards](Message.html#vCards)

[Message#vote(selectedOptions)](Message.html#vote)

## MessageAck

[MessageAck.ACK\_DEVICE](global.html#MessageAck#.ACK_DEVICE)

[MessageAck.ACK\_ERROR](global.html#MessageAck#.ACK_ERROR)

[MessageAck.ACK\_PENDING](global.html#MessageAck#.ACK_PENDING)

[MessageAck.ACK\_PLAYED](global.html#MessageAck#.ACK_PLAYED)

[MessageAck.ACK\_READ](global.html#MessageAck#.ACK_READ)

[MessageAck.ACK\_SERVER](global.html#MessageAck#.ACK_SERVER)

## MessageMedia

[MessageMedia(mimetype, data, filename, filesize)](MessageMedia.html)

[MessageMedia.fromFilePath(filePath)](MessageMedia.html#.fromFilePath)

[MessageMedia.fromUrl(url\[, options\])](MessageMedia.html#.fromUrl)

[MessageMedia#data](MessageMedia.html#data)

[MessageMedia#filename](MessageMedia.html#filename)

[MessageMedia#filesize](MessageMedia.html#filesize)

[MessageMedia#mimetype](MessageMedia.html#mimetype)

## MessageTypes

[MessageTypes.ALBUM](global.html#MessageTypes#.ALBUM)

[MessageTypes.AUDIO](global.html#MessageTypes#.AUDIO)

[MessageTypes.BROADCAST\_NOTIFICATION](global.html#MessageTypes#.BROADCAST_NOTIFICATION)

[MessageTypes.BUTTONS\_RESPONSE](global.html#MessageTypes#.BUTTONS_RESPONSE)

[MessageTypes.CALL\_LOG](global.html#MessageTypes#.CALL_LOG)

[MessageTypes.CIPHERTEXT](global.html#MessageTypes#.CIPHERTEXT)

[MessageTypes.CONTACT\_CARD](global.html#MessageTypes#.CONTACT_CARD)

[MessageTypes.CONTACT\_CARD\_MULTI](global.html#MessageTypes#.CONTACT_CARD_MULTI)

[MessageTypes.DEBUG](global.html#MessageTypes#.DEBUG)

[MessageTypes.DOCUMENT](global.html#MessageTypes#.DOCUMENT)

[MessageTypes.E2E\_NOTIFICATION](global.html#MessageTypes#.E2E_NOTIFICATION)

[MessageTypes.GP2](global.html#MessageTypes#.GP2)

[MessageTypes.GROUP\_INVITE](global.html#MessageTypes#.GROUP_INVITE)

[MessageTypes.GROUP\_NOTIFICATION](global.html#MessageTypes#.GROUP_NOTIFICATION)

[MessageTypes.HSM](global.html#MessageTypes#.HSM)

[MessageTypes.IMAGE](global.html#MessageTypes#.IMAGE)

[MessageTypes.INTERACTIVE](global.html#MessageTypes#.INTERACTIVE)

[MessageTypes.LIST](global.html#MessageTypes#.LIST)

[MessageTypes.LIST\_RESPONSE](global.html#MessageTypes#.LIST_RESPONSE)

[MessageTypes.LOCATION](global.html#MessageTypes#.LOCATION)

[MessageTypes.NATIVE\_FLOW](global.html#MessageTypes#.NATIVE_FLOW)

[MessageTypes.NOTIFICATION](global.html#MessageTypes#.NOTIFICATION)

[MessageTypes.NOTIFICATION\_TEMPLATE](global.html#MessageTypes#.NOTIFICATION_TEMPLATE)

[MessageTypes.ORDER](global.html#MessageTypes#.ORDER)

[MessageTypes.OVERSIZED](global.html#MessageTypes#.OVERSIZED)

[MessageTypes.PAYMENT](global.html#MessageTypes#.PAYMENT)

[MessageTypes.POLL\_CREATION](global.html#MessageTypes#.POLL_CREATION)

[MessageTypes.PRODUCT](global.html#MessageTypes#.PRODUCT)

[MessageTypes.PROTOCOL](global.html#MessageTypes#.PROTOCOL)

[MessageTypes.REACTION](global.html#MessageTypes#.REACTION)

[MessageTypes.REVOKED](global.html#MessageTypes#.REVOKED)

[MessageTypes.SCHEDULED\_EVENT\_CREATION](global.html#MessageTypes#.SCHEDULED_EVENT_CREATION)

[MessageTypes.STICKER](global.html#MessageTypes#.STICKER)

[MessageTypes.TEMPLATE\_BUTTON\_REPLY](global.html#MessageTypes#.TEMPLATE_BUTTON_REPLY)

[MessageTypes.TEXT](global.html#MessageTypes#.TEXT)

[MessageTypes.UNKNOWN](global.html#MessageTypes#.UNKNOWN)

[MessageTypes.VIDEO](global.html#MessageTypes#.VIDEO)

[MessageTypes.VOICE](global.html#MessageTypes#.VOICE)

## NoAuth

[NoAuth()](NoAuth.html)

## Order

[Order()](Order.html)

[Order#createdAt](Order.html#createdAt)

[Order#currency](Order.html#currency)

[Order#subtotal](Order.html#subtotal)

[Order#total](Order.html#total)

## Payment

[Payment#id](Payment.html#id)

[Payment#paymentAmount1000](Payment.html#paymentAmount1000)

[Payment#paymentCurrency](Payment.html#paymentCurrency)

[Payment#paymentMessageReceiverJid](Payment.html#paymentMessageReceiverJid)

[Payment#paymentNote](Payment.html#paymentNote)

[Payment#paymentStatus](Payment.html#paymentStatus)

[Payment#paymentTransactionTimestamp](Payment.html#paymentTransactionTimestamp)

[Payment#paymentTxnStatus](Payment.html#paymentTxnStatus)

## Poll

[Poll(pollName, pollOptions, options)](Poll.html)

[Poll#options](Poll.html#options)

[Poll#pollName](Poll.html#pollName)

[Poll#pollOptions](Poll.html#pollOptions)

## PollVote

[PollVote()](PollVote.html)

[PollVote#interractedAtTs](PollVote.html#interractedAtTs)

[PollVote#parentMessage](PollVote.html#parentMessage)

[PollVote#parentMsgKey](PollVote.html#parentMsgKey)

[PollVote#voter](PollVote.html#voter)

## PrivateChat

[PrivateChat()](PrivateChat.html)

[PrivateChat#addOrEditCustomerNote(note)](PrivateChat.html#addOrEditCustomerNote)

[PrivateChat#archive()](PrivateChat.html#archive)

[PrivateChat#archived](PrivateChat.html#archived)

[PrivateChat#changeLabels(labelIds)](PrivateChat.html#changeLabels)

[PrivateChat#clearMessages()](PrivateChat.html#clearMessages)

[PrivateChat#clearState()](PrivateChat.html#clearState)

[PrivateChat#delete()](PrivateChat.html#delete)

[PrivateChat#fetchMessages(searchOptions)](PrivateChat.html#fetchMessages)

[PrivateChat#getContact()](PrivateChat.html#getContact)

[PrivateChat#getCustomerNote()](PrivateChat.html#getCustomerNote)

[PrivateChat#getLabels()](PrivateChat.html#getLabels)

[PrivateChat#getPinnedMessages()](PrivateChat.html#getPinnedMessages)

[PrivateChat#id](PrivateChat.html#id)

[PrivateChat#isGroup](PrivateChat.html#isGroup)

[PrivateChat#isMuted](PrivateChat.html#isMuted)

[PrivateChat#isReadOnly](PrivateChat.html#isReadOnly)

[PrivateChat#lastMessage](PrivateChat.html#lastMessage)

[PrivateChat#markUnread()](PrivateChat.html#markUnread)

[PrivateChat#mute(unmuteDate)](PrivateChat.html#mute)

[PrivateChat#muteExpiration](PrivateChat.html#muteExpiration)

[PrivateChat#name](PrivateChat.html#name)

[PrivateChat#pin()](PrivateChat.html#pin)

[PrivateChat#pinned](PrivateChat.html#pinned)

[PrivateChat#sendMessage(content\[, options\])](PrivateChat.html#sendMessage)

[PrivateChat#sendSeen()](PrivateChat.html#sendSeen)

[PrivateChat#sendStateRecording()](PrivateChat.html#sendStateRecording)

[PrivateChat#sendStateTyping()](PrivateChat.html#sendStateTyping)

[PrivateChat#syncHistory()](PrivateChat.html#syncHistory)

[PrivateChat#timestamp](PrivateChat.html#timestamp)

[PrivateChat#unarchive()](PrivateChat.html#unarchive)

[PrivateChat#unmute()](PrivateChat.html#unmute)

[PrivateChat#unpin()](PrivateChat.html#unpin)

[PrivateChat#unreadCount](PrivateChat.html#unreadCount)

## PrivateContact

[PrivateContact()](PrivateContact.html)

[PrivateContact#block()](PrivateContact.html#block)

[PrivateContact#getAbout()](PrivateContact.html#getAbout)

[PrivateContact#getBroadcast()](PrivateContact.html#getBroadcast)

[PrivateContact#getChat()](PrivateContact.html#getChat)

[PrivateContact#getCommonGroups()](PrivateContact.html#getCommonGroups)

[PrivateContact#getCountryCode()](PrivateContact.html#getCountryCode)

[PrivateContact#getFormattedNumber()](PrivateContact.html#getFormattedNumber)

[PrivateContact#getProfilePicUrl()](PrivateContact.html#getProfilePicUrl)

[PrivateContact#id](PrivateContact.html#id)

[PrivateContact#isBlocked](PrivateContact.html#isBlocked)

[PrivateContact#isBusiness](PrivateContact.html#isBusiness)

[PrivateContact#isEnterprise](PrivateContact.html#isEnterprise)

[PrivateContact#isGroup](PrivateContact.html#isGroup)

[PrivateContact#isMe](PrivateContact.html#isMe)

[PrivateContact#isMyContact](PrivateContact.html#isMyContact)

[PrivateContact#isUser](PrivateContact.html#isUser)

[PrivateContact#isWAContact](PrivateContact.html#isWAContact)

[PrivateContact#name](PrivateContact.html#name)

[PrivateContact#number](PrivateContact.html#number)

[PrivateContact#pushname](PrivateContact.html#pushname)

[PrivateContact#shortName](PrivateContact.html#shortName)

[PrivateContact#unblock()](PrivateContact.html#unblock)

## Product

[Product()](Product.html)

[Product#currency](Product.html#currency)

[Product#data](Product.html#data)

[Product#id](Product.html#id)

[Product#name](Product.html#name)

[Product#price](Product.html#price)

[Product#quantity](Product.html#quantity)

[Product#thumbnailUrl](Product.html#thumbnailUrl)

## ProductMetadata

[ProductMetadata#description](ProductMetadata.html#description)

[ProductMetadata#id](ProductMetadata.html#id)

[ProductMetadata#name](ProductMetadata.html#name)

[ProductMetadata#retailer\_id](ProductMetadata.html#retailer_id)

## Reaction

[Reaction()](Reaction.html)

[Reaction#ack](Reaction.html#ack)

[Reaction#id](Reaction.html#id)

[Reaction#msgId](Reaction.html#msgId)

[Reaction#orphan](Reaction.html#orphan)

[Reaction#orphanReason](Reaction.html#orphanReason)

[Reaction#reaction](Reaction.html#reaction)

[Reaction#read](Reaction.html#read)

[Reaction#senderId](Reaction.html#senderId)

[Reaction#timestamp](Reaction.html#timestamp)

## RemoteAuth

[RemoteAuth(options)](RemoteAuth.html)

## RemoteWebCache

[RemoteWebCache(options)](RemoteWebCache.html)

## ScheduledEvent

[ScheduledEvent(name, startTime, options)](ScheduledEvent.html)

[ScheduledEvent#\_validateInputs(propName, propValue)](ScheduledEvent.html#_validateInputs)

[ScheduledEvent#eventSendOptions](ScheduledEvent.html#eventSendOptions)

[ScheduledEvent#name](ScheduledEvent.html#name)

[ScheduledEvent#startTimeTs](ScheduledEvent.html#startTimeTs)

## Status

[Status.AUTHENTICATING](global.html#Status#.AUTHENTICATING)

[Status.INITIALIZING](global.html#Status#.INITIALIZING)

[Status.READY](global.html#Status#.READY)

## Util

[Util()](Util.html)

[Util.formatImageToWebpSticker(media)](Util.html#.formatImageToWebpSticker)

[Util.formatToWebpSticker(media, metadata)](Util.html#.formatToWebpSticker)

[Util.formatVideoToWebpSticker(media)](Util.html#.formatVideoToWebpSticker)

[Util.setFfmpegPath(path)](Util.html#.setFfmpegPath)

## WAState

[WAState.CONFLICT](global.html#WAState#.CONFLICT)

[WAState.CONNECTED](global.html#WAState#.CONNECTED)

[WAState.DEPRECATED\_VERSION](global.html#WAState#.DEPRECATED_VERSION)

[WAState.OPENING](global.html#WAState#.OPENING)

[WAState.PAIRING](global.html#WAState#.PAIRING)

[WAState.PROXYBLOCK](global.html#WAState#.PROXYBLOCK)

[WAState.SMB\_TOS\_BLOCK](global.html#WAState#.SMB_TOS_BLOCK)

[WAState.TIMEOUT](global.html#WAState#.TIMEOUT)

[WAState.TOS\_BLOCK](global.html#WAState#.TOS_BLOCK)

[WAState.UNLAUNCHED](global.html#WAState#.UNLAUNCHED)

[WAState.UNPAIRED](global.html#WAState#.UNPAIRED)

[WAState.UNPAIRED\_IDLE](global.html#WAState#.UNPAIRED_IDLE)

## WebCache

[WebCache()](WebCache.html)

## window

[window.compareWwebVersions(lOperand, operator, rOperand)](window.html#.compareWwebVersions)

[window.injectToFunction(target, callback)](window.html#.injectToFunction)

--- END OF FILE: structures_Base.js.html#source-line-6.md ---
--- START OF FILE: structures_Base.js.html#source-line-6.md ---

Source: https://docs.wwebjs.dev/structures_Base.js.html#source-line-6

1.  `'use strict';`

3.  `/**`
4.   `* Represents a WhatsApp data structure`
5.   `*/`
6.  `class Base {`
7.      `constructor(client) {`
8.          `/**`
9.           `* The client that instantiated this`
10.           `* @readonly`
11.           `*/`
12.          `Object.defineProperty(this, 'client', { value: client });`
13.      `}`

15.      `_clone() {`
16.          `return Object.assign(Object.create(this), this);`
17.      `}`

19.      `_patch(data) { return data; }`
20.  `}`

22.  `module.exports = Base;`

--- END OF FILE: structures_Broadcast.js.html#source-line-10.md ---
--- START OF FILE: structures_Broadcast.js.html#source-line-10.md ---

Source: https://docs.wwebjs.dev/structures_Broadcast.js.html#source-line-10

1.  `'use strict';`

3.  `const Base = require('./Base');`
4.  `const Message = require('./Message');`

6.  `/**`
7.   `* Represents a Status/Story on WhatsApp`
8.   `* @extends {Base}`
9.   `*/`
10.  `class Broadcast extends Base {`
11.      `constructor(client, data) {`
12.          `super(client);`

14.          `if (data) this._patch(data);`
15.      `}`

17.      `_patch(data) {`
18.          `/**`
19.           `* ID that represents the chat`
20.           `* @type {object}`
21.           `*/`
22.          `this.id = data.id;`

24.          `/**`
25.           `* Unix timestamp of last status`
26.           `* @type {number}`
27.           `*/`
28.          `this.timestamp = data.t;`

30.          `/**`
31.           `* Number of available statuses`
32.           `* @type {number}`
33.           `*/`
34.          `this.totalCount = data.totalCount;`

36.          `/**`
37.           `* Number of not viewed`
38.           `* @type {number}`
39.           `*/`
40.          `this.unreadCount = data.unreadCount;`

42.          `/**`
43.           `* Messages statuses`
44.           `* @type {Message[]}`
45.           `*/`
46.          `this.msgs = data.msgs?.map(msg => new Message(this.client, msg));`

48.          `return super._patch(data);`
49.      `}`

51.      `/**`
52.       `* Returns the Chat this message was sent in`
53.       `* @returns {Promise&lt;Chat>}`
54.       `*/`
55.      `getChat() {`
56.          `return this.client.getChatById(this.id._serialized);`
57.      `}`

59.      `/**`
60.       `* Returns the Contact this message was sent from`
61.       `* @returns {Promise&lt;Contact>}`
62.       `*/`
63.      `getContact() {`
64.          `return this.client.getContactById(this.id._serialized);`
65.      `}`

67.  `}`

69.  `module.exports = Broadcast;`

--- END OF FILE: structures_BusinessContact.js.html#source-line-9.md ---
--- START OF FILE: structures_BusinessContact.js.html#source-line-9.md ---

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

--- END OF FILE: structures_Buttons.js.html#source-line-23.md ---
--- START OF FILE: structures_Buttons.js.html#source-line-23.md ---

Source: https://docs.wwebjs.dev/structures_Buttons.js.html#source-line-23

1.  `'use strict';`

3.  `const MessageMedia = require('./MessageMedia');`
4.  `const Util = require('../util/Util');`

6.  `/**`
7.   `* Button spec used in Buttons constructor`
8.   `* @typedef {Object} ButtonSpec`
9.   `* @property {string=} id - Custom ID to set on the button. A random one will be generated if one is not passed.`
10.   `* @property {string} body - The text to show on the button.`
11.   `*/`

13.  `/**`
14.   `* @typedef {Object} FormattedButtonSpec`
15.   `* @property {string} buttonId`
16.   `* @property {number} type`
17.   `* @property {Object} buttonText`
18.   `*/`

20.  `/**`
21.   `* Message type buttons`
22.   `*/`
23.  `class Buttons {`
24.      `/**`
25.       `* @param {string|MessageMedia} body`
26.       `* @param {ButtonSpec[]} buttons - See {@link ButtonSpec}`
27.       `* @param {string?} title`
28.       `* @param {string?} footer`
29.       `*/`
30.      `constructor(body, buttons, title, footer) {`
31.          `/**`
32.           `* Message body`
33.           `* @type {string|MessageMedia}`
34.           `*/`
35.          `this.body = body;`

37.          `/**`
38.           `* title of message`
39.           `* @type {string}`
40.           `*/`
41.          `this.title = title;`

43.          `/**`
44.           `* footer of message`
45.           `* @type {string}`
46.           `*/`
47.          `this.footer = footer;`

49.          `if (body instanceof MessageMedia) {`
50.              `this.type = 'media';`
51.              `this.title = '';`
52.          `}else{`
53.              `this.type = 'chat';`
54.          `}`

56.          `/**`
57.           `* buttons of message`
58.           `* @type {FormattedButtonSpec[]}`
59.           `*/`
60.          `this.buttons = this._format(buttons);`
61.          `if(!this.buttons.length){ throw '[BT01] No buttons';}`

63.      `}`

65.      `/**`
66.       `* Creates button array from simple array`
67.       `* @param {ButtonSpec[]} buttons`
68.       `* @returns {FormattedButtonSpec[]}`
69.       `* @example` 
70.       `* Input: [{id:'customId',body:'button1'},{body:'button2'},{body:'button3'},{body:'button4'}]`
71.       `* Returns: [{ buttonId:'customId',buttonText:{'displayText':'button1'},type: 1 },{buttonId:'n3XKsL',buttonText:{'displayText':'button2'},type:1},{buttonId:'NDJk0a',buttonText:{'displayText':'button3'},type:1}]`
72.       `*/`
73.      `_format(buttons){`
74.          `buttons = buttons.slice(0,3); // phone users can only see 3 buttons, so lets limit this`
75.          `return buttons.map((btn) => {`
76.              `return {'buttonId':btn.id ? String(btn.id) : Util.generateHash(6),'buttonText':{'displayText':btn.body},'type':1};`
77.          `});`
78.      `}`

80.  `}`

82.  `module.exports = Buttons;`

--- END OF FILE: structures_Call.js.html#source-line-9.md ---
--- START OF FILE: structures_Call.js.html#source-line-9.md ---

Source: https://docs.wwebjs.dev/structures_Call.js.html#source-line-9

1.  `'use strict';`

3.  `const Base = require('./Base');`

5.  `/**`
6.   `* Represents a Call on WhatsApp`
7.   `* @extends {Base}`
8.   `*/`
9.  `class Call extends Base {`
10.      `constructor(client, data) {`
11.          `super(client);`

13.          `if (data) this._patch(data);`
14.      `}`

16.      `_patch(data) {`
17.          `/**`
18.           `* Call ID`
19.           `* @type {string}`
20.           `*/`
21.          `this.id = data.id;`
22.          `/**`
23.           `* From`
24.           `* @type {string}`
25.           `*/`
26.          `this.from = data.peerJid;`
27.          `/**`
28.           `* Unix timestamp for when the call was created`
29.           `* @type {number}`
30.           `*/`
31.          `this.timestamp = data.offerTime;`
32.          `/**`
33.           `* Is video`
34.           `* @type {boolean}`
35.           `*/`
36.          `this.isVideo = data.isVideo;`
37.          `/**`
38.           `* Is Group`
39.           `* @type {boolean}`
40.           `*/`
41.          `this.isGroup = data.isGroup;`
42.          `/**`
43.           `* Indicates if the call was sent by the current user`
44.           `* @type {boolean}`
45.           `*/`
46.          `this.fromMe = data.outgoing;`
47.          `/**`
48.           `* Indicates if the call can be handled in waweb`
49.           `* @type {boolean}`
50.           `*/`
51.          `this.canHandleLocally = data.canHandleLocally;`
52.          `/**`
53.           `* Indicates if the call Should be handled in waweb`
54.           `* @type {boolean}`
55.           `*/`
56.          `this.webClientShouldHandle = data.webClientShouldHandle;`
57.          `/**`
58.           `* Object with participants`
59.           `* @type {object}`
60.           `*/`
61.          `this.participants = data.participants;`

63.          `return super._patch(data);`
64.      `}`

66.      `/**`
67.       `* Reject the call`
68.      `*/`
69.      `async reject() {`
70.          `return this.client.pupPage.evaluate((peerJid, id) => {`
71.              `return window.WWebJS.rejectCall(peerJid, id);`
72.          `}, this.from, this.id);`
73.      `}`
74.  `}`

76.  `module.exports = Call;`

--- END OF FILE: structures_Channel.js.html#source-line-18.md ---
--- START OF FILE: structures_Channel.js.html#source-line-18.md ---

Source: https://docs.wwebjs.dev/structures_Channel.js.html#source-line-18

1.  `'use strict';`

3.  `const Base = require('./Base');`
4.  `const Message = require('./Message');`

6.  `/**`
7.   `* Channel ID structure`
8.   `* @typedef {Object} ChannelId`
9.   `* @property {string} server`
10.   `* @property {string} user`
11.   `* @property {string} _serialized`
12.   `*/`

14.  `/**`
15.   `* Represents a Channel on WhatsApp`
16.   `* @extends {Base}`
17.   `*/`
18.  `class Channel extends Base {`
19.      `constructor(client, data) {`
20.          `super(client);`

22.          `if (data) this._patch(data);`
23.      `}`

25.      `_patch(data) {`
26.          `this.channelMetadata = data.channelMetadata;`

28.          `/**`
29.           `* ID that represents the channel`
30.           `* @type {ChannelId}`
31.           `*/`
32.          `this.id = data.id;`

34.          `/**`
35.           `* Title of the channel`
36.           `* @type {string}`
37.           `*/`
38.          `this.name = data.name;`

40.          `/**` 
41.           `* The channel description`
42.           `* @type {string}`
43.           `*/`
44.          `this.description = data.channelMetadata.description;`

46.          `/**`
47.           `* Indicates if it is a Channel`
48.           `* @type {boolean}`
49.           `*/`
50.          `this.isChannel = data.isChannel;`

52.          `/**`
53.           `* Indicates if it is a Group`
54.           `* @type {boolean}`
55.           `*/`
56.          `this.isGroup = data.isGroup;`

58.          `/**`
59.           `* Indicates if the channel is readonly`
60.           `* @type {boolean}`
61.           `*/`
62.          `this.isReadOnly = data.isReadOnly;`

64.          `/**`
65.           `* Amount of messages unread`
66.           `* @type {number}`
67.           `*/`
68.          `this.unreadCount = data.unreadCount;`

70.          `/**`
71.           `* Unix timestamp for when the last activity occurred`
72.           `* @type {number}`
73.           `*/`
74.          `this.timestamp = data.t;`

76.          `/**`
77.           `* Indicates if the channel is muted or not`
78.           `* @type {boolean}`
79.           `*/`
80.          `this.isMuted = data.isMuted;`

82.          `/**`
83.           `* Unix timestamp for when the mute expires`
84.           `* @type {number}`
85.           `*/`
86.          `this.muteExpiration = data.muteExpiration;`

88.          `/**`
89.           `* Last message in the channel`
90.           `* @type {Message}`
91.           `*/`
92.          `this.lastMessage = data.lastMessage ? new Message(super.client, data.lastMessage) : undefined;`

94.          `return super._patch(data);`
95.      `}`

97.      `/**`
98.       `* Gets the subscribers of the channel (only those who are in your contact list)`
99.       `* @param {?number} limit Optional parameter to specify the limit of subscribers to retrieve`
100.       `* @returns {Promise&lt;Array&lt;{contact: Contact, role: string}>>} Returns an array of objects that handle the subscribed contacts and their roles in the channel`
101.       `*/`
102.      `async getSubscribers(limit) {`
103.          `return await this.client.pupPage.evaluate(async (channelId, limit) => {`
104.              `const channel = await window.WWebJS.getChat(channelId, { getAsModel: false });`
105.              `if (!channel) return [];`
106.              `!limit &amp;&amp; (limit = window.Store.ChannelUtils.getMaxSubscriberNumber());`
107.              `const response = await window.Store.ChannelSubscribers.mexFetchNewsletterSubscribers(channelId, limit);`
108.              `const contacts = window.Store.ChannelSubscribers.getSubscribersInContacts(response.subscribers);`
109.              `return Promise.all(contacts.map((obj) => ({`
110.                  `...obj,`
111.                  `contact: window.WWebJS.getContactModel(obj.contact)`
112.              `})));`
113.          `}, this.id._serialized, limit);`
114.      `}`

116.      `/**`
117.       `* Updates the channel subject`
118.       `* @param {string} newSubject` 
119.       `* @returns {Promise&lt;boolean>} Returns true if the subject was properly updated. This can return false if the user does not have the necessary permissions.`
120.       `*/`
121.      `async setSubject(newSubject) {`
122.          `const success = await this._setChannelMetadata({ name: newSubject }, { editName: true });`
123.          `success &amp;&amp; (this.name = newSubject);`
124.          `return success;`
125.      `}`

127.      `/**`
128.       `* Updates the channel description`
129.       `* @param {string} newDescription` 
130.       `* @returns {Promise&lt;boolean>} Returns true if the operation completed successfully, false otherwise`
131.       `*/`
132.      `async setDescription(newDescription) {`
133.          `const success = await this._setChannelMetadata({ description: newDescription }, { editDescription: true });`
134.          `success &amp;&amp; (this.description = newDescription);`
135.          `return success;`
136.      `}`

138.      `/**`
139.       `* Updates the channel profile picture`
140.       `* @param {MessageMedia} newProfilePicture` 
141.       `* @returns {Promise&lt;boolean>} Returns true if the operation completed successfully, false otherwise`
142.       `*/`
143.      `async setProfilePicture(newProfilePicture) {`
144.          `return await this._setChannelMetadata({ picture: newProfilePicture }, { editPicture: true });`
145.      `}`

147.      `/**`
148.       `* Updates available reactions to use in the channel`
149.       `*` 
150.       `* Valid values for passing to the method are:`
151.       `* 0 for NONE reactions to be avaliable`
152.       `* 1 for BASIC reactions to be available: 👍, ❤️, 😂, 😮, 😢, 🙏`
153.       `* 2 for ALL reactions to be available`
154.       `* @param {number} reactionCode` 
155.       `* @returns {Promise&lt;boolean>} Returns true if the operation completed successfully, false otherwise`
156.       `*/`
157.      `async setReactionSetting(reactionCode) {`
158.          `if (![0, 1, 2].includes(reactionCode)) return false;`
159.          `const reactionMapper = {`
160.              `0: 3,`
161.              `1: 1,`
162.              `2: 0`
163.          `};`
164.          `const success = await this._setChannelMetadata(`
165.              `{ reactionCodesSetting: reactionMapper[reactionCode] },`
166.              `{ editReactionCodesSetting: true }`
167.          `);`
168.          `success &amp;&amp; (this.channelMetadata.reactionCodesSetting = reactionCode);`
169.          `return success;`
170.      `}`

172.      `/**`
173.       `* Mutes the channel`
174.       `* @returns {Promise&lt;boolean>} Returns true if the operation completed successfully, false otherwise`
175.       `*/`
176.      `async mute() {`
177.          `const success = await this._muteUnmuteChannel('MUTE');`
178.          `if (success) {`
179.              `this.isMuted = true;`
180.              `this.muteExpiration = -1;`
181.          `}`
182.          `return success;`
183.      `}`

185.      `/**`
186.       `* Unmutes the channel`
187.       `* @returns {Promise&lt;boolean>} Returns true if the operation completed successfully, false otherwise`
188.       `*/`
189.      `async unmute() {`
190.          `const success = await this._muteUnmuteChannel('UNMUTE');`
191.          `if (success) {`
192.              `this.isMuted = false;`
193.              `this.muteExpiration = 0;`
194.          `}`
195.          `return success;`
196.      `}`

198.      `/**`
199.       `* Message options`
200.       `* @typedef {Object} MessageSendOptions`
201.       `* @property {?string} caption Image or video caption`
202.       `* @property {?string[]} mentions User IDs of user that will be mentioned in the message`
203.       `* @property {?MessageMedia} media Image or video to be sent`
204.       `*/`

206.      `/**`
207.       `* Sends a message to this channel`
208.       `* @param {string|MessageMedia} content`
209.       `* @param {?MessageSendOptions} options`
210.       `* @returns {Promise&lt;Message>} Message that was just sent`
211.       `*/`
212.      `async sendMessage(content, options) {`
213.          `return this.client.sendMessage(this.id._serialized, content, options);`
214.      `}`

216.      `/**`
217.       `* Sets the channel as seen`
218.       `* @returns {Promise&lt;boolean>}`
219.       `*/`
220.      `async sendSeen() {`
221.          `return this.client.sendSeen(this.id._serialized);`
222.      `}`

224.      `/**`
225.       `* @typedef {Object} SendChannelAdminInviteOptions`
226.       `* @property {?string} comment The comment to be added to an invitation`
227.       `*/`

229.      `/**`
230.       `* Sends a channel admin invitation to a user, allowing them to become an admin of the channel`
231.       `* @param {string} chatId The ID of a user to send the channel admin invitation to`
232.       `* @param {SendChannelAdminInviteOptions} options` 
233.       `* @returns {Promise&lt;boolean>} Returns true if an invitation was sent successfully, false otherwise`
234.       `*/`
235.      `async sendChannelAdminInvite(chatId, options = {}) {`
236.          `return this.client.sendChannelAdminInvite(chatId, this.id._serialized, options);`
237.      `}`

239.      `/**`
240.       `* Accepts a channel admin invitation and promotes the current user to a channel admin`
241.       `* @returns {Promise&lt;boolean>} Returns true if the operation completed successfully, false otherwise`
242.       `*/`
243.      `async acceptChannelAdminInvite() {`
244.          `return this.client.acceptChannelAdminInvite(this.id._serialized);`
245.      `}`

247.      `/**`
248.       `* Revokes a channel admin invitation sent to a user by a channel owner`
249.       `* @param {string} userId The user ID the invitation was sent to`
250.       `* @returns {Promise&lt;boolean>} Returns true if the operation completed successfully, false otherwise`
251.       `*/`
252.      `async revokeChannelAdminInvite(userId) {`
253.          `return this.client.revokeChannelAdminInvite(this.id._serialized, userId);`
254.      `}`

256.      `/**`
257.       `* Demotes a channel admin to a regular subscriber (can be used also for self-demotion)`
258.       `* @param {string} userId The user ID to demote`
259.       `* @returns {Promise&lt;boolean>} Returns true if the operation completed successfully, false otherwise`
260.       `*/`
261.      `async demoteChannelAdmin(userId) {`
262.          `return this.client.demoteChannelAdmin(this.id._serialized, userId);`
263.      `}`

265.      `/**`
266.       `* Options for transferring a channel ownership to another user`
267.       `* @typedef {Object} TransferChannelOwnershipOptions`
268.       `* @property {boolean} [shouldDismissSelfAsAdmin = false] If true, after the channel ownership is being transferred to another user, the current user will be dismissed as a channel admin and will become to a channel subscriber.`
269.       `*/`

271.      `/**`
272.       `* Transfers a channel ownership to another user.`
273.       `* Note: the user you are transferring the channel ownership to must be a channel admin.`
274.       `* @param {string} newOwnerId`
275.       `* @param {TransferChannelOwnershipOptions} options`
276.       `* @returns {Promise&lt;boolean>} Returns true if the operation completed successfully, false otherwise`
277.       `*/`
278.      `async transferChannelOwnership(newOwnerId, options = {}) {`
279.          `return this.client.transferChannelOwnership(this.id._serialized, newOwnerId, options);`
280.      `}`

282.      `/**`
283.       `* Loads channel messages, sorted from earliest to latest`
284.       `* @param {Object} searchOptions Options for searching messages. Right now only limit and fromMe is supported`
285.       `* @param {Number} [searchOptions.limit] The amount of messages to return. If no limit is specified, the available messages will be returned. Note that the actual number of returned messages may be smaller if there aren't enough messages in the conversation. Set this to Infinity to load all messages`
286.       `* @param {Boolean} [searchOptions.fromMe] Return only messages from the bot number or vise versa. To get all messages, leave the option undefined`
287.       `* @returns {Promise&lt;Array&lt;Message>>}`
288.       `*/`
289.      `async fetchMessages(searchOptions) {`
290.          `let messages = await this.client.pupPage.evaluate(async (channelId, searchOptions) => {`
291.              `const msgFilter = (m) => {`
292.                  `if (m.isNotification || m.type === 'newsletter_notification') {`
293.                      `return false; // dont include notification messages`
294.                  `}`
295.                  `if (searchOptions &amp;&amp; searchOptions.fromMe !== undefined &amp;&amp; m.id.fromMe !== searchOptions.fromMe) {`
296.                      `return false;`
297.                  `}`
298.                  `return true;`
299.              `};`

301.              `const channel = await window.WWebJS.getChat(channelId, { getAsModel: false });`
302.              `let msgs = channel.msgs.getModelsArray().filter(msgFilter);`

304.              `if (searchOptions &amp;&amp; searchOptions.limit > 0) {`
305.                  `while (msgs.length &lt; searchOptions.limit) {`
306.                      `const loadedMessages = await window.Store.ConversationMsgs.loadEarlierMsgs(channel);`
307.                      `if (!loadedMessages || !loadedMessages.length) break;`
308.                      `msgs = [...loadedMessages.filter(msgFilter), ...msgs];`
309.                  `}`

311.                  `if (msgs.length > searchOptions.limit) {`
312.                      `msgs.sort((a, b) => (a.t > b.t) ? 1 : -1);`
313.                      `msgs = msgs.splice(msgs.length - searchOptions.limit);`
314.                  `}`
315.              `}`

317.              `return msgs.map(m => window.WWebJS.getMessageModel(m));`

319.          `}, this.id._serialized, searchOptions);`

321.          `return messages.map((msg) => new Message(this.client, msg));`
322.      `}`

324.      `/**`
325.       `* Deletes the channel you created`
326.       `* @returns {Promise&lt;boolean>} Returns true if the operation completed successfully, false otherwise`
327.       `*/`
328.      `async deleteChannel() {`
329.          `return this.client.deleteChannel(this.id._serialized);`
330.      `}`

332.      `/**`
333.       `* Internal method to change the channel metadata`
334.       `* @param {string|number|MessageMedia} value The new value to set`
335.       `* @param {string} property The property of a channel metadata to change`
336.       `* @returns {Promise&lt;boolean>} Returns true if the operation completed successfully, false otherwise`
337.       `*/`
338.      `async _setChannelMetadata(value, property) {`
339.          `return await this.client.pupPage.evaluate(async (channelId, value, property) => {`
340.              `const channel = await window.WWebJS.getChat(channelId, { getAsModel: false });`
341.              `if (!channel) return false;`
342.              `if (property.editPicture) {`
343.                  `value.picture = value.picture`
344.                      `? await window.WWebJS.cropAndResizeImage(value.picture, {`
345.                          `asDataUrl: true,`
346.                          `mimetype: 'image/jpeg',`
347.                          `size: 640,`
348.                          `quality: 1`
349.                      `})`
350.                      `: null;`
351.              `}`
352.              `try {`
353.                  `await window.Store.ChannelUtils.editNewsletterMetadataAction(channel, property, value);`
354.                  `return true;`
355.              `} catch (err) {`
356.                  `if (err.name === 'ServerStatusCodeError') return false;`
357.                  `throw err;`
358.              `}`
359.          `}, this.id._serialized, value, property);`
360.      `}`

362.      `/**`
363.       `* Internal method to mute or unmute the channel`
364.       `* @param {string} action The action: 'MUTE' or 'UNMUTE'`
365.       `* @returns {Promise&lt;boolean>} Returns true if the operation completed successfully, false otherwise`
366.       `*/`
367.      `async _muteUnmuteChannel(action) {`
368.          `return await this.client.pupPage.evaluate(async (channelId, action) => {`
369.              `try {`
370.                  `action === 'MUTE'`
371.                      `? await window.Store.ChannelUtils.muteNewsletter([channelId])`
372.                      `: await window.Store.ChannelUtils.unmuteNewsletter([channelId]);`
373.                  `return true;`
374.              `} catch (err) {`
375.                  `if (err.name === 'ServerStatusCodeError') return false;`
376.                  `throw err;`
377.              `}`
378.          `}, this.id._serialized, action);`
379.      `}`
380.  `}`

382.  `module.exports = Channel;`

--- END OF FILE: structures_Chat.js.html#source-line-10.md ---
--- START OF FILE: structures_Chat.js.html#source-line-10.md ---

Source: https://docs.wwebjs.dev/structures_Chat.js.html#source-line-10

1.  `'use strict';`

3.  `const Base = require('./Base');`
4.  `const Message = require('./Message');`

6.  `/**`
7.   `* Represents a Chat on WhatsApp`
8.   `* @extends {Base}`
9.   `*/`
10.  `class Chat extends Base {`
11.      `constructor(client, data) {`
12.          `super(client);`

14.          `if (data) this._patch(data);`
15.      `}`

17.      `_patch(data) {`
18.          `/**`
19.           `* ID that represents the chat`
20.           `* @type {object}`
21.           `*/`
22.          `this.id = data.id;`

24.          `/**`
25.           `* Title of the chat`
26.           `* @type {string}`
27.           `*/`
28.          `this.name = data.formattedTitle;`

30.          `/**`
31.           `* Indicates if the Chat is a Group Chat`
32.           `* @type {boolean}`
33.           `*/`
34.          `this.isGroup = data.isGroup;`

36.          `/**`
37.           `* Indicates if the Chat is readonly`
38.           `* @type {boolean}`
39.           `*/`
40.          `this.isReadOnly = data.isReadOnly;`

42.          `/**`
43.           `* Amount of messages unread`
44.           `* @type {number}`
45.           `*/`
46.          `this.unreadCount = data.unreadCount;`

48.          `/**`
49.           `* Unix timestamp for when the last activity occurred`
50.           `* @type {number}`
51.           `*/`
52.          `this.timestamp = data.t;`

54.          `/**`
55.           `* Indicates if the Chat is archived`
56.           `* @type {boolean}`
57.           `*/`
58.          `this.archived = data.archive;`

60.          `/**`
61.           `* Indicates if the Chat is pinned`
62.           `* @type {boolean}`
63.           `*/`
64.          `this.pinned = !!data.pin;`

66.          `/**`
67.           `* Indicates if the chat is muted or not`
68.           `* @type {boolean}`
69.           `*/`
70.          `this.isMuted = data.isMuted;`

72.          `/**`
73.           `* Unix timestamp for when the mute expires`
74.           `* @type {number}`
75.           `*/`
76.          `this.muteExpiration = data.muteExpiration;`

78.          `/**`
79.           `* Last message fo chat`
80.           `* @type {Message}`
81.           `*/`
82.          `this.lastMessage = data.lastMessage ? new Message(this.client, data.lastMessage) : undefined;`

84.          `return super._patch(data);`
85.      `}`

87.      `/**`
88.       `* Send a message to this chat`
89.       `* @param {string|MessageMedia|Location} content`
90.       `* @param {MessageSendOptions} [options]` 
91.       `* @returns {Promise&lt;Message>} Message that was just sent`
92.       `*/`
93.      `async sendMessage(content, options) {`
94.          `return this.client.sendMessage(this.id._serialized, content, options);`
95.      `}`

97.      `/**`
98.       `* Sets the chat as seen`
99.       `* @returns {Promise&lt;Boolean>} result`
100.       `*/`
101.      `async sendSeen() {`
102.          `return this.client.sendSeen(this.id._serialized);`
103.      `}`

105.      `/**`
106.       `* Clears all messages from the chat`
107.       `* @returns {Promise&lt;boolean>} result`
108.       `*/`
109.      `async clearMessages() {`
110.          `return this.client.pupPage.evaluate(chatId => {`
111.              `return window.WWebJS.sendClearChat(chatId);`
112.          `}, this.id._serialized);`
113.      `}`

115.      `/**`
116.       `* Deletes the chat`
117.       `* @returns {Promise&lt;Boolean>} result`
118.       `*/`
119.      `async delete() {`
120.          `return this.client.pupPage.evaluate(chatId => {`
121.              `return window.WWebJS.sendDeleteChat(chatId);`
122.          `}, this.id._serialized);`
123.      `}`

125.      `/**`
126.       `* Archives this chat`
127.       `*/`
128.      `async archive() {`
129.          `return this.client.archiveChat(this.id._serialized);`
130.      `}`

132.      `/**`
133.       `* un-archives this chat`
134.       `*/`
135.      `async unarchive() {`
136.          `return this.client.unarchiveChat(this.id._serialized);`
137.      `}`

139.      `/**`
140.       `* Pins this chat`
141.       `* @returns {Promise&lt;boolean>} New pin state. Could be false if the max number of pinned chats was reached.`
142.       `*/`
143.      `async pin() {`
144.          `return this.client.pinChat(this.id._serialized);`
145.      `}`

147.      `/**`
148.       `* Unpins this chat`
149.       `* @returns {Promise&lt;boolean>} New pin state`
150.       `*/`
151.      `async unpin() {`
152.          `return this.client.unpinChat(this.id._serialized);`
153.      `}`

155.      `/**`
156.       `* Mutes this chat forever, unless a date is specified`
157.       `* @param {?Date} unmuteDate Date when the chat will be unmuted, don't provide a value to mute forever`
158.       `* @returns {Promise&lt;{isMuted: boolean, muteExpiration: number}>}`
159.       `*/`
160.      `async mute(unmuteDate) {`
161.          `const result = await this.client.muteChat(this.id._serialized, unmuteDate);`
162.          `this.isMuted = result.isMuted;`
163.          `this.muteExpiration = result.muteExpiration;`
164.          `return result;`
165.      `}`

167.      `/**`
168.       `* Unmutes this chat`
169.       `* @returns {Promise&lt;{isMuted: boolean, muteExpiration: number}>}`
170.       `*/`
171.      `async unmute() {`
172.          `const result = await this.client.unmuteChat(this.id._serialized);`
173.          `this.isMuted = result.isMuted;`
174.          `this.muteExpiration = result.muteExpiration;`
175.          `return result;`
176.      `}`

178.      `/**`
179.       `* Mark this chat as unread`
180.       `*/`
181.      `async markUnread(){`
182.          `return this.client.markChatUnread(this.id._serialized);`
183.      `}`

185.      `/**`
186.       `* Loads chat messages, sorted from earliest to latest.`
187.       `* @param {Object} searchOptions Options for searching messages. Right now only limit and fromMe is supported.`
188.       `* @param {Number} [searchOptions.limit] The amount of messages to return. If no limit is specified, the available messages will be returned. Note that the actual number of returned messages may be smaller if there aren't enough messages in the conversation. Set this to Infinity to load all messages.`
189.       `* @param {Boolean} [searchOptions.fromMe] Return only messages from the bot number or vise versa. To get all messages, leave the option undefined.`
190.       `* @returns {Promise&lt;Array&lt;Message>>}`
191.       `*/`
192.      `async fetchMessages(searchOptions) {`
193.          `let messages = await this.client.pupPage.evaluate(async (chatId, searchOptions) => {`
194.              `const msgFilter = (m) => {`
195.                  `if (m.isNotification) {`
196.                      `return false; // dont include notification messages`
197.                  `}`
198.                  `if (searchOptions &amp;&amp; searchOptions.fromMe !== undefined &amp;&amp; m.id.fromMe !== searchOptions.fromMe) {`
199.                      `return false;`
200.                  `}`
201.                  `return true;`
202.              `};`

204.              `const chat = await window.WWebJS.getChat(chatId, { getAsModel: false });`
205.              `let msgs = chat.msgs.getModelsArray().filter(msgFilter);`

207.              `if (searchOptions &amp;&amp; searchOptions.limit > 0) {`
208.                  `while (msgs.length &lt; searchOptions.limit) {`
209.                      `const loadedMessages = await window.Store.ConversationMsgs.loadEarlierMsgs(chat);`
210.                      `if (!loadedMessages || !loadedMessages.length) break;`
211.                      `msgs = [...loadedMessages.filter(msgFilter), ...msgs];`
212.                  `}`

214.                  `if (msgs.length > searchOptions.limit) {`
215.                      `msgs.sort((a, b) => (a.t > b.t) ? 1 : -1);`
216.                      `msgs = msgs.splice(msgs.length - searchOptions.limit);`
217.                  `}`
218.              `}`

220.              `return msgs.map(m => window.WWebJS.getMessageModel(m));`

222.          `}, this.id._serialized, searchOptions);`

224.          `return messages.map(m => new Message(this.client, m));`
225.      `}`

227.      `/**`
228.       `* Simulate typing in chat. This will last for 25 seconds.`
229.       `*/`
230.      `async sendStateTyping() {`
231.          `return this.client.pupPage.evaluate(chatId => {`
232.              `window.WWebJS.sendChatstate('typing', chatId);`
233.              `return true;`
234.          `}, this.id._serialized);`
235.      `}`

237.      `/**`
238.       `* Simulate recording audio in chat. This will last for 25 seconds.`
239.       `*/`
240.      `async sendStateRecording() {`
241.          `return this.client.pupPage.evaluate(chatId => {`
242.              `window.WWebJS.sendChatstate('recording', chatId);`
243.              `return true;`
244.          `}, this.id._serialized);`
245.      `}`

247.      `/**`
248.       `* Stops typing or recording in chat immediately.`
249.       `*/`
250.      `async clearState() {`
251.          `return this.client.pupPage.evaluate(chatId => {`
252.              `window.WWebJS.sendChatstate('stop', chatId);`
253.              `return true;`
254.          `}, this.id._serialized);`
255.      `}`

257.      `/**`
258.       `* Returns the Contact that corresponds to this Chat.`
259.       `* @returns {Promise&lt;Contact>}`
260.       `*/`
261.      `async getContact() {`
262.          `return await this.client.getContactById(this.id._serialized);`
263.      `}`

265.      `/**`
266.       `* Returns array of all Labels assigned to this Chat`
267.       `* @returns {Promise&lt;Array&lt;Label>>}`
268.       `*/`
269.      `async getLabels() {`
270.          `return this.client.getChatLabels(this.id._serialized);`
271.      `}`

273.      `/**`
274.       `* Add or remove labels to this Chat`
275.       `* @param {Array&lt;number|string>} labelIds`
276.       `* @returns {Promise&lt;void>}`
277.       `*/`
278.      `async changeLabels(labelIds) {`
279.          `return this.client.addOrRemoveLabels(labelIds, [this.id._serialized]);`
280.      `}`

282.      `/**`
283.       `* Gets instances of all pinned messages in a chat`
284.       `* @returns {Promise&lt;Array&lt;Message>>}`
285.       `*/`
286.      `async getPinnedMessages() {`
287.          `return this.client.getPinnedMessages(this.id._serialized);`
288.      `}`

290.      `/**`
291.       `* Sync chat history conversation`
292.       `* @return {Promise&lt;boolean>} True if operation completed successfully, false otherwise.`
293.       `*/`
294.      `async syncHistory() {`
295.          `return this.client.syncHistory(this.id._serialized);`
296.      `}`

298.      `/**`
299.       `* Add or edit a customer note`
300.       `* @see https://faq.whatsapp.com/1433099287594476`
301.       `* @param {string} note The note to add`
302.       `* @returns {Promise&lt;void>}`
303.       `*/`
304.      `async addOrEditCustomerNote(note) {`
305.          `if (this.isGroup || this.isChannel) return;`

307.          `return this.client.addOrEditCustomerNote(this.id._serialized, note);`
308.      `}`

310.      `/**`
311.       `* Get a customer note`
312.       `* @see https://faq.whatsapp.com/1433099287594476`
313.       `* @returns {Promise&lt;{`
314.       `*    chatId: string,`
315.       `*    content: string,`
316.       `*    createdAt: number,`
317.       `*    id: string,`
318.       `*    modifiedAt: number,`
319.       `*    type: string`
320.       `* }>}`
321.       `*/`
322.      `async getCustomerNote() {`
323.          `if (this.isGroup || this.isChannel) return null;`

325.          `return this.client.getCustomerNote(this.id._serialized);`
326.      `}`
327.  `}`

329.  `module.exports = Chat;`

--- END OF FILE: structures_ClientInfo.js.html#source-line-9.md ---
--- START OF FILE: structures_ClientInfo.js.html#source-line-9.md ---

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

--- END OF FILE: structures_Contact.js.html#source-line-17.md ---
--- START OF FILE: structures_Contact.js.html#source-line-17.md ---

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

--- END OF FILE: structures_GroupChat.js.html#source-line-17.md ---
--- START OF FILE: structures_GroupChat.js.html#source-line-17.md ---

Source: https://docs.wwebjs.dev/structures_GroupChat.js.html#source-line-17

1.  `'use strict';`

3.  `const Chat = require('./Chat');`

5.  `/**`
6.   `* Group participant information`
7.   `* @typedef {Object} GroupParticipant`
8.   `* @property {ContactId} id`
9.   `* @property {boolean} isAdmin`
10.   `* @property {boolean} isSuperAdmin`
11.   `*/`

13.  `/**`
14.   `* Represents a Group Chat on WhatsApp`
15.   `* @extends {Chat}`
16.   `*/`
17.  `class GroupChat extends Chat {`
18.      `_patch(data) {`
19.          `this.groupMetadata = data.groupMetadata;`

21.          `return super._patch(data);`
22.      `}`

24.      `/**`
25.       `* Gets the group owner`
26.       `* @type {ContactId}`
27.       `*/`
28.      `get owner() {`
29.          `return this.groupMetadata.owner;`
30.      `}`

32.      `/**`
33.       `* Gets the date at which the group was created`
34.       `* @type {date}`
35.       `*/`
36.      `get createdAt() {`
37.          `return new Date(this.groupMetadata.creation * 1000);`
38.      `}`

40.      `/**` 
41.       `* Gets the group description`
42.       `* @type {string}`
43.       `*/`
44.      `get description() {`
45.          `return this.groupMetadata.desc;`
46.      `}`

48.      `/**`
49.       `* Gets the group participants`
50.       `* @type {Array&lt;GroupParticipant>}`
51.       `*/`
52.      `get participants() {`
53.          `return this.groupMetadata.participants;`
54.      `}`

56.      `/**`
57.       `* An object that handles the result for {@link addParticipants} method`
58.       `* @typedef {Object} AddParticipantsResult`
59.       `* @property {number} code The code of the result`
60.       `* @property {string} message The result message`
61.       `* @property {boolean} isInviteV4Sent Indicates if the inviteV4 was sent to the partitipant`
62.       `*/`

64.      `/**`
65.       `* An object that handles options for adding participants`
66.       `* @typedef {Object} AddParticipnatsOptions`
67.       `* @property {Array&lt;number>|number} [sleep = [250, 500]] The number of milliseconds to wait before adding the next participant. If it is an array, a random sleep time between the sleep[0] and sleep[1] values will be added (the difference must be >=100 ms, otherwise, a random sleep time between sleep[1] and sleep[1] + 100 will be added). If sleep is a number, a sleep time equal to its value will be added. By default, sleep is an array with a value of [250, 500]`
68.       `* @property {boolean} [autoSendInviteV4 = true] If true, the inviteV4 will be sent to those participants who have restricted others from being automatically added to groups, otherwise the inviteV4 won't be sent (true by default)`
69.       `* @property {string} [comment = ''] The comment to be added to an inviteV4 (empty string by default)`
70.       `*/`

72.      `/**`
73.       `* Adds a list of participants by ID to the group`
74.       `* @param {string|Array&lt;string>} participantIds` 
75.       `* @param {AddParticipnatsOptions} options An object thay handles options for adding participants`
76.       `* @returns {Promise&lt;Object.&lt;string, AddParticipantsResult>|string>} Returns an object with the resulting data or an error message as a string`
77.       `*/`
78.      `async addParticipants(participantIds, options = {}) {`
79.          `return await this.client.pupPage.evaluate(async (groupId, participantIds, options) => {`
80.              `const { sleep = [250, 500], autoSendInviteV4 = true, comment = '' } = options;`
81.              `const participantData = {};`

83.              `!Array.isArray(participantIds) &amp;&amp; (participantIds = [participantIds]);`
84.              `const groupWid = window.Store.WidFactory.createWid(groupId);`
85.              `const group = window.Store.Chat.get(groupWid) || (await window.Store.Chat.find(groupWid));`
86.              `const participantWids = participantIds.map((p) => window.Store.WidFactory.createWid(p));`

88.              `const errorCodes = {`
89.                  `default: 'An unknown error occupied while adding a participant',`
90.                  `isGroupEmpty: 'AddParticipantsError: The participant can\'t be added to an empty group',`
91.                  `iAmNotAdmin: 'AddParticipantsError: You have no admin rights to add a participant to a group',`
92.                  `200: 'The participant was added successfully',`
93.                  `403: 'The participant can be added by sending private invitation only',`
94.                  `404: 'The phone number is not registered on WhatsApp',`
95.                  `408: 'You cannot add this participant because they recently left the group',`
96.                  `409: 'The participant is already a group member',`
97.                  `417: 'The participant can\'t be added to the community. You can invite them privately to join this group through its invite link',`
98.                  `419: 'The participant can\'t be added because the group is full'`
99.              `};`

101.              `await window.Store.GroupQueryAndUpdate({ id: groupId });`

103.              `let groupParticipants = group.groupMetadata?.participants.serialize();`

105.              `if (!groupParticipants) {`
106.                  `return errorCodes.isGroupEmpty;`
107.              `}`

109.              `if (!group.iAmAdmin()) {`
110.                  `return errorCodes.iAmNotAdmin;`
111.              `}`

113.              `groupParticipants.map(({ id }) => {`
114.                  `return id.server === 'lid' ? window.Store.LidUtils.getPhoneNumber(id) : id;`
115.              `});`

117.              `const _getSleepTime = (sleep) => {`
118.                  `if (!Array.isArray(sleep) || sleep.length === 2 &amp;&amp; sleep[0] === sleep[1]) {`
119.                      `return sleep;`
120.                  `}`
121.                  `if (sleep.length === 1) {`
122.                      `return sleep[0];`
123.                  `}`
124.                  `(sleep[1] - sleep[0]) &lt; 100 &amp;&amp; (sleep[0] = sleep[1]) &amp;&amp; (sleep[1] += 100);`
125.                  `return Math.floor(Math.random() * (sleep[1] - sleep[0] + 1)) + sleep[0];`
126.              `};`

128.              `for (let pWid of participantWids) {`
129.                  `const pId = pWid._serialized;`
130.                  `pWid = pWid.server === 'lid' ? window.Store.LidUtils.getPhoneNumber(pWid) : pWid;`

132.                  `participantData[pId] = {`
133.                      `code: undefined,`
134.                      `message: undefined,`
135.                      `isInviteV4Sent: false`
136.                  `};`

138.                  `if (groupParticipants.some(p => p._serialized === pId)) {`
139.                      `participantData[pId].code = 409;`
140.                      `participantData[pId].message = errorCodes[409];`
141.                      `continue;`
142.                  `}`

144.                  `if (!(await window.Store.QueryExist(pWid))?.wid) {`
145.                      `participantData[pId].code = 404;`
146.                      `participantData[pId].message = errorCodes[404];`
147.                      `continue;`
148.                  `}`

150.                  `const rpcResult =`
151.                      `await window.WWebJS.getAddParticipantsRpcResult(groupWid, pWid);`
152.                  `const { code: rpcResultCode } = rpcResult;`

154.                  `participantData[pId].code = rpcResultCode;`
155.                  `participantData[pId].message =`
156.                      `errorCodes[rpcResultCode] || errorCodes.default;`

158.                  `if (autoSendInviteV4 &amp;&amp; rpcResultCode === 403) {`
159.                      `let userChat, isInviteV4Sent = false;`
160.                      `window.Store.Contact.gadd(pWid, { silent: true });`

162.                      `if (rpcResult.name === 'ParticipantRequestCodeCanBeSent' &amp;&amp;`
163.                          `(userChat = window.Store.Chat.get(pWid) || (await window.Store.Chat.find(pWid)))) {`
164.                          `const groupName = group.formattedTitle || group.name;`
165.                          `const res = await window.Store.GroupInviteV4.sendGroupInviteMessage(`
166.                              `userChat,`
167.                              `group.id._serialized,`
168.                              `groupName,`
169.                              `rpcResult.inviteV4Code,`
170.                              `rpcResult.inviteV4CodeExp,`
171.                              `comment,`
172.                              `await window.WWebJS.getProfilePicThumbToBase64(groupWid)`
173.                          `);`
174.                          `isInviteV4Sent = res.messageSendResult === 'OK';`
175.                      `}`

177.                      `participantData[pId].isInviteV4Sent = isInviteV4Sent;`
178.                  `}`

180.                  `sleep &amp;&amp;`
181.                      `participantWids.length > 1 &amp;&amp;`
182.                      `participantWids.indexOf(pWid) !== participantWids.length - 1 &amp;&amp;`
183.                      `(await new Promise((resolve) => setTimeout(resolve, _getSleepTime(sleep))));`
184.              `}`

186.              `return participantData;`
187.          `}, this.id._serialized, participantIds, options);`
188.      `}`

190.      `/**`
191.       `* Removes a list of participants by ID to the group`
192.       `* @param {Array&lt;string>} participantIds` 
193.       `* @returns {Promise&lt;{ status: number }>}`
194.       `*/`
195.      `async removeParticipants(participantIds) {`
196.          `return await this.client.pupPage.evaluate(async (chatId, participantIds) => {`
197.              `const chat = await window.WWebJS.getChat(chatId, { getAsModel: false });`
198.              `const participants = (await Promise.all(participantIds.map(async p => {`
199.                  `const { lid, phone } = await window.WWebJS.enforceLidAndPnRetrieval(p);`

201.                  `return chat.groupMetadata.participants.get(lid?._serialized) ||`
202.                      `chat.groupMetadata.participants.get(phone?._serialized);`
203.              `}))).filter(Boolean);`
204.              `await window.Store.GroupParticipants.removeParticipants(chat, participants);`
205.              `return { status: 200 };`
206.          `}, this.id._serialized, participantIds);`
207.      `}`

209.      `/**`
210.       `* Promotes participants by IDs to admins`
211.       `* @param {Array&lt;string>} participantIds` 
212.       `* @returns {Promise&lt;{ status: number }>} Object with status code indicating if the operation was successful`
213.       `*/`
214.      `async promoteParticipants(participantIds) {`
215.          `return await this.client.pupPage.evaluate(async (chatId, participantIds) => {`
216.              `const chat = await window.WWebJS.getChat(chatId, { getAsModel: false });`
217.              `const participants = (await Promise.all(participantIds.map(async p => {`
218.                  `const { lid, phone } = await window.WWebJS.enforceLidAndPnRetrieval(p);`

220.                  `return chat.groupMetadata.participants.get(lid?._serialized) ||`
221.                      `chat.groupMetadata.participants.get(phone?._serialized);`
222.              `}))).filter(Boolean);`
223.              `await window.Store.GroupParticipants.promoteParticipants(chat, participants);`
224.              `return { status: 200 };`
225.          `}, this.id._serialized, participantIds);`
226.      `}`

228.      `/**`
229.       `* Demotes participants by IDs to regular users`
230.       `* @param {Array&lt;string>} participantIds` 
231.       `* @returns {Promise&lt;{ status: number }>} Object with status code indicating if the operation was successful`
232.       `*/`
233.      `async demoteParticipants(participantIds) {`
234.          `return await this.client.pupPage.evaluate(async (chatId, participantIds) => {`
235.              `const chat = await window.WWebJS.getChat(chatId, { getAsModel: false });`
236.              `const participants = (await Promise.all(participantIds.map(async p => {`
237.                  `const { lid, phone } = await window.WWebJS.enforceLidAndPnRetrieval(p);`

239.                  `return chat.groupMetadata.participants.get(lid?._serialized) ||`
240.                      `chat.groupMetadata.participants.get(phone?._serialized);`
241.              `}))).filter(Boolean);`
242.              `await window.Store.GroupParticipants.demoteParticipants(chat, participants);`
243.              `return { status: 200 };`
244.          `}, this.id._serialized, participantIds);`
245.      `}`

247.      `/**`
248.       `* Updates the group subject`
249.       `* @param {string} subject` 
250.       `* @returns {Promise&lt;boolean>} Returns true if the subject was properly updated. This can return false if the user does not have the necessary permissions.`
251.       `*/`
252.      `async setSubject(subject) {`
253.          `const success = await this.client.pupPage.evaluate(async (chatId, subject) => {`
254.              `const chatWid = window.Store.WidFactory.createWid(chatId);`
255.              `try {`
256.                  `await window.Store.GroupUtils.setGroupSubject(chatWid, subject);`
257.                  `return true;`
258.              `} catch (err) {`
259.                  `if(err.name === 'ServerStatusCodeError') return false;`
260.                  `throw err;`
261.              `}`
262.          `}, this.id._serialized, subject);`

264.          `if(!success) return false;`
265.          `this.name = subject;`
266.          `return true;`
267.      `}`

269.      `/**`
270.       `* Updates the group description`
271.       `* @param {string} description` 
272.       `* @returns {Promise&lt;boolean>} Returns true if the description was properly updated. This can return false if the user does not have the necessary permissions.`
273.       `*/`
274.      `async setDescription(description) {`
275.          `const success = await this.client.pupPage.evaluate(async (chatId, description) => {`
276.              `const chatWid = window.Store.WidFactory.createWid(chatId);`
277.              `let descId = window.Store.GroupMetadata.get(chatWid).descId;`
278.              `let newId = await window.Store.MsgKey.newId();`
279.              `try {`
280.                  `await window.Store.GroupUtils.setGroupDescription(chatWid, description, newId, descId);`
281.                  `return true;`
282.              `} catch (err) {`
283.                  `if(err.name === 'ServerStatusCodeError') return false;`
284.                  `throw err;`
285.              `}`
286.          `}, this.id._serialized, description);`

288.          `if(!success) return false;`
289.          `this.groupMetadata.desc = description;`
290.          `return true;`
291.      `}`

293.      `/**`
294.       `* Updates the group setting to allow only admins to add members to the group.`
295.       `* @param {boolean} [adminsOnly=true] Enable or disable this option` 
296.       `* @returns {Promise&lt;boolean>} Returns true if the setting was properly updated. This can return false if the user does not have the necessary permissions.`
297.       `*/`
298.      `async setAddMembersAdminsOnly(adminsOnly=true) {`
299.          `const success = await this.client.pupPage.evaluate(async (groupId, adminsOnly) => {`
300.              `const chat = await window.WWebJS.getChat(groupId, { getAsModel: false });`
301.              `try {`
302.                  `await window.Store.GroupUtils.setGroupProperty(chat, 'member_add_mode', adminsOnly ? 0 : 1);`
303.                  `return true;`
304.              `} catch (err) {`
305.                  `if(err.name === 'ServerStatusCodeError') return false;`
306.                  `throw err;`
307.              `}`
308.          `}, this.id._serialized, adminsOnly);`

310.          `success &amp;&amp; (this.groupMetadata.memberAddMode = adminsOnly ? 'admin_add' : 'all_member_add');`
311.          `return success;`
312.      `}`

314.      `/**`
315.       `* Updates the group settings to only allow admins to send messages.`
316.       `* @param {boolean} [adminsOnly=true] Enable or disable this option` 
317.       `* @returns {Promise&lt;boolean>} Returns true if the setting was properly updated. This can return false if the user does not have the necessary permissions.`
318.       `*/`
319.      `async setMessagesAdminsOnly(adminsOnly=true) {`
320.          `const success = await this.client.pupPage.evaluate(async (chatId, adminsOnly) => {`
321.              `const chat = await window.WWebJS.getChat(chatId, { getAsModel: false });`
322.              `try {`
323.                  `await window.Store.GroupUtils.setGroupProperty(chat, 'announcement', adminsOnly ? 1 : 0);`
324.                  `return true;`
325.              `} catch (err) {`
326.                  `if(err.name === 'ServerStatusCodeError') return false;`
327.                  `throw err;`
328.              `}`
329.          `}, this.id._serialized, adminsOnly);`

331.          `if(!success) return false;`

333.          `this.groupMetadata.announce = adminsOnly;`
334.          `return true;`
335.      `}`

337.      `/**`
338.       `* Updates the group settings to only allow admins to edit group info (title, description, photo).`
339.       `* @param {boolean} [adminsOnly=true] Enable or disable this option` 
340.       `* @returns {Promise&lt;boolean>} Returns true if the setting was properly updated. This can return false if the user does not have the necessary permissions.`
341.       `*/`
342.      `async setInfoAdminsOnly(adminsOnly=true) {`
343.          `const success = await this.client.pupPage.evaluate(async (chatId, adminsOnly) => {`
344.              `const chat = await window.WWebJS.getChat(chatId, { getAsModel: false });`
345.              `try {`
346.                  `await window.Store.GroupUtils.setGroupProperty(chat, 'restrict', adminsOnly ? 1 : 0);`
347.                  `return true;`
348.              `} catch (err) {`
349.                  `if(err.name === 'ServerStatusCodeError') return false;`
350.                  `throw err;`
351.              `}`
352.          `}, this.id._serialized, adminsOnly);`

354.          `if(!success) return false;`

356.          `this.groupMetadata.restrict = adminsOnly;`
357.          `return true;`
358.      `}`

360.      `/**`
361.       `* Deletes the group's picture.`
362.       `* @returns {Promise&lt;boolean>} Returns true if the picture was properly deleted. This can return false if the user does not have the necessary permissions.`
363.       `*/`
364.      `async deletePicture() {`
365.          `const success = await this.client.pupPage.evaluate((chatid) => {`
366.              `return window.WWebJS.deletePicture(chatid);`
367.          `}, this.id._serialized);`

369.          `return success;`
370.      `}`

372.      `/**`
373.       `* Sets the group's picture.`
374.       `* @param {MessageMedia} media`
375.       `* @returns {Promise&lt;boolean>} Returns true if the picture was properly updated. This can return false if the user does not have the necessary permissions.`
376.       `*/`
377.      `async setPicture(media) {`
378.          `const success = await this.client.pupPage.evaluate((chatid, media) => {`
379.              `return window.WWebJS.setPicture(chatid, media);`
380.          `}, this.id._serialized, media);`

382.          `return success;`
383.      `}`

385.      `/**`
386.       `* Gets the invite code for a specific group`
387.       `* @returns {Promise&lt;string>} Group's invite code`
388.       `*/`
389.      `async getInviteCode() {`
390.          `const codeRes = await this.client.pupPage.evaluate(async chatId => {`
391.              `const chatWid = window.Store.WidFactory.createWid(chatId);`
392.              `try {`
393.                  `return window.compareWwebVersions(window.Debug.VERSION, '>=', '2.3000.1020730154')`
394.                      `? await window.Store.GroupInvite.fetchMexGroupInviteCode(chatId)`
395.                      `: await window.Store.GroupInvite.queryGroupInviteCode(chatWid, true);`
396.              `}`
397.              `catch (err) {`
398.                  `if(err.name === 'ServerStatusCodeError') return undefined;`
399.                  `throw err;`
400.              `}`
401.          `}, this.id._serialized);`

403.          `return codeRes?.code`
404.              `? codeRes?.code`
405.              `: codeRes;`
406.      `}`

408.      `/**`
409.       `* Invalidates the current group invite code and generates a new one`
410.       `* @returns {Promise&lt;string>} New invite code`
411.       `*/`
412.      `async revokeInvite() {`
413.          `const codeRes = await this.client.pupPage.evaluate(chatId => {`
414.              `const chatWid = window.Store.WidFactory.createWid(chatId);`
415.              `return window.Store.GroupInvite.resetGroupInviteCode(chatWid);`
416.          `}, this.id._serialized);`

418.          `return codeRes.code;`
419.      `}`

421.      `/**`
422.       `* An object that handles the information about the group membership request`
423.       `* @typedef {Object} GroupMembershipRequest`
424.       `* @property {Object} id The wid of a user who requests to enter the group`
425.       `* @property {Object} addedBy The wid of a user who created that request`
426.       `* @property {Object|null} parentGroupId The wid of a community parent group to which the current group is linked`
427.       `* @property {string} requestMethod The method used to create the request: NonAdminAdd/InviteLink/LinkedGroupJoin`
428.       `* @property {number} t The timestamp the request was created at`
429.       `*/`

431.      `/**`
432.       `* Gets an array of membership requests`
433.       `* @returns {Promise&lt;Array&lt;GroupMembershipRequest>>} An array of membership requests`
434.       `*/`
435.      `async getGroupMembershipRequests() {`
436.          `return await this.client.getGroupMembershipRequests(this.id._serialized);`
437.      `}`

439.      `/**`
440.       `* An object that handles the result for membership request action`
441.       `* @typedef {Object} MembershipRequestActionResult`
442.       `* @property {string} requesterId User ID whos membership request was approved/rejected`
443.       `* @property {number} error An error code that occurred during the operation for the participant`
444.       `* @property {string} message A message with a result of membership request action`
445.       `*/`

447.      `/**`
448.       `* An object that handles options for {@link approveGroupMembershipRequests} and {@link rejectGroupMembershipRequests} methods`
449.       `* @typedef {Object} MembershipRequestActionOptions`
450.       `* @property {Array&lt;string>|string|null} requesterIds User ID/s who requested to join the group, if no value is provided, the method will search for all membership requests for that group`
451.       `* @property {Array&lt;number>|number|null} sleep The number of milliseconds to wait before performing an operation for the next requester. If it is an array, a random sleep time between the sleep[0] and sleep[1] values will be added (the difference must be >=100 ms, otherwise, a random sleep time between sleep[1] and sleep[1] + 100 will be added). If sleep is a number, a sleep time equal to its value will be added. By default, sleep is an array with a value of [250, 500]`
452.       `*/`

454.      `/**`
455.       `* Approves membership requests if any`
456.       `* @param {MembershipRequestActionOptions} options Options for performing a membership request action`
457.       `* @returns {Promise&lt;Array&lt;MembershipRequestActionResult>>} Returns an array of requester IDs whose membership requests were approved and an error for each requester, if any occurred during the operation. If there are no requests, an empty array will be returned`
458.       `*/`
459.      `async approveGroupMembershipRequests(options = {}) {`
460.          `return await this.client.approveGroupMembershipRequests(this.id._serialized, options);`
461.      `}`

463.      `/**`
464.       `* Rejects membership requests if any`
465.       `* @param {MembershipRequestActionOptions} options Options for performing a membership request action`
466.       `* @returns {Promise&lt;Array&lt;MembershipRequestActionResult>>} Returns an array of requester IDs whose membership requests were rejected and an error for each requester, if any occurred during the operation. If there are no requests, an empty array will be returned`
467.       `*/`
468.      `async rejectGroupMembershipRequests(options = {}) {`
469.          `return await this.client.rejectGroupMembershipRequests(this.id._serialized, options);`
470.      `}`

472.      `/**`
473.       `* Makes the bot leave the group`
474.       `* @returns {Promise}`
475.       `*/`
476.      `async leave() {`
477.          `await this.client.pupPage.evaluate(async chatId => {`
478.              `const chat = await window.WWebJS.getChat(chatId, { getAsModel: false });`
479.              `return window.Store.GroupUtils.sendExitGroup(chat);`
480.          `}, this.id._serialized);`
481.      `}`

483.  `}`

485.  `module.exports = GroupChat;`

--- END OF FILE: structures_GroupNotification.js.html#source-line-9.md ---
--- START OF FILE: structures_GroupNotification.js.html#source-line-9.md ---

Source: https://docs.wwebjs.dev/structures_GroupNotification.js.html#source-line-9

1.  `'use strict';`

3.  `const Base = require('./Base');`

5.  `/**`
6.   `* Represents a GroupNotification on WhatsApp`
7.   `* @extends {Base}`
8.   `*/`
9.  `class GroupNotification extends Base {`
10.      `constructor(client, data) {`
11.          `super(client);`

13.          `if(data) this._patch(data);`
14.      `}`

16.      `_patch(data) {`
17.          `/**`
18.           `* ID that represents the groupNotification`
19.           `* @type {object}`
20.           `*/`
21.          `this.id = data.id;`

23.          `/**`
24.           `* Extra content`
25.           `* @type {string}`
26.           `*/`
27.          `this.body = data.body || '';`

29.          `/**` 
30.           `* GroupNotification type`
31.           `* @type {GroupNotificationTypes}`
32.           `*/`
33.          `this.type = data.subtype;`

35.          `/**`
36.           `* Unix timestamp for when the groupNotification was created`
37.           `* @type {number}`
38.           `*/`
39.          `this.timestamp = data.t;`

41.          `/**`
42.           `* ID for the Chat that this groupNotification was sent for.`
43.           `*` 
44.           `* @type {string}`
45.           `*/`
46.          `this.chatId = typeof (data.id.remote) === 'object' ? data.id.remote._serialized : data.id.remote;`

48.          `/**`
49.           `* ContactId for the user that produced the GroupNotification.`
50.           `* @type {string}`
51.           `*/`
52.          `this.author = typeof (data.author) === 'object' ? data.author._serialized : data.author;`

54.          `/**`
55.           `* Contact IDs for the users that were affected by this GroupNotification.`
56.           `* @type {Array&lt;string>}`
57.           `*/`
58.          `this.recipientIds = [];`

60.          `if (data.recipients) {`
61.              `this.recipientIds = data.recipients;`
62.          `}`

64.          `return super._patch(data);`
65.      `}`

67.      `/**`
68.       `* Returns the Chat this groupNotification was sent in`
69.       `* @returns {Promise&lt;Chat>}`
70.       `*/`
71.      `getChat() {`
72.          `return this.client.getChatById(this.chatId);`
73.      `}`

75.      `/**`
76.       `* Returns the Contact this GroupNotification was produced by`
77.       `* @returns {Promise&lt;Contact>}`
78.       `*/`
79.      `getContact() {`
80.          `return this.client.getContactById(this.author);`
81.      `}`

83.      `/**`
84.       `* Returns the Contacts affected by this GroupNotification.`
85.       `* @returns {Promise&lt;Array&lt;Contact>>}`
86.       `*/`
87.      `async getRecipients() {`
88.          `return await Promise.all(this.recipientIds.map(async m => await this.client.getContactById(m)));`
89.      `}`

91.      `/**`
92.       `* Sends a message to the same chat this GroupNotification was produced in.`
93.       `*` 
94.       `* @param {string|MessageMedia|Location} content` 
95.       `* @param {object} options`
96.       `* @returns {Promise&lt;Message>}`
97.       `*/`
98.      `async reply(content, options={}) {`
99.          `return this.client.sendMessage(this.chatId, content, options);`
100.      `}`

102.  `}`

104.  `module.exports = GroupNotification;`

--- END OF FILE: structures_Label.js.html#source-line-10.md ---
--- START OF FILE: structures_Label.js.html#source-line-10.md ---

Source: https://docs.wwebjs.dev/structures_Label.js.html#source-line-10

1.  `'use strict';`

3.  `const Base = require('./Base');`
4.  `// eslint-disable-next-line no-unused-vars`
5.  `const Chat = require('./Chat');`

7.  `/**`
8.   `* WhatsApp Business Label information`
9.   `*/`
10.  `class Label extends Base {`
11.      `/**`
12.       `* @param {Base} client`
13.       `* @param {object} labelData`
14.       `*/`
15.      `constructor(client, labelData){`
16.          `super(client);`

18.          `if(labelData) this._patch(labelData);`
19.      `}`

21.      `_patch(labelData){`
22.          `/**`
23.           `* Label ID`
24.           `* @type {string}`
25.           `*/`
26.          `this.id = labelData.id;`

28.          `/**`
29.           `* Label name`
30.           `* @type {string}`
31.           `*/`
32.          `this.name = labelData.name;`

34.          `/**`
35.           `* Label hex color`
36.           `* @type {string}`
37.           `*/`
38.          `this.hexColor = labelData.hexColor;`
39.      `}`
40.      `/**`
41.       `* Get all chats that have been assigned this Label`
42.       `* @returns {Promise&lt;Array&lt;Chat>>}`
43.       `*/`
44.      `async getChats(){`
45.          `return this.client.getChatsByLabelId(this.id);`
46.      `}`

48.  `}`

50.  `module.exports = Label;`

--- END OF FILE: structures_List.js.html#source-line-8.md ---
--- START OF FILE: structures_List.js.html#source-line-8.md ---

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

--- END OF FILE: structures_Location.js.html#source-line-15.md ---
--- START OF FILE: structures_Location.js.html#source-line-15.md ---

Source: https://docs.wwebjs.dev/structures_Location.js.html#source-line-15

1.  `'use strict';`

3.  `/**`
4.   `* Location send options`
5.   `* @typedef {Object} LocationSendOptions`
6.   `* @property {string} [name] Location name`
7.   `* @property {string} [address] Location address`
8.   `* @property {string} [url] URL address to be shown within a location message`
9.   `* @property {string} [description] Location full description`
10.   `*/`

12.  `/**`
13.   `* Location information`
14.   `*/`
15.  `class Location {`
16.      `/**`
17.       `* @param {number} latitude`
18.       `* @param {number} longitude`
19.       `* @param {LocationSendOptions} [options] Location send options`
20.       `*/`
21.      `constructor(latitude, longitude, options = {}) {`
22.          `/**`
23.           `* Location latitude`
24.           `* @type {number}`
25.           `*/`
26.          `this.latitude = latitude;`

28.          `/**`
29.           `* Location longitude`
30.           `* @type {number}`
31.           `*/`
32.          `this.longitude = longitude;`

34.          `/**`
35.           `* Name for the location`
36.           `* @type {string|undefined}`
37.           `*/`
38.          `this.name = options.name;`

40.          `/**`
41.           `* Location address`
42.           `* @type {string|undefined}`
43.           `*/`
44.          `this.address = options.address;`

46.          `/**`
47.           `* URL address to be shown within a location message`
48.           `* @type {string|undefined}`
49.           `*/`
50.          `this.url = options.url;`

52.          `/**`
53.           `* Location full description`
54.           `* @type {string|undefined}`
55.           `*/`
56.          `this.description = this.name &amp;&amp; this.address`
57.              `` ? `${this.name}\n${this.address}` ``
58.              `: this.name || this.address || '';`
59.      `}`
60.  `}`

62.  `module.exports = Location;`

--- END OF FILE: structures_Message.js.html#source-line-17.md ---
--- START OF FILE: structures_Message.js.html#source-line-17.md ---

Source: https://docs.wwebjs.dev/structures_Message.js.html#source-line-17

1.  `'use strict';`

3.  `const Base = require('./Base');`
4.  `const MessageMedia = require('./MessageMedia');`
5.  `const Location = require('./Location');`
6.  `const Order = require('./Order');`
7.  `const Payment = require('./Payment');`
8.  `const Reaction = require('./Reaction');`
9.  `const Contact = require('./Contact');`
10.  `const ScheduledEvent = require('./ScheduledEvent'); // eslint-disable-line no-unused-vars`
11.  `const { MessageTypes } = require('../util/Constants');`

13.  `/**`
14.   `* Represents a Message on WhatsApp`
15.   `* @extends {Base}`
16.   `*/`
17.  `class Message extends Base {`
18.      `constructor(client, data) {`
19.          `super(client);`

21.          `if (data) this._patch(data);`
22.      `}`

24.      `_patch(data) {`
25.          `this._data = data;`

27.          `/**`
28.           `* MediaKey that represents the sticker 'ID'`
29.           `* @type {string}`
30.           `*/`
31.          `this.mediaKey = data.mediaKey;`

33.          `/**`
34.           `* ID that represents the message`
35.           `* @type {object}`
36.           `*/`
37.          `this.id = data.id;`

39.          `/**`
40.           `* ACK status for the message`
41.           `* @type {MessageAck}`
42.           `*/`
43.          `this.ack = data.ack;`

45.          `/**`
46.           `* Indicates if the message has media available for download`
47.           `* @type {boolean}`
48.           `*/`
49.          `this.hasMedia = Boolean(data.directPath);`

51.          `/**`
52.           `* Message content`
53.           `* @type {string}`
54.           `*/`
55.          `this.body = this.hasMedia ? data.caption || '' : data.body || data.pollName || data.eventName || '';`

57.          `/**`
58.           `* Message type`
59.           `* @type {MessageTypes}`
60.           `*/`
61.          `this.type = data.type;`

63.          `/**`
64.           `* Unix timestamp for when the message was created`
65.           `* @type {number}`
66.           `*/`
67.          `this.timestamp = data.t;`

69.          `/**`
70.           `* ID for the Chat that this message was sent to, except if the message was sent by the current user.`
71.           `* @type {string}`
72.           `*/`
73.          `this.from = (typeof (data.from) === 'object' &amp;&amp; data.from !== null) ? data.from._serialized : data.from;`

75.          `/**`
76.           `* ID for who this message is for.`
77.           `*`
78.           `* If the message is sent by the current user, it will be the Chat to which the message is being sent.`
79.           `* If the message is sent by another user, it will be the ID for the current user.`
80.           `* @type {string}`
81.           `*/`
82.          `this.to = (typeof (data.to) === 'object' &amp;&amp; data.to !== null) ? data.to._serialized : data.to;`

84.          `/**`
85.           `* If the message was sent to a group, this field will contain the user that sent the message.`
86.           `* @type {string}`
87.           `*/`
88.          `this.author = (typeof (data.author) === 'object' &amp;&amp; data.author !== null) ? data.author._serialized : data.author;`

90.          `/**`
91.           `* String that represents from which device type the message was sent`
92.           `* @type {string}`
93.           `*/`
94.          `this.deviceType = typeof data.id.id === 'string' &amp;&amp; data.id.id.length > 21 ? 'android' : typeof data.id.id === 'string' &amp;&amp; data.id.id.substring(0, 2) === '3A' ? 'ios' : 'web';`
95.          `/**`
96.           `* Indicates if the message was forwarded`
97.           `* @type {boolean}`
98.           `*/`
99.          `this.isForwarded = data.isForwarded;`

101.          `/**`
102.           `* Indicates how many times the message was forwarded.`
103.           `*`
104.           `* The maximum value is 127.`
105.           `* @type {number}`
106.           `*/`
107.          `this.forwardingScore = data.forwardingScore || 0;`

109.          `/**`
110.           `* Indicates if the message is a status update`
111.           `* @type {boolean}`
112.           `*/`
113.          `this.isStatus = data.isStatusV3 || data.id.remote === 'status@broadcast';`

115.          `/**`
116.           `* Indicates if the message was starred`
117.           `* @type {boolean}`
118.           `*/`
119.          `this.isStarred = data.star;`

121.          `/**`
122.           `* Indicates if the message was a broadcast`
123.           `* @type {boolean}`
124.           `*/`
125.          `this.broadcast = data.broadcast;`

127.          `/**`
128.           `* Indicates if the message was sent by the current user`
129.           `* @type {boolean}`
130.           `*/`
131.          `this.fromMe = data.id.fromMe;`

133.          `/**`
134.           `* Indicates if the message was sent as a reply to another message.`
135.           `* @type {boolean}`
136.           `*/`
137.          `this.hasQuotedMsg = data.quotedMsg ? true : false;`

139.          `/**`
140.           `* Indicates whether there are reactions to the message`
141.           `* @type {boolean}`
142.           `*/`
143.          `this.hasReaction = data.hasReaction ? true : false;`

145.          `/**`
146.           `* Indicates the duration of the message in seconds`
147.           `* @type {string}`
148.           `*/`
149.          `this.duration = data.duration ? data.duration : undefined;`

151.          `/**`
152.           `* Location information contained in the message, if the message is type "location"`
153.           `* @type {Location}`
154.           `*/`
155.          `this.location = (() => {`
156.              `if (data.type !== MessageTypes.LOCATION) {`
157.                  `return undefined;`
158.              `}`
159.              `let description;`
160.              `if (data.loc &amp;&amp; typeof data.loc === 'string') {`
161.                  `let splitted = data.loc.split('\n');`
162.                  `description = {`
163.                      `name: splitted[0],`
164.                      `address: splitted[1],`
165.                      `url: data.clientUrl`
166.                  `};`
167.              `}`
168.              `return new Location(data.lat, data.lng, description);`
169.          `})();`

171.          `/**`
172.           `* List of vCards contained in the message.`
173.           `* @type {Array&lt;string>}`
174.           `*/`
175.          `this.vCards = data.type === MessageTypes.CONTACT_CARD_MULTI ? data.vcardList.map((c) => c.vcard) : data.type === MessageTypes.CONTACT_CARD ? [data.body] : [];`

177.          `/**`
178.           `* Group Invite Data`
179.           `* @type {object}`
180.           `*/`
181.          `this.inviteV4 = data.type === MessageTypes.GROUP_INVITE ? {`
182.              `inviteCode: data.inviteCode,`
183.              `inviteCodeExp: data.inviteCodeExp,`
184.              `groupId: data.inviteGrp,`
185.              `groupName: data.inviteGrpName,`
186.              `fromId: typeof data.from === 'object' &amp;&amp; '_serialized' in data.from ? data.from._serialized : data.from,`
187.              `toId: typeof data.to === 'object' &amp;&amp; '_serialized' in data.to ? data.to._serialized : data.to`
188.          `} : undefined;`

190.          `/**`
191.           `* Indicates the mentions in the message body.`
192.           `* @type {string[]}`
193.           `*/`
194.          `this.mentionedIds = data.mentionedJidList || [];`

196.          `/**`
197.           `* @typedef {Object} GroupMention`
198.           `* @property {string} groupSubject The name  of the group`
199.           `* @property {string} groupJid The group ID`
200.           `*/`

202.          `/**`
203.           `* Indicates whether there are group mentions in the message body`
204.           `* @type {GroupMention[]}`
205.           `*/`
206.          `this.groupMentions = data.groupMentions || [];`

208.          `/**`
209.           `* Order ID for message type ORDER`
210.           `* @type {string}`
211.           `*/`
212.          `this.orderId = data.orderId ? data.orderId : undefined;`
213.          `/**`
214.           `* Order Token for message type ORDER`
215.           `* @type {string}`
216.           `*/`
217.          `this.token = data.token ? data.token : undefined;`

219.          `/**` 
220.           `* Indicates whether the message is a Gif`
221.           `* @type {boolean}`
222.           `*/`
223.          `this.isGif = Boolean(data.isGif);`

225.          `/**`
226.           `* Indicates if the message will disappear after it expires`
227.           `* @type {boolean}`
228.           `*/`
229.          `this.isEphemeral = data.isEphemeral;`

231.          `/** Title */`
232.          `if (data.title) {`
233.              `this.title = data.title;`
234.          `}`

236.          `/** Description */`
237.          `if (data.description) {`
238.              `this.description = data.description;`
239.          `}`

241.          `/** Business Owner JID */`
242.          `if (data.businessOwnerJid) {`
243.              `this.businessOwnerJid = data.businessOwnerJid;`
244.          `}`

246.          `/** Product ID */`
247.          `if (data.productId) {`
248.              `this.productId = data.productId;`
249.          `}`

251.          `/** Last edit time */`
252.          `if (data.latestEditSenderTimestampMs) {`
253.              `this.latestEditSenderTimestampMs = data.latestEditSenderTimestampMs;`
254.          `}`

256.          `/** Last edit message author */`
257.          `if (data.latestEditMsgKey) {`
258.              `this.latestEditMsgKey = data.latestEditMsgKey;`
259.          `}`

261.          `/**`
262.           `* Protocol message key.`
263.           `* Can be used to retrieve the ID of an original message that was revoked.`
264.           `*/`
265.          `if (data.protocolMessageKey) {`
266.              `this.protocolMessageKey = data.protocolMessageKey;`
267.          `}`

269.          `/**`
270.           `* Links included in the message.`
271.           `* @type {Array&lt;{link: string, isSuspicious: boolean}>}`
272.           `*`
273.           `*/`
274.          `this.links = data.links;`

276.          `/** Buttons */`
277.          `if (data.dynamicReplyButtons) {`
278.              `this.dynamicReplyButtons = data.dynamicReplyButtons;`
279.          `}`

281.          `/** Selected Button Id **/`
282.          `if (data.selectedButtonId) {`
283.              `this.selectedButtonId = data.selectedButtonId;`
284.          `}`

286.          `/** Selected List row Id **/`
287.          `if (data.listResponse &amp;&amp; data.listResponse.singleSelectReply.selectedRowId) {`
288.              `this.selectedRowId = data.listResponse.singleSelectReply.selectedRowId;`
289.          `}`

291.          `if (this.type === MessageTypes.POLL_CREATION) {`
292.              `this.pollName = data.pollName;`
293.              `this.pollOptions = data.pollOptions;`
294.              `this.allowMultipleAnswers = Boolean(!data.pollSelectableOptionsCount);`
295.              `this.pollInvalidated = data.pollInvalidated;`
296.              `this.isSentCagPollCreation = data.isSentCagPollCreation;`
297.              `this.messageSecret = data.messageSecret ? Object.keys(data.messageSecret).map((key) => data.messageSecret[key]) : [];`
298.          `}`

300.          `return super._patch(data);`
301.      `}`

303.      `_getChatId() {`
304.          `return this.fromMe ? this.to : this.from;`
305.      `}`

307.      `/**`
308.       `* Reloads this Message object's data in-place with the latest values from WhatsApp Web.` 
309.       `* Note that the Message must still be in the web app cache for this to work, otherwise will return null.`
310.       `* @returns {Promise&lt;Message>}`
311.       `*/`
312.      `async reload() {`
313.          `const newData = await this.client.pupPage.evaluate(async (msgId) => {`
314.              `const msg = window.Store.Msg.get(msgId) || (await window.Store.Msg.getMessagesById([msgId]))?.messages?.[0];`
315.              `if (!msg) return null;`
316.              `return window.WWebJS.getMessageModel(msg);`
317.          `}, this.id._serialized);`

319.          `if(!newData) return null;`

321.          `this._patch(newData);`
322.          `return this;`
323.      `}`

325.      `/**`
326.       `* Returns message in a raw format`
327.       `* @type {Object}`
328.       `*/`
329.      `get rawData() {`
330.          `return this._data;`
331.      `}`

333.      `/**`
334.       `* Returns the Chat this message was sent in`
335.       `* @returns {Promise&lt;Chat>}`
336.       `*/`
337.      `getChat() {`
338.          `return this.client.getChatById(this._getChatId());`
339.      `}`

341.      `/**`
342.       `* Returns the Contact this message was sent from`
343.       `* @returns {Promise&lt;Contact>}`
344.       `*/`
345.      `getContact() {`
346.          `return this.client.getContactById(this.author || this.from);`
347.      `}`

349.      `/**`
350.       `* Returns the Contacts mentioned in this message`
351.       `* @returns {Promise&lt;Array&lt;Contact>>}`
352.       `*/`
353.      `async getMentions() {`
354.          `return await Promise.all(this.mentionedIds.map(async m => await this.client.getContactById(m)));`
355.      `}`

357.      `/**`
358.       `* Returns groups mentioned in this message`
359.       `* @returns {Promise&lt;Array&lt;GroupChat>>}`
360.       `*/`
361.      `async getGroupMentions() {`
362.          `return await Promise.all(this.groupMentions.map(async (m) => await this.client.getChatById(m.groupJid._serialized)));`
363.      `}`

365.      `/**`
366.       `* Returns the quoted message, if any`
367.       `* @returns {Promise&lt;Message>}`
368.       `*/`
369.      `async getQuotedMessage() {`
370.          `if (!this.hasQuotedMsg) return undefined;`

372.          `const quotedMsg = await this.client.pupPage.evaluate(async (msgId) => {`
373.              `const msg = window.Store.Msg.get(msgId) || (await window.Store.Msg.getMessagesById([msgId]))?.messages?.[0];`
374.              `const quotedMsg = window.Store.QuotedMsg.getQuotedMsgObj(msg);`
375.              `return window.WWebJS.getMessageModel(quotedMsg);`
376.          `}, this.id._serialized);`

378.          `return new Message(this.client, quotedMsg);`
379.      `}`

381.      `/**`
382.       `* Sends a message as a reply to this message. If chatId is specified, it will be sent`
383.       `* through the specified Chat. If not, it will send the message`
384.       `* in the same Chat as the original message was sent.`
385.       `*`
386.       `* @param {string|MessageMedia|Location} content`
387.       `* @param {string} [chatId]`
388.       `* @param {MessageSendOptions} [options]`
389.       `* @returns {Promise&lt;Message>}`
390.       `*/`
391.      `async reply(content, chatId, options = {}) {`
392.          `if (!chatId) {`
393.              `chatId = this._getChatId();`
394.          `}`

396.          `options = {`
397.              `...options,`
398.              `quotedMessageId: this.id._serialized`
399.          `};`

401.          `return this.client.sendMessage(chatId, content, options);`
402.      `}`

404.      `/**`
405.       `* React to this message with an emoji`
406.       `* @param {string} reaction - Emoji to react with. Send an empty string to remove the reaction.`
407.       `* @return {Promise}`
408.       `*/`
409.      `async react(reaction){`
410.          `await this.client.pupPage.evaluate(async (messageId, reaction) => {`
411.              `if (!messageId) return null;`
412.              `const msg =`
413.                  `window.Store.Msg.get(messageId) || (await window.Store.Msg.getMessagesById([messageId]))?.messages?.[0];`
414.              `if(!msg) return null;`
415.              `await window.Store.sendReactionToMsg(msg, reaction);`
416.          `}, this.id._serialized, reaction);`
417.      `}`

419.      `/**`
420.       `* Accept Group V4 Invite`
421.       `* @returns {Promise&lt;Object>}`
422.       `*/`
423.      `async acceptGroupV4Invite() {`
424.          `return await this.client.acceptGroupV4Invite(this.inviteV4);`
425.      `}`

427.      `/**`
428.       `* Forwards this message to another chat (that you chatted before, otherwise it will fail)`
429.       `*`
430.       `* @param {string|Chat} chat Chat model or chat ID to which the message will be forwarded`
431.       `* @returns {Promise}`
432.       `*/`
433.      `async forward(chat) {`
434.          `const chatId = typeof chat === 'string' ? chat : chat.id._serialized;`

436.          `await this.client.pupPage.evaluate(async (msgId, chatId) => {`
437.              `return window.WWebJS.forwardMessage(chatId, msgId);`
438.          `}, this.id._serialized, chatId);`
439.      `}`

441.      `/**`
442.       `* Downloads and returns the attatched message media`
443.       `* @returns {Promise&lt;MessageMedia>}`
444.       `*/`
445.      `async downloadMedia() {`
446.          `if (!this.hasMedia) {`
447.              `return undefined;`
448.          `}`

450.          `const result = await this.client.pupPage.evaluate(async (msgId) => {`
451.              `const msg = window.Store.Msg.get(msgId) || (await window.Store.Msg.getMessagesById([msgId]))?.messages?.[0];`

453.              `// REUPLOADING mediaStage means the media is expired and the download button is spinning, cannot be downloaded now`
454.              `if (!msg || !msg.mediaData || msg.mediaData.mediaStage === 'REUPLOADING') {`
455.                  `return null;`
456.              `}`
457.              `if (msg.mediaData.mediaStage != 'RESOLVED') {`
458.                  `// try to resolve media`
459.                  `await msg.downloadMedia({`
460.                      `downloadEvenIfExpensive: true,`
461.                      `rmrReason: 1`
462.                  `});`
463.              `}`

465.              `if (msg.mediaData.mediaStage.includes('ERROR') || msg.mediaData.mediaStage === 'FETCHING') {`
466.                  `// media could not be downloaded`
467.                  `return undefined;`
468.              `}`

470.              `try {`
471.                  `const mockQpl = {`
472.                      `addAnnotations: function() { return this; },`
473.                      `addPoint: function() { return this; }`
474.                  `};`
475.                  `const decryptedMedia = await window.Store.DownloadManager.downloadAndMaybeDecrypt({`
476.                      `directPath: msg.directPath,`
477.                      `encFilehash: msg.encFilehash,`
478.                      `filehash: msg.filehash,`
479.                      `mediaKey: msg.mediaKey,`
480.                      `mediaKeyTimestamp: msg.mediaKeyTimestamp,`
481.                      `type: msg.type,`
482.                      `signal: (new AbortController).signal,`
483.                      `downloadQpl: mockQpl`
484.                  `});`

486.                  `const data = await window.WWebJS.arrayBufferToBase64Async(decryptedMedia);`

488.                  `return {`
489.                      `data,`
490.                      `mimetype: msg.mimetype,`
491.                      `filename: msg.filename,`
492.                      `filesize: msg.size`
493.                  `};`
494.              `} catch (e) {`
495.                  `if(e.status &amp;&amp; e.status === 404) return undefined;`
496.                  `throw e;`
497.              `}`
498.          `}, this.id._serialized);`

500.          `if (!result) return undefined;`
501.          `return new MessageMedia(result.mimetype, result.data, result.filename, result.filesize);`
502.      `}`

504.      `/**`
505.       `* Deletes a message from the chat`
506.       `* @param {?boolean} everyone If true and the message is sent by the current user or the user is an admin, will delete it for everyone in the chat.`
507.       `* @param {?boolean} [clearMedia = true] If true, any associated media will also be deleted from a device.`
508.       `*/`
509.      `async delete(everyone, clearMedia = true) {`
510.          `await this.client.pupPage.evaluate(async (msgId, everyone, clearMedia) => {`
511.              `const msg = window.Store.Msg.get(msgId) || (await window.Store.Msg.getMessagesById([msgId]))?.messages?.[0];`
512.              `const chat = window.Store.Chat.get(msg.id.remote) || (await window.Store.Chat.find(msg.id.remote));`

514.              `const canRevoke =`
515.                  `window.Store.MsgActionChecks.canSenderRevokeMsg(msg) || window.Store.MsgActionChecks.canAdminRevokeMsg(msg);`

517.              `if (everyone &amp;&amp; canRevoke) {`
518.                  `return window.compareWwebVersions(window.Debug.VERSION, '>=', '2.3000.0')`
519.                      `? window.Store.Cmd.sendRevokeMsgs(chat, { list: [msg], type: 'message' }, { clearMedia: clearMedia })`
520.                      `: window.Store.Cmd.sendRevokeMsgs(chat, [msg], { clearMedia: true, type: msg.id.fromMe ? 'Sender' : 'Admin' });`
521.              `}`

523.              `return window.compareWwebVersions(window.Debug.VERSION, '>=', '2.3000.0')`
524.                  `? window.Store.Cmd.sendDeleteMsgs(chat, { list: [msg], type: 'message' }, clearMedia)`
525.                  `: window.Store.Cmd.sendDeleteMsgs(chat, [msg], clearMedia);`
526.          `}, this.id._serialized, everyone, clearMedia);`
527.      `}`

529.      `/**`
530.       `* Stars this message`
531.       `*/`
532.      `async star() {`
533.          `await this.client.pupPage.evaluate(async (msgId) => {`
534.              `const msg = window.Store.Msg.get(msgId) || (await window.Store.Msg.getMessagesById([msgId]))?.messages?.[0];`
535.              `if (window.Store.MsgActionChecks.canStarMsg(msg)) {`
536.                  `let chat = await window.Store.Chat.find(msg.id.remote);`
537.                  `return window.Store.Cmd.sendStarMsgs(chat, [msg], false);`
538.              `}`
539.          `}, this.id._serialized);`
540.      `}`

542.      `/**`
543.       `* Unstars this message`
544.       `*/`
545.      `async unstar() {`
546.          `await this.client.pupPage.evaluate(async (msgId) => {`
547.              `const msg = window.Store.Msg.get(msgId) || (await window.Store.Msg.getMessagesById([msgId]))?.messages?.[0];`
548.              `if (window.Store.MsgActionChecks.canStarMsg(msg)) {`
549.                  `let chat = await window.Store.Chat.find(msg.id.remote);`
550.                  `return window.Store.Cmd.sendUnstarMsgs(chat, [msg], false);`
551.              `}`
552.          `}, this.id._serialized);`
553.      `}`

555.      `/**`
556.       `* Pins the message (group admins can pin messages of all group members)`
557.       `* @param {number} duration The duration in seconds the message will be pinned in a chat`
558.       `* @returns {Promise&lt;boolean>} Returns true if the operation completed successfully, false otherwise`
559.       `*/`
560.      `async pin(duration) {`
561.          `return await this.client.pupPage.evaluate(async (msgId, duration) => {`
562.              `return await window.WWebJS.pinUnpinMsgAction(msgId, 1, duration);`
563.          `}, this.id._serialized, duration);`
564.      `}`

566.      `/**`
567.       `* Unpins the message (group admins can unpin messages of all group members)`
568.       `* @returns {Promise&lt;boolean>} Returns true if the operation completed successfully, false otherwise`
569.       `*/`
570.      `async unpin() {`
571.          `return await this.client.pupPage.evaluate(async (msgId) => {`
572.              `return await window.WWebJS.pinUnpinMsgAction(msgId, 2, 0);`
573.          `}, this.id._serialized);`
574.      `}`

576.      `/**`
577.       `* Message Info`
578.       `* @typedef {Object} MessageInfo`
579.       `* @property {Array&lt;{id: ContactId, t: number}>} delivery Contacts to which the message has been delivered to`
580.       `* @property {number} deliveryRemaining Amount of people to whom the message has not been delivered to`
581.       `* @property {Array&lt;{id: ContactId, t: number}>} played Contacts who have listened to the voice message`
582.       `* @property {number} playedRemaining Amount of people who have not listened to the message`
583.       `* @property {Array&lt;{id: ContactId, t: number}>} read Contacts who have read the message`
584.       `* @property {number} readRemaining Amount of people who have not read the message`
585.       `*/`

587.      `/**`
588.       `* Get information about message delivery status.`
589.       `* May return null if the message does not exist or is not sent by you.`
590.       `* @returns {Promise&lt;?MessageInfo>}`
591.       `*/`
592.      `async getInfo() {`
593.          `const info = await this.client.pupPage.evaluate(async (msgId) => {`
594.              `const msg = window.Store.Msg.get(msgId) || (await window.Store.Msg.getMessagesById([msgId]))?.messages?.[0];`
595.              `if (!msg || !msg.id.fromMe) return null;`

597.              `return new Promise((resolve) => {`
598.                  `setTimeout(async () => {`
599.                      `resolve(await window.Store.getMsgInfo(msg.id));`
600.                  `}, (Date.now() - msg.t * 1000 &lt; 1250) &amp;&amp; Math.floor(Math.random() * (1200 - 1100 + 1)) + 1100 || 0);`
601.              `});`
602.          `}, this.id._serialized);`

604.          `return info;`
605.      `}`

607.      `/**`
608.       `* Gets the order associated with a given message`
609.       `* @return {Promise&lt;Order>}`
610.       `*/`
611.      `async getOrder() {`
612.          `if (this.type === MessageTypes.ORDER) {`
613.              `const result = await this.client.pupPage.evaluate((orderId, token, chatId) => {`
614.                  `return window.WWebJS.getOrderDetail(orderId, token, chatId);`
615.              `}, this.orderId, this.token, this._getChatId());`
616.              `if (!result) return undefined;`
617.              `return new Order(this.client, result);`
618.          `}`
619.          `return undefined;`
620.      `}`
621.      `/**`
622.       `* Gets the payment details associated with a given message`
623.       `* @return {Promise&lt;Payment>}`
624.       `*/`
625.      `async getPayment() {`
626.          `if (this.type === MessageTypes.PAYMENT) {`
627.              `const msg = await this.client.pupPage.evaluate(async (msgId) => {`
628.                  `const msg = window.Store.Msg.get(msgId) || (await window.Store.Msg.getMessagesById([msgId]))?.messages?.[0];`
629.                  `if(!msg) return null;`
630.                  `return msg.serialize();`
631.              `}, this.id._serialized);`
632.              `return new Payment(this.client, msg);`
633.          `}`
634.          `return undefined;`
635.      `}`

638.      `/**`
639.       `* Reaction List`
640.       `* @typedef {Object} ReactionList`
641.       `* @property {string} id Original emoji`
642.       `* @property {string} aggregateEmoji aggregate emoji`
643.       `* @property {boolean} hasReactionByMe Flag who sent the reaction`
644.       `* @property {Array&lt;Reaction>} senders Reaction senders, to this message`
645.       `*/`

647.      `/**`
648.       `* Gets the reactions associated with the given message`
649.       `* @return {Promise&lt;ReactionList[]>}`
650.       `*/`
651.      `async getReactions() {`
652.          `if (!this.hasReaction) {`
653.              `return undefined;`
654.          `}`

656.          `const reactions = await this.client.pupPage.evaluate(async (msgId) => {`
657.              `const msgReactions = await window.Store.Reactions.find(msgId);`
658.              `if (!msgReactions || !msgReactions.reactions.length) return null;`
659.              `return msgReactions.reactions.serialize();`
660.          `}, this.id._serialized);`

662.          `if (!reactions) {`
663.              `return undefined;`
664.          `}`

666.          `return reactions.map(reaction => {`
667.              `reaction.senders = reaction.senders.map(sender => {`
668.                  `sender.timestamp = Math.round(sender.timestamp / 1000);`
669.                  `return new Reaction(this.client, sender);`
670.              `});`
671.              `return reaction;`
672.          `});`
673.      `}`

675.      `/**`
676.       `* Edits the current message.`
677.       `* @param {string} content`
678.       `* @param {MessageEditOptions} [options] - Options used when editing the message`
679.       `* @returns {Promise&lt;?Message>}`
680.       `*/`
681.      `async edit(content, options = {}) {`
682.          `if (options.mentions) {`
683.              `!Array.isArray(options.mentions) &amp;&amp; (options.mentions = [options.mentions]);`
684.              `if (options.mentions.some((possiblyContact) => possiblyContact instanceof Contact)) {`
685.                  `console.warn('Mentions with an array of Contact are now deprecated. See more at https://github.com/pedroslopez/whatsapp-web.js/pull/2166.');`
686.                  `options.mentions = options.mentions.map((a) => a.id._serialized);`
687.              `}`
688.          `}`

690.          `options.groupMentions &amp;&amp; !Array.isArray(options.groupMentions) &amp;&amp; (options.groupMentions = [options.groupMentions]);`

692.          `let internalOptions = {`
693.              `linkPreview: options.linkPreview === false ? undefined : true,`
694.              `mentionedJidList: options.mentions || [],`
695.              `groupMentions: options.groupMentions,`
696.              `extraOptions: options.extra`
697.          `};`

699.          `if (!this.fromMe) {`
700.              `return null;`
701.          `}`
702.          `const messageEdit = await this.client.pupPage.evaluate(async (msgId, message, options) => {`
703.              `const msg = window.Store.Msg.get(msgId) || (await window.Store.Msg.getMessagesById([msgId]))?.messages?.[0];`
704.              `if (!msg) return null;`

706.              `let canEdit = window.Store.MsgActionChecks.canEditText(msg) || window.Store.MsgActionChecks.canEditCaption(msg);`
707.              `if (canEdit) {`
708.                  `const msgEdit = await window.WWebJS.editMessage(msg, message, options);`
709.                  `return msgEdit.serialize();`
710.              `}`
711.              `return null;`
712.          `}, this.id._serialized, content, internalOptions);`
713.          `if (messageEdit) {`
714.              `return new Message(this.client, messageEdit);`
715.          `}`
716.          `return null;`
717.      `}`

719.      `/**`
720.       `* Edits the current ScheduledEvent message.`
721.       `* Once the scheduled event is canceled, it can not be edited.`
722.       `* @param {ScheduledEvent} editedEventObject`
723.       `* @returns {Promise&lt;?Message>}`
724.       `*/`
725.      `async editScheduledEvent(editedEventObject) {`
726.          `if (!this.fromMe) {`
727.              `return null;`
728.          `}`

730.          `const edittedEventMsg = await this.client.pupPage.evaluate(async (msgId, editedEventObject) => {`
731.              `const msg = window.Store.Msg.get(msgId) || (await window.Store.Msg.getMessagesById([msgId]))?.messages?.[0];`
732.              `if (!msg) return null;`

734.              `const { name, startTimeTs, eventSendOptions } = editedEventObject;`
735.              `const eventOptions = {`
736.                  `name: name,`
737.                  `description: eventSendOptions.description,`
738.                  `startTime: startTimeTs,`
739.                  `endTime: eventSendOptions.endTimeTs,`
740.                  `location: eventSendOptions.location,`
741.                  `callType: eventSendOptions.callType,`
742.                  `isEventCanceled: eventSendOptions.isEventCanceled,`
743.              `};`

745.              `await window.Store.ScheduledEventMsgUtils.sendEventEditMessage(eventOptions, msg);`
746.              `const editedMsg = window.Store.Msg.get(msg.id._serialized);`
747.              `return editedMsg?.serialize();`
748.          `}, this.id._serialized, editedEventObject);`

750.          `return edittedEventMsg &amp;&amp; new Message(this.client, edittedEventMsg);`
751.      `}`
752.      `/**`
753.       `* Returns the PollVote this poll message`
754.       `* @returns {Promise&lt;PollVote[]>}`
755.       `*/`
756.      `async getPollVotes() {`
757.          `return await this.client.getPollVotes(this.id._serialized);`
758.      `}`

760.      `/**`
761.       `* Send votes to the poll message`
762.       `* @param {Array&lt;string>} selectedOptions Array of options selected.`
763.       `* @returns {Promise}`
764.       `*/`
765.      `async vote(selectedOptions) {`
766.          `if (this.type != MessageTypes.POLL_CREATION) throw 'Invalid usage! Can only be used with a pollCreation message';`

768.          `await this.client.pupPage.evaluate(async (messageId, votes) => {`
769.              `if (!messageId) return null;`
770.              `if (!Array.isArray(votes)) votes = [votes];`
771.              `let localIdSet = new Set();`
772.              `const msg =`
773.                  `window.Store.Msg.get(messageId) || (await window.Store.Msg.getMessagesById([messageId]))?.messages?.[0];`
774.              `if (!msg) return null;`

776.              `msg.pollOptions.forEach(a => {`
777.                  `for (const option of votes) {`
778.                      `if (a.name === option) localIdSet.add(a.localId);`
779.                  `}`
780.              `});`

782.              `await window.Store.PollsSendVote.sendVote(msg, localIdSet);`
783.          `}, this.id._serialized, selectedOptions);`
784.      `}`
785.  `}`

787.  `module.exports = Message;`

--- END OF FILE: structures_MessageMedia.js.html#source-line-16.md ---
--- START OF FILE: structures_MessageMedia.js.html#source-line-16.md ---

Source: https://docs.wwebjs.dev/structures_MessageMedia.js.html#source-line-16

1.  `'use strict';`

3.  `const fs = require('fs');`
4.  `const path = require('path');`
5.  `const mime = require('mime');`
6.  `const fetch = require('node-fetch');`
7.  `const { URL } = require('url');`

9.  `/**`
10.   `* Media attached to a message`
11.   `* @param {string} mimetype MIME type of the attachment`
12.   `* @param {string} data Base64-encoded data of the file`
13.   `* @param {?string} filename Document file name. Value can be null`
14.   `* @param {?number} filesize Document file size in bytes. Value can be null`
15.   `*/`
16.  `class MessageMedia {`
17.      `constructor(mimetype, data, filename, filesize) {`
18.          `/**`
19.           `* MIME type of the attachment`
20.           `* @type {string}`
21.           `*/`
22.          `this.mimetype = mimetype;`

24.          `/**`
25.           `* Base64 encoded data that represents the file`
26.           `* @type {string}`
27.           `*/`
28.          `this.data = data;`

30.          `/**`
31.           `* Document file name. Value can be null`
32.           `* @type {?string}`
33.           `*/`
34.          `this.filename = filename;`

36.          `/**`
37.           `* Document file size in bytes. Value can be null`
38.           `* @type {?number}`
39.           `*/`
40.          `this.filesize = filesize;`
41.      `}`

43.      `/**`
44.       `* Creates a MessageMedia instance from a local file path`
45.       `* @param {string} filePath` 
46.       `* @returns {MessageMedia}`
47.       `*/`
48.      `static fromFilePath(filePath) {`
49.          `const b64data = fs.readFileSync(filePath, {encoding: 'base64'});`
50.          `const mimetype = mime.getType(filePath);` 
51.          `const filename = path.basename(filePath);`

53.          `return new MessageMedia(mimetype, b64data, filename);`
54.      `}`

56.      `/**`
57.       `* Creates a MessageMedia instance from a URL`
58.       `* @param {string} url`
59.       `* @param {Object} [options]`
60.       `* @param {boolean} [options.unsafeMime=false]`
61.       `* @param {string} [options.filename]`
62.       `* @param {object} [options.client]`
63.       `* @param {object} [options.reqOptions]`
64.       `* @param {number} [options.reqOptions.size=0]`
65.       `* @returns {Promise&lt;MessageMedia>}`
66.       `*/`
67.      `static async fromUrl(url, options = {}) {`
68.          `const pUrl = new URL(url);`
69.          `let mimetype = mime.getType(pUrl.pathname);`

71.          `if (!mimetype &amp;&amp; !options.unsafeMime)`
72.              `throw new Error('Unable to determine MIME type using URL. Set unsafeMime to true to download it anyway.');`

74.          `async function fetchData (url, options) {`
75.              `const reqOptions = Object.assign({ headers: { accept: 'image/* video/* text/* audio/*' } }, options);`
76.              `const response = await fetch(url, reqOptions);`
77.              `const mime = response.headers.get('Content-Type');`
78.              `const size = response.headers.get('Content-Length');`

80.              `const contentDisposition = response.headers.get('Content-Disposition');`
81.              `const name = contentDisposition ? contentDisposition.match(/((?&lt;=filename=")(.*)(?="))/) : null;`

83.              `let data = '';`
84.              `if (response.buffer) {`
85.                  `data = (await response.buffer()).toString('base64');`
86.              `} else {`
87.                  `const bArray = new Uint8Array(await response.arrayBuffer());`
88.                  `bArray.forEach((b) => {`
89.                      `data += String.fromCharCode(b);`
90.                  `});`
91.                  `data = btoa(data);`
92.              `}`

94.              `return { data, mime, name, size };`
95.          `}`

97.          `const res = options.client`
98.              `? (await options.client.pupPage.evaluate(fetchData, url, options.reqOptions))`
99.              `: (await fetchData(url, options.reqOptions));`

101.          `const filename = options.filename ||`
102.              `(res.name ? res.name[0] : (pUrl.pathname.split('/').pop() || 'file'));`

104.          `if (!mimetype)`
105.              `mimetype = res.mime;`

107.          `return new MessageMedia(mimetype, res.data, filename, res.size || null);`
108.      `}`
109.  `}`

111.  `module.exports = MessageMedia;`

--- END OF FILE: structures_Order.js.html#source-line-10.md ---
--- START OF FILE: structures_Order.js.html#source-line-10.md ---

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

--- END OF FILE: structures_Poll.js.html#source-line-11.md ---
--- START OF FILE: structures_Poll.js.html#source-line-11.md ---

Source: https://docs.wwebjs.dev/structures_Poll.js.html#source-line-11

1.  `'use strict';`

3.  `/**`
4.   `* Poll send options`
5.   `* @typedef {Object} PollSendOptions`
6.   `* @property {boolean} [allowMultipleAnswers=false] If false it is a single choice poll, otherwise it is a multiple choice poll (false by default)`
7.   `* @property {?Array&lt;number>} messageSecret The custom message secret, can be used as a poll ID. NOTE: it has to be a unique vector with a length of 32`
8.   `*/`

10.  `/** Represents a Poll on WhatsApp */`
11.  `class Poll {`
12.      `/**`
13.       `* @param {string} pollName`
14.       `* @param {Array&lt;string>} pollOptions`
15.       `* @param {PollSendOptions} options`
16.       `*/`
17.      `constructor(pollName, pollOptions, options = {}) {`
18.          `/**`
19.           `* The name of the poll`
20.           `* @type {string}`
21.           `*/`
22.          `this.pollName = pollName.trim();`

24.          `/**`
25.           `* The array of poll options`
26.           `* @type {Array.&lt;{name: string, localId: number}>}`
27.           `*/`
28.          `this.pollOptions = pollOptions.map((option, index) => ({`
29.              `name: option.trim(),`
30.              `localId: index`
31.          `}));`

33.          `/**`
34.           `* The send options for the poll`
35.           `* @type {PollSendOptions}`
36.           `*/`
37.          `this.options = {`
38.              `allowMultipleAnswers: options.allowMultipleAnswers === true,`
39.              `messageSecret: options.messageSecret`
40.          `};`
41.      `}`
42.  `}`

44.  `module.exports = Poll;`

--- END OF FILE: structures_PollVote.js.html#source-line-17.md ---
--- START OF FILE: structures_PollVote.js.html#source-line-17.md ---

Source: https://docs.wwebjs.dev/structures_PollVote.js.html#source-line-17

1.  `'use strict';`

3.  `const Message = require('./Message');`
4.  `const Base = require('./Base');`

6.  `/**`
7.   `* Selected poll option structure`
8.   `* @typedef {Object} SelectedPollOption`
9.   `* @property {number} id The local selected or deselected option ID`
10.   `* @property {string} name The option name`
11.   `*/`

13.  `/**`
14.   `* Represents a Poll Vote on WhatsApp`
15.   `* @extends {Base}`
16.   `*/`
17.  `class PollVote extends Base {`
18.      `constructor(client, data) {`
19.          `super(client);`

21.          `if (data) this._patch(data);`
22.      `}`

24.      `_patch(data) {`
25.          `/**`
26.           `* The person who voted`
27.           `* @type {string}`
28.           `*/`
29.          `this.voter = data.sender;`

31.          `/**`
32.           `* The selected poll option(s)`
33.           `* If it's an empty array, the user hasn't selected any options on the poll,`
34.           `* may occur when they deselected all poll options`
35.           `* @type {SelectedPollOption[]}`
36.           `*/`
37.          `if (data.selectedOptionLocalIds.length > 0) {`
38.              `if(data.parentMessage) { // temporary failsafe`
39.                  `this.selectedOptions = data.selectedOptionLocalIds.map((e) => ({`
40.                      `name: data.parentMessage.pollOptions.find((x) => x.localId === e).name,`
41.                      `localId: e`
42.                  `}));`
43.              `} else {`
44.                  `this.selectedOptions = data.selectedOptionLocalIds.map((e) => ({`
45.                      `name: undefined,`
46.                      `localId: e`
47.                  `}));`
48.              `}`
49.          `} else {`
50.              `this.selectedOptions = [];`
51.          `}`

53.          `/**`
54.           `* Timestamp the option was selected or deselected at`
55.           `* @type {number}`
56.           `*/`
57.          `this.interractedAtTs = data.senderTimestampMs;`

59.          `/**`
60.           `* The poll creation message associated with the poll vote`
61.           `* @type {Message}`
62.           `*/`
63.          `this.parentMessage = new Message(this.client, data.parentMessage);`

65.          `/**`
66.           `* The poll creation message id`
67.           `* @type {Object}`
68.           `*/`
69.          `this.parentMsgKey =  data.parentMsgKey;`

71.          `return super._patch(data);`
72.      `}`
73.  `}`

75.  `module.exports = PollVote;`

--- END OF FILE: structures_PrivateChat.js.html#source-line-9.md ---
--- START OF FILE: structures_PrivateChat.js.html#source-line-9.md ---

Source: https://docs.wwebjs.dev/structures_PrivateChat.js.html#source-line-9

1.  `'use strict';`

3.  `const Chat = require('./Chat');`

5.  `/**`
6.   `* Represents a Private Chat on WhatsApp`
7.   `* @extends {Chat}`
8.   `*/`
9.  `class PrivateChat extends Chat {`

11.  `}`

13.  `module.exports = PrivateChat;`

--- END OF FILE: structures_PrivateContact.js.html#source-line-9.md ---
--- START OF FILE: structures_PrivateContact.js.html#source-line-9.md ---

Source: https://docs.wwebjs.dev/structures_PrivateContact.js.html#source-line-9

1.  `'use strict';`

3.  `const Contact = require('./Contact');`

5.  `/**`
6.   `* Represents a Private Contact on WhatsApp`
7.   `* @extends {Contact}`
8.   `*/`
9.  `class PrivateContact extends Contact {`

11.  `}`

13.  `module.exports = PrivateContact;`

--- END OF FILE: structures_Product.js.html#source-line-10.md ---
--- START OF FILE: structures_Product.js.html#source-line-10.md ---

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

--- END OF FILE: structures_Reaction.js.html#source-line-9.md ---
--- START OF FILE: structures_Reaction.js.html#source-line-9.md ---

Source: https://docs.wwebjs.dev/structures_Reaction.js.html#source-line-9

1.  `'use strict';`

3.  `const Base = require('./Base');`

5.  `/**`
6.   `* Represents a Reaction on WhatsApp`
7.   `* @extends {Base}`
8.   `*/`
9.  `class Reaction extends Base {`
10.      `constructor(client, data) {`
11.          `super(client);`

13.          `if (data) this._patch(data);`
14.      `}`

16.      `_patch(data) {`
17.          `/**`
18.           `* Reaction ID`
19.           `* @type {object}`
20.           `*/`
21.          `this.id = data.msgKey;`
22.          `/**`
23.           `* Orphan`
24.           `* @type {number}`
25.           `*/`
26.          `this.orphan = data.orphan;`
27.          `/**`
28.           `* Orphan reason`
29.           `* @type {?string}`
30.           `*/`
31.          `this.orphanReason = data.orphanReason;`
32.          `/**`
33.           `* Unix timestamp for when the reaction was created`
34.           `* @type {number}`
35.           `*/`
36.          `this.timestamp = data.timestamp;`
37.          `/**`
38.           `* Reaction`
39.           `* @type {string}`
40.           `*/`
41.          `this.reaction = data.reactionText;`
42.          `/**`
43.           `* Read`
44.           `* @type {boolean}`
45.           `*/`
46.          `this.read = data.read;`
47.          `/**`
48.           `* Message ID`
49.           `* @type {object}`
50.           `*/`
51.          `this.msgId = data.parentMsgKey;`
52.          `/**`
53.           `* Sender ID`
54.           `* @type {string}`
55.           `*/`
56.          `this.senderId = data.senderUserJid;`
57.          `/**`
58.           `* ACK`
59.           `* @type {?number}`
60.           `*/`
61.          `this.ack = data.ack;`

64.          `return super._patch(data);`
65.      `}`

67.  `}`

69.  `module.exports = Reaction;`

--- END OF FILE: structures_ScheduledEvent.js.html#source-line-15.md ---
--- START OF FILE: structures_ScheduledEvent.js.html#source-line-15.md ---

Source: https://docs.wwebjs.dev/structures_ScheduledEvent.js.html#source-line-15

1.  `'use strict';`

3.  `/**`
4.   `* ScheduledEvent send options`
5.   `* @typedef {Object} ScheduledEventSendOptions`
6.   `* @property {?string} description The scheduled event description`
7.   `* @property {?Date} endTime The end time of the event`
8.   `* @property {?string} location The location of the event`
9.   `` * @property {?string} callType The type of a WhatsApp call link to generate, valid values are: `video` | `voice` | `none` ``
10.   `* @property {boolean} [isEventCanceled = false] Indicates if a scheduled event should be sent as an already canceled`
11.   `* @property {?Array&lt;number>} messageSecret The custom message secret, can be used as an event ID. NOTE: it has to be a unique vector with a length of 32`
12.   `*/`

14.  `/** Represents a ScheduledEvent on WhatsApp */`
15.  `class ScheduledEvent {`
16.      `/**`
17.       `* @param {string} name`
18.       `* @param {Date} startTime`
19.       `* @param {ScheduledEventSendOptions} options`
20.       `*/`
21.      `constructor(name, startTime, options = {}) {`
22.          `/**`
23.           `* The name of the event`
24.           `* @type {string}`
25.           `*/`
26.          `this.name = this._validateInputs('name', name).trim();`

28.          `/**`
29.           `* The start time of the event`
30.           `* @type {number}`
31.           `*/`
32.          `this.startTimeTs = Math.floor(startTime.getTime() / 1000);`

34.          `/**`
35.           `* The send options for the event`
36.           `* @type {Object}`
37.           `*/`
38.          `this.eventSendOptions = {`
39.              `description: options.description?.trim(),`
40.              `endTimeTs: options.endTime ? Math.floor(options.endTime.getTime() / 1000) : null,`
41.              `location: options.location?.trim(),`
42.              `callType: this._validateInputs('callType', options.callType),`
43.              `isEventCanceled: options.isEventCanceled ?? false,`
44.              `messageSecret: options.messageSecret`
45.          `};`
46.      `}`

48.      `/**`
49.       `* Inner function to validate input values`
50.       `* @param {string} propName The property name to validate the value of`
51.       `* @param {string | number} propValue The property value to validate`
52.       `* @returns {string | number} The property value if a validation succeeded`
53.       `*/`
54.      `_validateInputs(propName, propValue) {`
55.          `if (propName === 'name' &amp;&amp; !propValue) {`
56.              `throw new class CreateScheduledEventError extends Error {`
57.                  `constructor(m) { super(m); }`
58.              ``}(`Empty '${propName}' parameter value is provided.`);``
59.          `}`

61.          `if (propName === 'callType' &amp;&amp; propValue &amp;&amp; !['video', 'voice', 'none'].includes(propValue)) {`
62.              `throw new class CreateScheduledEventError extends Error {`
63.                  `constructor(m) { super(m); }`
64.              ``}(`Invalid '${propName}' parameter value is provided. Valid values are: 'voice' | 'video' | 'none'.`);``
65.          `}`

67.          `return propValue;`
68.      `}`
69.  `}`

71.  `module.exports = ScheduledEvent;`

--- END OF FILE: util_InterfaceController.js.html#source-line-6.md ---
--- START OF FILE: util_InterfaceController.js.html#source-line-6.md ---

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

--- END OF FILE: util_Util.js.html#source-line-14.md ---
--- START OF FILE: util_Util.js.html#source-line-14.md ---

Source: https://docs.wwebjs.dev/util_Util.js.html#source-line-14

1.  `'use strict';`

3.  `const path = require('path');`
4.  `const Crypto = require('crypto');`
5.  `const { tmpdir } = require('os');`
6.  `const ffmpeg = require('fluent-ffmpeg');`
7.  `const webp = require('node-webpmux');`
8.  `const fs = require('fs').promises;`
9.  `const has = (o, k) => Object.prototype.hasOwnProperty.call(o, k);`

11.  `/**`
12.   `* Utility methods`
13.   `*/`
14.  `class Util {`
15.      `constructor() {`
16.          ``throw new Error(`The ${this.constructor.name} class may not be instantiated.`);``
17.      `}`

19.      `static generateHash(length) {`
20.          `var result = '';`
21.          `var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';`
22.          `var charactersLength = characters.length;`
23.          `for (var i = 0; i &lt; length; i++) {`
24.              `result += characters.charAt(Math.floor(Math.random() * charactersLength));`
25.          `}`
26.          `return result;`
27.      `}`

29.      `/**`
30.       `* Sets default properties on an object that aren't already specified.`
31.       `* @param {Object} def Default properties`
32.       `* @param {Object} given Object to assign defaults to`
33.       `* @returns {Object}`
34.       `* @private`
35.       `*/`
36.      `static mergeDefault(def, given) {`
37.          `if (!given) return def;`
38.          `for (const key in def) {`
39.              `if (!has(given, key) || given[key] === undefined) {`
40.                  `given[key] = def[key];`
41.              `} else if (given[key] === Object(given[key])) {`
42.                  `given[key] = Util.mergeDefault(def[key], given[key]);`
43.              `}`
44.          `}`

46.          `return given;`
47.      `}`

49.      `/**`
50.       `* Formats a image to webp`
51.       `* @param {MessageMedia} media`
52.       `*` 
53.       `* @returns {Promise&lt;MessageMedia>} media in webp format`
54.       `*/`
55.      `static async formatImageToWebpSticker(media, pupPage) {`
56.          `if (!media.mimetype.includes('image'))`
57.              `throw new Error('media is not a image');`

59.          `if (media.mimetype.includes('webp')) {`
60.              `return media;`
61.          `}`

63.          `return pupPage.evaluate((media) => {`
64.              `return window.WWebJS.toStickerData(media);`
65.          `}, media);`
66.      `}`

68.      `/**`
69.       `* Formats a video to webp`
70.       `* @param {MessageMedia} media`
71.       `*` 
72.       `* @returns {Promise&lt;MessageMedia>} media in webp format`
73.       `*/`
74.      `static async formatVideoToWebpSticker(media) {`
75.          `if (!media.mimetype.includes('video'))`
76.              `throw new Error('media is not a video');`

78.          `const videoType = media.mimetype.split('/')[1];`

80.          `const tempFile = path.join(`
81.              `tmpdir(),`
82.              `` `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp` ``
83.          `);`

85.          `const stream = new (require('stream').Readable)();`
86.          `const buffer = Buffer.from(`
87.              ``media.data.replace(`data:${media.mimetype};base64,`, ''),``
88.              `'base64'`
89.          `);`
90.          `stream.push(buffer);`
91.          `stream.push(null);`

93.          `await new Promise((resolve, reject) => {`
94.              `ffmpeg(stream)`
95.                  `.inputFormat(videoType)`
96.                  `.on('error', reject)`
97.                  `.on('end', () => resolve(true))`
98.                  `.addOutputOptions([`
99.                      `'-vcodec',`
100.                      `'libwebp',`
101.                      `'-vf',`
102.                      `// eslint-disable-next-line no-useless-escape`
103.                      `'scale=\'iw*min(300/iw\,300/ih)\':\'ih*min(300/iw\,300/ih)\',format=rgba,pad=300:300:\'(300-iw)/2\':\'(300-ih)/2\':\'#00000000\',setsar=1,fps=10',`
104.                      `'-loop',`
105.                      `'0',`
106.                      `'-ss',`
107.                      `'00:00:00.0',`
108.                      `'-t',`
109.                      `'00:00:05.0',`
110.                      `'-preset',`
111.                      `'default',`
112.                      `'-an',`
113.                      `'-vsync',`
114.                      `'0',`
115.                      `'-s',`
116.                      `'512:512',`
117.                  `])`
118.                  `.toFormat('webp')`
119.                  `.save(tempFile);`
120.          `});`

122.          `const data = await fs.readFile(tempFile, 'base64');`
123.          `await fs.unlink(tempFile);`

125.          `return {`
126.              `mimetype: 'image/webp',`
127.              `data: data,`
128.              `filename: media.filename,`
129.          `};`
130.      `}`

132.      `/**`
133.       `* Sticker metadata.`
134.       `* @typedef {Object} StickerMetadata`
135.       `* @property {string} [name]` 
136.       `* @property {string} [author]` 
137.       `* @property {string[]} [categories]`
138.       `*/`

140.      `/**`
141.       `* Formats a media to webp`
142.       `* @param {MessageMedia} media`
143.       `* @param {StickerMetadata} metadata`
144.       `*` 
145.       `* @returns {Promise&lt;MessageMedia>} media in webp format`
146.       `*/`
147.      `static async formatToWebpSticker(media, metadata, pupPage) {`
148.          `let webpMedia;`

150.          `if (media.mimetype.includes('image'))`
151.              `webpMedia = await this.formatImageToWebpSticker(media, pupPage);`
152.          `else if (media.mimetype.includes('video'))`
153.              `webpMedia = await this.formatVideoToWebpSticker(media);`
154.          `else`
155.              `throw new Error('Invalid media format');`

157.          `if (metadata.name || metadata.author) {`
158.              `const img = new webp.Image();`
159.              `const hash = this.generateHash(32);`
160.              `const stickerPackId = hash;`
161.              `const packname = metadata.name;`
162.              `const author = metadata.author;`
163.              `const categories = metadata.categories || [''];`
164.              `const json = { 'sticker-pack-id': stickerPackId, 'sticker-pack-name': packname, 'sticker-pack-publisher': author, 'emojis': categories };`
165.              `let exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00]);`
166.              `let jsonBuffer = Buffer.from(JSON.stringify(json), 'utf8');`
167.              `let exif = Buffer.concat([exifAttr, jsonBuffer]);`
168.              `exif.writeUIntLE(jsonBuffer.length, 14, 4);`
169.              `await img.load(Buffer.from(webpMedia.data, 'base64'));`
170.              `img.exif = exif;`
171.              `webpMedia.data = (await img.save(null)).toString('base64');`
172.          `}`

174.          `return webpMedia;`
175.      `}`

177.      `/**`
178.       `* Configure ffmpeg path`
179.       `* @param {string} path`
180.       `*/`
181.      `static setFfmpegPath(path) {`
182.          `ffmpeg.setFfmpegPath(path);`
183.      `}`
184.  `}`

186.  `module.exports = Util;`

--- END OF FILE: webCache_LocalWebCache.js.html#source-line-12.md ---
--- START OF FILE: webCache_LocalWebCache.js.html#source-line-12.md ---

Source: https://docs.wwebjs.dev/webCache_LocalWebCache.js.html#source-line-12

1.  `const path = require('path');`
2.  `const fs = require('fs');`

4.  `const { WebCache, VersionResolveError } = require('./WebCache');`

6.  `/**`
7.   `* LocalWebCache - Fetches a WhatsApp Web version from a local file store`
8.   `* @param {object} options - options`
9.   `* @param {string} options.path - Path to the directory where cached versions are saved, default is: "./.wwebjs_cache/"` 
10.   `* @param {boolean} options.strict - If true, will throw an error if the requested version can't be fetched. If false, will resolve to the latest version.`
11.   `*/`
12.  `class LocalWebCache extends WebCache {`
13.      `constructor(options = {}) {`
14.          `super();`

16.          `this.path = options.path || './.wwebjs_cache/';`
17.          `this.strict = options.strict || false;`
18.      `}`

20.      `async resolve(version) {`
21.          ``const filePath = path.join(this.path, `${version}.html`);``

23.          `try {`
24.              `return fs.readFileSync(filePath, 'utf-8');`
25.          `}`
26.          `catch (err) {`
27.              ``if (this.strict) throw new VersionResolveError(`Couldn't load version ${version} from the cache`);``
28.              `return null;`
29.          `}`
30.      `}`

32.      `async persist(indexHtml, version) {`
33.          `// version = (version+'').replace(/[^0-9.]/g,'');`
34.          ``const filePath = path.join(this.path, `${version}.html`);``
35.          `fs.mkdirSync(this.path, { recursive: true });`
36.          `fs.writeFileSync(filePath, indexHtml);`
37.      `}`
38.  `}`

40.  `module.exports = LocalWebCache;`

--- END OF FILE: webCache_RemoteWebCache.js.html#source-line-10.md ---
--- START OF FILE: webCache_RemoteWebCache.js.html#source-line-10.md ---

Source: https://docs.wwebjs.dev/webCache_RemoteWebCache.js.html#source-line-10

1.  `const fetch = require('node-fetch');`
2.  `const { WebCache, VersionResolveError } = require('./WebCache');`

4.  `/**`
5.   `* RemoteWebCache - Fetches a WhatsApp Web version index from a remote server`
6.   `* @param {object} options - options`
7.   `* @param {string} options.remotePath - Endpoint that should be used to fetch the version index. Use {version} as a placeholder for the version number.`
8.   `* @param {boolean} options.strict - If true, will throw an error if the requested version can't be fetched. If false, will resolve to the latest version. Defaults to false.`
9.   `*/`
10.  `class RemoteWebCache extends WebCache {`
11.      `constructor(options = {}) {`
12.          `super();`

14.          `if (!options.remotePath) throw new Error('webVersionCache.remotePath is required when using the remote cache');`
15.          `this.remotePath = options.remotePath;`
16.          `this.strict = options.strict || false;`
17.      `}`

19.      `async resolve(version) {`
20.          `const remotePath = this.remotePath.replace('{version}', version);`

22.          `try {`
23.              `const cachedRes = await fetch(remotePath);`
24.              `if (cachedRes.ok) {`
25.                  `return cachedRes.text();`
26.              `}`
27.          `} catch (err) {`
28.              ``console.error(`Error fetching version ${version} from remote`, err);``
29.          `}`

31.          ``if (this.strict) throw new VersionResolveError(`Couldn't load version ${version} from the archive`);``
32.          `return null;`         
33.      `}`

35.      `async persist() {`
36.          `// Nothing to do here`
37.      `}`
38.  `}`

40.  `module.exports = RemoteWebCache;`

--- END OF FILE: webCache_WebCache.js.html#source-line-4.md ---
--- START OF FILE: webCache_WebCache.js.html#source-line-4.md ---

Source: https://docs.wwebjs.dev/webCache_WebCache.js.html#source-line-4

1.  `/**`
2.   `* Default implementation of a web version cache that does nothing.`
3.   `*/`
4.  `class WebCache {`
5.      `async resolve() { return null; }`
6.      `async persist() { }`
7.  `}`

9.  `class VersionResolveError extends Error { }`

11.  `module.exports = {`
12.      `WebCache,`
13.      `VersionResolveError`
14.  `};`

--- END OF FILE: window.html#.compareWwebVersions.md ---
--- START OF FILE: window.html#.compareWwebVersions.md ---

Source: https://docs.wwebjs.dev/window.html#.compareWwebVersions

# 404

**File not found**

The site configured at this address does not contain the requested file.

If this is your site, make sure that the filename case matches the URL as well as any file permissions.  
For root URLs (like `http://example.com/`) you must provide an `index.html` file.

[Read the full documentation](https://help.github.com/pages/) for more information about using **GitHub Pages**.

[GitHub Status](https://githubstatus.com) — [@githubstatus](https://twitter.com/githubstatus)

 [![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFMTZCRDY3REIzRjAxMUUyQUQzREIxQzRENUFFNUM5NiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFMTZCRDY3RUIzRjAxMUUyQUQzREIxQzRENUFFNUM5NiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkUxNkJENjdCQjNGMDExRTJBRDNEQjFDNEQ1QUU1Qzk2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkUxNkJENjdDQjNGMDExRTJBRDNEQjFDNEQ1QUU1Qzk2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+SM9MCAAAA+5JREFUeNrEV11Ik1EY3s4+ddOp29Q5b0opCgKFsoKoi5Kg6CIhuwi6zLJLoYLopq4qsKKgi4i6CYIoU/q5iDAKs6syoS76IRWtyJ+p7cdt7sf1PGOD+e0c3dygAx/67ZzzPM95/877GYdHRg3ZjMXFxepQKNS6sLCwJxqNNuFpiMfjVs4ZjUa/pmmjeD6VlJS8NpvNT4QQ7mxwjSsJiEQim/1+/9lgMHgIr5ohuxG1WCw9Vqv1clFR0dCqBODElV6v90ogEDjGdYbVjXhpaendioqK07CIR7ZAqE49PT09BPL2PMgTByQGsYiZlQD4uMXtdr+JxWINhgINYhGT2MsKgMrm2dnZXgRXhaHAg5jEJodUAHxux4LudHJE9RdEdA+i3Juz7bGHe4mhE9FNrgwBCLirMFV9Okh5eflFh8PR5nK5nDabrR2BNJlKO0T35+Li4n4+/J+/JQCxhmu5h3uJoXNHPbmWZAHMshWB8l5/ipqammaAf0zPDDx1ONV3vurdidqwAQL+pEc8sLcAe1CCvQ3YHxIW8Pl85xSWNC1hADDIv0rIE/o4J0k3kww4xSlwIhcq3EFFOm7KN/hUGOQkt0CFa5WpNJlMvxBEz/IVQAxg/ZRZl9wiHA63yDYieM7DnLP5CiAGsC7I5sgtYKJGWe2A8seFqgFJrJjEPY1Cn3pJ8/9W1e5VWsFDTEmFrBcoDhZJEQkXuhICMyKpjhahqN21hRYATKfUOlDmkygrR4o4C0VOLGJKrOITKB4jijzdXygBKixyC5TDQdnk/Pz8qRw6oOWGlsTKGOQW6OH6FBWsyePxdOXLTgxiyebILZCjz+GLgMIKnXNzc49YMlcRdHXcSwxFVgTInQhC9G33UhNoJLuqq6t345p9y3eUy8OTk5PjAHuI9uo4b07FBaOhsu0A4Unc+T1TU1Nj3KsSSE5yJ65jqF2DDd8QqWYmAZrIM2VlZTdnZmb6AbpdV9V6ec9znf5Q7HjYumdRE0JOp3MjitO4SFa+cZz8Umqe3TCbSLvdfkR/kWDdNQl5InuTcysOcpFT35ZrbBxx4p3JAHlZVVW1D/634VRt+FvLBgK/v5LV9WS+10xMTEwtRw7XvqOL+e2Q8V3AYIOIAXQ26/heWVnZCVfcyKHg2CBgTpmPmjYM8l24GyaUHyaIh7XwfR9ErE8qHoDfn2LTNAVC0HX6MFcBIP8Bi+6F6cdW/DICkANRfx99fEYFQ7Nph5i/uQiA214gno7K+guhaiKg9gC62+M8eR7XsBsYJ4ilam60Fb7r7uAj8wFyuwM1oIOWgfmDy6RXEEQzJMPe23DXrVS7rtyD3Df8z/FPgAEAzWU5Ku59ZAUAAAAASUVORK5CYII=)](/)[![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpEQUM1QkUxRUI0MUMxMUUyQUQzREIxQzRENUFFNUM5NiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpEQUM1QkUxRkI0MUMxMUUyQUQzREIxQzRENUFFNUM5NiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkUxNkJENjdGQjNGMDExRTJBRDNEQjFDNEQ1QUU1Qzk2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkUxNkJENjgwQjNGMDExRTJBRDNEQjFDNEQ1QUU1Qzk2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+hfPRaQAAB6lJREFUeNrsW2mME2UYbodtt+2222u35QheoCCYGBQligIJgkZJNPzgigoaTEj8AdFEMfADfyABkgWiiWcieK4S+QOiHAYUj2hMNKgYlEujpNttu9vttbvdw+chU1K6M535pt3ubHCSyezR+b73eb73+t7vrfXsufOW4bz6+vom9/b23ovnNNw34b5xYGAgODg46Mbt4mesVmsWd1qSpHhdXd2fuP/Afcput5/A88xwymcdBgLqenp6FuRyuWV4zu/v759QyWBjxoz5t76+/gun09mK5xFyakoCAPSaTCazNpvNPoYVbh6O1YKGRF0u13sNDQ27QMzfpiAAKj0lnU6/gBVfAZW2WWpwwVzy0IgP3G73FpjI6REhAGA9qVRqA1b9mVoBVyIC2tDi8Xg24+dUzQiAbS/s7Ox8G2o/3mKCC+Zw0efzPQEfcVjYrARX3dbV1bUtHo8fMgt42f+Mp0yUTVQbdWsAHVsikdiHkHaPxcQXQufXgUBgMRxme9U0AAxfH4vFvjM7eF6UkbJS5qoQwEQGA57Ac5JllFyUVZZ5ckUEgMVxsK2jlSYzI+QXJsiyjzNEAJyJAzb/KQa41jJKL8pODMQiTEAymXw5n8/P0IjD3bh7Rgog59aanxiIRTVvV/oj0tnHca/WMrVwODwB3raTGxzkBg/gnZVapFV62Wy2n5AO70HM/5wbJ0QnXyQSaVPDIuNZzY0V3ntHMwxiwHA0Gj2Np7ecIBDgaDAYXKCQJM1DhrgJ3nhulcPbl8j4NmHe46X/g60fwbz3aewjkqFQaAqebWU1AOqyQwt8Id6qEHMc97zu7u7FGGsn7HAiVuosVw7P35C1nccdgSCxop1dHeZswmfHMnxBo6ZTk+jN8dl/vF7vWofDsa+MLN9oEUBMxOb3+1eoEsBVw6Zmua49r8YmhAKDiEPcMwBsxMiqQ+ixzPFxZyqRpXARG/YOr1ObFJ0gUskXBbamcR1OKmMUvDxHRAu8/LmY3jFLMUpFqz9HxG65smYJdyKyECOxDiEAe/p1gjF2oonivZAsxVgl2daa4EQWCW6J55qFAFFZiJWYLxNQy2qOSUzGRsyXCUDIeliwAHEO4WSlWQBRFoZakXcKmCXmyXAKs0Ve9vl8q42WoIYpJU4hV3hKcNs8m9gl7p/xQ73eF5kB4j5mNrWmTJRNwAzqiV1CxjVTZCIkEq+Z1bZFZSN2CenmVAFVy4Plz8xKAGWjjAKFk6lCBMDR/MJjLLMSQNm43xAiQKTaA+9/wewhDjL+JVI1kkTSSOTcKbMTwPqESAot6dn6Fr1gHwVJju6IRuyiByPuUUBAg5DGkAgBmxlvdgIEK9gDkohdY/BJo4CAG0R8miRSsGABkgVQs4KXu098IgUXSSRsFAoKZiVAVDY2WUiiPTjYRi41KwGisrGsLtlsth8Fiwnz2fBkQvWfRtlE3iF2yW63/yCacXZ1dW02GwGyTFaRd4idJnCKHRaCxYRHoG5LTKT6SyiToP1fJHbmAYPYRR0UnZQtMnA6s0zg+GZBlt0Gdo7EPHgpE3Q6nZ8YyLhc8Xj8MJh/aKTAY+5FPAKHLE7RdwuYJZmNwzyCMkBCYyKROJBMJl9B/PXXCjjmCmDOVzH3fiPpObEWGqoKe4EBl8v1hlqsdLvd23mkxHM9pc9kMpmno9HoeTii7ewbHEZPPx1ztLS1tV3AnGuMjiNjvbQFuHw6zDo5By7dTPAQNBgMLrRarTkSls1mnwT7uwp9virx9QzbW/HuV/j5d/b+6jniKlllP8lkeONJDk+dq9GsQTnC4fB1heO0K47Hwe7WdDr9nAKgXwOBwHI+C45Htj1d6sd429TUNEcmUdc+PRaLHcvn87dXW4ugzdsaGxufL94NFv9zi1J7GVbhlvb2dnaJ3SVrxfc+n2+NTsZ7/H7/Mr3g5XdSIHyJSH1PZ+7fToyl2+ErqilgZ4NaLYB9goVGaHjR93Hv1ZrU4XDsFT20kH3PObzbWk0CgG1jacVIUnAQb9F+VexyLMzkpcLv0IJV7AHQIOCAUYHx7v5qgScmYHtTqSAyZLEJTK22Bie4iq3xsqpm4SAf9Hq9a2DnJ4uLK3SEULcdRvp3i3zHySqpficxEdsQc1NrlYXXvR+O7qASSezXB+h1SuUomgg9LL8BUoV4749EIolKh+EiqWmqVEZlDgHks2pxHw7xTqUQw9J5NcAXOK10AGIoZ6Zli6JY6Z1Q461KoZ4NiKLHarW+KDsxlDUPHZ5zPQZqUVDPJsTqb5n9malbpAh8C2XXDLl62+WZIDFRUlNVOiwencnNU3aQEkL+cDMSoLvZo2fQB7AJssNAuFuvorlDVVkkg2I87+jo2K2QAVphDrfyViK5VqtO34OkaxXCp+7drdDBCAdubm6eidX+2WwqT5komwh4YQLk+H4aE93h8Xg2gvHekQZOGSgLZTLyDTLJ4Lx9/KZWKBSainT4Iy3FqQBfnUZR42PKQFksBr9QKVXCPusD3OiA/RkQ5kP8qV/Jl1WywAp/6+dcmPM2zL1UrUahe4JqfnWWKXIul3uUbfP8njAFLW1OFr3gdFtZ72cNH+PtQT7/brW+NXqJAHh0y9V8/U/A1U7AfwIMAD7mS3pCbuWJAAAAAElFTkSuQmCC)](/)