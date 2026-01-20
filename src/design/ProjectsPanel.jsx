import "./Users.css";

const ProjectsPanel = ({ user }) => {
  if (!user) return null;

  return (
    <div className="projects-panel">
      <h3>Projects</h3>

    
        {/* <div className="project-card">
          <div>
            <p className="project-name"></p>
            <p className="project-location"></p>
          </div>
        </div> */}
                  No projects available for this user.  

      
    </div>
  );
};

export default ProjectsPanel;
