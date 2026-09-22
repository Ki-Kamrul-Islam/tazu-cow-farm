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
    milk: {
        fields: {
            animal: "গরু",
            date: "তারিখ",
            session: "সেশন",
            quantity: "দুধের পরিমাণ (লিটার)",
            notes: "নোট",
        },

        production: {
            tabs: {
                milk: "দুধ",
                customers: "কাস্টমার",
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
            status: {
                active: "সক্রিয়",
                inactive: "নিষ্ক্রিয়",
            },
            actions: {
                addCustomer: "কাস্টমার যোগ করুন",
            },
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

        session: {
            morning: "সকাল",
            evening: "বিকাল",
        },
        units: {
            liters: "লিটার",
        },
        stats: {
            today: "আজকের মোট দুধ",
            filtered: "নির্বাচিত ফলাফলের মোট",
        },
        actions: {
            addMilk: "দুধ উৎপাদন যোগ করুন",
        },
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
};
