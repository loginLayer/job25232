import React from "react";
import "./SidebarDashboard.css";

const navItems = [
  { name: "Dashboard", to: "/", count: 0 },
  { name: "Contactos", to: "/contactos", count: 12 },
  { name: "Whatsapp", to: "/whatsapp", count: 3 },
  { name: "Correos", to: "/correos", count: 25 },
  { name: "Segmentación", to: "/segmentacion", count: 0 },
  { name: "Recordatorios", to: "/recordatorios", count: 8 },
  { name: "Analíticas", to: "/analiticas", count: 0 },
];

const getActiveName = (path) => {
  const activeItem = navItems.find((item) => item.to === path);
  return activeItem ? activeItem.name : path;
};

const Link = ({ to, className, children, onClick, count }) => (
  <a href={to} className={className} onClick={onClick}>
    <span>{children}</span>
    {count > 0 && <div className="notification-badge">{count}</div>}
  </a>
);

export function Sidebar({ activePath, setActivePath }) {
  return (
    <div className="sidebar">
      <h2>SmartCRM</h2>
      <nav className="nav-container">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            count={item.count}
            className={`nav-item ${item.to === activePath ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              window.history.pushState(null, "", item.to);
              setActivePath(item.to);
            }}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default function MainSection() {
  const [activePath, setActivePath] = React.useState(window.location.pathname);

  React.useEffect(() => {
    const handlePopState = () => setActivePath(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const activeName = getActiveName(activePath);

  return (
    <>
      <div className="dashboard-container">
        <Sidebar activePath={activePath} setActivePath={setActivePath} />

        <main className="main-content">
          <div className="content-box">
            <h1>Bienvenido al Dashboard del Equipo 49</h1>
            <p>
              Te encuentras en → <strong>{activeName}</strong>
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
              ullamcorper arcu sit amet imperdiet lacinia.
            </p>
            <p>
              Suspendisse potenti. Integer eleifend nisi ac quam condimentum, a
              suscipit mauris euismod. Maecenas nec vulputate eros, pretium
              dignissim urna.
            </p>
            {/* Contenido de prueba para scroll */}
            <div
              style={{
                height: "1000px",
                marginTop: "30px",
                borderTop: "1px solid #ccc",
                paddingTop: "20px",
              }}
            >
              <p>
                Nunc vehicula risus ut nibh malesuada laoreet. Curabitur
                efficitur tellus sit amet tristique porttitor. Praesent a
                porttitor felis.
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
