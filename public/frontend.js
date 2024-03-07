// Generate VAPID keys (public and private)
// Check for service worker
// if ("serviceWorker" in navigator) {
//     send().catch((err) => console.error(err));
// }
const publicVapidKey = 'BIYcaOrUnVcVMP-Pk138zIYjlncZBEB4zizCiHwgoy10np1t8XWomiHefFSGQyLikd83zIIlR4Q_9lDo5nIyLKw';

// Register SW, Register Push, Send Push
async function send() {
    // Register Service Worker
    console.log("Registering service worker...");
    await navigator.serviceWorker.register("./worker.js")

    await window.Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            console.log("notifications granted")
            // get service worker                     
            navigator.serviceWorker.ready.then(async (sw) => {
                subscribeToPushMessages();
            });
        }

    })
}

async function subscribeToPushMessages() {
    const serviceWorkerRegistration = await navigator.serviceWorker.ready;

    // Check if the user has an existing subscription
    // let pushSubscription = serviceWorkerRegistration.pushManager.getSubscription();
    // if (pushSubscription) {
    //     console.log("User is already subscribed to push notifications");
    //     // The user is already subscribed to push notifications
    //     return;
    // }

    try {
        console.log("Subscribing user to push notifications");
        // Subscribe the user to push notifications
        pushSubscription = await serviceWorkerRegistration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
        });
        // Send Push Notification
        console.log("Subscription created...", JSON.stringify(pushSubscription));
        // Send subscription to server (you need to implement this part)
        console.log('Registering subscription...')
        // await fetch('http://localhost:3000/register', {
        await fetch('https://tame-plum-octopus-vest.cyclic.app/register', {
        // await fetch('https://ma-pwa-server.onrender.com/register', {
            method: 'POST',
            body: JSON.stringify(pushSubscription),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log("Subscription registered...");
    } catch (err) {
        // The subscription wasn't successful.
        console.log("Error", err);
    }
}

// Utility function for browser interoperability
function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

