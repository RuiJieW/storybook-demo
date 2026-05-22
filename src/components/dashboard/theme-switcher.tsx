"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { DesignTheme } from "@/lib/design"

const themeOptions: { value: DesignTheme; label: string; nextTheme: string }[] =
  [
    { value: "brand-light", label: "Brand light", nextTheme: "light" },
    { value: "brand-dark", label: "Brand dark", nextTheme: "dark" },
    { value: "wireframe", label: "Wireframe", nextTheme: "wireframe" },
  ]

export function ThemeSwitcher() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Select disabled>
        <SelectTrigger size="sm" className="w-36" aria-label="Theme">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
      </Select>
    )
  }

  const active =
    themeOptions.find((option) => option.nextTheme === (theme ?? resolvedTheme))
      ?.value ?? "brand-light"

  return (
    <Select
      value={active}
      onValueChange={(value) => {
        const option = themeOptions.find((item) => item.value === value)
        if (option) {
          setTheme(option.nextTheme)
        }
      }}
    >
      <SelectTrigger size="sm" className="w-36" aria-label="Theme">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {themeOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
