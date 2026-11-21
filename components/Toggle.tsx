interface ToggleProps {
  on: boolean;
  onClick: () => void;
}

export default function Toggle({ on, onClick }: ToggleProps) {
  return (
    <button className={on ? "toggle on" : "toggle"} onClick={onClick}>
      <span />
    </button>
  );
}
