export default function Example() {
    return (
      <>
        <main className="grid min-h-full place-items-center bg-background px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="text-base font-semibold text-primaryBlue">404</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-5xl">Restaurant introuvable.</h1>
            <p className="mt-6 text-base leading-7 text-muted-foreground">Désolé, le restaurant que vous cherchez n'est pas disponible ou n'existe pas. Veuillez réessayer plus tard.</p>
            {/* <div className="mt-10 flex items-center justify-center gap-x-6">
              <a href="#" className="text-sm font-semibold text-gray-900">
                Contact support <span aria-hidden="true">&rarr;</span>
              </a>
            </div> */}
          </div>
        </main>
      </>
    )
  }
  