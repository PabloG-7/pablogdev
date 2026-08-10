
// Dot Cursor — Global
// Cursor personalizado para o site inteiro.

"use client";

import * as React from "react";
import { useEffect, useRef } from "react";

type Props = {
  label?: boolean;
  labelText?: string;
  labelColor?: string;
  labelFont?: React.CSSProperties;
  headColor?: string;
  trailColor?: string;
  size?: number;
  trailLength?: number;
  trailThickness?: number;
  style?: React.CSSProperties;
};

const FOLLOW_TAU = 0.01;
const SNAPPINESS = 10;
const BORDER_WIDTH = 2;
const HOVER_SCALE = 3.3;

const DEFAULTS = {
    label: false,
    labelText: "HOVER ME",
    labelColor: "#FFFFFF",
    headColor: "#F3C316",
    trailColor: "#F3C316",
    size: 20,
    trailLength: 8,
    trailThickness: 10,
};

function withAlpha(input: string, alpha: number) {
  const a = Math.max(0, Math.min(1, alpha));

  if (typeof input !== "string") {
    return `rgba(0,0,0,${a})`;
  }

  const s = input.trim();

  const hex = s.match(/^#([0-9a-f]{3,8})$/i);

  if (hex) {
    let h = hex[1];

    if (h.length === 3 || h.length === 4) {
      h = h
        .split("")
        .map((c) => c + c)
        .join("");
    }

    const n = parseInt(h.slice(0, 6), 16);

    if (!Number.isFinite(n)) {
      return `rgba(0,0,0,${a})`;
    }

    return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
  }

  const rgb = s.match(/^rgba?\(([^)]+)\)/i);

  if (rgb) {
    const parts = rgb[1].split(",").map((v) => parseFloat(v));

    if (
      parts.length >= 3 &&
      parts.slice(0, 3).every(Number.isFinite)
    ) {
      return `rgba(${parts[0]},${parts[1]},${parts[2]},${a})`;
    }
  }

  return `rgba(0,0,0,${a})`;
}

const HIDE_SELECTOR =
  '[aria-label~="trail{hide}"],[data-framer-name~="trail{hide}"]';

const LINK_SELECTOR =
  '[aria-label~="trail{link}"],[data-framer-name~="trail{link}"]';

const RING_SELECTOR = 'a,button,[role="button"]';

export default function DotCursor(props: Props) {
  const {
    headColor = DEFAULTS.headColor,
    trailColor = DEFAULTS.trailColor,
    size = DEFAULTS.size,
    trailLength = DEFAULTS.trailLength,
    trailThickness = DEFAULTS.trailThickness,
    label = DEFAULTS.label,
    labelText = DEFAULTS.labelText,
    labelColor = DEFAULTS.labelColor,
    style,
  } = props;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const live = useRef({
    headColor,
    trailColor,
    size,
    trailLength,
    trailThickness,
  });

  live.current = {
    headColor,
    trailColor,
    size,
    trailLength,
    trailThickness,
  };

  const labelFont = {
    fontFamily: "Inter",
    fontWeight: 400,
    fontSize: "48px",
    lineHeight: "1.5em",
    letterSpacing: "0em",
    textAlign: "left",
    ...props.labelFont,
  } as React.CSSProperties;

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      w = Math.max(1, window.innerWidth);
      h = Math.max(1, window.innerHeight);

      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    /*
     * Native cursor
     *
     * O cursor padrão fica escondido somente enquanto o mouse
     * está dentro da janela.
     */
    const previousCursor = document.documentElement.style.cursor;

    let cursorHidden = false;

    const hideNativeCursor = (hide: boolean) => {
      if (hide === cursorHidden) return;

      cursorHidden = hide;

      document.documentElement.style.cursor = hide
        ? "none"
        : previousCursor;
    };

    /*
     * Posição do cursor
     */
    let ballX = 0;
    let ballY = 0;

    let targetX = 0;
    let targetY = 0;

    /*
     * Estado visual
     */
    let radius = live.current.size / 2;

    let fillOpacity = 1;
    let strokeOpacity = 0;

    let lineOpacity = 0;
    let lineWidth = 0;
    let lineTargetWidth = 0;

    /*
     * Trail
     */
    type Point = {
      x: number;
      y: number;
      age: number;
    };

    let points: Point[] = [];

    /*
     * Hit testing
     */
    let hitDirty = true;

    let overHide = false;
    let overRing = false;

    let linkEl: Element | null = null;

    let seeded = false;
    let inside = false;

    let hitX = 0;
    let hitY = 0;

    /*
     * Primeiro movimento do mouse.
     */
    const seedAt = (x: number, y: number) => {
      seeded = true;

      targetX = x;
      targetY = y;

      ballX = x;
      ballY = y;

      canvas.style.opacity = "1";

      points = [];
    };

    /*
     * Quando o mouse sai da janela.
     */
    const exitTo = (x: number, y: number) => {
      if (seeded && inside) {
        const gapX = x - ballX;
        const gapY = y - ballY;

        const gap = Math.hypot(gapX, gapY);

        if (gap > 1) {
          const steps = Math.min(32, Math.ceil(gap / 8));

          for (let i = 1; i <= steps; i++) {
            const t = i / steps;

            points.push({
              x: ballX + gapX * t,
              y: ballY + gapY * t,
              age: 0,
            });
          }
        }

        ballX = x;
        ballY = y;

        targetX = x;
        targetY = y;
      }

      inside = false;
      hitDirty = false;

      hideNativeCursor(false);
    };

    /*
     * Movimento global do mouse.
     */
    const onMove = (e: PointerEvent) => {
      /*
       * Ignora touch.
       */
      if (e.pointerType === "touch") {
        return;
      }

      const x = e.clientX;
      const y = e.clientY;

      /*
       * Caso o mouse esteja fora da viewport.
       */
      if (
        x < 0 ||
        x > window.innerWidth ||
        y < 0 ||
        y > window.innerHeight
      ) {
        if (inside) {
          exitTo(x, y);
        }

        return;
      }

      /*
       * Primeiro movimento ou retorno para a tela.
       */
      if (!seeded || !inside) {
        seedAt(x, y);
      }

      targetX = x;
      targetY = y;

      hitX = x;
      hitY = y;

      inside = true;
      hitDirty = true;

      hideNativeCursor(true);
    };

    /*
     * Mouse saindo da janela.
     */
    const onWindowLeave = () => {
      if (inside) {
        exitTo(targetX, targetY);
      }
    };

    window.addEventListener("pointermove", onMove, {
      passive: true,
    });

    document.documentElement.addEventListener(
      "pointerleave",
      onWindowLeave
    );

    window.addEventListener("resize", resize);

    let raf = 0;

    let last = performance.now();

    const frame = (now: number) => {
      const dt = Math.min(
        0.05,
        Math.max(0.001, (now - last) / 1000)
      );

      last = now;

      const p = live.current;

      ctx.clearRect(0, 0, w, h);

      /*
       * Ainda não houve movimento.
       */
      if (!seeded) {
        raf = requestAnimationFrame(frame);
        return;
      }

      /*
       * Movimento extremamente rápido e suave.
       */
      const followEase =
        1 - Math.exp(-dt / FOLLOW_TAU);

      ballX +=
        (targetX - ballX) * followEase;

      ballY +=
        (targetY - ballY) * followEase;

      /*
       * Detecta elemento sob o mouse.
       */
      if (hitDirty) {
        const el = document.elementFromPoint(
          hitX,
          hitY
        );

        overHide = !!el?.closest(HIDE_SELECTOR);

        linkEl =
          el?.closest(LINK_SELECTOR) ?? null;

        overRing = !!el?.closest(RING_SELECTOR);

        hitDirty = false;
      }

      /*
       * Elementos que escondem o cursor.
       */
      if (overHide) {
        points = [];

        raf = requestAnimationFrame(frame);

        return;
      }

      const isLink = !!linkEl;

      /*
       * Duração do rastro.
       */
      const trailMs = p.trailLength * 40;

      /*
       * TRAIL
       */
      if (!isLink) {
        if (inside) {
          points.push({
            x: ballX,
            y: ballY,
            age: 0,
          });
        }

        for (const pt of points) {
          pt.age += dt * 1000;
        }

        points = points.filter(
          (pt) => pt.age < trailMs
        );

        const n = points.length;

        if (n > 1) {
          const maxHalf = Math.max(
            0.5,
            ((p.trailThickness / 20) * p.size) / 2
          );

          const lx: number[] = [];
          const ly: number[] = [];

          const rx: number[] = [];
          const ry: number[] = [];

          let nx = 0;
          let ny = 0;

          for (let i = 0; i < n; i++) {
            const prev =
              points[Math.max(0, i - 1)];

            const next =
              points[Math.min(n - 1, i + 1)];

            const dx = next.x - prev.x;
            const dy = next.y - prev.y;

            const len = Math.hypot(dx, dy);

            if (len > 0.0001) {
              nx = -dy / len;
              ny = dx / len;
            }

            const t = Math.max(
              0,
              Math.min(
                1,
                1 - points[i].age / trailMs
              )
            );

            const half = maxHalf * t;

            lx.push(
              points[i].x + nx * half
            );

            ly.push(
              points[i].y + ny * half
            );

            rx.push(
              points[i].x - nx * half
            );

            ry.push(
              points[i].y - ny * half
            );
          }

          ctx.beginPath();

          ctx.moveTo(lx[0], ly[0]);

          for (let i = 1; i < n; i++) {
            ctx.lineTo(lx[i], ly[i]);
          }

          for (let i = n - 1; i >= 0; i--) {
            ctx.lineTo(rx[i], ry[i]);
          }

          ctx.closePath();

          ctx.fillStyle = p.trailColor;

          ctx.fill();
        }
      } else {
        points = [];
      }

      /*
       * LINK MODE
       */
      let link: {
        left: number;
        width: number;
        bottom: number;
      } | null = null;

      if (linkEl) {
        const r =
          linkEl.getBoundingClientRect();

        link = {
          left: r.left,
          width: r.width,
          bottom: r.bottom,
        };

        ballX =
          link.left +
          link.width / 2;

        ballY = link.bottom;

        lineTargetWidth = link.width;
      } else {
        lineTargetWidth = 0;
      }

      /*
       * Animação de transformação.
       */
      const ease =
        1 -
        Math.exp(
          -dt * (SNAPPINESS * 1.5)
        );

      const targetRadius =
        overRing || isLink
          ? (p.size * HOVER_SCALE) / 2
          : p.size / 2;

      radius +=
        (targetRadius - radius) * ease;

      fillOpacity +=
        ((overRing || isLink ? 0 : 1) -
          fillOpacity) *
        ease;

      strokeOpacity +=
        ((overRing && !isLink ? 1 : 0) -
          strokeOpacity) *
        ease;

      lineOpacity +=
        ((isLink ? 1 : 0) -
          lineOpacity) *
        ease;

      lineWidth +=
        (lineTargetWidth - lineWidth) *
        ease;

      /*
       * O cursor desaparece quando sai da janela,
       * mas o trail continua desaparecendo naturalmente.
       */
      if (!inside) {
        raf = requestAnimationFrame(frame);
        return;
      }

      /*
       * LINK
       */
      if (
        isLink &&
        link &&
        lineOpacity > 0.01
      ) {
        const y = link.bottom + 1;

        const startX =
          link.left +
          (link.width - lineWidth) / 2;

        ctx.beginPath();

        ctx.moveTo(startX, y);

        ctx.lineTo(
          startX + lineWidth,
          y
        );

        ctx.strokeStyle = withAlpha(
          p.headColor,
          lineOpacity
        );

        ctx.lineWidth = BORDER_WIDTH;

        ctx.lineCap = "round";

        ctx.stroke();
      }

      /*
       * BOLINHA / ANEL
       */
      else {
        ctx.beginPath();

        ctx.arc(
          ballX,
          ballY,
          Math.max(0.5, radius),
          0,
          Math.PI * 2
        );

        /*
         * Borda do anel.
         */
        if (strokeOpacity > 0.01) {
          ctx.strokeStyle = withAlpha(
            p.headColor,
            strokeOpacity
          );

          ctx.lineWidth =
            BORDER_WIDTH;

          ctx.stroke();
        }

        /*
         * Bolinha.
         */
        if (fillOpacity > 0.01) {
          ctx.fillStyle = withAlpha(
            p.headColor,
            fillOpacity
          );

          ctx.fill();
        }
      }

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);

      hideNativeCursor(false);

      window.removeEventListener(
        "pointermove",
        onMove
      );

      window.removeEventListener(
        "resize",
        resize
      );

      document.documentElement.removeEventListener(
        "pointerleave",
        onWindowLeave
      );
    };
  }, []);

  /*
   * Label opcional.
   *
   * Por padrão fica desativado para não deixar
   * "HOVER ME" parado no centro da tela.
   */
  const labelNode = label ? (
    <div
      style={{
        position: "fixed",
        left: "50%",
        top: "50%",
        transform:
          "translate(-50%, -50%)",
        whiteSpace: "pre",
        pointerEvents: "none",
        userSelect: "none",
        zIndex: 2147483647,
        ...labelFont,
        color: labelColor,
      }}
    >
      {labelText}
    </div>
  ) : null;

  return (
    <>
      {labelNode}

      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          display: "block",
          opacity: 0,
          pointerEvents: "none",
          zIndex: 2147483647,
          ...style,
        }}
      />
    </>
  );
}
