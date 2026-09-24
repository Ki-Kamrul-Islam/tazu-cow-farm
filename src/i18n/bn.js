export const bn = {
    app: {
        title: "🐄 Tazu Cow Farm",
        setupSuccess: "Setup সফল হয়েছে",
    },
    common: {
        darkMode: "🌙 ডার্ক মোড",
        lightMode: "☀️ লাইট মোড",
        language: "ভাষা",
        loading: "লোড হচ্ছে...",
        previous: "আগের",
        next: "পরের",
        comingSoon: "এই module পরের কোনো Phase-এ তৈরি হবে।",
        pageOf: "পাতা {current} / {total}",
        all: "সব",
    },
    errorState: {
        title: "কিছু একটা সমস্যা হয়েছে",
        description: "দয়া করে আবার চেষ্টা করুন।",
        retry: "আবার চেষ্টা করুন",
    },
    confirmDialog: {
        title: "নিশ্চিত করুন",
        confirmLabel: "নিশ্চিত করুন",
        cancelLabel: "বাতিল",
    },
    nav: {
        dashboard: "ড্যাশবোর্ড",
        herd: "গরুর পাল",
        production: "উৎপাদন ও বিক্রয়",
        feed: "খাদ্য",
        land: "জমি ও ফসল",
        inventory: "ইনভেন্টরি",
        equipment: "যন্ত্রপাতি",
        finance: "হিসাব",
        team: "কর্মী ও কাজ",
        reports: "রিপোর্ট",
        calendar: "ক্যালেন্ডার",
        farmOperations: "খামার কার্যক্রম",
        system: "সিস্টেম",
    },
    dashboard: {
        subtitle: "আপনার খামারের আজকের অবস্থা এক নজরে",
        units: {
            currency: "৳",
            liters: "লিটার",
        },
        stats: {
            totalCows: "মোট গরু",
            totalCalves: "মোট বাছুর",
            milkToday: "আজকের দুধ",
            milkThisMonth: "এই মাসের দুধ",
            todayRevenue: "আজকের আয়",
            todayExpense: "আজকের খরচ",
            netProfitToday: "আজকের নিট মুনাফা",
            feedStock: "খাদ্য মজুদ",
            medicineStock: "ওষুধ মজুদ",
            pregnantCows: "গর্ভবতী গরু",
            expectedCalving: "শীঘ্রই বাচ্চা প্রসব (৩০ দিনে)",
            vaccinationDue: "টিকা বাকি (৭ দিনে)",
            tasksToday: "আজকের কাজ",
        },
        charts: {
            milkTrendTitle: "দুধ উৎপাদন ট্রেন্ড",
            revenueExpenseTitle: "আয় বনাম খরচ",
            emptyTitle: "এখনো কোনো ডেটা নেই",
            emptyDescription:
                "Herd ও Production module তৈরি হলে এখানে real chart দেখা যাবে।",
        },
    },
    herd: {
        fields: {
            animalId: "Animal ID",
            name: "নাম",
            type: "ধরন",
            age: "বয়স",
            breed: "জাত",
            gender: "লিঙ্গ",
            dateOfBirth: "জন্ম তারিখ",
            weight: "ওজন (কেজি)",
            group: "গ্রুপ",
            status: "অবস্থা",
            notes: "নোট",
            actions: "কার্যক্রম",
        },
        tabs: {
            animals: "গরু-বাছুর",
            breeding: "প্রজনন",
            health: "স্বাস্থ্য",
            weight: "ওজন",
            scoring: "স্কোরিং",
            groups: "গ্রুপ",
            transfers: "স্থানান্তর",
        },
        units: {
            years: "বছর",
            months: "মাস",
            kg: "কেজি",
        },
        animalType: {
            cow: "গাভী",
            bull: "ষাঁড়",
            heifer: "বকনা",
            calf: "বাছুর",
        },
        gender: {
            male: "পুরুষ",
            female: "মহিলা",
        },
        status: {
            active: "সক্রিয়",
            sold: "বিক্রিত",
            deceased: "মৃত",
            archived: "আর্কাইভড",
        },
        actions: {
            addAnimal: "গরু যোগ করুন",
            edit: "সম্পাদনা",
            delete: "মুছুন",
            save: "সংরক্ষণ করুন",
            cancel: "বাতিল",
        },
        list: {
            description: "আপনার খামারের সব গরু/বাছুরের তালিকা",
            searchPlaceholder: "Animal ID, নাম বা জাত দিয়ে খুঁজুন",
            emptyTitle: "এখনো কোনো গরু যোগ করা হয়নি",
            emptyDescription: "প্রথম গরুটি যোগ করে শুরু করুন।",
            noResults:
                "কোনো ফলাফল পাওয়া যায়নি। Search বা Filter পরিবর্তন করে দেখুন।",
        },
        form: {
            addTitle: "নতুন গরু যোগ করুন",
            editTitle: "গরুর তথ্য সম্পাদনা",
            description: "সব বাধ্যতামূলক তথ্য পূরণ করুন",
            noGroup: "কোনো গ্রুপ নেই",
        },
        toast: {
            created: "গরু সফলভাবে যোগ হয়েছে",
            updated: "তথ্য সফলভাবে আপডেট হয়েছে",
        },
        deleteDialog: {
            title: "গরু মুছে ফেলবেন?",
            message: "এই কাজটি ফিরিয়ে নেওয়া যাবে না। আপনি কি নিশ্চিত?",
        },
        validation: {
            animalIdRequired: "Animal ID আবশ্যক",
            animalIdDuplicate: "এই Animal ID ইতিমধ্যে ব্যবহৃত হয়েছে",
            nameRequired: "নাম আবশ্যক",
            typeRequired: "ধরন নির্বাচন করুন",
            genderRequired: "লিঙ্গ নির্বাচন করুন",
            dateInvalid: "সঠিক তারিখ দিন",
            dateFuture: "ভবিষ্যতের তারিখ দেওয়া যাবে না",
            weightPositive: "ওজন ০-এর বেশি হতে হবে",
        },
    },
    breeding: {
        fields: {
            animal: "গরু",
            breedingDate: "প্রজনন তারিখ",
            method: "পদ্ধতি",
            sireInfo: "ষাঁড়/সিমেন তথ্য",
            status: "অবস্থা",
            pregnancyDiagnosisDate: "গর্ভ পরীক্ষার তারিখ",
            expectedCalvingDate: "সম্ভাব্য বাচ্চা প্রসবের তারিখ",
            actualCalvingDate: "প্রকৃত বাচ্চা প্রসবের তারিখ",
            notes: "নোট",
        },
        method: {
            ai: "কৃত্রিম প্রজনন (AI)",
            natural: "স্বাভাবিক",
        },
        status: {
            open: "খোলা",
            bred: "প্রজনন করানো হয়েছে",
            pregnant: "গর্ভবতী",
            calved: "বাচ্চা প্রসব হয়েছে",
            aborted: "গর্ভপাত",
        },
        actions: {
            addRecord: "রেকর্ড যোগ করুন",
        },
        list: {
            description: "সব প্রজনন রেকর্ডের তালিকা",
            emptyTitle: "এখনো কোনো প্রজনন রেকর্ড নেই",
            emptyDescription: "প্রথম রেকর্ডটি যোগ করে শুরু করুন।",
        },
        form: {
            addTitle: "নতুন প্রজনন রেকর্ড",
            editTitle: "প্রজনন রেকর্ড সম্পাদনা",
            description: "গরু নির্বাচন করে প্রয়োজনীয় তথ্য দিন",
            selectAnimal: "গরু নির্বাচন করুন",
        },
        toast: {
            created: "রেকর্ড সফলভাবে যোগ হয়েছে",
            updated: "রেকর্ড সফলভাবে আপডেট হয়েছে",
        },
        deleteDialog: {
            title: "রেকর্ড মুছে ফেলবেন?",
            message: "এই কাজটি ফিরিয়ে নেওয়া যাবে না। আপনি কি নিশ্চিত?",
        },
        validation: {
            animalRequired: "গরু নির্বাচন করুন",
            breedingDateRequired: "প্রজনন তারিখ আবশ্যক",
            dateFuture: "ভবিষ্যতের তারিখ দেওয়া যাবে না",
            methodRequired: "পদ্ধতি নির্বাচন করুন",
            calvingDateRequired: "বাচ্চা প্রসবের প্রকৃত তারিখ দিন",
        },
    },
    health: {
        fields: {
            animal: "গরু",
            type: "ধরন",
            date: "তারিখ",
            diseaseOrReason: "রোগ / কারণ",
            medicine: "ওষুধ",
            dosage: "মাত্রা",
            vetName: "ডাক্তারের নাম",
            cost: "খরচ",
            nextDueDate: "পরবর্তী তারিখ",
            notes: "নোট",
        },
        type: {
            vaccination: "টিকা",
            deworming: "কৃমিনাশক",
            treatment: "চিকিৎসা",
            checkup: "চেকআপ",
        },
        actions: {
            addRecord: "রেকর্ড যোগ করুন",
        },
        list: {
            description: "সব স্বাস্থ্য রেকর্ডের তালিকা",
            emptyTitle: "এখনো কোনো স্বাস্থ্য রেকর্ড নেই",
            emptyDescription: "প্রথম রেকর্ডটি যোগ করে শুরু করুন।",
        },
        form: {
            addTitle: "নতুন স্বাস্থ্য রেকর্ড",
            editTitle: "স্বাস্থ্য রেকর্ড সম্পাদনা",
            description: "গরু নির্বাচন করে প্রয়োজনীয় তথ্য দিন",
            selectAnimal: "গরু নির্বাচন করুন",
        },
        toast: {
            created: "রেকর্ড সফলভাবে যোগ হয়েছে",
            updated: "রেকর্ড সফলভাবে আপডেট হয়েছে",
        },
        deleteDialog: {
            title: "রেকর্ড মুছে ফেলবেন?",
            message: "এই কাজটি ফিরিয়ে নেওয়া যাবে না। আপনি কি নিশ্চিত?",
        },
        validation: {
            animalRequired: "গরু নির্বাচন করুন",
            typeRequired: "ধরন নির্বাচন করুন",
            dateRequired: "তারিখ আবশ্যক",
            dateFuture: "ভবিষ্যতের তারিখ দেওয়া যাবে না",
            costPositive: "খরচ ঋণাত্মক হতে পারবে না",
        },
    },
    weight: {
        fields: {
            animal: "গরু",
            date: "তারিখ",
            weight: "ওজন",
            notes: "নোট",
        },
        stats: {
            adg: "গড় দৈনিক ওজন বৃদ্ধি (ADG)",
        },
        units: {
            kgPerDay: "কেজি/দিন",
        },
        actions: {
            addWeight: "ওজন যোগ করুন",
        },
        list: {
            description: "সব ওজন রেকর্ড",
            filterByAnimal: "গরু নির্বাচন করুন",
            emptyTitle: "এখনো কোনো ওজন রেকর্ড নেই",
            emptyDescription: "প্রথম ওজন যোগ করে শুরু করুন।",
        },
        form: {
            addTitle: "ওজন যোগ করুন",
            editTitle: "ওজন সম্পাদনা",
            description: "গরু নির্বাচন করে ওজন ও তারিখ দিন",
            selectAnimal: "গরু নির্বাচন করুন",
        },
        toast: {
            created: "ওজন সফলভাবে যোগ হয়েছে",
            updated: "ওজন সফলভাবে আপডেট হয়েছে",
        },
        deleteDialog: {
            title: "রেকর্ড মুছে ফেলবেন?",
            message: "এই কাজটি ফিরিয়ে নেওয়া যাবে না। আপনি কি নিশ্চিত?",
        },
        validation: {
            animalRequired: "গরু নির্বাচন করুন",
            dateRequired: "তারিখ আবশ্যক",
            dateFuture: "ভবিষ্যতের তারিখ দেওয়া যাবে না",
            weightPositive: "ওজন ০-এর বেশি হতে হবে",
        },
    },
    scoring: {
        fields: {
            animal: "গরু",
            date: "তারিখ",
            bodyConditionScore: "Body Condition Score",
            udderScore: "Udder Score",
            mobilityScore: "Mobility Score",
            overallScore: "সার্বিক স্কোর",
            notes: "নোট",
        },
        actions: {
            addScore: "স্কোর যোগ করুন",
        },
        list: {
            description: "সব স্কোরিং রেকর্ড",
            filterByAnimal: "গরু নির্বাচন করুন",
            emptyTitle: "এখনো কোনো স্কোর যোগ করা হয়নি",
            emptyDescription: "প্রথম স্কোরটি যোগ করে শুরু করুন।",
        },
        form: {
            addTitle: "স্কোর যোগ করুন",
            editTitle: "স্কোর সম্পাদনা",
            description: "গরু নির্বাচন করে কমপক্ষে একটা স্কোর দিন",
            selectAnimal: "গরু নির্বাচন করুন",
        },
        toast: {
            created: "স্কোর সফলভাবে যোগ হয়েছে",
            updated: "স্কোর সফলভাবে আপডেট হয়েছে",
        },
        deleteDialog: {
            title: "রেকর্ড মুছে ফেলবেন?",
            message: "এই কাজটি ফিরিয়ে নেওয়া যাবে না। আপনি কি নিশ্চিত?",
        },
        validation: {
            animalRequired: "গরু নির্বাচন করুন",
            dateRequired: "তারিখ আবশ্যক",
            dateFuture: "ভবিষ্যতের তারিখ দেওয়া যাবে না",
            atLeastOneScore: "কমপক্ষে একটা স্কোর দিন",
        },
    },
    production: {
        tabs: {
            milk: "দুধ",
            customers: "কাস্টমার",
            sales: "বিক্রয়",
        },
    },
    milk: {
        fields: {
            animal: "গরু",
            date: "তারিখ",
            session: "সেশন",
            quantity: "দুধের পরিমাণ (লিটার)",
            notes: "নোট",
        },
        session: { morning: "সকাল", evening: "বিকাল" },
        units: { liters: "লিটার" },
        stats: {
            today: "আজকের মোট দুধ",
            filtered: "নির্বাচিত ফলাফলের মোট",
        },
        actions: { addMilk: "দুধ উৎপাদন যোগ করুন" },
        list: {
            description: "প্রতিদিনের দুধ উৎপাদনের সব রেকর্ড",
            filterByAnimal: "গরু নির্বাচন করুন",
            emptyTitle: "এখনো কোনো দুধ রেকর্ড নেই",
            emptyDescription: "প্রথম রেকর্ডটি যোগ করে শুরু করুন।",
        },
        form: {
            addTitle: "দুধ উৎপাদন যোগ করুন",
            editTitle: "দুধ রেকর্ড সম্পাদনা",
            description: "গরু নির্বাচন করে দুধের তথ্য দিন",
            selectAnimal: "গরু নির্বাচন করুন",
        },
        toast: {
            created: "দুধ রেকর্ড সফলভাবে যোগ হয়েছে",
            updated: "দুধ রেকর্ড সফলভাবে আপডেট হয়েছে",
        },
        deleteDialog: {
            title: "রেকর্ড মুছে ফেলবেন?",
            message: "এই কাজটি ফিরিয়ে নেওয়া যাবে না। আপনি কি নিশ্চিত?",
        },
        validation: {
            animalRequired: "গরু নির্বাচন করুন",
            dateRequired: "তারিখ আবশ্যক",
            dateFuture: "ভবিষ্যতের তারিখ দেওয়া যাবে না",
            sessionRequired: "সেশন নির্বাচন করুন",
            quantityPositive: "দুধের পরিমাণ ০-এর বেশি হতে হবে",
        },
    },
    customers: {
        fields: {
            name: "নাম",
            phone: "ফোন নম্বর",
            address: "ঠিকানা",
            status: "অবস্থা",
            notes: "নোট",
        },
        status: { active: "সক্রিয়", inactive: "নিষ্ক্রিয়" },
        actions: { addCustomer: "কাস্টমার যোগ করুন" },
        list: {
            description: "আপনার খামারের সব কাস্টমারের তালিকা",
            searchPlaceholder: "নাম বা ফোন নম্বর দিয়ে খুঁজুন",
            emptyTitle: "এখনো কোনো কাস্টমার যোগ করা হয়নি",
            emptyDescription: "প্রথম কাস্টমারটি যোগ করে শুরু করুন।",
        },
        form: {
            addTitle: "নতুন কাস্টমার যোগ করুন",
            editTitle: "কাস্টমারের তথ্য সম্পাদনা",
            description: "সব বাধ্যতামূলক তথ্য পূরণ করুন",
        },
        toast: {
            created: "কাস্টমার সফলভাবে যোগ হয়েছে",
            updated: "তথ্য সফলভাবে আপডেট হয়েছে",
        },
        deleteDialog: {
            title: "কাস্টমার মুছে ফেলবেন?",
            message: "এই কাজটি ফিরিয়ে নেওয়া যাবে না। আপনি কি নিশ্চিত?",
        },
        validation: {
            nameRequired: "নাম আবশ্যক",
            phoneRequired: "ফোন নম্বর আবশ্যক",
            phoneDuplicate: "এই ফোন নম্বর ইতিমধ্যে ব্যবহৃত হয়েছে",
        },
    },
    sales: {
        fields: {
            customer: "কাস্টমার",
            date: "তারিখ",
            quantity: "পরিমাণ",
            pricePerLiter: "মূল্য / লিটার",
            totalAmount: "মোট টাকা",
            paidAmount: "পরিশোধিত টাকা",
            dueAmount: "বাকি টাকা",
            status: "অবস্থা",
            notes: "নোট",
        },
        status: { paid: "পরিশোধিত", partial: "আংশিক", due: "বাকি" },
        stats: {
            todayRevenue: "আজকের আয়",
            totalDue: "মোট বকেয়া",
        },
        actions: { addSale: "বিক্রয় যোগ করুন" },
        list: {
            description: "সব দুধ বিক্রয়/চালানের তালিকা",
            filterByCustomer: "কাস্টমার নির্বাচন করুন",
            emptyTitle: "এখনো কোনো বিক্রয় নেই",
            emptyDescription: "প্রথম বিক্রয়টি যোগ করে শুরু করুন।",
        },
        form: {
            addTitle: "বিক্রয় যোগ করুন",
            editTitle: "বিক্রয় সম্পাদনা",
            description: "কাস্টমার নির্বাচন করে বিক্রয়ের তথ্য দিন",
            selectCustomer: "কাস্টমার নির্বাচন করুন",
            estimatedTotal: "আনুমানিক মোট",
        },
        toast: {
            created: "বিক্রয় সফলভাবে যোগ হয়েছে",
            updated: "বিক্রয় সফলভাবে আপডেট হয়েছে",
        },
        deleteDialog: {
            title: "বিক্রয় মুছে ফেলবেন?",
            message: "এই কাজটি ফিরিয়ে নেওয়া যাবে না। আপনি কি নিশ্চিত?",
        },
        validation: {
            customerRequired: "কাস্টমার নির্বাচন করুন",
            dateRequired: "তারিখ আবশ্যক",
            dateFuture: "ভবিষ্যতের তারিখ দেওয়া যাবে না",
            quantityPositive: "পরিমাণ ০-এর বেশি হতে হবে",
            pricePositive: "মূল্য ০-এর বেশি হতে হবে",
            paidNegative: "পরিশোধিত টাকা ঋণাত্মক হতে পারবে না",
            paidExceedsTotal: "পরিশোধিত টাকা মোট টাকার চেয়ে বেশি হতে পারবে না",
        },
    },
    feed: {
        tabs: {
            feeding: "দৈনিক খাদ্য",
            types: "খাদ্যের ধরন",
        },
    },
    feedType: {
        fields: {
            name: "খাদ্যের নাম",
            category: "ক্যাটাগরি",
            unit: "একক",
            pricePerUnit: "মূল্য / একক",
            status: "অবস্থা",
            notes: "নোট",
        },
        category: {
            roughage: "রাফেজ (খড়/ঘাস)",
            concentrate: "কনসেন্ট্রেট",
            supplement: "সাপ্লিমেন্ট",
            mineral: "মিনারেল",
        },
        unit: { kg: "কেজি", liter: "লিটার", bag: "বস্তা" },
        status: { active: "সক্রিয়", inactive: "নিষ্ক্রিয়" },
        actions: { addFeedType: "খাদ্যের ধরন যোগ করুন" },
        list: {
            description: "আপনার খামারে ব্যবহৃত সব খাদ্যের তালিকা",
            searchPlaceholder: "নাম দিয়ে খুঁজুন",
            emptyTitle: "এখনো কোনো খাদ্যের ধরন যোগ করা হয়নি",
            emptyDescription: "প্রথম খাদ্যের ধরনটি যোগ করে শুরু করুন।",
        },
        form: {
            addTitle: "নতুন খাদ্যের ধরন যোগ করুন",
            editTitle: "খাদ্যের ধরন সম্পাদনা",
            description: "সব বাধ্যতামূলক তথ্য পূরণ করুন",
        },
        toast: {
            created: "খাদ্যের ধরন সফলভাবে যোগ হয়েছে",
            updated: "তথ্য সফলভাবে আপডেট হয়েছে",
        },
        deleteDialog: {
            title: "খাদ্যের ধরন মুছে ফেলবেন?",
            message: "এই কাজটি ফিরিয়ে নেওয়া যাবে না। আপনি কি নিশ্চিত?",
        },
        validation: {
            nameRequired: "খাদ্যের নাম আবশ্যক",
            nameDuplicate: "এই নামে ইতিমধ্যে একটি খাদ্যের ধরন আছে",
            categoryRequired: "ক্যাটাগরি নির্বাচন করুন",
            unitRequired: "একক নির্বাচন করুন",
            pricePositive: "মূল্য ০-এর বেশি হতে হবে",
        },
    },
    feeding: {
        fields: {
            date: "তারিখ",
            group: "গ্রুপ (ঐচ্ছিক)",
            quantity: "পরিমাণ",
            cost: "খরচ",
            notes: "নোট",
        },
        actions: { addFeeding: "খাদ্য প্রদানের রেকর্ড যোগ করুন" },
        stats: {
            todayCost: "আজকের খাদ্য খরচ",
            filteredCost: "নির্বাচিত ফলাফলের খরচ",
        },
        list: {
            description: "প্রতিদিনের খাদ্য প্রদানের সব রেকর্ড",
            filterByFeedType: "খাদ্যের ধরন নির্বাচন করুন",
            emptyTitle: "এখনো কোনো খাদ্য প্রদানের রেকর্ড নেই",
            emptyDescription: "প্রথম রেকর্ডটি যোগ করে শুরু করুন।",
        },
        form: {
            addTitle: "খাদ্য প্রদানের রেকর্ড যোগ করুন",
            editTitle: "রেকর্ড সম্পাদনা",
            description: "খাদ্যের ধরন নির্বাচন করে পরিমাণ লিখুন",
            selectFeedType: "খাদ্যের ধরন নির্বাচন করুন",
        },
        toast: {
            created: "রেকর্ড সফলভাবে যোগ হয়েছে",
            updated: "রেকর্ড সফলভাবে আপডেট হয়েছে",
        },
        deleteDialog: {
            title: "রেকর্ড মুছে ফেলবেন?",
            message: "এই কাজটি ফিরিয়ে নেওয়া যাবে না। আপনি কি নিশ্চিত?",
        },
        validation: {
            feedTypeRequired: "খাদ্যের ধরন নির্বাচন করুন",
            dateRequired: "তারিখ আবশ্যক",
            dateFuture: "ভবিষ্যতের তারিখ দেওয়া যাবে না",
            quantityPositive: "পরিমাণ ০-এর বেশি হতে হবে",
        },
    },
    land: {
        tabs: { fields: "জমি", crops: "ফসল" },
    },
    field: {
        fields: {
            name: "জমির নাম",
            area: "জমির পরিমাণ",
            areaUnit: "একক",
            soilType: "মাটির ধরন",
            waterSource: "পানির উৎস",
            status: "অবস্থা",
            notes: "নোট",
        },
        unit: { decimal: "শতক", bigha: "বিঘা", acre: "একর" },
        soilType: {
            loamy: "দোআঁশ",
            clay: "এঁটেল",
            sandy: "বেলে",
            silty: "পলি",
        },
        waterSource: {
            river: "নদী",
            pond: "পুকুর",
            tubewell: "নলকূপ",
            rain: "বৃষ্টির পানি",
        },
        status: { active: "সক্রিয়", inactive: "নিষ্ক্রিয়" },
        actions: { addField: "জমি যোগ করুন" },
        list: {
            description: "আপনার খামারের সব জমির তালিকা",
            searchPlaceholder: "নাম দিয়ে খুঁজুন",
            emptyTitle: "এখনো কোনো জমি যোগ করা হয়নি",
            emptyDescription: "প্রথম জমিটি যোগ করে শুরু করুন।",
        },
        form: {
            addTitle: "নতুন জমি যোগ করুন",
            editTitle: "জমির তথ্য সম্পাদনা",
            description: "সব বাধ্যতামূলক তথ্য পূরণ করুন",
        },
        toast: {
            created: "জমি সফলভাবে যোগ হয়েছে",
            updated: "তথ্য সফলভাবে আপডেট হয়েছে",
        },
        deleteDialog: {
            title: "জমি মুছে ফেলবেন?",
            message: "এই কাজটি ফিরিয়ে নেওয়া যাবে না। আপনি কি নিশ্চিত?",
        },
        validation: {
            nameRequired: "জমির নাম আবশ্যক",
            nameDuplicate: "এই নামে ইতিমধ্যে একটি জমি আছে",
            areaPositive: "জমির পরিমাণ ০-এর বেশি হতে হবে",
            areaUnitRequired: "একক নির্বাচন করুন",
            soilTypeRequired: "মাটির ধরন নির্বাচন করুন",
        },
    },
    crop: {
        fields: {
            cropType: "ফসলের ধরন",
            plantingDate: "রোপণের তারিখ",
            harvestDate: "কাটার তারিখ",
            yieldQuantity: "ফলন",
            yieldUnit: "একক",
            cost: "খরচ",
            status: "অবস্থা",
            notes: "নোট",
        },
        type: {
            napier_grass: "নেপিয়ার ঘাস",
            maize: "ভুট্টা",
            sorghum: "জোয়ার",
            rice_straw: "ধানের খড়",
            alfalfa: "আলফালফা",
            other: "অন্যান্য",
        },
        yieldUnit: { kg: "কেজি", ton: "টন", bundle: "আঁটি" },
        status: { growing: "বর্ধনশীল", harvested: "কাটা হয়েছে" },
        actions: { addCrop: "ফসল যোগ করুন" },
        stats: {
            totalCost: "মোট ফসলের খরচ",
            growingCount: "বর্ধনশীল ফসল",
        },
        list: {
            description: "সব ফসল রোপণ ও কাটার রেকর্ড",
            filterByField: "জমি নির্বাচন করুন",
            filterByCropType: "ফসলের ধরন নির্বাচন করুন",
            emptyTitle: "এখনো কোনো ফসলের রেকর্ড নেই",
            emptyDescription: "প্রথম রেকর্ডটি যোগ করে শুরু করুন।",
        },
        form: {
            addTitle: "ফসল যোগ করুন",
            editTitle: "ফসলের রেকর্ড সম্পাদনা",
            description: "জমি ও ফসলের ধরন নির্বাচন করে তথ্য দিন",
            selectField: "জমি নির্বাচন করুন",
            selectCropType: "ফসলের ধরন নির্বাচন করুন",
        },
        toast: {
            created: "ফসলের রেকর্ড সফলভাবে যোগ হয়েছে",
            updated: "রেকর্ড সফলভাবে আপডেট হয়েছে",
        },
        deleteDialog: {
            title: "রেকর্ড মুছে ফেলবেন?",
            message: "এই কাজটি ফিরিয়ে নেওয়া যাবে না। আপনি কি নিশ্চিত?",
        },
        validation: {
            fieldRequired: "জমি নির্বাচন করুন",
            cropTypeRequired: "ফসলের ধরন নির্বাচন করুন",
            plantingDateRequired: "রোপণের তারিখ আবশ্যক",
            plantingDateFuture: "ভবিষ্যতের তারিখ দেওয়া যাবে না",
            harvestBeforePlanting:
                "কাটার তারিখ রোপণের তারিখের আগে হতে পারবে না",
            costNonNegative: "খরচ ঋণাত্মক হতে পারবে না",
            yieldPositive: "ফলন ০-এর বেশি হতে হবে",
        },
    },
    inventoryItem: {
        fields: {
            name: "আইটেমের নাম",
            sku: "SKU",
            category: "ক্যাটাগরি",
            unit: "একক",
            quantity: "পরিমাণ",
            reorderLevel: "রিঅর্ডার লেভেল",
            status: "অবস্থা",
            notes: "নোট",
        },

        category: {
            feed: "খাদ্য",
            medicine: "ওষুধ",
            equipment: "যন্ত্রপাতি",
            spare_parts: "স্পেয়ার পার্টস",
            supplies: "সরঞ্জাম",
            other: "অন্যান্য",
        },

        unit: {
            kg: "কেজি",
            liter: "লিটার",
            piece: "টি",
            bag: "ব্যাগ",
            bottle: "বোতল",
            box: "বক্স",
            unit: "ইউনিট",
        },

        status: {
            active: "সক্রিয়",
            inactive: "নিষ্ক্রিয়",
        },

        actions: {
            addItem: "ইনভেন্টরি আইটেম যোগ করুন",
        },

        list: {
            description: "ফার্মের সব ইনভেন্টরি আইটেম পরিচালনা করুন",
            searchPlaceholder: "আইটেমের নাম অথবা SKU দিয়ে খুঁজুন",
            emptyTitle: "এখনো কোনো ইনভেন্টরি আইটেম নেই",
            emptyDescription: "প্রথম ইনভেন্টরি আইটেমটি যোগ করে শুরু করুন।",
            noResults:
                "কোনো ইনভেন্টরি আইটেম পাওয়া যায়নি। Search অথবা Filter পরিবর্তন করুন।",
        },

        form: {
            addTitle: "ইনভেন্টরি আইটেম যোগ করুন",
            editTitle: "ইনভেন্টরি আইটেম সম্পাদনা",
            description: "আইটেমের তথ্য এবং বর্তমান স্টকের তথ্য দিন",
        },

        toast: {
            created: "ইনভেন্টরি আইটেম সফলভাবে যোগ হয়েছে",
            updated: "ইনভেন্টরি আইটেম সফলভাবে আপডেট হয়েছে",
        },

        deleteDialog: {
            title: "এই ইনভেন্টরি আইটেমটি মুছে ফেলবেন?",
            message: "এই কাজটি ফিরিয়ে নেওয়া যাবে না। আপনি কি নিশ্চিত?",
        },

        validation: {
            nameRequired: "আইটেমের নাম আবশ্যক",
            skuRequired: "SKU আবশ্যক",
            skuDuplicate: "এই SKU ইতিমধ্যে ব্যবহৃত হয়েছে",
            categoryRequired: "ক্যাটাগরি নির্বাচন করুন",
            unitRequired: "একক নির্বাচন করুন",
            quantityNonNegative: "পরিমাণ ঋণাত্মক হতে পারবে না",
            reorderLevelNonNegative: "রিঅর্ডার লেভেল ঋণাত্মক হতে পারবে না",
        },
    },

    inventoryOverview: {
        title: "ইনভেন্টরি ওভারভিউ",
        description: "ইনভেন্টরির স্টক এবং গুরুত্বপূর্ণ তথ্য এক নজরে দেখুন",

        stats: {
            totalItems: "মোট আইটেম",
            activeItems: "সক্রিয় আইটেম",
            lowStock: "কম স্টক",
            outOfStock: "স্টক শেষ",
        },

        categoryTitle: "ক্যাটাগরি অনুযায়ী আইটেম",
        noCategoryData: "কোনো ক্যাটাগরি ডেটা পাওয়া যায়নি।",

        lowStockTitle: "কম স্টকের আইটেম",
        noLowStockTitle: "স্টকের অবস্থা ভালো",
        noLowStockDescription:
            "বর্তমানে কোনো সক্রিয় আইটেম তার Reorder Level-এর নিচে নেই।",

        recentTitle: "সর্বশেষ যোগ করা আইটেম",
        noItemsTitle: "কোনো ইনভেন্টরি আইটেম নেই",
        noItemsDescription:
            "স্টক পরিচালনা শুরু করতে একটি ইনভেন্টরি আইটেম যোগ করুন।",

        actions: {
            viewItems: "আইটেম দেখুন",
        },
    },
    inventorySettings: {
        title: "ইনভেন্টরি সেটিংস",
        description: "ইনভেন্টরি ক্যাটাগরি এবং পরিমাপের একক পরিচালনা করুন",

        categoriesTitle: "ইনভেন্টরি ক্যাটাগরি",
        unitsTitle: "ইনভেন্টরি ইউনিট",

        categoryPlaceholder: "ক্যাটাগরির নাম লিখুন",
        unitPlaceholder: "ইউনিটের নাম লিখুন",

        status: {
            active: "সক্রিয়",
            inactive: "নিষ্ক্রিয়",
        },

        actions: {
            add: "যোগ করুন",
            edit: "সম্পাদনা",
            save: "সংরক্ষণ",
            cancel: "বাতিল",
            activate: "সক্রিয় করুন",
            deactivate: "নিষ্ক্রিয় করুন",
        },

        toast: {
            categoryAdded: "ক্যাটাগরি সফলভাবে যোগ হয়েছে",
            categoryUpdated: "ক্যাটাগরি সফলভাবে আপডেট হয়েছে",
            unitAdded: "ইউনিট সফলভাবে যোগ হয়েছে",
            unitUpdated: "ইউনিট সফলভাবে আপডেট হয়েছে",
        },

        validation: {
            nameRequired: "নাম আবশ্যক",
            duplicate: "এই নামটি ইতিমধ্যে রয়েছে",
        },
    },
    supplier: {
        title: "সরবরাহকারী",
        description: "ফার্মের ইনভেন্টরির সরবরাহকারীদের পরিচালনা করুন",

        searchPlaceholder: "সরবরাহকারী খুঁজুন...",

        fields: {
            name: "সরবরাহকারীর নাম",
            contactPerson: "যোগাযোগের ব্যক্তি",
            phone: "ফোন",
            email: "ইমেইল",
            address: "ঠিকানা",
            notes: "নোট",
            status: "স্ট্যাটাস",
            actions: "অ্যাকশন",
        },

        status: {
            active: "সক্রিয়",
            inactive: "নিষ্ক্রিয়",
        },

        filters: {
            all: "সব সরবরাহকারী",
        },

        actions: {
            add: "সরবরাহকারী যোগ করুন",
            edit: "সম্পাদনা",
            delete: "মুছে ফেলুন",
            activate: "সক্রিয় করুন",
            deactivate: "নিষ্ক্রিয় করুন",
            save: "সরবরাহকারী সংরক্ষণ করুন",
            update: "সরবরাহকারী আপডেট করুন",
            cancel: "বাতিল",
        },

        confirmDelete: "আপনি কি এই সরবরাহকারীকে মুছে ফেলতে চান?",

        empty: {
            title: "কোনো সরবরাহকারী পাওয়া যায়নি",
            description:
                "সরবরাহকারীর তথ্য পরিচালনা শুরু করতে প্রথম সরবরাহকারী যোগ করুন।",
        },

        form: {
            addTitle: "সরবরাহকারী যোগ করুন",
            editTitle: "সরবরাহকারী সম্পাদনা করুন",
            description: "সরবরাহকারীর যোগাযোগ ও ব্যবসায়িক তথ্য দিন।",
        },

        validation: {
            nameRequired: "সরবরাহকারীর নাম আবশ্যক।",
            phoneRequired: "সরবরাহকারীর ফোন নম্বর আবশ্যক।",
            duplicateName: "এই নামে একজন সরবরাহকারী ইতিমধ্যে রয়েছে।",
            notFound: "সরবরাহকারী পাওয়া যায়নি।",
        },

        toast: {
            created: "সরবরাহকারী সফলভাবে তৈরি হয়েছে।",
            updated: "সরবরাহকারী সফলভাবে আপডেট হয়েছে।",
        },
    },
    purchaseOrder: {
        title: "ক্রয় অর্ডার",

        description: "ইনভেন্টরি ক্রয় অর্ডার তৈরি ও পরিচালনা করুন।",

        searchPlaceholder: "ক্রয় অর্ডার খুঁজুন...",

        selectSupplier: "সরবরাহকারী নির্বাচন করুন",

        selectItem: "ইনভেন্টরি আইটেম নির্বাচন করুন",

        sections: {
            basicInfo: "ক্রয় অর্ডারের তথ্য",

            items: "ক্রয় অর্ডারের আইটেম",
        },

        fields: {
            poNumber: "PO নম্বর",
            supplier: "সরবরাহকারী",
            orderDate: "অর্ডারের তারিখ",
            expectedDate: "প্রত্যাশিত তারিখ",
            item: "ইনভেন্টরি আইটেম",
            quantity: "পরিমাণ",
            unitCost: "প্রতি ইউনিট মূল্য",
            total: "মোট",
            subtotal: "সাবটোটাল",
            status: "স্ট্যাটাস",
            notes: "নোট",
            actions: "অ্যাকশন",
        },

        status: {
            draft: "খসড়া",
            ordered: "অর্ডার করা হয়েছে",
            partially_received: "আংশিক গ্রহণ করা হয়েছে",
            received: "সম্পূর্ণ গ্রহণ করা হয়েছে",
            cancelled: "বাতিল",
        },

        filters: {
            all: "সব ক্রয় অর্ডার",
        },

        actions: {
            create: "ক্রয় অর্ডার তৈরি করুন",

            addItem: "আইটেম যোগ করুন",

            remove: "সরিয়ে ফেলুন",

            edit: "সম্পাদনা",

            delete: "মুছে ফেলুন",

            save: "ক্রয় অর্ডার সংরক্ষণ করুন",

            cancel: "বাতিল",

            markOrdered: "অর্ডার হিসেবে চিহ্নিত করুন",
            receive: "পণ্য গ্রহণ",
        },

        noItems: "এই ক্রয় অর্ডারে কোনো আইটেম যোগ করা হয়নি।",

        confirmDelete: "আপনি কি এই ক্রয় অর্ডারটি মুছে ফেলতে চান?",

        empty: {
            title: "কোনো ক্রয় অর্ডার নেই",

            description:
                "ইনভেন্টরি কেনাকাটা শুরু করতে প্রথম ক্রয় অর্ডার তৈরি করুন।",
        },

        form: {
            title: "ক্রয় অর্ডার তৈরি করুন",

            description:
                "একজন সরবরাহকারী নির্বাচন করে যেসব ইনভেন্টরি আইটেম কিনতে চান সেগুলো যোগ করুন।",
        },

        validation: {
            supplierRequired: "সরবরাহকারী নির্বাচন করা আবশ্যক।",

            orderDateRequired: "অর্ডারের তারিখ আবশ্যক।",

            itemsRequired: "কমপক্ষে একটি ইনভেন্টরি আইটেম যোগ করতে হবে।",

            notFound: "ক্রয় অর্ডার পাওয়া যায়নি।",

            onlyDraftCanEdit: "শুধুমাত্র Draft ক্রয় অর্ডার সম্পাদনা করা যাবে।",
        },

        toast: {
            created: "ক্রয় অর্ডার সফলভাবে তৈরি হয়েছে।",

            updated: "ক্রয় অর্ডার সফলভাবে আপডেট হয়েছে।",
        },
    },
    goodsReceived: {
        title: "পণ্য গ্রহণ",

        description: "ক্রয় অর্ডার থেকে পাওয়া ইনভেন্টরি রেকর্ড করুন।",

        purchaseOrderNotFound: "ক্রয় অর্ডার পাওয়া যায়নি।",

        sections: {
            items: "যেসব পণ্য গ্রহণ করা হবে",
        },

        fields: {
            poNumber: "PO নম্বর",
            orderDate: "অর্ডারের তারিখ",
            expectedDate: "প্রত্যাশিত তারিখ",
            item: "ইনভেন্টরি আইটেম",
            ordered: "অর্ডার করা",
            alreadyReceived: "ইতিমধ্যে গ্রহণ করা",
            remaining: "বাকি",
            receiveNow: "এখন গ্রহণ",
            unitCost: "প্রতি ইউনিট মূল্য",
            receivedDate: "গ্রহণের তারিখ",
            notes: "নোট",
            total: "মোট",
        },

        actions: {
            receive: "পণ্য গ্রহণ করুন",

            cancel: "বাতিল",
        },

        validation: {
            purchaseOrderNotFound: "ক্রয় অর্ডার পাওয়া যায়নি।",

            orderCancelled: "বাতিল করা ক্রয় অর্ডারে পণ্য গ্রহণ করা যাবে না।",

            orderAlreadyReceived:
                "এই ক্রয় অর্ডারের সব পণ্য ইতিমধ্যে গ্রহণ করা হয়েছে।",

            invalidQuantity: "গ্রহণের পরিমাণ ঋণাত্মক হতে পারে না।",

            exceedsRemaining:
                "গ্রহণের পরিমাণ বাকি পরিমাণের চেয়ে বেশি হতে পারে না।",

            noQuantity: "কমপক্ষে একটি আইটেমের গ্রহণের পরিমাণ দিন।",
        },

        toast: {
            created:
                "পণ্য সফলভাবে গ্রহণ করা হয়েছে এবং ইনভেন্টরি স্টক আপডেট হয়েছে।",
        },
    },

    equipment: {
        tabs: { list: "যন্ত্রপাতি", maintenance: "রক্ষণাবেক্ষণ" },
    },
    equipmentItem: {
        fields: {
            name: "যন্ত্রপাতির নাম",
            type: "ধরন",
            purchaseDate: "ক্রয়ের তারিখ",
            purchaseCost: "ক্রয়মূল্য",
            status: "অবস্থা",
            notes: "নোট",
        },
        type: {
            tractor: "ট্রাক্টর",
            milking_machine: "মিল্কিং মেশিন",
            water_pump: "পানির পাম্প",
            vehicle: "যানবাহন",
            generator: "জেনারেটর",
            refrigerator: "রেফ্রিজারেটর",
            other: "অন্যান্য",
        },
        status: {
            active: "সচল",
            under_maintenance: "মেরামতাধীন",
            retired: "অকার্যকর",
        },
        actions: { addEquipment: "যন্ত্রপাতি যোগ করুন" },
        list: {
            description: "আপনার খামারের সব যন্ত্রপাতির তালিকা",
            searchPlaceholder: "নাম দিয়ে খুঁজুন",
            emptyTitle: "এখনো কোনো যন্ত্রপাতি যোগ করা হয়নি",
            emptyDescription: "প্রথম যন্ত্রপাতিটি যোগ করে শুরু করুন।",
        },
        form: {
            addTitle: "নতুন যন্ত্রপাতি যোগ করুন",
            editTitle: "যন্ত্রপাতির তথ্য সম্পাদনা",
            description: "সব বাধ্যতামূলক তথ্য পূরণ করুন",
        },
        toast: {
            created: "যন্ত্রপাতি সফলভাবে যোগ হয়েছে",
            updated: "তথ্য সফলভাবে আপডেট হয়েছে",
        },
        deleteDialog: {
            title: "যন্ত্রপাতি মুছে ফেলবেন?",
            message: "এই কাজটি ফিরিয়ে নেওয়া যাবে না। আপনি কি নিশ্চিত?",
        },
        validation: {
            nameRequired: "যন্ত্রপাতির নাম আবশ্যক",
            nameDuplicate: "এই নামে ইতিমধ্যে একটি যন্ত্রপাতি আছে",
            typeRequired: "ধরন নির্বাচন করুন",
            purchaseDateRequired: "ক্রয়ের তারিখ আবশ্যক",
            purchaseDateFuture: "ভবিষ্যতের তারিখ দেওয়া যাবে না",
            costNonNegative: "ক্রয়মূল্য ঋণাত্মক হতে পারবে না",
        },
    },
    maintenance: {
        fields: {
            type: "কাজের ধরন",
            date: "তারিখ",
            cost: "খরচ",
            notes: "নোট",
        },
        type: {
            repair: "মেরামত",
            service: "সার্ভিসিং",
            fuel: "জ্বালানি",
            other: "অন্যান্য",
        },
        actions: { addMaintenance: "রক্ষণাবেক্ষণ রেকর্ড যোগ করুন" },
        stats: {
            totalCost: "মোট রক্ষণাবেক্ষণ খরচ",
            filteredCost: "নির্বাচিত ফলাফলের খরচ",
        },
        list: {
            description: "সব যন্ত্রপাতির মেরামত ও সার্ভিসিং রেকর্ড",
            filterByEquipment: "যন্ত্রপাতি নির্বাচন করুন",
            filterByType: "কাজের ধরন নির্বাচন করুন",
            emptyTitle: "এখনো কোনো রক্ষণাবেক্ষণ রেকর্ড নেই",
            emptyDescription: "প্রথম রেকর্ডটি যোগ করে শুরু করুন।",
        },
        form: {
            addTitle: "রক্ষণাবেক্ষণ রেকর্ড যোগ করুন",
            editTitle: "রেকর্ড সম্পাদনা",
            description: "যন্ত্রপাতি ও কাজের ধরন নির্বাচন করে তথ্য দিন",
            selectEquipment: "যন্ত্রপাতি নির্বাচন করুন",
            selectType: "কাজের ধরন নির্বাচন করুন",
        },
        toast: {
            created: "রেকর্ড সফলভাবে যোগ হয়েছে",
            updated: "রেকর্ড সফলভাবে আপডেট হয়েছে",
        },
        deleteDialog: {
            title: "রেকর্ড মুছে ফেলবেন?",
            message: "এই কাজটি ফিরিয়ে নেওয়া যাবে না। আপনি কি নিশ্চিত?",
        },
        validation: {
            equipmentRequired: "যন্ত্রপাতি নির্বাচন করুন",
            typeRequired: "কাজের ধরন নির্বাচন করুন",
            dateRequired: "তারিখ আবশ্যক",
            dateFuture: "ভবিষ্যতের তারিখ দেওয়া যাবে না",
            costNonNegative: "খরচ ঋণাত্মক হতে পারবে না",
        },
    },
    finance: {
        tabs: { expenses: "খরচ", income: "আয়" },
    },
    expense: {
        fields: {
            category: "ক্যাটাগরি",
            date: "তারিখ",
            amount: "টাকার পরিমাণ",
            paymentMethod: "পরিশোধের মাধ্যম",
            notes: "নোট",
        },
        category: {
            feed: "খাদ্য",
            medicine: "ওষুধ",
            salary: "বেতন",
            utility: "ইউটিলিটি",
            equipment_maintenance: "যন্ত্রপাতি রক্ষণাবেক্ষণ",
            fuel: "জ্বালানি",
            rent: "ভাড়া",
            other: "অন্যান্য",
        },
        paymentMethod: {
            cash: "নগদ",
            bank: "ব্যাংক",
            mobile_banking: "মোবাইল ব্যাংকিং",
        },
        actions: { addExpense: "খরচ যোগ করুন" },
        stats: {
            todayTotal: "আজকের মোট খরচ",
            filteredTotal: "নির্বাচিত ফলাফলের খরচ",
        },
        list: {
            description: "খামারের সব খরচের রেকর্ড",
            filterByCategory: "ক্যাটাগরি নির্বাচন করুন",
            emptyTitle: "এখনো কোনো খরচের রেকর্ড নেই",
            emptyDescription: "প্রথম রেকর্ডটি যোগ করে শুরু করুন।",
        },
        form: {
            addTitle: "খরচ যোগ করুন",
            editTitle: "খরচের রেকর্ড সম্পাদনা",
            description: "ক্যাটাগরি নির্বাচন করে টাকার পরিমাণ লিখুন",
            selectCategory: "ক্যাটাগরি নির্বাচন করুন",
        },
        toast: {
            created: "খরচ সফলভাবে যোগ হয়েছে",
            updated: "রেকর্ড সফলভাবে আপডেট হয়েছে",
        },
        deleteDialog: {
            title: "রেকর্ড মুছে ফেলবেন?",
            message: "এই কাজটি ফিরিয়ে নেওয়া যাবে না। আপনি কি নিশ্চিত?",
        },
        validation: {
            categoryRequired: "ক্যাটাগরি নির্বাচন করুন",
            dateRequired: "তারিখ আবশ্যক",
            dateFuture: "ভবিষ্যতের তারিখ দেওয়া যাবে না",
            amountPositive: "টাকার পরিমাণ ০-এর বেশি হতে হবে",
        },
    },
    income: {
        fields: {
            category: "ক্যাটাগরি",
            date: "তারিখ",
            amount: "টাকার পরিমাণ",
            paymentMethod: "পরিশোধের মাধ্যম",
            notes: "নোট",
        },
        category: {
            cow_sale: "গরু বিক্রয়",
            calf_sale: "বাছুর বিক্রয়",
            manure_sale: "গোবর বিক্রয়",
            grass_sale: "ঘাস বিক্রয়",
            other: "অন্যান্য",
        },
        actions: { addIncome: "আয় যোগ করুন" },
        stats: {
            todayTotal: "আজকের মোট আয়",
            filteredTotal: "নির্বাচিত ফলাফলের আয়",
        },
        list: {
            description: "মিল্ক বিক্রয় ছাড়া অন্যান্য সব আয়ের রেকর্ড",
            filterByCategory: "ক্যাটাগরি নির্বাচন করুন",
            emptyTitle: "এখনো কোনো আয়ের রেকর্ড নেই",
            emptyDescription: "প্রথম রেকর্ডটি যোগ করে শুরু করুন।",
        },
        form: {
            addTitle: "আয় যোগ করুন",
            editTitle: "আয়ের রেকর্ড সম্পাদনা",
            description: "ক্যাটাগরি নির্বাচন করে টাকার পরিমাণ লিখুন",
            selectCategory: "ক্যাটাগরি নির্বাচন করুন",
        },
        toast: {
            created: "আয় সফলভাবে যোগ হয়েছে",
            updated: "রেকর্ড সফলভাবে আপডেট হয়েছে",
        },
        deleteDialog: {
            title: "রেকর্ড মুছে ফেলবেন?",
            message: "এই কাজটি ফিরিয়ে নেওয়া যাবে না। আপনি কি নিশ্চিত?",
        },
        validation: {
            categoryRequired: "ক্যাটাগরি নির্বাচন করুন",
            dateRequired: "তারিখ আবশ্যক",
            dateFuture: "ভবিষ্যতের তারিখ দেওয়া যাবে না",
            amountPositive: "টাকার পরিমাণ ০-এর বেশি হতে হবে",
        },
    },
    team: {
        tabs: { employees: "কর্মচারী", tasks: "কাজ" },
    },
    employee: {
        fields: {
            name: "নাম",
            phone: "ফোন নম্বর",
            role: "পদবি",
            salary: "বেতন",
            joinDate: "যোগদানের তারিখ",
            status: "অবস্থা",
            notes: "নোট",
        },
        role: {
            manager: "ম্যানেজার",
            veterinarian: "পশু চিকিৎসক",
            caretaker: "রক্ষণাবেক্ষণকারী",
            accountant: "হিসাবরক্ষক",
            other: "অন্যান্য",
        },
        status: { active: "সক্রিয়", inactive: "নিষ্ক্রিয়" },
        actions: { addEmployee: "কর্মচারী যোগ করুন" },
        list: {
            description: "আপনার খামারের সব কর্মচারীর তালিকা",
            searchPlaceholder: "নাম বা ফোন নম্বর দিয়ে খুঁজুন",
            emptyTitle: "এখনো কোনো কর্মচারী যোগ করা হয়নি",
            emptyDescription: "প্রথম কর্মচারীকে যোগ করে শুরু করুন।",
        },
        form: {
            addTitle: "নতুন কর্মচারী যোগ করুন",
            editTitle: "কর্মচারীর তথ্য সম্পাদনা",
            description: "সব বাধ্যতামূলক তথ্য পূরণ করুন",
        },
        toast: {
            created: "কর্মচারী সফলভাবে যোগ হয়েছে",
            updated: "তথ্য সফলভাবে আপডেট হয়েছে",
        },
        deleteDialog: {
            title: "কর্মচারী মুছে ফেলবেন?",
            message: "এই কাজটি ফিরিয়ে নেওয়া যাবে না। আপনি কি নিশ্চিত?",
        },
        validation: {
            nameRequired: "নাম আবশ্যক",
            phoneRequired: "ফোন নম্বর আবশ্যক",
            phoneDuplicate: "এই ফোন নম্বর ইতিমধ্যে ব্যবহৃত হয়েছে",
            roleRequired: "পদবি নির্বাচন করুন",
            joinDateRequired: "যোগদানের তারিখ আবশ্যক",
            joinDateFuture: "ভবিষ্যতের তারিখ দেওয়া যাবে না",
            salaryNonNegative: "বেতন ঋণাত্মক হতে পারবে না",
        },
    },
    task: {
        fields: {
            title: "কাজের নাম",
            description: "বিবরণ",
            assignedTo: "দায়িত্বে",
            dueDate: "শেষ তারিখ",
            priority: "অগ্রাধিকার",
            status: "অবস্থা",
        },
        priority: { low: "কম", medium: "মাঝারি", high: "বেশি" },
        status: {
            pending: "বাকি",
            in_progress: "চলমান",
            completed: "সম্পন্ন",
        },
        actions: { addTask: "কাজ যোগ করুন" },
        list: {
            description: "সব কাজের তালিকা",
            filterByEmployee: "কর্মচারী নির্বাচন করুন",
            filterByStatus: "অবস্থা নির্বাচন করুন",
            filterByPriority: "অগ্রাধিকার নির্বাচন করুন",
            emptyTitle: "এখনো কোনো কাজ যোগ করা হয়নি",
            emptyDescription: "প্রথম কাজটি যোগ করে শুরু করুন।",
        },
        form: {
            addTitle: "কাজ যোগ করুন",
            editTitle: "কাজ সম্পাদনা",
            description: "কর্মচারী নির্বাচন করে কাজের তথ্য দিন",
            selectEmployee: "কর্মচারী নির্বাচন করুন",
        },
        toast: {
            created: "কাজ সফলভাবে যোগ হয়েছে",
            updated: "কাজ সফলভাবে আপডেট হয়েছে",
        },
        deleteDialog: {
            title: "কাজ মুছে ফেলবেন?",
            message: "এই কাজটি ফিরিয়ে নেওয়া যাবে না। আপনি কি নিশ্চিত?",
        },
        validation: {
            titleRequired: "কাজের নাম আবশ্যক",
            assignedToRequired: "কর্মচারী নির্বাচন করুন",
            dueDateRequired: "শেষ তারিখ আবশ্যক",
            priorityRequired: "অগ্রাধিকার নির্বাচন করুন",
        },
    },
    reports: {
        tabs: { financial: "আর্থিক", farm: "খামার" },
    },
    financeReport: {
        description: "আয়-ব্যয়ের প্রবণতা ও বিশ্লেষণ",
        stats: {
            totalIncome: "মোট আয়",
            totalExpense: "মোট খরচ",
            netProfit: "নীট মুনাফা",
        },
        charts: {
            trendTitle: "গত ৩০ দিনের আয়-ব্যয়",
            categoryTitle: "ক্যাটাগরি অনুযায়ী খরচ",
            income: "আয়",
            expense: "খরচ",
            noData: "এখনো কোনো খরচের ডেটা নেই",
        },
    },
    farmReport: {
        description: "গরুর পাল ও দুধ উৎপাদনের বিশ্লেষণ",
        charts: {
            herdTitle: "গরুর ধরন অনুযায়ী বিতরণ",
            milkTitle: "গত ৩০ দিনের দুধ উৎপাদন",
            milkQuantity: "দুধ (লিটার)",
            noData: "এখনো কোনো সক্রিয় গরু নেই",
        },
    },
    calendar: {
        tabs: { alerts: "সতর্কতা", view: "ক্যালেন্ডার ভিউ" },
    },
    alert: {
        fields: {
            type: "ধরন",
            subject: "বিষয়",
            date: "তারিখ",
            severity: "গুরুত্ব",
        },
        type: {
            vaccination: "ভ্যাকসিন",
            calving: "প্রসবের সম্ভাব্য তারিখ",
            task: "কাজ",
        },
        severity: { overdue: "মেয়াদোত্তীর্ণ", upcoming: "আসন্ন" },
        list: {
            description: "আগামী ৭ দিনের মধ্যে যা করতে হবে",
            emptyTitle: "কোনো সতর্কতা নেই",
            emptyDescription: "আপাতত জরুরি কিছু নেই — সব ঠিক আছে!",
        },
    },
    calendarView: {
        description: "আসন্ন সব কাজ এক নজরে ক্যালেন্ডারে দেখুন",
        previous: "পূর্ববর্তী",
        next: "পরবর্তী",
        today: "আজ",
        todayLabel: "আজ",
        emptyTitle: "কোনো ইভেন্ট নেই",
        emptyDescription: "এই দিনে কোনো নির্ধারিত কাজ নেই",
        weekday: {
            sun: "রবি",
            mon: "সোম",
            tue: "মঙ্গল",
            wed: "বুধ",
            thu: "বৃহ",
            fri: "শুক্র",
            sat: "শনি",
        },
        months: [
            "জানুয়ারি",
            "ফেব্রুয়ারি",
            "মার্চ",
            "এপ্রিল",
            "মে",
            "জুন",
            "জুলাই",
            "আগস্ট",
            "সেপ্টেম্বর",
            "অক্টোবর",
            "নভেম্বর",
            "ডিসেম্বর",
        ],
    },
    farmOperations: {
        tabs: { manure: "গোবর", water: "পানি" },
    },
    manure: {
        fields: {
            type: "ধরন",
            date: "তারিখ",
            quantity: "পরিমাণ (কেজি)",
            notes: "মন্তব্য",
            actions: "কার্যক্রম",
        },
        type: {
            production: "উৎপাদন",
            collection: "সংগ্রহ",
            usage: "ব্যবহার",
            sale: "বিক্রয়",
        },
        validation: {
            typeRequired: "ধরন আবশ্যক",
            dateRequired: "তারিখ আবশ্যক",
            dateFuture: "তারিখ ভবিষ্যতের হতে পারবে না",
            quantityPositive: "পরিমাণ শূন্যের বেশি হতে হবে",
        },
        stats: {
            totalQuantity: "মোট পরিমাণ",
            filteredQuantity: "ফিল্টার করা পরিমাণ",
        },
        list: {
            description: "গোবর উৎপাদন, সংগ্রহ, ব্যবহার ও বিক্রয়ের হিসাব",
            filterByType: "ধরন অনুযায়ী ফিল্টার",
            emptyTitle: "কোনো রেকর্ড নেই",
            emptyDescription: "এখনো কোনো গোবরের হিসাব যোগ করা হয়নি",
        },
        actions: { addManure: "রেকর্ড যোগ করুন" },
        form: {
            addTitle: "গোবরের রেকর্ড যোগ করুন",
            editTitle: "গোবরের রেকর্ড সম্পাদনা করুন",
            description: "গোবর সংক্রান্ত তথ্য দিন",
            selectType: "ধরন নির্বাচন করুন",
        },
        deleteDialog: {
            title: "রেকর্ড মুছে ফেলুন",
            message: "আপনি কি নিশ্চিতভাবে এই রেকর্ডটি মুছে ফেলতে চান?",
        },
        toast: { created: "রেকর্ড যোগ হয়েছে", updated: "রেকর্ড আপডেট হয়েছে" },
    },
    water: {
        fields: {
            purpose: "উদ্দেশ্য",
            date: "তারিখ",
            quantity: "পরিমাণ (লিটার)",
            cost: "খরচ",
            notes: "মন্তব্য",
            actions: "কার্যক্রম",
        },
        purpose: {
            drinking: "পানীয়",
            cleaning: "পরিষ্কার",
            irrigation: "সেচ",
            other: "অন্যান্য",
        },
        validation: {
            purposeRequired: "উদ্দেশ্য আবশ্যক",
            dateRequired: "তারিখ আবশ্যক",
            dateFuture: "তারিখ ভবিষ্যতের হতে পারবে না",
            quantityPositive: "পরিমাণ শূন্যের বেশি হতে হবে",
        },
        stats: { totalQuantity: "মোট ব্যবহার", totalCost: "মোট খরচ" },
        list: {
            description: "পানি ব্যবহার ও খরচের হিসাব",
            filterByPurpose: "উদ্দেশ্য অনুযায়ী ফিল্টার",
            emptyTitle: "কোনো রেকর্ড নেই",
            emptyDescription: "এখনো কোনো পানির হিসাব যোগ করা হয়নি",
        },
        actions: { addWater: "রেকর্ড যোগ করুন" },
        form: {
            addTitle: "পানির রেকর্ড যোগ করুন",
            editTitle: "পানির রেকর্ড সম্পাদনা করুন",
            description: "পানি ব্যবহারের তথ্য দিন",
            selectPurpose: "উদ্দেশ্য নির্বাচন করুন",
        },
        deleteDialog: {
            title: "রেকর্ড মুছে ফেলুন",
            message: "আপনি কি নিশ্চিতভাবে এই রেকর্ডটি মুছে ফেলতে চান?",
        },
        toast: { created: "রেকর্ড যোগ হয়েছে", updated: "রেকর্ড আপডেট হয়েছে" },
    },
    system: {
        tabs: { settings: "সেটিংস", data: "ডেটা ম্যানেজমেন্ট" },
    },
    settings: {
        description: "খামারের মৌলিক তথ্য পরিবর্তন করুন",
        fields: {
            farmName: "খামারের নাম",
            currency: "মুদ্রা",
            dateFormat: "তারিখের ফরম্যাট",
        },
        validation: { farmNameRequired: "খামারের নাম আবশ্যক" },
        toast: { saved: "সেটিংস সংরক্ষিত হয়েছে" },
    },
    backup: {
        description: "আপনার সব data ব্যাকআপ নিন বা পুনরুদ্ধার করুন",
        export: {
            title: "ব্যাকআপ ডাউনলোড করুন",
            description: "খামারের সব তথ্য একটা JSON ফাইলে ডাউনলোড হবে",
            button: "ডাউনলোড করুন",
        },
        import: {
            title: "ব্যাকআপ পুনরুদ্ধার করুন",
            description: "আগের ডাউনলোড করা JSON ফাইল থেকে data ফিরিয়ে আনুন",
            button: "ফাইল নির্বাচন করুন",
        },
        validation: {
            invalidFile: "ফাইলটি সঠিক backup ফরম্যাটে নেই",
            readError: "ফাইল পড়তে সমস্যা হয়েছে",
        },
        toast: { restored: "Data পুনরুদ্ধার হয়েছে, page reload হচ্ছে..." },
    },
    group: {
        fields: {
            name: "গ্রুপের নাম",
            description: "বিবরণ",
            animalCount: "গরুর সংখ্যা",
        },
        validation: {
            nameRequired: "গ্রুপের নাম আবশ্যক",
            nameDuplicate: "এই নামে গ্রুপ আগে থেকেই আছে",
        },
        list: {
            description:
                "গরুর গ্রুপ (যেমন: দুধেল, শুকনা, বাছুর ঘর) তৈরি ও পরিচালনা করুন",
            emptyTitle: "কোনো গ্রুপ নেই",
            emptyDescription: "প্রথম গ্রুপটি তৈরি করুন",
        },
        actions: { addGroup: "গ্রুপ যোগ করুন" },
        form: {
            addTitle: "নতুন গ্রুপ যোগ করুন",
            editTitle: "গ্রুপ সম্পাদনা করুন",
            description: "গ্রুপের তথ্য দিন",
        },
        deleteDialog: {
            title: "গ্রুপ মুছে ফেলুন",
            message:
                "এই গ্রুপ মুছে ফেললে এতে থাকা গরুগুলোর group ফাঁকা হবে না, শুধু গ্রুপটি মুছে যাবে। নিশ্চিত?",
        },
        toast: { created: "গ্রুপ তৈরি হয়েছে", updated: "গ্রুপ আপডেট হয়েছে" },
    },
    transfer: {
        fields: {
            animal: "গরু",
            fromGroup: "পূর্বের গ্রুপ",
            toGroup: "নতুন গ্রুপ",
            date: "তারিখ",
            reason: "কারণ",
        },
        validation: {
            animalRequired: "গরু নির্বাচন করুন",
            toGroupRequired: "নতুন গ্রুপ নির্বাচন করুন",
            dateRequired: "তারিখ আবশ্যক",
            dateFuture: "ভবিষ্যতের তারিখ দেওয়া যাবে না",
        },
        list: {
            description: "গরু এক গ্রুপ থেকে আরেক গ্রুপে স্থানান্তরের ইতিহাস",
            emptyTitle: "কোনো স্থানান্তর নেই",
            emptyDescription: "এখনো কোনো গরু স্থানান্তর করা হয়নি",
        },
        actions: { addTransfer: "স্থানান্তর যোগ করুন" },
        form: {
            addTitle: "গরু স্থানান্তর করুন",
            description: "কোন গরু কোন গ্রুপে যাচ্ছে তা নির্বাচন করুন",
            selectAnimal: "গরু নির্বাচন করুন",
            selectGroup: "গ্রুপ নির্বাচন করুন",
        },
        deleteDialog: {
            title: "স্থানান্তর মুছে ফেলুন",
            message:
                "এই স্থানান্তরের রেকর্ডটি মুছে ফেলবেন? (গরুর বর্তমান group পরিবর্তন হবে না)",
        },
        toast: { created: "স্থানান্তর সংরক্ষিত হয়েছে" },
    },
};
