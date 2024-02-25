import { UserCircle } from "lucide-react"

export const Avatar = ({ name }: { name?: string }) => {

  const renderAvatar = () => {
    if (!name)
      return <UserCircle />

    const nameSplited = name.split('')
    return `${nameSplited[0].toLocaleUpperCase()}${nameSplited[name.length - 1].toLocaleUpperCase()}`
  }

  return (
    <div className="avatar">
      {renderAvatar()}
    </div>
  )
}