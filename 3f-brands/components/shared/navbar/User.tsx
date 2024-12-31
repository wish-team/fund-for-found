import {User, Link} from "@nextui-org/react";

export default function App() {
  return (
    <User   
      name="Junior Garcia"
      description={(
        <Link href="https://twitter.com/jrgarciadev" size="sm" isExternal>
          @jrgarciadev
        </Link>
      )}
      avatarProps={{
        src: "https://avatars.githubusercontent.com/u/30373425?v=4"
      }}
    />
  );
}