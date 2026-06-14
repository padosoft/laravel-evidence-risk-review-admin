import { NavLink, Outlet } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Dashboard', testId: 'evr-nav-dashboard' },
  { to: '/reviews', label: 'Reviews', testId: 'evr-nav-reviews' },
  { to: '/profiles', label: 'Profiles', testId: 'evr-nav-profiles' },
  { to: '/taxonomy', label: 'Taxonomy', testId: 'evr-nav-taxonomy' },
  { to: '/try', label: 'Try', testId: 'evr-nav-try' },
  { to: '/settings', label: 'Settings', testId: 'evr-nav-settings' },
];

export function Shell({ embedded = false }: { embedded?: boolean }) {
  if (embedded) {
    return <Outlet />;
  }

  return (
    <div className="evr-shell" data-testid="evr-shell">
      <aside className="evr-sidebar" aria-label="Evidence Risk Review navigation">
        <div className="evr-brand">
          <strong>Evidence Risk</strong>
          <span>Review Admin</span>
        </div>
        <nav className="evr-nav">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'} data-testid={item.testId}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="evr-main">
        <header className="evr-topbar">
          <div>
            <strong>Evidence Risk Review</strong>
            <span>HTTP API operator console</span>
          </div>
        </header>
        <Outlet />
      </div>
    </div>
  );
}
