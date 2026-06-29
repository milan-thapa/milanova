'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { HeroSkeleton } from '@/components/shared/Skeleton'

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

const avatars = [
  { src: '/avatars/1.jpg', alt: 'Client 1', fallback: 'hsl(14,70%,55%)' },
  { src: '/avatars/2.jpg', alt: 'Client 2', fallback: 'hsl(258,60%,55%)' },
  { src: '/avatars/3.jpg', alt: 'Client 3', fallback: 'hsl(158,55%,40%)' },
  { src: '/avatars/4.jpg', alt: 'Client 4', fallback: 'hsl(45,90%,55%)' },
]

// Wave definitions: each line starts at the button pinch point
// and fans out to the bottom-left or bottom-right
// spreadAngle controls steepness, curl controls arc depth
const WAVE_DEFS = [
  // LEFT fans  (spread from tight to wide going down-left)
  { side: 'L', spread: 0.18, curl: 0.65, oy: -10, w: 1.2, wa: 10, wf: 0.008, wp: 0.0, ws: 0.012 },
  { side: 'L', spread: 0.32, curl: 0.75, oy: -6,  w: 1.1, wa: 12, wf: 0.010, wp: 0.8, ws: 0.014 },
  { side: 'L', spread: 0.48, curl: 0.85, oy: -3,  w: 1.0, wa: 14, wf: 0.012, wp: 1.6, ws: 0.016 },
  { side: 'L', spread: 0.62, curl: 0.92, oy:  0,  w: 0.9, wa: 13, wf: 0.011, wp: 2.4, ws: 0.015 },
  { side: 'L', spread: 0.78, curl: 0.98, oy:  3,  w: 0.8, wa: 12, wf: 0.013, wp: 3.2, ws: 0.017 },
  { side: 'L', spread: 0.92, curl: 1.02, oy:  6,  w: 0.7, wa: 10, wf: 0.012, wp: 1.2, ws: 0.016 },
  { side: 'L', spread: 1.08, curl: 1.05, oy:  9,  w: 0.6, wa: 9,  wf: 0.011, wp: 2.0, ws: 0.015 },
  { side: 'L', spread: 1.25, curl: 1.08, oy: 12,  w: 0.5, wa: 8,  wf: 0.010, wp: 2.8, ws: 0.014 },
  // RIGHT fans
  { side: 'R', spread: 0.18, curl: 0.65, oy: -10, w: 1.2, wa: 10, wf: 0.008, wp: 0.3, ws: 0.012 },
  { side: 'R', spread: 0.32, curl: 0.75, oy: -6,  w: 1.1, wa: 12, wf: 0.010, wp: 1.1, ws: 0.014 },
  { side: 'R', spread: 0.48, curl: 0.85, oy: -3,  w: 1.0, wa: 14, wf: 0.012, wp: 1.9, ws: 0.016 },
  { side: 'R', spread: 0.62, curl: 0.92, oy:  0,  w: 0.9, wa: 13, wf: 0.011, wp: 2.7, ws: 0.015 },
  { side: 'R', spread: 0.78, curl: 0.98, oy:  3,  w: 0.8, wa: 12, wf: 0.013, wp: 3.5, ws: 0.017 },
  { side: 'R', spread: 0.92, curl: 1.02, oy:  6,  w: 0.7, wa: 10, wf: 0.012, wp: 1.5, ws: 0.016 },
  { side: 'R', spread: 1.08, curl: 1.05, oy:  9,  w: 0.6, wa: 9,  wf: 0.011, wp: 2.3, ws: 0.015 },
  { side: 'R', spread: 1.25, curl: 1.08, oy: 12,  w: 0.5, wa: 8,  wf: 0.010, wp: 3.1, ws: 0.014 },
] as const

const STEPS = 150

export default function Hero() {
  const [settings, setSettings] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/settings')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch')
        return res.json()
      })
      .then(data => {
        if (data && typeof data === 'object' && !data.error) {
          setSettings(data)
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])
  const canvasRef   = useRef<HTMLCanvasElement>(null)
  const btnRef      = useRef<HTMLAnchorElement>(null)
  const hoveredRef  = useRef(false)
  const fireRef     = useRef(false)   // pulse: set true to start a lightning run
  const [btnHovered, setBtnHovered] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let W = 0, H = 0, animId = 0, T = 0

    function resize() {
      if (!canvas) return
      W = canvas.width  = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    // Lightning state — single sweep from x=0 to x=W
    const bolt = { x: -0.05, active: false }

    function launchBolt() {
      bolt.x      = -0.05
      bolt.active = true
    }

    function getBtnRect() {
      const btn = btnRef.current
      if (!btn || !canvas) return { lx: W * 0.35, rx: W * 0.65, cy: H * 0.62 }
      const cr = canvas.getBoundingClientRect()
      const br = btn.getBoundingClientRect()
      return {
        lx: br.left  - cr.left,
        rx: br.right - cr.left,
        cy: br.top   - cr.top + br.height / 2,
      }
    }

    // Build sampled points for one wave using a quadratic bezier
    function buildPts(
      def: typeof WAVE_DEFS[number],
      lx: number, rx: number, cy: number
    ): [number, number][] {
      const isL = def.side === 'L'
      // start: pinch point at button edge
      const sx = isL ? lx : rx
      const sy = cy + def.oy

      // end: sweep far off canvas bottom-left or bottom-right
      const ex = isL ? W * -0.08 : W * 1.08
      const ey = H * 1.05

      // bezier control point creates the arc
      const cpx = isL
        ? sx - Math.cos(def.spread) * W * def.curl
        : sx + Math.cos(def.spread) * W * def.curl
      const cpy = sy + Math.sin(def.spread) * H * def.curl

      const pts: [number, number][] = []
      for (let i = 0; i <= STEPS; i++) {
        const u   = i / STEPS
        const inv = 1 - u
        // quadratic bezier
        const bx  = inv * inv * sx + 2 * inv * u * cpx + u * u * ex
        const by  = inv * inv * sy + 2 * inv * u * cpy + u * u * ey
        // wobble perpendicular to arc — grows with u so the origin stays fixed
        const wob = Math.sin(u * def.wf * W + def.wp + T * def.ws) * def.wa * u
        pts.push([bx + (isL ? -wob : wob) * 0.4, by + wob * 0.6])
      }
      return pts
    }

    function strokePts(pts: [number,number][], style: string | CanvasGradient, lw: number, blur = 0) {
      ctx.beginPath()
      pts.forEach(([x, y], i) => i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y))
      ctx.strokeStyle  = style
      ctx.lineWidth    = lw
      ctx.shadowColor  = 'rgba(181,225,42,0.9)'
      ctx.shadowBlur   = blur
      ctx.stroke()
      ctx.shadowBlur   = 0
    }

    function drawBoltOnWave(def: typeof WAVE_DEFS[number], pts: [number,number][]) {
      // The lightning bolt is at canvas x = bolt.x * W
      // We illuminate the segment of this wave near that x value
      const boltX    = bolt.x * W
      const trailPx  = W * 0.22   // how far the trail stretches behind
      const leadPx   = W * 0.04   // tiny lead ahead

      // Collect points whose x falls in [boltX - trail, boltX + lead]
      const seg = pts.filter(([px]) => px >= boltX - trailPx && px <= boltX + leadPx)
      if (seg.length < 2) return

      const [x0, y0] = seg[0]
      const [xe, ye] = seg[seg.length - 1]

      // Gradient: dim tail → bright head (always left→right)
      const grad = ctx.createLinearGradient(x0, y0, xe, ye)
      grad.addColorStop(0,    'rgba(181,225,42,0.0)')
      grad.addColorStop(0.35, 'rgba(181,225,42,0.3)')
      grad.addColorStop(0.60, 'rgba(210,255,60,0.75)')
      grad.addColorStop(0.85, 'rgba(240,255,100,0.95)')
      grad.addColorStop(1,    'rgba(255,255,255,1.0)')

      strokePts(seg, grad, def.w * 4.0, 24)
    }

    function frame() {
      animId = requestAnimationFrame(frame)
      ctx.clearRect(0, 0, W, H)
      T++

      // Check if we need to launch a new bolt
      if (fireRef.current) {
        fireRef.current = false
        launchBolt()
      }

      // Advance bolt
      if (bolt.active) {
        bolt.x += 0.020   // speed: full width in ~55 frames ≈ 0.9s
        if (bolt.x > 1.08) {
          bolt.active = false
          // if still hovered, re-launch after short pause
          if (hoveredRef.current) {
            setTimeout(() => {
              if (hoveredRef.current) launchBolt()
            }, 80)
          }
        }
      }

      const { lx, rx, cy } = getBtnRect()

      for (const def of WAVE_DEFS) {
        const pts = buildPts(def, lx, rx, cy)
        // base dim line
        strokePts(pts, `rgba(181,225,42,${hoveredRef.current ? 0.10 : 0.15})`, def.w)
        // bolt glow on top
        if (bolt.active) drawBoltOnWave(def, pts)
      }
    }

    frame()
    return () => { cancelAnimationFrame(animId); ro.disconnect() }
  }, [])

  const onEnter = () => {
    hoveredRef.current = true
    fireRef.current    = true   // triggers launchBolt() on next frame
    setBtnHovered(true)
  }
  const onLeave = () => {
    hoveredRef.current = false
    setBtnHovered(false)
  }

  return (
    <section
      className="relative min-h-[85vh] sm:min-h-[90vh] md:min-h-[95vh] flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 rounded-b-[40px] sm:rounded-b-[60px] lg:rounded-b-[80px]"
      style={{ backgroundColor: '#082E23' }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {loading ? (
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6">
          <HeroSkeleton />
        </div>
      ) : !settings ? (
        <div className="relative z-10 text-center">
          <p className="text-white/60">No hero content configured. Please add settings via admin panel.</p>
        </div>
      ) : (
        <>
          {/* Floating WhatsApp */}
          {settings.whatsappUrl && (
            <a
              href={settings.whatsappUrl}
              target="_blank" rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform duration-200"
              style={{ backgroundColor: '#25D366' }}
            >
              <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </a>
          )}

          <motion.div
            variants={stagger} initial="hidden" animate="visible"
            className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center"
          >
            {/* Badge */}
            {settings.heroBadgeText && (
              <motion.div variants={fadeUp} className="mb-8 sm:mb-10">
                <div className="inline-flex items-center gap-2 sm:gap-3 rounded-full px-3 sm:px-4 py-2 sm:py-2.5 border"
                  style={{ backgroundColor: 'rgba(255,255,255,0.07)', borderColor: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(8px)' }}>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#B5E12A]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <p className="text-xs sm:text-sm font-medium" style={{ color: 'rgba(255,255,255,0.85)' }}>
                    {settings.heroBadgeText}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Headline */}
            {settings.heroHeadline && (
              <motion.h1 variants={fadeUp} className="font-bold leading-tight mb-4 sm:mb-5"
                style={{ fontSize: 'clamp(1.8rem, 5vw, 4rem)', color: '#ffffff' }}>
                {settings.heroHeadline}
              </motion.h1>
            )}

            {/* Tags */}
            {settings.heroTags && (
              <motion.p variants={fadeUp} className="text-sm sm:text-base md:text-lg font-medium mb-10 sm:mb-14 tracking-wide"
                style={{ color: 'rgba(255,255,255,0.60)' }}>
                {settings.heroTags}
              </motion.p>
            )}

            {/* CTA */}
            {settings.heroCtaText && settings.heroCtaUrl && (
              <motion.div variants={fadeUp}>
                <a
                  ref={btnRef}
                  href={settings.heroCtaUrl}
                  target="_blank" rel="noopener noreferrer"
                  onMouseEnter={onEnter}
                  onMouseLeave={onLeave}
                  className="inline-flex items-center gap-2 sm:gap-3 rounded-full font-bold text-base sm:text-lg px-5 sm:px-7 py-3 sm:py-4 active:scale-[0.97] select-none"
                  style={{
                    backgroundColor: '#B5E12A',
                    color: '#0D1F1A',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'transform 0.2s ease, filter 0.2s ease',
                    transform: btnHovered ? 'scale(1.04)' : 'scale(1)',
                    filter:    btnHovered ? 'brightness(1.10)' : 'brightness(1)',
                  }}
                >
                  <span aria-hidden="true" style={{
                    position:   'absolute',
                    top: 0, left: 0,
                    width:      '45%',
                    height:     '100%',
                    background: 'linear-gradient(100deg, transparent 0%, rgba(255,255,255,0.55) 50%, transparent 100%)',
                    transform:  btnHovered ? 'translateX(260%)' : 'translateX(-120%)',
                    transition: btnHovered ? 'transform 0.55s cubic-bezier(0.4,0,0.2,1)' : 'none',
                    pointerEvents: 'none',
                  }} />
                  <span className="text-sm sm:text-base">{settings.heroCtaText}</span>
                </a>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </section>
  )
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}