var Card = lazyload({
    loader: function () {
        return import("antd/es/card");
    },
    statics: "",
    identifier: "Card"
});
import "antd/es/card/style";
var Modal = lazyload({
    loader: function () {
        return import("antd/es/modal");
    },
    statics: "",
    identifier: "Modal"
});
import "antd/es/modal/style";
var Li = lazyload({
    loader: function () {
        return import("antd/es/list");
    },
    statics: "",
    identifier: "Li"
});
import "antd/es/list/style";
var DatePicker = lazyload({
    loader: function () {
        return import("antd/es/date-picker");
    },
    statics: "",
    identifier: "DatePicker"
});
import "antd/es/date-picker/style";