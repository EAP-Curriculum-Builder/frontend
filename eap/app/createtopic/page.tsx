"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

import { fetchAssociatedTopics } from '@/api/createLearning';

const CreateTopic = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const genreId = searchParams.get("genreId");
    const genreName = searchParams.get("genreName");

    return (
        <div>
            <div>
                <Navbar topMessage={typeof genreName === 'string' ? genreName: ''} page='CreateTopic' />
            </div>
            
        </div>
    );
};

export default CreateTopic;