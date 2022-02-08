import Link from "next/link";
import useAuth from "../../data/hook/useAuth";

interface UserAvatarProps {
  className?: string;
}

export default function UserAvatar(props: UserAvatarProps) {
  const { user } = useAuth();

  return (
    <Link href="/perfil">
      <img
        src={user?.imageUrl ?? "/images/avatar.svg"}
        alt="Avatar do Usuário"
        className={`h-10 w-10 rounded-full cursor-pointer ${props.className}`}
      />
    </Link>
  );
}
