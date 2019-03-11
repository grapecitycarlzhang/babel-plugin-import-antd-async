var Card = lazyload({
    loader: function () {
        return import("antd/lib/card");
    },
    statics: "",
    identifier: "Card"
});
import "antd/lib/card/style";
var Modal = lazyload({
    loader: function () {
        return import("antd/lib/modal");
    },
    statics: "",
    identifier: "Modal"
});
import "antd/lib/modal/style";
var Li = lazyload({
    loader: function () {
        return import("antd/lib/list");
    },
    statics: "",
    identifier: "Li"
});
import "antd/lib/list/style";
var DatePicker = lazyload({
    loader: function () {
        return import("antd/lib/date-picker");
    },
    statics: "",
    identifier: "DatePicker"
});
import "antd/lib/date-picker/style";