# 📂 ARCHIVO DE MEMORIA: HANDOFF.md
> Guardián del Handoff — Agente Documentador | Última actualización: [Fase X — Nombre]

---

## 🏷️ Proyecto
**Vademécum cWoD 20 Aniversario**
[Descripción de una línea del objetivo actual]

---

## ✅ Estado Actual: FASE X [COMPLETADA / EN PROGRESO]

### Componentes creados en esta iteración

| Archivo | Descripción |
|---|---|
| `ruta/Componente.tsx` | Descripción breve |

### Bugs resueltos

| Bug | Causa raíz | Solución |
|-----|-----------|---------|
| Descripción del bug | Por qué ocurrió | Cómo se resolvió |

---

## 🎨 Tokens de Diseño Activos

### Paleta base (Abyssal Gothic — Fija)
```
void:        #0A0A0A
surface:     #131313
cream:       #F5F5F0
keyline:     #333333
```

### Acentos por sistema (CSS vars)
```
V20:  #FF3333  |  W20: #C07800  |  M20: #1A6EFF
C20:  #9333EA  |  Wr20: #6B7280
```

### Reglas activas
- `border-radius: 0px` en todo
- Sin `box-shadow`
- Accent siempre via `var(--accent)`

---

## 🗂️ Estructura del Estado de Datos

```typescript
// Schema vigente — si cambió, documentar aquí
interface GameSystemConfig {
  id: GameSystemId
  // ... campos actuales
}
```

**Mecanismo de theming:** `handleGameChange()` → `html[data-game="ID"]` → CSS vars

---

## 🔮 Siguientes Pasos Pendientes

### Fase X+1 — [Nombre]
- [ ] Tarea específica 1
- [ ] Tarea específica 2

### Deuda técnica
- [ ] Pendiente técnico 1

---

## 🏗️ Arquitectura de Archivos Actual

```
wod20 - Vademecum/
├── .agents/              ← Definición de agentes y skills
├── HANDOFF.md            ← Este archivo
├── src/
│   ├── types/
│   ├── data/
│   ├── components/
│   └── ...
└── ...
```

---

*Generado por el Agente Documentador — El Guardián del Handoff.*
