export const Icon = ({ name, size = 24 }: { name: string; size?: number }) => (
    <img src={`/icons/${name}.svg`} width={size} height={size} alt={name} />
);