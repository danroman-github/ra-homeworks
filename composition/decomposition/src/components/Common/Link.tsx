export const Link = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href} className="custom-link">{children}</a>
);