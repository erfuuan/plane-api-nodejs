import { Router } from 'express'
const router = Router()

router.use('/me/')
router.use('/me/change-password/')
router.use('/me/change-password/')
router.use('/me/onboard/')
router.use('/activities/')
router.use('/me/workspaces/')
router.use('/me/invitations/workspaces/')
router.use('/me/invitations/<uuid:pk>/')
router.use('/me/workspaces/<str:slug>/activity-graph/')
router.use('/me/workspaces/<str:slug>/issues-completed-graph/')
router.use('/me/workspaces/<str:slug>/dashboard/')
router.use('/me/invitations/workspaces/<str:slug>/<uuid:pk>/join/')
router.use('/me/invitations/projects/')
router.use("file-assets/")
router.use("file-assets/<str:asset_key>/")
router.use('/last-visited-workspace/')

export default router