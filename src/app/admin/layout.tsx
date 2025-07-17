PS C:\Users\MILES\Desktop\belluxe-atelier> npm run dev

> next-ecommerce-belluxe-atelier@0.1.0 dev
> next dev

 ⚠ Port 3000 is in use, trying 3001 instead.
  ▲ Next.js 14.2.7
  - Local:        http://localhost:3001
  - Environments: .env

 ✓ Starting...
 ✓ Ready in 29.4s
 ○ Compiling / ...
<w> [webpack.cache.PackFileCacheStrategy] Caching failed for pack: Error: ENOENT: no such file or directory, rename 'C:\Users\MILES\Desktop\belluxe-atelier\.next\cache\webpack\server-development\0.pack.gz_' -> 'C:\Users\MILES\Desktop\belluxe-atelier\.next\cache\webpack\server-development\0.pack.gz'
 ✓ Compiled / in 147s (1622 modules)
 ⨯ TypeError: Failed to parse URL from /api/products
    at getProducts (./src/app/page.tsx:19:23)
    at Home (./src/app/page.tsx:28:28)
    at stringify (<anonymous>)
digest: "3590745840"
Cause: TypeError: Invalid URL
    at new URL (node:internal/url:818:25)
    at new Request (node:internal/deps/undici/undici:9578:25)
    at C (C:\Users\MILES\Desktop\belluxe-atelier\node_modules\next\dist\compiled\next-server\app-page.runtime.dev.js:35:340267)
    at doOriginalFetch (webpack-internal:///(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js:440:24)
    at eval (webpack-internal:///(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js:589:24)
    at eval (webpack-internal:///(rsc)/./node_modules/next/dist/server/lib/trace/tracer.js:134:36)
    at NoopContextManager.with (webpack-internal:///(rsc)/./node_modules/next/dist/compiled/@opentelemetry/api/index.js:1:7062)
    at ContextAPI.with (webpack-internal:///(rsc)/./node_modules/next/dist/compiled/@opentelemetry/api/index.js:1:518)
    at NoopTracer.startActiveSpan (webpack-internal:///(rsc)/./node_modules/next/dist/compiled/@opentelemetry/api/index.js:1:18093)
    at ProxyTracer.startActiveSpan (webpack-internal:///(rsc)/./node_modules/next/dist/compiled/@opentelemetry/api/index.js:1:18854)
    at eval (webpack-internal:///(rsc)/./node_modules/next/dist/server/lib/trace/tracer.js:116:103)
    at NoopContextManager.with (webpack-internal:///(rsc)/./node_modules/next/dist/compiled/@opentelemetry/api/index.js:1:7062)
    at ContextAPI.with (webpack-internal:///(rsc)/./node_modules/next/dist/compiled/@opentelemetry/api/index.js:1:518)
    at NextTracerImpl.trace (webpack-internal:///(rsc)/./node_modules/next/dist/server/lib/trace/tracer.js:116:28)
    at patched (webpack-internal:///(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js:233:41)
    at getProducts (webpack-internal:///(rsc)/./src/app/page.tsx:19:23)    at Home (webpack-internal:///(rsc)/./src/app/page.tsx:28:28)       
    at e_ (C:\Users\MILES\Desktop\belluxe-atelier\node_modules\next\dist\compiled\next-server\app-page.runtime.dev.js:35:263963)
    at e (C:\Users\MILES\Desktop\belluxe-atelier\node_modules\next\dist\compiled\next-server\app-page.runtime.dev.js:35:268095)
    at eF (C:\Users\MILES\Desktop\belluxe-atelier\node_modules\next\dist\compiled\next-server\app-page.runtime.dev.js:35:268583)
    at eq (C:\Users\MILES\Desktop\belluxe-atelier\node_modules\next\dist\compiled\next-server\app-page.runtime.dev.js:35:274547)
    at ej (C:\Users\MILES\Desktop\belluxe-atelier\node_modules\next\dist\compiled\next-server\app-page.runtime.dev.js:35:264791)
    at e_ (C:\Users\MILES\Desktop\belluxe-atelier\node_modules\next\dist\compiled\next-server\app-page.runtime.dev.js:35:263833)
    at e (C:\Users\MILES\Desktop\belluxe-atelier\node_modules\next\dist\compiled\next-server\app-page.runtime.dev.js:35:268095)
    at eF (C:\Users\MILES\Desktop\belluxe-atelier\node_modules\next\dist\compiled\next-server\app-page.runtime.dev.js:35:268583)
    at C:\Users\MILES\Desktop\belluxe-atelier\node_modules\next\dist\compiled\next-server\app-page.runtime.dev.js:35:265814
    at Array.toJSON (C:\Users\MILES\Desktop\belluxe-atelier\node_modules\next\dist\compiled\next-server\app-page.runtime.dev.js:35:266278)    
    at stringify (<anonymous>)
    at eq (C:\Users\MILES\Desktop\belluxe-atelier\node_modules\next\dist\compiled\next-server\app-page.runtime.dev.js:35:274646)
    at eJ (C:\Users\MILES\Desktop\belluxe-atelier\node_modules\next\dist\compiled\next-server\app-page.runtime.dev.js:35:275164)
    at Timeout._onTimeout (C:\Users\MILES\Desktop\belluxe-atelier\node_modules\next\dist\compiled\next-server\app-page.runtime.dev.js:35:264951)
    at listOnTimeout (node:internal/timers:594:17)
    at process.processTimers (node:internal/timers:529:7) {
  code: 'ERR_INVALID_URL',
  input: '/api/products'
}
 ⨯ TypeError: Failed to parse URL from /api/products
    at getProducts (./src/app/page.tsx:19:23)
    at Home (./src/app/page.tsx:28:28)
    at stringify (<anonymous>)
digest: "3590745840"
Cause: TypeError: Invalid URL
    at new URL (node:internal/url:818:25)
    at new Request (node:internal/deps/undici/undici:9578:25)
    at C (C:\Users\MILES\Desktop\belluxe-atelier\node_modules\next\dist\compiled\next-server\app-page.runtime.dev.js:35:340267)
    at doOriginalFetch (webpack-internal:///(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js:440:24)
    at eval (webpack-internal:///(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js:589:24)
    at eval (webpack-internal:///(rsc)/./node_modules/next/dist/server/lib/trace/tracer.js:134:36)
    at NoopContextManager.with (webpack-internal:///(rsc)/./node_modules/next/dist/compiled/@opentelemetry/api/index.js:1:7062)
    at ContextAPI.with (webpack-internal:///(rsc)/./node_modules/next/dist/compiled/@opentelemetry/api/index.js:1:518)
    at NoopTracer.startActiveSpan (webpack-internal:///(rsc)/./node_modules/next/dist/compiled/@opentelemetry/api/index.js:1:18093)
    at ProxyTracer.startActiveSpan (webpack-internal:///(rsc)/./node_modules/next/dist/compiled/@opentelemetry/api/index.js:1:18854)
    at eval (webpack-internal:///(rsc)/./node_modules/next/dist/server/lib/trace/tracer.js:116:103)
    at NoopContextManager.with (webpack-internal:///(rsc)/./node_modules/next/dist/compiled/@opentelemetry/api/index.js:1:7062)
    at ContextAPI.with (webpack-internal:///(rsc)/./node_modules/next/dist/compiled/@opentelemetry/api/index.js:1:518)
    at NextTracerImpl.trace (webpack-internal:///(rsc)/./node_modules/next/dist/server/lib/trace/tracer.js:116:28)
    at patched (webpack-internal:///(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js:233:41)
    at getProducts (webpack-internal:///(rsc)/./src/app/page.tsx:19:23)    at Home (webpack-internal:///(rsc)/./src/app/page.tsx:28:28)       
    at e_ (C:\Users\MILES\Desktop\belluxe-atelier\node_modules\next\dist\compiled\next-server\app-page.runtime.dev.js:35:263963)
    at e (C:\Users\MILES\Desktop\belluxe-atelier\node_modules\next\dist\compiled\next-server\app-page.runtime.dev.js:35:268095)
    at eF (C:\Users\MILES\Desktop\belluxe-atelier\node_modules\next\dist\compiled\next-server\app-page.runtime.dev.js:35:268583)
    at eq (C:\Users\MILES\Desktop\belluxe-atelier\node_modules\next\dist\compiled\next-server\app-page.runtime.dev.js:35:274547)
    at ej (C:\Users\MILES\Desktop\belluxe-atelier\node_modules\next\dist\compiled\next-server\app-page.runtime.dev.js:35:264791)
    at e_ (C:\Users\MILES\Desktop\belluxe-atelier\node_modules\next\dist\compiled\next-server\app-page.runtime.dev.js:35:263833)
    at e (C:\Users\MILES\Desktop\belluxe-atelier\node_modules\next\dist\compiled\next-server\app-page.runtime.dev.js:35:268095)
    at eF (C:\Users\MILES\Desktop\belluxe-atelier\node_modules\next\dist\compiled\next-server\app-page.runtime.dev.js:35:268583)
    at C:\Users\MILES\Desktop\belluxe-atelier\node_modules\next\dist\compiled\next-server\app-page.runtime.dev.js:35:265814
    at Array.toJSON (C:\Users\MILES\Desktop\belluxe-atelier\node_modules\next\dist\compiled\next-server\app-page.runtime.dev.js:35:266278)    
    at stringify (<anonymous>)
    at eq (C:\Users\MILES\Desktop\belluxe-atelier\node_modules\next\dist\compiled\next-server\app-page.runtime.dev.js:35:274646)
    at eJ (C:\Users\MILES\Desktop\belluxe-atelier\node_modules\next\dist\compiled\next-server\app-page.runtime.dev.js:35:275164)
    at Timeout._onTimeout (C:\Users\MILES\Desktop\belluxe-atelier\node_modules\next\dist\compiled\next-server\app-page.runtime.dev.js:35:264951)
    at listOnTimeout (node:internal/timers:594:17)
    at process.processTimers (node:internal/timers:529:7) {
  code: 'ERR_INVALID_URL',
  input: '/api/products'
}
 GET / 200 in 14664ms
 ○ Compiling /favicon.ico ...
 ✓ Compiled /favicon.ico in 2.7s (862 modules)
 GET /favicon.ico 200 in 3558ms
 GET /favicon.ico 200 in 35ms
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/admin" className="text-xl font-bold text-gray-900">
                Belluxe Admin
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/admin/products" 
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Products
              </Link>
              <Link 
                href="/" 
                className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                View Site
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
