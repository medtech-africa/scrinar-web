import { NextRequest, NextResponse } from 'next/server'

function authMiddleware(req: NextRequest) {
  const userToken = req.cookies.get('token')

  if (!userToken) {
    return NextResponse.rewrite(new URL('/login', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/dashboard/:path*',
}
export default authMiddleware
