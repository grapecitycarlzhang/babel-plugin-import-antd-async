import Card from "antd/lib/card";
import "antd/lib/card/style";
var Modal = lazyload({
    loader: function () {
        return import("antd/lib/modal");
    },
    statics: "{\"react\":[],\"reactfunc\":[\"comfirm\"],\"func\":[]}",
    identifier: "Modal"
});
import "antd/lib/modal/style";
import Li from "antd/lib/list";
import "antd/lib/list/style";
var DatePicker = lazyload({
    loader: function () {
        return import("antd/lib/date-picker");
    },
    statics: "",
    identifier: "DatePicker"
});
import "antd/lib/date-picker/style";