# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.2.3] - 2025-12-18

### Added
- Added a capture error API to allow apps to report runtime errors through the SDK (Android).

### Changed
- Refined rage tap detection logic to avoid misclassifying double taps as rage taps (Android).
- Optimized session recording and network request handling to reduce overhead during active sessions (Android).

### Fixed
- Fixed timer response rounding to return accurate duration values.
- Fixed incorrect engagement time calculation in crash scenarios.
- Fixed ANRs occurring during SDK initialization on Android.


## [2.2.2] - 2025-11-26

### Added
- Support for session capturing on Android 16 devices.
- Support for tracking hybrid platforms and their versions.
- iOS only: Added automatic restoration of sessions lost when the app is killed.

### Changed
- Improved masking behavior on `RecyclerView` scrolls.
- Improved session upload reliability and stability.
- Optimized network bandwidth usage.
- iOS only: Improved crash log parsing and formatting for clearer diagnostics.

### Fixed
- Fixed an issue in the logout flow.

## [2.2.1] - 2025-10-17

### Added
- Added the ability to pause and resume user interaction event tracking, offering more security on the confidential screens.

### Changed
- Simplified identification flow by deprecating redundant anonymous API usage.

### Fixed
- Resolved potential out of memory crashes.
- Corrected incorrect or missing device model names on certain iPhone versions.
- Fixed visual distortion issues when zooming inside web view.
- Fixed issues in the logout process to ensure complete session termination and improved reliability.

## [2.2.0] - 2025-09-29

### Changed
- iOS only: Improved the infrastructure for custom masking.
- Unified the screen tracking feature naming across platforms.

### Deprecated
- Deprecated the `startScreenTransition` and `endScreenTransition` functions, use the `setInScreenTransitioning` function instead.

### Fixed
- iOS only: Fixed push notifications not opening the conversations.
- Android only: Resolved potential issues that could cause app crashes during network operations.
- Android only: When adding session properties before initialization, they are now properly queued and executed.
- Android only: Added extra safeguards to prevent crashes related to uninitialized properties.
- Android only: Enhanced the stability of session-recording flows for a more reliable experience.

## [2.1.3] - 2025-09-05

## Added
- Added detailed observability for SDK configuration and identification steps.

## [2.1.2] - 2025-09-01

## Added
- Added a caching mechanism for identification calls.

## Fixed
- Improved the presentation of support widget in edge to edge scenarios.
- Improved the session analytics and metrics.
- Fixed an issue related to long session engagement times.

## [2.1.1] - 2025-07-24

## Fixed
- Fixed an issue with manual unmasking of input components.
- Fixed an issue with session uploads when the app is rapidly killed.

## [2.1.0] - 2025-06-27

### Added
- Added support for React Native new architecture.
- iOS only: Introduced crash reporting integrated with session recordings.

### Changed
- Bumped the react native version of the SDK to 0.79.0.
- Bumped the iOS minimum deployment target to 15.1.
- iOS only: Improved the support widget navigaion.

### Fixed
- Fixed an issue with timer tracking to ensure correct session properties are recorded.

## [2.0.0] - 2025-06-11

### Changed
- Improved the communication with the DevRev backend.
- Improved the encryption techniques used throughout the SDK.

### Removed
- The `getSessionURL` function has been removed.

## [1.1.8] - 2025-06-04

### Fixed
- iOS only: Fixed an issue with the sandbox detection.

### Deprecated
- iOS only: The `DevRevDelegate` protocol is deprecated. It will be removed in the next major release.

## [1.1.7] - 2025-05-20

### Fixed
- Android only: Fixed an issue where the Android bridge would throw a compiler error.

## [1.1.6] - 2025-05-19

### Fixed
- iOS only: Fixed an issue where the DevRev SDK would go into an unrecoverable state.

### Added
- iOS only: Added a flag to enforce the preferred theme for the DevRev UI, overriding system theme when enabled.

## [1.1.5] - 2025-05-02

### Changed
- Fixed a data type mismatch issue in the `addSessionProperties` method for iOS build.

## [1.1.4] - 2025-04-30

### Changed
- Updated the `trackEvent`, `addSessionProperties`, `startTimer`, `endTimer` functions to accept plain objects instead of a map.

### Fixed
- Fixed the crash in the `trackEvent` function due to a type casting issue.

## [1.1.3] - 2025-04-03

### Changed
- Improved the handling of custom fields in user, account and organization traits.

## [1.1.2] - 2025-03-13

### Added
- Created a brand-new sample app showcasing DevRev SDK's features.
- Added support for CSS masking classes using the `devrev-mask` and `devrev-unmask` classes.

### Changed
- Enhanced the session analytics feature to work better across different environments.
- iOS only: Improved the handling of the automatic session recording.

### Fixed
- Android only: Fixed the bugs related to on-demand sessions providing a more stable experience.

### Removed
- iOS only: Removed the support for automatic processing of DevRev push notifications.

## [1.1.1] - 2025-02-25

### Added
- Added support for on-demand (offline) sessions.
- Added screen transition tracking on Android.

## [1.1.0] - 2025-02-18

### Added
- Introducing a logout mechanism that clears the user's credentials, unregisters the device from receiving push notifications, and stops the session recording.

## [1.0.3] - 2025-02-06

### Fixed
- Fixed an issue on iOS where a user could not be re-identified with the same identification type.
- Fixed a crash on Android where the application theme was not a descendant of `Theme.AppCompat`.
- Fixed an issue on Android where the physical back button was not being handled properly.
- Fixed an issue on Android where the inputs were getting reset on configuration changes.

## [1.0.2] - 2025-01-17

### Added
- Added support for verified user identification.
- Added support for on-demand (offline) sessions.

## [1.0.0] - 2024-12-19

### Added
- Initial release of the DevRev SDK for React Native.
