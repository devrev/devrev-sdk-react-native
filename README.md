# DevRev SDK for React Native
DevRev SDK, used for integrating DevRev services into your React Native app.

## Table of contents
- [DevRev SDK for React Native](#devrev-sdk-for-react-native)
	- [Table of contents](#table-of-contents)
	- [Quickstart](#quickstart)
		- [Installation](#installation)
		- [Set up the DevRev SDK](#set-up-the-devrev-sdk)
	- [Features](#features)
		- [Identification](#identification)
			- [Anonymous identification](#anonymous-identification)
			- [Unverified identification](#unverified-identification)
			- [Verified identification](#verified-identification)
			- [Updating the user](#updating-the-user)
			- [Logout](#logout)
		- [PLuG support chat](#plug-support-chat)
			- [Creating a new support conversation](#creating-a-new-support-conversation)
			- [In-app link handling](#in-app-link-handling)
			- [In-app link callback](#in-app-link-callback)
		- [Dynamic theme configuration](#dynamic-theme-configuration)
		- [Analytics](#analytics)
		- [Session analytics](#session-analytics)
			- [Opting-in or out](#opting-in-or-out)
			- [Session recording](#session-recording)
			- [Session properties](#session-properties)
			- [Masking sensitive data](#masking-sensitive-data)
			- [Timers](#timers)
			- [Screen tracking](#screen-tracking)
			- [Screen transition tracking (Android only)](#screen-transition-tracking-android-only)
		- [Push notifications](#push-notifications)
			- [Configuration](#configuration)
			- [Register for push notifications](#register-for-push-notifications)
			- [Unregister from push notifications](#unregister-from-push-notifications)
			- [Processing push notifications](#processing-push-notifications)
				- [Android](#android)
					- [Example](#example)
				- [iOS](#ios)
					- [Example](#example-1)
	- [Sample app](#sample-app)
	- [Troubleshooting](#troubleshooting)
	- [Migration Guide](#migration-guide)

## Quickstart

### Requirements
- Minimum deployment target Android SDK 24 or iOS 15.1.

### Installation
To install the DevRev SDK, run the following command:

```sh
npm install @devrev/sdk-react-native
```

### Set up the DevRev SDK
1. Open the DevRev web app at [https://app.devrev.ai](https://app.devrev.ai) and go to the **Settings** page.
2. Under **PLuG settings** copy the value under **Your unique App ID**.
3. After obtaining the credentials, you can configure the DevRev SDK in your app.

The SDK will be ready for use once you execute the following configuration method.

```typescript
DevRev.configure(appID: string)
```

## Features
### Identification
To access certain features of the DevRev SDK, user identification is required.

The identification function should be placed appropriately in your app after the user logs in. If you have the user information available at app launch, call the function after the `DevRev.configure(appID:)` method.

> [!IMPORTANT]
> On iOS, if you haven't previously identified the user, the DevRev SDK will automatically create an anonymous user for you immediately after the SDK is configured.

> [!IMPORTANT]
> The `Identity` structure allows for custom fields in the user, organization, and account traits. These fields must be configured through the DevRev app before they can be used. For more information, refer to [Object customization](https://devrev.ai/docs/product/object-customization).

You can select from the following methods to identify users within your application:

#### Anonymous identification
The anonymous identification method allows you to create an anonymous user with an optional user identifier, ensuring that no other data is stored or associated with the user.

```typescript
DevRev.identifyAnonymousUser(userID: string)
```

#### Unverified identification
The unverified identification method identifies users with a unique identifier, but it does not verify their identity with the DevRev backend.

```typescript
DevRev.identifyUnverifiedUser(userID: string, organizationID?: string)
```

#### Verified identification
The verified identification method identifies users with a unique identifier and verifies their identity with the DevRev backend.

```typescript
DevRev.identifyVerifiedUser(userID: string, sessionToken: string)
```

#### Updating the user
You can update the user's information using the following method:

```typescript
DevRev.updateUser(identity: Identity)
```

> [!IMPORTANT]
> The `userID` property cannot be updated.

#### Logout
You can logout of the current user by using the following method:

```typescript
DevRev.logout(deviceID: string)
```

The user will be logged out by clearing their credentials, as well as unregistering the device from receiving push notifications, and stopping the session recording.

### PLuG support chat
Once user identification is complete, you can start using the chat (conversations) dialog supported by our DevRev SDK. The support chat feature can be shown as a modal screen from the top-most screen.

> [!IMPORTANT]
> This feature requires the SDK to be configured and the user to be identified, whether they are unverified or anonymous.

```typescript
DevRev.showSupport()
```

#### Creating a new support conversation
You can initiate a new support conversation directly from your app. This method displays the support chat screen and simultaneously creates a new conversation.

```typescript
DevRev.createSupportConversation()
```

#### In-app link handling
In certain cases, the links opened from the support chat are opened in the app instead of a browser. You can control whether the chat modal should be dismissed after the link is opened by calling the following method:

```typescript
DevRev.setShouldDismissModalsOnOpenLink(value: boolean)
```

Setting this flag to true applies the system's default behavior for opening links, which includes dismissing any DevRev modal screens to facilitate handling your own deep links.

#### In-app link callback
> [!NOTE]
> This feature is for Android only.

For scenarios where custom handling is needed, links from the support chat can be captured with the following method:

```typescript
DevRev.setInAppLinkHandler((url) => {
	// Perform an action here.
});
```

### Dynamic theme configuration
The DevRev SDK allows you to configure the theme dynamically based on the system appearance, or use the theme configured on the DevRev portal. By default, the theme will be dynamic and follow the system appearance.

```swift
DevRev.setPrefersSystemTheme(value: boolean)
```

### Analytics
> [!IMPORTANT]
> This feature requires the SDK to be configured and the user to be identified, whether they are unverified or anonymous.

The DevRev SDK allows you to send custom analytic events by using a properties map. You can track these events using the following function:

```typescript
DevRev.trackEvent(name: string, properties?: { [key: string]: string })
```

### Session analytics
The DevRev SDK offers session analytics features to help you understand how users interact with your app.

#### Opting-in or out
Session analytics features are opted-in by default, enabling them from the start. However, you can opt-out using the following method:

```typescript
DevRev.stopAllMonitoring()
```

To opt back in, use the following method:

```typescript
DevRev.resumeAllMonitoring()
```

#### Session recording
You can enable session recording to record user interactions with your app.

> [!CAUTION]
> The session recording feature is opt-out and is enabled by default.

The session recording feature includes the following methods to control the recording:

- `DevRev.startRecording()`: Starts the session recording.
- `DevRev.stopRecording()`: Stops the session recording and uploads it to the portal.
- `DevRev.pauseRecording()`: Pauses the ongoing session recording.
- `DevRev.resumeRecording()`: Resumes a paused session recording.
- `DevRev.processAllOnDemandSessions()`: Stops the ongoing session recording and uploads all offline sessions on demand, including the current one.

#### Session properties
You can add custom properties to the session recording to help you understand the context of the session. The properties are defined as a map of string values.

```typescript
DevRev.addSessionProperties(properties: { [key: string]: any })
```

To clear the session properties in scenarios such as user logout or when the session ends, use the following method:

```typescript
DevRev.clearSessionProperties()
```

#### Masking sensitive data
To protect sensitive data, the DevRev SDK provides an auto-masking feature that masks data before sending to the server. Input views such as text fields, text views, and web views are automatically masked.

While the auto-masking feature may be sufficient for most situations, you can manually mark additional views as sensitive using the following method:

```typescript
DevRev.markSensitiveViews(tags: any[])
```

If any previously masked views need to be unmasked, you can use the following method:

```typescript
DevRev.unmarkSensitiveViews(tags: any[])
```

#### Timers
The DevRev SDK offers a timer mechanism to measure the time spent on specific tasks, allowing you to track events such as response time, loading time, or any other duration-based metrics.

The mechanism uses balanced start and stop methods, both of which accept a timer name and an optional dictionary of properties.

To start a timer, use the following method:

```typescript
DevRev.startTimer(name: string, properties: { [key: string]: string })
```

To stop a timer, use the following method:

```typescript
DevRev.stopTimer(name: string, properties: { [key: string]: string })
```

#### Screen tracking
The DevRev SDK offers automatic screen tracking to help you understand how users navigate through your app. Although view controllers are automatically tracked, you can manually track screens using the following method:

```typescript
DevRev.trackScreen(name: string)
```

#### Screen transition tracking (Android only)
On Android, the DevRev SDK provides methods to manually track the screen transitions.

When a screen transition begins, you must call the following method:

```typescript
DevRev.startScreenTransition()
```

When a screen transition ends, you must call the following method:

```typescript
DevRev.endScreenTransition()
```

### Push notifications
You can configure your app to receive push notifications from the DevRev SDK. The SDK is able to handle push notifications and execute actions based on the notification's content.

The DevRev backend sends push notifications to your app to notify users about new messages in the PLuG support chat.

#### Configuration
To receive push notifications, you need to configure your DevRev organization by following the instructions in the [push notifications](https://developer.devrev.ai/public/sdks/mobile/push-notification) section.

#### Register for push notifications
> [!IMPORTANT]
> Push notifications require that the SDK has been configured and the user has been identified, to ensure delivery to the correct user.

The DevRev SDK offers a method to register your device for receiving push notifications. You can register for push notifications using the following method:

```typescript
DevRev.registerDeviceToken(deviceToken: string, deviceID: string)
```

On Android devices, the `deviceToken` should be the Firebase Cloud Messaging (FCM) token value, while on iOS devices, it should be the Apple Push Notification Service (APNs) token.

#### Unregister from push notifications
If your app no longer needs to receive push notifications, you can unregister the device.

Use the following method to unregister the device:

```typescript
DevRev.unregisterDevice(deviceID: string)
```

The method requires the device identifier, which should be the same as the one used when registering the device.

#### Processing push notifications
##### Android
On Android, notifications are implemented as data messages to offer flexibility. However, this means that automatic click processing isn't available. To handle notification clicks, developers need to intercept the click event, extract the payload, and pass it to a designated method for processing. This custom approach enables tailored notification handling in Android applications.

To process the notification, use the following method:

```typescript
DevRev.processPushNotification(payload: string)
```

Here, the `message` object from the notification payload needs to be passed to this function.

###### Example

```typescript
const notificationPayload = {
	// message may be nested based on the notification library
	"message": {
		// ... (the entire message object)
	}
};
const messageJson = notificationPayload["message"];
DevRev.processPushNotification(JSON.stringify(messageJson));
```

##### iOS
On iOS devices, you must pass the received push notification payload to the DevRev SDK for processing. The SDK will then handle the notification and execute the necessary actions.

```typescript
DevRev.processPushNotification(payload: string)
```

###### Example
```typescript
DevRev.processPushNotification(JSON.stringify(payload));
```

## Sample app

A sample app with use cases for the DevRev React Native plugin has been provided as a part of our [public repository](https://github.com/devrev/devrev-sdk-react-native). To set up and run the sample app:

1. Go to the sample directory:
    ```sh
    cd sample
    ```

2. Install dependencies:
    ```sh
    yarn install
    ```

3. For iOS, run:
    ```sh
    cd ios
    pod install
    ```

4. Run the app on Android or iOS using:
    ```sh
    npx react-native start
    ```

Or open `android` directory in Android Studio or `ios/DevRevSDKSample.xcworkspace` in Xcode and run the app from there.

## Troubleshooting
- **Issue**: Support chat won't show.
	**Solution**: Ensure you have correctly called one of the identification methods: `DevRev.identifyUnverifiedUser(...)`, `DevRev.identifyVerifiedUser(...)`, or `DevRev.identifyAnonymousUser(...)`.

- **Issue**: Not receiving push notifications.
	**Solution**: Ensure that your app is configured to receive push notifications and that your device is registered with the DevRev SDK.

## Migration Guide
If you are migrating from the legacy UserExperior SDK to the new DevRev SDK, please refer to the [Migration Guide](./MIGRATION.md) for detailed instructions and feature equivalence.
