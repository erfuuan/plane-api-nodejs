import { Router } from 'express'
const router = Router()

import authRoute from './auth.router.js'
import usersRoute from './users.router.js'
import workspaceRoute from './workspace.router.js'

router.use('/auth', authRoute)
router.use('/users', usersRoute)
router.use('/workspaces', workspaceRoute)

router.use("/api-tokens/")
router.use("/api-tokens/<uuid:pk>/")
router.use("/integrations/")
router.use("/integrations/<uuid:pk>/")


router.use("release-notes/")



export default router