import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useUser } from '../lib/hooks';

export default ({ children }) => {
    const [user, { mutate }] = useUser();
    const handleLogout = async function () {
        await fetch('/api/auth', {
            method: 'DELETE'
        });
        mutate(null);
    };

    return (
        <React.Fragment>
            <Head>
                <title>Next.js + MongoDB</title>
                <meta charSet="utf-8" />
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
                <meta
                    name="description"
                    content="App combine Next.js and MonogDB"
                />
                <link rel="apple-touch-icon" href="/logo192.png" />
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#12100e" />
                <meta name="msapplication-TileColor" content="#12100e"></meta>
                <meta name="theme-color" content="#12100e"></meta>
                <link rel="manifest" href="/manifest.json" />
            </Head>
            <header>
                <nav>
                    <Link href="/">
                        <a>
                            <h1>Next.js + MongoDB App</h1>
                        </a>
                    </Link>
                    <div>
                        {
                            !user ? (
                                <>
                                    <Link href="/login">
                                        <a>Sign in</a>
                                    </Link>
                                    <Link href="/signup">
                                        <a>Sign up</a>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                    <a tabIndex={0} role="button" onClick={handleLogout}>
                                        Logout
                                    </a>
                                </>
                            )
                        }
                    </div>
                </nav>
            </header>
            <main>
                {children}
            </main>
        </React.Fragment>
    );
}