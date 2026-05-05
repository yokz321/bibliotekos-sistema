export function Footer() {
  return (
    <footer className="mt-auto border-t bg-background">
      <div className="container mx-auto max-w-screen-xl py-6 md:py-0 md:h-16 flex flex-col items-center justify-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Titas Eidikonis
        </p>
      </div>
    </footer>
  )
}
