var Card = lazyload({
    loader: function () {
        return import("antd/lib/card");
    },
    statics: "",
    identifier: "Card"
});
var Modal = lazyload({
    loader: function () {
        return import("antd/lib/modal");
    },
    statics: "",
    identifier: "Modal"
});
var Li = lazyload({
    loader: function () {
        return import("antd/lib/list");
    },
    statics: "",
    identifier: "Li"
});
var DatePicker = lazyload({
    loader: function () {
        return import("antd/lib/date-picker");
    },
    statics: "",
    identifier: "DatePicker"
});