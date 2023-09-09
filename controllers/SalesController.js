const Sales = require("../models/SalesModel");
exports.totalRevenue = async (req, res) => {
    try {
        const totalRevenue = await Sales.aggregate([
            {
                $group: {
                    _id: 0,
                    total: { $sum: { $multiply: ['$quantity', '$price'] } },
                },
            },
        ]);

        return res.status(200).json({ success: true, message: 'Get the total revenue', data: totalRevenue[0]['total'] });
    } catch (e) {
        return res.status(500).json({ error: true, message: 'Something wrong!' });
    }
}

exports.quantityByProduct = async (req, res) => {
    try {
        const quantityByProduct = await Sales.aggregate([
            {
                $group: {
                    _id: '$product',
                    totalQuantity: { $sum: '$quantity' },
                },
            },
        ]);

        return res.status(200).json({ success: true, message: 'Get the total revenue', data: quantityByProduct });
    } catch (e) {
        return res.status(500).json({ error: true, message: 'Something wrong!' });
    }
}

exports.topProduct = async (req, res) => {
    try {
        const topProducts = await Sales.aggregate([
            {
                $group: {
                    _id: '$product',
                    totalRevenue: { $sum: { $multiply: ['$quantity', '$price'] } },
                },
            },
            { $sort: { totalRevenue: -1 } },
            { $limit: 5 },
        ]);

        return res.status(200).json({ success: true, message: 'Get the total revenue', data: topProducts });
    } catch (e) {
        return res.status(500).json({ error: true, message: 'Something wrong!' });
    }
}

exports.averagePrice = async (req, res) => {
    try {
        const averagePrice = await Sales.aggregate([
            {
                $group: {
                    _id: 0,
                    averagePrice: { $avg: '$price' },
                },
            },
        ]);

        return res.status(200).json({ success: true, message: 'Get the total revenue', data: averagePrice[0]['averagePrice'] });
    } catch (e) {
        return res.status(500).json({ error: true, message: 'Something wrong!' });
    }
}

exports.revenueByMonth = async (req, res) => {
    try {
        const revenueByMonth = await Sales.aggregate([
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: '%Y-%m',
                            date: '$date',
                        },
                    },
                    totalRevenue: { $sum: { $multiply: ['$quantity', '$price'] } },
                },
            },
        ]);

        return res.status(200).json({ success: true, message: 'Get the total revenue', data: revenueByMonth });
    } catch (e) {
        return res.status(500).json({ error: true, message: 'Something wrong!' });
    }
}

exports.highestQuantitySold = async (req, res) => {
    try {
        const highestQuantitySold = await Sales.aggregate([
            {
                $group: {
                    _id: '$product',
                    maxQuantity: { $max: '$quantity' },
                },
            },
            { $sort: { maxQuantity: -1 } },
            { $limit: 1 },
        ]);

        return res.status(200).json({ success: true, message: 'Get the total revenue', data: highestQuantitySold });
    } catch (e) {
        return res.status(500).json({ error: true, message: 'Something wrong!' });
    }
}