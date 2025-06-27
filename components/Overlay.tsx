interface Props {
  setOpenMenu: (openMenu: boolean) => void;
}

const Overlay = ({ setOpenMenu }: Props) => {
  return (
    <div
      onClick={() => setOpenMenu(false)}
      className="fixed cm:hidden min-h-screen inset-0 bg-black/50 z-20"
    />
  );
};

export default Overlay;
