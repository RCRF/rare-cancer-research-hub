import { clerkMiddleware, getAuth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';


export default clerkMiddleware(async (auth, request) => {
    // Simple redirect for chromophobe URL, no auth check needed
    if (new URL(request.url).pathname === '/chromophobe') {
        return NextResponse.redirect(new URL('/cancer-type/chromophobe', request.url));
    }

    // Only check authentication for admin routes
    if (request.url.includes('/admin')) {
        try {
            const user = await auth.protect();

            // this can be use if using clerk b2b
            // if (!user.has({ permission: 'org:sys_domains:manage' }) || user.userId === process.env.CLERK_APPROVED_ADMIN) {
            if (user.userId !== process.env.CLERK_APPROVED_USER) {
                return NextResponse.redirect(new URL('/unauthorized', request.url));
            }
            return;
        } catch (error) {
            console.error('Auth error:', error);
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    // Allow all other routes to be public
    return;
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};
