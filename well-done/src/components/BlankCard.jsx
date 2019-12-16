import React from 'react'
import { css } from 'emotion'
import '../../src/components/PopupInfo/Content.styles.scss'

export default function BlankCard({ children, style }) {
  return (
    <div
      className={css({
        backgroundColor: '#f3f7f',
        padding: '10px 20px',
        color: 'black',
        borderRadius: 5,
        ...style,
      })}
    >
      {children}
    </div>
  )
}
