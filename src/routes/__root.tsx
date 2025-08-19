import { Outlet, createRootRoute } from '@tanstack/react-router'
import ColorFilter from '@/components/ColorFilter'

export const Route = createRootRoute({
  component: () => (
    <>
      <ColorFilter>
        <Outlet />
      </ColorFilter>
      {/* <TanstackDevtools
        config={{
          position: 'bottom-left',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      /> */}
    </>
  ),
})
