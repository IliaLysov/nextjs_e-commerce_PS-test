import { NextResponse } from 'next/server'

const allowedOrigins = process.env.NODE_ENV === "production" 
    ? ['https://www.plant-store.ru', 'https://plant-store.ru']
    : ['http://localhost:3000']

//auth apply---------
// export {default} from 'next-auth/middleware'
// export const config = {matcher: ['/catalog', '/dashboard']}
//-------------------

export function middleware(request: Request) {

    const origin = request.headers.get('origin')
    console.log('origin', origin)

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
         
    // }

    console.log('Middleware')
    
    console.log(request.method)
    console.log(request.url)
    
    
    
    return NextResponse.next()
}

