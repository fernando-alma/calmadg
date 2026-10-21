/* ──────────────────────────────────────────────────────────────────────────
   CALMA · piezas de diseño compartidas
   Todo el lenguaje visual del sitio sale de acá y de los tokens de
   app/globals.css. Para ajustar el sitio al manual de marca, se cambian
   estos componentes / tokens y no cada sección por separado.
   ────────────────────────────────────────────────────────────────────────── */

import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

/* Título principal de sección (Playfair, una sola escala para todo el sitio) */
export function SectionTitle({
  as: Tag = "h2",
  className,
  children,
}: {
  as?: ElementType
  className?: string
  children: ReactNode
}) {
  return <Tag className={cn("calma-title text-balance", className)}>{children}</Tag>
}

/* Título en mayúsculas con líneas a los costados (Marcas y proyectos, Branding…) */
export function LinedHeading({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-4 sm:gap-10 lg:gap-24", className)}>
      <span className="calma-rule flex-1" aria-hidden="true" />
      <h2 className="calma-label whitespace-nowrap select-none">{children}</h2>
      <span className="calma-rule flex-1" aria-hidden="true" />
    </div>
  )
}

/* Párrafo de apoyo debajo de un título */
export function Lead({ className, children }: { className?: string; children: ReactNode }) {
  return <p className={cn("calma-lead text-pretty", className)}>{children}</p>
}

/* Línea decorativa fina (recurso gráfico de la marca). Se posiciona con className. */
export function DecorLine({ className }: { className?: string }) {
  return <span className={cn("calma-rule absolute block", className)} aria-hidden="true" />
}

/* Botón de la marca: primary (rosa) · secondary (negro con borde) · dark (negro, para usar sobre rosa) */
type CalmaButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: "primary" | "secondary" | "dark"
  size?: "md" | "lg"
  asChild?: boolean
}

export function CalmaButton({ variant = "primary", size = "md", asChild, className, ...props }: CalmaButtonProps) {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(
        "calma-btn",
        `calma-btn--${variant}`,
        size === "lg" ? "h-12 px-7 text-[15px]" : "h-11 px-6 text-sm",
        className,
      )}
      {...props}
    />
  )
}
