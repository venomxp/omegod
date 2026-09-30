

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

const translationsEn = {
  "nav": {
    "home": "Home",
    "privacy": "Privacy Policy",
    "terms": "Terms of Service",
    "rules": "Rules"
  },
  "footer": {
    "copyright": "OmeGod. All rights reserved."
  },
  "home": {
    "heroTitle": "Talk to Strangers",
    "heroTitleAccent": "Instantly.",
    "heroStats": [
      { "value": "190+", "label": "Countries" },
      { "value": "1M+", "label": "Users Online" }
    ],
    "heroDescription": "Connect with people from all over the world through spontaneous, anonymous video conversations.",
    "getStarted": "Start Chatting",
    "interestsTitle": "What do you want to talk about?",
    "addInterestPlaceholder": "Add your own interest...",
    "noInterestsPlaceholder": "Selected interests will appear here.",
    "addButton": "Add",
    "interests": [
      { "label": "Music", "emoji": "🎵" },
      { "label": "Football", "emoji": "⚽" },
      { "label": "Anime", "emoji": "🎌" },
      { "label": "Travel", "emoji": "🌍" },
      { "label": "Movies", "emoji": "🎬" },
      { "label": "Gaming", "emoji": "🎮" },
      { "label": "Art", "emoji": "🎨" },
      { "label": "Food", "emoji": "🍔" }
    ],
    "ticker": [
      "Anonymous Chat", "HD Video", "Instant Connections", "Global Reach", "Safe & Secure", "Free to Use"
    ],
    "servicesTitle": "Why OmeGod?",
    "features": [
        {
            "icon": "ShieldCheck",
            "title": "Instant & Anonymous",
            "description": "Jump into conversations instantly with no registration required. Your identity is protected, allowing you to be yourself."
        },
        {
            "icon": "VideoCamera",
            "title": "Crystal Clear Video",
            "description": "Experience smooth, high-definition video streams that make your conversations feel personal and incredibly real."
        },
        {
            "icon": "Globe",
            "title": "Global Connections",
            "description": "Meet interesting people from over 190 countries with a single click. Broaden your horizons and discover new cultures."
        }
    ],
    "learnMore": "Learn More",
    "metrics": [
      { "value": "10M+", "label": "Daily Chats" },
      { "value": "190+", "label": "Countries Connected" },
      { "value": "24/7", "label": "Active Users" },
      { "value": "100%", "label": "Free Platform" }
    ],
    "faqTitle": "Frequently Asked Questions",
    "faqSubtitle": "Have questions? We've got answers.",
    "faqs": [
      {
        "question": "Is OmeGod free to use?",
        "answer": "Yes, OmeGod is completely free to use. You can start chatting with strangers from around the world without any cost or subscription fees."
      },
      {
        "question": "Do I need to create an account?",
        "answer": "No, you don't need to register. We believe in privacy and simplicity. You can start a chat anonymously with just one click."
      },
      {
        "question": "How do you ensure user safety?",
        "answer": "We have a report system in place for users who violate our rules. Our community guidelines are strictly enforced to create a safe and respectful environment for everyone. Please report any inappropriate behavior immediately."
      },
      {
        "question": "Does OmeGod work on mobile devices?",
        "answer": "Absolutely! OmeGod is fully responsive and works seamlessly on desktops, tablets, and smartphones. All you need is a modern browser and an internet connection."
      }
    ]
  },
  "chat": {
    "report": "Report",
    "next": "Next",
    "stop": "Stop",
    "skipConfirm": "Skip?",
    "escKey": "Esc",
    "idleTitle": "Ready to Chat?",
    "idleSubtitle": "Click \"Start\" to connect with someone new. Make sure your camera and microphone are enabled.",
    "start": "Start",
    "searching": "Finding a stranger...",
    "cameraBlockedTitle": "Camera & Microphone Blocked",
    "cameraBlockedSubtitle": "Your browser blocked camera access. Browsers never re-show the permission prompt once blocked — you must allow it in your browser address bar.",
    "unblockStep1": "Click the 🔒 lock or settings icon beside the URL in your browser's address bar at the top.",
    "unblockStep2": "Toggle Camera and Microphone to \"Allow\" (or reset permissions).",
    "unblockStep3": "Click \"Reload Page\" below to apply the change.",
    "reloadPage": "Reload Page",
    "continueTextOnly": "Continue in Text Mode",
    "howToUnblock": "How to unblock in your browser",
    "checkingPermissions": "Checking...",
    "onlineUsers": "online",
    "onlineNow": "online now",
    "tryAgain": "Try Again",
    "error": "Error",
    "errorEnableCamera": "Please enable your camera to start chatting.",
    "errorNoCamera": "No camera or microphone found. Please make sure your devices are connected and not in use by another application.",
    "errorGeneric": "An error occurred while accessing your camera. Please check your device or browser settings. ({{errorName}})",
    "errorUnknown": "An unknown error occurred while trying to access your camera.",
    "messagePlaceholder": "Type a message...",
    "connectedSystemMessage": "You are now connected with a stranger.",
    "partnerLeft": "The stranger has disconnected.",
    "lookingForTags": "Looking for someone interested in: {{tags}} (Tag Priority)",
    "commonInterestsFound": "You both like: {{tags}}",
    "noCommonInterestsFound": "Couldn't find anyone with your exact interests right now, paired with a random stranger.",
    "randomStrangerConnected": "You're now chatting with a random stranger. Say hi!",
    "strangerCountry": "Stranger is from: {{country}}",
    "country": "Country",
    "priorityTagsActive": "Priority to tags active",
    "myTags": "Tags:",
    "addTag": "+ Add tag",
    "reportModalTitle": "Report Stranger",
    "reportModalSubtitle": "Help us keep the community safe. Please select a reason for your report.",
    "reportReasons": [
      "Inappropriate video",
      "Abusive language or threats",
      "Spam or advertising",
      "Underage user",
      "Other"
    ],
    "cancel": "Cancel",
    "submitReport": "Submit Report",
    "mutePartner": "Mute",
    "unmutePartner": "Unmute",
    "muteMicrophone": "Mute microphone",
    "unmuteMicrophone": "Unmute microphone",
    "strangerLabel": "Stranger",
    "youLabel": "You",
    "enlargeScreen": "Main Screen",
    "swapScreens": "Swap large screen",
    "clickToEnlarge": "Click to enlarge",
    "strangerTyping": "Stranger is typing..."
  },
  "policyPages": {
    "lastUpdated": "Last updated",
    "backToHome": "Back to Home",
    "privacy": {
      "title": "Privacy Policy",
      "welcome": "Welcome to OmeGod. We are committed to protecting your privacy. This Privacy Policy explains what information we collect, how we use it, and your rights in relation to it.",
      "section1": {
        "title": "Information We Collect", "p1": "We do not require you to create an account, so we collect minimal personal information. We may collect non-personal data such as browser type, language preference, and IP address for analytics and to improve our service."
      },
      "section2": {
        "title": "How We Use Collected Information", "p1": "OmeGod uses the collected data to operate and maintain the service, understand how users interact with the platform, and to enhance security and user experience."
      },
      "section3": { "title": "Use of Camera and Microphone", "p1": "To provide our video chat service, we require access to your device's camera and microphone. This access is only active while you are connected to another user. We do not record or store your camera or microphone feed at any time. All video streams are peer-to-peer and are not stored on our servers." },
      "section4": { "title": "Data Security", "p1": "We adopt appropriate data collection, storage and processing practices and security measures to protect against unauthorized access, alteration, disclosure or destruction of your data." },
      "section5": { "title": "Changes to This Privacy Policy", "p1": "We have the discretion to update this privacy policy at any time. When we do, we will revise the updated date at the bottom of this page. We encourage Users to frequently check this page for any changes to stay informed about how we are helping to protect the personal information we collect." }
    },
    "terms": {
      "title": "Terms of Service",
      "welcome": "Please read these Terms of Service (\"Terms\") carefully before using the OmeGod website (the \"Service\"). Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms.",
      "section1": { "title": "User Conduct", "p1": "You agree not to use the Service to engage in any activity that is illegal, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable. You must be 18 years or older to use this service." },
      "section2": { "title": "Intellectual Property", "p1": "The Service and its original content, features and functionality are and will remain the exclusive property of OmeGod and its licensors. The Service is protected by copyright, trademark, and other laws." },
      "section3": { "title": "Disclaimer of Warranties", "p1": "The Service is provided on an \"AS IS\" and \"AS AVAILABLE\" basis. We make no warranty that the Service will meet your requirements or be available on an uninterrupted, secure, or error-free basis." },
      "section4": { "title": "Limitation of Liability", "p1": "In no event shall OmeGod, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of the service." },
      "section5": { "title": "Governing Law", "p1": "These Terms shall be governed and construed in accordance with the laws of the land, without regard to its conflict of law provisions." }
    },
    "rules": {
      "title": "Community Rules",
      "subtitle": "Follow these simple rules to ensure a safe and respectful environment for everyone.",
      "section1": { "title": "Be Respectful", "p1": "Treat others as you would like to be treated. Harassment, hate speech, threats, or any form of bullying will not be tolerated." },
      "section2": { "title": "No Illegal Activities", "p1": "Do not use our services to conduct or promote any illegal activities. This includes sharing illegal content." },
      "section3": { "title": "No Nudity or Sexual Content", "p1": "OmeGod is not a platform for explicit content. Any nudity, pornography, or sexually suggestive behavior will result in an immediate and permanent ban." },
      "section4": { "title": "No Spam or Self-Promotion", "p1": "Do not spam other users or our services with unsolicited messages, links, or promotions for other services." },
      "section5": { "title": "Protect Your Privacy", "p1": "Be cautious about sharing personal information like your full name, address, or financial details with strangers." }
    }
  }
};

const translationsFr = {
  "nav": {
    "home": "Accueil",
    "privacy": "Politique de confidentialité",
    "terms": "Conditions d'utilisation",
    "rules": "Règles"
  },
  "footer": {
    "copyright": "OmeGod. Tous droits réservés."
  },
  "home": {
    "heroTitle": "Parlez à des Inconnus",
    "heroTitleAccent": "Instantanément.",
    "heroStats": [
      { "value": "+190", "label": "Pays" },
      { "value": "+1M", "label": "Utilisateurs en ligne" }
    ],
    "heroDescription": "Connectez-vous avec des gens du monde entier grâce à des conversations vidéo spontanées et anonymes.",
    "getStarted": "Commencer à chatter",
    "interestsTitle": "De quoi voulez-vous parler ?",
    "addInterestPlaceholder": "Ajoutez votre propre intérêt...",
    "noInterestsPlaceholder": "Les intérêts sélectionnés apparaîtront ici.",
    "addButton": "Ajouter",
    "interests": [
      { "label": "Musique", "emoji": "🎵" },
      { "label": "Football", "emoji": "⚽" },
      { "label": "Anime", "emoji": "🎌" },
      { "label": "Voyage", "emoji": "🌍" },
      { "label": "Films", "emoji": "🎬" },
      { "label": "Jeux", "emoji": "🎮" },
      { "label": "Art", "emoji": "🎨" },
      { "label": "Nourriture", "emoji": "🍔" }
    ],
    "ticker": [
      "Chat Anonyme", "Vidéo HD", "Connexions Instantanées", "Portée Mondiale", "Sûr et Sécurisé", "Utilisation Gratuite"
    ],
    "servicesTitle": "Pourquoi OmeGod ?",
    "features": [
        {
            "icon": "ShieldCheck",
            "title": "Instantané et Anonyme",
            "description": "Entrez instantanément en conversation sans inscription. Votre identité est protégée, vous permettant d'être vous-même."
        },
        {
            "icon": "VideoCamera",
            "title": "Vidéo Cristalline",
            "description": "Profitez de flux vidéo fluides en haute définition qui rendent vos conversations personnelles et incroyablement réelles."
        },
        {
            "icon": "Globe",
            "title": "Connexions Mondiales",
            "description": "Rencontrez des personnes intéressantes de plus de 190 pays en un seul clic. Élargissez vos horizons et découvrez de nouvelles cultures."
        }
    ],
    "learnMore": "En savoir plus",
    "metrics": [
      { "value": "+10M", "label": "Chats quotidiens" },
      { "value": "+190", "label": "Pays connectés" },
      { "value": "24/7", "label": "Utilisateurs actifs" },
      { "value": "100%", "label": "Plateforme gratuite" }
    ],
    "faqTitle": "Questions fréquemment posées",
    "faqSubtitle": "Vous avez des questions ? Nous avons les réponses.",
    "faqs": [
      { "question": "OmeGod est-il gratuit ?", "answer": "Oui, OmeGod est entièrement gratuit. Vous pouvez commencer à discuter avec des inconnus du monde entier sans aucun coût ni frais d'abonnement." },
      { "question": "Dois-je créer un compte ?", "answer": "Non, vous n'avez pas besoin de vous inscrire. Nous croyons en la confidentialité et la simplicité. Vous pouvez démarrer une discussion anonymement en un seul clic." },
      { "question": "Comment assurez-vous la sécurité des utilisateurs ?", "answer": "Nous avons un système de signalement pour les utilisateurs qui enfreignent nos règles. Nos directives communautaires sont strictement appliquées pour créer un environnement sûr et respectueux pour tous. Veuillez signaler immédiatement tout comportement inapproprié." },
      { "question": "OmeGod fonctionne-t-il sur les appareils mobiles ?", "answer": "Absolument ! OmeGod est entièrement réactif et fonctionne de manière transparente sur les ordinateurs de bureau, les tablettes et les smartphones. Tout ce dont vous avez besoin est un navigateur moderne et une connexion Internet." }
    ]
  },
  "chat": {
    "report": "Signaler",
    "next": "Suivant",
    "stop": "Arrêter",
    "skipConfirm": "Passer ?",
    "escKey": "Échap",
    "idleTitle": "Prêt à chatter ?",
    "idleSubtitle": "Cliquez sur \"Démarrer\" pour vous connecter avec quelqu'un de nouveau. Assurez-vous que votre caméra et votre microphone sont activés.",
    "start": "Démarrer",
    "searching": "Recherche d'un inconnu...",
    "cameraBlockedTitle": "Caméra et microphone bloqués",
    "cameraBlockedSubtitle": "Votre navigateur a bloqué l'accès à la caméra. Les navigateurs ne réaffichent jamais la fenêtre d'autorisation après un refus — vous devez l'activer dans la barre d'adresse.",
    "unblockStep1": "Cliquez sur le cadenas 🔒 ou l'icône de réglages à gauche de l'adresse du site en haut.",
    "unblockStep2": "Réglez Caméra et Microphone sur \"Autoriser\" (Allow).",
    "unblockStep3": "Cliquez sur \"Recharger la page\" ci-dessous pour appliquer.",
    "reloadPage": "Recharger la page",
    "continueTextOnly": "Continuer en mode texte/audio",
    "howToUnblock": "Comment débloquer selon votre navigateur",
    "checkingPermissions": "Vérification...",
    "onlineUsers": "en ligne",
    "onlineNow": "en ligne",
    "tryAgain": "Réessayer",
    "error": "Erreur",
    "errorEnableCamera": "Veuillez activer votre caméra pour commencer à discuter.",
    "errorNoCamera": "Aucune caméra ou microphone trouvé. Assurez-vous que vos appareils sont connectés et non utilisés par une autre application.",
    "errorGeneric": "Une erreur s'est produite lors de l'accès à votre caméra. Veuillez vérifier les paramètres de votre appareil ou de votre navigateur. ({{errorName}})",
    "errorUnknown": "Une erreur inconnue s'est produite lors de la tentative d'accès à votre caméra.",
    "messagePlaceholder": "Écrivez un message...",
    "connectedSystemMessage": "Vous êtes maintenant connecté avec un inconnu.",
    "partnerLeft": "L'inconnu s'est déconnecté.",
    "lookingForTags": "Recherche d'une personne intéressée par : {{tags}} (Priorité aux tags)",
    "commonInterestsFound": "🎉 Vous partagez les mêmes centres d'intérêt : {{tags}}",
    "noCommonInterestsFound": "Aucun correspondant trouvé avec vos centres d'intérêt, vous êtes connecté à un inconnu aléatoire.",
    "randomStrangerConnected": "Vous discutez maintenant avec un inconnu aléatoire. Dites bonjour !",
    "strangerCountry": "L'inconnu vient de : {{country}}",
    "country": "Pays",
    "priorityTagsActive": "Priorité aux tags active ⚡",
    "myTags": "Tags sélectionnés :",
    "addTag": "+ Ajouter un tag",
    "reportModalTitle": "Signaler un inconnu",
    "reportModalSubtitle": "Aidez-nous à maintenir la communauté en sécurité. Veuillez sélectionner une raison pour votre signalement.",
    "reportReasons": [
      "Vidéo inappropriée",
      "Langage abusif ou menaces",
      "Spam ou publicité",
      "Utilisateur mineur",
      "Autre"
    ],
    "cancel": "Annuler",
    "submitReport": "Soumettre le signalement",
    "mutePartner": "Muet",
    "unmutePartner": "Activer le son",
    "muteMicrophone": "Couper le micro",
    "unmuteMicrophone": "Activer le micro",
    "strangerLabel": "Inconnu",
    "youLabel": "Vous",
    "enlargeScreen": "Écran principal",
    "swapScreens": "Inverser les écrans",
    "clickToEnlarge": "Cliquer pour agrandir",
    "strangerTyping": "L'inconnu est en train d'écrire..."
  },
  "policyPages": {
    "lastUpdated": "Dernière mise à jour",
    "backToHome": "Retour à l'accueil",
    "privacy": {
      "title": "Politique de confidentialité",
      "welcome": "Bienvenue sur OmeGod. Nous nous engageons à protéger votre vie privée. Cette politique explique quelles informations nous collectons, comment nous les utilisons et vos droits à cet égard.",
      "section1": { "title": "Informations que nous collectons", "p1": "Nous ne demandons pas de compte, donc nous collectons peu d'informations personnelles. Nous pouvons collecter des données non personnelles comme le type de navigateur, la langue et l'adresse IP pour l'analyse et l'amélioration du service." },
      "section2": { "title": "Comment nous utilisons les informations", "p1": "OmeGod utilise les données pour exploiter le service, comprendre comment les utilisateurs interagissent avec la plateforme, et pour améliorer la sécurité et l'expérience utilisateur." },
      "section3": { "title": "Utilisation de la caméra et du microphone", "p1": "Pour fournir notre service de chat vidéo, nous avons besoin d'accéder à la caméra et au microphone de votre appareil. Cet accès n'est actif que lorsque vous êtes connecté à un autre utilisateur. Nous n'enregistrons ni ne stockons votre flux de caméra ou de microphone à aucun moment." },
      "section4": { "title": "Sécurité des données", "p1": "Nous adoptons des mesures de sécurité appropriées pour protéger vos données contre l'accès, l'altération, la divulgation ou la destruction non autorisés." },
      "section5": { "title": "Modifications de cette politique", "p1": "Nous pouvons mettre à jour cette politique de confidentialité à tout moment. Nous vous encourageons à vérifier frequently cette page pour tout changement afin de rester informé sur la manière dont nous protégeons les informations que nous collectons." }
    },
    "terms": {
      "title": "Conditions d'utilisation",
      "welcome": "Veuillez lire attentivement ces Conditions d'utilisation avant d'utiliser le site Web OmeGod. Votre accès et votre utilisation du Service sont conditionnés par votre acceptation de ces Conditions.",
      "section1": { "title": "Conduite de l'utilisateur", "p1": "Vous acceptez de ne pas utiliser le Service pour des activités illégales, nuisibles, menaçantes, abusives, diffamatoires, obscènes ou autrement répréhensibles. Vous devez avoir 18 ans ou plus pour utiliser ce service." },
      "section2": { "title": "Propriété intellectuelle", "p1": "Le Service et son contenu original, ses caractéristiques et ses fonctionnalités sont et resteront la propriété exclusive d'OmeGod et de ses concédants de licence." },
      "section3": { "title": "Exclusion de garanties", "p1": "Le Service est fourni \"TEL QUEL\" et \"TEL QUE DISPONIBLE\". Nous ne garantissons pas que le Service répondra à vos exigences ou sera ininterrompu, sécurisé ou sans erreur." },
      "section4": { "title": "Limitation de responsabilité", "p1": "En aucun cas, OmeGod ne sera responsable des dommages indirects, accessoires, spéciaux, consécutifs ou punitifs résultant de votre utilisation du service." },
      "section5": { "title": "Droit applicable", "p1": "Ces Conditions seront régies et interprétées conformément aux lois du pays, sans égard à ses dispositions en matière de conflit de lois." }
    },
    "rules": {
      "title": "Règles de la communauté",
      "subtitle": "Suivez ces règles simples pour garantir un environnement sûr et respectueux pour tous.",
      "section1": { "title": "Soyez respectueux", "p1": "Traitez les autres comme vous aimeriez être traité. Le harcèlement, les discours de haine, les menaces ou toute forme d'intimidation ne seront pas tolérés." },
      "section2": { "title": "Pas d'activités illégales", "p1": "N'utilisez pas nos services pour mener ou promouvoir des activités illégales. Cela inclut le partage de contenu illégal." },
      "section3": { "title": "Pas de nudité ou de contenu sexuel", "p1": "OmeGod n'est pas une plateforme pour le contenu explicite. Toute nudité, pornographie ou comportement sexuellement suggestif entraînera un bannissement immédiat et permanent." },
      "section4": { "title": "Pas de spam ou d'auto-promotion", "p1": "Ne spammez pas les autres utilisateurs ou nos services avec des messages, des liens ou des promotions non sollicités pour d'autres services." },
      "section5": { "title": "Protégez votre vie privée", "p1": "Soyez prudent lorsque vous partagez des informations personnelles comme votre nom complet, votre adresse ou vos coordonnées financières avec des inconnus." }
    }
  }
};

const translationsAr = {
  "nav": {
    "home": "الرئيسية",
    "privacy": "سياسة الخصوصية",
    "terms": "شروط الخدمة",
    "rules": "القواعد"
  },
  "footer": {
    "copyright": "OmeGod. جميع الحقوق محفوظة."
  },
  "home": {
    "heroTitle": "تحدث إلى الغرباء",
    "heroTitleAccent": "فورًا.",
    "heroStats": [
      { "value": "+190", "label": "دولة" },
      { "value": "+1 مليون", "label": "مستخدم متصل" }
    ],
    "heroDescription": "تواصل مع أشخاص من جميع أنحاء العالم من خلال محادثات فيديو عفوية ومجهولة.",
    "getStarted": "ابدأ الدردشة",
    "interestsTitle": "عن ماذا تريد أن تتحدث؟",
    "addInterestPlaceholder": "أضف اهتمامك الخاص...",
    "noInterestsPlaceholder": "الاهتمامات المحددة ستظهر هنا.",
    "addButton": "إضافة",
    "interests": [
      { "label": "موسيقى", "emoji": "🎵" },
      { "label": "كرة القدم", "emoji": "⚽" },
      { "label": "أنمي", "emoji": "🎌" },
      { "label": "سفر", "emoji": "🌍" },
      { "label": "أفلام", "emoji": "🎬" },
      { "label": "ألعاب", "emoji": "🎮" },
      { "label": "فن", "emoji": "🎨" },
      { "label": "طعام", "emoji": "🍔" }
    ],
    "ticker": [
      "دردشة مجهولة", "فيديو عالي الدقة", "اتصالات فورية", "وصول عالمي", "آمن ومضمون", "استخدام مجاني"
    ],
    "servicesTitle": "لماذا OmeGod؟",
     "features": [
        {
            "icon": "ShieldCheck",
            "title": "فوري ومجهول",
            "description": "ادخل في محادثات على الفور دون الحاجة للتسجيل. هويتك محمية، مما يتيح لك أن تكون على طبيعتك."
        },
        {
            "icon": "VideoCamera",
            "title": "فيديو فائق الوضوح",
            "description": "استمتع ببث فيديو سلس وعالي الدقة يجعل محادثاتك تبدو شخصية وواقعية بشكل لا يصدق."
        },
        {
            "icon": "Globe",
            "title": "اتصالات عالمية",
            "description": "قابل أشخاصًا مثيرين للاهتمام من أكثر من 190 دولة بنقرة واحدة. وسّع آفاقك واكتشف ثقافات جديدة."
        }
    ],
    "learnMore": "اعرف المزيد",
    "metrics": [
      { "value": "+10 مليون", "label": "دردشة يومية" },
      { "value": "+190", "label": "دولة متصلة" },
      { "value": "24/7", "label": "مستخدمون نشطون" },
      { "value": "100%", "label": "منصة مجانية" }
    ],
    "faqTitle": "الأسئلة الشائعة",
    "faqSubtitle": "لديك أسئلة؟ لدينا إجابات.",
    "faqs": [
      { "question": "هل OmeGod مجاني؟", "answer": "نعم، OmeGod مجاني تمامًا. يمكنك بدء الدردشة مع الغرباء من جميع أنحاء العالم دون أي تكلفة أو رسوم اشتراك." },
      { "question": "هل أحتاج إلى إنشاء حساب؟", "answer": "لا، لست بحاجة إلى التسجيل. نحن نؤمن بالخصوصية والبساطة. يمكنك بدء دردشة مجهولة بنقرة واحدة فقط." },
      { "question": "كيف تضمنون سلامة المستخدمين؟", "answer": "لدينا نظام للإبلاغ عن المستخدمين الذين ينتهكون قواعدنا. يتم تطبيق إرشادات مجتمعنا بصرامة لإنشاء بيئة آمنة ومحترمة للجميع. يرجى الإبلاغ عن أي سلوك غير لائق على الفور." },
      { "question": "هل يعمل OmeGod على الأجهزة المحمولة؟", "answer": "بالتأكيد! OmeGod متجاوب تمامًا ويعمل بسلاسة على أجهزة الكمبيوتر المكتبية والأجهزة اللوحية والهواتف الذكية. كل ما تحتاجه هو متصفح حديث واتصال بالإنترنت." }
    ]
  },
  "chat": {
    "report": "إبلاغ",
    "next": "التالي",
    "stop": "إيقاف",
    "skipConfirm": "تخطي؟",
    "escKey": "Esc",
    "idleTitle": "هل أنت مستعد للدردشة؟",
    "idleSubtitle": "انقر على \"ابدأ\" للتواصل مع شخص جديد. تأكد من تمكين الكاميرا والميكروفون.",
    "start": "ابدأ",
    "searching": "جارٍ البحث عن غريب...",
    "cameraBlockedTitle": "تم حظر إذن الكاميرا والميكروفون",
    "cameraBlockedSubtitle": "قام متصفحك بحظر إذن الكاميرا. المتصفحات تمنع ظهور نافذة الإذن تلقائياً مرة أخرى بعد رفضها — يجب السماح بها من شريط عنوان المتصفح.",
    "unblockStep1": "اضغط على أيقونة القفل 🔒 أو إعدادات الموقع بجانب الرابط في شريط المتصفح بالأعلى.",
    "unblockStep2": "قم بتغيير الكاميرا والميكروفون إلى \"سماح\" (Allow).",
    "unblockStep3": "اضغط على \"إعادة تحميل الصفحة\" بالأسفل لتطبيق التعديل.",
    "reloadPage": "إعادة تحميل الصفحة",
    "continueTextOnly": "المتابعة في وضع الكتابة والصوت فقط",
    "howToUnblock": "طريقة فك الحظر في المتصفح",
    "checkingPermissions": "جارٍ الفحص...",
    "onlineUsers": "متصل الآن",
    "onlineNow": "متصل الآن",
    "tryAgain": "حاول مرة أخرى",
    "error": "خطأ",
    "errorEnableCamera": "يرجى تمكين الكاميرا لبدء الدردشة.",
    "errorNoCamera": "لم يتم العثور على كاميرا أو ميكروفون. يرجى التأكد من أن أجهزتك متصلة وغير مستخدمة من قبل تطبيق آخر.",
    "errorGeneric": "حدث خطأ أثناء الوصول إلى الكاميرا. يرجى التحقق من إعدادات جهازك أو متصفحك. ({{errorName}})",
    "errorUnknown": "حدث خطأ غير معروف أثناء محاولة الوصول إلى الكاميرا.",
    "messagePlaceholder": "اكتب رسالة...",
    "connectedSystemMessage": "أنت متصل الآن مع غريب.",
    "partnerLeft": "لقد قطع الغريب الاتصال.",
    "lookingForTags": "جارٍ البحث عن شخص يشاركك الاهتمامات: {{tags}} (أولوية الوسوم)",
    "commonInterestsFound": "🎉 كلاكما مهتم بـ: {{tags}}",
    "noCommonInterestsFound": "لم يتم العثور على شخص بنفس اهتماماتك حالياً، تم ربطك بمتصل عشوائي متاح.",
    "randomStrangerConnected": "أنت تتحدث الآن مع متصل عشوائي. قل مرحباً!",
    "strangerCountry": "المتصل من: {{country}}",
    "country": "الدولة",
    "priorityTagsActive": "أولوية الوسوم مفعلة ⚡",
    "myTags": "الوسوم المحددة:",
    "addTag": "+ إضافة وسم",
    "reportModalTitle": "الإبلاغ عن غريب",
    "reportModalSubtitle": "ساعدنا في الحفاظ على أمان المجتمع. يرجى تحديد سبب إبلاغك.",
    "reportReasons": [
      "فيديو غير لائق",
      "لغة مسيئة أو تهديدات",
      "بريد مزعج أو إعلانات",
      "مستخدم قاصر",
      "آخر"
    ],
    "cancel": "إلغاء",
    "submitReport": "إرسال البلاغ",
    "mutePartner": "كتم الصوت",
    "unmutePartner": "إلغاء كتم الصوت",
    "muteMicrophone": "كتم الميكروفون",
    "unmuteMicrophone": "إلغاء كتم الميكروفون",
    "strangerLabel": "الغريب",
    "youLabel": "أنت",
    "enlargeScreen": "الشاشة الكبيرة",
    "swapScreens": "تبديل الشاشة الكبيرة",
    "clickToEnlarge": "اضغط للتكبير",
    "strangerTyping": "الغريب يكتب الآن..."
  },
  "policyPages": {
    "lastUpdated": "آخر تحديث",
    "backToHome": "العودة إلى الرئيسية",
    "privacy": {
      "title": "سياسة الخصوصية",
      "welcome": "مرحبًا بك في OmeGod. نحن ملتزمون بحماية خصوصيتك. تشرح سياسة الخصوصية هذه المعلومات التي نجمعها وكيفية استخدامها وحقوقك فيما يتعلق بها.",
      "section1": { "title": "المعلومات التي نجمعها", "p1": "لا نطلب منك إنشاء حساب، لذلك نجمع الحد الأدنى من المعلومات الشخصية. قد نجمع بيانات غير شخصية مثل نوع المتصفح وتفضيل اللغة وعنوان IP للتحليلات وتحسين خدمتنا." },
      "section2": { "title": "كيف نستخدم المعلومات المجمعة", "p1": "يستخدم OmeGod البيانات المجمعة لتشغيل الخدمة وصيانتها، وفهم كيفية تفاعل المستخدمين مع المنصة، ولتعزيز الأمان وتجربة المستخدم." },
      "section3": { "title": "استخدام الكاميرا والميكروفون", "p1": "لتوفير خدمة الدردشة المرئية، نطلب الوصول إلى كاميرا وميكروفون جهازك. يكون هذا الوصول نشطًا فقط أثناء اتصالك بمستخدم آخر. نحن لا نسجل أو نخزن بث الكاميرا أو الميكروفون في أي وقت." },
      "section4": { "title": "أمن البيانات", "p1": "نعتمد ممارسات وإجراءات أمنية مناسبة لجمع البيانات وتخزينها ومعالجتها للحماية من الوصول غير المصرح به أو التغيير أو الكشف أو إتلاف بياناتك." },
      "section5": { "title": "تغييرات على سياسة الخصوصية هذه", "p1": "لدينا السلطة التقديرية لتحديث سياسة الخصوصية هذه في أي وقت. نشجع المستخدمين على مراجعة هذه الصفحة بشكل متكرر للاطلاع على أي تغييرات للبقاء على اطلاع بكيفية مساعدتنا في حماية المعلومات الشخصية التي نجمعها." }
    },
    "terms": {
      "title": "شروط الخدمة",
      "welcome": "يرجى قراءة شروط الخدمة هذه بعناية قبل استخدام موقع OmeGod. إن وصولك إلى الخدمة واستخدامها مشروط بقبولك لهذه الشروط والامتثال لها.",
      "section1": { "title": "سلوك المستخدم", "p1": "أنت توافق على عدم استخدام الخدمة للمشاركة في أي نشاط غير قانوني أو ضار أو مهدد أو مسيء أو تشهيري أو فاحش أو غير مقبول. يجب أن يكون عمرك 18 عامًا أو أكثر لاستخدام هذه الخدمة." },
      "section2": { "title": "الملكية الفكرية", "p1": "ستظل الخدمة ومحتواها الأصلي وميزاتها ووظائفها ملكية حصرية لـ OmeGod ومرخصيها." },
      "section3": { "title": "إخلاء المسؤولية عن الضمانات", "p1": "يتم توفير الخدمة \"كما هي\" و \"حسب توفرها\". لا نقدم أي ضمان بأن الخدمة ستلبي متطلباتك أو ستكون متاحة بشكل مستمر أو آمن أو خالية من الأخطاء." },
      "section4": { "title": "تحديد المسؤولية", "p1": "لن يكون OmeGod مسؤولاً بأي حال من الأحوال عن أي أضرار غير مباشرة أو عرضية أو خاصة أو تبعية أو عقابية ناتجة عن استخدامك للخدمة." },
      "section5": { "title": "القانون الحاكم", "p1": "تخضع هذه الشروط وتفسر وفقًا لقوانين البلد، بغض النظر عن تعارضها مع أحكام القانون." }
    },
    "rules": {
      "title": "قواعد المجتمع",
      "subtitle": "اتبع هذه القواعد البسيطة لضمان بيئة آمنة ومحترمة للجميع.",
      "section1": { "title": "كن محترمًا", "p1": "عامل الآخرين كما تحب أن تُعامل. لن يتم التسامح مع المضايقات أو خطاب الكراهية أو التهديدات أو أي شكل من أشكال التنمر." },
      "section2": { "title": "لا للأنشطة غير القانونية", "p1": "لا تستخدم خدماتنا للقيام أو الترويج لأي أنشطة غير قانونية. وهذا يشمل مشاركة المحتوى غير القانوني." },
      "section3": { "title": "لا للعري أو المحتوى الجنسي", "p1": "OmeGod ليست منصة للمحتوى الصريح. أي عري أو مواد إباحية أو سلوك موحٍ جنسيًا سيؤدي إلى حظر فوري ودائم." },
      "section4": { "title": "لا للبريد المزعج أو الترويج الذاتي", "p1": "لا تزعج المستخدمين الآخرين أو خدماتنا برسائل أو روابط أو عروض ترويجية غير مرغوب فيها لخدمات أخرى." },
      "section5": { "title": "احمِ خصوصيتك", "p1": "كن حذرًا بشأن مشاركة المعلومات الشخصية مثل اسمك الكامل أو عنوانك أو تفاصيلك المالية مع الغرباء." }
    }
  }
};

const translationsEs = {
  "nav": { "home": "Inicio", "privacy": "Política de Privacidad", "terms": "Términos de Servicio", "rules": "Reglas" },
  "footer": { "copyright": "OmeGod. Todos los derechos reservados." },
  "home": {
    "heroTitle": "Habla con Desconocidos", "heroTitleAccent": "Al Instante.",
    "heroStats": [{ "value": "190+", "label": "Países" }, { "value": "1M+", "label": "Usuarios en línea" }],
    "heroDescription": "Conéctate con personas de todo el mundo a través de conversaciones de video espontáneas y anónimas.",
    "getStarted": "Empezar a Chatear",
    "interestsTitle": "¿De qué quieres hablar?",
    "addInterestPlaceholder": "Añade tu propio interés...", "noInterestsPlaceholder": "Los intereses seleccionados aparecerán aquí.", "addButton": "Añadir",
    "interests": [
      { "label": "Música", "emoji": "🎵" }, { "label": "Fútbol", "emoji": "⚽" }, { "label": "Anime", "emoji": "🎌" },
      { "label": "Viajes", "emoji": "🌍" }, { "label": "Películas", "emoji": "🎬" }, { "label": "Juegos", "emoji": "🎮" },
      { "label": "Arte", "emoji": "🎨" }, { "label": "Comida", "emoji": "🍔" }
    ],
    "ticker": ["Chat Anónimo", "Video HD", "Conexiones Instantáneas", "Alcance Global", "Seguro y Protegido", "Gratis"],
    "servicesTitle": "¿Por qué OmeGod?",
    "features": [
      { "icon": "ShieldCheck", "title": "Instantáneo y Anónimo", "description": "Inicia conversaciones al instante sin necesidad de registrarte. Tu identidad está protegida, permitiéndote ser tú mismo." },
      { "icon": "VideoCamera", "title": "Video Nítido", "description": "Disfruta de transmisiones de video fluidas y de alta definición que hacen que tus conversaciones se sientan personales e increíblemente reales." },
      { "icon": "Globe", "title": "Conexiones Globales", "description": "Conoce a gente interesante de más de 190 países con un solo clic. Amplía tus horizontes y descubre nuevas culturas." }
    ],
    "learnMore": "Saber más",
    "metrics": [
      { "value": "10M+", "label": "Chats diarios" }, { "value": "190+", "label": "Países conectados" },
      { "value": "24/7", "label": "Usuarios activos" }, { "value": "100%", "label": "Plataforma gratuita" }
    ],
    "faqTitle": "Preguntas Frecuentes", "faqSubtitle": "¿Tienes preguntas? Tenemos respuestas.",
    "faqs": [
      { "question": "¿Es OmeGod gratuito?", "answer": "Sí, OmeGod es completamente gratis. Puedes empezar a chatear con desconocidos de todo el mundo sin ningún coste ni cuotas de suscripción." },
      { "question": "¿Necesito crear una cuenta?", "answer": "No, no necesitas registrarte. Creemos en la privacidad y la simplicidad. Puedes iniciar un chat de forma anónima con un solo clic." },
      { "question": "¿Cómo garantizan la seguridad del usuario?", "answer": "Tenemos un sistema de denuncias para los usuarios que violan nuestras reglas. Nuestras directrices comunitarias se aplican estrictamente para crear un entorno seguro y respetuoso para todos. Por favor, denuncia cualquier comportamiento inapropiado de inmediato." },
      { "question": "¿Funciona OmeGod en dispositivos móviles?", "answer": "¡Por supuesto! OmeGod es totalmente responsivo y funciona perfectamente en ordenadores, tabletas y smartphones. Todo lo que necesitas es un navegador moderno y una conexión a internet." }
    ]
  },
  "chat": {
    "report": "Denunciar", "next": "Siguiente", "stop": "Parar", "skipConfirm": "¿Saltar?", "escKey": "Esc",
    "idleTitle": "¿Listo para chatear?", "idleSubtitle": "Haz clic en \"Empezar\" para conectar con alguien nuevo. Asegúrate de que tu cámara y micrófono estén habilitados.", "start": "Empezar",
    "searching": "Buscando a un desconocido...",
    "cameraBlockedTitle": "Cámara bloqueada",
    "cameraBlockedSubtitle": "Permite el acceso a la cámara en la configuración de tu navegador para usar el chat de video.",
    "tryAgain": "Intentar de nuevo", "error": "Error", "errorEnableCamera": "Por favor, activa tu cámara para empezar a chatear.",
    "errorNoCamera": "No se encontró cámara ni micrófono. Asegúrate de que tus dispositivos estén conectados y no estén en uso por otra aplicación.",
    "errorGeneric": "Ocurrió un error al acceder a tu cámara. Por favor, comprueba la configuración de tu dispositivo o navegador. ({{errorName}})",
    "errorUnknown": "Ocurrió un error desconocido al intentar acceder a tu cámara.",
    "messagePlaceholder": "Escribe un mensaje...", "connectedSystemMessage": "Ahora estás conectado con un desconocido.",
    "partnerLeft": "El desconocido se ha desconectado.", "reportModalTitle": "Denunciar al desconocido",
    "reportModalSubtitle": "Ayúdanos a mantener la comunidad segura. Por favor, selecciona un motivo para tu denuncia.",
    "reportReasons": ["Video inapropiado", "Lenguaje abusivo o amenazas", "Spam o publicidad", "Usuario menor de edad", "Otro"],
    "cancel": "Cancelar", "submitReport": "Enviar denuncia", "mutePartner": "Silenciar", "unmutePartner": "Quitar silencio",
    "muteMicrophone": "Silenciar micrófono", "unmuteMicrophone": "Activar micrófono"
  },
  "policyPages": {
    "lastUpdated": "Última actualización", "backToHome": "Volver al Inicio",
    "privacy": {
      "title": "Política de Privacidad", "welcome": "Bienvenido a OmeGod. Nos comprometemos a proteger tu privacidad. Esta Política de Privacidad explica qué información recopilamos, cómo la usamos y tus derechos en relación con ella.",
      "section1": { "title": "Información que Recopilamos", "p1": "No requerimos que crees una cuenta, por lo que recopilamos información personal mínima. Podemos recopilar datos no personales como el tipo de navegador, la preferencia de idioma y la dirección IP para análisis y para mejorar nuestro servicio." },
      "section2": { "title": "Cómo Usamos la Información Recopilada", "p1": "OmeGod utiliza los datos recopilados para operar y mantener el servicio, entender cómo los usuarios interactúan con la plataforma y para mejorar la seguridad y la experiencia del usuario." },
      "section3": { "title": "Uso de la Cámara y el Micrófono", "p1": "Para proporcionar nuestro servicio de chat de video, requerimos acceso a la cámara y al micrófono de tu dispositivo. Este acceso solo está activo mientras estás conectado a otro usuario. No grabamos ni almacenamos tu transmisión de cámara o micrófono en ningún momento." },
      "section4": { "title": "Seguridad de los Datos", "p1": "Adoptamos prácticas de recopilación, almacenamiento y procesamiento de datos y medidas de seguridad adecuadas para proteger contra el acceso no autorizado, la alteración, la divulgación o la destrucción de tus datos." },
      "section5": { "title": "Cambios en esta Política de Privacidad", "p1": "Tenemos la discreción de actualizar esta política de privacidad en cualquier momento. Alentamos a los Usuarios a que consulten esta página con frecuencia para ver si hay cambios y para mantenerse informados sobre cómo estamos ayudando a proteger la información personal que recopilamos." }
    },
    "terms": {
      "title": "Términos de Servicio", "welcome": "Por favor, lee estos Términos de Servicio cuidadosamente antes de usar el sitio web de OmeGod. Tu acceso y uso del Servicio están condicionados a tu aceptación y cumplimiento de estos Términos.",
      "section1": { "title": "Conducta del Usuario", "p1": "Aceptas no usar el Servicio para participar en ninguna actividad que sea ilegal, dañina, amenazante, abusiva, difamatoria, vulgar, obscena o de cualquier otra manera objetable. Debes tener 18 años o más para usar este servicio." },
      "section2": { "title": "Propiedad Intelectual", "p1": "El Servicio y su contenido original, características y funcionalidad son y seguirán siendo propiedad exclusiva de OmeGod y sus licenciantes." },
      "section3": { "title": "Exclusión de Garantías", "p1": "El Servicio se proporciona \"TAL CUAL\" y \"SEGÚN DISPONIBILIDAD\". No garantizamos que el Servicio cumplirá tus requisitos o estará disponible de manera ininterrumpida, segura o libre de errores." },
      "section4": { "title": "Limitación de Responsabilidad", "p1": "En ningún caso OmeGod será responsable por daños indirectos, incidentales, especiales, consecuentes o punitivos que resulten de tu uso del servicio." },
      "section5": { "title": "Ley Aplicable", "p1": "Estos Términos se regirán e interpretarán de acuerdo con las leyes del país, sin tener en cuenta sus disposiciones sobre conflicto de leyes." }
    },
    "rules": {
      "title": "Reglas de la Comunidad", "subtitle": "Sigue estas simples reglas para asegurar un ambiente seguro y respetuoso para todos.",
      "section1": { "title": "Sé Respetuoso", "p1": "Trata a los demás como te gustaría que te trataran. No se tolerará el acoso, el discurso de odio, las amenazas ni ninguna forma de intimidación." },
      "section2": { "title": "No Actividades Ilegales", "p1": "No uses nuestros servicios para realizar o promover actividades ilegales. Esto incluye compartir contenido ilegal." },
      "section3": { "title": "No Desnudez ni Contenido Sexual", "p1": "OmeGod no es una plataforma para contenido explícito. Cualquier desnudez, pornografía o comportamiento sexualmente sugerente resultará en una prohibición inmediata y permanente." },
      "section4": { "title": "No Spam ni Autopromoción", "p1": "No envíes spam a otros usuarios ni a nuestros servicios con mensajes, enlaces o promociones no solicitadas para otros servicios." },
      "section5": { "title": "Protege tu Privacidad", "p1": "Ten cuidado al compartir información personal como tu nombre completo, dirección o detalles financieros con desconocidos." }
    }
  }
};

const translationsPt = {
  "nav": { "home": "Início", "privacy": "Política de Privacidade", "terms": "Termos de Serviço", "rules": "Regras" },
  "footer": { "copyright": "OmeGod. Todos os direitos reservados." },
  "home": {
    "heroTitle": "Fale com Estranhos", "heroTitleAccent": "Instantaneamente.",
    "heroStats": [{ "value": "190+", "label": "Países" }, { "value": "1M+", "label": "Usuários Online" }],
    "heroDescription": "Conecte-se com pessoas de todo o mundo através de conversas de vídeo espontâneas e anônimas.",
    "getStarted": "Começar a Conversar",
    "interestsTitle": "Sobre o que você quer conversar?",
    "addInterestPlaceholder": "Adicione seu próprio interesse...", "noInterestsPlaceholder": "Os interesses selecionados aparecerão aqui.", "addButton": "Adicionar",
    "interests": [
      { "label": "Música", "emoji": "🎵" }, { "label": "Futebol", "emoji": "⚽" }, { "label": "Anime", "emoji": "🎌" },
      { "label": "Viagem", "emoji": "🌍" }, { "label": "Filmes", "emoji": "🎬" }, { "label": "Jogos", "emoji": "🎮" },
      { "label": "Arte", "emoji": "🎨" }, { "label": "Comida", "emoji": "🍔" }
    ],
    "ticker": ["Chat Anônimo", "Vídeo HD", "Conexões Instantâneas", "Alcance Global", "Seguro e Protegido", "Grátis para Usar"],
    "servicesTitle": "Por que OmeGod?",
    "features": [
      { "icon": "ShieldCheck", "title": "Instantâneo e Anônimo", "description": "Entre em conversas instantaneamente sem necessidade de registro. Sua identidade é protegida, permitindo que você seja você mesmo." },
      { "icon": "VideoCamera", "title": "Vídeo Cristalino", "description": "Experimente transmissões de vídeo suaves e de alta definição que tornam suas conversas pessoais e incrivelmente reais." },
      { "icon": "Globe", "title": "Conexões Globais", "description": "Conheça pessoas interessantes de mais de 190 países com um único clique. Amplie seus horizontes e descubra novas culturas." }
    ],
    "learnMore": "Saiba Mais",
    "metrics": [
      { "value": "10M+", "label": "Conversas Diárias" }, { "value": "190+", "label": "Países Conectados" },
      { "value": "24/7", "label": "Usuários Ativos" }, { "value": "100%", "label": "Plataforma Gratuita" }
    ],
    "faqTitle": "Perguntas Frequentes", "faqSubtitle": "Tem perguntas? Nós temos as respostas.",
    "faqs": [
      { "question": "O OmeGod é gratuito?", "answer": "Sim, o OmeGod é completamente gratuito. Você pode começar a conversar com estranhos de todo o mundo sem nenhum custo ou taxas de assinatura." },
      { "question": "Preciso criar uma conta?", "answer": "Não, você não precisa se registrar. Acreditamos na privacidade e na simplicidade. Você pode iniciar uma conversa anonimamente com apenas um clique." },
      { "question": "Como vocês garantem a segurança do usuário?", "answer": "Temos um sistema de denúncias para usuários que violam nossas regras. Nossas diretrizes da comunidade são rigorosamente aplicadas para criar um ambiente seguro e respeitoso para todos. Por favor, denuncie qualquer comportamento inadequado imediatamente." },
      { "question": "O OmeGod funciona em dispositivos móveis?", "answer": "Com certeza! O OmeGod é totalmente responsivo e funciona perfeitamente em desktops, tablets e smartphones. Tudo que você precisa é um navegador moderno e uma conexão com a internet." }
    ]
  },
  "chat": {
    "report": "Denunciar", "next": "Próximo", "stop": "Parar", "skipConfirm": "Pular?", "escKey": "Esc",
    "idleTitle": "Pronto para conversar?", "idleSubtitle": "Clique em \"Começar\" para se conectar com alguém novo. Certifique-se de que sua câmera e microfone estão ativados.", "start": "Começar",
    "searching": "Procurando um estranho...",
    "cameraBlockedTitle": "Câmera Bloqueada",
    "cameraBlockedSubtitle": "Permita o acesso à câmera nas configurações do seu navegador para usar o chat de vídeo.",
    "tryAgain": "Tentar Novamente", "error": "Erro", "errorEnableCamera": "Por favor, ative sua câmera para começar a conversar.",
    "errorNoCamera": "Nenhuma câmera ou microfone encontrado. Certifique-se de que seus dispositivos estão conectados e não estão em uso por outro aplicativo.",
    "errorGeneric": "Ocorreu um erro ao acessar sua câmera. Verifique as configurações do seu dispositivo ou navegador. ({{errorName}})",
    "errorUnknown": "Ocorreu um erro desconhecido ao tentar acessar sua câmera.",
    "messagePlaceholder": "Digite uma mensagem...", "connectedSystemMessage": "Você agora está conectado com um estranho.",
    "partnerLeft": "O estranho se desconectou.", "reportModalTitle": "Denunciar Estranho",
    "reportModalSubtitle": "Ajude-nos a manter a comunidade segura. Selecione um motivo para sua denúncia.",
    "reportReasons": ["Vídeo inapropriado", "Linguagem abusiva ou ameaças", "Spam ou publicidade", "Usuário menor de idade", "Outro"],
    "cancel": "Cancelar", "submitReport": "Enviar Denúncia", "mutePartner": "Silenciar", "unmutePartner": "Ativar som",
    "muteMicrophone": "Silenciar microfone", "unmuteMicrophone": "Ativar microfone"
  },
  "policyPages": {
    "lastUpdated": "Última atualização", "backToHome": "Voltar para o Início",
    "privacy": {
      "title": "Política de Privacidade", "welcome": "Bem-vindo ao OmeGod. Estamos comprometidos em proteger sua privacidade. Esta Política de Privacidade explica quais informações coletamos, como as usamos e seus direitos em relação a elas.",
      "section1": { "title": "Informações que Coletamos", "p1": "Não exigimos que você crie uma conta, então coletamos informações pessoais mínimas. Podemos coletar dados não pessoais, como tipo de navegador, preferência de idioma e endereço IP para análises e para melhorar nosso serviço." },
      "section2": { "title": "Como Usamos as Informações Coletadas", "p1": "O OmeGod usa os dados coletados para operar e manter o serviço, entender como os usuários interagem com a plataforma e para aprimorar a segurança e a experiência do usuário." },
      "section3": { "title": "Uso de Câmera e Microfone", "p1": "Para fornecer nosso serviço de chat de vídeo, exigimos acesso à câmera e ao microfone do seu dispositivo. Este acesso só está ativo enquanto você está conectado a outro usuário. Não gravamos ou armazenamos sua transmissão de câmera ou microfone em nenhum momento." },
      "section4": { "title": "Segurança dos Dados", "p1": "Adotamos práticas adequadas de coleta, armazenamento e processamento de dados e medidas de segurança para proteger contra acesso não autorizado, alteração, divulgação ou destruição de seus dados." },
      "section5": { "title": "Alterações a esta Política de Privacidade", "p1": "Temos a critério de atualizar esta política de privacidade a qualquer momento. Incentivamos os usuários a verificar esta página com frequência para quaisquer alterações para se manterem informados sobre como estamos ajudando a proteger as informações pessoais que coletamos." }
    },
    "terms": {
      "title": "Termos de Serviço", "welcome": "Por favor, leia estes Termos de Serviço cuidadosamente antes de usar o site OmeGod. Seu acesso e uso do Serviço estão condicionados à sua aceitação e conformidade com estes Termos.",
      "section1": { "title": "Conduta do Usuário", "p1": "Você concorda em não usar o Serviço para se envolver em qualquer atividade que seja ilegal, prejudicial, ameaçadora, abusiva, difamatória, vulgar, obscena ou de outra forma questionável. Você deve ter 18 anos ou mais para usar este serviço." },
      "section2": { "title": "Propriedade Intelectual", "p1": "O Serviço e seu conteúdo original, recursos e funcionalidades são e permanecerão propriedade exclusiva da OmeGod e de seus licenciadores." },
      "section3": { "title": "Isenção de Garantias", "p1": "O Serviço é fornecido \"COMO ESTÁ\" e \"CONFORME DISPONÍVEL\". Não garantimos que o Serviço atenderá às suas necessidades ou estará disponível de forma ininterrupta, segura ou livre de erros." },
      "section4": { "title": "Limitação de Responsabilidade", "p1": "Em nenhum caso a OmeGod será responsável por quaisquer danos indiretos, incidentais, especiais, consequenciais ou punitivos resultantes do seu uso do serviço." },
      "section5": { "title": "Lei Aplicável", "p1": "Estes Termos serão regidos e interpretados de acordo com as leis do país, sem levar em conta suas disposições sobre conflitos de leis." }
    },
    "rules": {
      "title": "Regras da Comunidade", "subtitle": "Siga estas regras simples para garantir um ambiente seguro e respeitoso para todos.",
      "section1": { "title": "Seja Respeitoso", "p1": "Trate os outros como você gostaria de ser tratado. Assédio, discurso de ódio, ameaças ou qualquer forma de bullying não serão tolerados." },
      "section2": { "title": "Não a Atividades Ilegais", "p1": "Não use nossos serviços para conduzir ou promover quaisquer atividades ilegais. Isso inclui o compartilhamento de conteúdo ilegal." },
      "section3": { "title": "Não a Nudez ou Conteúdo Sexual", "p1": "O OmeGod não é uma plataforma para conteúdo explícito. Qualquer nudez, pornografia ou comportamento sexualmente sugestivo resultará em um banimento imediato e permanente." },
      "section4": { "title": "Não a Spam ou Autopromoção", "p1": "Não envie spam a outros usuários ou a nossos serviços com mensagens, links ou promoções não solicitadas para outros serviços." },
      "section5": { "title": "Proteja sua Privacidade", "p1": "Tenha cuidado ao compartilhar informações pessoais como seu nome completo, endereço ou detalhes financeiros com estranhos." }
    }
  }
};

const translationsDe = {
  "nav": { "home": "Startseite", "privacy": "Datenschutzrichtlinie", "terms": "Nutzungsbedingungen", "rules": "Regeln" },
  "footer": { "copyright": "OmeGod. Alle Rechte vorbehalten." },
  "home": {
    "heroTitle": "Sprich mit Fremden", "heroTitleAccent": "Sofort.",
    "heroStats": [{ "value": "190+", "label": "Länder" }, { "value": "1M+", "label": "Benutzer Online" }],
    "heroDescription": "Verbinde dich mit Menschen aus der ganzen Welt durch spontane, anonyme Video-Unterhaltungen.",
    "getStarted": "Chat starten",
    "interestsTitle": "Worüber möchtest du sprechen?",
    "addInterestPlaceholder": "Eigenes Interesse hinzufügen...", "noInterestsPlaceholder": "Ausgewählte Interessen erscheinen hier.", "addButton": "Hinzufügen",
    "interests": [
      { "label": "Musik", "emoji": "🎵" }, { "label": "Fußball", "emoji": "⚽" }, { "label": "Anime", "emoji": "🎌" },
      { "label": "Reisen", "emoji": "🌍" }, { "label": "Filme", "emoji": "🎬" }, { "label": "Gaming", "emoji": "🎮" },
      { "label": "Kunst", "emoji": "🎨" }, { "label": "Essen", "emoji": "🍔" }
    ],
    "ticker": ["Anonymer Chat", "HD-Video", "Sofortige Verbindungen", "Globale Reichweite", "Sicher & Geschützt", "Kostenlos"],
    "servicesTitle": "Warum OmeGod?",
    "features": [
      { "icon": "ShieldCheck", "title": "Sofort & Anonym", "description": "Steige sofort in Gespräche ein, ohne Registrierung. Deine Identität ist geschützt, sodass du du selbst sein kannst." },
      { "icon": "VideoCamera", "title": "Kristallklares Video", "description": "Erlebe flüssige HD-Videostreams, die deine Gespräche persönlich und unglaublich real wirken lassen." },
      { "icon": "Globe", "title": "Globale Verbindungen", "description": "Triff interessante Menschen aus über 190 Ländern mit einem einzigen Klick. Erweitere deinen Horizont und entdecke neue Kulturen." }
    ],
    "learnMore": "Mehr erfahren",
    "metrics": [
      { "value": "10M+", "label": "Tägliche Chats" }, { "value": "190+", "label": "Verbundene Länder" },
      { "value": "24/7", "label": "Aktive Benutzer" }, { "value": "100%", "label": "Kostenlose Plattform" }
    ],
    "faqTitle": "Häufig gestellte Fragen", "faqSubtitle": "Haben Sie Fragen? Wir haben Antworten.",
    "faqs": [
      { "question": "Ist OmeGod kostenlos?", "answer": "Ja, OmeGod ist völlig kostenlos. Du kannst ohne Kosten oder Abonnementgebühren mit Fremden aus der ganzen Welt chatten." },
      { "question": "Muss ich ein Konto erstellen?", "answer": "Nein, du musst dich nicht registrieren. Wir glauben an Privatsphäre und Einfachheit. Du kannst einen Chat anonym mit nur einem Klick starten." },
      { "question": "Wie gewährleisten Sie die Benutzersicherheit?", "answer": "Wir haben ein Meldesystem für Benutzer, die gegen unsere Regeln verstoßen. Unsere Community-Richtlinien werden strikt durchgesetzt, um eine sichere und respektvolle Umgebung für alle zu schaffen. Bitte melde unangemessenes Verhalten sofort." },
      { "question": "Funktioniert OmeGod auf mobilen Geräten?", "answer": "Absolut! OmeGod ist vollständig responsiv und funktioniert nahtlos auf Desktops, Tablets und Smartphones. Alles, was du brauchst, ist ein moderner Browser und eine Internetverbindung." }
    ]
  },
  "chat": {
    "report": "Melden", "next": "Weiter", "stop": "Stopp", "skipConfirm": "Überspringen?", "escKey": "Esc",
    "idleTitle": "Bereit zum Chatten?", "idleSubtitle": "Klicke auf \"Starten\", um dich mit jemand Neuem zu verbinden. Stelle sicher, dass deine Kamera und dein Mikrofon aktiviert sind.", "start": "Starten",
    "searching": "Suche nach einem Fremden...",
    "cameraBlockedTitle": "Kamera blockiert",
    "cameraBlockedSubtitle": "Erlaube den Kamerazugriff in den Website-Einstellungen deines Browsers, um den Video-Chat zu nutzen.",
    "tryAgain": "Erneut versuchen", "error": "Fehler", "errorEnableCamera": "Bitte aktiviere deine Kamera, um mit dem Chatten zu beginnen.",
    "errorNoCamera": "Keine Kamera oder Mikrofon gefunden. Bitte stelle sicher, dass deine Geräte angeschlossen sind und nicht von einer anderen Anwendung verwendet werden.",
    "errorGeneric": "Beim Zugriff auf deine Kamera ist ein Fehler aufgetreten. Bitte überprüfe deine Geräte- oder Browsereinstellungen. ({{errorName}})",
    "errorUnknown": "Beim Versuch, auf deine Kamera zuzugreifen, ist ein unbekannter Fehler aufgetreten.",
    "messagePlaceholder": "Nachricht eingeben...", "connectedSystemMessage": "Du bist jetzt mit einem Fremden verbunden.",
    "partnerLeft": "Der Fremde hat die Verbindung getrennt.", "reportModalTitle": "Fremden melden",
    "reportModalSubtitle": "Hilf uns, die Community sicher zu halten. Bitte wähle einen Grund für deine Meldung.",
    "reportReasons": ["Unangemessenes Video", "Beleidigende Sprache oder Drohungen", "Spam oder Werbung", "Minderjähriger Benutzer", "Anderes"],
    "cancel": "Abbrechen", "submitReport": "Meldung senden", "mutePartner": "Stummschalten", "unmutePartner": "Stummschaltung aufheben",
    "muteMicrophone": "Mikrofon stummschalten", "unmuteMicrophone": "Stummschaltung aufheben"
  },
  "policyPages": {
    "lastUpdated": "Zuletzt aktualisiert", "backToHome": "Zurück zur Startseite",
    "privacy": {
      "title": "Datenschutzrichtlinie", "welcome": "Willkommen bei OmeGod. Wir verpflichten uns, Ihre Privatsphäre zu schützen. Diese Datenschutzrichtlinie erklärt, welche Informationen wir sammeln, wie wir sie verwenden und welche Rechte Sie in Bezug darauf haben.",
      "section1": { "title": "Informationen, die wir sammeln", "p1": "Wir verlangen nicht, dass Sie ein Konto erstellen, daher sammeln wir nur minimale persönliche Informationen. Wir können nicht-persönliche Daten wie Browsertyp, Spracheinstellung und IP-Adresse für Analysen und zur Verbesserung unseres Dienstes sammeln." },
      "section2": { "title": "Wie wir gesammelte Informationen verwenden", "p1": "OmeGod verwendet die gesammelten Daten, um den Dienst zu betreiben und zu warten, zu verstehen, wie Benutzer mit der Plattform interagieren, und um die Sicherheit und das Benutzererlebnis zu verbessern." },
      "section3": { "title": "Verwendung von Kamera und Mikrofon", "p1": "Um unseren Video-Chat-Dienst bereitzustellen, benötigen wir Zugriff auf die Kamera und das Mikrofon Ihres Geräts. Dieser Zugriff ist nur aktiv, während Sie mit einem anderen Benutzer verbunden sind. Wir zeichnen Ihren Kamera- oder Mikrofon-Feed zu keiner Zeit auf oder speichern ihn." },
      "section4": { "title": "Datensicherheit", "p1": "Wir ergreifen geeignete Datenerhebungs-, Speicherungs- und Verarbeitungspraktiken sowie Sicherheitsmaßnahmen, um vor unbefugtem Zugriff, Änderung, Offenlegung oder Zerstörung Ihrer Daten zu schützen." },
      "section5": { "title": "Änderungen an dieser Datenschutzrichtlinie", "p1": "Wir behalten uns das Recht vor, diese Datenschutzrichtlinie jederzeit zu aktualisieren. Wir ermutigen Benutzer, diese Seite häufig auf Änderungen zu überprüfen, um darüber informiert zu bleiben, wie wir zum Schutz der von uns gesammelten persönlichen Informationen beitragen." }
    },
    "terms": {
      "title": "Nutzungsbedingungen", "welcome": "Bitte lesen Sie diese Nutzungsbedingungen sorgfältig durch, bevor Sie die OmeGod-Website nutzen. Ihr Zugriff auf und Ihre Nutzung des Dienstes unterliegt Ihrer Annahme und Einhaltung dieser Bedingungen.",
      "section1": { "title": "Benutzerverhalten", "p1": "Sie stimmen zu, den Dienst nicht für Aktivitäten zu nutzen, die illegal, schädlich, bedrohlich, missbräuchlich, belästigend, diffamierend, vulgär, obszön oder anderweitig anstößig sind. Sie müssen 18 Jahre oder älter sein, um diesen Dienst zu nutzen." },
      "section2": { "title": "Geistiges Eigentum", "p1": "Der Dienst und sein ursprünglicher Inhalt, seine Merkmale und seine Funktionalität sind und bleiben das alleinige Eigentum von OmeGod und seinen Lizenzgebern." },
      "section3": { "title": "Gewährleistungsausschluss", "p1": "Der Dienst wird auf einer \"WIE BESEHEN\"- und \"WIE VERFÜGBAR\"-Basis bereitgestellt. Wir geben keine Garantie, dass der Dienst Ihren Anforderungen entspricht oder ununterbrochen, sicher oder fehlerfrei verfügbar sein wird." },
      "section4": { "title": "Haftungsbeschränkung", "p1": "In keinem Fall haftet OmeGod für indirekte, zufällige, spezielle, Folge- oder Strafschäden, die sich aus Ihrer Nutzung des Dienstes ergeben." },
      "section5": { "title": "Geltendes Recht", "p1": "Diese Bedingungen unterliegen den Gesetzen des Landes und werden in Übereinstimmung mit diesen ausgelegt, ohne Rücksicht auf die Bestimmungen des Kollisionsrechts." }
    },
    "rules": {
      "title": "Community-Regeln", "subtitle": "Befolgen Sie diese einfachen Regeln, um eine sichere und respektvolle Umgebung für alle zu gewährleisten.",
      "section1": { "title": "Seien Sie respektvoll", "p1": "Behandeln Sie andere so, wie Sie behandelt werden möchten. Belästigung, Hassrede, Drohungen oder jede Form von Mobbing werden nicht toleriert." },
      "section2": { "title": "Keine illegalen Aktivitäten", "p1": "Nutzen Sie unsere Dienste nicht zur Durchführung oder Förderung illegaler Aktivitäten. Dies schließt die Weitergabe illegaler Inhalte ein." },
      "section3": { "title": "Keine Nacktheit oder sexuelle Inhalte", "p1": "OmeGod ist keine Plattform für explizite Inhalte. Jegliche Nacktheit, Pornografie oder sexuell anzügliches Verhalten führt zu einer sofortigen und dauerhaften Sperre." },
      "section4": { "title": "Kein Spam oder Eigenwerbung", "p1": "Spammen Sie andere Benutzer oder unsere Dienste nicht mit unerwünschten Nachrichten, Links oder Werbeaktionen für andere Dienste voll." },
      "section5": { "title": "Schützen Sie Ihre Privatsphäre", "p1": "Seien Sie vorsichtig bei der Weitergabe persönlicher Informationen wie Ihrem vollständigen Namen, Ihrer Adresse oder Ihren Finanzdaten an Fremde." }
    }
  }
};

const translationsHi = {
  "nav": { "home": "होम", "privacy": "गोपनीयता नीति", "terms": "सेवा की शर्तें", "rules": "नियम" },
  "footer": { "copyright": "ओमेगॉड। सर्वाधिकार सुरक्षित।" },
  "home": {
    "heroTitle": "अजनबियों से बात करें", "heroTitleAccent": "तुरंत।",
    "heroStats": [{ "value": "190+", "label": "देश" }, { "value": "1M+", "label": "उपयोगकर्ता ऑनलाइन" }],
    "heroDescription": "सहज, अनाम वीडियो वार्तालापों के माध्यम से दुनिया भर के लोगों से जुड़ें।",
    "getStarted": "चैटिंग शुरू करें",
    "interestsTitle": "आप किस बारे में बात करना चाहते हैं?",
    "addInterestPlaceholder": "अपनी रुचि जोड़ें...", "noInterestsPlaceholder": "चयनित रुचियाँ यहाँ दिखाई देंगी।", "addButton": "जोड़ें",
    "interests": [
      { "label": "संगीत", "emoji": "🎵" }, { "label": "फुटबॉल", "emoji": "⚽" }, { "label": "एनिमे", "emoji": "🎌" },
      { "label": "यात्रा", "emoji": "🌍" }, { "label": "फिल्में", "emoji": "🎬" }, { "label": "गेमिंग", "emoji": "🎮" },
      { "label": "कला", "emoji": "🎨" }, { "label": "भोजन", "emoji": "🍔" }
    ],
    "ticker": ["अनाम चैट", "एचडी वीडियो", "त्वरित कनेक्शन", "वैश्विक पहुंच", "सुरक्षित और संरक्षित", "मुफ्त उपयोग"],
    "servicesTitle": "ओमेगॉड क्यों?",
    "features": [
      { "icon": "ShieldCheck", "title": "त्वरित और अनाम", "description": "बिना पंजीकरण के तुरंत बातचीत में शामिल हों। आपकी पहचान सुरक्षित रहती है, जिससे आप स्वयं बन सकते हैं।" },
      { "icon": "VideoCamera", "title": "क्रिस्टल क्लियर वीडियो", "description": "सहज, हाई-डेफिनिशन वीडियो स्ट्रीम का अनुभव करें जो आपकी बातचीत को व्यक्तिगत और अविश्वसनीय रूप से वास्तविक बनाते हैं।" },
      { "icon": "Globe", "title": "वैश्विक कनेक्शन", "description": "एक क्लिक से 190 से अधिक देशों के दिलचस्प लोगों से मिलें। अपने क्षितिज का विस्तार करें और नई संस्कृतियों की खोज करें।" }
    ],
    "learnMore": "और जानें",
    "metrics": [
      { "value": "10M+", "label": "दैनिक चैट" }, { "value": "190+", "label": "जुड़े हुए देश" },
      { "value": "24/7", "label": "सक्रिय उपयोगकर्ता" }, { "value": "100%", "label": "मुफ्त प्लेटफॉर्म" }
    ],
    "faqTitle": "अक्सर पूछे जाने वाले प्रश्न", "faqSubtitle": "प्रश्न हैं? हमारे पास उत्तर हैं।",
    "faqs": [
      { "question": "क्या ओमेगॉड का उपयोग मुफ्त है?", "answer": "हाँ, ओमेगॉड पूरी तरह से मुफ्त है। आप बिना किसी लागत या सदस्यता शुल्क के दुनिया भर के अजनबियों के साथ चैट करना शुरू कर सकते हैं।" },
      { "question": "क्या मुझे एक खाता बनाने की आवश्यकता है?", "answer": "नहीं, आपको पंजीकरण करने की आवश्यकता नहीं है। हम गोपनीयता और सरलता में विश्वास करते हैं। आप केवल एक क्लिक से गुमनाम रूप से चैट शुरू कर सकते हैं।" },
      { "question": "आप उपयोगकर्ता सुरक्षा कैसे सुनिश्चित करते हैं?", "answer": "हमारे पास उन उपयोगकर्ताओं के लिए एक रिपोर्ट प्रणाली है जो हमारे नियमों का उल्लंघन करते हैं। हमारे सामुदायिक दिशानिर्देशों को सभी के लिए एक सुरक्षित और सम्मानजनक वातावरण बनाने के लिए सख्ती से लागू किया जाता है। कृपया किसी भी अनुचित व्यवहार की तुरंत रिपोर्ट करें।" },
      { "question": "क्या ओमेगॉड मोबाइल उपकरणों पर काम करता है?", "answer": "बिल्कुल! ओमेगॉड पूरी तरह से उत्तरदायी है और डेस्कटॉप, टैबलेट और स्मार्टफोन पर निर्बाध रूप से काम करता है। आपको बस एक आधुनिक ब्राउज़र और एक इंटरनेट कनेक्शन की आवश्यकता है।" }
    ]
  },
  "chat": {
    "report": "रिपोर्ट", "next": "अगला", "stop": "रोकें", "skipConfirm": "छोड़ें?", "escKey": "Esc",
    "idleTitle": "चैट के लिए तैयार हैं?", "idleSubtitle": "किसी नए व्यक्ति से जुड़ने के लिए \"शुरू करें\" पर क्लिक करें। सुनिश्चित करें कि आपका कैमरा और माइक्रोफ़ोन सक्षम हैं।", "start": "शुरू करें",
    "searching": "एक अजनबी को ढूंढ रहा है...",
    "cameraBlockedTitle": "कैमरा अवरुद्ध",
    "cameraBlockedSubtitle": "वीडियो चैट का उपयोग करने के लिए अपने ब्राउज़र की साइट सेटिंग्स में कैमरा एक्सेस की अनुमति दें।",
    "tryAgain": "पुनः प्रयास करें", "error": "त्रुटि", "errorEnableCamera": "कृपया चैटिंग शुरू करने के लिए अपना कैमरा सक्षम करें।",
    "errorNoCamera": "कोई कैमरा या माइक्रोफ़ोन नहीं मिला। कृपया सुनिश्चित करें कि आपके डिवाइस जुड़े हुए हैं और किसी अन्य एप्लिकेशन द्वारा उपयोग में नहीं हैं।",
    "errorGeneric": "आपके कैमरे तक पहुँचने के दौरान एक त्रुटि हुई। कृपया अपने डिवाइस या ब्राउज़र सेटिंग्स की जाँच करें। ({{errorName}})",
    "errorUnknown": "आपके कैमरे तक पहुँचने का प्रयास करते समय एक अज्ञात त्रुटि हुई।",
    "messagePlaceholder": "एक संदेश लिखें...", "connectedSystemMessage": "अब आप एक अजनबी से जुड़े हुए हैं।",
    "partnerLeft": "अजनबी ने डिस्कनेक्ट कर दिया है।", "reportModalTitle": "अजनबी की रिपोर्ट करें",
    "reportModalSubtitle": "समुदाय को सुरक्षित रखने में हमारी मदद करें। कृपया अपनी रिपोर्ट का कारण चुनें।",
    "reportReasons": ["अनुचित वीडियो", "अपमानजनक भाषा या धमकी", "स्पैम या विज्ञापन", "नाबालिग उपयोगकर्ता", "अन्य"],
    "cancel": "रद्द करें", "submitReport": "रिपोर्ट सबमिट करें", "mutePartner": "म्यूट", "unmutePartner": "अनम्यूट",
    "muteMicrophone": "माइक्रोफ़ोन म्यूट करें", "unmuteMicrophone": "माइक्रोफ़ोन अनम्यूट करें"
  },
  "policyPages": {
    "lastUpdated": "अंतिम अपडेट", "backToHome": "होम पर वापस जाएं",
    "privacy": {
      "title": "गोपनीयता नीति", "welcome": "ओमेगॉड में आपका स्वागत है। हम आपकी गोपनीयता की रक्षा के लिए प्रतिबद्ध हैं। यह गोपनीयता नीति बताती है कि हम कौन सी जानकारी एकत्र करते हैं, हम इसका उपयोग कैसे करते हैं, और इसके संबंध में आपके अधिकार।",
      "section1": { "title": "हम जो जानकारी एकत्र करते हैं", "p1": "हम आपको खाता बनाने की आवश्यकता नहीं रखते हैं, इसलिए हम न्यूनतम व्यक्तिगत जानकारी एकत्र करते हैं। हम विश्लेषण और हमारी सेवा में सुधार के लिए ब्राउज़र प्रकार, भाषा वरीयता, और आईपी पते जैसे गैर-व्यक्तिगत डेटा एकत्र कर सकते हैं।" },
      "section2": { "title": "हम एकत्रित जानकारी का उपयोग कैसे करते हैं", "p1": "ओमेगॉड एकत्रित डेटा का उपयोग सेवा को संचालित करने और बनाए रखने, यह समझने के लिए करता है कि उपयोगकर्ता प्लेटफ़ॉर्म के साथ कैसे इंटरैक्ट करते हैं, और सुरक्षा और उपयोगकर्ता अनुभव को बढ़ाने के लिए।" },
      "section3": { "title": "कैमरा और माइक्रोफ़ोन का उपयोग", "p1": "हमारी वीडियो चैट सेवा प्रदान करने के लिए, हमें आपके डिवाइस के कैमरे और माइक्रोफ़ोन तक पहुँच की आवश्यकता है। यह पहुँच केवल तब सक्रिय होती है जब आप किसी अन्य उपयोगकर्ता से जुड़े होते हैं। हम किसी भी समय आपके कैमरे या माइक्रोफ़ोन फ़ीड को रिकॉर्ड या संग्रहीत नहीं करते हैं।" },
      "section4": { "title": "डेटा सुरक्षा", "p1": "हम आपके डेटा के अनधिकृत पहुँच, परिवर्तन, प्रकटीकरण या विनाश से बचाने के लिए उपयुक्त डेटा संग्रह, भंडारण और प्रसंस्करण प्रथाओं और सुरक्षा उपायों को अपनाते हैं।" },
      "section5": { "title": "इस गोपनीयता नीति में परिवर्तन", "p1": "हमारे पास किसी भी समय इस गोपनीयता नीति को अपडेट करने का विवेक है। हम उपयोगकर्ताओं को इस पृष्ठ को अक्सर किसी भी परिवर्तन के लिए जाँचने के लिए प्रोत्साहित करते हैं ताकि वे यह जान सकें कि हम जो व्यक्तिगत जानकारी एकत्र करते हैं उसकी सुरक्षा में हम कैसे मदद कर रहे हैं।" }
    },
    "terms": {
      "title": "सेवा की शर्तें", "welcome": "ओमेगॉड वेबसाइट का उपयोग करने से पहले कृपया इन सेवा की शर्तों को ध्यान से पढ़ें। सेवा तक आपकी पहुँच और उपयोग इन शर्तों की आपकी स्वीकृति और अनुपालन पर सशर्त है।",
      "section1": { "title": "उपयोगकर्ता आचरण", "p1": "आप सेवा का उपयोग किसी भी ऐसी गतिविधि में शामिल होने के लिए नहीं करने के लिए सहमत हैं जो अवैध, हानिकारक, धमकी देने वाली, अपमानजनक, परेशान करने वाली, मानहानिकारक, अश्लील या अन्यथा आपत्तिजनक हो। इस सेवा का उपयोग करने के लिए आपकी आयु 18 वर्ष या उससे अधिक होनी चाहिए।" },
      "section2": { "title": "बौद्धिक संपदा", "p1": "सेवा और इसकी मूल सामग्री, सुविधाएँ और कार्यक्षमता ओमेगॉड और इसके लाइसेंसदाताओं की अनन्य संपत्ति हैं और रहेंगी।" },
      "section3": { "title": "वारंटियों का अस्वीकरण", "p1": "सेवा \"जैसा है\" और \"जैसा उपलब्ध है\" के आधार पर प्रदान की जाती है। हम कोई वारंटी नहीं देते हैं कि सेवा आपकी आवश्यकताओं को पूरा करेगी या एक निर्बाध, सुरक्षित, या त्रुटि-मुक्त आधार पर उपलब्ध होगी।" },
      "section4": { "title": "दायित्व की सीमा", "p1": "किसी भी स्थिति में ओमेगॉड सेवा के आपके उपयोग के परिणामस्वरूप होने वाले किसी भी अप्रत्यक्ष, आकस्मिक, विशेष, परिणामी या दंडात्मक नुकसान के लिए उत्तरदायी नहीं होगा।" },
      "section5": { "title": "शासकीय कानून", "p1": "ये शर्तें देश के कानूनों के अनुसार शासित और मानी जाएंगी, इसके कानून के प्रावधानों के टकराव के बिना।" }
    },
    "rules": {
      "title": "सामुदायिक नियम", "subtitle": "सभी के लिए एक सुरक्षित और सम्मानजनक वातावरण सुनिश्चित करने के लिए इन सरल नियमों का पालन करें।",
      "section1": { "title": "सम्मानपूर्ण बनें", "p1": "दूसरों के साथ वैसा ही व्यवहार करें जैसा आप अपने साथ चाहते हैं। उत्पीड़न, घृणास्पद भाषण, धमकी, या किसी भी प्रकार की बदमाशी बर्दाश्त नहीं की जाएगी।" },
      "section2": { "title": "कोई अवैध गतिविधियाँ नहीं", "p1": "किसी भी अवैध गतिविधियों का संचालन या प्रचार करने के लिए हमारी सेवाओं का उपयोग न करें। इसमें अवैध सामग्री साझा करना शामिल है।" },
      "section3": { "title": "कोई नग्नता या यौन सामग्री नहीं", "p1": "ओमेगॉड स्पष्ट सामग्री के लिए एक मंच नहीं है। कोई भी नग्नता, अश्लीलता, या यौन रूप से विचारोत्तेजक व्यवहार के परिणामस्वरूप तत्काल और स्थायी प्रतिबंध लगाया जाएगा।" },
      "section4": { "title": "कोई स्पैम या स्व-प्रचार नहीं", "p1": "अन्य उपयोगकर्ताओं या हमारी सेवाओं को अवांछित संदेशों, लिंक, या अन्य सेवाओं के लिए प्रचार के साथ स्पैम न करें।" },
      "section5": { "title": "अपनी गोपनीयता की रक्षा करें", "p1": "अजनबियों के साथ अपना पूरा नाम, पता, या वित्तीय विवरण जैसी व्यक्तिगत जानकारी साझा करने के बारे में सतर्क रहें।" }
    }
  }
};

const translationsRu = {
  "nav": { "home": "Главная", "privacy": "Политика конфиденциальности", "terms": "Условия использования", "rules": "Правила" },
  "footer": { "copyright": "OmeGod. Все права защищены." },
  "home": {
    "heroTitle": "Говорите с незнакомцами", "heroTitleAccent": "Мгновенно.",
    "heroStats": [{ "value": "190+", "label": "Стран" }, { "value": "1M+", "label": "Пользователей онлайн" }],
    "heroDescription": "Общайтесь с людьми со всего мира через спонтанные, анонимные видеочаты.",
    "getStarted": "Начать чат",
    "interestsTitle": "О чем вы хотите поговорить?",
    "addInterestPlaceholder": "Добавьте свой интерес...", "noInterestsPlaceholder": "Выбранные интересы появятся здесь.", "addButton": "Добавить",
    "interests": [
      { "label": "Музыка", "emoji": "🎵" }, { "label": "Футбол", "emoji": "⚽" }, { "label": "Аниме", "emoji": "🎌" },
      { "label": "Путешествия", "emoji": "🌍" }, { "label": "Фильмы", "emoji": "🎬" }, { "label": "Игры", "emoji": "🎮" },
      { "label": "Искусство", "emoji": "🎨" }, { "label": "Еда", "emoji": "🍔" }
    ],
    "ticker": ["Анонимный чат", "HD-видео", "Мгновенные соединения", "Глобальный охват", "Безопасно и надежно", "Бесплатно"],
    "servicesTitle": "Почему OmeGod?",
    "features": [
      { "icon": "ShieldCheck", "title": "Мгновенно и анонимно", "description": "Мгновенно начинайте разговоры без регистрации. Ваша личность защищена, что позволяет вам быть собой." },
      { "icon": "VideoCamera", "title": "Кристально чистое видео", "description": "Наслаждайтесь плавными видеопотоками высокой четкости, которые делают ваши разговоры личными и невероятно реальными." },
      { "icon": "Globe", "title": "Глобальные связи", "description": "Знакомьтесь с интересными людьми из более чем 190 стран одним щелчком мыши. Расширяйте свой кругозор и открывайте новые культуры." }
    ],
    "learnMore": "Узнать больше",
    "metrics": [
      { "value": "10M+", "label": "Ежедневных чатов" }, { "value": "190+", "label": "Подключенных стран" },
      { "value": "24/7", "label": "Активных пользователей" }, { "value": "100%", "label": "Бесплатная платформа" }
    ],
    "faqTitle": "Часто задаваемые вопросы", "faqSubtitle": "Есть вопросы? У нас есть ответы.",
    "faqs": [
      { "question": "OmeGod бесплатный?", "answer": "Да, OmeGod полностью бесплатный. Вы можете начать общаться с незнакомцами со всего мира без каких-либо затрат или абонентской платы." },
      { "question": "Нужно ли мне создавать аккаунт?", "answer": "Нет, вам не нужно регистрироваться. Мы верим в конфиденциальность и простоту. Вы можете начать чат анонимно всего одним щелчком мыши." },
      { "question": "Как вы обеспечиваете безопасность пользователей?", "answer": "У нас есть система жалоб для пользователей, которые нарушают наши правила. Наши правила сообщества строго соблюдаются для создания безопасной и уважительной среды для всех. Пожалуйста, немедленно сообщайте о любом неподобающем поведении." },
      { "question": "Работает ли OmeGod на мобильных устройствах?", "answer": "Абсолютно! OmeGod полностью адаптивен и без проблем работает на настольных компьютерах, планшетах и смартфонах. Все, что вам нужно, это современный браузер и подключение к Интернету." }
    ]
  },
  "chat": {
    "report": "Пожаловаться", "next": "Далее", "stop": "Стоп", "skipConfirm": "Пропустить?", "escKey": "Esc",
    "idleTitle": "Готовы общаться?", "idleSubtitle": "Нажмите \"Начать\", чтобы подключиться к новому собеседнику. Убедитесь, что ваша камера и микрофон включены.", "start": "Начать",
    "searching": "Поиск незнакомца...",
    "cameraBlockedTitle": "Камера заблокирована",
    "cameraBlockedSubtitle": "Разрешите доступ к камере в настройках вашего браузера, чтобы использовать видеочат.",
    "tryAgain": "Попробовать снова", "error": "Ошибка", "errorEnableCamera": "Пожалуйста, включите камеру, чтобы начать общение.",
    "errorNoCamera": "Камера или микрофон не найдены. Убедитесь, что ваши устройства подключены и не используются другим приложением.",
    "errorGeneric": "Произошла ошибка при доступе к вашей камере. Проверьте настройки вашего устройства или браузера. ({{errorName}})",
    "errorUnknown": "Произошла неизвестная ошибка при попытке доступа к вашей камере.",
    "messagePlaceholder": "Введите сообщение...", "connectedSystemMessage": "Вы подключились к незнакомцу.",
    "partnerLeft": "Незнакомец отключился.", "reportModalTitle": "Пожаловаться на незнакомца",
    "reportModalSubtitle": "Помогите нам обеспечить безопасность сообщества. Пожалуйста, выберите причину вашей жалобы.",
    "reportReasons": ["Неприемлемое видео", "Оскорбительный язык или угрозы", "Спам или реклама", "Несовершеннолетний пользователь", "Другое"],
    "cancel": "Отмена", "submitReport": "Отправить жалобу", "mutePartner": "Выключить звук", "unmutePartner": "Включить звук",
    "muteMicrophone": "Выключить микрофон", "unmuteMicrophone": "Включить микрофон"
  },
  "policyPages": {
    "lastUpdated": "Последнее обновление", "backToHome": "Вернуться на главную",
    "privacy": {
      "title": "Политика конфиденциальности", "welcome": "Добро пожаловать в OmeGod. Мы обязуемся защищать вашу конфиденциальность. Настоящая Политика конфиденциальности объясняет, какую информацию мы собираем, как мы ее используем, и ваши права в отношении нее.",
      "section1": { "title": "Собираемая нами информация", "p1": "Мы не требуем от вас создания учетной записи, поэтому мы собираем минимальную личную информацию. Мы можем собирать неличные данные, такие как тип браузера, языковые предпочтения и IP-адрес для аналитики и улучшения нашего сервиса." },
      "section2": { "title": "Как мы используем собранную информацию", "p1": "OmeGod использует собранные данные для работы и поддержки сервиса, понимания того, как пользователи взаимодействуют с платформой, а также для повышения безопасности и удобства использования." },
      "section3": { "title": "Использование камеры и микрофона", "p1": "Для предоставления нашего сервиса видеочата нам требуется доступ к камере и микрофону вашего устройства. Этот доступ активен только во время вашего подключения к другому пользователю. Мы никогда не записываем и не храним ваш видео- или аудиопоток." },
      "section4": { "title": "Безопасность данных", "p1": "Мы принимаем соответствующие меры по сбору, хранению и обработке данных, а также меры безопасности для защиты от несанкционированного доступа, изменения, раскрытия или уничтожения ваших данных." },
      "section5": { "title": "Изменения в настоящей Политике конфиденциальности", "p1": "Мы оставляем за собой право обновлять эту политику конфиденциальности в любое время. Мы призываем Пользователей часто проверять эту страницу на предмет изменений, чтобы быть в курсе того, как мы помогаем защищать собираемую нами личную информацию." }
    },
    "terms": {
      "title": "Условия использования", "welcome": "Пожалуйста, внимательно прочтите настоящие Условия использования перед использованием веб-сайта OmeGod. Ваш доступ к Сервису и его использование зависят от вашего принятия и соблюдения настоящих Условий.",
      "section1": { "title": "Поведение пользователя", "p1": "Вы соглашаетесь не использовать Сервис для участия в какой-либо деятельности, которая является незаконной, вредоносной, угрожающей, оскорбительной, клеветнической, вульгарной, непристойной или иным образом нежелательной. Вам должно быть 18 лет или больше, чтобы использовать этот сервис." },
      "section2": { "title": "Интеллектуальная собственность", "p1": "Сервис и его оригинальный контент, функции и функциональность являются и останутся исключительной собственностью OmeGod и его лицензиаров." },
      "section3": { "title": "Отказ от гарантий", "p1": "Сервис предоставляется на условиях \"КАК ЕСТЬ\" и \"КАК ДОСТУПНО\". Мы не даем никаких гарантий, что Сервис будет соответствовать вашим требованиям или будет доступен бесперебойно, безопасно или без ошибок." },
      "section4": { "title": "Ограничение ответственности", "p1": "Ни при каких обстоятельствах OmeGod не несет ответственности за любые косвенные, случайные, специальные, побочные или штрафные убытки, возникшие в результате использования вами сервиса." },
      "section5": { "title": "Применимое право", "p1": "Настоящие Условия регулируются и толкуются в соответствии с законодательством страны, без учета его положений о коллизии законов." }
    },
    "rules": {
      "title": "Правила сообщества", "subtitle": "Соблюдайте эти простые правила, чтобы обеспечить безопасную и уважительную среду для всех.",
      "section1": { "title": "Будьте уважительны", "p1": "Относитесь к другим так, как вы хотели бы, чтобы относились к вам. Преследования, разжигание ненависти, угрозы или любые формы издевательств не допускаются." },
      "section2": { "title": "Никаких незаконных действий", "p1": "Не используйте наши сервисы для проведения или поощрения любых незаконных действий. Это включает в себя распространение незаконного контента." },
      "section3": { "title": "Никакой наготы или сексуального контента", "p1": "OmeGod не является платформой для откровенного контента. Любая нагота, порнография или сексуально откровенное поведение приведет к немедленному и постоянному бану." },
      "section4": { "title": "Никакого спама или саморекламы", "p1": "Не рассылайте спам другим пользователям или нашим сервисам с нежелательными сообщениями, ссылками или рекламой других сервисов." },
      "section5": { "title": "Защищайте свою конфиденциальность", "p1": "Будьте осторожны при передаче личной информации, такой как ваше полное имя, адрес или финансовые данные, незнакомцам." }
    }
  }
};

i18next
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationsEn },
      fr: { translation: translationsFr },
      ar: { translation: translationsAr },
      es: { translation: translationsEs },
      pt: { translation: translationsPt },
      de: { translation: translationsDe },
      hi: { translation: translationsHi },
      ru: { translation: translationsRu },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;