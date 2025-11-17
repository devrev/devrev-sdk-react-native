# Migration guide

This guide and chart should help facilitate the transition from the legacy UserExperior SDK to the new DevRev SDK in your React Native application, providing insights into feature equivalents and method changes.

## Feature equivalence chart

| Feature | UserExperior SDK | DevRev SDK |
|-|-|-|
| Installation | `npm install react-native-userexperior` | `npm install @devrev/sdk-react-native` |
| Initialization | `UserExperior.startRecording(string)` | `DevRev.configure(appID: string)` |
| User Identification | `UserExperior.setUserIdentifier(string)` | `DevRev.identifyAnonymousUser(userID: string)`<br /> `DevRev.identifyUnverifiedUser(identity: Identity)`<br /> `DevRev.updateUser(identity: Identity)`<br /> `DevRev.identifyVerifiedUser(userID: string, sessionToken: string)`<br /> `DevRev.logout(deviceID: string)` |
| Event Tracking | `UserExperior.logEvent(string, Map<string, string>)` | `DevRev.trackEvent(name: string, properties?: { [key: string]: string })` |
| Session Recording | `UserExperior.stopRecording()`<br />`UserExperior.pauseRecording()`<br />`UserExperior.resumeRecording()` | `DevRev.startRecording()`<br />`DevRev.stopRecording()`<br />`DevRev.pauseRecording()`<br />`DevRev.resumeRecording()`<br />`DevRev.processAllOnDemandSessions()` |
| Opting in/out | Not supported. | `DevRev.stopAllMonitoring()`<br /> `DevRev.resumeAllMonitoring()` |
| Session Properties | `UserExperior.setUserProperties(Map<string, string>)` | `DevRev.addSessionProperties(properties: { [key: string]: string })`<br /> `DevRev.clearSessionProperties()` |
| Masking Sensitive Data | `UserExperior.addInSecureViewBucket(any[])`<br />`UserExperior.removeFromSecureViewBucket(any[])` | `DevRev.markSensitiveViews(tags: any[])`<br />`DevRev.unmarkSensitiveViews(tags: any[])` |
| Timers | Not supported. | `DevRev.startTimer(name: string, properties: { [key: string]: string })`<br /> `DevRev.endTimer(name: string, properties: { [key: string]: string })` |
| Support chat | Not supported. | `DevRev.showSupport()`<br /> `DevRev.createSupportConversation()`<br /> `DevRev.setShouldDismissModalsOnOpenLink()`<br /> `DevRev.setInAppLinkHandler()` |
| Push Notifications | Not supported. | `DevRev.registerDeviceToken()`<br /> `DevRev.unregisterDevice(deviceID: string)`<br /> `DevRev.processPushNotification()` |
