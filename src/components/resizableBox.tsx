import React from 'react'
import { ResizableBox as ReactResizableBox } from 'react-resizable'

import 'react-resizable/css/styles.css'

export const ResizableBox = ({
  children,
  width = 500,
  height = 300,
  resizable = true,
  style = {},
  className = '',
}: any) => {
  return (
    <div style={{}}>
      <div
        style={{
          display: 'flex',
          width: 'auto',
          background: 'white',
          padding: '.5rem',
          borderRadius: '0.5rem',
          ...style,
        }}
      >
        {resizable ? (
          <ReactResizableBox width={width} height={height}>
            <div
              style={{
                width: '100%',
                height: '100%',
              }}
              className={className}
            >
              {children}
            </div>
          </ReactResizableBox>
        ) : (
          <div
            style={{
              width: `${width}px`,
              height: `${height}px`,
            }}
            className={className}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  )
}
