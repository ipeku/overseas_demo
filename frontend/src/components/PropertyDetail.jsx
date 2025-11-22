import { useState } from "react";
import VideoCall from "./VideoCall";
import PropertyMap from "./PropertyMap";

const DAYS = [
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
  { value: "saturday", label: "Saturday" },
  { value: "sunday", label: "Sunday" }
];

const TIMES = ["13:00", "14:00", "15:00", "16:00"];

export default function PropertyDetail({
  property,
  repRequests = [],
  repSlotsRemaining = 0,
  onRepresentativeRequest,
  onRepresentativeTerminate,
  onMessageOwner,
  onMessageRepresentative,
  onSelectRepPackage,
  currentRepPackage,
  onClose,
  onReserve
}) {
  const [showVideo, setShowVideo] = useState(false);
  const [repPrefs, setRepPrefs] = useState({
    representativeLanguage: "",
    representativeAvailability: "",
    representativeTime: "",
    repPackageChoice: ""
  });
  const [requestStatus, setRequestStatus] = useState("");
  const [sessionActive, setSessionActive] = useState(false);
  const [sessionTerminated, setSessionTerminated] = useState(false);
  const [confirmRequest, setConfirmRequest] = useState(false);
  const SESSION_MS = 15 * 60 * 1000; // 15 minutes

  if (!property)
    return (
      <div className="card">
        <p>Select a property to see details, images, and make representative requests.</p>
      </div>
    );

  const placeholderImages = [
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1523419400524-fc1e0af1a6ab?auto=format&fit=crop&w=900&q=80"
  ];
  const isParisDorm = property.id === "p9";
  const allowFallbackImages = !isParisDorm; // default: fill to 3; Paris dorm handled manually
  const baseImages = (() => {
    if (isParisDorm) {
      // Use only the provided images; no placeholder on the left
      return property.images && property.images.length ? property.images : [];
    }
    if (property.images && property.images.length) return property.images;
    return allowFallbackImages ? placeholderImages : [];
  })();
  const images = baseImages.slice(0, 3);
  while (images.length < 3 && allowFallbackImages) {
    images.push(placeholderImages[images.length % placeholderImages.length]);
  }
  // Force housing/dorm visuals for consistency
  const housingImages = [
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1484156818044-c040038b0710?auto=format&fit=crop&w=900&q=80"
  ];
  const finalImages = (images.length ? images : housingImages).map((_, idx) => housingImages[idx % housingImages.length]);

  const existingReq = repRequests.find((r) => r.propertyId === property.id && r.status !== "terminated");
  const videoEnabled = existingReq && (existingReq.status === "approved_owner" || existingReq.status === "approved");
  const allowRepMessaging = !!existingReq;
  const canStartVideo = videoEnabled && !sessionTerminated;
  const displayStatus = (status) => (status === "approved_owner" ? "approved" : status || "-");

  const handleRepPrefChange = (e) => {
    const { name, value } = e.target;
    setRepPrefs((p) => ({ ...p, [name]: value }));
  };

  const submitRepresentative = (e) => {
    e.preventDefault();
    if (existingReq) {
      setRequestStatus("You already have a representative request for this property.");
      return;
    }
    if (!repPrefs.repPackageChoice) {
      setRequestStatus("Please select a representative package.");
      return;
    }
    if (repSlotsRemaining <= 0 && currentRepPackage) {
      setRequestStatus("No representative matches left in your package.");
      return;
    }
    if (!repPrefs.representativeAvailability || !repPrefs.representativeTime) {
      setRequestStatus("Please choose a day and time.");
      return;
    }
    if (!confirmRequest) {
      setRequestStatus("Please confirm before sending the request.");
      return;
    }
    if (onRepresentativeRequest) {
      const result = onRepresentativeRequest({
        propertyId: property.id,
        propertyTitle: property.title,
        language: repPrefs.representativeLanguage || "english",
        session: `${repPrefs.representativeAvailability} ${repPrefs.representativeTime}`,
        repPackageChoice: repPrefs.repPackageChoice,
        triggeredByClick: true
      });
      if (result && result.ok === false) {
        setRequestStatus(result.message || "Request could not be created.");
        return;
      }
    }
    if (onSelectRepPackage && !currentRepPackage) {
      onSelectRepPackage(repPrefs.repPackageChoice);
    }
    setRequestStatus("Representative request sent. Awaiting owner approval.");
    setConfirmRequest(false);
  };

  const startSession = () => {
    if (!videoEnabled || sessionTerminated) return;
    setShowVideo(true);
    setSessionActive(true);
    setSessionTerminated(false);
    setTimeout(() => {
      setShowVideo(false);
      setSessionActive(false);
      setSessionTerminated(true);
      if (onRepresentativeTerminate) onRepresentativeTerminate(property.id);
    }, SESSION_MS);
  };

  const endSessionEarly = () => {
    setShowVideo(false);
    setSessionActive(false);
    setSessionTerminated(true);
    if (onRepresentativeTerminate) onRepresentativeTerminate(property.id);
  };

  return (
    <div className="card" style={{ marginTop: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
        <h3 style={{ marginTop: 0 }}>{property.title}</h3>
        {typeof onClose === "function" && (
          <button className="btn btn-ghost" type="button" onClick={onClose}>
            Close
          </button>
        )}
      </div>
      <p style={{ margin: "4px 0", color: "var(--muted)" }}>
        {property.city}, {property.country}
      </p>
      <p style={{ margin: "4px 0", fontWeight: 700 }}>EUR {property.price} per month</p>
      <p>{property.description}</p>

      <div style={{ marginTop: 12 }}>
        <h4 style={{ marginBottom: 6 }}>Location</h4>
        <PropertyMap property={property} />
      </div>

      {finalImages.length > 0 && (
        <div style={{ display: "grid", gap: 8, gridTemplateColumns: "repeat(3, minmax(0, 1fr))", marginTop: 10 }}>
          {finalImages.map((img, idx) => (
            <img
              key={`${property.id}-img-${idx}`}
              src={img}
              onError={(e) => {
                if (e.target.dataset.fallback) return;
                e.target.dataset.fallback = "1";
                e.target.src = housingImages[0];
              }}
              alt={property.title}
              style={{ width: "100%", borderRadius: 12, objectFit: "cover" }}
            />
          ))}
        </div>
      )}

      <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
        <button className="btn btn-secondary" onClick={() => onMessageOwner && onMessageOwner(property.ownerId)}>
          Message owner{property.ownerName ? ` (${property.ownerName})` : ""}
        </button>
        <button className="btn btn-primary" onClick={() => onReserve && onReserve(property)}>
          Reserve this home
        </button>
        {allowRepMessaging && (
          <button className="btn btn-ghost" onClick={() => onMessageRepresentative && onMessageRepresentative()}>
            Message representative (Alice Cooper)
          </button>
        )}
      </div>

      <h4 style={{ marginTop: 12 }}>Owner</h4>
      <p style={{ margin: 0 }}>
        {property.ownerName || "Listing owner"} {property.ownerEmail ? `- ${property.ownerEmail}` : ""}
      </p>
      <h4 style={{ marginTop: 12 }}>Quality & features</h4>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 8 }}>
        {[
          { label: "Noise", value: property.quality && property.quality.noise },
          { label: "Safety", value: property.quality && property.quality.safety },
          { label: "Transport", value: property.quality && property.quality.transport },
          { label: "Neighbors", value: property.quality && property.quality.neighbors },
          { label: "Market distance", value: property.quality && property.quality.marketDistance },
          { label: "Transit distance", value: property.quality && property.quality.transitDistance },
          { label: "Social amenities", value: property.quality && property.quality.social },
          { label: "Elevator", value: property.features && property.features.elevator ? "Yes" : "No" },
          { label: "Wi-Fi", value: property.features && property.features.wifi ? "Yes" : "No" },
          { label: "Washer", value: property.features && property.features.washer ? "Yes" : "No" }
        ].map((item) => (
          <div
            key={item.label}
            style={{
              border: "1px solid var(--border)",
              borderRadius: 10,
              padding: "10px 12px",
              background: "#f8fafc"
            }}
          >
            <div style={{ fontSize: 12, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {item.label}
            </div>
            <div style={{ fontWeight: 600, marginTop: 4 }}>{item.value || "-"}</div>
          </div>
        ))}
      </div>

      {property.hasRepresentative && (
        <>
          <h4 style={{ marginTop: 12 }}>Representative matching</h4>
          <form onSubmit={(e) => e.preventDefault()} style={{ display: "grid", gap: 8 }}>
            <label>
              Representative package
              <select
                name="repPackageChoice"
                value={repPrefs.repPackageChoice}
                onChange={handleRepPrefChange}
              >
                <option value="">Select a package</option>
                <option value="3">Up to 3 homes (EUR 30)</option>
                <option value="5">Up to 5 homes (EUR 40)</option>
              </select>
            </label>
            <label>
              Representative day (local to {property.city})
              <select
                name="representativeAvailability"
                value={repPrefs.representativeAvailability}
                onChange={handleRepPrefChange}
              >
                <option value="">Select day</option>
                {DAYS.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Time (local to {property.city})
              <select
                name="representativeTime"
                value={repPrefs.representativeTime}
                onChange={handleRepPrefChange}
              >
                <option value="">Select time</option>
                {TIMES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Representative language
              <select
                name="representativeLanguage"
                value={repPrefs.representativeLanguage}
                onChange={handleRepPrefChange}
              >
                <option value="">Select language</option>
                <option value="english">English</option>
                <option value="turkish">Turkish</option>
                <option value="german">German</option>
                <option value="french">French</option>
              </select>
            </label>
            {currentRepPackage && (
              <div style={{ background: "#f3f7f7", padding: 10, borderRadius: 10, border: "1px solid var(--border)" }}>
                <strong>Representative package</strong>
                <div>
                  {currentRepPackage === "5" ? "Up to 5 homes (EUR 40)" : "Up to 3 homes (EUR 30)"}
                </div>
                <div>Remaining matches: {repSlotsRemaining < 0 ? 0 : repSlotsRemaining}</div>
              </div>
            )}
            <label className="label-inline">
              <input
                type="checkbox"
                checked={confirmRequest}
                onChange={(e) => setConfirmRequest(e.target.checked)}
              />
              I confirm to send this request
            </label>
            <button className="btn btn-primary" type="button" disabled={!confirmRequest} onClick={submitRepresentative}>
              Request a representative
            </button>
            {requestStatus && <div style={{ color: "var(--muted)" }}>{requestStatus}</div>}
            {existingReq && (
              <div style={{ color: "var(--muted)" }}>
                Current status: {displayStatus(existingReq.status).toUpperCase()}
              </div>
            )}
          </form>

          <div style={{ marginTop: 16 }}>
            <h4>Live walkthrough</h4>
            {!videoEnabled && (
              <p>Video room will be enabled after matching and at the confirmed time.</p>
            )}
            {sessionTerminated && (
              <p style={{ color: "var(--muted)" }}>Representative session terminated successfully.</p>
            )}
            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <button
                className="btn btn-secondary"
                disabled
                title="Video will be enabled once backend integration is ready"
              >
                Video room (disabled)
              </button>
              {videoEnabled && sessionActive && (
                <button className="btn btn-ghost" type="button" onClick={endSessionEarly}>
                  Close session
                </button>
              )}
            </div>
            {videoEnabled && showVideo && (
              <VideoCall
                roomName={`property-${property.id}-demo-room`}
                height={400}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
