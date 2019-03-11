var Card = lazyload({
    loader: function () {
        return import("antd/lib/card");
    },
    statics: "",
    identifier: "Card"
});
import "antd/lib/card/style/css";
var Modal = lazyload({
    loader: function () {
        return import("antd/lib/modal");
    },
    statics: "",
    identifier: "Modal"
});
import "antd/lib/modal/style/css";
var Li = lazyload({
    loader: function () {
        return import("antd/lib/list");
    },
    statics: "",
    identifier: "Li"
});
import "antd/lib/list/style/css";
var DatePicker = lazyload({
    loader: function () {
        return import("antd/lib/date-picker");
    },
    statics: "",
    identifier: "DatePicker"
});
import "antd/lib/date-picker/style/css";