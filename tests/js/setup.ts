import { vi } from 'vitest'

// Mock Inertia.js
vi.mock('@inertiajs/vue3', () => ({
  router: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
    visit: vi.fn(),
  },
  usePage: vi.fn(() => ({
    props: {},
    url: '/',
    component: '',
    version: '1',
  })),
  useForm: vi.fn(() => ({
    data: {},
    errors: {},
    hasErrors: false,
    processing: false,
    submit: vi.fn(),
    reset: vi.fn(),
  })),
}))

// Global test setup
beforeEach(() => {
  vi.clearAllMocks()
})