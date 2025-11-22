// Frontend-only mock API so the demo runs without any backend.
// Data is persisted in localStorage to keep the experience consistent across refreshes.

const STORAGE_KEY = "mock-api-state";

const defaultState = {
  users: [
    { id: "u1", name: "Ipek Melis", email: "ipekmelis@student.com", password: "123", role: "student" },
    { id: "u2", name: "Jordan Lee", email: "jordan@consultant.com", password: "password", role: "consultant" },
    { id: "u3", name: "Alice Cooper", email: "alice@rep.com", password: "password", role: "representative" },
    { id: "u4", name: "Anna Bauer", email: "anna@owner.com", password: "password", role: "owner" }
  ],
  preferences: {
    u1: {
      workWithConsultant: "yes",
      reason: "job",
      country: "France",
      city: "Paris",
      duration: "6-12",
      housingType: "dorm",
      budgetMin: 200,
      budgetMax: 700,
      campusDistance: "near",
      noiseTolerance: "high",
      safetyImportance: "high",
      transportImportance: "high",
      neighborsPreference: "students",
      marketDistancePreference: "close",
      transitDistancePreference: "close",
      socialPreference: "good",
      roommatePref: "professionals",
      furnished: "yes",
      consultantFocus: "fast_shortlist",
      consultantLanguages: "english",
      wifiNeeded: false,
      washerNeeded: false,
      petsOk: false,
      smokingOk: false,
      elevatorNeeded: false,
      ensuiteBathroom: false,
      repPackage: "5",
      consultantName: "Jordan Lee",
      consultantId: "u2"
    }
  },
  ratings: {
    u1: { consultant: 5, representative: 4 }
  },
  properties: [
    {
      id: "p1",
      title: "Sunny Kreuzberg Loft",
      city: "Berlin",
      country: "Germany",
      price: 1250,
      type: "loft",
      description: "Loft with exposed brick, close to Görlitzer Park. Ideal for students who want transit + cafes.",
      lat: 52.4986,
      lng: 13.4441,
      ownerId: "u4",
      ownerName: "Anna Bauer",
      ownerEmail: "anna@owner.com",
      hasRepresentative: true,
      quality: { noise: "medium", safety: "high", transport: "high", neighbors: "mixed", marketDistance: "close", transitDistance: "close", social: "good" },
      features: { elevator: true, wifi: true, washer: true },
      images: [
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1505693415763-3ed5e04ba4cd?auto=format&fit=crop&w=900&q=80"
      ]
    },
    {
      id: "p10",
      title: "Left Bank Student Dorm Pod",
      city: "Paris",
      country: "France",
      price: 520,
      type: "dorm",
      description: "Quiet dorm pod near Sorbonne and Metro; ideal for students who want fast transit and calm nights.",
      lat: 48.8465,
      lng: 2.3498,
      ownerId: "u4",
      ownerName: "Anna Bauer",
      ownerEmail: "anna@owner.com",
      hasRepresentative: true,
      quality: { noise: "high", safety: "high", transport: "high", neighbors: "students", marketDistance: "close", transitDistance: "close", social: "good" },
      features: { elevator: false, wifi: true, washer: false },
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80"
      ]
    },
    {
      id: "p2",
      title: "Quiet Charlottenburg Studio",
      city: "Berlin",
      country: "Germany",
      price: 980,
      type: "studio",
      description: "Walkable to TU Berlin. Furnished studio with balcony; great light and quiet neighbors.",
      lat: 52.5096,
      lng: 13.3137,
      ownerId: "u4",
      ownerName: "Anna Bauer",
      ownerEmail: "anna@owner.com",
      hasRepresentative: true,
      bestOffer: true,
      quality: { noise: "low", safety: "high", transport: "high", neighbors: "students", marketDistance: "close", transitDistance: "close", social: "good" },
      features: { elevator: true, wifi: true, washer: true },
      images: [
        "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80"
      ]
    },
    {
      id: "p3",
      title: "Canal-side Apartment",
      city: "Amsterdam",
      country: "Netherlands",
      price: 1500,
      type: "entire_place",
      description: "Top-floor flat overlooking the canal. Ideal for exchange students who want lively surroundings.",
      lat: 52.368,
      lng: 4.9036,
      ownerId: "u4",
      ownerName: "Anna Bauer",
      ownerEmail: "anna@owner.com",
      hasRepresentative: false,
      quality: { noise: "medium", safety: "medium", transport: "high", neighbors: "mixed", marketDistance: "medium", transitDistance: "medium", social: "vibrant" },
      features: { elevator: false, wifi: true, washer: true },
      images: [
        "https://images.unsplash.com/photo-1529429617124-aee711a1a74c?auto=format&fit=crop&w=900&q=80"
      ]
    },
    {
      id: "p4",
      title: "Vienna Neubau Share",
      city: "Vienna",
      country: "Austria",
      price: 720,
      type: "shared_room",
      description: "Cozy shared flat with students at TU Wien. Close to metro and weekly market.",
      lat: 48.2064,
      lng: 16.3449,
      ownerId: "u4",
      ownerName: "Anna Bauer",
      ownerEmail: "anna@owner.com",
      hasRepresentative: true,
      quality: { noise: "medium", safety: "high", transport: "high", neighbors: "students", marketDistance: "close", transitDistance: "close", social: "good" },
      features: { elevator: false, wifi: true, washer: true },
      images: [
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80"
      ]
    },
    {
      id: "p5",
      title: "Canary Wharf Riverside",
      city: "London",
      country: "United Kingdom",
      price: 1650,
      type: "entire_place",
      description: "Modern 1-bed with Thames views, quick DLR access. Great for finance interns and grad students.",
      lat: 51.5054,
      lng: -0.0235,
      ownerId: "u4",
      ownerName: "Anna Bauer",
      ownerEmail: "anna@owner.com",
      hasRepresentative: true,
      quality: { noise: "medium", safety: "high", transport: "high", neighbors: "professionals", marketDistance: "close", transitDistance: "close", social: "good" },
      features: { elevator: true, wifi: true, washer: true },
      images: [
        "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80"
      ]
    },
    {
      id: "p6",
      title: "Gràcia Terrace Flat",
      city: "Barcelona",
      country: "Spain",
      price: 1100,
      type: "entire_place",
      description: "Bright flat with private terrace near Fontana metro. Perfect for Erasmus students.",
      lat: 41.4036,
      lng: 2.1579,
      ownerId: "u4",
      ownerName: "Anna Bauer",
      ownerEmail: "anna@owner.com",
      hasRepresentative: false,
      bestOffer: true,
      quality: { noise: "medium", safety: "medium", transport: "high", neighbors: "mixed", marketDistance: "close", transitDistance: "close", social: "vibrant" },
      features: { elevator: false, wifi: true, washer: true },
      images: [
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80"
      ]
    },
    {
      id: "p7",
      title: "Latin Quarter Studio",
      city: "Paris",
      country: "France",
      price: 1280,
      type: "studio",
      description: "Compact studio steps from Sorbonne and cafes. Ideal for exchange terms.",
      lat: 48.8485,
      lng: 2.3431,
      ownerId: "u4",
      ownerName: "Anna Bauer",
      ownerEmail: "anna@owner.com",
      hasRepresentative: true,
      quality: { noise: "medium", safety: "high", transport: "high", neighbors: "students", marketDistance: "close", transitDistance: "close", social: "vibrant" },
      features: { elevator: true, wifi: true, washer: false },
      images: [
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80"
      ]
    },
    {
      id: "p8",
      title: "Riverside Co-Living",
      city: "Prague",
      country: "Czechia",
      price: 620,
      type: "co_living",
      description: "Community-focused co-living with study rooms and weekly events. Metro in 5 minutes.",
      lat: 50.0755,
      lng: 14.4378,
      ownerId: "u4",
      ownerName: "Anna Bauer",
      ownerEmail: "anna@owner.com",
      hasRepresentative: true,
      quality: { noise: "medium", safety: "medium", transport: "high", neighbors: "students", marketDistance: "medium", transitDistance: "close", social: "vibrant" },
      features: { elevator: true, wifi: true, washer: true },
      images: [
        "https://images.unsplash.com/photo-1484156818044-c040038b0710?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80"
      ]
    },
    {
      id: "p9",
      title: "Left Bank Dorm Pod",
      city: "Paris",
      country: "France",
      price: 550,
      type: "dorm",
      description: "Quiet dorm-style pod near Gare d'Austerlitz. Professionals-friendly, quick metro to business hubs.",
      lat: 48.8426,
      lng: 2.3652,
      ownerId: "u4",
      ownerName: "Anna Bauer",
      ownerEmail: "anna@owner.com",
      hasRepresentative: true,
      quality: { noise: "high", safety: "high", transport: "high", neighbors: "mixed", marketDistance: "medium", transitDistance: "close", social: "good" },
      features: { elevator: false, wifi: true, washer: false },
      images: [
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80"
      ]
    }
  ],
  conversations: [
    { id: "c1", participants: ["u1", "u2"] },
    { id: "c2", participants: ["u1", "u3"] },
    { id: "c3", participants: ["u1", "u4"] }
  ],
  messages: [
    { id: "m1", conversationId: "c1", senderId: "u2", text: "Welcome! I shortlisted a few flats for you.", createdAt: new Date().toISOString() },
    { id: "m2", conversationId: "c1", senderId: "u1", text: "Thanks! Can we focus on Charlottenburg?", createdAt: new Date().toISOString() },
    { id: "m3", conversationId: "c2", senderId: "u3", text: "Hi! I can show the studio live this week.", createdAt: new Date().toISOString() }
  ],
  appointments: [
    {
      id: "a1",
      type: "representative",
      time: "tuesday 15:00",
      status: "approved",
      note: JSON.stringify({ propertyId: "p2", propertyTitle: "Quiet Charlottenburg Studio", language: "english", session: "tuesday 15:00" }),
      participantIds: ["u1", "u3"]
    },
    {
      id: "a2",
      type: "consultant_call",
      time: "2025-12-20 14:00",
      status: "pending",
      note: "",
      participantIds: ["u1", "u2"]
    }
  ],
  documents: [
    { id: "d1", name: "Shortlist (PDF)", url: "https://example.com/shortlist.pdf", uploadedAt: new Date().toISOString() },
    { id: "d2", name: "Lease checklist (DOCX)", url: "https://example.com/lease.docx", uploadedAt: new Date().toISOString() }
  ]
};

const clone = (obj) => JSON.parse(JSON.stringify(obj));

const readState = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultState));
    return clone(defaultState);
  }
  try {
    return JSON.parse(stored);
  } catch (err) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultState));
    return clone(defaultState);
  }
};

let db = readState();

const saveState = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
const delay = (result, ms = 120) => new Promise((resolve) => setTimeout(() => resolve(result), ms));
const error = (message, status = 400) => {
  const err = new Error(message);
  err.response = { status, data: { message } };
  return err;
};

// Ensure new seed data is present even if a previous localStorage version exists.
const mergeArrayById = (current = [], seeds = []) => {
  const merged = new Map(current.map((item) => [item.id, item]));
  seeds.forEach((seed) => {
    merged.set(seed.id, { ...(merged.get(seed.id) || {}), ...seed });
  });
  return Array.from(merged.values());
};

const mergeSeeds = () => {
  db.users = mergeArrayById(db.users, defaultState.users);
  db.properties = mergeArrayById(db.properties, defaultState.properties);
  // Force-refresh the Paris dorm so updated images are present.
  const p9 = defaultState.properties.find((p) => p.id === "p9");
  if (p9) {
    db.properties = db.properties.map((p) => (p.id === "p9" ? { ...p, ...p9 } : p));
  }
  db.conversations = mergeArrayById(db.conversations, defaultState.conversations);
  db.messages = mergeArrayById(db.messages, defaultState.messages);
  db.appointments = mergeArrayById(db.appointments, defaultState.appointments);
  db.documents = mergeArrayById(db.documents, defaultState.documents);
  db.preferences = { ...defaultState.preferences, ...(db.preferences || {}) };
  db.ratings = { ...defaultState.ratings, ...(db.ratings || {}) };
  saveState();
};

mergeSeeds();

const currentUser = () => {
  const stored = localStorage.getItem("auth");
  if (!stored) return null;
  try {
    const parsed = JSON.parse(stored);
    return parsed.user || null;
  } catch (err) {
    return null;
  }
};

const findUser = ({ email, password, role }) =>
  db.users.find((u) => u.email === email && u.password === password && (!role || u.role === role));

const nextId = (prefix) => `${prefix}${Date.now()}${Math.floor(Math.random() * 1000)}`;

const filterProperties = (params = {}) => {
  const normalised = (value) => (value ? String(value).toLowerCase() : "");
  return db.properties.filter((p) => {
    if (params.ownerId && p.ownerId !== params.ownerId) return false;
    if (params.city && normalised(p.city) !== normalised(params.city)) return false;
    if (params.minPrice && p.price < Number(params.minPrice)) return false;
    if (params.maxPrice && p.price > Number(params.maxPrice)) return false;
    if (params.noise && p.quality?.noise !== params.noise) return false;
    if (params.safety && p.quality?.safety !== params.safety) return false;
    if (params.transit && p.quality?.transport !== params.transit) return false;
    if (params.neighbors && p.quality?.neighbors !== params.neighbors) return false;
    if (params.market && p.quality?.marketDistance !== params.market) return false;
    if (params.transitDistance && p.quality?.transitDistance !== params.transitDistance) return false;
    if (params.social && p.quality?.social !== params.social) return false;
    if (params.elevator && !p.features?.elevator) return false;
    if (params.wifi && !p.features?.wifi) return false;
    if (params.washer && !p.features?.washer) return false;
    return true;
  });
};

const api = {
  get: async (path, { params } = {}) => {
    if (path === "/preferences") {
      const user = currentUser();
      const prefs = user ? db.preferences[user.id] || {} : {};
      return delay({ data: prefs });
    }

    if (path === "/ratings") {
      const user = currentUser();
      const ratings = user ? db.ratings[user.id] || {} : {};
      return delay({ data: ratings });
    }

    if (path === "/conversations") {
      const userId = params?.userId || currentUser()?.id;
      const list = userId ? db.conversations.filter((c) => c.participants.includes(userId)) : db.conversations;
      return delay({ data: list });
    }

    if (path.startsWith("/conversations/") && path.endsWith("/messages")) {
      const id = path.split("/")[2];
      return delay({ data: db.messages.filter((m) => m.conversationId === id) });
    }

    if (path === "/appointments") {
      return delay({ data: db.appointments });
    }

    if (path === "/properties") {
      return delay({ data: filterProperties(params) });
    }

    if (path === "/documents") {
      return delay({ data: db.documents });
    }

    throw error(`GET ${path} not implemented`, 404);
  },

  post: async (path, body = {}) => {
    if (path === "/auth/login") {
      const user = findUser(body);
      if (!user) throw error("Invalid credentials", 401);
      const token = `demo-token-${user.id}`;
      return delay({ data: { user, token } });
    }

    if (path === "/auth/register") {
      const existing = db.users.find((u) => u.email === body.email && u.role === body.role);
      if (existing) throw error("User already exists for this role");
      const user = { ...body, id: nextId("u") };
      db.users.push(user);
      saveState();
      const token = `demo-token-${user.id}`;
      return delay({ data: { user, token } });
    }

    if (path === "/conversations") {
      const participantIds = body.participantIds || [];
      const convo = { id: nextId("c"), participants: participantIds };
      db.conversations.push(convo);
      saveState();
      return delay({ data: convo });
    }

    if (path.startsWith("/conversations/") && path.endsWith("/messages")) {
      const id = path.split("/")[2];
      const message = { ...body, id: nextId("m"), conversationId: id, createdAt: new Date().toISOString() };
      db.messages.push(message);
      saveState();
      return delay({ data: message });
    }

    if (path === "/appointments") {
      const appointment = { id: nextId("a"), status: "pending_owner", ...body };
      db.appointments.unshift(appointment);
      saveState();
      return delay({ data: appointment });
    }

    if (path === "/properties") {
      const user = currentUser();
      const property = {
        ...body,
        id: nextId("p"),
        ownerId: user?.id || "u4",
        ownerName: user?.name || "Owner",
        ownerEmail: user?.email,
        hasRepresentative: true,
        quality: body.quality || {
          noise: "medium",
          safety: "medium",
          transport: "medium",
          neighbors: "mixed",
          marketDistance: "medium",
          transitDistance: "medium",
          social: "good"
        },
        features: body.features || { elevator: false, wifi: true, washer: true },
        images: body.images || []
      };
      db.properties.unshift(property);
      saveState();
      return delay({ data: property });
    }

    if (path === "/documents") {
      const doc = { id: nextId("d"), uploadedAt: new Date().toISOString(), ...body };
      db.documents.unshift(doc);
      saveState();
      return delay({ data: doc });
    }

    throw error(`POST ${path} not implemented`, 404);
  },

  put: async (path, body = {}) => {
    if (path === "/preferences") {
      const user = currentUser();
      if (!user) throw error("Not authenticated", 401);
      db.preferences[user.id] = body;
      saveState();
      return delay({ data: body });
    }

    if (path === "/ratings") {
      const user = currentUser();
      if (!user) throw error("Not authenticated", 401);
      db.ratings[user.id] = body;
      saveState();
      return delay({ data: body });
    }

    throw error(`PUT ${path} not implemented`, 404);
  },

  patch: async (path, body = {}) => {
    if (path.startsWith("/appointments/") && path.endsWith("/status")) {
      const id = path.split("/")[2];
      const idx = db.appointments.findIndex((a) => a.id === id);
      if (idx === -1) throw error("Appointment not found", 404);
      db.appointments[idx] = { ...db.appointments[idx], status: body.status || db.appointments[idx].status };
      saveState();
      return delay({ data: db.appointments[idx] });
    }

    throw error(`PATCH ${path} not implemented`, 404);
  },

  delete: async (path) => {
    if (path === "/preferences") {
      const user = currentUser();
      if (!user) throw error("Not authenticated", 401);
      delete db.preferences[user.id];
      saveState();
      return delay({ data: {} });
    }

    throw error(`DELETE ${path} not implemented`, 404);
  }
};

// Shared helpers for the mock socket.
export const addMessage = (message) => {
  const msg = { ...message, id: message.id || nextId("m"), createdAt: message.createdAt || new Date().toISOString() };
  db.messages.push(msg);
  saveState();
  return msg;
};

export const getDb = () => db;
export const getCurrentUser = currentUser;

export default api;
