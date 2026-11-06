
const consent = document.getElementById("locationConsent");
const statusText = document.getElementById("trackerStatus");

let watchId = null;
let currentPosition = null;

const map = L.map("map").setView([-0.0236, 37.9062], 6);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

let marker = null;

document.getElementById("startTracking").addEventListener("click", function() {
    if (!consent.checked) {
        statusText.textContent = "Please agree before starting.";
        return;
    }

    if (!navigator.geolocation) {
        statusText.textContent = "Location is not supported by this browser.";
        return;
    }

    if (watchId !== null) return;

    statusText.textContent = "Requesting location permission...";

    watchId = navigator.geolocation.watchPosition(
        function(position) {
            currentPosition = position;

            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            document.getElementById("latitude").textContent = lat.toFixed(6);
            document.getElementById("longitude").textContent = lng.toFixed(6);
            document.getElementById("accuracy").textContent =
                Math.round(position.coords.accuracy) + " metres";

            if (marker) {
                marker.setLatLng([lat, lng]);
            } else {
                marker = L.marker([lat, lng]).addTo(map);
            }

            map.setView([lat, lng], 15);
            statusText.textContent = "Your location is displayed.";
        },
        function(error) {
            statusText.textContent = "Location error: " + error.message;
            watchId = null;
        },
        {
            enableHighAccuracy: true,
            maximumAge: 5000,
            timeout: 15000
        }
    );
});

document.getElementById("stopTracking").addEventListener("click", function() {
    if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
    }

    statusText.textContent = "Tracking is stopped.";
});

document.getElementById("shareLocation").addEventListener("click", async function() {
    if (!currentPosition) {
        statusText.textContent = "Start tracking before sharing.";
        return;
    }

    const lat = currentPosition.coords.latitude;
    const lng = currentPosition.coords.longitude;

    const link = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=16/${lat}/${lng}`;

    try {
        if (navigator.share) {
            await navigator.share({
                title: "My Location",
                text: "I chose to share my location.",
                url: link
            });
        } else {
            await navigator.clipboard.writeText(link);
            statusText.textContent = "Location link copied.";
        }
    } catch (error) {
        if (error.name !== "AbortError") {
            statusText.textContent = "Sharing could not be completed.";
        }
    }
});
