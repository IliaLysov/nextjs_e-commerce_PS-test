import { getToken } from "next-auth/jwt";
import {
  NextRequest,
  NextResponse,
} from "next/server";

const allowedOrigins = process.env.NODE_ENV === "production" 
    ? ['https://www.plant-store.ru', 'https://plant-store.ru', process.env.MAIN_URL]
    : ['http://localhost:3000']


const requireAuth: string[] = ["/admin", "/account"];
// const requireAdmin: string[] = ["/admin"]

export async function middleware(request: NextRequest) {

    const origin = request.headers.get('origin') //не работает для localhost
        
    if (origin && !allowedOrigins.includes(origin)) { //добавить  (origin && !allowedOrigins.includes(origin) || !origin) для запрета доступа с рессурсов без адреса
        return new NextResponse(null, {
            status: 400,
            statusText: 'Bad Request',
            headers: {
                'Content-Type': 'text/plain'
            }
        })
    }

    // const regex = new RegExp('/api/*')

    // if (regex.test(request.url)) {
    //     console.log(request)
    // }

    const pathname = request.nextUrl.pathname;
    if (requireAuth.some((path) => pathname.startsWith(path))) {
        const token = await getToken({
            req: request,
            secret: process.env.NEXTAUTH_SECRET,
        });
        if (!token) {
            const url = new URL(`/api/auth/signin`, request.url);
            url.searchParams.set("callbackUrl", encodeURI(request.url));
            return NextResponse.redirect(url);
        }
        // if (token.role !== "admin") {
        //     const url = new URL(`/403`, request.url);
        //     return NextResponse.rewrite(url);
        // }
    }
    return NextResponse.next();
}