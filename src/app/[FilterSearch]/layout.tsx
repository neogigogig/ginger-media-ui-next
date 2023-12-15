
export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        
           
         
          <div style={{minHeight:'30vh'}}>{children}</div>
        
      </html>
    )
  }