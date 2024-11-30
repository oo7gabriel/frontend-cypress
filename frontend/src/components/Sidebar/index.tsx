'use client'

import {
  BookOutlined,
  HomeOutlined,
  TeamOutlined,
  UserOutlined
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Button, Layout, Menu } from 'antd'
import { Session } from 'next-auth'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const { Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label
  } as MenuItem
}

const items: MenuItem[] = [
  getItem('Escolas', '1', <HomeOutlined />),
  getItem('Alunos', '2', <UserOutlined />),
  getItem('Professores', '3', <TeamOutlined />),
  getItem('Turmas', '4', <BookOutlined />),
  getItem('Perfil', '5', <UserOutlined />)
]

type Props = {
  session: Session
}

export default function Sidebar({ session }: Props) {
  const [collapsed, setCollapsed] = useState(false)
  const [selectedKey, setSelectedKey] = useState<string | null>(null)
  const router = useRouter()

  const handleMenuClick: MenuProps['onClick'] = e => {
    setSelectedKey(e.key)
    if (e.key === '1') {
      router.push('/escolas')
    } else if (e.key === '2') {
      router.push('/alunos')
    }
    if (e.key === '3') {
      router.push('/professores')
    }
    if (e.key === '4') {
      router.push('/turmas')
    }
    if (e.key === '5') {
      router.push(`/perfil/${session?.user.id}`)
    }
  }

  const handleLogoClick = () => {
    setSelectedKey(null)
    router.push('/')
  }

  return (
    <div className='flex min-h-screen'>
      <Sider
        theme='light'
        collapsible
        collapsed={collapsed}
        onCollapse={value => setCollapsed(value)}
        className='shadow-lg'
      >
        <div
          className='flex h-16 cursor-pointer items-center justify-center text-lg font-semibold text-green-700'
          onClick={handleLogoClick}
        >
          Infantio
        </div>

        <div className='flex flex-col items-center gap-4 border-b border-gray-200 p-4'>
          <div className='text-sm font-medium text-gray-700'>
            Olá{' '}
            <span className='font-bold text-green-700'>
              {session.user.name}
            </span>
            !
          </div>
          <Button
            type='primary'
            danger
            className='w-full'
            onClick={() => router.push('/api/auth/signout')}
          >
            Sair do Sistema
          </Button>
        </div>

        <Menu
          mode='inline'
          items={items}
          selectedKeys={selectedKey ? [selectedKey] : []}
          onClick={handleMenuClick}
        />
      </Sider>
    </div>
  )
}
