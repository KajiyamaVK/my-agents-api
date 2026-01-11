Source: https://docs.frigate.video/plus/faq

On this page

### Are my models trained just on my image uploads? How are they built?[​](#are-my-models-trained-just-on-my-image-uploads-how-are-they-built "Direct link to Are my models trained just on my image uploads? How are they built?")

Frigate+ models are built by fine tuning a base model with the images you have annotated and verified. The base model is trained from scratch from a sampling of images across all Frigate+ user submissions and takes weeks of expensive GPU resources to train. If the models were built using your image uploads alone, you would need to provide tens of thousands of examples and it would take more than a week (and considerable cost) to train. Diversity helps the model generalize.

### Are my video feeds sent to the cloud for analysis when using Frigate+ models?[​](#are-my-video-feeds-sent-to-the-cloud-for-analysis-when-using-frigate-models "Direct link to Are my video feeds sent to the cloud for analysis when using Frigate+ models?")

No. Frigate+ models are a drop in replacement for the default model. All processing is performed locally as always. The only images sent to Frigate+ are the ones you specifically submit via the `Send to Frigate+` button or upload directly.

### Can I label anything I want and train the model to recognize something custom for me?[​](#can-i-label-anything-i-want-and-train-the-model-to-recognize-something-custom-for-me "Direct link to Can I label anything I want and train the model to recognize something custom for me?")

Not currently. At the moment, the set of labels will be consistent for all users. The focus will be on expanding that set of labels before working on completely custom user labels.

### Can Frigate+ models be used offline?[​](#can-frigate-models-be-used-offline "Direct link to Can Frigate+ models be used offline?")

Yes. Models and metadata are stored in the `model_cache` directory within the config folder. Frigate will only attempt to download a model if it does not exist in the cache. This means you can backup the directory and/or use it completely offline.

### Can I keep using my Frigate+ models even if I do not renew my subscription?[​](#can-i-keep-using-my-frigate-models-even-if-i-do-not-renew-my-subscription "Direct link to Can I keep using my Frigate+ models even if I do not renew my subscription?")

Yes. Subscriptions to Frigate+ provide access to the infrastructure used to train the models. Models trained with your subscription are yours to keep and use forever. However, do note that the terms and conditions prohibit you from sharing, reselling, or creating derivative products from the models.

### Why can't I submit images to Frigate+?[​](#why-cant-i-submit-images-to-frigate "Direct link to Why can't I submit images to Frigate+?")

If you've configured your API key and the Frigate+ Settings page in the UI shows that the key is active, you need to ensure that you've enabled both snapshots and `clean_copy` snapshots for the cameras you'd like to submit images for. Note that `clean_copy` is enabled by default when snapshots are enabled.

```
snapshots:  enabled: true  clean_copy: true
```

*   [Are my models trained just on my image uploads? How are they built?](#are-my-models-trained-just-on-my-image-uploads-how-are-they-built)
*   [Are my video feeds sent to the cloud for analysis when using Frigate+ models?](#are-my-video-feeds-sent-to-the-cloud-for-analysis-when-using-frigate-models)
*   [Can I label anything I want and train the model to recognize something custom for me?](#can-i-label-anything-i-want-and-train-the-model-to-recognize-something-custom-for-me)
*   [Can Frigate+ models be used offline?](#can-frigate-models-be-used-offline)
*   [Can I keep using my Frigate+ models even if I do not renew my subscription?](#can-i-keep-using-my-frigate-models-even-if-i-do-not-renew-my-subscription)
*   [Why can't I submit images to Frigate+?](#why-cant-i-submit-images-to-frigate)