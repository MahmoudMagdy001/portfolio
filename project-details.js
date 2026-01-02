const projectsData = [
    {
        title: "E-commerce App",
        description: "This is not just a shopping app; it is a full-scale enterprise-grade mobile commerce solution designed to handle thousands of products and users simultaneously. \n\n**1. Advanced Architecture (Clean Architecture & SOLID):**\nThe codebase is strictly organized using **Clean Architecture**. This ensures that the Business Logic, Data, and Presentation layers are completely decoupled. We use **Dependency Injection (get_it)** to manage instances, making the app highly testable and scalable. \n\n**2. Robust State Management (Flutter BLoC):**\nWe utilized the BLoC (Business Logic Component) pattern to manage state. This allows for predictable state transitions (Loading, Loaded, Error) and enables us to handle complex user flows like 'Guest Checkout' vs 'User Checkout' seamlessly. \n\n**3. High-Performance Networking:**\nThe app uses **Dio** for network requests, equipped with custom **Interceptors** for logging, error handling, and automatically refreshing authentication tokens (JWT). We implemented smart caching policies to allow users to browse previously visited products even when offline.\n\n**4. Payment & Security:**\nIntegrated **Stripe Payment Intents** for a secure checkout experience. Sensitive user data is encrypted, and we strictly follow PCI-DSS compliance guidelines handles by the payment gateway.",
        features: [
            "Clean Architecture & SOLID Principles",
            "Advanced BLoC State Management",
            "Secure Stripe Checkout",
            "Offline Caching & Dio Interceptors",
            "Real-time Inventory Sync",
            "Multi-language Support (Localization)"
        ],
        tech: ["Flutter", "Dart", "BLoC", "Stripe", "Dio", "Hive"],
        icons: { main: "fa-shopping-bag", gallery: ["fa-home", "fa-search", "fa-filter", "fa-shopping-cart", "fa-credit-card", "fa-user"] },
        github: "#",
        live: "#"
    },
    {
        title: "Colon Cancer Detection",
        description: "A specialized MedTech tool that bridges the gap between initial symptoms and professional medical diagnosis. \n\n**1. Machine Learning Integration:**\nThe core of this app is a **TensorFlow Lite** model that runs on-device (or via API) to analyze patient inputs. The model was trained on thousands of clinical datasets to recognize patterns in symptoms like age, weight loss, and medical history. \n\n**2. Backend Infrastructure:**\nWe built a high-performance **Python (FastAPI)** backend to handle complex inference requests if the local model is insufficient. The API is documented with Swagger and follows RESTful standards. \n\n**3. Data Privacy & Security:**\nMedical data is sensitive. We implemented **End-to-End Encryption** for data in transit. The app does not store identifiable patient data permanently on the server, ensuring compliance with privacy standards. \n\n**4. User-Centric Design:**\nThe UI is specifically designed for accessibility, with high contrast modes and large typography, considering that the target demographic might be elderly patients.",
        features: [
            "AI/ML Risk Assessment Engine",
            "FastAPI Python Backend",
            "Secure Data Encryption",
            "Medical History Tracking",
            "Doctor Dashboard Integration",
            "Health Tips & Guidance"
        ],
        tech: ["Flutter", "Python", "FastAPI", "TensorFlow", "Security"],
        icons: { main: "fa-heartbeat", gallery: ["fa-notes-medical", "fa-user-nurse", "fa-file-medical-alt", "fa-chart-bar", "fa-shield-alt", "fa-hospital"] },
        github: "#",
        live: "#"
    },
    {
        title: "Chat Application",
        description: "A real-time communication powerhouse that mimics the responsiveness of top-tier chat apps like WhatsApp or Telegram. \n\n**1. Instant messaging with Firestore:**\nLeveraging **Cloud Firestore's** real-time listeners, messages are synchronized across devices with sub-second latency. We use **Optimistic UI updates** to make the app feel instant—showing the message as 'sent' locally before the server confirms it. \n\n**2. Multimedia Handling:**\nThe app supports sending images and videos. We developed a compression algorithm using **Flutter Image Compress** to reduce file sizes before upload, saving bandwidth and storage costs on **Firebase Storage**. \n\n**3. Robust Offline Support:**\nFirestore's offline persistence is enabled and tuned. Users can read entire chat histories and compose messages while in 'Airplane Mode'. These queued messages are automatically dispatched once connectivity is restored. \n\n**4. Push Notifications:**\nIntegrated **Firebase Cloud Messaging (FCM)** to deliver notifications even when the app is terminated, ensuring users never miss an important message.",
        features: [
            "Real-time Sync & Sub-second Latency",
            "Optimistic UI Updates",
            "Image/Video Compression & Upload",
            "Offline Persistence & Queueing",
            "Push Notifications (FCM)",
            "Group Chat Administration"
        ],
        tech: ["Flutter", "Firebase", "Firestore", "Cloud Functions", "FCM"],
        icons: { main: "fa-comments", gallery: ["fa-comment-alt", "fa-users", "fa-camera", "fa-microphone", "fa-image", "fa-cog"] },
        github: "#",
        live: "#"
    },
    {
        title: "E-Learning Platform",
        description: "An educational ecosystem designed to democratize access to high-quality learning materials. \n\n**1. Adaptive Video Streaming:**\nThe video player is the heart of this app. It supports **Adaptive Bitrate Streaming**, adjusting video quality based on the user's internet speed to prevent buffering. It also remembers the last played position for every course. \n\n**2. Interactive Quiz Engine:**\nWe built a dynamic quiz engine that supports multiple question types (Multiple Choice, True/False). State is preserved during the quiz, so accidental app closures don't lose progress. Results are analyzed to generate performance graphs. \n\n**3. Content Delivery & Offline Access:**\nCourse materials (PDFs, Slides) can be downloaded for offline viewing. We use **Dio** for reliable background downloading with pause/resume capabilities. \n\n**4. Instructor Mode:**\nThe app features a separate dashboard for instructors to upload content, monitor student engagement, and reply to Q&A threads.",
        features: [
            "Adaptive Video Player",
            "Background PDF/Video Downloading",
            "Interactive Quiz & Grading logic",
            "Instructor Analytics Dashboard",
            "Course Progress Tracking",
            "Q&A Discussion Forums"
        ],
        tech: ["Flutter", "Video Player", "Provider", "REST API", "SQLite"],
        icons: { main: "fa-graduation-cap", gallery: ["fa-play", "fa-book", "fa-question-circle", "fa-download", "fa-chart-pie", "fa-user-graduate"] },
        github: "#",
        live: "#"
    },
    {
        title: "Muslim App",
        description: "A spiritually centered 'Super App' that combines precision utility with serenity. \n\n**1. High-Precision Geolocation:**\nPrayer times are calculated locally using the device's exact GPS coordinates. The app implements complex astronomical algorithms (Calculation Methods like ISNA, MWL) to ensure accuracy anywhere in the world. \n\n**2. Qibla Direction with Sensor Fusion:**\nWe use the device's Accelerometer and Magnetometer sensors. A **Low-Pass Filter** is applied to the sensor data to smooth out the compass needle movement, preventing jitter and ensuring a steady direction. \n\n**3. Background Audio Services:**\nThe audio player for the Quran is built to run as a **Foreground Service** on Android, allowing it to continue playing even when the app is closed. It supports playlist management and background controls. \n\n**4. Database Optimization:**\nThe full text of the Quran and translations are stored in a pre-populated **SQLite** database, ensuring instant search results and fast rendering without needing an internet connection.",
        features: [
            "Astronomical Prayer Calculation",
            "Sensor-fused Qibla Compass",
            "Background Audio Service",
            "SQLite Database for Quran Text",
            "Daily Azkar & Notifications",
            "Hijri/Gregorian Calendar Converter"
        ],
        tech: ["Flutter", "Geolocator", "Sensors", "SQLite", "Audio Service"],
        icons: { main: "fa-quran", gallery: ["fa-praying-hands", "fa-compass", "fa-mosque", "fa-book-open", "fa-calendar-alt", "fa-moon"] },
        github: "#",
        live: "#"
    }
];

// Get ID from URL
const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get('id');

if (projectId !== null && projectsData[projectId]) {
    const data = projectsData[projectId];

    document.title = `${data.title} | Details`;
    document.getElementById('p-title').textContent = data.title;
    // Handle markdown-ish line breaks
    document.getElementById('p-desc').innerHTML = data.description.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Render Main Image (Placeholder)
    const mainImgContainer = document.getElementById('p-main-img');
    mainImgContainer.innerHTML = `<div class="gallery-placeholder"><i class="fas ${data.icons.main}" style="font-size: 5rem; color: var(--primary);"></i><span>Main Dashboard Preview</span></div>`;

    // Render Gallery (Placeholders)
    const galleryContainer = document.getElementById('p-gallery');
    data.icons.gallery.forEach((icon, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `<div class="gallery-placeholder"><i class="fas ${icon}"></i><span>Screenshot ${index+1}</span></div>`;
        galleryContainer.appendChild(item);
    });

    // Features
    const featList = document.getElementById('p-features');
    data.features.forEach(f => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="fas fa-check-circle"></i> ${f}`;
        featList.appendChild(li);
    });

    // Tech Stack
    const techList = document.getElementById('p-tech');
    data.tech.forEach(t => {
        const s = document.createElement('span');
        s.className = 'tech-tag';
        s.textContent = t;
        techList.appendChild(s);
    });

    document.getElementById('p-github').href = data.github;
    document.getElementById('p-live').href = data.live;
} else {
    document.querySelector('.details-container').innerHTML = "<h1 style='text-align:center; color:white; margin-top:50px;'>Project Not Found</h1><div style='text-align:center; margin-top:20px;'><a href='index.html' class='btn btn-outline'>Back Home</a></div>";
}
