"use client"

import { useCallback, useMemo, useRef, useState } from "react"

type ViewportState = Readonly<{
  zoom: number
}>

const MIN_ZOOM = 0.65
const MAX_ZOOM = 1.75

function clampZoom(value: number) {
  return Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, value))
}

export function useJourneyViewport(
  getScrollElement?: () => HTMLElement | null
) {
  const [viewport, setViewport] = useState<ViewportState>({
    zoom: 1,
  })
  const dragRef = useRef<Readonly<{ x: number; y: number }> | null>(null)

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
    setViewport({ zoom: 1 })
    const scrollEl = getScrollElement?.()
    if (scrollEl) {
      scrollEl.scrollTo({ left: 0, top: 0 })
    }
  }, [getScrollElement])

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

      const scrollEl = getScrollElement?.()
      if (scrollEl) {
        scrollEl.scrollTo({
          left: scrollEl.scrollLeft - deltaX,
          top: scrollEl.scrollTop - deltaY,
        })
      }
    },
    [getScrollElement]
  )

  const endDrag = useCallback(() => {
    dragRef.current = null
  }, [])

  const zoomStyle = useMemo(
    () => ({
      zoom: viewport.zoom,
    }),
    [viewport.zoom]
  )

  return {
    viewport,
    zoomStyle,
    setZoom,
    zoomIn,
    zoomOut,
    fitToScreen,
    startDrag,
    onDrag,
    endDrag,
  }
}
