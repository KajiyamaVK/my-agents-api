Source: https://docs.frigate.video/plus/annotating

On this page

For the best results, follow these guidelines. You may also want to review the documentation on [improving your model](/plus/#improving-your-model).

**Label every object in the image**: It is important that you label all objects in each image before verifying. If you don't label a car for example, the model will be taught that part of the image is _not_ a car and it will start to get confused. You can exclude labels that you don't want detected on any of your cameras.

**Make tight bounding boxes**: Tighter bounding boxes improve the recognition and ensure that accurate bounding boxes are predicted at runtime.

**Label the full object even when occluded**: If you have a person standing behind a car, label the full person even though a portion of their body may be hidden behind the car. This helps predict accurate bounding boxes and improves zone accuracy and filters at runtime. If an object is partly out of frame, label it only when a person would reasonably be able to recognize the object from the visible parts.

**Label objects hard to identify as difficult**: When objects are truly difficult to make out, such as a car barely visible through a bush, or a dog that is hard to distinguish from the background at night, flag it as 'difficult'. This is not used in the model training as of now, but will in the future.

**Delivery logos such as `amazon`, `ups`, and `fedex` should label the logo**: For a Fedex truck, label the truck as a `car` and make a different bounding box just for the Fedex logo. If there are multiple logos, label each of them.

![Fedex Logo](/assets/images/fedex-logo-56c82545df6a5078ee84903ac5604b44.jpg)

## AI suggested labels[​](#ai-suggested-labels "Direct link to AI suggested labels")

If you have an active Frigate+ subscription, new uploads will be scanned for the objects configured for you camera and you will see suggested labels as light blue boxes when annotating in Frigate+. These suggestions are processed via a queue and typically complete within a minute after uploading, but processing times can be longer.

![Suggestions](/assets/images/suggestions-f902cd4a2a485079f50fdbd838be99b0.webp)

Suggestions are converted to labels when saving, so you should remove any errant suggestions. There is already some logic designed to avoid duplicate labels, but you may still occasionally see some duplicate suggestions. You should keep the most accurate bounding box and delete any duplicates so that you have just one label per object remaining.

## False positive labels[​](#false-positive-labels "Direct link to False positive labels")

False positives will be shown with a red box and the label will have a strike through. These can't be adjusted, but they can be deleted if you accidentally submit a true positive as a false positive from Frigate. ![false positive](/assets/images/false-positive-2c083609b62e7427d29725339c5f93be.jpg)

Misidentified objects should have a correct label added. For example, if a person was mistakenly detected as a cat, you should submit it as a false positive in Frigate and add a label for the person. The boxes will overlap.

![add image](/assets/images/false-positive-overlap-573e5df01badbe7934bc49c3476727b2.jpg)

## Shortcuts for a faster workflow[​](#shortcuts-for-a-faster-workflow "Direct link to Shortcuts for a faster workflow")

Shortcut Key

Description

`?`

Show all keyboard shortcuts

`w`

Add box

`d`

Toggle difficult

`s`

Switch to the next label

`Shift + s`

Switch to the previous label

`tab`

Select next largest box

`del`

Delete current box

`esc`

Deselect/Cancel

`← ↑ → ↓`

Move box

`Shift + ← ↑ → ↓`

Resize box

`scrollwheel`

Zoom in/out

`f`

Hide/show all but current box

`spacebar`

Verify and save

*   [AI suggested labels](#ai-suggested-labels)
*   [False positive labels](#false-positive-labels)
*   [Shortcuts for a faster workflow](#shortcuts-for-a-faster-workflow)