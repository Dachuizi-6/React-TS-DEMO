"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var GithubApiService_1 = require("./GithubApiService");
var Lodash = __importStar(require("lodash"));
var express_1 = __importDefault(require("express"));
var url_1 = __importDefault(require("url"));
var app = express_1.default();
var api = new GithubApiService_1.GithubApiService();
app.get("/github", function (req, res) {
    var userName = url_1.default.parse(req.url, true).query.username;
    // api.getUserInfo("Dachuizi-6", (user: User) => {
    api.getUserInfo(userName, function (user) {
        // console.log(user);
        api.getRepos(user.login, function (repos) {
            // console.log(repos);
            var sortRepos = Lodash.sortBy(repos, [function (repo) { return repo.size * -1; }]);
            // user.repos = repos
            user.repos = sortRepos;
            // console.log(user);
            res.send(user);
        });
    });
});
// 实例化一下
// let api: GithubApiService = new GithubApiService()
// api.getUserInfo("Dachuizi-6", (user: User) => {
//     // console.log(user);
//     api.getRepos(user.login, (repos: Repo[]) => {
//         // console.log(repos);
//         let sortRepos = Lodash.sortBy(repos, [(repo: Repo) => repo.size * -1])
//         // user.repos = repos
//         user.repos = sortRepos
//         console.log(user);
//     })
// })
app.listen(3000, function () {
    console.log("server runing port 3000");
});
// api.getRepos("Dachuizi-6", (repos: Repo[]) => {
//     console.log(repos);
// })
// 01、让repos成为user的一部分
// 02、排序repos，引入lodash库，默认从小到大的排序。从大到小怎么操作？数学方法操作（乘以-1）
// 03、使用express实现接口的形式(1.默认只能固定用户名的形式，2.动态用户名的形式)
