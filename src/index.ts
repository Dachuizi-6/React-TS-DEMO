import { GithubApiService } from "./GithubApiService"
import { User } from "./User"
import { Repo } from "./Repo";
import * as Lodash from "lodash"
import express from "express"
import url from "url"

const app = express()

let api: GithubApiService = new GithubApiService()

app.get("/github", (req, res) => {

    let userName: any = url.parse(req.url, true).query.username // 动态获取地址栏的query参数

    // api.getUserInfo("Dachuizi-6", (user: User) => {
    api.getUserInfo(userName, (user: User) => {
        // console.log(user);
        api.getRepos(user.login, (repos: Repo[]) => {
            // console.log(repos);

            let sortRepos = Lodash.sortBy(repos, [(repo: Repo) => repo.size * -1])
            // user.repos = repos
            user.repos = sortRepos
            // console.log(user);
            res.send(user)

        })
    })
})

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

app.listen(3000, () => {
    console.log("server runing port 3000");

})

// api.getRepos("Dachuizi-6", (repos: Repo[]) => {
//     console.log(repos);
// })

// 01、让repos成为user的一部分
// 02、排序repos，引入lodash库，默认从小到大的排序。从大到小怎么操作？数学方法操作（乘以-1）
// 03、使用express实现接口的形式(1.默认只能固定用户名的形式，2.动态用户名的形式)