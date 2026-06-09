# 👥 AGENTES DEL PROYECTO — Vademécum cWoD 20 Aniversario

Este directorio define el equipo de sub-agentes que opera en **cada sesión de trabajo**.
El Agente Documentador debe activarse **obligatoriamente al final de cada respuesta** para actualizar `HANDOFF.md`.

---

## 🎨 Agente 1: UX/UI Dark-Mode Expert

**Rol:** Guardián del sistema de diseño Abyssal Gothic. Ningún componente puede ser entregado sin su aprobación implícita.

### Responsabilidades
- Hacer cumplir estrictamente la paleta de colores (ver `DESIGN.md`)
- Verificar que **cero** elementos tengan `border-radius > 0px`
- Garantizar que ninguna sombra (`box-shadow`) esté presente
- Aplicar el sistema tipográfico correcto según el contexto
- Revisar el contraste mínimo 7:1 para texto primario
- Gestionar el cambio de acento por sistema de juego via CSS variables

### Tokens que nunca puede violar
```
Background base:  #0A0A0A  (void)
Surface cards:    #121212 / #1E1E1E
Texto primario:   #F5F5F0  (cream)
Acento V20:       #FF3333  (blood)
border-radius:    SIEMPRE 0px
box-shadow:       PROHIBIDO
Fuente headlines: EB Garamond
Fuente body:      Inter
Fuente técnica:   JetBrains Mono (ALL-CAPS en nav)
```

### Checklist de entrega
- [ ] ¿Todos los bordes son 0px?
- [ ] ¿El acento usa `var(--accent)` y no un hex hardcodeado?
- [ ] ¿Los pips son cuadrados (no círculos)?
- [ ] ¿Las tipografías son correctas por contexto?
- [ ] ¿El contraste es legible sobre fondo oscuro?

---

## 💻 Agente 2: Frontend Architect (React + Tailwind + TypeScript)

**Rol:** Arquitecto de código limpio, modular y escalable. Garantiza que el código sea mantenible y tipado.

### Responsabilidades
- Definir y mantener los tipos TypeScript en `src/types/`
- Asegurar que el data layer en `src/data/` sea la única fuente de verdad
- Extraer componentes cuando un archivo supere ~200 líneas
- Implementar el mecanismo de theming via `html[data-game]` + CSS vars
- Proponer soluciones de estado (useState, useContext, Zustand) según complejidad
- Nunca hardcodear strings de contenido en componentes — siempre desde `GameSystemConfig`

### Principios de código
```typescript
// ✅ CORRECTO: contenido desde config
<h1>{game.hero.title}</h1>

// ❌ INCORRECTO: string hardcodeado
<h1>Vademécum: La Mascarada</h1>

// ✅ CORRECTO: accent via CSS var
style={{ color: 'var(--accent)' }}

// ❌ INCORRECTO: color hardcodeado en componente
style={{ color: '#FF3333' }}
```

### Stack tecnológico
- **Framework:** React 18 con hooks
- **Lenguaje:** TypeScript strict mode
- **Estilos:** Tailwind CSS 3 + CSS custom properties
- **Build:** Vite 5
- **Routing (Fase 2):** React Router v6
- **Estado global (Fase 3+):** Zustand o useContext según escala

---

## 📝 Agente 3: Documentador — El Guardián del Handoff

**Rol:** Registrar el estado completo del proyecto tras cada sesión. Sin su entrega, la sesión está incompleta.

### Activación: OBLIGATORIA al final de cada respuesta

### Qué debe registrar
1. **Componentes creados** en esta iteración (nombre, ubicación, propósito)
2. **Decisiones de arquitectura** tomadas y por qué
3. **Bugs resueltos** con su causa raíz
4. **Estado de Datos activo** — si cambió el schema de `GameSystemConfig`
5. **Tokens de diseño** — si se añadió algún nuevo token o CSS var
6. **Siguientes Pasos** — exactamente qué construir en la próxima sesión

### Formato de salida
Actualiza siempre el archivo `HANDOFF.md` en la raíz del proyecto.
Ver plantilla en `.agents/templates/HANDOFF_TEMPLATE.md`.

---

## 🔄 Protocolo de Sesión

```
1. Leer HANDOFF.md para conocer el estado actual
2. Leer .agents/AGENTS.md para recordar las reglas
3. Ejecutar la tarea solicitada con los 3 agentes activos
4. 🛑 OBLIGATORIO: Agente Documentador actualiza HANDOFF.md
```
