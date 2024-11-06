import { useEffect, useState } from 'react';

import { ThemesProps, Topic, GroupedTopic } from '@/types/appTypes';

const Themes: React.FC<ThemesProps> = ({ topics, handleSelectTopic }) => {

    const [groupedTopics, setGroupedTopics] = useState<GroupedTopic[]>([]);

    useEffect(() => {
        const groupedByTheme = groupTopicsByTheme(topics);
        setGroupedTopics(groupedByTheme);
    }, [topics]);

    const groupTopicsByTheme = (topics: Topic[]): GroupedTopic[] => {
        const grouped = topics.reduce<Record<string, GroupedTopic>>((acc, curr) => {

            const { theme, id, topic } = curr;

            if(!acc[theme]) {
                acc[theme] = { theme, topics: [] };
            }

            acc[theme].topics.push({ id, topic, theme });

            return acc;
        }, {});

        return Object.values(grouped);
    }

    const handleTopicClick = (topic: Topic) => {
        handleSelectTopic(topic);
    }

    return(
        <div>
            {groupedTopics.map((groupedTopic, index) => (
                <div className='theme-bar' key={index}>
                    <div className='theme-display'>
                        {groupedTopic.theme}
                    </div>
                    <div className='topics-display'>
                        {groupedTopic.topics.map((atopic) =>(
                            <div className='topic-display' key={atopic.id} onClick={() => handleTopicClick(atopic)}>
                                {atopic.topic}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Themes;