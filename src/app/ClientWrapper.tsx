"use client"; // Mark this file as a Client Component
import React from 'react';
import '@ant-design/v5-patch-for-react-19'; // Compatibility package for React 19
import { unstableSetRender } from 'antd'; // Fallback for special scenarios
import { createRoot } from 'react-dom/client'; // Client-side rendering API
import { AntdRegistry } from '@ant-design/nextjs-registry';

unstableSetRender((node, container) => {
    const containerWithRoot = container as Element & { _reactRoot?: ReturnType<typeof createRoot> };
    if (!containerWithRoot._reactRoot) {
      containerWithRoot._reactRoot = createRoot(containerWithRoot);
    }
    const root = containerWithRoot._reactRoot;
    root.render(node);
    return async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
      root.unmount();
    };
  });
  
  // ClientWrapper component
  export default function ClientWrapper({ children }: React.PropsWithChildren) {
    console.log('ClientWrapper rendered');
    return <AntdRegistry>{children}</AntdRegistry>;
  }