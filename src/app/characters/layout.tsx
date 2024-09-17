import { ReactNode } from 'react'

const CharacterLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default CharacterLayout