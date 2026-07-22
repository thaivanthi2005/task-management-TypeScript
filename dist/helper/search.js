"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (query) => {
    let objectSearch = {
        keyword: "",
        regex: "",
    };
    if (query.keyword) {
        objectSearch.keyword = query.keyword;
        const regex = new RegExp(objectSearch.keyword, "i");
        objectSearch.regex = regex;
    }
    return objectSearch;
};
//# sourceMappingURL=search.js.map