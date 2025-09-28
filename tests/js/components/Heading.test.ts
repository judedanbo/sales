import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Heading from '@/components/Heading.vue'

describe('Heading', () => {
  it('renders title prop correctly', () => {
    const wrapper = mount(Heading, {
      props: {
        title: 'Test Title'
      }
    })

    expect(wrapper.find('h2').text()).toBe('Test Title')
    expect(wrapper.find('h2').classes()).toContain('text-xl')
    expect(wrapper.find('h2').classes()).toContain('font-semibold')
  })

  it('renders description when provided', () => {
    const wrapper = mount(Heading, {
      props: {
        title: 'Test Title',
        description: 'Test description text'
      }
    })

    const description = wrapper.find('p')
    expect(description.exists()).toBe(true)
    expect(description.text()).toBe('Test description text')
    expect(description.classes()).toContain('text-muted-foreground')
  })

  it('does not render description when not provided', () => {
    const wrapper = mount(Heading, {
      props: {
        title: 'Test Title'
      }
    })

    expect(wrapper.find('p').exists()).toBe(false)
  })

  it('has correct container structure and classes', () => {
    const wrapper = mount(Heading, {
      props: {
        title: 'Test Title'
      }
    })

    const container = wrapper.find('div')
    expect(container.classes()).toContain('mb-8')
    expect(container.classes()).toContain('space-y-0.5')
  })
})