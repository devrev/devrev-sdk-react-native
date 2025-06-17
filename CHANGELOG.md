# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
