import { Router } from 'express'
const router = Router()

router.use('/social-auth')
router.use('/sign-up')
router.use('/sign-in')
router.use('/sign-out')
router.use('/magic-generate')
router.use('/magic-sign-in')
router.use('/email-verify')
router.use('/request-email-verify')
router.use('/reset-password/<uidb64>/<token>/')
router.use('/forgot-password')

export default router