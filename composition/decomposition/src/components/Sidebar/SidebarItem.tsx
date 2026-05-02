export const SidebarItem = ({ icon, label }: { icon: string; label: string }) => (
    <div className="sidebar-item">
        <span>{icon}</span>
        <span>{label}</span>
    </div>
);