import UIKit
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider
import Firebase
import RNNotifications

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
	// MARK: - Properties

	var window: UIWindow?
	var reactNativeDelegate: ReactNativeDelegate?
	var reactNativeFactory: RCTReactNativeFactory?

	// MARK: - App lifecycle

	func application(
		_ application: UIApplication,
		didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
	) -> Bool {
		FirebaseApp.configure()
		RNNotifications.startMonitorNotifications()

		let delegate = ReactNativeDelegate()
		let factory = RCTReactNativeFactory(delegate: delegate)
		delegate.dependencyProvider = RCTAppDependencyProvider()

		reactNativeDelegate = delegate
		reactNativeFactory = factory

		window = UIWindow(frame: UIScreen.main.bounds)

		factory.startReactNative(
			withModuleName: "DevRevSDKSampleRN",
			in: window,
			launchOptions: launchOptions
		)

		return true
	}

	// MARK: - Push notifications

	func application(
		_ application: UIApplication,
		didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data
	) {
		RNNotifications.didRegisterForRemoteNotifications(withDeviceToken: deviceToken)
	}

	func application(
		_ application: UIApplication,
		didFailToRegisterForRemoteNotificationsWithError error: any Error
	) {
		RNNotifications.didFailToRegisterForRemoteNotificationsWithError(error)
	}

	func application(
		_ application: UIApplication,
		didReceiveRemoteNotification userInfo: [AnyHashable : Any],
		fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void
	) {
		RNNotifications.didReceiveBackgroundNotification(
			userInfo,
			withCompletionHandler: completionHandler
		)
	}
}

class ReactNativeDelegate: RCTDefaultReactNativeFactoryDelegate {
	override func sourceURL(for bridge: RCTBridge) -> URL? {
		bundleURL()
	}

	override func bundleURL() -> URL? {
		#if DEBUG
		RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
		#else
		Bundle.main.url(forResource: "main", withExtension: "jsbundle")
		#endif
	}
}
