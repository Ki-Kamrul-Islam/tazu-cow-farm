export const ADJUSTMENT_TYPES = {
    INCREASE: "increase",
    DECREASE: "decrease",
    DAMAGE: "damage",
    EXPIRED: "expired",
    WASTAGE: "wastage",
    CORRECTION: "correction",
};

export function calculateNewStock(currentStock, quantity, adjustmentType) {
    const stock = Number(currentStock) || 0;
    const amount = Number(quantity) || 0;

    if (amount < 0) {
        throw new Error("Quantity cannot be negative.");
    }

    const decreaseTypes = [
        ADJUSTMENT_TYPES.DECREASE,
        ADJUSTMENT_TYPES.DAMAGE,
        ADJUSTMENT_TYPES.EXPIRED,
        ADJUSTMENT_TYPES.WASTAGE,
    ];

    if (decreaseTypes.includes(adjustmentType)) {
        const newStock = stock - amount;

        if (newStock < 0) {
            throw new Error("Stock cannot become negative.");
        }

        return newStock;
    }

    return stock + amount;
}

export function validateStockChange(currentStock, quantity, adjustmentType) {
    const stock = Number(currentStock) || 0;
    const amount = Number(quantity);

    if (!Number.isFinite(amount)) {
        throw new Error("Quantity must be a valid number.");
    }

    if (amount <= 0) {
        throw new Error("Quantity must be greater than zero.");
    }

    const newStock = calculateNewStock(stock, amount, adjustmentType);

    return {
        currentStock: stock,
        quantity: amount,
        newStock,
    };
}
