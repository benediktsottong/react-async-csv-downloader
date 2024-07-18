import React from 'react';
import { DirectDownload } from './DirectDownload';
import { AsyncDownload } from './AsyncDownload';

export const App = () => (
    <>
        <DirectDownload />
        <br />
        <AsyncDownload />
    </>
);
