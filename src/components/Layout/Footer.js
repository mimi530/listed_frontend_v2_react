import React from 'react'
import i18n from '../../i18n'

export const Footer = () => {
  return (
    <footer className="text-accent font-medium text-sm text-center bg-gray-100 dark:bg-accent dark:text-white">
        <p>2022 &copy; Michał Domżalski. {i18n.t('All rights reserved')}</p>
    </footer>
  )
}
