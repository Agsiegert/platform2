import * as React from 'react';
import * as Scrivito from 'scrivito';
import ProjectsComponent from '../../Components/PlatformOSProjects';

Scrivito.provideComponent('Homepage', ({ page }) =>
  <div>
    <Scrivito.ContentTag tag="div" content={ page } attribute="body" />
    <ProjectsComponent />
  </div>  
);
