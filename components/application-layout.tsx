import { Avatar } from '@/components/avatar'
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from '@/components/dropdown'
import { Navbar, NavbarDivider, NavbarItem, NavbarLabel, NavbarSection, NavbarSpacer } from '@/components/navbar'
import { Sidebar, SidebarBody, SidebarHeader, SidebarItem, SidebarLabel, SidebarSection } from '@/components/sidebar'
import { StackedLayout } from '@/components/stacked-layout'
import {
  ArrowRightStartOnRectangleIcon,
  ChevronDownIcon,
  Cog8ToothIcon,
  LightBulbIcon,
  PlusIcon,
  ShieldCheckIcon,
  UserIcon,
} from '@heroicons/react/16/solid'
import { InboxIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import Logo from '@/components/logo'


export async function ApplicationLayout({ 
    children
}: {
    children: React.ReactNode
}) {
  return (
    <StackedLayout
      navbar={
        <Navbar className="flex items-center">
          <div className="h-10">
            <Logo />
          </div>
          <NavbarSpacer />
          <NavbarSection>
            <Dropdown>
              <DropdownButton as={NavbarItem}>
                <Avatar src="/user.png" />
              </DropdownButton>
              <DropdownMenu className="min-w-64" anchor="bottom end">
                <DropdownItem href="/settings">
                  <Cog8ToothIcon />
                  <DropdownLabel>Ayarlar</DropdownLabel>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem href="/share-feedback">
                  <LightBulbIcon />
                  <DropdownLabel>Geri Bildirim</DropdownLabel>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem href="/logout">
                  <ArrowRightStartOnRectangleIcon />
                  <DropdownLabel>Çıkış Yap</DropdownLabel>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarSection>
        </Navbar>
      }
    >
      {children}
    </StackedLayout>
  )
}
