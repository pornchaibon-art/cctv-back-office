interface PageHeaderProps {
  title: string;
  subtitle?: string;
  search?: string;
  onSearch?: (value: string) => void;
  showSearch?: boolean;
}

export default function PageHeader({ title, subtitle, search, onSearch, showSearch = true }: PageHeaderProps) {
  return (
    <div className="header">
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      {showSearch && (
        <input
          className="search"
          placeholder="ค้นหาชื่อ, สาขา..."
          value={search}
          onChange={(e) => onSearch?.(e.target.value)}
        />
      )}
    </div>
  );
}
