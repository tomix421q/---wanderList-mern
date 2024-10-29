import React from 'react'

import { MdAddCircleOutline } from 'react-icons/md'
import { MdOutlinePlace } from 'react-icons/md'
import { IoIosStats } from 'react-icons/io'
import { RiProfileLine } from 'react-icons/ri'
import { GrUserAdmin } from 'react-icons/gr'
import { IoHomeOutline } from 'react-icons/io5'
import { FaRegistered } from 'react-icons/fa'
import { MdLogin } from 'react-icons/md'

const links = [
  { text: 'home', path: '/', icon: <IoHomeOutline /> },
  { text: 'add place', path: 'add-place', icon: <MdAddCircleOutline /> },
  { text: 'all my places', path: 'all-myplaces', icon: <MdOutlinePlace /> },
  { text: 'stats', path: 'stats', icon: <IoIosStats /> },
  { text: 'profile', path: 'profile', icon: <RiProfileLine /> },
  { text: 'admin', path: 'admin', icon: <GrUserAdmin /> },
]

export default links
