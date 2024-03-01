// Service Worker Installation

console.log("Service Worker Loaded...");

self.addEventListener("activate", async (e) => {
    console.log("Service Worker: Activated");    
});

self.addEventListener("push", (event) => {
    console('Push Received...')
    if (!(self.Notification && self.Notification.permission === "granted")) {
        return;
    }

    const data = event.data?.json() ?? {};
    const title = data.title || "Something Has Happened";
    const message =
        data.message || "Here's something you might want to check out.";
    const icon = "images/new-notification.png";

    const notification = new self.Notification(title, {
        body: message,
        tag: "simple-push-demo-notification",
        icon,
    });

    notification.addEventListener("click", () => {
        clients.openWindow(
            "https://example.blog.com/2015/03/04/something-new.html",
        );
    });
});

