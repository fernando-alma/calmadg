"use client"

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react"
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react"
import { LinedHeading } from "@/components/calma/ui"

type Piece = { src: string; w: number; h: number; alt: string }
type Brand = { id: string; name: string; sector: string; pieces: Piece[]; hero?: boolean; row?: boolean }

const img = (file: string, w: number, h: number, alt: string): Piece => ({
  src: `/images/branding/${file}`,
  w,
  h,
  alt,
})

/* The first piece of each brand is the "hero" (full width in its block),
   unless `hero: false`. This order is the one used on mobile (single column). */
const brands: Brand[] = [
  {
    id: "victoria",
    name: "Victoria",
    sector: "Sports Management",
    pieces: [img("victoria-1.webp", 1496, 996, "Papelería, merchandising y redes de Victoria Sports Management")],
  },
  {
    id: "pretoria",
    name: "Pretoria",
    sector: "Estudio y Coworking Jurídico",
    pieces: [
      img("pretoria-1.webp", 951, 547, "Papelería corporativa de Pretoria"),
      img("pretoria-2.webp", 537, 372, "Caja y taza de Pretoria"),
      img("pretoria-3.webp", 537, 617, "Perfil de Instagram de Pretoria"),
      img("pretoria-4.webp", 591, 443, "Cartel institucional de Pretoria"),
      img("pretoria-5.webp", 353, 443, "Tote bag de Pretoria"),
    ],
  },
  {
    id: "mercedes",
    name: "Mercedes Palomeque",
    sector: "Fotografía",
    hero: false, // 6 similar pieces: a 3 + 3 masonry fits better than hero + 5
    pieces: [
      img("mercedes-2.webp", 571, 500, "Hoja membretada y sobres de Mercedes Palomeque"),
      img("mercedes-1.webp", 413, 500, "Tarjetas personales de Mercedes Palomeque"),
      img("mercedes-3.webp", 502, 500, "Perfil de Instagram de Mercedes Palomeque"),
      img("mercedes-4.webp", 413, 491, "Cartel luminoso de Mercedes Palomeque"),
      img("mercedes-5.webp", 571, 491, "Packaging y tarjeta de agradecimiento de Mercedes Palomeque"),
      img("mercedes-6.webp", 502, 491, "Tote bag y taza de Mercedes Palomeque"),
    ],
  },
  {
    id: "kalas",
    name: "Kalas",
    sector: "Viajes y Turismo",
    pieces: [
      img("kalas-1.webp", 1044, 666, "Papelería corporativa de Kalas"),
      img("kalas-2.webp", 447, 389, "Perfil de Instagram de Kalas"),
      img("kalas-3.webp", 447, 271, "Cartel exterior de Kalas"),
      img("kalas-4.webp", 370, 325, "Vaso térmico de Kalas"),
      img("kalas-5.webp", 356, 325, "Cuaderno y bolígrafo de Kalas"),
      img("kalas-6.webp", 382, 325, "Almohada de viaje de Kalas"),
      img("kalas-7.webp", 371, 325, "Bolsa de Kalas"),
    ],
  },
  {
    id: "urs",
    name: "URS",
    sector: "Urban Sport",
    pieces: [
      img("urs-1.webp", 750, 499, "Papelería y piezas de URS Urban Sport"),
      img("urs-2.webp", 301, 499, "Perfil de Instagram de URS Urban Sport"),
      img("urs-3.webp", 435, 499, "Cartel exterior de URS Urban Sport"),
      img("urs-4.webp", 437, 492, "Packaging de URS Urban Sport"),
      img("urs-5.webp", 342, 492, "Etiqueta de prenda de URS Urban Sport"),
      img("urs-6.webp", 265, 492, "Botella deportiva de URS Urban Sport"),
      img("urs-7.webp", 437, 492, "Indumentaria de URS Urban Sport"),
    ],
  },
  {
    id: "xaurua",
    name: "Xaurua",
    sector: "Viajes y Turismo",
    row: true, // only 2 extra pieces: a justified row (same height) avoids cropping
    pieces: [
      img("xaurua-1.webp", 1040, 996, "Papelería y merchandising de Xaurua"),
      img("xaurua-2.webp", 433, 555, "Perfil de Instagram de Xaurua"),
      img("xaurua-3.webp", 433, 433, "Cartel exterior de Xaurua"),
    ],
  },
]

/* Which brands go in which big column, per layout.
   Tuned so the columns end at almost the same height; the small remaining
   difference is absorbed by stretching the pieces (object-cover). */
const LAYOUTS: Record<1 | 2 | 3, string[][]> = {
  3: [
    ["victoria", "urs"],
    ["pretoria", "xaurua"],
    ["mercedes", "kalas"],
  ],
  2: [
    ["victoria", "urs", "xaurua"],
    ["pretoria", "mercedes", "kalas"],
  ],
  1: [brands.map((b) => b.id)],
}

/* Split the non-hero pieces of a brand into 2 inner columns of (almost)
   equal height. Brute force: brands have at most 6 extra pieces. */
type Indexed = { piece: Piece; index: number }
function splitInTwo(pieces: Piece[], offset: number): [Indexed[], Indexed[]] {
  const items = pieces.map((piece, i) => ({ piece, index: i + offset }))
  const n = items.length
  if (n < 2) return [items, []]
  const GAP = 0.05 // approx. vertical gap, relative to the column width
  let best = { diff: Infinity, mask: 1 }
  for (let mask = 1; mask < (1 << n) - 1; mask++) {
    let a = 0
    let b = 0
    items.forEach((it, i) => {
      const r = it.piece.h / it.piece.w + GAP
      if (mask & (1 << i)) a += r
      else b += r
    })
    const diff = Math.abs(a - b)
    if (diff < best.diff - 1e-9) best = { diff, mask }
  }
  const left = items.filter((_, i) => best.mask & (1 << i))
  const right = items.filter((_, i) => !(best.mask & (1 << i)))
  return left[0].index < right[0].index ? [left, right] : [right, left]
}

const brandIndex = Object.fromEntries(brands.map((b, i) => [b.id, i]))

/* Precomputed layout per brand. Heights are in "block widths" and are used as
   flex-grow factors, so any extra height needed to square the gallery is spread
   proportionally across all pieces (a few % each) instead of on just one. */
const ratio = (p: Piece) => p.h / p.w
const plans = brands.map((b) => {
  const hasHero = b.hero !== false
  const hero = hasHero ? b.pieces[0] : null
  const [left, right] = splitInTwo(b.pieces.slice(hasHero ? 1 : 0), hasHero ? 1 : 0)
  const colH = (c: Indexed[]) => c.reduce((s, it) => s + ratio(it.piece) + 0.05, 0)
  const rest = [...left, ...right].sort((x, y) => x.index - y.index)
  const innerH = b.row
    ? 1 / rest.reduce((s, it) => s + 1 / ratio(it.piece), 0)
    : Math.max(colH(left), colH(right)) / 2
  const heroH = hero ? ratio(hero) : 0
  return { hero, left, right, rest, row: !!b.row, heroH, innerH, blockH: 0.12 + heroH + innerH }
})

/* Number of big columns: 1 (mobile) · 2 (md) · 3 (xl) */
function subscribe(cb: () => void) {
  const queries = [window.matchMedia("(min-width: 768px)"), window.matchMedia("(min-width: 1280px)")]
  queries.forEach((q) => q.addEventListener("change", cb))
  return () => queries.forEach((q) => q.removeEventListener("change", cb))
}
function getColumns(): 1 | 2 | 3 {
  if (window.matchMedia("(min-width: 1280px)").matches) return 3
  if (window.matchMedia("(min-width: 768px)").matches) return 2
  return 1
}
const useColumns = () => useSyncExternalStore(subscribe, getColumns, () => 3 as const)

type Open = { brand: number; piece: number } | null

function PieceButton({
  piece,
  grow,
  flex,
  onOpen,
}: {
  piece: Piece
  grow?: number
  flex?: string
  onOpen: () => void
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="brand-piece group"
      style={{ aspectRatio: `${piece.w} / ${piece.h}`, ...(flex ? { flex } : { flexGrow: grow }) }}
      aria-label={`Ver en grande: ${piece.alt}`}
    >
      <img
        src={piece.src}
        alt={piece.alt}
        width={piece.w}
        height={piece.h}
        loading="lazy"
        decoding="async"
        className="select-none"
        draggable={false}
      />
      <span className="brand-piece__veil" aria-hidden="true">
        <Maximize2 className="h-4 w-4" />
      </span>
    </button>
  )
}

export function BrandingGallery() {
  const [open, setOpen] = useState<Open>(null)
  const columns = useColumns()
  const galleryRef = useRef<HTMLDivElement>(null)
  const touchX = useRef<number | null>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const openerRef = useRef<HTMLElement | null>(null)
  const isOpen = open !== null

  /* Focus: al abrir va al botón cerrar; al cerrar vuelve a la pieza que lo abrió */
  useEffect(() => {
    if (!isOpen) return
    openerRef.current = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    return () => openerRef.current?.focus()
  }, [isOpen])

  /* Reveal brand blocks as they enter the viewport */
  useEffect(() => {
    const root = galleryRef.current
    if (!root || !("IntersectionObserver" in window)) return
    root.dataset.reveal = "ready"
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible")
            io.unobserve(e.target)
          }
        })
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    )
    root.querySelectorAll(".brand-block:not(.is-visible)").forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [columns])

  const step = useCallback((dir: 1 | -1) => {
    setOpen((o) => {
      if (!o) return o
      const n = brands[o.brand].pieces.length
      return { brand: o.brand, piece: (o.piece + dir + n) % n }
    })
  }, [])

  /* Keyboard + scroll lock while the lightbox is open */
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null)
      if (e.key === "ArrowRight") step(1)
      if (e.key === "ArrowLeft") step(-1)
      /* Mantener el Tab dentro del lightbox */
      if (e.key === "Tab" && dialogRef.current) {
        const items = Array.from(dialogRef.current.querySelectorAll<HTMLElement>("button:not([disabled])")).filter(
          (el) => el.offsetParent !== null,
        )
        if (!items.length) return
        const first = items[0]
        const last = items[items.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        } else if (!dialogRef.current.contains(document.activeElement)) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener("keydown", onKey)
    }
  }, [open, step])

  const current = open ? brands[open.brand] : null
  const currentPiece = open && current ? current.pieces[open.piece] : null

  return (
    <section id="branding" className="bg-dark-wall relative w-full overflow-hidden text-white pt-10 sm:pt-12 pb-20 sm:pb-28">
      <LinedHeading className="mb-10 sm:mb-14">Branding</LinedHeading>

      {/* One big "window" (straight edges) full of windows of different sizes.
          Big columns stretch to the same height; inside, every piece can grow
          a little (object-cover) so all bottoms line up. */}
      <div ref={galleryRef} className="brand-gallery mx-auto max-w-[1600px] px-4 sm:px-8 lg:px-12 flex gap-6 lg:gap-8">
        {LAYOUTS[columns].map((col, c) => (
          <div key={c} className="flex-1 min-w-0 flex flex-col gap-10 sm:gap-12">
            {col.map((id) => {
              const b = brandIndex[id]
              const brand = brands[b]
              const { hero, left, right, rest, row, heroH, innerH, blockH } = plans[b]
              return (
                <article key={brand.id} className="brand-block flex flex-col shrink-0" style={{ flexGrow: blockH }}>
                  <header className="brand-meta flex-none flex items-baseline justify-between gap-4 mb-3 sm:mb-4">
                    <div className="flex items-baseline gap-3 shrink-0">
                      <span className="h-px w-6 bg-calma-pink self-center shrink-0" aria-hidden="true" />
                      <h3 className="font-serif text-lg sm:text-xl font-semibold whitespace-nowrap">{brand.name}</h3>
                    </div>
                    <p className="min-w-0 truncate font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-white/55 text-right">
                      {brand.sector}
                    </p>
                  </header>

                  {hero && (
                    <PieceButton piece={hero} grow={heroH} onOpen={() => setOpen({ brand: b, piece: 0 })} />
                  )}

                  {row && rest.length > 0 && (
                    <div
                      className={`flex shrink-0 gap-2 sm:gap-3 ${hero ? "mt-2 sm:mt-3" : ""}`}
                      style={{ flexGrow: innerH }}
                    >
                      {rest.map(({ piece, index }) => (
                        <PieceButton
                          key={piece.src}
                          piece={piece}
                          flex={`${piece.w / piece.h} 1 0%`}
                          onOpen={() => setOpen({ brand: b, piece: index })}
                        />
                      ))}
                    </div>
                  )}

                  {!row && left.length > 0 && (
                    <div
                      className={`flex shrink-0 gap-2 sm:gap-3 ${hero ? "mt-2 sm:mt-3" : ""}`}
                      style={{ flexGrow: innerH }}
                    >
                      {[left, right].map((inner, k) =>
                        inner.length > 0 ? (
                          <div key={k} className="flex-1 min-w-0 flex flex-col gap-2 sm:gap-3">
                            {inner.map(({ piece, index }) => (
                              <PieceButton
                                key={piece.src}
                                piece={piece}
                                grow={ratio(piece)}
                                onOpen={() => setOpen({ brand: b, piece: index })}
                              />
                            ))}
                          </div>
                        ) : null,
                      )}
                    </div>
                  )}
                </article>
              )
            })}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {open && current && currentPiece && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${current.name}: ${currentPiece.alt}`}
          className="fixed inset-0 z-[100] flex flex-col bg-black/92 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setOpen(null)}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return
            const dx = e.changedTouches[0].clientX - touchX.current
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1)
            touchX.current = null
          }}
        >
          {/* Top bar */}
          <div
            className="flex items-center justify-between gap-4 px-4 sm:px-8 pt-4 sm:pt-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="min-w-0">
              <p className="font-serif text-lg sm:text-2xl font-semibold truncate">{current.name}</p>
              <p className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.22em] text-white/55">
                {current.sector}
              </p>
            </div>
            <div className="flex items-center gap-3 sm:gap-5">
              <span className="font-sans text-xs sm:text-sm tabular-nums text-white/70">
                {String(open.piece + 1).padStart(2, "0")} / {String(current.pieces.length).padStart(2, "0")}
              </span>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(null)}
                className="h-10 w-10 flex items-center justify-center rounded-full border border-white/15 hover:border-calma-pink hover:text-calma-pink transition-colors"
                aria-label="Cerrar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Image stage (always the full, uncropped piece) */}
          <div className="relative flex-1 min-h-0 flex items-center justify-center px-4 sm:px-20 py-4 sm:py-6">
            <img
              key={currentPiece.src}
              src={currentPiece.src}
              alt={currentPiece.alt}
              width={currentPiece.w}
              height={currentPiece.h}
              onClick={(e) => e.stopPropagation()}
              className="max-h-full max-w-full w-auto h-auto object-contain shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)] animate-in fade-in zoom-in-95 duration-500 select-none"
              draggable={false}
            />

            {current.pieces.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    step(-1)
                  }}
                  className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 h-11 w-11 hidden sm:flex items-center justify-center rounded-full border border-white/15 bg-black/40 hover:border-calma-pink hover:text-calma-pink transition-colors"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    step(1)
                  }}
                  className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 h-11 w-11 hidden sm:flex items-center justify-center rounded-full border border-white/15 bg-black/40 hover:border-calma-pink hover:text-calma-pink transition-colors"
                  aria-label="Siguiente"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails of the same brand */}
          {current.pieces.length > 1 && (
            <div
              className="flex justify-center gap-2 px-4 pb-5 sm:pb-8 overflow-x-auto no-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              {current.pieces.map((p, i) => (
                <button
                  key={p.src}
                  type="button"
                  onClick={() => setOpen({ brand: open.brand, piece: i })}
                  className={`shrink-0 h-12 sm:h-16 overflow-hidden border transition-all duration-300 ${
                    i === open.piece ? "border-calma-pink opacity-100" : "border-transparent opacity-45 hover:opacity-80"
                  }`}
                  aria-label={`Ver ${p.alt}`}
                >
                  <img src={p.src} alt="" className="h-full w-auto object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  )
}
