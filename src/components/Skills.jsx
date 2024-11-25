import React, { useEffect, useState, useContext } from 'react';
import { Timeline, TimelineItem } from 'vertical-timeline-component-for-react';
import { Container } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import Fade from 'react-reveal';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import '../css/skills.css'; // Ensure this path is correct

const Skills = (props) => {
  const theme = useContext(ThemeContext);
  const { header } = props;
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.skills, { method: 'GET' })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Header title={header} />
      {data ? (
        <div className="section-content-container">
          <Container>
            {/* Display Introduction as Information */}
            <Fade>
              <div className="skills-intro">
                <ReactMarkdown children={data.intro} />
              </div>
            </Fade>

            {/* Timeline for Skills */}
            <Timeline lineColor={theme.timelineLineColor}>
              {data.skills?.map((category) => (
                <Fade key={category.title}>
                  <TimelineItem
                    dateText={category.title}
                    dateInnerStyle={{ background: theme.accentColor }}
                    bodyContainerStyle={{ color: theme.color }}
                  >
                    <ul className="skills-list">
                      {category.items.map((skill) => (
                        <li key={skill.title} className="skill-item">
                          <img
                            src={skill.icon}
                            alt={skill.title}
                            className="skill-icon"
                          />
                          <span className="skill-name">{skill.title}</span>
                        </li>
                      ))}
                    </ul>
                  </TimelineItem>
                </Fade>
              ))}
            </Timeline>
          </Container>
        </div>
      ) : (
        <FallbackSpinner />
      )}
    </>
  );
};

Skills.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Skills;
