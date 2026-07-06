import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { BlurView } from "expo-blur";
import Svg, { Defs, RadialGradient, Stop, Ellipse } from "react-native-svg";

const { width, height } = Dimensions.get("window");

// Designet er spesifisert ved 390×844 — skaler radier proporsjonalt
const s = width / 390;

/* ---------- Designtokens: "Midnight Glass" ---------- */

export const COLORS = {
  bg: "#0d0a18",
  pink: "#ec4878",
  purple: "#a855f7",
  softPink: "#e879b9",
  green: "#34d399",
  blue: "#608cff",
  orange: "#f97316",
  gold: "#fbbf24",
  proText: "#241a02",
  text: "#ffffff",
  text65: "rgba(255,255,255,0.65)",
  text60: "rgba(255,255,255,0.6)",
  text55: "rgba(255,255,255,0.55)",
  text50: "rgba(255,255,255,0.5)",
  text45: "rgba(255,255,255,0.45)",
  text40: "rgba(255,255,255,0.4)",
};

export const ACCENT_GRADIENT = ["#ec4878", "#a855f7"];
export const PRO_GRADIENT = ["#f5c045", "#f59e0b"];

export const FONT = {
  black: "Archivo_900Black",
  extra: "Archivo_800ExtraBold",
  bold: "Archivo_700Bold",
  semi: "Archivo_600SemiBold",
  medium: "Archivo_500Medium",
  regular: "Archivo_400Regular",
  label: "SpaceGrotesk_600SemiBold",
};

/* ---------- Modustema: farge + gradient per intensitet ---------- */
/*  Fargene matcher modusvalg-skjermen, slik at spillet arver        */
/*  identiteten til moden man valgte.                                */

export const MODE_THEME = {
  chill: { color: "#34d399", gradient: ["#34d399", "#0ea371"], label: "Chill", emoji: "😊" },
  date: { color: "#e879b9", gradient: ["#e879b9", "#ec4878"], label: "Date", emoji: "💕" },
  drunk: { color: "#608cff", gradient: ["#608cff", "#4a6ee8"], label: "Drunk", emoji: "🍻" },
  nasj: { color: "#f97316", gradient: ["#fb923c", "#ea580c"], label: "Nasj", emoji: "🔥" },
  blasted: { color: "#ec4878", gradient: ["#ec4878", "#c22a5c"], label: "Blasted", emoji: "💀" },
};

/* ---------- Bakgrunnsglows per skjerm (rene radial-gradienter) ---------- */

const GLOWS = {
  intro: [
    { x: 0.85, y: -0.05, rx: 420, ry: 380, color: "#a855f7", opacity: 0.35 },
    { x: -0.1, y: 0.3, rx: 460, ry: 420, color: "#ec4878", opacity: 0.28 },
  ],
  home: [
    { x: 0.9, y: -0.08, rx: 420, ry: 380, color: "#ec4878", opacity: 0.3 },
    { x: -0.15, y: 0.55, rx: 500, ry: 460, color: "#a855f7", opacity: 0.22 },
  ],
  mode: [
    { x: 0.8, y: -0.08, rx: 420, ry: 380, color: "#a855f7", opacity: 0.3 },
  ],
  splash: [
    { x: 1.05, y: 1.0, rx: 460, ry: 420, color: "#ec4878", opacity: 0.32 },
    { x: -0.1, y: -0.05, rx: 380, ry: 340, color: "#a855f7", opacity: 0.18 },
  ],
};

// Spillskjermene får én glow øverst i modusfargen
export function MidnightBackground({ variant = "home", glowColor }) {
  const glows = glowColor
    ? [{ x: 0.85, y: -0.08, rx: 420, ry: 380, color: glowColor, opacity: 0.3 }]
    : GLOWS[variant] || [];
  // Unik id per variant+farge — skjermer i navigasjonsstacken deler DOM på web
  const idBase = `glow-${variant}-${(glowColor || "std").replace("#", "")}`;
  return (
    <View
      style={[StyleSheet.absoluteFill, { backgroundColor: COLORS.bg }]}
      pointerEvents="none"
    >
      <Svg width="100%" height="100%">
        <Defs>
          {glows.map((g, i) => (
            <RadialGradient
              key={i}
              id={`${idBase}-${i}`}
              cx="50%"
              cy="50%"
              rx="50%"
              ry="50%"
            >
              <Stop offset="0" stopColor={g.color} stopOpacity={g.opacity} />
              <Stop offset="0.7" stopColor={g.color} stopOpacity={0} />
            </RadialGradient>
          ))}
        </Defs>
        {glows.map((g, i) => (
          <Ellipse
            key={i}
            cx={g.x * width}
            cy={g.y * height}
            rx={g.rx * s}
            ry={g.ry * s}
            fill={`url(#${idBase}-${i})`}
          />
        ))}
      </Svg>
    </View>
  );
}

/* ---------- Frostet glasskort ---------- */

export function GlassCard({
  radius = 28,
  borderColor = "rgba(255,255,255,0.12)",
  fill = "rgba(255,255,255,0.06)",
  style,
  contentStyle,
  children,
}) {
  return (
    <View
      style={[
        { borderRadius: radius, borderWidth: 1, borderColor, overflow: "hidden" },
        style,
      ]}
    >
      <BlurView
        intensity={20}
        tint="dark"
        experimentalBlurMethod="dimezisBlurView"
        style={StyleSheet.absoluteFill}
      />
      <View style={[StyleSheet.absoluteFill, { backgroundColor: fill }]} />
      <View style={contentStyle}>{children}</View>
    </View>
  );
}
