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
        tabs: {
            animals: "Animals",
            breeding: "Breeding",
            health: "Health",
            weight: "Weight",
            scoring: "Scoring",
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
            typeRequired: "Please select a type",
            dateRequired: "Date is required",
            dateFuture: "Date cannot be in the future",
            costPositive: "Cost cannot be negative",
        },
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
            emptyDescription: "Add your first weight record to get started.",
        },
        form: {
            addTitle: "Add Weight",
            editTitle: "Edit Weight",
            description: "Select an animal and enter the weight and date",
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
    scoring: {
        fields: {
            animal: "Animal",
            date: "Date",
            bodyConditionScore: "Body Condition Score",
            udderScore: "Udder Score",
            mobilityScore: "Mobility Score",
            overallScore: "Overall Score",
            notes: "Notes",
        },
        actions: {
            addScore: "Add Score",
        },
        list: {
            description: "All scoring records",
            filterByAnimal: "Select an animal",
            emptyTitle: "No scores added yet",
            emptyDescription: "Add your first score to get started.",
        },
        form: {
            addTitle: "Add Score",
            editTitle: "Edit Score",
            description: "Select an animal and give at least one score",
            selectAnimal: "Select an animal",
        },
        toast: {
            created: "Score added successfully",
            updated: "Score updated successfully",
        },
        deleteDialog: {
            title: "Delete this record?",
            message: "This action cannot be undone. Are you sure?",
        },
        validation: {
            animalRequired: "Please select an animal",
            dateRequired: "Date is required",
            dateFuture: "Date cannot be in the future",
            atLeastOneScore: "Please give at least one score",
        },
    },

    production: {
        tabs: { milk: "Milk", customers: "Customers", sales: "Sales" },
    },
    milk: {
        fields: {
            animal: "Animal",
            date: "Date",
            session: "Session",
            quantity: "Milk Quantity (L)",
            notes: "Notes",
        },
        session: { morning: "Morning", evening: "Evening" },
        units: { liters: "L" },
        stats: { today: "Today's Total Milk", filtered: "Filtered Total" },
        actions: { addMilk: "Add Milk Record" },
        list: {
            description: "All daily milk production records",
            filterByAnimal: "Select an animal",
            emptyTitle: "No milk records yet",
            emptyDescription: "Add your first record to get started.",
        },
        form: {
            addTitle: "Add Milk Record",
            editTitle: "Edit Milk Record",
            description: "Select an animal and enter the milk details",
            selectAnimal: "Select an animal",
        },
        toast: {
            created: "Milk record added successfully",
            updated: "Milk record updated successfully",
        },
        deleteDialog: {
            title: "Delete this record?",
            message: "This action cannot be undone. Are you sure?",
        },
        validation: {
            animalRequired: "Please select an animal",
            dateRequired: "Date is required",
            dateFuture: "Date cannot be in the future",
            sessionRequired: "Please select a session",
            quantityPositive: "Quantity must be greater than 0",
        },
    },
    customers: {
        fields: {
            name: "Name",
            phone: "Phone",
            address: "Address",
            status: "Status",
            notes: "Notes",
        },
        status: { active: "Active", inactive: "Inactive" },
        actions: { addCustomer: "Add Customer" },
        list: {
            description: "All customers of your farm",
            searchPlaceholder: "Search by name or phone",
            emptyTitle: "No customers added yet",
            emptyDescription: "Add your first customer to get started.",
        },
        form: {
            addTitle: "Add New Customer",
            editTitle: "Edit Customer",
            description: "Fill in all required fields",
        },
        toast: {
            created: "Customer added successfully",
            updated: "Customer updated successfully",
        },
        deleteDialog: {
            title: "Delete this customer?",
            message: "This action cannot be undone. Are you sure?",
        },
        validation: {
            nameRequired: "Name is required",
            phoneRequired: "Phone number is required",
            phoneDuplicate: "This phone number is already registered",
        },
    },
    sales: {
        fields: {
            customer: "Customer",
            date: "Date",
            quantity: "Quantity",
            pricePerLiter: "Price / Liter",
            totalAmount: "Total Amount",
            paidAmount: "Paid Amount",
            dueAmount: "Due Amount",
            status: "Status",
            notes: "Notes",
        },
        status: { paid: "Paid", partial: "Partial", due: "Due" },
        stats: {
            todayRevenue: "Today's Revenue",
            totalDue: "Total Outstanding Due",
        },
        actions: { addSale: "Add Sale" },
        list: {
            description: "All milk sales and invoices",
            filterByCustomer: "Select a customer",
            emptyTitle: "No sales recorded yet",
            emptyDescription: "Add your first sale to get started.",
        },
        form: {
            addTitle: "Add Sale",
            editTitle: "Edit Sale",
            description: "Select a customer and enter the sale details",
            selectCustomer: "Select a customer",
            estimatedTotal: "Estimated Total",
        },
        toast: {
            created: "Sale added successfully",
            updated: "Sale updated successfully",
        },
        deleteDialog: {
            title: "Delete this sale?",
            message: "This action cannot be undone. Are you sure?",
        },
        validation: {
            customerRequired: "Please select a customer",
            dateRequired: "Date is required",
            dateFuture: "Date cannot be in the future",
            quantityPositive: "Quantity must be greater than 0",
            pricePositive: "Price must be greater than 0",
            paidNegative: "Paid amount cannot be negative",
            paidExceedsTotal: "Paid amount cannot exceed the total amount",
        },
    },

    feed: {
        tabs: { feeding: "Daily Feeding", types: "Feed Types" },
    },
    feedType: {
        fields: {
            name: "Feed Name",
            category: "Category",
            unit: "Unit",
            pricePerUnit: "Price / Unit",
            status: "Status",
            notes: "Notes",
        },
        category: {
            roughage: "Roughage",
            concentrate: "Concentrate",
            supplement: "Supplement",
            mineral: "Mineral",
        },
        unit: { kg: "kg", liter: "liter", bag: "bag" },
        status: { active: "Active", inactive: "Inactive" },
        actions: { addFeedType: "Add Feed Type" },
        list: {
            description: "All feed types used on your farm",
            searchPlaceholder: "Search by name",
            emptyTitle: "No feed types added yet",
            emptyDescription: "Add your first feed type to get started.",
        },
        form: {
            addTitle: "Add New Feed Type",
            editTitle: "Edit Feed Type",
            description: "Fill in all required information",
        },
        toast: {
            created: "Feed type added successfully",
            updated: "Updated successfully",
        },
        deleteDialog: {
            title: "Delete this feed type?",
            message: "This action cannot be undone. Are you sure?",
        },
        validation: {
            nameRequired: "Feed name is required",
            nameDuplicate: "A feed type with this name already exists",
            categoryRequired: "Select a category",
            unitRequired: "Select a unit",
            pricePositive: "Price must be greater than 0",
        },
    },
    feeding: {
        fields: {
            date: "Date",
            group: "Group (optional)",
            quantity: "Quantity",
            cost: "Cost",
            notes: "Notes",
        },
        actions: { addFeeding: "Add Feeding Record" },
        stats: {
            todayCost: "Today's Feed Cost",
            filteredCost: "Filtered Cost",
        },
        list: {
            description: "All daily feeding records",
            filterByFeedType: "Select a feed type",
            emptyTitle: "No feeding records yet",
            emptyDescription: "Add your first record to get started.",
        },
        form: {
            addTitle: "Add Feeding Record",
            editTitle: "Edit Record",
            description: "Select a feed type and enter the quantity",
            selectFeedType: "Select a feed type",
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
            feedTypeRequired: "Please select a feed type",
            dateRequired: "Date is required",
            dateFuture: "Date cannot be in the future",
            quantityPositive: "Quantity must be greater than 0",
        },
    },
    land: {
        tabs: { fields: "Fields", crops: "Crops" },
    },
    field: {
        fields: {
            name: "Field Name",
            area: "Area",
            areaUnit: "Unit",
            soilType: "Soil Type",
            waterSource: "Water Source",
            status: "Status",
            notes: "Notes",
        },
        unit: { decimal: "Decimal", bigha: "Bigha", acre: "Acre" },
        soilType: {
            loamy: "Loamy",
            clay: "Clay",
            sandy: "Sandy",
            silty: "Silty",
        },
        waterSource: {
            river: "River",
            pond: "Pond",
            tubewell: "Tubewell",
            rain: "Rainwater",
        },
        status: { active: "Active", inactive: "Inactive" },
        actions: { addField: "Add Field" },
        list: {
            description: "All fields of your farm",
            searchPlaceholder: "Search by name",
            emptyTitle: "No fields added yet",
            emptyDescription: "Add your first field to get started.",
        },
        form: {
            addTitle: "Add New Field",
            editTitle: "Edit Field",
            description: "Fill in all required information",
        },
        toast: {
            created: "Field added successfully",
            updated: "Updated successfully",
        },
        deleteDialog: {
            title: "Delete this field?",
            message: "This action cannot be undone. Are you sure?",
        },
        validation: {
            nameRequired: "Field name is required",
            nameDuplicate: "A field with this name already exists",
            areaPositive: "Area must be greater than 0",
            areaUnitRequired: "Select a unit",
            soilTypeRequired: "Select a soil type",
        },
    },
    crop: {
        fields: {
            cropType: "Crop Type",
            plantingDate: "Planting Date",
            harvestDate: "Harvest Date",
            yieldQuantity: "Yield",
            yieldUnit: "Unit",
            cost: "Cost",
            status: "Status",
            notes: "Notes",
        },
        type: {
            napier_grass: "Napier Grass",
            maize: "Maize",
            sorghum: "Sorghum",
            rice_straw: "Rice Straw",
            alfalfa: "Alfalfa",
            other: "Other",
        },
        yieldUnit: { kg: "kg", ton: "ton", bundle: "bundle" },
        status: { growing: "Growing", harvested: "Harvested" },
        actions: { addCrop: "Add Crop" },
        stats: {
            totalCost: "Total Crop Cost",
            growingCount: "Growing Crops",
        },
        list: {
            description: "All crop planting and harvest records",
            filterByField: "Select a field",
            filterByCropType: "Select a crop type",
            emptyTitle: "No crop records yet",
            emptyDescription: "Add your first record to get started.",
        },
        form: {
            addTitle: "Add Crop",
            editTitle: "Edit Crop Record",
            description: "Select field and crop type, then enter details",
            selectField: "Select a field",
            selectCropType: "Select a crop type",
        },
        toast: {
            created: "Crop record added successfully",
            updated: "Record updated successfully",
        },
        deleteDialog: {
            title: "Delete this record?",
            message: "This action cannot be undone. Are you sure?",
        },
        validation: {
            fieldRequired: "Please select a field",
            cropTypeRequired: "Please select a crop type",
            plantingDateRequired: "Planting date is required",
            plantingDateFuture: "Date cannot be in the future",
            harvestBeforePlanting:
                "Harvest date cannot be before planting date",
            costNonNegative: "Cost cannot be negative",
            yieldPositive: "Yield must be greater than 0",
        },
    },
    inventoryItem: {
        fields: {
            name: "Item Name",
            sku: "SKU",
            category: "Category",
            unit: "Unit",
            quantity: "Quantity",
            reorderLevel: "Reorder Level",
            status: "Status",
            notes: "Notes",
        },

        category: {
            feed: "Feed",
            medicine: "Medicine",
            equipment: "Equipment",
            spare_parts: "Spare Parts",
            supplies: "Supplies",
            other: "Other",
        },

        unit: {
            kg: "kg",
            liter: "Liter",
            piece: "Piece",
            bag: "Bag",
            bottle: "Bottle",
            box: "Box",
            unit: "Unit",
        },

        status: {
            active: "Active",
            inactive: "Inactive",
        },

        actions: {
            addItem: "Add Inventory Item",
        },

        list: {
            description: "Manage all inventory items of your farm",
            searchPlaceholder: "Search by item name or SKU",
            emptyTitle: "No inventory items added yet",
            emptyDescription: "Add your first inventory item to get started.",
            noResults:
                "No inventory items found. Try changing your search or filter.",
        },

        form: {
            addTitle: "Add Inventory Item",
            editTitle: "Edit Inventory Item",
            description:
                "Enter the inventory item's basic information and stock details",
        },

        toast: {
            created: "Inventory item added successfully",
            updated: "Inventory item updated successfully",
        },

        deleteDialog: {
            title: "Delete this inventory item?",
            message: "This action cannot be undone. Are you sure?",
        },

        validation: {
            nameRequired: "Item name is required",
            skuRequired: "SKU is required",
            skuDuplicate: "This SKU already exists",
            categoryRequired: "Select a category",
            unitRequired: "Select a unit",
            quantityNonNegative: "Quantity cannot be negative",
            reorderLevelNonNegative: "Reorder level cannot be negative",
        },
    },
    inventoryOverview: {
        title: "Inventory Overview",
        description:
            "Monitor inventory stock and important inventory information",

        stats: {
            totalItems: "Total Items",
            activeItems: "Active Items",
            lowStock: "Low Stock",
            outOfStock: "Out of Stock",
        },

        categoryTitle: "Items by Category",
        noCategoryData: "No category data available.",

        lowStockTitle: "Low Stock Items",
        noLowStockTitle: "Stock levels look good",
        noLowStockDescription:
            "No active inventory item is currently below its reorder level.",

        recentTitle: "Recently Added Items",
        noItemsTitle: "No Inventory Items",
        noItemsDescription:
            "Add an inventory item to start managing your stock.",

        actions: {
            viewItems: "View Items",
        },
    },
    inventorySettings: {
        title: "Inventory Settings",
        description: "Manage inventory categories and measurement units",

        categoriesTitle: "Inventory Categories",
        unitsTitle: "Inventory Units",

        categoryPlaceholder: "Enter category name",
        unitPlaceholder: "Enter unit name",

        status: {
            active: "Active",
            inactive: "Inactive",
        },

        actions: {
            add: "Add",
            edit: "Edit",
            save: "Save",
            cancel: "Cancel",
            activate: "Activate",
            deactivate: "Deactivate",
        },

        toast: {
            categoryAdded: "Category added successfully",
            categoryUpdated: "Category updated successfully",
            unitAdded: "Unit added successfully",
            unitUpdated: "Unit updated successfully",
        },

        validation: {
            nameRequired: "Name is required",
            duplicate: "This name already exists",
        },
    },
    supplier: {
        title: "Suppliers",
        description: "Manage suppliers for your farm inventory",

        searchPlaceholder: "Search suppliers...",

        fields: {
            name: "Supplier Name",
            contactPerson: "Contact Person",
            phone: "Phone",
            email: "Email",
            address: "Address",
            notes: "Notes",
            status: "Status",
            actions: "Actions",
        },

        status: {
            active: "Active",
            inactive: "Inactive",
        },

        filters: {
            all: "All Suppliers",
        },

        actions: {
            add: "Add Supplier",
            edit: "Edit",
            delete: "Delete",
            activate: "Activate",
            deactivate: "Deactivate",
            save: "Save Supplier",
            update: "Update Supplier",
            cancel: "Cancel",
        },

        confirmDelete: "Are you sure you want to delete this supplier?",

        empty: {
            title: "No Suppliers Found",
            description:
                "Add your first supplier to start managing supplier information.",
        },

        form: {
            addTitle: "Add Supplier",
            editTitle: "Edit Supplier",
            description: "Enter supplier contact and business information.",
        },

        validation: {
            nameRequired: "Supplier name is required.",
            phoneRequired: "Supplier phone number is required.",
            duplicateName: "A supplier with this name already exists.",
            notFound: "Supplier was not found.",
        },

        toast: {
            created: "Supplier created successfully.",
            updated: "Supplier updated successfully.",
        },
    },
    purchaseOrder: {
        title: "Purchase Orders",

        description: "Create and manage inventory purchase orders.",

        searchPlaceholder: "Search purchase orders...",

        selectSupplier: "Select supplier",

        selectItem: "Select inventory item",

        sections: {
            basicInfo: "Purchase Order Information",
            items: "Purchase Order Items",
        },

        fields: {
            poNumber: "PO Number",
            supplier: "Supplier",
            orderDate: "Order Date",
            expectedDate: "Expected Date",
            item: "Inventory Item",
            quantity: "Quantity",
            unitCost: "Unit Cost",
            total: "Total",
            subtotal: "Subtotal",
            status: "Status",
            notes: "Notes",
            actions: "Actions",
        },

        status: {
            draft: "Draft",
            ordered: "Ordered",
            partially_received: "Partially Received",
            received: "Received",
            cancelled: "Cancelled",
        },

        filters: {
            all: "All Purchase Orders",
        },

        actions: {
            create: "Create Purchase Order",
            addItem: "Add Item",
            remove: "Remove",
            edit: "Edit",
            delete: "Delete",
            save: "Save Purchase Order",
            cancel: "Cancel",
            markOrdered: "Mark as Ordered",
            receive: "Receive",
        },

        noItems: "No items have been added to this purchase order.",

        confirmDelete: "Are you sure you want to delete this purchase order?",

        empty: {
            title: "No Purchase Orders",
            description:
                "Create your first purchase order to start purchasing inventory.",
        },

        form: {
            title: "Create Purchase Order",
            description:
                "Select a supplier and add the inventory items you want to purchase.",
        },

        validation: {
            supplierRequired: "Supplier is required.",

            orderDateRequired: "Order date is required.",

            itemsRequired: "At least one inventory item is required.",

            notFound: "Purchase order was not found.",

            onlyDraftCanEdit: "Only draft purchase orders can be edited.",
        },

        toast: {
            created: "Purchase order created successfully.",

            updated: "Purchase order updated successfully.",
        },
    },
    goodsReceived: {
        title: "Receive Goods",

        description: "Record inventory received from a purchase order.",

        purchaseOrderNotFound: "Purchase order not found.",

        sections: {
            items: "Items to Receive",
        },

        fields: {
            poNumber: "PO Number",
            orderDate: "Order Date",
            expectedDate: "Expected Date",
            item: "Inventory Item",
            ordered: "Ordered",
            alreadyReceived: "Already Received",
            remaining: "Remaining",
            receiveNow: "Receive Now",
            unitCost: "Unit Cost",
            receivedDate: "Received Date",
            notes: "Notes",
            total: "Total",
        },

        actions: {
            receive: "Receive Goods",
            cancel: "Cancel",
        },

        validation: {
            purchaseOrderNotFound: "Purchase order was not found.",

            orderCancelled: "Cancelled purchase orders cannot receive goods.",

            orderAlreadyReceived:
                "This purchase order has already been fully received.",

            invalidQuantity: "Received quantity cannot be negative.",

            exceedsRemaining:
                "Received quantity cannot exceed the remaining quantity.",

            noQuantity: "Enter a received quantity for at least one item.",
        },

        toast: {
            created:
                "Goods received successfully and inventory stock was updated.",
        },
    },

    equipment: {
        tabs: { list: "Equipment", maintenance: "Maintenance" },
    },
    equipmentItem: {
        fields: {
            name: "Equipment Name",
            type: "Type",
            purchaseDate: "Purchase Date",
            purchaseCost: "Purchase Cost",
            status: "Status",
            notes: "Notes",
        },
        type: {
            tractor: "Tractor",
            milking_machine: "Milking Machine",
            water_pump: "Water Pump",
            vehicle: "Vehicle",
            generator: "Generator",
            refrigerator: "Refrigerator",
            other: "Other",
        },
        status: {
            active: "Active",
            under_maintenance: "Under Maintenance",
            retired: "Retired",
        },
        actions: { addEquipment: "Add Equipment" },
        list: {
            description: "All equipment of your farm",
            searchPlaceholder: "Search by name",
            emptyTitle: "No equipment added yet",
            emptyDescription: "Add your first equipment to get started.",
        },
        form: {
            addTitle: "Add New Equipment",
            editTitle: "Edit Equipment",
            description: "Fill in all required information",
        },
        toast: {
            created: "Equipment added successfully",
            updated: "Updated successfully",
        },
        deleteDialog: {
            title: "Delete this equipment?",
            message: "This action cannot be undone. Are you sure?",
        },
        validation: {
            nameRequired: "Equipment name is required",
            nameDuplicate: "Equipment with this name already exists",
            typeRequired: "Select a type",
            purchaseDateRequired: "Purchase date is required",
            purchaseDateFuture: "Date cannot be in the future",
            costNonNegative: "Cost cannot be negative",
        },
    },
    maintenance: {
        fields: {
            type: "Work Type",
            date: "Date",
            cost: "Cost",
            notes: "Notes",
        },
        type: {
            repair: "Repair",
            service: "Service",
            fuel: "Fuel",
            other: "Other",
        },
        actions: { addMaintenance: "Add Maintenance Record" },
        stats: {
            totalCost: "Total Maintenance Cost",
            filteredCost: "Filtered Cost",
        },
        list: {
            description: "All equipment repair and service records",
            filterByEquipment: "Select equipment",
            filterByType: "Select work type",
            emptyTitle: "No maintenance records yet",
            emptyDescription: "Add your first record to get started.",
        },
        form: {
            addTitle: "Add Maintenance Record",
            editTitle: "Edit Record",
            description: "Select equipment and work type, then enter details",
            selectEquipment: "Select equipment",
            selectType: "Select work type",
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
            equipmentRequired: "Please select equipment",
            typeRequired: "Please select a work type",
            dateRequired: "Date is required",
            dateFuture: "Date cannot be in the future",
            costNonNegative: "Cost cannot be negative",
        },
    },
    finance: {
        tabs: { expenses: "Expenses", income: "Income" },
    },
    expense: {
        fields: {
            category: "Category",
            date: "Date",
            amount: "Amount",
            paymentMethod: "Payment Method",
            notes: "Notes",
        },
        category: {
            feed: "Feed",
            medicine: "Medicine",
            salary: "Salary",
            utility: "Utility",
            equipment_maintenance: "Equipment Maintenance",
            fuel: "Fuel",
            rent: "Rent",
            other: "Other",
        },
        paymentMethod: {
            cash: "Cash",
            bank: "Bank",
            mobile_banking: "Mobile Banking",
        },
        actions: { addExpense: "Add Expense" },
        stats: {
            todayTotal: "Today's Total Expense",
            filteredTotal: "Filtered Total",
        },
        list: {
            description: "All farm expense records",
            filterByCategory: "Select a category",
            emptyTitle: "No expense records yet",
            emptyDescription: "Add your first record to get started.",
        },
        form: {
            addTitle: "Add Expense",
            editTitle: "Edit Expense Record",
            description: "Select a category and enter the amount",
            selectCategory: "Select a category",
        },
        toast: {
            created: "Expense added successfully",
            updated: "Record updated successfully",
        },
        deleteDialog: {
            title: "Delete this record?",
            message: "This action cannot be undone. Are you sure?",
        },
        validation: {
            categoryRequired: "Select a category",
            dateRequired: "Date is required",
            dateFuture: "Date cannot be in the future",
            amountPositive: "Amount must be greater than 0",
        },
    },
    income: {
        fields: {
            category: "Category",
            date: "Date",
            amount: "Amount",
            paymentMethod: "Payment Method",
            notes: "Notes",
        },
        category: {
            cow_sale: "Cow Sale",
            calf_sale: "Calf Sale",
            manure_sale: "Manure Sale",
            grass_sale: "Grass Sale",
            other: "Other",
        },
        actions: { addIncome: "Add Income" },
        stats: {
            todayTotal: "Today's Total Income",
            filteredTotal: "Filtered Total",
        },
        list: {
            description: "All income records other than milk sales",
            filterByCategory: "Select a category",
            emptyTitle: "No income records yet",
            emptyDescription: "Add your first record to get started.",
        },
        form: {
            addTitle: "Add Income",
            editTitle: "Edit Income Record",
            description: "Select a category and enter the amount",
            selectCategory: "Select a category",
        },
        toast: {
            created: "Income added successfully",
            updated: "Record updated successfully",
        },
        deleteDialog: {
            title: "Delete this record?",
            message: "This action cannot be undone. Are you sure?",
        },
        validation: {
            categoryRequired: "Select a category",
            dateRequired: "Date is required",
            dateFuture: "Date cannot be in the future",
            amountPositive: "Amount must be greater than 0",
        },
    },
    team: {
        tabs: { employees: "Employees", tasks: "Tasks" },
    },
    employee: {
        fields: {
            name: "Name",
            phone: "Phone",
            role: "Role",
            salary: "Salary",
            joinDate: "Join Date",
            status: "Status",
            notes: "Notes",
        },
        role: {
            manager: "Manager",
            veterinarian: "Veterinarian",
            caretaker: "Caretaker",
            accountant: "Accountant",
            other: "Other",
        },
        status: { active: "Active", inactive: "Inactive" },
        actions: { addEmployee: "Add Employee" },
        list: {
            description: "All employees of your farm",
            searchPlaceholder: "Search by name or phone",
            emptyTitle: "No employees added yet",
            emptyDescription: "Add your first employee to get started.",
        },
        form: {
            addTitle: "Add New Employee",
            editTitle: "Edit Employee",
            description: "Fill in all required information",
        },
        toast: {
            created: "Employee added successfully",
            updated: "Updated successfully",
        },
        deleteDialog: {
            title: "Delete this employee?",
            message: "This action cannot be undone. Are you sure?",
        },
        validation: {
            nameRequired: "Name is required",
            phoneRequired: "Phone number is required",
            phoneDuplicate: "This phone number is already in use",
            roleRequired: "Select a role",
            joinDateRequired: "Join date is required",
            joinDateFuture: "Date cannot be in the future",
            salaryNonNegative: "Salary cannot be negative",
        },
    },
    task: {
        fields: {
            title: "Task Title",
            description: "Description",
            assignedTo: "Assigned To",
            dueDate: "Due Date",
            priority: "Priority",
            status: "Status",
        },
        priority: { low: "Low", medium: "Medium", high: "High" },
        status: {
            pending: "Pending",
            in_progress: "In Progress",
            completed: "Completed",
        },
        actions: { addTask: "Add Task" },
        list: {
            description: "All tasks",
            filterByEmployee: "Select an employee",
            filterByStatus: "Select a status",
            filterByPriority: "Select a priority",
            emptyTitle: "No tasks added yet",
            emptyDescription: "Add your first task to get started.",
        },
        form: {
            addTitle: "Add Task",
            editTitle: "Edit Task",
            description: "Select an employee and enter task details",
            selectEmployee: "Select an employee",
        },
        toast: {
            created: "Task added successfully",
            updated: "Task updated successfully",
        },
        deleteDialog: {
            title: "Delete this task?",
            message: "This action cannot be undone. Are you sure?",
        },
        validation: {
            titleRequired: "Task title is required",
            assignedToRequired: "Please select an employee",
            dueDateRequired: "Due date is required",
            priorityRequired: "Please select a priority",
        },
    },
    reports: {
        tabs: { financial: "Financial", farm: "Farm" },
    },
    financeReport: {
        description: "Income and expense trends and analysis",
        stats: {
            totalIncome: "Total Income",
            totalExpense: "Total Expense",
            netProfit: "Net Profit",
        },
        charts: {
            trendTitle: "Last 30 Days Income vs Expense",
            categoryTitle: "Expense by Category",
            income: "Income",
            expense: "Expense",
            noData: "No expense data yet",
        },
    },
    farmReport: {
        description: "Herd and milk production analysis",
        charts: {
            herdTitle: "Herd Distribution by Type",
            milkTitle: "Last 30 Days Milk Production",
            milkQuantity: "Milk (L)",
            noData: "No active animals yet",
        },
    },
};
