export type TextButtonProps = {
  children?: React.ReactNode
  loading?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  className?: string
  onClick?: () => void
}
