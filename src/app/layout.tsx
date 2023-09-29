import './globals.css'
import "react-loading-skeleton/dist/skeleton.css"
import { StoreProvider } from './redux/Provider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Vin commerce</title>
        <meta name='description' content='Your evergreen online marketplace!'/>
      </head>
      <body>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  )
}
