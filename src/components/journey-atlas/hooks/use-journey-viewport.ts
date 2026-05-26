"use client"

import { useCallback, useMemo, useRef, useState } from "react"

type ViewportState = Readonly<{
  zoom: number
  panX: number
  panY: number
}>

const MIN_ZOOM = 0.65
const MAX_ZOOM = 1.75

function clampZoom(value: number) {
  return Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, value))
}

export function useJourneyViewport() {
  const [viewport, setViewport] = useState<ViewportState>({
    zoom: 1,
    panX: 0,
    panY: 0,
  })
  const dragRef = useRef<Readonly<{ x: number; y: number }> | null>(null)

  const applyPan = useCallback((deltaX: number, deltaY: number) => {
    setViewport((current) => ({
      ...current,
      panX: current.panX + deltaX,
      panY: current.panY + deltaY,
    }))
  }, [])

  const setZoom = useCallback((value: number) => {
    setViewport((current) => ({
      ...current,
      zoom: clampZoom(value),
    }))
  }, [])

  const zoomIn = useCallback(() => {
    setViewport((current) => ({
      ...current,
      zoom: clampZoom(current.zoom + 0.1),
    }))
  }, [])

  const zoomOut = useCallback(() => {
    setViewport((current) => ({
      ...current,
      zoom: clampZoom(current.zoom - 0.1),
    }))
  }, [])

  const fitToScreen = useCallback(() => {
    setViewport({
      zoom: 1,
      panX: 0,
      panY: 0,
    })
  }, [])

  const startDrag = useCallback((x: number, y: number) => {
    dragRef.current = { x, y }
  }, [])

  const onDrag = useCallback(
    (x: number, y: number) => {
      if (!dragRef.current) {
        return
      }

      const deltaX = x - dragRef.current.x
      const deltaY = y - dragRef.current.y
      dragRef.current = { x, y }
      applyPan(deltaX, deltaY)
    },
    [applyPan]
  )

  const endDrag = useCallback(() => {
    dragRef.current = null
  }, [])

  const transformStyle = useMemo(
    () => ({
      transform: `translate(${viewport.panX}px, ${viewport.panY}px) scale(${viewport.zoom})`,
      transformOrigin: "0 0",
    }),
    [viewport.panX, viewport.panY, viewport.zoom]
  )

  return {
    viewport,
    transformStyle,
    setZoom,
    zoomIn,
    zoomOut,
    fitToScreen,
    startDrag,
    onDrag,
    endDrag,
  }
}
