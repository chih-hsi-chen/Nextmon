import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useUser } from '../lib/hooks';

const ProtectedPage = () => {
    const router = useRouter();
    const didMountRef = useRef(false);
    const [user, { mutate }] = useUser();
    useEffect(() => {
        if(didMountRef.current) {
            if(!user) router.replace('/login');
        } else 
            didMountRef.current = true;
    });

    return (
        <>
            <Head>
                <title>Protected Page</title>
            </Head>
            <h1>Protected</h1>
        </>
    );
};

export default ProtectedPage;