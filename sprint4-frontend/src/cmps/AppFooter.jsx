//Use react player here
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

import { UserMsg } from './UserMsg.jsx'

export function AppFooter() {

  return (
    <footer className="footer">
      Footer
    </footer>
  )
}