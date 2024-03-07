// Service Worker Installation

console.log("Service Worker Loaded...");

self.addEventListener("activate", async (e) => {
	console.log("Service Worker: Activated");
});

self.addEventListener("push", (event) => {
	console.log("Push Received...", event);
	if (!(self.Notification && self.Notification.permission === "granted")) {
		return;
	}

	const data = event.data?.text() ?? {};
	console.log("data:", data);
	const title = data.title || "Kris+ Merchant App";
	const message = data || "Here's something you might want to check out.";

	const options = {
		body: message
		// here you can add more properties like icon, image, vibrate, etc.
	};
	self.registration.showNotification(title, options);

	// notification.addEventListener("click", () => {
	// 	clients.openWindow("https://example.blog.com/2015/03/04/something-new.html");
	// });
});
