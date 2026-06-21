export const projectsDetailData = {
  wassaly: {
    questNumber: 'Quest 01',
    category: 'Delivery & Services',
    title: 'Wassaly',
    subtitle: 'Smart Delivery',
    tagline: 'Smart planning & on-demand goods delivery, built for scale.',
    repository: 'https://github.com/MahmoudMagdy001/wassaly',
    color: '#6366f1',
    stats: [
      { label: 'Framework', value: 'Flutter', isIcon: true, iconType: 'flutter' },
      { label: 'Language', value: 'Dart', isIcon: true, iconType: 'dart' },
      { label: 'Architecture', value: '3-Layer Clean Arch', isIcon: false },
      { label: 'Scale', value: 'Multi-Domain', isIcon: false }
    ],
    overview: {
      goalTitle: 'The Quest Goal',
      goalDesc1: 'On-demand goods delivery platforms are inherently complex, often plagued by tight coupling between e-commerce features, service booking engines, and real-time maps. This causes regression errors where adding a notification handler can break checkouts.',
      goalDesc2: 'Wassaly was designed to prove that a massive, multi-feature service app can remain highly maintainable. Built using strict Clean Architecture (Presentation -> Domain <- Data), it houses a full-featured cart catalog, dynamic vendor listings, service booking workflows, and live order trackers, all scaling smoothly with zero logic leakage.',
      outcomes: [
        'Strict 3-layer Clean Architecture with feature-first separation',
        'Auto Request Cancellation via SafeBloc to prevent memory leaks',
        'Dynamic vendor catalogs, checkout, and order histories',
        'State-aware network caching and connection loss recovery',
        'Fully responsive layouts using ScreenUtil scaling rules',
        'Automated model mapping from backend REST responses to Equatable entities'
      ],
      walkthrough: {
        videoPath: null,
        fallbackImg: '/images/waslay.png'
      }
    },
    features: [
      {
        id: 1,
        iconName: 'Truck',
        title: 'Goods On-Demand Dispatch',
        desc: 'Supports multi-item checkout from different stores. The ordering flow manages item availability, tax computations, delivery charges, and live route status updates.',
        tags: ['Dio Rest Client', 'Cart Cubit', 'Multi-Store Engine']
      },
      {
        id: 2,
        iconName: 'Users',
        title: 'Professional Service Booking',
        desc: 'Allows users to book vetted home professionals (handymen, plumbers, electricians). It coordinates scheduled times, priority logs, and multi-part media uploads.',
        tags: ['Multipart Form Data', 'Service Cubit', 'Calendar Grid']
      },
      {
        id: 3,
        iconName: 'MapPin',
        title: 'Live Tracking Interface',
        desc: 'Uses flutter_map and Geolocator coordinates to render the user\'s current destination and plot the active delivery rider on a real-time path.',
        tags: ['flutter_map', 'geolocator', 'latlong2']
      },
      {
        id: 4,
        iconName: 'ShieldAlert',
        title: 'Network-Aware Storage',
        desc: 'Ensures transactions are written to a localized cache if requests fail. When internet restabilizes, the connectivityRestoredStream triggers auto-retries.',
        tags: ['InternetService', 'Hive DB', 'Dio Interceptors']
      }
    ],
    alert: {
      type: 'warning',
      title: 'Automated Token & Thread Lifecycle',
      desc: 'All HTTP threads are tied to their respective Bloc contexts. If a user navigates away or closes a screen, the parent SafeBloc calls CancelRequestService to abort active threads, preventing background battery drain.'
    },
    architecture: {
      folderTree: [
        {
          name: 'lib',
          type: 'dir',
          isOpen: true,
          children: [
            {
              name: 'core',
              type: 'dir',
              isOpen: false,
              children: [
                { name: 'config', type: 'dir', children: [{ name: 'app_config.dart', type: 'file' }] },
                { name: 'services', type: 'dir', children: [{ name: 'dio_service.dart', type: 'file' }, { name: 'firebase_service.dart', type: 'file' }] },
                { name: 'utils', type: 'dir', children: [{ name: 'task_runner.dart', type: 'file' }, { name: 'failures.dart', type: 'file' }] }
              ]
            },
            {
              name: 'features',
              type: 'dir',
              isOpen: true,
              children: [
                {
                  name: 'orders',
                  type: 'dir',
                  isOpen: true,
                  children: [
                    { name: 'data', type: 'dir', children: [{ name: 'models', type: 'dir' }, { name: 'repositories', type: 'dir' }] },
                    { name: 'domain', type: 'dir', children: [{ name: 'entities', type: 'dir' }, { name: 'usecases', type: 'dir' }] },
                    { name: 'presentation', type: 'dir', children: [{ name: 'bloc', type: 'dir' }, { name: 'screens', type: 'dir' }] }
                  ]
                }
              ]
            }
          ]
        }
      ],
      folderCaption: 'Standard 3-Layer Clean Architecture structure',
      techTitle: 'Unidirectional Clean Architecture',
      techDesc: 'Wassaly strictly segregates dependencies. The presentation layer imports only domain contracts. Concrete datasources (Dio, Firebase) are isolated inside the data layer, ensuring business rules in the domain layer remain pure Dart code with zero external library bloat.',
      layers: [
        {
          name: 'Presentation',
          color: 'indigo',
          desc: 'Managed by SafeBloc/SafeCubit. UI widgets only listen to specific state triggers via BlocSelector, avoiding unnecessary rebuild loops.'
        },
        {
          name: 'Domain',
          color: 'sky',
          desc: 'Pure Dart codebase. Houses core business usecases and Equatable value entities, acting as the single source of truth.'
        },
        {
          name: 'Data',
          color: 'emerald',
          desc: 'Implements repository interfaces. Handles API request maps, local caching serialization, and throws normalized Failures.'
        }
      ],
      diDetails: 'Dependencies are registered as LazySingletons for data abstractions (DioService, InternetService) and Factories for BLoC/Cubit elements. This ensures clean startup execution without bloating device memory allocations.'
    },
    screenshots: [
      { id: 1, mockType: 'wassaly-dashboard', title: 'Interactive Main Dashboard', desc: 'Featured grocery stores, service categories, and quick banners for active promotions.' },
      { id: 2, mockType: 'wassaly-cart', title: 'Dynamic Checkout Cart', desc: 'Real-time item count updates, promo code validations, and delivery fee calculators.' },
      { id: 3, mockType: 'wassaly-map', title: 'Live Delivery Map', desc: 'Renders map overlay, rider location pins, and a bottom sheet displaying the courier\'s details.' },
      { id: 4, mockType: 'wassaly-service', title: 'Home Services Dispatch', desc: 'Selecting skilled maintenance personnel with prioritized descriptions and calendar bookings.' }
    ]
  },

  propix8: {
    questNumber: 'Quest 02',
    category: 'Real Estate Platform',
    title: 'Propix8 Real Estate',
    subtitle: 'Real Estate',
    tagline: 'High-fidelity property discovery & booking ecosystem.',
    repository: 'https://github.com/MahmoudMagdy001/propix8',
    color: '#0ea5e9',
    stats: [
      { label: 'Framework', value: 'Flutter', isIcon: true, iconType: 'flutter' },
      { label: 'Language', value: 'Dart', isIcon: true, iconType: 'dart' },
      { label: 'Architecture', value: 'MVVM Feature-First', isIcon: false },
      { label: 'Scale', value: '19+ Modules', isIcon: false }
    ],
    overview: {
      goalTitle: 'The Quest Goal',
      goalDesc1: 'Real estate exploration platforms are often plagued by sluggish response times, cluttered listing pages, and rigid architectures that fail when adding integrations like mapping, booking, or live messaging.',
      goalDesc2: 'Propix8 was engineered to solve these core limitations. The goal was to build a mobile experience that acts as a unified hub for high-fidelity property discovery, side-by-side spec comparison, live virtual video tours, and home service bookings. It achieves 60fps scrolling using a rigid Feature-First MVVM layer structure, preventing side-effects from crossing module boundaries.',
      outcomes: [
        'Consistent 60fps performance across nested lists & maps',
        'Modular codebase allowing 19+ distinct modules to scale',
        'Clean reactive state transitions with zero state leaks',
        'Fully functional offline caching using local DB abstractions',
        'Responsive sizing utilizing screenutil guidelines',
        'Seamless deep-linking integration for marketing sharing'
      ],
      walkthrough: {
        videoPath: '/propix8/propix-preview.mp4',
        fallbackImg: '/images/propix.png'
      }
    },
    features: [
      {
        id: 1,
        iconName: 'MapPin',
        title: 'Geographic Map Plotting',
        desc: 'Integrated flutter_map with OpenStreetMap tiles for location discovery. The map computes distance variables dynamically on the client, plotting clustered markers of properties. Users can swipe cards at the bottom of the map page to instantly pan to matching map pins.',
        tags: ['flutter_map', 'geolocator', 'latlong2']
      },
      {
        id: 2,
        iconName: 'Layers3',
        title: 'Property Comparison Engine',
        desc: 'Allows users to queue properties and compounds into a comparative matrix. The comparative module scans properties across dozens of spec attributes (pricing, ratings, total size, number of units, amenities, security level) and highlights winning parameters.',
        tags: ['Cubit Matrix', 'Equatable model comparison']
      },
      {
        id: 3,
        iconName: 'Smartphone',
        title: 'Virtual Video Tours',
        desc: 'Properties are accompanied by immersive walkthrough tours. The media player engine lazily initializes videos and handles buffer statuses using customizable shimmer loading skeletons, preventing layout shifting on slow networks.',
        tags: ['chewie', 'video_player']
      },
      {
        id: 4,
        iconName: 'MessageSquareCode',
        title: 'Home Services & Maintenance',
        desc: 'A post-contract booking ecosystem. Tenancy agreements unlock maintenance services (electrical, plumbing, housekeeping). Users can log requests, select priority levels, upload camera photos, and schedule provider arrival times.',
        tags: ['image_picker', 'Dio Multi-part form']
      }
    ],
    alert: {
      type: 'warning',
      title: 'Network Failure Handling',
      desc: 'All remote API queries are bound to custom TaskRunner wrappers. If internet connections fail or packets drop, the client isolates errors into Failure models (ServerFailure, NetworkFailure) and falls back to localized hive DB caches to render cached exploration grids.'
    },
    architecture: {
      folderTree: [
        {
          name: 'lib',
          type: 'dir',
          isOpen: true,
          children: [
            {
              name: 'core',
              type: 'dir',
              isOpen: true,
              children: [
                { name: 'config', type: 'dir', children: [{ name: 'app_config.dart', type: 'file' }] },
                { name: 'services', type: 'dir', children: [{ name: 'dio_service.dart', type: 'file' }, { name: 'internet_service.dart', type: 'file' }] },
                { name: 'utils', type: 'dir', children: [{ name: 'task_runner.dart', type: 'file' }, { name: 'failures.dart', type: 'file' }] },
                { name: 'shared', type: 'dir', children: [{ name: 'widgets', type: 'dir' }] }
              ]
            },
            {
              name: 'features',
              type: 'dir',
              isOpen: true,
              children: [
                {
                  name: 'property_discovery',
                  type: 'dir',
                  isOpen: false,
                  children: [
                    { name: 'data', type: 'dir', children: [{ name: 'models', type: 'dir' }, { name: 'repositories', type: 'dir' }] },
                    { name: 'domain', type: 'dir', children: [{ name: 'entities', type: 'dir' }, { name: 'repositories', type: 'dir' }, { name: 'usecases', type: 'dir' }] },
                    { name: 'presentation', type: 'dir', children: [{ name: 'bloc', type: 'dir' }, { name: 'screens', type: 'dir' }, { name: 'widgets', type: 'dir' }] }
                  ]
                }
              ]
            }
          ]
        }
      ],
      folderCaption: 'Interactive Feature-First structure',
      techTitle: 'Unidirectional Dependency Rule',
      techDesc: 'In line with Mahmoud\'s standard architectural practices, Propix8 isolates modules using Clean Architecture patterns. Presentation layer classes have zero interaction with remote service queries; instead, they fire UI triggers via Cubits that communicate through abstraction contracts in the Domain layer.',
      layers: [
        {
          name: 'Presentation',
          color: 'indigo',
          desc: 'Built with reactive Cubit structures. Uses BlocSelector filters to narrow rendering scopes, ensuring widgets only rebuild if their specific data updates.'
        },
        {
          name: 'Domain',
          color: 'sky',
          desc: 'Pure Dart layer. Contains usecase implementations, repositories boundaries, and immutable entities that extend Equatable for reliable state comparison.'
        },
        {
          name: 'Data',
          color: 'emerald',
          desc: 'Contains DTO models (extending domain entities) with fromJson/toJson conversions, Dio Rest API implementations, and local cache layers.'
        }
      ],
      diDetails: 'Dependencies are initialized via GetIt lazily. Cubits inherit from a customized SafeCubit class that intercepts close routines. When the UI disposes of a page, any active Dio HTTP threads tied to that context are automatically cancelled via a centralized CancelToken controller.'
    },
    screenshots: [
      { id: 1, path: '/propix8/1.jpeg', title: 'Dashboard & Discovery', desc: 'Featured properties, quick filters, and personalized real-estate dashboard.' },
      { id: 2, path: '/propix8/2.jpeg', title: 'Interactive Map Search', desc: 'Geolocator queries, cluster markers, and search-by-area functionality.' },
      { id: 3, path: '/propix8/3.jpeg', title: 'Advanced Filtering', desc: 'Refine properties by price range, space, amenities, and location.' },
      { id: 4, path: '/propix8/4.jpeg', title: 'Property Detail View', desc: 'Comprehensive specifications, high-res images, and virtual tour options.' },
      { id: 5, path: '/propix8/5.jpeg', title: 'Video Walkthrough', desc: 'Immersive video tour integration powered by chewie controller.' },
      { id: 6, path: '/propix8/6.jpeg', title: 'Property Comparison', desc: 'Side-by-side assessment of specs, pricing, and ratings.' },
      { id: 7, path: '/propix8/7.jpeg', title: 'Schedule Inspection', desc: 'Integrated booking calendar with real-time agent availability.' },
      { id: 8, path: '/propix8/8.jpeg', title: 'Agent Contact & Chat', desc: 'Secure direct messaging channel with property owners & agents.' },
      { id: 9, path: '/propix8/9.jpeg', title: 'Wholesale Listings', desc: 'Dedicated catalog with bulk purchasing options and wholesale rates.' },
      { id: 10, path: '/propix8/10.jpeg', title: 'Maintenance Services', desc: 'Book verified electricians, plumbers, and home improvement staff.' },
      { id: 11, path: '/propix8/11.jpeg', title: 'Contract Management', desc: 'Digital signatures, booking receipts, and tenancy history.' },
      { id: 12, path: '/propix8/12.jpeg', title: 'Dark Mode Experience', desc: 'System-adaptive styling with Cairo typography for Arabic & English.' },
      { id: 13, path: '/propix8/13.jpeg', title: 'Saved Searches', desc: 'Bookmark parameters and receive push notification alerts on updates.' },
      { id: 14, path: '/propix8/14.jpeg', title: 'User Settings Panel', desc: 'Manage profiles, notification thresholds, and offline sync preferences.' }
    ]
  },

  bynona: {
    questNumber: 'Quest 03',
    category: 'E-Commerce App',
    title: 'Bynona E-Commerce',
    subtitle: 'E-Commerce',
    tagline: 'Dual-mode wholesale & retail shopping, done right.',
    repository: 'https://github.com/MahmoudMagdy001/bynona',
    color: '#06b6d4',
    stats: [
      { label: 'Framework', value: 'Flutter', isIcon: true, iconType: 'flutter' },
      { label: 'Language', value: 'Dart', isIcon: true, iconType: 'dart' },
      { label: 'Architecture', value: 'Feature BLoC', isIcon: false },
      { label: 'Scale', value: 'Wholesale/Retail', isIcon: false }
    ],
    overview: {
      goalTitle: 'The Quest Goal',
      goalDesc1: 'E-Commerce apps often struggle to support both wholesale (bulk discount rules) and retail business models without building separate applications or introducing complex condition branches in views.',
      goalDesc2: 'Bynona solves this by offering an dynamic dual-mode framework. The catalog, cart items, and tax layouts change instantly in response to a global Profile Cubit state. It runs with full English & Arabic (RTL) localization, localizes notifications using awesome_notifications, and caches pages to survive cellular network losses.',
      outcomes: [
        'Instantaneous UI toggle between wholesale pricing tiers and retail mode',
        'Deep Arabic RTL layout alignment and font swaps using Cairo',
        'Stateful BLoC controllers for carts and favorites with persistence',
        'Rich push alerts scheduled locally via Awesome Notifications',
        'Offline image and catalog caching for slow-network situations',
        'Robust Dio error handler mapping to specialized failure states'
      ],
      walkthrough: {
        videoPath: null,
        fallbackImg: '/images/bynona.png'
      }
    },
    features: [
      {
        id: 1,
        iconName: 'ShoppingCart',
        title: 'Wholesale Purchase Grid',
        desc: 'Detects and highlights bulk discount brackets (e.g., buy 10+ items for 15% off). The pricing adjustments apply automatically to individual cart items.',
        tags: ['Pricing Engine', 'Cart Bloc', 'Bulk Discount Model']
      },
      {
        id: 2,
        iconName: 'Layers',
        title: 'Bilingual RTL Architecture',
        desc: 'Provides fluid swapping between English and Arabic layouts. Directionality, layouts, and font hierarchies (Cairo / Outfit) adjust instantly.',
        tags: ['RTL Support', 'Cairo Font', 'l10n localization']
      },
      {
        id: 3,
        iconName: 'Play',
        title: 'Awesome Push Alerts',
        desc: 'Receives backend Firebase alerts and pipes them locally. Allows scheduling reminder triggers (e.g., checking out abandoned carts).',
        tags: ['FCM', 'awesome_notifications', 'Local Alarm']
      },
      {
        id: 4,
        iconName: 'ShieldAlert',
        title: 'Local Sync Storage',
        desc: 'Caches catalogs and item reviews using Hive. If the internet fails, users can continue reviewing catalogs and editing drafts offline.',
        tags: ['Hive Cache', 'ConnectivityService', 'Offline Sync']
      }
    ],
    alert: {
      type: 'info',
      title: 'Context Semantic Shortcuts',
      desc: 'To keep style rules unified, all colors, localizations, and sizes are resolved through BuildContext extensions like context.colors, context.l10n, and ScreenUtil values.'
    },
    architecture: {
      folderTree: [
        {
          name: 'lib',
          type: 'dir',
          isOpen: true,
          children: [
            {
              name: 'core',
              type: 'dir',
              isOpen: false,
              children: [
                { name: 'theme', type: 'dir' },
                { name: 'l10n', type: 'dir' },
                { name: 'services', type: 'dir', children: [{ name: 'cache_service.dart', type: 'file' }] }
              ]
            },
            {
              name: 'features',
              type: 'dir',
              isOpen: true,
              children: [
                {
                  name: 'products',
                  type: 'dir',
                  isOpen: true,
                  children: [
                    { name: 'data', type: 'dir', children: [{ name: 'models', type: 'dir' }] },
                    { name: 'logic', type: 'dir', children: [{ name: 'product_bloc.dart', type: 'file' }] },
                    { name: 'views', type: 'dir', children: [{ name: 'widgets', type: 'dir' }, { name: 'catalog_screen.dart', type: 'file' }] }
                  ]
                }
              ]
            }
          ]
        }
      ],
      folderCaption: 'Feature-First with logic folder separation',
      techTitle: 'Feature-First Business Logic Architecture',
      techDesc: 'Bynona organizes widgets and logic components directly under their target feature subfolder, which simplifies scaling. Logic components inherit from SafeBloc, preserving clean state emissions.',
      layers: [
        {
          name: 'Views (UI)',
          color: 'indigo',
          desc: 'Renders templates based on active BLoC states, using ScreenUtil sizes for consistent rendering across screen dimensions.'
        },
        {
          name: 'Logic (BLoC)',
          color: 'sky',
          desc: 'Houses state machines that orchestrate inputs, process API calls, and emit immutable statuses.'
        },
        {
          name: 'Data (Models/API)',
          color: 'emerald',
          desc: 'Queries API repositories, handles local Hive databases, and parses JSON feeds into safe model instances.'
        }
      ],
      diDetails: 'All features utilize GetIt for service dependency queries. Local storage adapters and network instances are created as Singletons during application startup.'
    },
    screenshots: [
      { id: 1, mockType: 'bynona-catalog', title: 'E-Commerce Catalog Screen', desc: 'Wholesale / Retail mode active view with quick category carousels.' },
      { id: 2, mockType: 'bynona-detail', title: 'Product Detail & Volume Discounts', desc: 'Highlights bulk discount pricing levels based on purchase volumes.' },
      { id: 3, mockType: 'bynona-cart', title: 'Active Checkout Cart', desc: 'Manage purchase totals, view active discounts, and input payment details.' },
      { id: 4, mockType: 'bynona-notifications', title: 'Push Notification Alerts', desc: 'Inbox showing order confirmations, ship tracking updates, and local alerts.' }
    ]
  },

  muslim: {
    questNumber: 'Quest 04',
    category: 'Lifestyle App',
    title: 'Muslim App',
    subtitle: 'Islamic Companion',
    tagline: 'An elegant all-in-one Islamic companion for daily worship.',
    repository: 'https://github.com/MahmoudMagdy001/Muslim',
    color: '#10b981',
    stats: [
      { label: 'Framework', value: 'Flutter', isIcon: true, iconType: 'flutter' },
      { label: 'Language', value: 'Dart', isIcon: true, iconType: 'dart' },
      { label: 'Audio Engine', value: 'just_audio', isIcon: false },
      { label: 'CI/CD', value: 'Codemagic', isIcon: false }
    ],
    overview: {
      goalTitle: 'The Quest Goal',
      goalDesc1: 'Lifestyle companion apps must operate with high reliability offline, calculate complex math variables (like astronomical prayer positions) on the client, and play background media feeds without being terminated by OS battery optimizations.',
      goalDesc2: 'Muslim App incorporates background native service hooks. It embeds just_audio + audio_service for uninterrupted Quran playback, utilizes the adhan library for coordinates calculations, and retrieves device sensor data to run a real-time Qibla compass. The repository is delivered with fully automated Codemagic pipelines.',
      outcomes: [
        'Persistent background Quran audio playback with lock-screen widget widgets',
        'Automatic offline prayer time calculator using GPS coordinates',
        'Dynamic compass needle tracking the Qibla using magnetometer sensors',
        'Zakat calculator with live gold-rate pricing integration via JSON API',
        'Pre-seeded SQLite database for instant Quran search and Azkar lists',
        'Continuous Integration & App Store deployment builds configured in Codemagic'
      ],
      walkthrough: {
        videoPath: null,
        fallbackImg: '/images/muslim_logo.png'
      }
    },
    features: [
      {
        id: 1,
        iconName: 'Play',
        title: 'Immersive Quran Player',
        desc: 'Uses just_audio to queue audio tracks. Pipes metadata to the native OS container, enabling playback control from locks and external controls.',
        tags: ['just_audio', 'audio_service', 'Audio Isolate']
      },
      {
        id: 2,
        iconName: 'MapPin',
        title: 'GPS Coordinate Prayer times',
        desc: 'Calculates the five daily prayer milestones offline using geographic formulas, adjusting rules instantly based on local guidelines.',
        tags: ['adhan package', 'geolocator', 'Coord Math']
      },
      {
        id: 3,
        iconName: 'Cpu',
        title: 'Sensor-Based Qibla Compass',
        desc: 'Polls device rotation and magnetic heading data. Smooths the compass needle movement in response to sensor updates.',
        tags: ['flutter_qiblah', 'Magnetometer', 'Sensors']
      },
      {
        id: 4,
        iconName: 'Layers3',
        title: 'Live Wealth Calculator',
        desc: 'Pulls current precious metal pricing data. Deducts basic costs to compute required Zakat distributions automatically.',
        tags: ['Zakat Cubit', 'REST API', 'Form Validation']
      }
    ],
    alert: {
      type: 'warning',
      title: 'Magnetometer Accuracy Warning',
      desc: 'The live compass monitors the system magnetic accuracy flag. If interference is detected, it alerts the user to calibrate their device coordinates.'
    },
    architecture: {
      folderTree: [
        {
          name: 'lib',
          type: 'dir',
          isOpen: true,
          children: [
            {
              name: 'core',
              type: 'dir',
              isOpen: false,
              children: [
                { name: 'audio', type: 'dir', children: [{ name: 'audio_handler.dart', type: 'file' }] },
                { name: 'location', type: 'dir' },
                { name: 'database', type: 'dir', children: [{ name: 'sqlite_helper.dart', type: 'file' }] }
              ]
            },
            {
              name: 'features',
              type: 'dir',
              isOpen: true,
              children: [
                {
                  name: 'quran',
                  type: 'dir',
                  isOpen: true,
                  children: [
                    { name: 'logic', type: 'dir', children: [{ name: 'player_bloc.dart', type: 'file' }] },
                    { name: 'screens', type: 'dir', children: [{ name: 'quran_screen.dart', type: 'file' }] }
                  ]
                },
                {
                  name: 'qibla',
                  type: 'dir',
                  isOpen: false,
                  children: [
                    { name: 'logic', type: 'dir', children: [{ name: 'compass_cubit.dart', type: 'file' }] }
                  ]
                }
              ]
            }
          ]
        }
      ],
      folderCaption: 'Audio core helper with domain-separated features',
      techTitle: 'Audio Isolate & Database Architecture',
      techDesc: 'Muslim App uses SQLite databases to handle heavy lookup searches. Background audio playbacks run inside isolated threads to avoid UI rendering lags, maintaining 60fps scrolling.',
      layers: [
        {
          name: 'User Interface',
          color: 'indigo',
          desc: 'Renders dynamic prayer progress, Quran pages, and rotating compass layouts using ScreenUtil dimensions.'
        },
        {
          name: 'State Control',
          color: 'sky',
          desc: 'Calculates active audio track states, compass angles, and coordinates calculations via BLoC/Cubit.'
        },
        {
          name: 'SQLite / Sensor Services',
          color: 'emerald',
          desc: 'Scans device compass, coordinates hardware feeds, and reads Quran verses from local SQLite tables.'
        }
      ],
      diDetails: 'Services are mapped via GetIt. The audio player service is registered as a Singleton, allowing active audio instances to persist across app page closures.'
    },
    screenshots: [
      { id: 1, mockType: 'muslim-dashboard', title: 'Main Daily Dashboard', desc: 'Shows upcoming prayer countdowns, coordinates location, and custom greeting widgets.' },
      { id: 2, mockType: 'muslim-player', title: 'Audio Quran Player', desc: 'Audio controls, page tracking, and active background player indicator.' },
      { id: 3, mockType: 'muslim-compass', title: 'Sensor Qibla Compass', desc: 'Rotating indicator needle pointing to Kaaba, verifying sensor accuracy.' },
      { id: 4, mockType: 'muslim-calculator', title: 'Live Wealth Calculator', desc: 'Input forms to calculate gold asset values and output distribution amounts.' }
    ]
  },

  'cancer-detection': {
    questNumber: 'Quest 05',
    category: 'Healthcare App',
    title: 'Colorectal Cancer AI',
    subtitle: 'Healthcare AI',
    tagline: 'AI-assisted colorectal cancer diagnosis and patient tracking.',
    repository: 'https://github.com/MahmoudMagdy001/colon_app',
    color: '#f43f5e',
    stats: [
      { label: 'Framework', value: 'Flutter', isIcon: true, iconType: 'flutter' },
      { label: 'Language', value: 'Dart', isIcon: true, iconType: 'dart' },
      { label: 'Backend', value: 'Supabase', isIcon: true, iconType: 'supabase' },
      { label: 'Charts Engine', value: 'fl_chart', isIcon: false }
    ],
    overview: {
      goalTitle: 'The Quest Goal',
      goalDesc1: 'Clinical healthcare applications require absolute security standards, precise input formats (like genetic strings), and intuitive tools to track patient indicators over long intervals.',
      goalDesc2: 'Cancer Detection AI is a secure clinical frontend. The app connects to Supabase database layers utilizing Row-Level Security rules. It displays patient indicators using fl_chart diagrams and passes parameters to a custom Machine Learning backend to output colorectal cancer risk calculations.',
      outcomes: [
        'HIPAA-aligned data structure using Supabase Auth & DB access rules',
        'Interactive charts displaying patient indicators over time',
        'Diagnostic input forms with strict verification triggers',
        'Direct ML API linkage displaying risk category outputs',
        'Fast patient list filtering and diagnosis updates',
        'Clean MVVM directory structure separating UI elements from DB queries'
      ],
      walkthrough: {
        videoPath: null,
        fallbackImg: '/images/colon.png'
      }
    },
    features: [
      {
        id: 1,
        iconName: 'Cpu',
        title: 'ML Risk Analysis Engine',
        desc: 'Passes diagnostic parameters (age, genetic factors, indicators) to a custom ML REST API to fetch risk percentages.',
        tags: ['ML REST API', 'Risk Cubit', 'JSON Parser']
      },
      {
        id: 2,
        iconName: 'Layers3',
        title: 'Tumor Marker Visualizer',
        desc: 'Plots patient CEA/CA19-9 tumor marker test results over time. Highlights target limits and critical alert zones.',
        tags: ['fl_chart', 'Time Series', 'Diagnostic Bloc']
      },
      {
        id: 3,
        iconName: 'Users',
        title: 'Secure Patient Profiles',
        desc: 'Displays comprehensive clinical cards containing medications, genetic flags, diagnostic records, and past predictions.',
        tags: ['Supabase DB', 'Search Filter', 'Clinical DTO']
      },
      {
        id: 4,
        iconName: 'ShieldAlert',
        title: 'Row-Level DB Security',
        desc: 'Authenticates requests with individual security tokens. Triggers postgres rules, preventing data leakage between accounts.',
        tags: ['Supabase Auth', 'RLS rules', 'Secure Session']
      }
    ],
    alert: {
      type: 'warning',
      title: 'Supabase RLS Rules Enforced',
      desc: 'All queries must include active authentication header keys. The DB rules intercept queries at the database layer to block unauthorized lookups.'
    },
    architecture: {
      folderTree: [
        {
          name: 'lib',
          type: 'dir',
          isOpen: true,
          children: [
            {
              name: 'core',
              type: 'dir',
              isOpen: false,
              children: [
                { name: 'security', type: 'dir', children: [{ name: 'rls_client.dart', type: 'file' }] },
                { name: 'database', type: 'dir', children: [{ name: 'supabase_client.dart', type: 'file' }] }
              ]
            },
            {
              name: 'features',
              type: 'dir',
              isOpen: true,
              children: [
                {
                  name: 'patients',
                  type: 'dir',
                  isOpen: true,
                  children: [
                    { name: 'data', type: 'dir', children: [{ name: 'models', type: 'dir' }] },
                    { name: 'presentation', type: 'dir', children: [{ name: 'bloc', type: 'dir' }, { name: 'screens', type: 'dir' }, { name: 'widgets', type: 'dir' }] }
                  ]
                }
              ]
            }
          ]
        }
      ],
      folderCaption: 'Supabase-driven data client and medical record flow',
      techTitle: 'Clinical Security & fl_chart plotting',
      techDesc: 'Colorectal Cancer AI ensures data is isolated. The presentation layer connects to reactive Blocs that communicate with Supabase repositories. No raw SQL commands run in UI modules.',
      layers: [
        {
          name: 'Clinical Screens',
          color: 'indigo',
          desc: 'Renders patient search, marker charts, diagnostic details, and risk evaluations using responsive ScreenUtil margins.'
        },
        {
          name: 'State Manager',
          color: 'sky',
          desc: 'Coordinates patient loading, form validation, and ML risk evaluation requests via Cubits.'
        },
        {
          name: 'Supabase / Rest API',
          color: 'emerald',
          desc: 'Pipes auth tokens, runs queries against RLS tables, and calls ML models over REST channels.'
        }
      ],
      diDetails: 'Clinical instances are registered using GetIt. The Supabase wrapper is injected as a LazySingleton, preserving unified session keys.'
    },
    screenshots: [
      { id: 1, mockType: 'cancer-dashboard', title: 'Clinician Patient Directory', desc: 'Patient records list with rapid search, vital flags, and register actions.' },
      { id: 2, mockType: 'cancer-detail', title: 'Comprehensive Medical History', desc: 'Displays patient metadata, gene classifications, and diagnostic timeline.' },
      { id: 3, mockType: 'cancer-chart', title: 'Tumor Indicator Graph', desc: 'Displays markers over time with target markers using fl_chart widgets.' },
      { id: 4, mockType: 'cancer-ml', title: 'Colorectal Risk Analysis', desc: 'Shows target prediction statistics returned from the custom ML API.' }
    ]
  },

  'mansy-learning': {
    questNumber: 'Quest 06',
    category: 'Education App',
    title: 'Mansy Learning',
    subtitle: 'E-Learning Platform',
    tagline: 'Premium e-learning platform with courses, quizzes & subscriptions.',
    repository: 'https://github.com/MahmoudMagdy001/Mansy_learning',
    color: '#a855f7',
    stats: [
      { label: 'Framework', value: 'Flutter', isIcon: true, iconType: 'flutter' },
      { label: 'Language', value: 'Dart', isIcon: true, iconType: 'dart' },
      { label: 'Router Engine', value: 'GoRouter', isIcon: false },
      { label: 'Backend', value: 'Supabase', isIcon: true, iconType: 'supabase' }
    ],
    overview: {
      goalTitle: 'The Quest Goal',
      goalDesc1: 'E-learning apps must coordinate complex customer journeys, including catalog lookups, video playback resume states, multi-tier subscription locks, and interactive quizzes, all with offline support.',
      goalDesc2: 'Mansy Learning uses an MVVM structure. It integrates GoRouter guards to intercept route requests, caches playback timestamps using SharedPreferences, and connects to a serverless Supabase backend to synchronize progress markers.',
      outcomes: [
        'Unified course catalogue with status markers and subscription cards',
        'GoRouter route guards verifying subscription states prior to playing lessons',
        'Custom video controller caching active playback positions',
        'Interactive quiz layouts displaying immediate results and breakdown cards',
        'Bilingual English & Arabic UI with theme tokens and Cairo fonts',
        'Auto-synced progress logs matching Supabase tables'
      ],
      walkthrough: {
        videoPath: null,
        fallbackImg: '/images/mansy.png'
      }
    },
    features: [
      {
        id: 1,
        iconName: 'Play',
        title: 'Video Position Caching',
        desc: 'Tracks progress indicators during video playback. Saves seconds milestones to local storage, letting users resume seamlessly.',
        tags: ['video_player', 'Shared Preferences', 'Course Cubit']
      },
      {
        id: 2,
        iconName: 'Cpu',
        title: 'Role-Based Route Guards',
        desc: 'Intercepts route paths using GoRouter. Checks subscription claims before allowing access to premium course contents.',
        tags: ['go_router', 'Route Guards', 'Auth Claims']
      },
      {
        id: 3,
        iconName: 'MessageSquareCode',
        title: 'Interactive Quiz Engine',
        desc: 'Interactive quiz sheet that computes scores, highlights incorrect questions, and updates progress records.',
        tags: ['Quiz Bloc', 'Timer Cubit', 'Score DTO']
      },
      {
        id: 4,
        iconName: 'ShieldAlert',
        title: 'Real-Time Progress Sync',
        desc: 'Synchronizes completed lessons and scores to Supabase DB tables in the background, recovering if connections drop.',
        tags: ['Supabase DB', 'Background Sync', 'Queue Manager']
      }
    ],
    alert: {
      type: 'info',
      title: 'GoRouter Routing Engine',
      desc: 'All route navigation paths are defined declaratively in GoRouter. Dynamic route queries (like /course/:id) parse route identifiers safely.'
    },
    architecture: {
      folderTree: [
        {
          name: 'lib',
          type: 'dir',
          isOpen: true,
          children: [
            {
              name: 'core',
              type: 'dir',
              isOpen: false,
              children: [
                { name: 'router', type: 'dir', children: [{ name: 'app_router.dart', type: 'file' }] },
                { name: 'theme', type: 'dir', children: [{ name: 'app_theme.dart', type: 'file' }] }
              ]
            },
            {
              name: 'features',
              type: 'dir',
              isOpen: true,
              children: [
                {
                  name: 'courses',
                  type: 'dir',
                  isOpen: true,
                  children: [
                    { name: 'data', type: 'dir', children: [{ name: 'models', type: 'dir' }] },
                    { name: 'presentation', type: 'dir', children: [{ name: 'bloc', type: 'dir' }, { name: 'screens', type: 'dir' }, { name: 'widgets', type: 'dir' }] }
                  ]
                }
              ]
            }
          ]
        }
      ],
      folderCaption: 'Feature-First MVVM with declarative routing config',
      techTitle: 'MVVM & Declarative Route Management',
      techDesc: 'Mansy Learning decouples user navigation rules from the widgets. Route rules verify user claims, while course states are tracked in clean Cubits.',
      layers: [
        {
          name: 'Presentation View',
          color: 'indigo',
          desc: 'Renders video feeds, quiz forms, progress charts, and catalog listings using ScreenUtil scale rules.'
        },
        {
          name: 'ViewModel (Cubit)',
          color: 'sky',
          desc: 'Coordinates product listings, processes responses, and updates localized progress variables.'
        },
        {
          name: 'Model Repository',
          color: 'emerald',
          desc: 'Requests tables from Supabase, updates local progress indices, and serializes JSON profiles.'
        }
      ],
      diDetails: 'Registered dependencies inside injection wrappers. Services (like GoRouter, SupabaseClient) are singletons; Blocs are Factories.'
    },
    screenshots: [
      { id: 1, mockType: 'learning-dashboard', title: 'Main Course Dashboard', desc: 'Enrolled courses grid showing progress bars, achievements, and search tabs.' },
      { id: 2, mockType: 'learning-course', title: 'Video Lecture Interface', desc: 'Clean video player, cached playback indicators, and list of resources.' },
      { id: 3, mockType: 'learning-quiz', title: 'Interactive Quiz Sheet', desc: 'Multi-choice question forms with timer banners and immediate review fields.' },
      { id: 4, mockType: 'learning-profile', title: 'Subscription Management', desc: 'Exposes billing cycles, account tiers, and upgrade calls-to-action.' }
    ]
  },

  'music-player': {
    questNumber: 'Quest 07',
    category: 'Media App',
    title: 'Music Player',
    subtitle: 'Music Player',
    tagline: 'Cinematic local music player with a premium audio experience.',
    repository: 'https://github.com/MahmoudMagdy001/music_player',
    color: '#f59e0b',
    stats: [
      { label: 'Framework', value: 'Flutter', isIcon: true, iconType: 'flutter' },
      { label: 'Language', value: 'Dart', isIcon: true, iconType: 'dart' },
      { label: 'Audio Engine', value: 'just_audio', isIcon: false },
      { label: 'Platform Scale', value: 'Multi-OS Desktop', isIcon: false }
    ],
    overview: {
      goalTitle: 'The Quest Goal',
      goalDesc1: 'Building a local music application that performs identically across Android, iOS, macOS, and Linux demands a lightweight scan engine, persistent library databases, and lockscreen integration without background leaks.',
      goalDesc2: 'Music Player merges just_audio with native C bindings to inspect local files on desktop and mobile platforms. The interface features custom glassmorphic panels, an active playlist drag-and-drop queue, and a floating music bar. Heavy scanning steps run inside background Dart Isolates.',
      outcomes: [
        'Cross-platform desktop & mobile execution (macOS, Linux, iOS, Android)',
        'Low-overhead local directory scan engine utilizing native C headers',
        'Custom glassmorphism design tokens matching album art color schemes',
        'Interactive playlist queues supporting drag-and-drop ordering',
        'Isolate-isolated metadata extraction to avoid UI frame drop rates',
        'Background audio service coordinating locks and widgets controls'
      ],
      walkthrough: {
        videoPath: null,
        fallbackImg: '/images/music-player.png'
      }
    },
    features: [
      {
        id: 1,
        iconName: 'Play',
        title: 'Cross-Platform Engine',
        desc: 'Compiles with unified audio controls for Android, iOS, macOS, and Linux, scanning folders using local paths.',
        tags: ['just_audio', 'Native Bindings', 'Multi-Platform']
      },
      {
        id: 2,
        iconName: 'Cpu',
        title: 'Background Metadata Scan',
        desc: 'Retrieves album metadata and audio files using background Dart Isolates, preserving smooth 60fps scrolling in lists.',
        tags: ['Dart Isolates', 'Metadata Scanner', 'SQLite Library']
      },
      {
        id: 3,
        iconName: 'Layers3',
        title: 'Interactive Playlist Grid',
        desc: 'Allows users to customize queues. Drag-and-drop layout components rearrange tracks dynamically.',
        tags: ['ReorderableList', 'Queue Cubit', 'Persistent DB']
      },
      {
        id: 4,
        iconName: 'Smartphone',
        title: 'Album Color Theming',
        desc: 'Inspects active album covers to extract dominant color variables, adapting interface gradients dynamically.',
        tags: ['Palette Generator', 'Glassmorphism', 'Framer Motion UI']
      }
    ],
    alert: {
      type: 'warning',
      title: 'Isolate Memory Footprint',
      desc: 'Library scanning spins up background Dart Isolates. These run on separate CPU threads and self-terminate once scans finish to keep memory clean.'
    },
    architecture: {
      folderTree: [
        {
          name: 'lib',
          type: 'dir',
          isOpen: true,
          children: [
            {
              name: 'core',
              type: 'dir',
              isOpen: false,
              children: [
                { name: 'player', type: 'dir', children: [{ name: 'player_engine.dart', type: 'file' }] },
                { name: 'metadata', type: 'dir', children: [{ name: 'metadata_helper.dart', type: 'file' }] }
              ]
            },
            {
              name: 'features',
              type: 'dir',
              isOpen: true,
              children: [
                {
                  name: 'library',
                  type: 'dir',
                  isOpen: true,
                  children: [
                    { name: 'logic', type: 'dir', children: [{ name: 'library_cubit.dart', type: 'file' }] },
                    { name: 'views', type: 'dir', children: [{ name: 'library_screen.dart', type: 'file' }] }
                  ]
                }
              ]
            }
          ]
        }
      ],
      folderCaption: 'Cross-platform audio features structure',
      techTitle: 'Isolate & Native Bindings Architecture',
      techDesc: 'Music Player segregates folder scanning routines. Heavy folder listings and metadata parsing run in a Dart Isolate, returning parsed structures to the BLoC layer.',
      layers: [
        {
          name: 'Cinematic Views',
          color: 'indigo',
          desc: 'Glassmorphic screens that adapt their color palettes to match the playing song\'s album art.'
        },
        {
          name: 'Audio Controller',
          color: 'sky',
          desc: 'Coordinates play lists, scans, shuffle, repeat, and volume variables in response to events.'
        },
        {
          name: 'Native Scanning',
          color: 'emerald',
          desc: 'Interacts with filesystem directories across platforms to index metadata and paths.'
        }
      ],
      diDetails: 'Registered audio services as Singletons to prevent playback interruptions during navigation, and registered page-level loaders as Factories.'
    },
    screenshots: [
      { id: 1, mockType: 'music-dashboard', title: 'Dynamic Music Library', desc: 'Scan results displaying albums, artists, folders, and recent tracks.' },
      { id: 2, mockType: 'music-playing', title: 'Immersive Player View', desc: 'Album art glowing panels, track position sliders, and queue controls.' },
      { id: 3, mockType: 'music-playlist', title: 'Queue & Playlist Manager', desc: 'Sort queues using drag controls, create playlists, and update titles.' },
      { id: 4, mockType: 'music-settings', title: 'Scan Directory Settings', desc: 'Add scan folders, configure cache sizes, and customize desktop bindings.' }
    ]
  }
};
