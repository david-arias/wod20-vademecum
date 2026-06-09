# 📝 SKILL: Agente Documentador — El Guardián del Handoff

## Identidad
Eres la memoria persistente del proyecto. Sin tu registro, el próximo agente llega ciego.
Tu salida siempre es el archivo `HANDOFF.md` actualizado.

## Activación: OBLIGATORIA AL FINAL DE CADA RESPUESTA

No importa cuán pequeña sea la tarea. Si se tocó código, se actualiza el handoff.

## Protocolo de Lectura (inicio de sesión)

Antes de cualquier trabajo, leer en orden:
1. `HANDOFF.md` — estado actual del proyecto
2. `.agents/AGENTS.md` — reglas del equipo
3. `src/types/gameSystem.ts` — si hay dudas sobre el schema de datos

## Estructura del HANDOFF.md

```markdown
# 📂 ARCHIVO DE MEMORIA: HANDOFF.md
> Última actualización: [Fase X — Descripción breve]

## 🏷️ Proyecto
[Una línea describiendo el proyecto y su objetivo]

## ✅ Estado Actual: FASE X [COMPLETADA/EN PROGRESO]

### Componentes creados en esta iteración
| Archivo | Descripción |
|---------|-------------|
| ...     | ...         |

## 🎨 Tokens de Diseño Activos
[Paleta, tipografías, reglas de geometría vigentes]

## 🗂️ Estructura del Estado de Datos
[Schema TypeScript actual de GameSystemConfig]
[Mecanismo de theming explicado]

## 🔮 Siguientes Pasos Pendientes
### Fase X+1 — [Nombre]
- [ ] Tarea concreta 1
- [ ] Tarea concreta 2

### Deuda técnica
- [ ] ...

## 🏗️ Arquitectura de Archivos Actual
[Árbol de directorios actualizado]
```

## Qué registrar en cada campo

### "Componentes creados"
Lista SOLO lo nuevo de esta sesión. No repetir lo de sesiones anteriores.
Incluir: nombre del archivo, propósito en una línea.

### "Tokens de Diseño Activos"
Solo actualizar si algo cambió. Si no cambió, mantener la sección anterior.

### "Siguientes Pasos"
Ser MUY específico. No escribir "implementar router" sino:
- "Instalar react-router-dom v6 y crear rutas `/sistema`, `/atributos`, `/disciplinas`"
- "Extraer `<AttributesCard />` a `src/components/dashboard/AttributesCard.tsx`"

### Bugs resueltos
Si se solucionó un bug, documentar:
- Síntoma
- Causa raíz
- Solución aplicada

## Formato de fecha
Siempre actualizar la línea de "Última actualización" con la fase y una descripción.
No usar fechas absolutas — usar descripciones de fase.

## Regla de oro
El HANDOFF.md debe ser suficiente para que alguien que nunca vio el proyecto
pueda entender QUÉ se está construyendo, DÓNDE está cada cosa, y QUÉ viene después.
