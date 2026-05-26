"use client"

import Link from "next/link"
import { useRouter } from "next/router"

import { AppShell } from "@/components/dashboard/app-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function JourneyFlowStubPage() {
  const { query } = useRouter()
  const flowId = typeof query.id === "string" ? query.id : "unknown"
  // P2: replace this stub with React Flow visualizations and handoff-specific detail cards.

  return (
    <AppShell title="Journey Atlas">
      <div className="flex min-h-0 flex-1 items-center justify-center overflow-y-auto p-8">
        <Card className="w-full max-w-2xl">
          <CardHeader className="space-y-2">
            <div className="flex items-center gap-2">
              <CardTitle>Initiative flow stub</CardTitle>
              <Badge variant="secondary">P2</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Flow ID: <span className="font-mono">{flowId}</span>
            </p>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>
              Detailed cross-entity flow charts are intentionally stubbed in V05.
              This route is reserved for the P2 React Flow implementation.
            </p>
            <Button variant="outline" render={<Link href="/user-journey" />}>
              Back to Journey Atlas
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  )
}
