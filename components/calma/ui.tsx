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

/* Lista con línea vertical rosa y puntos (Calma en números, Cómo trabajamos) */
export function PinkTimeline({
  items,
  ordered = false,
  className,
}: {
  items: string[]
  ordered?: boolean
  className?: string
}) {
  const List = ordered ? "ol" : "ul"
  return (
    <List className={cn("relative space-y-3 sm:space-y-3.5 pl-8 sm:pl-9", className)}>
      <span className="absolute left-[5px] top-3 bottom-3 w-[2px] bg-calma-pink" aria-hidden="true" />
      {items.map((item) => (
        <li key={item} className="calma-list-item relative">
          <span
            className="absolute -left-8 sm:-left-9 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-calma-pink"
            aria-hidden="true"
          />
          {item}
        </li>
      ))}
    </List>
  )
}

/* Botón de la marca: primary (rosa) · secondary (negro con borde) · ghost-line */
type CalmaButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: "primary" | "secondary"
  size?: "md" | "lg"
  asChild?: boolean
}

export function CalmaButton({ variant = "primary", size = "md", asChild, className, ...props }: CalmaButtonProps) {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(
        "calma-btn",
        variant === "primary" ? "calma-btn--primary" : "calma-btn--secondary",
        size === "lg" ? "h-12 px-7 text-[15px]" : "h-11 px-6 text-sm",
        className,
      )}
      {...props}
    />
  )
}
