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