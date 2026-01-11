Source: https://docs.frigate.video/frigate/glossary

On this page

The glossary explains terms commonly used in Frigate's documentation.

## Bounding Box[​](#bounding-box "Direct link to Bounding Box")

A box returned from the object detection model that outlines an object in the frame. These have multiple colors depending on object type in the debug live view.

### Bounding Box Colors[​](#bounding-box-colors "Direct link to Bounding Box Colors")

*   At startup different colors will be assigned to each object label
*   A dark blue thin line indicates that object is not detected at this current point in time
*   A gray thin line indicates that object is detected as being stationary
*   A thick line indicates that object is the subject of autotracking (when enabled).

## False Positive[​](#false-positive "Direct link to False Positive")

An incorrect detection of an object type. For example a dog being detected as a person, a chair being detected as a dog, etc. A person being detected in an area you want to ignore is not a false positive.

## Mask[​](#mask "Direct link to Mask")

There are two types of masks in Frigate. [See the mask docs for more info](/configuration/masks)

### Motion Mask[​](#motion-mask "Direct link to Motion Mask")

Motion masks prevent detection of [motion](#motion) in masked areas from triggering Frigate to run object detection, but do not prevent objects from being detected if object detection runs due to motion in nearby areas. For example: camera timestamps, skies, the tops of trees, etc.

### Object Mask[​](#object-mask "Direct link to Object Mask")

Object filter masks drop any bounding boxes where the bottom center (overlap doesn't matter) is in the masked area. It forces them to be considered a [false positive](#false-positive) so that they are ignored.

## Min Score[​](#min-score "Direct link to Min Score")

The lowest score that an object can be detected with during tracking, any detection with a lower score will be assumed to be a false positive

## Motion[​](#motion "Direct link to Motion")

When pixels in the current camera frame are different than previous frames. When many nearby pixels are different in the current frame they grouped together and indicated with a red motion box in the live debug view. [See the motion detection docs for more info](/configuration/motion_detection)

## Region[​](#region "Direct link to Region")

A portion of the camera frame that is sent to object detection, regions can be sent due to motion, active objects, or occasionally for stationary objects. These are represented by green boxes in the debug live view.

## Review Item[​](#review-item "Direct link to Review Item")

A review item is a time period where any number of events/tracked objects were active. [See the review docs for more info](/configuration/review)

## Snapshot Score[​](#snapshot-score "Direct link to Snapshot Score")

The score shown in a snapshot is the score of that object at that specific moment in time.

## Threshold[​](#threshold "Direct link to Threshold")

The threshold is the median score that an object must reach in order to be considered a true positive.

## Top Score[​](#top-score "Direct link to Top Score")

The top score for an object is the highest median score for an object.

## Tracked Object ("event" in previous versions)[​](#tracked-object-event-in-previous-versions "Direct link to Tracked Object (\"event\" in previous versions)")

The time period starting when a tracked object entered the frame and ending when it left the frame, including any time that the object remained still. Tracked objects are saved when it is considered a [true positive](#threshold) and meets the requirements for a snapshot or recording to be saved.

## Zone[​](#zone "Direct link to Zone")

Zones are areas of interest, zones can be used for notifications and for limiting the areas where Frigate will create a [review item](#review-item). [See the zone docs for more info](/configuration/zones)

*   [Bounding Box](#bounding-box)
    *   [Bounding Box Colors](#bounding-box-colors)
*   [False Positive](#false-positive)
*   [Mask](#mask)
    *   [Motion Mask](#motion-mask)
    *   [Object Mask](#object-mask)
*   [Min Score](#min-score)
*   [Motion](#motion)
*   [Region](#region)
*   [Review Item](#review-item)
*   [Snapshot Score](#snapshot-score)
*   [Threshold](#threshold)
*   [Top Score](#top-score)
*   [Tracked Object ("event" in previous versions)](#tracked-object-event-in-previous-versions)
*   [Zone](#zone)