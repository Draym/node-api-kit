# `@d-lab/api-kit`
Utility KIT for Express apis.

## Installation

```bash
npm i @d-lab/api-kit
```

## Usage

- Add Error middleware to your App
```ts
import express from "express"

const app = express()
app.use(errorMiddleware)
```

- Declare API handler in your routes, removing Express from your Controllers logic
```ts
// from routes/user.route.ts
import {Router} from "express"
import {handle} from "../interfaces/api"

// your own controller
import UserController from "../controllers/user.controller"
import {validateRequest} from "../middleware"
const ctrl = new UserController()

const router = Router()
router.get("/users/:userId", handle.bind(ctrl.get))
router.post("/users", validateRequest(CreateRequest), handle.bind(ctrl.create))

export default router
```

- Compile your routes in /routes/index.ts
```ts
import userRouter from "./user.route"
const routers = [
  userRouter
]
export default routers
```

- Add routes to your App
```ts
import routers from "./routes"
app.use(routers)
```

- Create your Controllers
  - You can now consider your controllers as simple methods without considering Express anymore
  - The success response will be handled in the router and the possible errors will be handled by the error middleware when HttpException are thrown in your code
```ts
import {PathRequest, AuthBodyRequest} from "../interfaces/api"

export default class UserController {
    public get = async (req: PathRequest<GetRequest>): Promise<UserResponse> => {
        const params = req.params
        return {}
    }
    public create = async (req: BodyRequest<CreateRequest>): Promise<UserResponse> => {
        const body = req.body
        return {}
    }
}
```