import { initTRPC } from '@trpc/server'
import { z } from 'zod'

const defaultTrpc = initTRPC.create()

const publicProcedure = defaultTrpc.procedure
const router = defaultTrpc.router

const authTrpc = initTRPC.context<{
    user: { id: string; email: string } | null
}>().create()

const protectedProcedure = authTrpc.procedure.use(({ ctx, next }) => {
    if (!ctx.user) {
        // throw new Error('Unauthorized')
        console.log("❌No user in contexts");
    }
    return next({
        ctx: {
            user: ctx.user,
        },
    })
})


const appRouter = router({
    hello: publicProcedure.input(z.string().nullish()).query(({ input }) => {
        return `Hello ${input ?? 'World'}!`
    }),
    protected: protectedProcedure.input(z.string()).query(({ input, ctx }) => {
        return `Hello ${ctx.user?.email}! You said: ${input}`
    }),
})

export type AppRouter = typeof appRouter

export { appRouter }