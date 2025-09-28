import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TextLink from '@/components/TextLink.vue'

vi.mock('@inertiajs/vue3', () => ({
  Link: {
    name: 'Link',
    props: ['href', 'tabindex', 'method', 'as'],
    template: '<a :href="href" :tabindex="tabindex"><slot /></a>'
  }
}))

describe('TextLink', () => {
  it('renders with href prop', () => {
    const wrapper = mount(TextLink, {
      props: {
        href: '/test-link'
      },
      slots: {
        default: 'Test Link Text'
      }
    })

    expect(wrapper.text()).toBe('Test Link Text')
    expect(wrapper.find('a').attributes('href')).toBe('/test-link')
  })

  it('passes through tabindex prop', () => {
    const wrapper = mount(TextLink, {
      props: {
        href: '/test',
        tabindex: 5
      },
      slots: {
        default: 'Test'
      }
    })

    expect(wrapper.find('a').attributes('tabindex')).toBe('5')
  })

  it('renders slot content correctly', () => {
    const wrapper = mount(TextLink, {
      props: {
        href: '/test'
      },
      slots: {
        default: '<span>Custom Content</span>'
      }
    })

    expect(wrapper.html()).toContain('<span>Custom Content</span>')
  })

  it('applies correct CSS classes', () => {
    const wrapper = mount(TextLink, {
      props: {
        href: '/test'
      },
      slots: {
        default: 'Link'
      }
    })

    const linkElement = wrapper.findComponent({ name: 'Link' })
    expect(linkElement.exists()).toBe(true)
    expect(linkElement.classes()).toContain('text-foreground')
    expect(linkElement.classes()).toContain('underline')
  })
})