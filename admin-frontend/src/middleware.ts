import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('auth')?.value;
    const userId = request.cookies.get('userId')?.value;

    const unprotectedRoutes = ['/login', '/forgot-password'];

    if (!unprotectedRoutes.includes(request.nextUrl.pathname) && (!token || !userId)) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
