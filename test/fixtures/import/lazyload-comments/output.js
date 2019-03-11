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
var Li = lazyload({
    loader: function () {
        return import("antd/lib/list");
    },
    statics: "",
    identifier: "Li"
});
import "antd/lib/list/style";