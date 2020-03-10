let User = require('../Models/user.model');
let Category = require('../Models/categories.model');
let Store = require('../Models/stores.model');
let Coupon = require('../Models/coupon.model');
let Blog = require('../Models/blog.model');
let resHandler = require('../utils/responseHandler');

module.exports = {
    fetchCategories: fetchCategories,
    fetchStoresOnlyId: fetchStoresOnlyId,
    fetchStoreById: fetchStoreById,
    fetchStoresWithLimit: fetchStoresWithLimit,
    fetchCouponsById: fetchCouponsById,
    fetchBlogs: fetchBlogs,
    fetchUsers: fetchUsers
};

function fetchCategories(req, res) {
    Category.
        find({}).
        skip(Number(req.query.skipNo)).
        limit(Number(req.query.limitNo)).
        exec(function (err, categories) {
            if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
            else {
                if (categories.length) res.json(resHandler.respondSuccess(categories, "Categories fetched successfully", 2));
                else res.json(resHandler.respondError("Unable to fetch categories", -3));
            }
        });
}

function fetchStoresOnlyId(req, res) {
    Store.find({}, 'name storeURL', function (err, stores) {
        if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
        else if (!stores) res.json(resHandler.respondError("No Stores at the moment", -3));
        else res.json(resHandler.respondSuccess(stores, "Stores fetched successfully", 2));
    })
}
function fetchStoresWithLimit(req, res) {
    Store.
        find({}, 'name _id').
        skip(Number(req.query.skipNo)).
        limit(Number(req.query.limitNo)).
        exec(function (err, stores) {
            if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
            else {
                if (stores.length) res.json(resHandler.respondSuccess(stores, "Stores fetched successfully", 2));
                else res.json(resHandler.respondError("Unable to fetch Stores at the moment", -3));
            }
        });
}
function fetchStoreById(req, res) {
    Store.findOne({ storeURL: req.query._id }, function (err, store) {
        if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
        else if (store) res.json(resHandler.respondSuccess(store, "", 2))
        else res.json(resHandler.respondError("Unable to fetch tracking link", -3));
    })
}
function fetchCouponsById(req, res) {
    Coupon.
        find({ storeId: req.query._id }).
        skip(Number(req.query.skipNo)).
        limit(Number(req.query.limitNo)).
        sort({ sortNo: 1 }).
        exec(function (err, coupons) {
            if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
            else {
                if (coupons) res.json(resHandler.respondSuccess(coupons, "Coupons fetched successfully", 2));
                else res.json(resHandler.respondError("No coupons in this Store", -3));
            }
        });
}
function fetchBlogs(req, res) {
    Blog.
        find({}).
        skip(Number(req.query.skipNo)).
        limit(Number(req.query.limitNo)).
        exec(function (err, blogs) {
            if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
            else {
                if (blogs.length) res.json(resHandler.respondSuccess(blogs, "Blogs fetched successfully", 2));
                else res.json(resHandler.respondError("Unbale to fetch blogs", -3));
            }
        });
}
function fetchUsers(req, res) {
    User.find({}, function (err, users) {
        if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
        else if (!users) res.json(resHandler.respondError("Unable to fetch Users at the moment", -3));
        else res.json(resHandler.respondSuccess(users, "Users fetched successfully", 2));
    })
}