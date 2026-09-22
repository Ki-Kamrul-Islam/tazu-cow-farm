export const en = {
    app: {
        title: "🐄 Tazu Cow Farm",
        setupSuccess: "Setup completed",
    },
    common: {
        darkMode: "🌙 Dark Mode",
        lightMode: "☀️ Light Mode",
        language: "Language",
        loading: "Loading...",
        previous: "Previous",
        next: "Next",
        comingSoon: "This module will be built in a future phase.",
        pageOf: "Page {current} of {total}",
        all: "All",
    },
    errorState: {
        title: "Something went wrong",
        description: "Please try again.",
        retry: "Try again",
    },
    confirmDialog: {
        title: "Confirm",
        confirmLabel: "Confirm",
        cancelLabel: "Cancel",
    },
    nav: {
        dashboard: "Dashboard",
        herd: "Herd",
        production: "Production & Sales",
        feed: "Feed",
        land: "Land & Crops",
        inventory: "Inventory",
        equipment: "Equipment",
        finance: "Finance",
        team: "Team & Tasks",
        reports: "Reports",
        calendar: "Calendar",
        farmOperations: "Farm Operations",
        system: "System",
        health: "Health",
        weight: "Weight",
    },
    dashboard: {
        subtitle: "Your farm's status at a glance, today",
        units: {
            currency: "৳",
            liters: "L",
        },
        stats: {
            totalCows: "Total Cows",
            totalCalves: "Total Calves",
            milkToday: "Milk Today",
            milkThisMonth: "Milk This Month",
            todayRevenue: "Today's Revenue",
            todayExpense: "Today's Expense",
            netProfitToday: "Today's Net Profit",
            feedStock: "Feed Stock",
            medicineStock: "Medicine Stock",
            pregnantCows: "Pregnant Cows",
            expectedCalving: "Expected Calving (30d)",
            vaccinationDue: "Vaccination Due (7d)",
            tasksToday: "Tasks Today",
        },
        charts: {
            milkTrendTitle: "Milk Production Trend",
            revenueExpenseTitle: "Revenue vs Expense",
            emptyTitle: "No data yet",
            emptyDescription:
                "Once the Herd and Production modules are built, real charts will appear here.",
        },
    },
    herd: {
        fields: {
            animalId: "Animal ID",
            name: "Name",
            type: "Type",
            age: "Age",
            breed: "Breed",
            gender: "Gender",
            dateOfBirth: "Date of Birth",
            weight: "Weight (kg)",
            group: "Group",
            status: "Status",
            notes: "Notes",
            actions: "Actions",
        },

        breeding: {
            fields: {
                animal: "Animal",
                breedingDate: "Breeding Date",
                method: "Method",
                sireInfo: "Sire / Semen Info",
                status: "Status",
                pregnancyDiagnosisDate: "Pregnancy Diagnosis Date",
                expectedCalvingDate: "Expected Calving Date",
                actualCalvingDate: "Actual Calving Date",
                notes: "Notes",
            },

            health: {
                fields: {
                    animal: "Animal",
                    type: "Type",
                    date: "Date",
                    diseaseOrReason: "Disease / Reason",
                    medicine: "Medicine",
                    dosage: "Dosage",
                    vetName: "Vet Name",
                    cost: "Cost",
                    nextDueDate: "Next Due Date",
                    notes: "Notes",
                },

                weight: {
                    fields: {
                        animal: "Animal",
                        date: "Date",
                        weight: "Weight",
                        notes: "Notes",
                    },
                    stats: {
                        adg: "Average Daily Gain (ADG)",
                    },
                    units: {
                        kgPerDay: "kg/day",
                    },
                    actions: {
                        addWeight: "Add Weight",
                    },
                    list: {
                        description: "All weight records",
                        filterByAnimal: "Select an animal",
                        emptyTitle: "No weight records yet",
                        emptyDescription:
                            "Add your first weight record to get started.",
                    },
                    form: {
                        addTitle: "Add Weight",
                        editTitle: "Edit Weight",
                        description:
                            "Select an animal and enter the weight and date",
                        selectAnimal: "Select an animal",
                    },
                    toast: {
                        created: "Weight added successfully",
                        updated: "Weight updated successfully",
                    },
                    deleteDialog: {
                        title: "Delete this record?",
                        message: "This action cannot be undone. Are you sure?",
                    },
                    validation: {
                        animalRequired: "Please select an animal",
                        dateRequired: "Date is required",
                        dateFuture: "Date cannot be in the future",
                        weightPositive: "Weight must be greater than 0",
                    },
                },

                type: {
                    vaccination: "Vaccination",
                    deworming: "Deworming",
                    treatment: "Treatment",
                    checkup: "Checkup",
                },
                actions: {
                    addRecord: "Add Record",
                },
                list: {
                    description: "All health records",
                    emptyTitle: "No health records yet",
                    emptyDescription: "Add your first record to get started.",
                },
                form: {
                    addTitle: "New Health Record",
                    editTitle: "Edit Health Record",
                    description:
                        "Select an animal and fill in the required fields",
                    selectAnimal: "Select an animal",
                },
                toast: {
                    created: "Record added successfully",
                    updated: "Record updated successfully",
                },
                deleteDialog: {
                    title: "Delete this record?",
                    message: "This action cannot be undone. Are you sure?",
                },
                validation: {
                    animalRequired: "Please select an animal",
                    typeRequired: "Please select a type",
                    dateRequired: "Date is required",
                    dateFuture: "Date cannot be in the future",
                    costPositive: "Cost cannot be negative",
                },
            },

            method: {
                ai: "Artificial Insemination (AI)",
                natural: "Natural",
            },
            status: {
                open: "Open",
                bred: "Bred",
                pregnant: "Pregnant",
                calved: "Calved",
                aborted: "Aborted",
            },
            actions: {
                addRecord: "Add Record",
            },
            list: {
                description: "All breeding records",
                emptyTitle: "No breeding records yet",
                emptyDescription: "Add your first record to get started.",
            },
            form: {
                addTitle: "New Breeding Record",
                editTitle: "Edit Breeding Record",
                description: "Select an animal and fill in the required fields",
                selectAnimal: "Select an animal",
            },
            toast: {
                created: "Record added successfully",
                updated: "Record updated successfully",
            },
            deleteDialog: {
                title: "Delete this record?",
                message: "This action cannot be undone. Are you sure?",
            },
            validation: {
                animalRequired: "Please select an animal",
                breedingDateRequired: "Breeding date is required",
                dateFuture: "Date cannot be in the future",
                methodRequired: "Please select a method",
                calvingDateRequired: "Please enter the actual calving date",
            },
        },

        tabs: {
            animals: "Animals",
            breeding: "Breeding",
        },

        units: {
            years: "yr",
            months: "mo",
            kg: "kg",
        },
        animalType: {
            cow: "Cow",
            bull: "Bull",
            heifer: "Heifer",
            calf: "Calf",
        },
        gender: {
            male: "Male",
            female: "Female",
        },
        status: {
            active: "Active",
            sold: "Sold",
            deceased: "Deceased",
        },
        actions: {
            addAnimal: "Add Animal",
            edit: "Edit",
            delete: "Delete",
            save: "Save",
            cancel: "Cancel",
        },
        list: {
            description: "All cows and calves in your farm",
            searchPlaceholder: "Search by Animal ID, name, or breed",
            emptyTitle: "No animals added yet",
            emptyDescription: "Add your first animal to get started.",
            noResults: "No results found. Try changing your search or filter.",
        },
        form: {
            addTitle: "Add New Animal",
            editTitle: "Edit Animal",
            description: "Fill in all required fields",
        },
        toast: {
            created: "Animal added successfully",
            updated: "Animal updated successfully",
        },
        deleteDialog: {
            title: "Delete this animal?",
            message: "This action cannot be undone. Are you sure?",
        },
        validation: {
            animalIdRequired: "Animal ID is required",
            animalIdDuplicate: "This Animal ID already exists",
            nameRequired: "Name is required",
            typeRequired: "Please select a type",
            genderRequired: "Please select a gender",
            dateInvalid: "Please enter a valid date",
            dateFuture: "Date cannot be in the future",
            weightPositive: "Weight must be greater than 0",
        },
    },
};
