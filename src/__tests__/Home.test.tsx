import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Home from '../app/page'

describe('Home', () => {
  it('renders the welcome message', () => {
    render(<Home />)
    
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('To get started, edit the page.tsx file.')
  })

  it('renders the Next.js logo', () => {
    render(<Home />)
    
    const logo = screen.getByAltText('Next.js logo')
    expect(logo).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<Home />)
    
    const deployLink = screen.getByRole('link', { name: /Deploy Now/i })
    const docsLink = screen.getByRole('link', { name: /Documentation/i })
    
    expect(deployLink).toBeInTheDocument()
    expect(docsLink).toBeInTheDocument()
  })
})
