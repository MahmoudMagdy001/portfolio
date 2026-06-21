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
      { label: 'Scale', value: '19 Modules', isIcon: false }
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
        videoPath: '/wassaly/wassaly_video.mp4',
        fallbackImg: '/images/waslay.png'
      }
    },
    features: [
      {
        id: 1,
        iconName: 'Truck',
        title: 'Goods On-Demand Dispatch',
        desc: 'Supports item checkout and ordering flows. The dispatch system manages item availability, coupons, delivery charges, and live route status updates.',
        tags: ['CartBloc', 'Dio Rest Client', 'E-Commerce Checkout']
      },
      {
        id: 2,
        iconName: 'Users',
        title: 'Professional Service Booking',
        desc: 'Coordinates the selection and scheduling of available days and times for professional services. The booking form validates customer details, problem statements, and addresses, sending them reactively via BLoC.',
        tags: ['ServiceBookingBloc', 'ServiceDetailEntity', 'Governorates & Centers API']
      },
      {
        id: 3,
        iconName: 'MapPin',
        title: 'Interactive Order Tracking Timeline',
        desc: 'Provides a stepper-based status tracker widget (OrderTrackerWidget) that maps and animates order progression stages (Pending, Accepted, Processing, Shipped, Delivered) using custom icons, responsive scaling, and state-specific timeline coloring.',
        tags: ['OrderTrackerWidget', 'Stepper Timeline', 'OrderActionStatus']
      },
      {
        id: 4,
        iconName: 'ShieldAlert',
        title: 'Network-Aware Sync & Caching',
        desc: 'Uses Hive to cache cart items, favorite lists, orders, and notifications locally. When the internet connection restabilizes, the InternetConnectionService fires connectivityRestoredStream to automatically retry failed requests and sync offline modifications.',
        tags: ['Hive DB', 'InternetConnectionService', 'connectivityRestoredStream']
      }
    ],
    alert: {
      type: 'warning',
      title: 'Automated Token & Thread Lifecycle',
      desc: 'All Dio HTTP request threads are linked to their parent Bloc or Cubit lifecycle via unique Zone keys. When a Bloc or Cubit is closed, the base SafeBloc/SafeCubit automatically triggers CancelRequestService to abort active network queries, preventing background memory leaks and battery drain.'
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
                { name: 'services', type: 'dir', children: [{ name: 'cancel_request_service.dart', type: 'file' }, { name: 'dio_service.dart', type: 'file' }, { name: 'hive_service.dart', type: 'file' }, { name: 'internet_connection_service.dart', type: 'file' }] },
                { name: 'utils', type: 'dir', children: [{ name: 'task_runner.dart', type: 'file' }, { name: 'failure.dart', type: 'file' }, { name: 'error_handler.dart', type: 'file' }] }
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
                    { name: 'data', type: 'dir', children: [{ name: 'datasources', type: 'dir' }, { name: 'models', type: 'dir' }, { name: 'repositories', type: 'dir' }] },
                    { name: 'domain', type: 'dir', children: [{ name: 'entities', type: 'dir' }, { name: 'repositories', type: 'dir' }, { name: 'usecases', type: 'dir' }] },
                    { name: 'presentation', type: 'dir', children: [{ name: 'bloc', type: 'dir' }, { name: 'screens', type: 'dir' }, { name: 'widgets', type: 'dir' }] }
                  ]
                }
              ]
            }
          ]
        }
      ],
      folderCaption: 'Standard 3-Layer Clean Architecture structure',
      techTitle: 'Unidirectional Clean Architecture',
      techDesc: 'Wassaly strictly segregates dependencies. The presentation layer imports only domain contracts. Concrete datasources (Dio, Hive) are isolated inside the data layer, ensuring business rules in the domain layer remain pure Dart code with zero external library bloat.',
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
          name: 'Data & Datasources',
          color: 'emerald',
          desc: 'Implements repository interfaces. Handles API request maps, local caching serialization, and throws normalized Failures.'
        }
      ],
      diDetails: 'Dependencies are registered as LazySingletons for data abstractions (DioService, HiveService, InternetConnectionService) and Factories for BLoC/Cubit elements. This ensures clean startup execution without bloating device memory allocations.'
    },
    screenshots: [
      { id: 1, path: '/wassaly/1.jpeg', title: 'Main Dashboard & Categories', desc: 'Sleek dashboard featuring dynamic banner carousels, categories grid, and quick links.' },
      { id: 2, path: '/wassaly/2.jpeg', title: 'E-Commerce Catalog Feed', desc: 'Browse and filter available stores, restaurants, pharmacies, and service agents.' },
      { id: 3, path: '/wassaly/3.jpeg', title: 'Product Catalog Details', desc: 'Select items with dynamic price calculators, descriptions, and add-to-cart controls.' },
      { id: 4, path: '/wassaly/4.jpeg', title: 'Active Checkout Cart', desc: 'Real-time item lists, subtotals, promo code input fields, and delivery fee calculators.' },
      { id: 5, path: '/wassaly/5.jpeg', title: 'Professional Service Booking', desc: 'Choose plumbing, electrical, or other handymen categories with scheduling parameters.' },
      { id: 6, path: '/wassaly/6.jpeg', title: 'Service Details & Form Validation', desc: 'Select priority status, input description logs, and verify customer contact info.' },
      { id: 7, path: '/wassaly/7.jpeg', title: 'Address Book Coordinates', desc: 'Manage saved delivery destinations using geolocator mappings and address details.' },
      { id: 8, path: '/wassaly/8.jpeg', title: 'Live Map Location Tracking', desc: 'Displays courier location pins, active routes, and driver information sheets.' },
      { id: 9, path: '/wassaly/9.jpeg', title: 'Order History Ledger', desc: 'Keep track of previous dispatches, orders, and service transactions.' },
      { id: 10, path: '/wassaly/10.jpeg', title: 'Stepper Tracker Status', desc: 'Chronological timeline mapping order milestones from Pending to Completed.' },
      { id: 11, path: '/wassaly/11.jpeg', title: 'Responsive Settings Panel', desc: 'Manage user profiles, local caching sizes, and offline notification options.' },
      { id: 12, path: '/wassaly/12.jpeg', title: 'Dark Mode UI Design', desc: 'Premium system-adaptive dark mode theme optimized with Cairo & Outfit fonts.' },
      { id: 13, path: '/wassaly/13.jpeg', title: 'Offline-State Sync Alert', desc: 'Observe Internet state loss and trigger sync streams automatically on reconnection.' }
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
      { label: 'Architecture', value: 'Feature-First MVVM', isIcon: false },
      { label: 'Scale', value: '19 Modules', isIcon: false }
    ],
    overview: {
      goalTitle: 'The Quest Goal',
      goalDesc1: 'Real estate exploration platforms are often plagued by sluggish response times, cluttered listing pages, and rigid architectures that fail when adding integrations like mapping, booking, or live messaging.',
      goalDesc2: 'Propix8 was engineered to solve these core limitations. Built using a rigid Feature-First MVVM structure with Repository Pattern, the codebase isolates each of its 19 features (like property discovery, compound details, search, comparison, and booking) into discrete folders containing models, repositories, services, viewmodels, and views. It achieves 60fps scrolling and high reliability by leveraging local secure persistence, lazy video loading, and state-aware network request handling.',
      outcomes: [
        'Feature-First MVVM + Repository architecture with strict unidirectional flow',
        'Custom video preloading and offscreen auto-pausing via VisibilityDetector and Chewie',
        'Dynamic comparison matrix highlighting property specifications and advantages',
        'Full multilingual support (Arabic/English) with system-adaptive themes and custom localizations',
        'Robust token and user data caching using FlutterSecureStorage and SharedPreferences',
        'State-aware network connection tracking and auto-retry via internet_state_manager'
      ],
      walkthrough: {
        videoPath: '/propix8/propix_video.mp4',
        fallbackImg: '/images/propix.png'
      }
    },
    features: [
      {
        id: 1,
        iconName: 'MapPin',
        title: 'Geographical Map & GPS Services',
        desc: 'Integrates flutter_map with OpenStreetMap tiles. Renders location coordinates for individual units with animated markers. In the profile setup phase, it retrieves current GPS coordinates and reverse-geocodes them to get full text addresses using the geocoding service.',
        tags: ['flutter_map', 'geocoding', 'geolocator']
      },
      {
        id: 2,
        iconName: 'Layers3',
        title: 'Dynamic Comparison Matrix',
        desc: 'Compiles a side-by-side comparison matrix between a base unit and a selected unit. It automatically formats attributes (like price per m², internal area, rooms, average rating) and calculates advantages dynamically based on specific criteria.',
        tags: ['ComparisonHelper', 'ComparisonAdvantage', 'Cubit State']
      },
      {
        id: 3,
        iconName: 'Play',
        title: 'Custom Video Preloading & Playback',
        desc: 'Handles virtual video tours using Chewie and video_player. Implements active-page controller caching and preloading (preloads adjacent videos while disposing of distant ones to manage memory) and uses VisibilityDetector to pause playing media when scrolled off-screen.',
        tags: ['chewie', 'video_player', 'visibility_detector']
      },
      {
        id: 4,
        iconName: 'Settings',
        title: 'Home & Technical Maintenance Booking',
        desc: 'Provides a service booking dashboard where maintenance tasks are categorized into Home and Technical categories. The booking request form automatically pre-populates user details (phone and address) cached in memory and sends submissions reactively via a dedicated Cubit.',
        tags: ['StorageService cache', 'MaintenanceServicesCubit', 'Reactive Form Validation']
      }
    ],
    alert: {
      type: 'info',
      title: 'Network Resilience & State Tracking',
      desc: 'Application-wide connectivity tracking is powered by internet_state_manager. An automatic RetryInterceptor with exponential backoff handles transient network failures (e.g. status codes 500, 503) for GET requests. For authentication and user sessions, sensitive data is securely encrypted in FlutterSecureStorage.'
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
                { name: 'di', type: 'dir', children: [{ name: 'locator.dart', type: 'file' }] },
                { name: 'network', type: 'dir', children: [{ name: 'auth_interceptor.dart', type: 'file' }, { name: 'dio_client.dart', type: 'file' }, { name: 'retry_interceptor.dart', type: 'file' }] },
                { name: 'public_feature', type: 'dir' },
                { name: 'router', type: 'dir', children: [{ name: 'app_router.dart', type: 'file' }] },
                { name: 'theme', type: 'dir', children: [{ name: 'app_theme.dart', type: 'file' }] },
                { name: 'utils', type: 'dir', children: [{ name: 'auth_constants.dart', type: 'file' }, { name: 'auth_exceptions.dart', type: 'file' }] }
              ]
            },
            {
              name: 'feature',
              type: 'dir',
              isOpen: true,
              children: [
                {
                  name: 'unit_details',
                  type: 'dir',
                  isOpen: false,
                  children: [
                    { name: 'models', type: 'dir', children: [{ name: 'unit_details_model.dart', type: 'file' }] },
                    { name: 'repositories', type: 'dir', children: [{ name: 'unit_details_repository.dart', type: 'file' }] },
                    { name: 'services', type: 'dir', children: [{ name: 'unit_details_service.dart', type: 'file' }] },
                    { name: 'viewmodels', type: 'dir', children: [{ name: 'unit_details_cubit.dart', type: 'file' }] },
                    { name: 'views', type: 'dir', children: [{ name: 'unit_details_view.dart', type: 'file' }, { name: 'widgets', type: 'dir' }] }
                  ]
                }
              ]
            }
          ]
        }
      ],
      folderCaption: 'Clean Feature-First MVVM directory structure',
      techTitle: 'Feature-First MVVM + Repository Pattern',
      techDesc: 'Propix8 decouples features into self-contained vertical slices. Each feature holds its own models, repositories, network services, viewmodels (Cubits), and passive views. This prevents features from spilling details into each other and ensures that changing one module (like booking or comparison) has zero side effects on others.',
      layers: [
        {
          name: 'Views & Widgets',
          color: 'indigo',
          desc: 'Passive UI screens that render state data reactively. Implements responsive sizing via ScreenUtil (.w, .h, .sp, .r) and localized text via context.l10n.'
        },
        {
          name: 'ViewModels (Cubit)',
          color: 'sky',
          desc: 'State machines extending BLoC\'s Cubit. Manages business logic and state transitions using a single state class with a standard RequestStatus enum.'
        },
        {
          name: 'Repositories & Services',
          color: 'emerald',
          desc: 'Decoupled data boundaries. Services execute raw Dio queries and handle auth headers/retries, while repositories map JSON to Equatable models.'
        }
      ],
      diDetails: 'Dependencies are registered lazily via GetIt in setupLocator(). ViewModels are registered as Factories to ensure fresh instances, while services and repositories are Singletons. SharedPreferences and FlutterSecureStorage handle local data caching, user session details, and theme configurations.'
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
      { label: 'Architecture', value: 'Feature-First MVVM', isIcon: false },
      { label: 'Scale', value: '15 Modules', isIcon: false }
    ],
    overview: {
      goalTitle: 'The Quest Goal',
      goalDesc1: 'E-Commerce apps often struggle to support both wholesale (bulk discount rules) and retail business models without building separate applications or introducing complex condition branches in views.',
      goalDesc2: 'Bynona solves this by offering an dynamic dual-mode framework. The catalog, cart items, and layouts change instantly in response to a global PriceModeCubit state. It runs with full English & Arabic (RTL) localization, uses internet_state_manager to handle cellular connection drops, and delivers push notifications using awesome_notifications.',
      outcomes: [
        'Instantaneous UI toggle between wholesale pricing tiers and retail mode',
        'Deep Arabic RTL layout alignment and font swaps using Cairo',
        'Lightweight Cubit controllers for carts, layout, search, and favorites',
        'Rich push alerts scheduled locally via awesome_notifications & deep links',
        'Offline session caching via SharedPreferences and image caching',
        'Robust 401 token refresh interceptor in DioHelper for seamless retries'
      ],
      walkthrough: {
        videoPath: '/bynona/bynona_video.mp4',
        fallbackImg: '/images/bynona.png'
      }
    },
    features: [
      {
        id: 1,
        iconName: 'ShoppingCart',
        title: 'Dual-Mode Pricing Engine',
        desc: 'Leverages PriceModeCubit to toggle between wholesale and retail mode. Attaches the selected pricing mode directly as a request header (Price-Mode) in DioHelper, adjusting catalog and cart pricing rules dynamically.',
        tags: ['PriceModeCubit', 'CartCubit', 'Dio Interceptor']
      },
      {
        id: 2,
        iconName: 'Globe',
        title: 'Bilingual RTL Architecture',
        desc: 'Integrates LanguageCubit to swap between English (Outfit font) and Arabic (Cairo font) layouts. Arb translations dynamically shift text alignment and directionality (RTL/LTR) instantly.',
        tags: ['LanguageCubit', 'RTL Support', 'Cairo & Outfit Fonts']
      },
      {
        id: 3,
        iconName: 'Bell',
        title: 'Push Notification Ecosystem',
        desc: 'Combines firebase_messaging for receiving FCM tokens/payloads and awesome_notifications for scheduling local visual alerts. Features DeepLinkService to route users directly to specific product screens from notification clicks.',
        tags: ['FCM', 'awesome_notifications', 'DeepLinkService']
      },
      {
        id: 4,
        iconName: 'WifiOff',
        title: 'State-Aware Connection Manager',
        desc: 'Coordinates internet_state_manager and connectivity_plus to observe and broadcast network changes, showing immediate offline/no-internet screens and retrying failed requests. User sessions and tokens are persisted in SharedPreferences.',
        tags: ['connectivity_plus', 'internet_state_manager', 'SharedPreferences']
      }
    ],
    alert: {
      type: 'info',
      title: 'Automated 401 Token Refresh Interceptor',
      desc: 'DioHelper handles authentication expirations by injecting an interceptor that catches 401 Unauthorized errors. It automatically calls refreshAccessToken(), updates the cached tokens in SharedPreferences, and seamlessly retries the original request with the new access token.'
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
                { name: 'di', type: 'dir', children: [{ name: 'locator.dart', type: 'file' }] },
                { name: 'main', type: 'dir', children: [{ name: 'app_content.dart', type: 'file' }, { name: 'app_initializer.dart', type: 'file' }] },
                { name: 'service', type: 'dir', children: [{ name: 'dio_helper.dart', type: 'file' }, { name: 'cache_helper.dart', type: 'file' }, { name: 'deep_link_service.dart', type: 'file' }] },
                { name: 'theme', type: 'dir' }
              ]
            },
            {
              name: 'features',
              type: 'dir',
              isOpen: true,
              children: [
                {
                  name: 'wholesale_or_retail',
                  type: 'dir',
                  isOpen: false,
                  children: [
                    { name: 'repo', type: 'dir' },
                    { name: 'service', type: 'dir' },
                    { name: 'view_model', type: 'dir', children: [{ name: 'price_mode_cubit.dart', type: 'file' }] },
                    { name: 'view', type: 'dir' }
                  ]
                }
              ]
            },
            { name: 'l10n', type: 'dir' }
          ]
        }
      ],
      folderCaption: 'Feature-First vertical slice directory structure',
      techTitle: 'Feature-First MVVM + Service/Repository Pattern',
      techDesc: 'Bynona organizes each feature into fully self-contained slices containing views, viewmodels (Cubits), service logic, and repositories. Shared assets, routes, and helpers reside in the core module. This eliminates coupling and simplifies scaling across the 15 independent functional modules.',
      layers: [
        {
          name: 'Views (UI)',
          color: 'indigo',
          desc: 'Renders templates based on active Cubit states, using ScreenUtil sizes for consistent rendering across screen dimensions.'
        },
        {
          name: 'ViewModels (Cubit)',
          color: 'sky',
          desc: 'Lightweight controllers extending Cubit that orchestrate business logic, handle user actions, and emit immutable state models.'
        },
        {
          name: 'Repositories & Services',
          color: 'emerald',
          desc: 'Services interact with DioHelper or CacheHelper, while repositories map response payloads into localized model classes, returning them safely to viewmodels.'
        }
      ],
      diDetails: 'All dependencies are registered in setupDi() using GetIt. ViewModels are registered as Factories for clean instances, while core helpers (DioHelper, SharedPreferences) and repository services are registered as Singletons at startup.'
    },
    screenshots: [
      { id: 1, path: '/bynona/1.jpeg', title: 'Wholesale Catalog Feed', desc: 'Active wholesale mode catalog featuring bulk category carousels.' },
      { id: 2, path: '/bynona/2.jpeg', title: 'Retail Pricing Mode Toggle', desc: 'Instantly toggle catalog pricing to standard retail value rules.' },
      { id: 3, path: '/bynona/3.jpeg', title: 'Detailed Product View', desc: 'Exposes specifications, images, and descriptions for item lists.' },
      { id: 4, path: '/bynona/4.jpeg', title: 'Wholesale Pricing Tiers Matrix', desc: 'Highlights bulk volume discounts and price-cuts per quantity range.' },
      { id: 5, path: '/bynona/5.jpeg', title: 'Active Wholesale Checkout Cart', desc: 'Adjust quantities and dynamically calculate overall wholesale discount savings.' },
      { id: 6, path: '/bynona/6.jpeg', title: 'OTP Registration & Sign In', desc: 'Secure phone auth flow verifying business profiles before granting wholesale logs.' },
      { id: 7, path: '/bynona/7.jpeg', title: 'Multi-Warehouse Address Book', desc: 'Manage delivery destinations using mapped coordinate pins and detail forms.' },
      { id: 8, path: '/bynona/8.jpeg', title: 'COD & Card Payment Gateways', desc: 'Choose between Cash on Delivery, wallet payments, or credit card transactions.' },
      { id: 9, path: '/bynona/9.jpeg', title: 'Bilingual RTL Arabic Layout', desc: 'Full Arabic catalog feed layout optimized with Cairo font alignments.' },
      { id: 10, path: '/bynona/10.jpeg', title: 'Arabic Product Specifications', desc: 'Arabic translations for specifications, pricing rules, and item controls.' },
      { id: 11, path: '/bynona/11.jpeg', title: 'Push Notification Alert Hub', desc: 'Ledger listing freight dispatches, order confirmations, and price reductions.' },
      { id: 12, path: '/bynona/12.jpeg', title: 'State-Aware Connection Loss Screen', desc: 'Shows internet status monitoring and triggers retry streams on recovery.' },
      { id: 13, path: '/bynona/13.jpeg', title: 'Premium System-Adaptive Dark Mode', desc: 'Sleek dark theme layout optimized for night catalog browsing.' },
      { id: 14, path: '/bynona/14.jpeg', title: 'User Settings & Local Cache Panel', desc: 'Manage app profiles, active language/theme states, and cache cleanups.' }
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
      { label: 'Architecture', value: '3-Layer Clean Arch', isIcon: false },
      { label: 'Scale', value: '11 Modules', isIcon: false }
    ],
    overview: {
      goalTitle: 'The Quest Goal',
      goalDesc1: 'Lifestyle companion apps must operate with high reliability offline, calculate complex math variables (like astronomical prayer positions) on the client, and play background media feeds without being terminated by OS battery optimizations.',
      goalDesc2: 'Muslim App incorporates background native service hooks. It embeds just_audio + audio_service for uninterrupted Quran playback, utilizes the adhan library for coordinates calculations, and retrieves device sensor data to run a real-time Qibla compass. The repository is delivered with fully automated Codemagic pipelines.',
      outcomes: [
        'Persistent background Quran audio playback with lock-screen controls via just_audio',
        'Automatic offline prayer time calculations using GPS and the adhan library',
        'Dynamic compass needle tracking the Qibla using magnetometer sensors',
        'Zakat calculator with live gold-rate pricing integration via HTTP API',
        'Offline Azkar, Hadith, and Names of Allah loaded dynamically from JSON assets',
        'Background task scheduling via WorkManager and hourly reminders via AwesomeNotifications'
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
        desc: 'Uses just_audio and just_audio_background to play full surah streams or page-range playlists. Stores playback progress in SharedPreferences and integrates lock-screen media notifications.',
        tags: ['just_audio', 'audio_service', 'SharedPreferences']
      },
      {
        id: 2,
        iconName: 'MapPin',
        title: 'Location-Aware Prayer Times',
        desc: 'Calculates five daily prayer milestones offline using geographic equations from the adhan library. Triggers native Adhan voice notifications and schedules notifications in the background via WorkManager.',
        tags: ['adhan package', 'geolocator', 'WorkManager']
      },
      {
        id: 3,
        iconName: 'Compass',
        title: 'Sensor-Based Qibla Compass',
        desc: 'Retrieves magnetic heading values via magnetometer sensors and flutter_qiblah. Renders an interactive, animated compass pointing to the Kaaba.',
        tags: ['flutter_qiblah', 'Magnetometer', 'Compass Animation']
      },
      {
        id: 4,
        iconName: 'BookOpen',
        title: 'Offline-First Assets Library',
        desc: 'Parses morning/evening Azkar, authentic Hadiths, and Names of Allah offline from preloaded local JSON assets, maintaining ultra-fast lookups without network overhead.',
        tags: ['JSON Parser', 'Hadith Books', 'Asma ul-Husna']
      }
    ],
    alert: {
      type: 'warning',
      title: 'Battery Optimization Warning',
      desc: 'To guarantee that background prayer alarms and periodic reminders trigger accurately, the app includes disable_battery_optimization to prompt the user to exclude the app from native OS battery restrictions.'
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
                { name: 'di', type: 'dir', children: [{ name: 'service_locator.dart', type: 'file' }, { name: 'register_cubits.dart', type: 'file' }] },
                { name: 'main', type: 'dir', children: [{ name: 'app_initializer.dart', type: 'file' }] },
                { name: 'service', type: 'dir', children: [{ name: 'periodic_reminder_service.dart', type: 'file' }, { name: 'location_service.dart', type: 'file' }] }
              ]
            },
            {
              name: 'features',
              type: 'dir',
              isOpen: true,
              children: [
                {
                  name: 'prayer_times',
                  type: 'dir',
                  isOpen: false,
                  children: [
                    { name: 'data', type: 'dir' },
                    { name: 'domain', type: 'dir' },
                    { name: 'presentation', type: 'dir', children: [{ name: 'cubit', type: 'dir' }] }
                  ]
                },
                {
                  name: 'quran',
                  type: 'dir',
                  isOpen: false,
                  children: [
                    { name: 'model', type: 'dir' },
                    { name: 'repository', type: 'dir' },
                    { name: 'service', type: 'dir', children: [{ name: 'quran_service.dart', type: 'file' }] },
                    { name: 'viewmodel', type: 'dir', children: [{ name: 'quran_player_cubit', type: 'dir' }] },
                    { name: 'view', type: 'dir' }
                  ]
                }
              ]
            }
          ]
        }
      ],
      folderCaption: '3-Layer Clean Architecture & MVVM vertical slices',
      techTitle: 'Clean Domain-Driven & MVVM Hybrid Pattern',
      techDesc: 'Muslim App segregates features based on their complexity. Core system layers (like prayer times, Hadiths, and Azkar) follow strict 3-Layer Clean Architecture (Data -> Domain <- Presentation), while media and reading layers (like Quran player) employ a decoupled MVVM workflow to ensure modular scalability.',
      layers: [
        {
          name: 'Presentation (UI & Cubit)',
          color: 'indigo',
          desc: 'Renders Material 3 interfaces utilizing ScreenUtil sizes. Updates state reactively via dedicated Cubits (e.g. QuranPlayerCubit, QiblahCubit).'
        },
        {
          name: 'Domain (Use Cases & Contracts)',
          color: 'sky',
          desc: 'Defines the pure business logic and contracts (e.g. PlayAzkarAudioUseCase, GetQiblahStreamUseCase) separated from platform frameworks.'
        },
        {
          name: 'Data & Local Services',
          color: 'emerald',
          desc: 'Provides concrete implementations of repositories. Handles local JSON parsing, location providers, SharedPreferences key caches, and background players.'
        }
      ],
      diDetails: 'Services, repositories, data sources, and use cases are registered in setupLocator() via GetIt. ViewModels/Cubits are registered as Factories to allow page-level isolation, while core background workers and the Quran player service are Singletons.'
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
      { label: 'Architecture', value: 'Feature-First Clean/MVVM', isIcon: false },
      { label: 'Scale', value: '12 Modules', isIcon: false }
    ],
    overview: {
      goalTitle: 'The Quest Goal',
      goalDesc1: 'Clinical healthcare applications require absolute security standards, precise input formats (like genetic strings), and intuitive tools to track patient indicators over long intervals.',
      goalDesc2: 'Cancer Detection AI is a secure clinical frontend. The app connects to Supabase database layers utilizing Row-Level Security rules. It displays patient indicators using fl_chart diagrams and passes parameters to a custom Machine Learning backend to output colorectal cancer risk calculations.',
      outcomes: [
        'Fully secure clinical client integrated with Supabase Authentication and Database',
        'Multi-stage medical image analysis for Endoscopy and Histopathology via a Flask ML REST API',
        'Polyp classification and bounding box localization drawn reactively via CustomPainter',
        'Interactive tumor marker CEA & CA19-9 tracking plotted via fl_chart and syncfusion_flutter_charts',
        'Clinical patient records management and real-time medical forum boards powered by Supabase RLS',
        'Declarative routing utilizing GoRouter and state management via lightweight Cubits'
      ],
      walkthrough: {
        videoPath: null,
        fallbackImg: '/images/colon.png'
      }
    },
    features: [
      {
        id: 1,
        iconName: 'Activity',
        title: 'Multi-Stage Endoscopy Analyzer',
        desc: 'Uploads endoscopic images to a local Flask ML REST API for adenoma/hyperplastic binary prediction. Proceeds to polyp detection with bounding box localization coordinate offsets (xmin, ymin, xmax, ymax) rendered using CustomPainter.',
        tags: ['Flask REST API', 'Polyp Detection', 'CustomPainter']
      },
      {
        id: 2,
        iconName: 'Microscope',
        title: 'Histopathological Tissue Classifier',
        desc: 'Sends tissue biopsy scans to the Flask predict endpoint to classify cells. Renders confidence level and class predictions instantly to assist clinicians.',
        tags: ['Histopathology', 'Biopsy Classifier', 'Image Upload']
      },
      {
        id: 3,
        iconName: 'LineChart',
        title: 'CEA & CA19-9 Tumor Tracker',
        desc: 'Plots patient tumor indicators over time using fl_chart and syncfusion_flutter_charts, highlighting critical limit boundaries and showing temporal trends.',
        tags: ['fl_chart', 'syncfusion_charts', 'TumorCubit']
      },
      {
        id: 4,
        iconName: 'ShieldCheck',
        title: 'Supabase Security & RLS',
        desc: 'Enforces HIPAA-grade security policies by routing queries through Supabase Auth. Row-Level Security (RLS) policies prevent cross-clinician leakages, securing forum data and patient records.',
        tags: ['Supabase Auth', 'Row-Level Security', 'GoRouter Guard']
      }
    ],
    alert: {
      type: 'info',
      title: 'Global State & Route Guards',
      desc: 'Clinician navigation routes are managed declaratively using GoRouter. Global state transitions are monitored via a custom BlocObserver (MyBlocObserver), logging active Cubit creations and events.'
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
                { name: 'utlis', type: 'dir', children: [{ name: 'app_router.dart', type: 'file' }, { name: 'service_locator.dart', type: 'file' }] },
                { name: 'widgets', type: 'dir', children: [{ name: 'custom_drawer.dart', type: 'file' }] }
              ]
            },
            {
              name: 'features',
              type: 'dir',
              isOpen: true,
              children: [
                {
                  name: 'endoscopy',
                  type: 'dir',
                  isOpen: false,
                  children: [
                    {
                      name: 'presentation',
                      type: 'dir',
                      children: [
                        { name: 'views', type: 'dir', children: [{ name: 'endoscopy_view.dart', type: 'file' }, { name: 'widgets', type: 'dir', children: [{ name: 'endoscopy_details.dart', type: 'file' }, { name: 'predict_endo_image.dart', type: 'file' }] }] }
                      ]
                    }
                  ]
                },
                {
                  name: 'forum',
                  type: 'dir',
                  isOpen: false,
                  children: [
                    { name: 'presentation', type: 'dir', children: [{ name: 'manager/cubit/patient_cubit.dart', type: 'file' }] }
                  ]
                }
              ]
            }
          ]
        }
      ],
      folderCaption: 'Modular feature-focused Clean/MVVM structure',
      techTitle: 'Feature-Focused Clean/MVVM Architecture',
      techDesc: 'Colorectal Cancer AI isolates functional domains into 12 self-contained feature slices under the lib/features folder. Core router files, models, and shared utilities reside in the core/ directory. Views consume state reactively via Cubits, while Supabase and Flask REST integrations are encapsulated in data handlers.',
      layers: [
        {
          name: 'Presentation Views',
          color: 'indigo',
          desc: 'Renders passive UI dashboards, forum threads, and chart plots, adapting dynamically to layout constraints.'
        },
        {
          name: 'Cubit State Controllers',
          color: 'sky',
          desc: 'Lightweight cubits (e.g. TumorCubit, PatientTrackingCubit) that process inputs, fetch clinical data, and emit immutable states.'
        },
        {
          name: 'Supabase & API Services',
          color: 'emerald',
          desc: 'Performs user authentication, executes RLS-authorized database queries, and runs HTTP Multipart requests to the Flask ML endpoints.'
        }
      ],
      diDetails: 'Services and repositories are configured inside setupServiceLocator() using GetIt, separating backend API calls from view rendering. The Supabase connection is established at startup.'
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
      { label: 'Architecture', value: 'Feature-First Clean/MVVM', isIcon: false },
      { label: 'Scale', value: '11 Modules', isIcon: false }
    ],
    overview: {
      goalTitle: 'The Quest Goal',
      goalDesc1: 'E-learning apps must coordinate complex customer journeys, including catalog lookups, video playback resume states, multi-tier subscription locks, and interactive quizzes, all with offline support.',
      goalDesc2: 'Mansy Learning uses an MVVM structure. It integrates GoRouter guards to intercept route requests, caches playback timestamps using SharedPreferences, and connects to a serverless Supabase backend to synchronize progress markers.',
      outcomes: [
        'Course access control showing lock icons on lessons/quizzes based on SubscriptionCubit state',
        'Subscribed content launching via url_launcher in-app webview (videos) and external apps (PDFs)',
        'Interactive QuizView using QuizCubit to render progress bars and compare scores with passing marks',
        'Authentication-responsive GoRouter setups listening to AuthCubit streams for automatic page routing',
        'Secure user registration and login endpoints utilizing Supabase Authentication',
        'Clean dependency injection registration inside injection.dart using GetIt'
      ],
      walkthrough: {
        videoPath: null,
        fallbackImg: '/images/mansy.png'
      }
    },
    features: [
      {
        id: 1,
        iconName: 'Lock',
        title: 'Subscription Verification',
        desc: 'Checks the user subscription state before allowing access to videos, PDF files, or quizzes, rendering locking icons on list items and displaying warnings if locked material is clicked.',
        tags: ['SubscriptionCubit', 'Access Control', 'SnackBar Prompt']
      },
      {
        id: 2,
        iconName: 'Play',
        title: 'Video & Document Launcher',
        desc: 'For subscribed users, lessons are loaded dynamically. Videos open using url_launcher in-app webviews, and study resources are triggered in external PDF reading applications.',
        tags: ['url_launcher', 'In-App Webview', 'PDF Reader']
      },
      {
        id: 3,
        iconName: 'HelpCircle',
        title: 'Interactive Quiz Engine',
        desc: 'Presents dynamic multiple-choice sheets from QuizModel. It tracks selected answers, updates linear progress indicators, and displays completion overlays comparing marks with passing levels.',
        tags: ['QuizCubit', 'QuizModel', 'LinearProgressIndicator']
      },
      {
        id: 4,
        iconName: 'Database',
        title: 'Supabase Course Synchronizer',
        desc: 'Interacts directly with Supabase database tables to query courses, fetch course content lists, check user enrollments, and retrieve active profiles.',
        tags: ['Supabase Client', 'CourseService', 'ProfileRepository']
      }
    ],
    alert: {
      type: 'info',
      title: 'GoRouter Auth Refresh Listeners',
      desc: 'The app uses AppRouter with GoRouter to manage routes. It implements a _GoRouterRefreshStream that observes AuthCubit stream changes, automatically triggering route re-evaluations and redirecting users when login/logout events occur.'
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
                { name: 'di', type: 'dir', children: [{ name: 'injection.dart', type: 'file' }] },
                { name: 'router', type: 'dir', children: [{ name: 'app_router.dart', type: 'file' }] },
                { name: 'theme', type: 'dir' }
              ]
            },
            {
              name: 'features',
              type: 'dir',
              isOpen: true,
              children: [
                {
                  name: 'course',
                  type: 'dir',
                  isOpen: false,
                  children: [
                    { name: 'models', type: 'dir', children: [{ name: 'course_model.dart', type: 'file' }] },
                    { name: 'repositories', type: 'dir', children: [{ name: 'course_repository_impl.dart', type: 'file' }] },
                    { name: 'services', type: 'dir', children: [{ name: 'course_service.dart', type: 'file' }] },
                    { name: 'viewmodels', type: 'dir', children: [{ name: 'course_cubit.dart', type: 'file' }] },
                    { name: 'views', type: 'dir', children: [{ name: 'course_view.dart', type: 'file' }] }
                  ]
                }
              ]
            }
          ]
        }
      ],
      folderCaption: 'Feature-First structure with service/repository segregation',
      techTitle: 'Feature-First Clean/MVVM Architecture',
      techDesc: 'Mansy Learning segregates functionality into 11 distinct feature slices under the lib/features folder. Shared router paths, theme configs, and DI setups reside in the lib/core module. Inside each feature slice, services fetch data from Supabase, repositories format them into Equatable models, and passive views read state reactively from Cubits.',
      layers: [
        {
          name: 'Presentation (UI & Router)',
          color: 'indigo',
          desc: 'Renders passive screens and tabs using AppTypography. Manages navigation paths using GoRouter and route arguments.'
        },
        {
          name: 'ViewModels (Cubit)',
          color: 'sky',
          desc: 'State controllers (e.g. CourseCubit, SubscriptionCubit, QuizCubit) that process inputs, verify claims, and emit immutable statuses.'
        },
        {
          name: 'Repositories & Services',
          color: 'emerald',
          desc: 'Services fetch raw JSON from Supabase database tables, and repositories serialize them into safe models, throwing Exceptions on failure.'
        }
      ],
      diDetails: 'Dependency injection is configured in setupDependencyInjection() using GetIt. Services, repositories, and viewmodels are registered as LazySingletons (with factory registrations for SignupCubit) to optimize memory.'
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
      { label: 'Architecture', value: 'Feature-Separated with Provider', isIcon: false },
      { label: 'Scale', value: '2 Modules', isIcon: false }
    ],
    overview: {
      goalTitle: 'The Quest Goal',
      goalDesc1: 'Building a local music application that performs identically across Android and iOS demands a lightweight media engine, reliable background audio playbacks, and OS lockscreen integration without leaks.',
      goalDesc2: 'Music Player merges just_audio and just_audio_background to support background audio streaming with native notifications. The interface features custom player sliders, search filters, and persistent bottom playback bars. Authentication flows are managed securely via Firebase Auth.',
      outcomes: [
        'Cross-platform execution on Android and iOS (configured for background services)',
        'Low-overhead local directory assets loading for preloaded audio tracks',
        'Persistent audio player state bar at the bottom with real-time controls and titles',
        'Interactive playlist search filter querying titles/artists reactively',
        'Background audio player with lock-screen media notifications via just_audio_background',
        'Secure user authentication using Firebase Auth and Google Sign-In'
      ],
      walkthrough: {
        videoPath: null,
        fallbackImg: '/images/music-player.png'
      }
    },
    features: [
      {
        id: 1,
        iconName: 'Music',
        title: 'Concatenating Playlist Engine',
        desc: 'Constructs a playlist using ConcatenatingAudioSource to stream local asset audio tracks (such as MUSliM and Eminem mixes) with network album art caching.',
        tags: ['ConcatenatingAudioSource', 'just_audio', 'Asset Loader']
      },
      {
        id: 2,
        iconName: 'Search',
        title: 'Reactive Track Search Filter',
        desc: 'Integrates a real-time search field inside the music list screen. Employs StreamBuilder to filter active playlist metadata (title/artist) reactively as the user types.',
        tags: ['StreamBuilder', 'TextEditingController', 'RxDart']
      },
      {
        id: 3,
        iconName: 'Play',
        title: 'Background Audio Service',
        desc: 'Integrates just_audio_background and audio_service to enable uninterrupted playback when the app is minimized, linking controls to lock-screen widgets.',
        tags: ['just_audio_background', 'audio_service', 'Lockscreen Controls']
      },
      {
        id: 4,
        iconName: 'Fingerprint',
        title: 'Secure Firebase Authentication',
        desc: 'Protects client data by routing redirects through Firebase Auth. Prompts sign-in/up views (including Google Sign-In integration) if no session is active.',
        tags: ['Firebase Auth', 'Google Sign-In', 'Connectivity check']
      }
    ],
    alert: {
      type: 'warning',
      title: 'Background Playback Support',
      desc: 'To prevent battery save loops from shutting down background music threads, the player uses native Android service channels registered at start. The audio player state is automatically disposed when the controller lifecycle ends to prevent leakage.'
    },
    architecture: {
      folderTree: [
        {
          name: 'lib',
          type: 'dir',
          isOpen: true,
          children: [
            {
              name: 'screens',
              type: 'dir',
              isOpen: true,
              children: [
                {
                  name: 'player_screen',
                  type: 'dir',
                  isOpen: false,
                  children: [
                    { name: 'data', type: 'dir', children: [{ name: 'position_data.dart', type: 'file' }] },
                    { name: 'widgets', type: 'dir', children: [{ name: 'controls.dart', type: 'file' }, { name: 'player_screen.dart', type: 'file' }] },
                    { name: 'music_list.dart', type: 'file' }
                  ]
                },
                {
                  name: 'auth_screen',
                  type: 'dir',
                  isOpen: false,
                  children: [
                    { name: 'auth_screen.dart', type: 'file' }
                  ]
                }
              ]
            },
            { name: 'check.dart', type: 'file' },
            { name: 'main.dart', type: 'file' }
          ]
        }
      ],
      folderCaption: 'Clean feature-separated screen modules layout',
      techTitle: 'Feature-Separated MVC Layout with Provider',
      techDesc: 'Music Player structures its components into dedicated screens (Auth & Player) under the screens/ directory. Global app boot logic and routing coordinates reside in check.dart and main.dart. The media engine is run via stream subscriptions (position, buffered position, duration) combined reactively with RxDart, updating views cleanly.',
      layers: [
        {
          name: 'Views & Widgets',
          color: 'indigo',
          desc: 'Renders clean player sliders, song lists, search inputs, and sign-in forms. Adapts colors to matching assets.'
        },
        {
          name: 'Audio Player Engine',
          color: 'sky',
          desc: 'Orchestrates audio playbacks, loop modes, track selections, and timeline seeks in response to user taps.'
        },
        {
          name: 'Firebase & Asset Services',
          color: 'emerald',
          desc: 'Pipes authentication credentials to Firebase Auth, loads local mp3 resources from asset files, and fetches network art headers.'
        }
      ],
      diDetails: 'Services and state providers are initialized in main() and check.dart. The main audio controller and background task dependencies are registered as singletons at application startup, preserving player status throughout user navigation.'
    },
    screenshots: [
      { id: 1, mockType: 'music-dashboard', title: 'Dynamic Music Library', desc: 'Scan results displaying albums, artists, folders, and recent tracks.' },
      { id: 2, mockType: 'music-playing', title: 'Immersive Player View', desc: 'Album art glowing panels, track position sliders, and queue controls.' },
      { id: 3, mockType: 'music-playlist', title: 'Queue & Playlist Manager', desc: 'Sort queues using drag controls, create playlists, and update titles.' },
      { id: 4, mockType: 'music-settings', title: 'Scan Directory Settings', desc: 'Add scan folders, configure cache sizes, and customize desktop bindings.' }
    ]
  }
};
