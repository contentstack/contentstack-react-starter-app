import React from 'react';
import { TeamProps } from "../typescript/section";

export default function TeamSection({ ourTeam }: {ourTeam : TeamProps}) {

  return (
    <div className='about-team-section'>
      <div className='team-head-section'>
        {ourTeam.title_h2 && <h2 {...ourTeam.$?.title_h2 as {}}>{ourTeam.title_h2}</h2>}
        {ourTeam.description ? <p {...ourTeam.$?.description as {}}>{ourTeam.description}</p> : ''}
      </div>
      <div className='team-content'>
        {ourTeam.employees?.map((employee) => {
          return (
            <div className='team-details' key={employee.name}>
              {employee.image && <img {...employee.image.$?.url as {}} alt={employee.image.filename} src={employee.image.url} />}
              <div className='team-details'>
                {employee.name && <h4 {...employee.$?.name as {}}>{employee.name}</h4>}
                {employee.designation && <p {...employee.$?.designation as {}}>{employee.designation}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
