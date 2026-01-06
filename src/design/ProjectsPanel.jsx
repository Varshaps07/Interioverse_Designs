import "./Users.css";

const ProjectsPanel = ({ user }) => {
  if (!user) return null;

  return (
    <div className="projects-panel">
      <h3>Projects</h3>

      {user.projectsList.map((p) => (
        <div className="project-card" key={p.id}>
          <img src={p.image} alt={p.name} />
          <div>
            <p className="project-name">{p.name}</p>
            <p className="project-location">{p.location}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectsPanel;
