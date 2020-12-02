import * as request from "request"
import { User } from "./User"
import { Repo } from "./Repo" // 实体

const options = {
    headers: {
        "User-Agent": "request"
    },
    json: true // 返回json数据格式
}

export class GithubApiService {
    getUserInfo(userName: string, cb: any) {
        request.get(`https://api.github.com/users/${userName}`, options, (error, response, body) => {
            console.log(typeof body); // string
            // let user: User = new User(JSON.parse(body))
            let user: User = new User(body)
            // console.log(user);

            cb(user)
        })
    }

    // 仓库信息
    getRepos(userName: string, cb: any) {
        request.get(`https://api.github.com/users/${userName}/repos`, options, (error, response, body) => {
            console.log(typeof body); // string

            let repos: Repo[] = body.map((repo: any) => {
                return new Repo(repo)
            })
            cb(repos)
        })
    }
}