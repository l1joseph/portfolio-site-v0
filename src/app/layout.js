// import { Inter } from "next/font/google";
// import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>{children}</body>
//     </html>
//   );
// }

// This is the root layout component for your Next.js app.
// Learn more: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required


// import { Bricolage_Grotesque } from 'next/font/google'
// import { Space_Mono } from 'next/font/google'
// import { cn } from '@/lib/utils'
// import './globals.css'

// const fontHeading = Bricolage_Grotesque({
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-heading',
// })

// const fontBody = Space_Mono({
//   subsets: ['latin'],
//   weight: ['400', '700'], // Added weight parameter
//   display: 'swap',
//   variable: '--font-body',
// })

// export default function Layout({ children }) {
//   return (
//     <html lang="en">
//       <body
//         className={cn(
//           'antialiased',
//           fontHeading.variable,
//           fontBody.variable
//         )}
//       >
//         {children}
//       </body>
//     </html>
//   )
// }


import { Bricolage_Grotesque } from 'next/font/google'
import { Space_Mono } from 'next/font/google'
import { cn } from '@/lib/utils'
import './globals.css'
import Script from 'next/script'

const fontHeading = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
})

const fontBody = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-body',
})

export const metadata = {
  title: 'Leo Joseph',
  description: 'Leo Builds Stuff',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/leo_favicon.jpeg" type="image/jpeg" />
      </head>
      <body
        className={cn(
          'antialiased',
          fontHeading.variable,
          fontBody.variable
        )}
      >
        {children}
      </body>
    </html>
  )
}