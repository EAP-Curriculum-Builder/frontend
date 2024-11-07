import { useEffect, useState } from 'react';

import { ThemesProps, Topic, GroupedTopic } from '@/types/appTypes';
import { faGlobe, faPenFancy, faEarthAmericas, faFlask, faBusinessTime, faKeyboard, faSolarPanel, faVial, faSatellite } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Themes: React.FC<ThemesProps> = ({ topics, handleSelectTopic }) => {

    const [groupedTopics, setGroupedTopics] = useState<GroupedTopic[]>([]);
    const icons = [faGlobe, faPenFancy, faEarthAmericas, faFlask, faBusinessTime, faKeyboard, faSolarPanel, faVial, faSatellite];

    useEffect(() => {
        const groupedByTheme = groupTopicsByTheme(topics);
        setGroupedTopics(groupedByTheme);
    }, [topics]);

    const groupTopicsByTheme = (topics: Topic[]): GroupedTopic[] => {
        const grouped = topics.reduce<Record<string, GroupedTopic>>((acc, curr) => {

            const { theme, id, topic, text_id } = curr;

            if(!acc[theme]) {
                acc[theme] = { theme, topics: [] };
            }

            acc[theme].topics.push({ id, topic, theme, text_id });

            return acc;
        }, {});

        return Object.values(grouped);
    }

    const handleTopicClick = (topic: Topic) => {
        handleSelectTopic(topic);
    }

    return(
        <div className='themes-internal-container'>
            {groupedTopics.map((groupedTopic, index) => (
                <div className='theme-bar' key={index}>
                    <div className='theme-display'>
                        {groupedTopic.theme}
                    </div>
                    <div className='topics-display'>
                        {groupedTopic.topics.map((atopic, index) =>(
                            <div className='topic-display' key={atopic.id} onClick={() => handleTopicClick(atopic)}>
                                
                                <span className='topic-text'> {atopic.topic}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Themes;