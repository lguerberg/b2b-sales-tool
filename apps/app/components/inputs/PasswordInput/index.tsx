import { Button } from '@app/components/ui/button'
import { Input } from '@app/components/ui/input'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useState } from 'react'

import { PasswordInputProps } from './types'

export default function PasswordInput({ ...field }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="relative">
      <Input type={showPassword ? 'text' : 'password'} className={'hide-password-toggle pr-10'} {...field} />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent cursor-pointer"
        onClick={() => setShowPassword(prev => !prev)}
      >
        {showPassword ? (
          <EyeIcon className="h-4 w-4" aria-hidden="true" />
        ) : (
          <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
        )}
        <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
      </Button>

      {/* hides browsers password toggles */}
      <style>{`
					.hide-password-toggle::-ms-reveal,
					.hide-password-toggle::-ms-clear {
						visibility: hidden;
						pointer-events: none;
						display: none;
					}
				`}</style>
    </div>
  )
}
