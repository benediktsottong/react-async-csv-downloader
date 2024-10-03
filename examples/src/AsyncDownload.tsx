import React from 'react';
import { useDownloadLink, type RawCSVExport } from 'react-async-csv-downloader';

const exampleCSV = `Name,Age,Email
Alice,30,alice@example.com
Bob,25,bob@example.com
Charlie,35,charlie@example.com
Diana,28,diana@example.com`;

export const AsyncDownload = () => {
    const waitAndReturnCSV = (): Promise<RawCSVExport> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ file: exampleCSV, type: 'text/csv' });
            }, 3000);
        });
    };

    const { getProps } = useDownloadLink({
        onStart: () => console.log('Download started'),
        onSuccess: () => console.log('Download successful'),
        onError: (error: any) => console.error('Download failed', error),
        asyncResolver: waitAndReturnCSV,
    });

    const { linkRef, ...rest } = getProps();

    return (
        <a ref={linkRef} href={''} download="document" {...rest}>
            Async Download
        </a>
    );
};
