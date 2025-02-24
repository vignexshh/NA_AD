"use client"; 
import React from 'react';
import '@ant-design/v5-patch-for-react-19';  
import { unstableSetRender } from 'antd';  
import { createRoot } from 'react-dom/client';  
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
  
 
  export default function ClientWrapper({ children }: React.PropsWithChildren) {
    console.log('ClientWrapper rendered');
    return <AntdRegistry>{children}</AntdRegistry>;
  }