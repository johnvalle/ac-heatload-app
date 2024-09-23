import { createRootRoute, Outlet } from "@tanstack/react-router"

import { BaseLayout } from "@/layouts/BaseLayout"
import Navbar from "@/layouts/Navbar"

export const Route = createRootRoute({
  component: () => (
    <BaseLayout>
      <Navbar />
      <Outlet />
    </BaseLayout>
  ),
})
